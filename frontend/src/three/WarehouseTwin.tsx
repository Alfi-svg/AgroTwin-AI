import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';
import { twinSensors } from '../data/mockData';

type TwinLayer = 'racks' | 'heatmap' | 'sensors';

const colorMap = { healthy: '#00FF88', warning: '#FFD166', critical: '#FF4D6D' } as const;

function GLTFWarehouse() {
  const { scene } = useGLTF('/models/agro-warehouse.glb');
  return <primitive object={scene} scale={0.72} position={[0, -0.65, 0]} />;
}

function Rack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 3 }, (_, y) => <mesh key={y} position={[0, y * 0.45, 0]} castShadow receiveShadow><boxGeometry args={[1.1, 0.08, 2.1]} /><meshStandardMaterial color="#16251f" metalness={0.25} roughness={0.58} /></mesh>)}
      {[-0.48, 0.48].map((x) => <mesh key={x} position={[x, 0.48, -0.95]} castShadow><boxGeometry args={[0.08, 1.05, 0.08]} /><meshStandardMaterial color="#32463d" /></mesh>)}
      {[-0.48, 0.48].map((x) => <mesh key={`b${x}`} position={[x, 0.48, 0.95]} castShadow><boxGeometry args={[0.08, 1.05, 0.08]} /><meshStandardMaterial color="#32463d" /></mesh>)}
      {Array.from({ length: 8 }, (_, i) => <mesh key={`crate-${i}`} position={[-0.33 + (i % 2) * 0.66, 0.13 + Math.floor(i / 4) * 0.43, -0.56 + (Math.floor(i / 2) % 2) * 1.1]} castShadow><boxGeometry args={[0.42, 0.26, 0.42]} /><meshStandardMaterial color={i % 3 === 0 ? '#506b32' : '#755c2e'} /></mesh>)}
    </group>
  );
}

function PulseSensor({ sensor }: { sensor: typeof twinSensors[number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 3) * 0.16;
    if (mesh.current) mesh.current.scale.setScalar(s);
  });
  return (
    <group position={sensor.position}>
      <mesh ref={mesh}><sphereGeometry args={[0.12, 24, 24]} /><meshStandardMaterial color={colorMap[sensor.status]} emissive={colorMap[sensor.status]} emissiveIntensity={1.4} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.18, 0.34, 48]} /><meshBasicMaterial color={colorMap[sensor.status]} transparent opacity={0.35} side={THREE.DoubleSide} /></mesh>
      <Html distanceFactor={8} position={[0, 0.33, 0]} center>
        <div className={`twin-label ${sensor.status}`}><strong>{sensor.label}</strong><span>{sensor.value}</span></div>
      </Html>
    </group>
  );
}

function HeatmapLayer() {
  const zones = [
    { pos: [-2.2, -0.47, 1.2], color: '#FFD166', opacity: 0.22 },
    { pos: [2.6, -0.46, -0.7], color: '#FF4D6D', opacity: 0.18 },
    { pos: [0.1, -0.45, -1.8], color: '#00FF88', opacity: 0.12 }
  ];
  return <>{zones.map((zone, index) => <mesh key={index} position={zone.pos as [number, number, number]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[1.45, 56]} /><meshBasicMaterial color={zone.color} transparent opacity={zone.opacity} side={THREE.DoubleSide} /></mesh>)}</>;
}

function WarehouseScene({ layers }: { layers: Record<TwinLayer, boolean> }) {
  return (
    <>
      <ambientLight intensity={0.56} />
      <directionalLight position={[6, 8, 4]} intensity={1.4} castShadow />
      <pointLight position={[-4, 3, -3]} intensity={2.4} color="#00FF88" />
      <mesh position={[0, -0.55, 0]} receiveShadow><boxGeometry args={[8.6, 0.08, 5.8]} /><meshStandardMaterial color="#07110e" metalness={0.2} roughness={0.8} /></mesh>
      <mesh position={[0, 1.2, -2.8]} receiveShadow><boxGeometry args={[8.6, 3.5, 0.12]} /><meshStandardMaterial color="#0d1915" transparent opacity={0.78} /></mesh>
      <mesh position={[-4.25, 1.2, 0]} receiveShadow><boxGeometry args={[0.12, 3.5, 5.8]} /><meshStandardMaterial color="#101f1a" transparent opacity={0.68} /></mesh>
      <mesh position={[4.25, 1.2, 0]} receiveShadow><boxGeometry args={[0.12, 3.5, 5.8]} /><meshStandardMaterial color="#101f1a" transparent opacity={0.68} /></mesh>
      <Suspense fallback={null}><GLTFWarehouse /></Suspense>
      {layers.racks && [-2.8, -0.9, 1.0, 2.9].map((x, i) => <Rack key={i} position={[x, -0.45, i % 2 ? 0.7 : -0.7]} />)}
      {layers.heatmap && <HeatmapLayer />}
      {layers.sensors && twinSensors.map((sensor) => <PulseSensor key={sensor.id} sensor={sensor} />)}
      <gridHelper args={[9, 18, '#0f7c54', '#14352a']} position={[0, -0.5, 0]} />
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={4} maxDistance={12} maxPolarAngle={Math.PI / 2.1} />
    </>
  );
}

export function WarehouseTwin() {
  const [resetKey, setResetKey] = useState(0);
  const [layers, setLayers] = useState<Record<TwinLayer, boolean>>({ racks: true, heatmap: true, sensors: true });
  return (
    <div className="twin-shell glass-card">
      <div className="twin-toolbar">
        <div><strong>Industrial Warehouse Digital Twin</strong><small>Rotate · Pan · Zoom · Inspect sensor state</small></div>
        <div className="layer-buttons">
          {(Object.keys(layers) as TwinLayer[]).map((layer) => <button key={layer} className={layers[layer] ? 'active' : ''} onClick={() => setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }))}>{layer}</button>)}
          <button onClick={() => setResetKey((value) => value + 1)}><RotateCcw size={16} /> Reset</button>
        </div>
      </div>
      <div className="canvas-wrap">
        <Canvas key={resetKey} shadows dpr={[1, 1.7]}>
          <PerspectiveCamera makeDefault position={[6, 4.2, 6.8]} fov={47} />
          <color attach="background" args={['#030806']} />
          <fog attach="fog" args={['#030806', 8, 18]} />
          <WarehouseScene layers={layers} />
        </Canvas>
      </div>
      <div className="twin-legend"><span><i className="green" /> Healthy</span><span><i className="yellow" /> Warning</span><span><i className="red" /> Critical</span></div>
    </div>
  );
}

useGLTF.preload('/models/agro-warehouse.glb');
