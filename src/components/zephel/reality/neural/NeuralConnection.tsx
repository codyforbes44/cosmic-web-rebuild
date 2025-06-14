import React from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralConnectionProps {
  fromPosition: THREE.Vector3;
  toPosition: THREE.Vector3;
  weight: number;
  fromActivation: number;
  activationThreshold: number;
}

export const NeuralConnection: React.FC<NeuralConnectionProps> = ({
  fromPosition,
  toPosition,
  weight,
  fromActivation,
  activationThreshold
}) => {
  const getConnectionOpacity = (weight: number, fromActivation: number) => {
    const baseOpacity = Math.abs(weight) * 0.5;
    const activationBoost = fromActivation > activationThreshold ? 0.5 : 0;
    return Math.min(1, baseOpacity + activationBoost);
  };

  const points = [fromPosition, toPosition];
  const opacity = getConnectionOpacity(weight, fromActivation);
  const color = weight > 0 ? '#00ff00' : '#ff0000';

  return (
    <Line
      points={points}
      color={color}
      lineWidth={Math.abs(weight) * 2}
      transparent
      opacity={opacity}
    />
  );
};