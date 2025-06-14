import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

interface RealityEnvironmentProps {
  intensity: number;
}

export const RealityEnvironment: React.FC<RealityEnvironmentProps> = ({ intensity }) => {
  const envRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (envRef.current) {
      envRef.current.rotation.y += 0.001 * intensity;
    }
  });

  return (
    <group ref={envRef}>
      <Environment preset="night" />
      
      {/* Cosmic Grid */}
      <gridHelper args={[50, 50, '#004488', '#002244']} position={[0, -10, 0]} />
      
      {/* Ambient Lighting */}
      <ambientLight intensity={0.3} color="#004488" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      <pointLight 
        position={[-10, -10, -5]} 
        color="#00ffff" 
        intensity={intensity} 
      />
      
      {/* Reality Boundary */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[25, 32, 32]} />
        <meshStandardMaterial
          color="#001122"
          transparent
          opacity={0.1}
          wireframe
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};