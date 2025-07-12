import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BoxIcon } from 'lucide-react';
import { QuantumFieldRenderer } from '@/components/zephel/reality/QuantumFieldRenderer';
import { DataStreamRenderer } from '@/components/zephel/reality/DataStreamRenderer';
import { NeuralNetworkRenderer } from '@/components/zephel/reality/NeuralNetworkRenderer';
import { RealityEnvironment } from '@/components/zephel/reality/environments/RealityEnvironment';
import { RealityControlPanel } from '@/components/zephel/reality/components/RealityControlPanel';
import { MetricsPanel } from '@/components/zephel/reality/components/MetricsPanel';
import { StatusBar } from '@/components/zephel/reality/components/StatusBar';
import { RenderStats } from '@/components/zephel/reality/components/RenderStats';
import { useRealityState } from '@/hooks/useRealityState';
import { QuantumField, RenderMetrics, RenderingMode } from '@/types/reality';

interface RealityRendererProps {
  quantumField?: QuantumField;
  onModeChange?: (mode: string) => void;
  metrics?: RenderMetrics;
}

const RENDERING_MODES: RenderingMode[] = [
  {
    id: 'quantum',
    name: 'Quantum Field',
    icon: <BoxIcon className="w-4 h-4" />,
    description: 'Quantum field visualization with particle dynamics'
  },
  {
    id: 'neural',
    name: 'Neural Network',
    icon: <BoxIcon className="w-4 h-4" />,
    description: 'Neural network topology and activation patterns'
  },
  {
    id: 'dataflow',
    name: 'Data Streams',
    icon: <BoxIcon className="w-4 h-4" />,
    description: 'Real-time data flow and processing visualization'
  },
  {
    id: 'hybrid',
    name: 'Hybrid Reality',
    icon: <BoxIcon className="w-4 h-4" />,
    description: 'Combined quantum, neural, and data visualizations'
  }
];

export const RealityRenderer: React.FC<RealityRendererProps> = ({
  quantumField = { intensity: 0.5, phase: 1.0, harmonics: [1, 2, 3, 5, 8] },
  onModeChange,
  metrics = { performance: 85, complexity: 70, accuracy: 92 }
}) => {
  const { config, renderStats, updateConfig } = useRealityState({
    fieldIntensity: [quantumField.intensity * 100]
  });

  const handleModeChange = (mode: string) => {
    updateConfig({ activeMode: mode });
    onModeChange?.(mode);
  };

  const handleAnimationToggle = () => {
    updateConfig({ isAnimating: !config.isAnimating });
  };

  const handleMetricsToggle = () => {
    updateConfig({ showMetrics: !config.showMetrics });
  };

  const handleQualityChange = (quality: number[]) => {
    updateConfig({ renderQuality: quality });
  };

  const handleIntensityChange = (intensity: number[]) => {
    updateConfig({ fieldIntensity: intensity });
  };

  const resetCamera = () => {
    console.log('Camera reset requested');
  };

  const currentIntensity = config.fieldIntensity[0] / 100;
  const qualityMultiplier = config.renderQuality[0] / 100;

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <BoxIcon className="w-4 h-4 text-cyan-400" />
            Advanced Reality Rendering Engine
          </CardTitle>
          <RenderStats renderStats={renderStats} />
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        
        <RealityControlPanel
          activeMode={config.activeMode}
          isAnimating={config.isAnimating}
          renderQuality={config.renderQuality}
          fieldIntensity={config.fieldIntensity}
          showMetrics={config.showMetrics}
          onModeChange={handleModeChange}
          onAnimationToggle={handleAnimationToggle}
          onCameraReset={resetCamera}
          onMetricsToggle={handleMetricsToggle}
          onQualityChange={handleQualityChange}
          onIntensityChange={handleIntensityChange}
        />

        {config.showMetrics && (
          <MetricsPanel 
            showMetrics={config.showMetrics}
            metrics={metrics}
          />
        )}

        <div className="h-[600px] relative">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="bg-black"
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
          >
            <RealityEnvironment intensity={currentIntensity} />
            
            {(config.activeMode === 'quantum' || config.activeMode === 'hybrid') && (
              <QuantumFieldRenderer
                intensity={currentIntensity}
                phase={quantumField.phase}
                harmonics={quantumField.harmonics}
                particleCount={Math.floor(500 * qualityMultiplier)}
              />
            )}

            {(config.activeMode === 'neural' || config.activeMode === 'hybrid') && (
              <NeuralNetworkRenderer
                layers={[6, 8, 10, 8, 4]}
                processingIntensity={currentIntensity}
              />
            )}

            {(config.activeMode === 'dataflow' || config.activeMode === 'hybrid') && (
              <DataStreamRenderer
                streamCount={Math.floor(8 * qualityMultiplier)}
                flowSpeed={currentIntensity}
                dataIntensity={currentIntensity}
                activeConnections={Math.floor(6 * currentIntensity)}
              />
            )}

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              zoomSpeed={0.6}
              panSpeed={0.8}
              rotateSpeed={0.4}
            />
          </Canvas>
        </div>

        <StatusBar 
          activeMode={config.activeMode} 
          renderQuality={config.renderQuality}
          fieldIntensity={config.fieldIntensity}
          isAnimating={config.isAnimating}
          renderingModes={RENDERING_MODES}
        />
      </CardContent>
    </Card>
  );
};