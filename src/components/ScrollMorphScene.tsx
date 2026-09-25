"use client";

import { useRef, useState, useEffect, Suspense, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

type ProgressRef = MutableRefObject<number>;

function MorphCore({ progress }: { progress: ProgressRef }) {
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const p = progress.current;
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = t * (0.25 + p * 0.9);
      group.current.position.y = Math.sin(t * 0.6) * 0.15 + p * 0.35;
      group.current.scale.setScalar(0.85 + p * 0.35);
    }

    if (mesh.current) {
      mesh.current.rotation.x = t * 0.35 * (1 + p);
      mesh.current.rotation.z = t * 0.2;
      const mat = mesh.current.material as THREE.MeshPhysicalMaterial & {
        distort?: number;
        emissiveIntensity?: number;
      };
      if (typeof mat.distort === "number") {
        mat.distort = 0.2 + p * 0.45;
      }
      if (mat.emissive) {
        mat.emissive.set(p > 0.5 ? "#a78bfa" : "#22d3ee");
        mat.emissiveIntensity = 0.2 + p * 0.7;
      }
      mat.color?.lerp(new THREE.Color(p > 0.45 ? "#a78bfa" : "#22d3ee"), 0.06);
    }

    if (ring.current) {
      ring.current.rotation.x = Math.PI / 2 + p * 0.6;
      ring.current.rotation.z = t * (0.4 + p);
      const mat = ring.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.25 + p * 0.55;
      mat.opacity = 0.55 + p * 0.35;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh ref={mesh} scale={1.1}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#22d3ee"
            metalness={0.75}
            roughness={0.18}
            distort={0.25}
            speed={2.5}
            emissive="#22d3ee"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>
      <mesh ref={ring} scale={1.55}>
        <torusGeometry args={[1.15, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#a78bfa"
          metalness={0.9}
          roughness={0.2}
          emissive="#a78bfa"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

function Scene({ progress }: { progress: ProgressRef }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2, 4]} intensity={1.1} color="#22d3ee" />
      <pointLight position={[-3, -1, 2]} intensity={0.7} color="#a78bfa" />
      <MorphCore progress={progress} />
      <Environment preset="city" />
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
      { threshold: 0.1, rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-70 md:opacity-90"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        dpr={mobile ? [1, 1.2] : [1, 1.5]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        frameloop={visible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <Scene progress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
