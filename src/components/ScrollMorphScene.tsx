"use client";

import {
  useRef,
  useState,
  useEffect,
  useMemo,
  Suspense,
  MutableRefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = MutableRefObject<number>;

function SoftParticles({
  count,
  progress,
  mobile,
}: {
  count: number;
  progress: ProgressRef;
  mobile: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const p = progress.current;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * (0.04 + p * 0.08);
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = mobile ? 0.25 + p * 0.15 : 0.35 + p * 0.35;
    mat.size = mobile ? 0.025 : 0.035 + p * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#67e8f9"
        size={0.035}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingFrame({
  position,
  rotation,
  scale,
  color,
  progress,
  speed = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  progress: ProgressRef;
  speed?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const p = progress.current;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = rotation[2] + t * 0.12 * speed + p * 0.4;
    group.current.rotation.x = rotation[0] + Math.sin(t * 0.3 * speed) * 0.15;
    group.current.position.y =
      position[1] + Math.sin(t * 0.45 * speed + position[0]) * 0.12 + p * 0.2;
    const s = scale * (0.9 + p * 0.25);
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[1, 0.035, 12, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          metalness={0.85}
          roughness={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 0.78, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function MorphCore({
  progress,
  mobile,
}: {
  progress: ProgressRef;
  mobile: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const p = progress.current;
    const t = state.clock.elapsedTime;
    const boost = mobile ? 0.55 : 1;

    if (group.current) {
      group.current.rotation.y = t * (0.18 + p * 0.55) * boost;
      group.current.position.y = Math.sin(t * 0.5) * 0.12 + p * 0.28;
      group.current.scale.setScalar((0.78 + p * 0.32) * (mobile ? 0.85 : 1));
    }

    if (mesh.current) {
      mesh.current.rotation.x = t * 0.28 * (1 + p) * boost;
      mesh.current.rotation.z = t * 0.16 * boost;
      const mat = mesh.current.material as THREE.MeshPhysicalMaterial & {
        distort?: number;
      };
      if (typeof mat.distort === "number") {
        mat.distort = 0.18 + p * 0.38;
      }
      if (mat.emissive) {
        mat.emissive.set(p > 0.5 ? "#a78bfa" : "#22d3ee");
        mat.emissiveIntensity = 0.22 + p * 0.65;
      }
      mat.color?.lerp(new THREE.Color(p > 0.45 ? "#a78bfa" : "#22d3ee"), 0.05);
    }

    if (ringA.current) {
      ringA.current.rotation.x = Math.PI / 2.2 + p * 0.5;
      ringA.current.rotation.z = t * (0.35 + p * 0.5) * boost;
      const mat = ringA.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + p * 0.55;
      mat.opacity = 0.5 + p * 0.3;
    }

    if (ringB.current) {
      ringB.current.rotation.x = Math.PI / 3 - p * 0.35;
      ringB.current.rotation.y = t * (-0.28 - p * 0.3) * boost;
      const mat = ringB.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.25 + p * 0.5;
      mat.opacity = 0.4 + p * 0.25;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.75}>
        <mesh ref={mesh} scale={1.05}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#22d3ee"
            metalness={0.78}
            roughness={0.16}
            distort={0.22}
            speed={2.2}
            emissive="#22d3ee"
            emissiveIntensity={0.28}
          />
        </mesh>
      </Float>
      <mesh ref={ringA} scale={1.55}>
        <torusGeometry args={[1.15, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#a78bfa"
          metalness={0.9}
          roughness={0.2}
          emissive="#a78bfa"
          emissiveIntensity={0.35}
          transparent
          opacity={0.65}
        />
      </mesh>
      <mesh ref={ringB} scale={1.95}>
        <torusGeometry args={[1.2, 0.03, 12, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          metalness={0.85}
          roughness={0.25}
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function Scene({
  progress,
  mobile,
}: {
  progress: ProgressRef;
  mobile: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[3.5, 2.5, 4]} intensity={1.05} color="#22d3ee" />
      <pointLight position={[-3, -1.5, 2]} intensity={0.75} color="#a78bfa" />
      <pointLight position={[0, 3, -2]} intensity={0.35} color="#67e8f9" />

      <MorphCore progress={progress} mobile={mobile} />

      {!mobile && (
        <>
          <FloatingFrame
            position={[-2.6, 1.4, -1.2]}
            rotation={[0.4, 0.2, 0.1]}
            scale={0.55}
            color="#22d3ee"
            progress={progress}
            speed={0.85}
          />
          <FloatingFrame
            position={[2.8, -1.1, -0.8]}
            rotation={[-0.3, 0.5, 0.2]}
            scale={0.45}
            color="#a78bfa"
            progress={progress}
            speed={1.15}
          />
          <FloatingFrame
            position={[1.8, 2.0, -1.8]}
            rotation={[0.6, -0.3, 0]}
            scale={0.32}
            color="#67e8f9"
            progress={progress}
            speed={0.7}
          />
        </>
      )}

      <SoftParticles
        count={mobile ? 28 : 55}
        progress={progress}
        mobile={mobile}
      />
    </>
  );
}

export default function ScrollMorphScene({
  scrollProgress,
}: {
  scrollProgress: ProgressRef;
}) {
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-55 sm:opacity-70 md:opacity-85"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 40 }}
        dpr={mobile ? [1, 1.15] : [1, 1.5]}
        gl={{
          antialias: !mobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        frameloop={visible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <Scene progress={scrollProgress} mobile={mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
