import { MapPin } from 'lucide-react';
import { WarehouseBars } from '../components/charts/Charts';
import { PageHeader } from '../components/shared/PageHeader';
import { StatusBadge } from '../components/shared/StatusBadge';
import { warehouses } from '../data/mockData';

export function MultiWarehouse() {
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Multi Warehouse" title="Distributed Storage Network" description="Map view, warehouse cards, comparison dashboard and network health indicators for multiple agricultural storage facilities." action={<button className="primary-btn"><MapPin size={16} /> Add Warehouse</button>} />
      <section className="multi-grid"><article className="glass-card map-card span-2"><div className="map-bg">{warehouses.map((warehouse, index) => <div key={warehouse.id} className={`map-pin ${warehouse.status}`} style={{ left: `${18 + index * 21}%`, top: `${30 + (index % 2) * 24}%` }}><i /><span>{warehouse.location}</span></div>)}</div></article><article className="glass-card"><h2>Comparison Dashboard</h2><WarehouseBars /></article></section>
      <section className="warehouse-card-grid">{warehouses.map((warehouse) => <article key={warehouse.id} className="glass-card warehouse-card"><div className="card-head"><div><h2>{warehouse.name}</h2><p>{warehouse.location} · {warehouse.manager}</p></div><StatusBadge status={warehouse.status} /></div><div className="crop-tags">{warehouse.crops.map((crop) => <span key={crop}>{crop}</span>)}</div><div className="warehouse-metrics"><div><strong>{warehouse.capacity}%</strong><small>Capacity</small></div><div><strong>{warehouse.health}%</strong><small>Health</small></div><div><strong>{warehouse.risk}%</strong><small>Risk</small></div><div><strong>{warehouse.efficiency}%</strong><small>Efficiency</small></div></div></article>)}</section>
    </div>
  );
}
