import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface DataPacketProps {
  position: THREE.Vector3;
  size: number;
  color: string;
  data: number;
  dataIntensity: number;
}

export const DataPacket: React.FC<DataPacketProps> = ({
  position,
  size,
  color,
  data,
  dataIntensity
}) => {
  return (
    <group position={position}>
      {/* Packet Visualization */}
      <mesh>
        <octahedronGeometry args={[size]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5 * dataIntensity}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Data Label */}
      <Text
        position={[0, size + 0.3, 0]}
        fontSize={0.15}
        color={color}
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0.7}
      >
        {data.toString(16).toUpperCase()}
      </Text>
    </group>
  );
};