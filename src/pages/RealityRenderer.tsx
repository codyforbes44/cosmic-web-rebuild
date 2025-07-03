
import React, { useState, useCallback } from 'react';
import { RealityRendering } from '@/components/zephel/RealityRendering';
import { useQuantumCommandProcessor } from '@/hooks/useQuantumCommandProcessor';
import { ZephelPageLayout, ZephelInitializer } from '@/components/zephel/page';
import { PresetScenes } from '@/components/zephel/reality/features/PresetScenes';
import { ExportControls } from '@/components/zephel/reality/features/ExportControls';
import { FullScreenControls } from '@/components/zephel/reality/features/FullScreenControls';
import { PerformanceAnalytics } from '@/components/zephel/reality/features/PerformanceAnalytics';
import { SessionHistory } from '@/components/zephel/reality/features/SessionHistory';
import SEO from '@/components/SEO';

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
        <SEO 
          title="Advanced Reality Rendering Engine - ZEPHEL"
          description="Interactive 3D visualization system with quantum field dynamics, neural network patterns, and real-time data flow rendering. Experience the full power of ZEPHEL's reality synthesis capabilities."
          keywords="3D rendering, quantum visualization, neural networks, data visualization, reality engine, ZEPHEL"
          image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&crop=center"
        />
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-white">
                Advanced Reality Rendering Engine
              </h1>
              <FullScreenControls onFullScreenToggle={(isFullScreen) => console.log('Full screen:', isFullScreen)} />
            </div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Interactive 3D visualization system with quantum field dynamics, neural network patterns, 
              and real-time data flow rendering. Experience the full power of ZEPHEL's reality synthesis capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <RealityRendering
                onConstructSelect={handleConstructSelect}
                quantumField={quantumField}
              />
            </div>
            <div className="space-y-4">
              <PresetScenes onSceneSelect={(scene) => console.log('Scene selected:', scene)} />
              <ExportControls 
                onSaveConfiguration={(name) => console.log('Save config:', name)}
                onExportScreenshot={(format, quality) => console.log('Export screenshot:', format, quality)}
                onExportVideo={(format, duration) => console.log('Export video:', format, duration)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceAnalytics showDetailed={true} />
            <SessionHistory onRestoreSession={(config) => console.log('Restore session:', config)} />
          </div>

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
