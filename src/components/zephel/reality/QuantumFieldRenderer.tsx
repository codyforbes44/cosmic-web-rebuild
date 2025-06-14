import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ParticleField } from './quantum/ParticleField';
import { EntanglementLines } from './quantum/EntanglementLines';
import { QuantumCore } from './quantum/QuantumCore';
import * as THREE from 'three';

interface QuantumFieldProps {
  intensity: number;
  phase: number;
  harmonics: number[];
  particleCount?: number;
  fieldSize?: number;
}

export const QuantumFieldRenderer: React.FC<QuantumFieldProps> = ({
  intensity,
  phase,
  harmonics,
  particleCount = 2000,
  fieldSize = 25
}) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += intensity * 0.01;
      meshRef.current.rotation.x += intensity * 0.005;
    }
  });

  return (
    <group ref={meshRef}>
      <ParticleField
        intensity={intensity}
        phase={phase}
        harmonics={harmonics}
        particleCount={particleCount}
        fieldSize={fieldSize}
      />
      
      <EntanglementLines
        intensity={intensity}
        fieldSize={fieldSize}
        particleCount={particleCount}
      />

      <QuantumCore intensity={intensity} />
    </group>
  );
};