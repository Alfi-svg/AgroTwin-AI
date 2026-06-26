import { Cpu, Download, Fan, FileText, RefreshCcw } from 'lucide-react';
import { alerts, dashboardMetrics, forecast, quickActions, sensors, warehouses } from '../data/mockData';
import { AreaTrend, RiskDonut, TrendLine, WarehouseBars } from '../components/charts/Charts';
import { MetricCard } from '../components/shared/MetricCard';
import { PageHeader } from '../components/shared/PageHeader';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useWarehouse } from '../contexts/WarehouseContext';

export function Dashboard() {
  const { selectedWarehouse } = useWarehouse();
  const cards = [
    ['Storage Health Score', dashboardMetrics.storageHealthScore, '%', '✺', 'green', 'Composite health from sensors, capacity and incident velocity.'],
    ['Spoilage Risk Score', dashboardMetrics.spoilageRiskScore, '%', '⚠', 'yellow', 'AI-estimated probability across next 24 hours.'],
    ['Temperature', dashboardMetrics.temperature, '°C', '☀', 'green', 'Cold corridor average temperature.'],
    ['Humidity', dashboardMetrics.humidity, '%', '◌', 'yellow', 'Relative humidity in active produce zones.'],
    ['Gas Level', dashboardMetrics.gasLevel, 'ppm', '◈', 'green', 'Ethylene and volatile gas indicator.'],
    ['Moisture', dashboardMetrics.moisture, '%', '≈', 'green', 'Crate and floor moisture average.'],
    ['Air Quality', dashboardMetrics.airQuality, ' AQI', '◆', 'green', 'Air circulation and contaminant score.'],
    ['Active Alerts', dashboardMetrics.activeAlerts, '', '!', 'red', 'Critical and warning alerts requiring action.']
  ] as const;

  return (
    <div className="page-stack">
      <PageHeader eyebrow="Command Center" title="Smart Storage Dashboard" description={`Live operating picture for ${selectedWarehouse.name} with IoT telemetry, digital twin state and AI recommendations.`} action={<button className="primary-btn"><Download size={16} /> Export report</button>} />
      <section className="metric-grid">{cards.map(([title, value, suffix, icon, tone, description]) => <MetricCard key={title} title={title} value={value} suffix={suffix} icon={icon} tone={tone} decimals={title === 'Temperature' || title === 'Moisture' ? 1 : 0} description={description} />)}</section>
      <section className="dashboard-grid">
        <article className="glass-card span-2"><div className="card-head"><div><h2>Mini Analytics</h2><p>24-hour temperature and spoilage forecast.</p></div><StatusBadge status="healthy" /></div><TrendLine dataKey="temperature" /></article>
        <article className="glass-card"><div className="card-head"><div><h2>Risk Mix</h2><p>Current warehouse condition split.</p></div></div><RiskDonut /><div className="center-kpi"><strong>18%</strong><span>overall risk</span></div></article>
        <article className="glass-card"><div className="card-head"><div><h2>Recent Alerts</h2><p>Prioritized by AI impact.</p></div></div><div className="alert-list">{alerts.slice(0, 4).map((alert) => <div key={alert.id} className="list-row"><div><strong>{alert.title}</strong><small>{alert.zone} · {alert.createdAt}</small></div><StatusBadge status={alert.type} /></div>)}</div></article>
        <article className="glass-card"><div className="card-head"><div><h2>Warehouse Status</h2><p>Network health overview.</p></div></div><div className="alert-list">{warehouses.map((warehouse) => <div key={warehouse.id} className="list-row"><div><strong>{warehouse.location}</strong><small>{warehouse.capacity}% capacity · {warehouse.risk}% risk</small></div><StatusBadge status={warehouse.status} /></div>)}</div></article>
        <article className="glass-card"><div className="card-head"><div><h2>Quick Actions</h2><p>Operator-ready workflow shortcuts.</p></div></div><div className="quick-grid">{quickActions.map((action, index) => <button key={action}><span>{[<Cpu size={16}/>, <Fan size={16}/>, <FileText size={16}/>, <Download size={16}/>, <RefreshCcw size={16}/>][index]}</span>{action}</button>)}</div></article>
        <article className="glass-card span-2"><div className="card-head"><div><h2>Latest Sensor Readings</h2><p>Live fused stream from IoT nodes.</p></div></div><div className="sensor-strip">{sensors.map((sensor) => <div key={sensor.id}><strong>{sensor.value}{sensor.unit}</strong><small>{sensor.label} · {sensor.zone}</small><StatusBadge status={sensor.status} /></div>)}</div></article>
        <article className="glass-card span-2"><div className="card-head"><div><h2>Warehouse Comparison</h2><p>Health vs risk by site.</p></div></div><WarehouseBars /></article>
        <article className="glass-card"><div className="card-head"><div><h2>Humidity Watch</h2><p>Risk factor trend.</p></div></div><AreaTrend dataKey="humidity" height={260} /></article>
      </section>
    </div>
  );
}
