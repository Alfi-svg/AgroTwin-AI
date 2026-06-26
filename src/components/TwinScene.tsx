import { Canvas } from '@react-three/fiber';
import { Environment, Html, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useMemo } from 'react';
import { sensorMarkers } from '../data/demoData';
import { StatusPill } from './StatusPill';
import type { StatusLevel } from '../types';

const statusColor: Record<StatusLevel, string> = {
  optimal: '#5CFF9D',
  warning: '#FFD166',
  critical: '#FF4D6D',
};

export function TwinScene() {
  return (
    <div className="twin-canvas glass">
      <Canvas camera={{ position: [5.2, 4.2, 6.5], fov: 45 }} shadows>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 8, 6]} intensity={1.2} castShadow />
          <pointLight position={[-3, 3, -3]} intensity={0.8} color="#5CFF9D" />
          <WarehouseModel />
          <HeatmapLayer />
          {sensorMarkers.map((marker) => (
            <SensorMarker key={marker.id} marker={marker} />
          ))}
          <GridFloor />
          <Environment preset="city" />
          <OrbitControls enablePan enableZoom enableRotate minDistance={4} maxDistance={12} />
        </Suspense>
      </Canvas>
      <div className="twin-legend">
        <span><i className="legend-green" /> Optimal</span>
        <span><i className="legend-yellow" /> Warning</span>
        <span><i className="legend-red" /> Critical</span>
      </div>
    </div>
  );
}

function WarehouseModel() {
  const gltf = useGLTF('/models/agro-warehouse.glb');
  return <primitive object={gltf.scene} scale={1.35} position={[0, 0, 0]} />;
}

function SensorMarker({ marker }: { marker: { position: [number, number, number]; name: string; value: string; status: StatusLevel } }) {
  const color = statusColor[marker.status];
  return (
    <group position={marker.position}>
      <mesh>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.14, 0.22, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
      <Html distanceFactor={8} position={[0, 0.22, 0]} center>
        <div className="sensor-label">
          <strong>{marker.name}</strong>
          <span>{marker.value}</span>
          <StatusPill status={marker.status} />
        </div>
      </Html>
    </group>
  );
}

function HeatmapLayer() {
  const heatZones = useMemo(
    () => [
      { pos: [-1.8, 0.04, -0.8] as [number, number, number], radius: 1.15, color: '#5CFF9D', opacity: 0.24 },
      { pos: [0.7, 0.045, -0.4] as [number, number, number], radius: 1.25, color: '#FFD166', opacity: 0.24 },
      { pos: [1.9, 0.05, 1.0] as [number, number, number], radius: 1.05, color: '#FF4D6D', opacity: 0.28 },
    ],
    [],
  );

  return (
    <group>
      {heatZones.map((zone) => (
        <mesh key={zone.color} position={zone.pos} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[zone.radius, 64]} />
          <meshBasicMaterial color={zone.color} transparent opacity={zone.opacity} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function GridFloor() {
  return (
    <gridHelper args={[9, 18, '#1f6f4a', '#143528']} position={[0, -0.02, 0]} />
  );
}

useGLTF.preload('/models/agro-warehouse.glb');
