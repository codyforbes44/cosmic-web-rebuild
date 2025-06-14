import React from 'react';
import { Text } from '@react-three/drei';

interface DataHubProps {
  dataIntensity: number;
}

export const DataHub: React.FC<DataHubProps> = ({ dataIntensity }) => {
  return (
    <>
      {/* Central Data Hub */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.8]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#004422"
          emissiveIntensity={dataIntensity}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Data Flow Indicators */}
      {Array.from({ length: 6 }).map((_, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const radius = 1.2;
        
        return (
          <Text
            key={index}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
            rotation={[0, -angle, 0]}
            fontSize={0.1}
            color="#00ffff"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={0.8}
          >
            {['INPUT', 'PROCESS', 'ANALYZE', 'LEARN', 'OUTPUT', 'FEEDBACK'][index]}
          </Text>
        );
      })}
    </>
  );
};