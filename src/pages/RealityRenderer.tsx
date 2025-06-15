import React, { useState, useCallback } from 'react';
import { RealityRendering } from '@/components/zephel/RealityRendering';
import { useQuantumCommandProcessor } from '@/hooks/useQuantumCommandProcessor';
import { ZephelPageLayout, ZephelInitializer } from '@/components/zephel/page';

const RealityRenderer = () => {
  const [selectedConstruct, setSelectedConstruct] = useState<any>(null);
  const { quantumState } = useQuantumCommandProcessor();

  const handleConstructSelect = useCallback((construct: any) => {
    setSelectedConstruct(construct);
    console.log('Construct selected:', construct);
  }, []);

  const quantumField = {
    intensity: quantumState.coherence,
    phase: quantumState.neural_resonance,
    harmonics: [1, 2, 3, 5, 8]
  };

  return (
    <ZephelPageLayout>
      <ZephelInitializer>
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Advanced Reality Rendering Engine
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Interactive 3D visualization system with quantum field dynamics, neural network patterns, 
              and real-time data flow rendering. Experience the full power of ZEPHEL's reality synthesis capabilities.
            </p>
          </div>

          <RealityRendering
            onConstructSelect={handleConstructSelect}
            quantumField={quantumField}
          />

          {selectedConstruct && (
            <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
              <h3 className="text-cyan-400 font-medium mb-2">Selected Construct:</h3>
              <pre className="text-gray-300 text-sm">
                {JSON.stringify(selectedConstruct, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </ZephelInitializer>
    </ZephelPageLayout>
  );
};

export default RealityRenderer;