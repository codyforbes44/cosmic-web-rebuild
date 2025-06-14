import React from 'react';

interface QuantumCoreProps {
  intensity: number;
}

export const QuantumCore: React.FC<QuantumCoreProps> = ({ intensity }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#00ffff"
        transparent
        opacity={0.2}
        wireframe
        emissive="#004444"
        emissiveIntensity={intensity}
      />
    </mesh>
  );
};