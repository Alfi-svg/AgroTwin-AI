import { PageHeader } from '../components/PageHeader';
import { TrendChart } from '../components/Charts';
import { trendData, warehouses } from '../data/demoData';

export function Analytics() {
  const efficiencyData = warehouses.map((warehouse) => ({
    time: warehouse.id,
    efficiency: warehouse.health,
    spoilage: warehouse.risk,
    capacity: warehouse.capacity,
  }));

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Analytics"
        title="Storage performance analytics"
        description="Temperature trends, humidity trends, spoilage trends, and efficiency analytics across warehouses."
        action={<button className="primary-button">Export CSV</button>}
      />

      <section className="dashboard-grid two-by-two">
        <TrendChart data={trendData} metric="temperature" title="Temperature trends" suffix="°C" variant="area" />
        <TrendChart data={trendData} metric="humidity" title="Humidity trends" suffix="%" />
        <TrendChart data={trendData} metric="spoilage" title="Spoilage trends" suffix="%" variant="area" />
        <TrendChart data={efficiencyData} metric="efficiency" title="Warehouse efficiency" suffix="%" variant="bar" />
      </section>

      <section className="glass panel-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Insights</span>
            <h3>AI-generated operational summary</h3>
          </div>
        </div>
        <div className="insight-grid">
          <article><strong>Climate stability</strong><p>Temperature remained mostly inside the target band, with one midday deviation near Zone B.</p></article>
          <article><strong>Humidity pressure</strong><p>Humidity is the strongest driver of risk increase today. Dehumidifier activation is recommended.</p></article>
          <article><strong>Efficiency gap</strong><p>Eastern Smart Storage has the lowest health score and needs priority inspection.</p></article>
        </div>
      </section>
    </div>
  );
}
