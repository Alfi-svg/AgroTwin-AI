import { AreaTrend, TrendLine, WarehouseBars } from '../components/charts/Charts';
import { PageHeader } from '../components/shared/PageHeader';

export function Analytics() {
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Analytics" title="Operational Intelligence Analytics" description="Temperature, humidity, gas, spoilage, efficiency and prediction accuracy charts with animated SaaS-style visuals." action={<button className="primary-btn">Download CSV</button>} />
      <section className="analytics-grid"><article className="glass-card"><h2>Temperature Trends</h2><TrendLine dataKey="temperature" /></article><article className="glass-card"><h2>Humidity Trends</h2><AreaTrend dataKey="humidity" /></article><article className="glass-card"><h2>Gas Trends</h2><TrendLine dataKey="gas" /></article><article className="glass-card"><h2>Spoilage Trends</h2><AreaTrend dataKey="spoilage" /></article><article className="glass-card"><h2>Efficiency Charts</h2><TrendLine dataKey="efficiency" /></article><article className="glass-card"><h2>Prediction Accuracy</h2><AreaTrend dataKey="accuracy" /></article><article className="glass-card span-2"><h2>Warehouse Health Comparison</h2><WarehouseBars /></article></section>
    </div>
  );
}
