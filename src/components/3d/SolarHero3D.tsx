'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, MeshWobbleMaterial, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function SolarPanelGroup(props: any) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 0.15, 2.6]} />
        <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[4.0, 0.02, 2.4]} />
        <meshStandardMaterial
          color="#0284C7"
          emissive="#0369A1"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.105, 0]}>
          <boxGeometry args={[0.02, 0.01, 2.38]} />
          <meshStandardMaterial color="#E2E8F0" metalness={1} roughness={0} />
        </mesh>
      ))}

      {[-0.8, 0, 0.8].map((z, i) => (
        <mesh key={i} position={[0, 0.105, z]}>
          <boxGeometry args={[3.98, 0.01, 0.03]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function BatteryModel(props: any) {
  const batteryRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (batteryRef.current) {
      batteryRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={batteryRef} {...props}>
      <mesh>
        <boxGeometry args={[1.4, 2.0, 0.9]} />
        <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, 0.46]}>
        <planeGeometry args={[1.0, 0.8]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
      <mesh position={[0, -0.6, 0.46]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

export default function SolarHero3D() {
  return (
    <div className="w-full h-[500px] md:h-[650px] relative">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 6.5]} fov={50} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} color="#FFF5EA" />
        <pointLight position={[-5, 5, -5]} intensity={1.2} color="#10B981" />
        <pointLight position={[5, -5, 5]} intensity={1.5} color="#F59E0B" />

        <Sparkles count={120} scale={10} size={3} speed={0.4} color="#10B981" />
        <Sparkles count={60} scale={8} size={4} speed={0.6} color="#F59E0B" />

        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <SolarPanelGroup position={[0, 0.2, 0]} rotation={[0.4, 0.3, 0]} />
        </Float>

        <Float speed={3} rotationIntensity={0.6} floatIntensity={0.8}>
          <BatteryModel position={[3.2, -0.8, -1.2]} rotation={[0.2, -0.4, 0.1]} />
        </Float>

        <Float speed={1.5} floatIntensity={0.5}>
          <mesh position={[-3.5, 1.2, -2.5]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <MeshWobbleMaterial color="#10B981" speed={2} factor={0.3} transparent opacity={0.35} />
          </mesh>
        </Float>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
