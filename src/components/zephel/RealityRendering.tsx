import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Torus, Line } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Box3, Eye, RotateCcw, Zap, Play, Pause } from 'lucide-react';
import * as THREE from 'three';

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

// Animated Construct Component
const AnimatedConstruct: React.FC<{ construct: Construct; isActive: boolean }> = ({ 
  construct, 
  isActive 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Quantum rotation based on stability
      meshRef.current.rotation.x += construct.metadata.stability * 0.01;
      meshRef.current.rotation.y += construct.metadata.stability * 0.01;
      
      // Pulsing effect for active constructs
      if (isActive) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  const renderGeometry = () => {
    const material = (
      <meshStandardMaterial 
        color={hovered ? '#ffffff' : construct.color}
        emissive={isActive ? construct.color : '#000000'}
        emissiveIntensity={isActive ? 0.3 : 0}
        transparent
        opacity={0.8}
      />
    );

    switch (construct.type) {
      case 'cube':
        return <boxGeometry args={construct.scale} />;
      case 'sphere':
        return <sphereGeometry args={[construct.scale[0], 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[construct.scale[0], construct.scale[1], 16, 100]} />;
      default:
        return <boxGeometry args={construct.scale} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={construct.position}
      rotation={construct.rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {renderGeometry()}
      <meshStandardMaterial 
        color={hovered ? '#ffffff' : construct.color}
        emissive={isActive ? construct.color : '#000000'}
        emissiveIntensity={isActive ? 0.3 : 0}
        transparent
        opacity={0.8}
      />
      {hovered && (
        <Text
          position={[0, construct.scale[1] + 1, 0]}
          fontSize={0.5}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          {construct.name}
        </Text>
      )}
    </mesh>
  );
};

// Quantum Field Visualization
const QuantumField: React.FC<{ field: QuantumField }> = ({ field }) => {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += field.intensity * 0.01;
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i] * field.phase) * 0.01;
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20; 
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Reality Grid
const RealityGrid: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.rotation.y += 0.002;
    }
  });

  const gridLines = [];
  const gridSize = 20;
  const divisions = 40;
  
  for (let i = 0; i <= divisions; i++) {
    const position = (i / divisions - 0.5) * gridSize;
    
    // Horizontal lines
    gridLines.push([
      new THREE.Vector3(-gridSize/2, 0, position),
      new THREE.Vector3(gridSize/2, 0, position)
    ]);
    
    // Vertical lines
    gridLines.push([
      new THREE.Vector3(position, 0, -gridSize/2),
      new THREE.Vector3(position, 0, gridSize/2)
    ]);
  }

  return (
    <group ref={gridRef}>
      {gridLines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#333333"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
};

// Main Reality Rendering Component
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
  const [selectedConstruct, setSelectedConstruct] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [viewMode, setViewMode] = useState<'reality' | 'quantum' | 'hybrid'>('hybrid');
  const [renderStats, setRenderStats] = useState({
    fps: 0,
    constructs: 0,
    particles: 0
  });

  // Default constructs for demonstration
  const defaultConstructs: Construct[] = [
    {
      id: 'construct_001',
      name: 'Primary.Logic.Core',
      type: 'cube',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#00ff00',
      metadata: {
        created: new Date().toISOString(),
        stability: 0.95,
        quantum_signature: 'QS_001_ALPHA'
      }
    },
    {
      id: 'construct_002', 
      name: 'Memory.Matrix.Node',
      type: 'sphere',
      position: [3, 2, -2],
      rotation: [0, 0, 0],
      scale: [0.8, 0.8, 0.8],
      color: '#0088ff',
      metadata: {
        created: new Date().toISOString(),
        stability: 0.87,
        quantum_signature: 'QS_002_BETA'
      }
    },
    {
      id: 'construct_003',
      name: 'Neural.Gateway.Ring',
      type: 'torus',
      position: [-3, -1, 2],
      rotation: [Math.PI/4, 0, Math.PI/6],
      scale: [1.2, 0.3, 1.2],
      color: '#ff0088',
      metadata: {
        created: new Date().toISOString(),
        stability: 0.92,
        quantum_signature: 'QS_003_GAMMA'
      }
    }
  ];

  const activeConstructs = constructs.length > 0 ? constructs : defaultConstructs;

  const handleConstructClick = useCallback((construct: Construct) => {
    setSelectedConstruct(construct.id);
    onConstructSelect?.(construct);
  }, [onConstructSelect]);

  const resetCamera = useCallback(() => {
    // This would reset the camera position - implementation depends on camera controls
    console.log('Camera reset requested');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderStats(prev => ({
        ...prev,
        fps: Math.floor(Math.random() * 10) + 55, // Simulated FPS
        constructs: activeConstructs.length,
        particles: 1000
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeConstructs.length]);

  return (
    <Card className="bg-space-deep-blue/90 border-gray-700 h-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Box3 className="w-4 h-4 text-cyan-400" />
            Reality Rendering Engine
          </CardTitle>
          <div className="flex gap-1">
            <Badge variant="outline" className="text-xs border-cyan-500 text-cyan-400">
              {renderStats.fps} FPS
            </Badge>
            <Badge variant="outline" className="text-xs border-purple-500 text-purple-400">
              {renderStats.constructs} CONSTRUCTS
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-80 relative">
        
        {/* Control Panel */}
        <div className="absolute top-2 left-2 z-10 flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setViewMode(viewMode === 'reality' ? 'quantum' : 'reality')}
            className="text-xs"
          >
            <Eye className="w-3 h-3 mr-1" />
            {viewMode.toUpperCase()}
          </Button>
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
        </div>

        {/* Construct Info Panel */}
        {selectedConstruct && (
          <div className="absolute top-2 right-2 z-10 bg-black/80 p-2 rounded border border-gray-600 text-xs">
            <div className="text-cyan-400 font-mono">
              {activeConstructs.find(c => c.id === selectedConstruct)?.name}
            </div>
            <div className="text-gray-400">
              Stability: {(activeConstructs.find(c => c.id === selectedConstruct)?.metadata.stability || 0) * 100}%
            </div>
          </div>
        )}

        {/* 3D Canvas */}
        <Canvas
          className="w-full h-full"
          camera={{ position: [5, 5, 5], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <pointLight position={[-10, -10, -5]} color="#00ffff" intensity={0.5} />

          {/* Reality Grid */}
          {(viewMode === 'reality' || viewMode === 'hybrid') && <RealityGrid />}
          
          {/* Quantum Field */}
          {(viewMode === 'quantum' || viewMode === 'hybrid') && (
            <QuantumField field={quantumField} />
          )}

          {/* Constructs */}
          {activeConstructs.map((construct) => (
            <group key={construct.id} onClick={() => handleConstructClick(construct)}>
              <AnimatedConstruct 
                construct={construct} 
                isActive={selectedConstruct === construct.id && isAnimating}
              />
            </group>
          ))}

          {/* Camera Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isAnimating}
            autoRotateSpeed={0.5}
          />
        </Canvas>

        {/* Status Bar */}
        <div className="absolute bottom-2 left-2 right-2 z-10 bg-black/60 p-2 rounded border border-gray-700">
          <div className="flex justify-between items-center text-xs text-gray-300">
            <div className="flex gap-4">
              <span>Mode: {viewMode.toUpperCase()}</span>
              <span>Quantum Phase: {quantumField.phase.toFixed(2)}</span>
              <span>Field Intensity: {(quantumField.intensity * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>Reality Engine: ACTIVE</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};