import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BoxIcon } from 'lucide-react';
import { QuantumFieldRenderer } from './QuantumFieldRenderer';
import { DataStreamRenderer } from './DataStreamRenderer';
import { NeuralNetworkRenderer } from './NeuralNetworkRenderer';
import { RealityEnvironment } from './environments/RealityEnvironment';
import { RealityControlPanel } from './components/RealityControlPanel';
import { MetricsPanel } from './components/MetricsPanel';
import { StatusBar } from './components/StatusBar';
import { RenderStats } from './components/RenderStats';

interface RenderingMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface AdvancedRealityRendererProps {
  quantumField?: {
    intensity: number;
    phase: number;
    harmonics: number[];
  };
  onModeChange?: (mode: string) => void;
  metrics?: {
    performance: number;
    complexity: number;
    accuracy: number;
  };
}


export const AdvancedRealityRenderer: React.FC<AdvancedRealityRendererProps> = ({
  quantumField = { intensity: 0.5, phase: 1.0, harmonics: [1, 2, 3, 5, 8] },
  onModeChange,
  metrics = { performance: 85, complexity: 70, accuracy: 92 }
}) => {
  const [activeMode, setActiveMode] = useState<string>('quantum');
  const [isAnimating, setIsAnimating] = useState(true);
  const [renderQuality, setRenderQuality] = useState([75]);
  const [fieldIntensity, setFieldIntensity] = useState([quantumField.intensity * 100]);
  const [showMetrics, setShowMetrics] = useState(true);
  const [renderStats, setRenderStats] = useState({
    fps: 60,
    triangles: 0,
    drawCalls: 0
  });

  const renderingModes: RenderingMode[] = [
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

  const handleModeChange = useCallback((mode: string) => {
    setActiveMode(mode);
    onModeChange?.(mode);
  }, [onModeChange]);

  const resetCamera = useCallback(() => {
    console.log('Camera reset requested');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderStats(prev => ({
        fps: Math.floor(Math.random() * 10) + 55,
        triangles: Math.floor(Math.random() * 50000) + 100000,
        drawCalls: Math.floor(Math.random() * 100) + 200
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentIntensity = fieldIntensity[0] / 100;
  const qualityMultiplier = renderQuality[0] / 100;

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
          activeMode={activeMode}
          isAnimating={isAnimating}
          renderQuality={renderQuality}
          fieldIntensity={fieldIntensity}
          showMetrics={showMetrics}
          onModeChange={handleModeChange}
          onAnimationToggle={() => setIsAnimating(!isAnimating)}
          onCameraReset={resetCamera}
          onMetricsToggle={() => setShowMetrics(!showMetrics)}
          onQualityChange={setRenderQuality}
          onIntensityChange={setFieldIntensity}
        />

        <MetricsPanel
          showMetrics={showMetrics}
          metrics={metrics}
        />

        {/* 3D Canvas */}
        <div className="h-96">
          <Canvas
            className="w-full h-full"
            camera={{ position: [8, 6, 8], fov: 60 }}
            gl={{ 
              antialias: qualityMultiplier > 0.7, 
              alpha: true,
              powerPreference: 'high-performance'
            }}
            shadows={qualityMultiplier > 0.5}
          >
            {/* Environment */}
            <RealityEnvironment intensity={currentIntensity} />

            {/* Rendering Mode Content */}
            {(activeMode === 'quantum' || activeMode === 'hybrid') && (
              <QuantumFieldRenderer
                intensity={currentIntensity}
                phase={quantumField.phase}
                harmonics={quantumField.harmonics}
                particleCount={Math.floor(2000 * qualityMultiplier)}
              />
            )}

            {(activeMode === 'neural' || activeMode === 'hybrid') && (
              <NeuralNetworkRenderer
                layers={[6, 8, 10, 8, 4]}
                processingIntensity={currentIntensity}
              />
            )}

            {(activeMode === 'dataflow' || activeMode === 'hybrid') && (
              <DataStreamRenderer
                streamCount={Math.floor(8 * qualityMultiplier)}
                flowSpeed={currentIntensity}
                dataIntensity={currentIntensity}
                activeConnections={Math.floor(6 * currentIntensity)}
              />
            )}

            {/* Camera Controls */}
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={isAnimating}
              autoRotateSpeed={1 * currentIntensity}
              maxDistance={30}
              minDistance={3}
            />
          </Canvas>
        </div>

        <StatusBar
          activeMode={activeMode}
          renderQuality={renderQuality}
          fieldIntensity={fieldIntensity}
          isAnimating={isAnimating}
          renderingModes={renderingModes}
        />
      </CardContent>
    </Card>
  );
};