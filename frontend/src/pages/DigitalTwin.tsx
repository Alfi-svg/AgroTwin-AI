import { Layers3, Move3D, Radar } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatusBadge } from '../components/shared/StatusBadge';
import { twinSensors } from '../data/mockData';
import { WarehouseTwin } from '../three/WarehouseTwin';

export function DigitalTwin() {
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Hero Feature" title="Industrial Warehouse Digital Twin" description="Interactive 3D warehouse with GLTF model, racks, sensor nodes, live pulses, heatmap layer and green/yellow/red status visualization." action={<button className="primary-btn"><Move3D size={16} /> Explore Twin</button>} />
      <WarehouseTwin />
      <section className="twin-info-grid">
        <article className="glass-card"><div className="card-head"><div><h2>Live Sensor Indicators</h2><p>Node-level status mapped inside the 3D warehouse.</p></div><Radar size={20} /></div><div className="alert-list">{twinSensors.map((sensor) => <div key={sensor.id} className="list-row"><div><strong>{sensor.label}</strong><small>{sensor.id} · {sensor.value}</small></div><StatusBadge status={sensor.status} /></div>)}</div></article>
        <article className="glass-card"><div className="card-head"><div><h2>Warehouse Layers</h2><p>Digital twin overlay controls.</p></div><Layers3 size={20} /></div><div className="feature-list"><span>GLTF industrial warehouse model</span><span>Rack and crate geometry</span><span>Spoilage heatmap circles</span><span>Rotatable, pannable, zoomable view</span><span>Animated sensor pulses and labels</span></div></article>
      </section>
    </div>
  );
}
