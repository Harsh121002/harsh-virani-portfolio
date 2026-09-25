"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingIcosahedron({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4 * speed) * 0.3;
    mesh.current.rotation.y += 0.005 * speed;
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.35;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.2;
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
}: {
  position: [number, number, number];
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.008;
    mesh.current.rotation.x += 0.004;
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
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
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
        size={0.035}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#e0f2fe" />
      <pointLight position={[-4, 2, -2]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[3, -2, 2]} intensity={0.8} color="#a78bfa" />

      <FloatingIcosahedron
        position={[0, 0.2, 0]}
        color="#22d3ee"
        scale={1.15}
        speed={1}
      />
      <FloatingTorus position={[-2.4, 0.8, -1]} color="#a78bfa" />
      <FloatingOctahedron position={[2.6, -0.4, -0.5]} color="#67e8f9" />
      <FloatingIcosahedron
        position={[1.8, 1.4, -2]}
        color="#818cf8"
        scale={0.45}
        speed={1.4}
      />
      <FloatingOctahedron position={[-2.2, -1.2, 0.5]} color="#c4b5fd" />

      <ParticleField />
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
      />
      <Environment preset="city" />
      <OrbitControls
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

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
