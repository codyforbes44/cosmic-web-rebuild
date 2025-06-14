import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  intensity: number;
  phase: number;
  harmonics: number[];
  particleCount: number;
  fieldSize: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  intensity,
  phase,
  harmonics,
  particleCount,
  fieldSize
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate quantum field particles
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * fieldSize;
      positions[i3 + 1] = (Math.random() - 0.5) * fieldSize;
      positions[i3 + 2] = (Math.random() - 0.5) * fieldSize;
      
      // Color based on quantum harmonics
      const harmonic = harmonics[i % harmonics.length] || 1;
      colors[i3] = 0.2 + harmonic * 0.3; // R
      colors[i3 + 1] = 0.8 + Math.sin(harmonic) * 0.2; // G 
      colors[i3 + 2] = 0.9 + Math.cos(harmonic) * 0.1; // B
      
      // Velocity
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions, colors, velocities };
  }, [particleCount, fieldSize, harmonics]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Quantum wave motion
        const time = state.clock.elapsedTime * intensity;
        const waveX = Math.sin(time + positions[i3] * phase) * 0.1;
        const waveY = Math.cos(time + positions[i3 + 1] * phase) * 0.1;
        const waveZ = Math.sin(time + positions[i3 + 2] * phase) * 0.1;
        
        positions[i3] += waveX * intensity;
        positions[i3 + 1] += waveY * intensity;
        positions[i3 + 2] += waveZ * intensity;
        
        // Quantum color fluctuation
        const harmonic = harmonics[i % harmonics.length] || 1;
        colors[i3] = 0.2 + Math.sin(time * harmonic) * 0.3;
        colors[i3 + 1] = 0.8 + Math.cos(time * harmonic * 1.1) * 0.2;
        colors[i3 + 2] = 0.9 + Math.sin(time * harmonic * 0.9) * 0.1;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};