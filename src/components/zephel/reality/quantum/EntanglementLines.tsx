import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface EntanglementLinesProps {
  intensity: number;
  fieldSize: number;
  particleCount: number;
}

export const EntanglementLines: React.FC<EntanglementLinesProps> = ({
  intensity,
  fieldSize,
  particleCount
}) => {
  // Quantum entanglement lines
  const entanglementLines = useMemo(() => {
    const lines = [];
    const lineCount = Math.min(50, particleCount / 40);
    
    for (let i = 0; i < lineCount; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * fieldSize * 0.8,
        (Math.random() - 0.5) * fieldSize * 0.8,
        (Math.random() - 0.5) * fieldSize * 0.8
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * fieldSize * 0.8,
        (Math.random() - 0.5) * fieldSize * 0.8,
        (Math.random() - 0.5) * fieldSize * 0.8
      );
      
      lines.push([start, end]);
    }
    
    return lines;
  }, [fieldSize, particleCount]);

  return (
    <>
      {entanglementLines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#00ffff"
          lineWidth={1}
          transparent
          opacity={0.3 * intensity}
          dashed
          dashScale={2}
          dashSize={0.1}
          gapSize={0.05}
        />
      ))}
    </>
  );
};