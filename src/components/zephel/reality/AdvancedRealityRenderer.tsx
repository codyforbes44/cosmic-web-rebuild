import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Float, Html } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  BoxIcon, 
  Eye, 
  RotateCcw, 
  Zap, 
  Play, 
  Pause, 
  Layers, 
  Network, 
  Brain,
  Activity
} from 'lucide-react';
import { QuantumFieldRenderer } from './QuantumFieldRenderer';
import { DataStreamRenderer } from './DataStreamRenderer';
import { NeuralNetworkRenderer } from './NeuralNetworkRenderer';
import * as THREE from 'three';

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

// Background Environment Component
const RealityEnvironment: React.FC<{ intensity: number }> = ({ intensity }) => {
  const envRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (envRef.current) {
      envRef.current.rotation.y += 0.001 * intensity;
    }
  });

  return (
    <group ref={envRef}>
      <Environment preset="night" />
      
      {/* Cosmic Grid */}
      <gridHelper args={[50, 50, '#004488', '#002244']} position={[0, -10, 0]} />
      
      {/* Ambient Lighting */}
      <ambientLight intensity={0.3} color="#004488" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      <pointLight 
        position={[-10, -10, -5]} 
        color="#00ffff" 
        intensity={intensity} 
      />
      
      {/* Reality Boundary */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[25, 32, 32]} />
        <meshStandardMaterial
          color="#001122"
          transparent
          opacity={0.1}
          wireframe
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

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
      icon: <Zap className="w-4 h-4" />,
      description: 'Quantum field visualization with particle dynamics'
    },
    {
      id: 'neural',
      name: 'Neural Network',
      icon: <Brain className="w-4 h-4" />,
      description: 'Neural network topology and activation patterns'
    },
    {
      id: 'dataflow',
      name: 'Data Streams',
      icon: <Network className="w-4 h-4" />,
      description: 'Real-time data flow and processing visualization'
    },
    {
      id: 'hybrid',
      name: 'Hybrid Reality',
      icon: <Layers className="w-4 h-4" />,
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
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs border-green-500 text-green-400">
              {renderStats.fps} FPS
            </Badge>
            <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">
              {Math.floor(renderStats.triangles / 1000)}K ▲
            </Badge>
            <Badge variant="outline" className="text-xs border-purple-500 text-purple-400">
              {renderStats.drawCalls} DC
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        
        {/* Advanced Control Panel */}
        <div className="absolute top-4 left-4 z-10 space-y-3 bg-black/80 p-3 rounded-lg border border-gray-600 max-w-xs">
          
          {/* Rendering Mode Selection */}
          <div className="space-y-2">
            <div className="text-xs text-cyan-400 font-semibold">Rendering Mode:</div>
            <div className="grid grid-cols-2 gap-1">
              {renderingModes.map(mode => (
                <Button
                  key={mode.id}
                  size="sm"
                  variant={activeMode === mode.id ? 'default' : 'outline'}
                  onClick={() => handleModeChange(mode.id)}
                  className="text-xs p-1 h-8"
                  title={mode.description}
                >
                  {mode.icon}
                  <span className="ml-1 hidden sm:inline">{mode.name.split(' ')[0]}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Quality Controls */}
          <div className="space-y-2">
            <div className="text-xs text-cyan-400 font-semibold">Quality: {renderQuality[0]}%</div>
            <Slider
              value={renderQuality}
              onValueChange={setRenderQuality}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          {/* Field Intensity */}
          <div className="space-y-2">
            <div className="text-xs text-cyan-400 font-semibold">Intensity: {fieldIntensity[0]}%</div>
            <Slider
              value={fieldIntensity}
              onValueChange={setFieldIntensity}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          {/* Animation Controls */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAnimating(!isAnimating)}
              className="text-xs"
            >
              {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={resetCamera}
              className="text-xs"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowMetrics(!showMetrics)}
              className="text-xs"
            >
              <Activity className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Performance Metrics Panel */}
        {showMetrics && (
          <div className="absolute top-4 right-4 z-10 bg-black/80 p-3 rounded-lg border border-gray-600">
            <div className="text-xs text-cyan-400 font-semibold mb-2">System Metrics</div>
            <div className="space-y-1 text-xs text-gray-300">
              <div className="flex justify-between gap-4">
                <span>Performance:</span>
                <span className="text-green-400">{metrics.performance}%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Complexity:</span>
                <span className="text-yellow-400">{metrics.complexity}%</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Accuracy:</span>
                <span className="text-blue-400">{metrics.accuracy}%</span>
              </div>
            </div>
          </div>
        )}

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

        {/* Advanced Status Bar */}
        <div className="absolute bottom-2 left-2 right-2 z-10 bg-black/70 p-2 rounded border border-gray-700">
          <div className="flex justify-between items-center text-xs text-gray-300">
            <div className="flex gap-4">
              <span>Mode: {renderingModes.find(m => m.id === activeMode)?.name}</span>
              <span>Quality: {renderQuality[0]}%</span>
              <span>Field Intensity: {fieldIntensity[0]}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
              <span>Reality Engine: {isAnimating ? 'ACTIVE' : 'PAUSED'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};