import { Activity, Clock, RefreshCcw } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../components/shared/PageHeader';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useLiveSensors } from '../hooks/useLiveSensors';

export function RealTimeMonitoring() {
  const { readings, lastUpdated } = useLiveSensors();
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Real-Time Monitoring" title="Simulated Live Sensor Network" description="Auto-refreshing IoT readings with animated graphs, health indicators and threshold-aware status changes." action={<button className="ghost-btn"><RefreshCcw size={16} /> Auto refresh on</button>} />
      <section className="sensor-card-grid">{readings.map((sensor) => <article className="glass-card sensor-card" key={sensor.id}><div className="card-head"><div><h2>{sensor.label}</h2><p>{sensor.id} · Zone {sensor.zone}</p></div><StatusBadge status={sensor.status} /></div><div className="sensor-value"><strong>{sensor.value}</strong><span>{sensor.unit}</span></div><div className="sparkline"><ResponsiveContainer width="100%" height={76}><AreaChart data={sensor.series.map((value, index) => ({ index, value }))}><Area dataKey="value" type="monotone" stroke="#00FF88" fill="#00FF88" fillOpacity={0.16} strokeWidth={2} dot={false} /></AreaChart></ResponsiveContainer></div><div className="sensor-meta"><span><Activity size={14} /> Health {sensor.health}%</span><span>{sensor.trend}</span></div></article>)}</section>
      <section className="glass-card"><div className="card-head"><div><h2>Sensor Health Status</h2><p>Last refresh: {lastUpdated.toLocaleTimeString()}</p></div><span className="sync-pill"><Clock size={14} /> live engine</span></div><div className="health-table">{readings.map((sensor) => <div key={sensor.id} className="health-row"><span>{sensor.id}</span><strong>{sensor.label}</strong><progress value={sensor.health} max={100} /><StatusBadge status={sensor.status} /></div>)}</div></section>
    </div>
  );
}
