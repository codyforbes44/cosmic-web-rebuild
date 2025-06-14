import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { NeuralNode } from './neural/NeuralNode';
import { NeuralConnection } from './neural/NeuralConnection';
import * as THREE from 'three';

interface NeuralNode {
  id: string;
  position: THREE.Vector3;
  activation: number;
  layer: number;
  connections: string[];
}

interface NeuralNetworkProps {
  layers?: number[];
  activationThreshold?: number;
  learningRate?: number;
  processingIntensity?: number;
}

export const NeuralNetworkRenderer: React.FC<NeuralNetworkProps> = ({
  layers = [8, 12, 16, 12, 6],
  activationThreshold = 0.5,
  learningRate = 0.1,
  processingIntensity = 0.7
}) => {
  const networkRef = useRef<THREE.Group>(null);

  // Generate neural network structure
  const { nodes, connections } = useMemo(() => {
    const nodes: NeuralNode[] = [];
    const connections: Array<{ from: string; to: string; weight: number }> = [];
    
    const layerSpacing = 6;
    const nodeSpacing = 1.5;
    
    // Create nodes for each layer
    layers.forEach((nodeCount, layerIndex) => {
      const layerOffset = (layerIndex - layers.length / 2) * layerSpacing;
      
      for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
        const nodeOffset = (nodeIndex - nodeCount / 2) * nodeSpacing;
        
        const node: NeuralNode = {
          id: `${layerIndex}-${nodeIndex}`,
          position: new THREE.Vector3(layerOffset, nodeOffset, 0),
          activation: Math.random(),
          layer: layerIndex,
          connections: []
        };
        
        nodes.push(node);
        
        // Create connections to next layer
        if (layerIndex < layers.length - 1) {
          const nextLayerNodeCount = layers[layerIndex + 1];
          
          for (let nextNodeIndex = 0; nextNodeIndex < nextLayerNodeCount; nextNodeIndex++) {
            const connectionWeight = (Math.random() - 0.5) * 2;
            const targetId = `${layerIndex + 1}-${nextNodeIndex}`;
            
            node.connections.push(targetId);
            connections.push({
              from: node.id,
              to: targetId,
              weight: connectionWeight
            });
          }
        }
      }
    });
    
    return { nodes, connections };
  }, [layers]);

  // Simulate neural activity
  useFrame((state) => {
    if (networkRef.current) {
      const time = state.clock.elapsedTime * processingIntensity;
      
      // Update node activations with wave propagation
      nodes.forEach((node, index) => {
        const wavePhase = time + node.layer * 0.5 + index * 0.1;
        const baseActivation = Math.sin(wavePhase) * 0.5 + 0.5;
        
        // Add some randomness for realistic neural activity
        const noise = (Math.random() - 0.5) * 0.2;
        node.activation = Math.max(0, Math.min(1, baseActivation + noise));
      });
      
      networkRef.current.rotation.y += 0.002 * processingIntensity;
    }
  });


  return (
    <group ref={networkRef}>
      {/* Neural Connections */}
      {connections.map((connection, index) => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        
        if (!fromNode || !toNode) return null;
        
        return (
          <NeuralConnection
            key={index}
            fromPosition={fromNode.position}
            toPosition={toNode.position}
            weight={connection.weight}
            fromActivation={fromNode.activation}
            activationThreshold={activationThreshold}
          />
        );
      })}

      {/* Neural Nodes */}
      {nodes.map((node) => (
        <NeuralNode
          key={node.id}
          id={node.id}
          position={node.position}
          activation={node.activation}
          activationThreshold={activationThreshold}
        />
      ))}

      {/* Layer Labels */}
      {layers.map((nodeCount, layerIndex) => {
        const layerOffset = (layerIndex - layers.length / 2) * 6;
        const layerNames = ['INPUT', 'HIDDEN', 'PROCESS', 'ANALYZE', 'OUTPUT'];
        
        return (
          <Text
            key={layerIndex}
            position={[layerOffset, (nodeCount / 2) * 1.5 + 1, 0]}
            fontSize={0.3}
            color="#00ffff"
            anchorX="center"
            anchorY="middle"
            material-transparent
            material-opacity={0.8}
          >
            {layerNames[layerIndex] || `LAYER ${layerIndex}`}
          </Text>
        );
      })}

      {/* Processing Status */}
      <Text
        position={[0, -8, 0]}
        fontSize={0.4}
        color="#ffff00"
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0.9}
      >
        NEURAL PROCESSING: {(processingIntensity * 100).toFixed(0)}%
      </Text>
    </group>
  );
};