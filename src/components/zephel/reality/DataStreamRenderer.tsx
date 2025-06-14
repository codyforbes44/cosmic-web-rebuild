import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Tube } from '@react-three/drei';
import { DataPacket } from './data/DataPacket';
import { DataHub } from './data/DataHub';
import * as THREE from 'three';

interface DataStreamProps {
  streamCount?: number;
  flowSpeed?: number;
  dataIntensity?: number;
  activeConnections?: number;
}

export const DataStreamRenderer: React.FC<DataStreamProps> = ({
  streamCount = 8,
  flowSpeed = 1,
  dataIntensity = 0.5,
  activeConnections = 4
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate data stream paths
  const dataStreams = useMemo(() => {
    const streams = [];
    
    for (let i = 0; i < streamCount; i++) {
      const angle = (i / streamCount) * Math.PI * 2;
      const radius = 8 + Math.random() * 4;
      const height = (Math.random() - 0.5) * 6;
      
      const startPoint = new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
      
      const controlPoint1 = new THREE.Vector3(
        Math.cos(angle + 0.5) * (radius * 0.7),
        height + (Math.random() - 0.5) * 4,
        Math.sin(angle + 0.5) * (radius * 0.7)
      );
      
      const controlPoint2 = new THREE.Vector3(
        Math.cos(angle + 1) * (radius * 0.4),
        (Math.random() - 0.5) * 3,
        Math.sin(angle + 1) * (radius * 0.4)
      );
      
      const endPoint = new THREE.Vector3(0, 0, 0);
      
      // Create Bezier curve
      const curve = new THREE.CubicBezierCurve3(
        startPoint,
        controlPoint1,
        controlPoint2,
        endPoint
      );
      
      streams.push({
        curve,
        color: `hsl(${180 + (i * 30) % 180}, 70%, 60%)`,
        isActive: i < activeConnections,
        dataPackets: []
      });
    }
    
    return streams;
  }, [streamCount, activeConnections]);

  // Generate data packets for each stream
  const dataPackets = useMemo(() => {
    const packets = [];
    
    dataStreams.forEach((stream, streamIndex) => {
      if (stream.isActive) {
        const packetCount = Math.floor(3 + Math.random() * 5);
        
        for (let i = 0; i < packetCount; i++) {
          packets.push({
            streamIndex,
            position: Math.random(),
            size: 0.1 + Math.random() * 0.2,
            speed: 0.5 + Math.random() * 0.5,
            data: Math.floor(Math.random() * 1000)
          });
        }
      }
    });
    
    return packets;
  }, [dataStreams]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01 * flowSpeed;
      
      // Animate data packets
      dataPackets.forEach(packet => {
        packet.position += packet.speed * flowSpeed * 0.01;
        if (packet.position > 1) {
          packet.position = 0;
          packet.data = Math.floor(Math.random() * 1000);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Data Stream Paths */}
      {dataStreams.map((stream, index) => {
        const points = stream.curve.getPoints(50);
        
        return (
          <group key={index}>
            {/* Stream Path */}
            <Line
              points={points}
              color={stream.isActive ? stream.color : '#333333'}
              lineWidth={stream.isActive ? 2 : 1}
              transparent
              opacity={stream.isActive ? 0.8 : 0.3}
              dashed={!stream.isActive}
              dashScale={1}
              dashSize={0.1}
              gapSize={0.05}
            />
            
            {/* Stream Tube for Active Connections */}
            {stream.isActive && (
              <Tube
                args={[stream.curve, 20, 0.05, 8, false]}
                material-color={stream.color}
                material-transparent
                material-opacity={0.3}
                material-emissive={stream.color}
                material-emissiveIntensity={0.2}
              />
            )}
          </group>
        );
      })}

      {/* Data Packets */}
      {dataPackets.map((packet, index) => {
        const stream = dataStreams[packet.streamIndex];
        const position = stream.curve.getPoint(packet.position);
        
        return (
          <DataPacket
            key={index}
            position={position}
            size={packet.size}
            color={stream.color}
            data={packet.data}
            dataIntensity={dataIntensity}
          />
        );
      })}

      <DataHub dataIntensity={dataIntensity} />
    </group>
  );
};