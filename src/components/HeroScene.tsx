"use client";

import { useRef, useMemo, useState, useEffect, Suspense, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = MutableRefObject<number>;

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function FloatingIcosahedron({
  position,
  color,
  scale = 1,
  speed = 1,
  progress,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  progress: ProgressRef;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial | null>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const p = progress.current;
    const rotBoost = 1 + p * 2.4;
    mesh.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4 * speed * rotBoost) * (0.3 + p * 0.35);
    mesh.current.rotation.y += 0.005 * speed * rotBoost;
    mesh.current.scale.setScalar(scale * (1 + p * 0.12));

    const m = mesh.current.material as THREE.MeshPhysicalMaterial & {
      emissiveIntensity?: number;
    };
    if (m?.emissive) {
      m.emissive.set(color);
      m.emissiveIntensity = 0.05 + p * 0.55;
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          ref={mat as never}
          color={color}
          metalness={0.7}
          roughness={0.2}
          distort={0.25}
          speed={2}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({
  position,
  color,
  progress,
}: {
  position: [number, number, number];
  color: string;
  progress: ProgressRef;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const p = progress.current;
    const rotBoost = 1 + p * 2.2;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.35 * rotBoost;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.2 * rotBoost;
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.15 + p * 0.65;
    mat.color.lerp(new THREE.Color(p > 0.5 ? "#c4b5fd" : color), 0.05);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={0.55}>
        <torusGeometry args={[1.2, 0.35, 32, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({
  position,
  color,
  progress,
}: {
  position: [number, number, number];
  color: string;
  progress: ProgressRef;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mesh.current) return;
    const p = progress.current;
    const rotBoost = 1 + p * 2.5;
    mesh.current.rotation.y += 0.008 * rotBoost;
    mesh.current.rotation.x += 0.004 * rotBoost;
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.2 + p * 0.6;
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={mesh} position={position} scale={0.7}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.25}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function ParticleField({
  progress,
  count,
}: {
  progress: ProgressRef;
  count: number;
}) {
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const p = progress.current;
    points.current.rotation.y = state.clock.elapsedTime * (0.02 + p * 0.08);
    points.current.rotation.x = p * 0.25;
    if (mat.current) {
      mat.current.opacity = 0.45 + p * 0.4;
      mat.current.size = 0.03 + p * 0.04;
      mat.current.color.set(p > 0.55 ? "#a78bfa" : "#22d3ee");
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.035}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function ScrollCamera({ progress }: { progress: ProgressRef }) {
  useFrame((state) => {
    const p = progress.current;
    const targetZ = THREE.MathUtils.lerp(6, 3.6, p);
    const targetY = THREE.MathUtils.lerp(0, 0.55, p);
    const targetX = THREE.MathUtils.lerp(0, 0.35, p);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.08);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.08);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContent({
  progress,
  particleCount,
}: {
  progress: ProgressRef;
  particleCount: number;
}) {
  const controls = useRef<{ autoRotateSpeed: number } | null>(null);

  useFrame(() => {
    if (controls.current) {
      controls.current.autoRotateSpeed = 0.55 + progress.current * 1.8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#e0f2fe" />
      <pointLight position={[-4, 2, -2]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[3, -2, 2]} intensity={0.8} color="#a78bfa" />

      <ScrollCamera progress={progress} />

      <FloatingIcosahedron
        position={[0, 0.2, 0]}
        color="#22d3ee"
        scale={1.15}
        speed={1}
        progress={progress}
      />
      <FloatingTorus position={[-2.4, 0.8, -1]} color="#a78bfa" progress={progress} />
      <FloatingOctahedron position={[2.6, -0.4, -0.5]} color="#67e8f9" progress={progress} />
      <FloatingIcosahedron
        position={[1.8, 1.4, -2]}
        color="#818cf8"
        scale={0.45}
        speed={1.4}
        progress={progress}
      />
      <FloatingOctahedron position={[-2.2, -1.2, 0.5]} color="#c4b5fd" progress={progress} />

      <ParticleField progress={progress} count={particleCount} />
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
      />
      <Environment preset="city" />
      <OrbitControls
        ref={controls as never}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function HeroScene({
  scrollProgress,
}: {
  scrollProgress: ProgressRef;
}) {
  const mobile = useIsMobile();
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const particleCount = mobile ? 48 : 120;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={mobile ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        frameloop={visible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <SceneContent progress={scrollProgress} particleCount={particleCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
