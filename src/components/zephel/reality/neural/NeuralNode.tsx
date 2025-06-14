import React from 'react';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralNodeProps {
  id: string;
  position: THREE.Vector3;
  activation: number;
  activationThreshold: number;
}

export const NeuralNode: React.FC<NeuralNodeProps> = ({
  id,
  position,
  activation,
  activationThreshold
}) => {
  const getNodeColor = (activation: number) => {
    if (activation > activationThreshold) {
      return `hsl(${120 + activation * 60}, 70%, ${50 + activation * 30}%)`;
    }
    return `hsl(240, 30%, ${20 + activation * 30}%)`;
  };

  return (
    <group position={position}>
      {/* Node Body */}
      <Sphere args={[0.2 + activation * 0.3]}>
        <meshStandardMaterial
          color={getNodeColor(activation)}
          emissive={getNodeColor(activation)}
          emissiveIntensity={activation * 0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Activation Pulse */}
      {activation > activationThreshold && (
        <Sphere args={[0.4 + activation * 0.5]}>
          <meshStandardMaterial
            color={getNodeColor(activation)}
            transparent
            opacity={0.2}
            wireframe
          />
        </Sphere>
      )}
      
      {/* Node Label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0.6}
      >
        {id}
      </Text>
    </group>
  );
};