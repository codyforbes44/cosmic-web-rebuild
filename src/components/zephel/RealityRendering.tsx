import React from 'react';
import { RealityRenderer } from '@/components/reality/RealityRenderer';
import { Construct, QuantumField } from '@/types/reality';

// Legacy Reality Rendering Component - now using new RealityRenderer
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
    <RealityRenderer
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