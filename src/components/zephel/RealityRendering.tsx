import React from 'react';
import { AdvancedRealityRenderer } from './reality/AdvancedRealityRenderer';

// Legacy interface for backward compatibility
interface Construct {
  id: string;
  name: string;
  type: 'cube' | 'sphere' | 'torus' | 'complex';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  metadata: {
    created: string;
    stability: number;
    quantum_signature: string;
  };
}

interface QuantumField {
  intensity: number;
  phase: number;
  harmonics: number[];
}

// Legacy Reality Rendering Component - now using Advanced Renderer
interface RealityRenderingProps {
  constructs?: Construct[];
  onConstructSelect?: (construct: Construct) => void;
  quantumField?: QuantumField;
}

export const RealityRendering: React.FC<RealityRenderingProps> = ({
  constructs = [],
  onConstructSelect,
  quantumField = { intensity: 0.5, phase: 1.0, harmonics: [1, 2, 3] }
}) => {
  return (
    <AdvancedRealityRenderer
      quantumField={quantumField}
      onModeChange={(mode) => console.log('Rendering mode changed to:', mode)}
      metrics={{
        performance: 85,
        complexity: 70,
        accuracy: 92
      }}
    />
  );
};