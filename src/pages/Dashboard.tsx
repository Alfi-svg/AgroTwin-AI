import { alerts, dashboardMetrics, trendData, warehouses } from '../data/demoData';
import { MetricCard } from '../components/MetricCard';
import { PageHeader } from '../components/PageHeader';
import { TrendChart } from '../components/Charts';
import { StatusPill } from '../components/StatusPill';

export function Dashboard() {
  const primaryMetrics = dashboardMetrics;
  const topWarehouse = warehouses[0];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Command Center"
        title="Storage intelligence dashboard"
        description="Live AI overview of agricultural storage health, spoilage risk, sensor behavior, and autonomous actions."
        action={<button className="primary-button">Generate AI Report</button>}
      />

      <section className="hero-panel glass">
        <div>
          <span className="eyebrow">AgroTwin AI</span>
          <h2>Agentic Digital Twin for smarter post-harvest storage.</h2>
          <p>
            Real-time IoT monitoring, predictive spoilage analytics, and autonomous recommendations for warehouse operators.
          </p>
          <div className="hero-actions">
            <button className="primary-button">Start live scan</button>
            <button className="secondary-button">View twin</button>
          </div>
        </div>
        <div className="orbital-card">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <div className="orbital-core">
            <strong>{topWarehouse.health}%</strong>
            <span>Health Score</span>
          </div>
        </div>
      </section>

      <section className="metric-grid">
        {primaryMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="dashboard-grid">
        <TrendChart data={trendData} metric="temperature" title="Temperature trend" suffix="°C" variant="area" />
        <TrendChart data={trendData} metric="spoilage" title="Spoilage risk trend" suffix="%" />
      </section>

      <section className="split-grid">
        <div className="glass panel-card">
          <div className="section-head">
            <div>
              <span className="eyebrow">Warehouses</span>
              <h3>Operational status</h3>
            </div>
            <span className="soft-badge">4 sites</span>
          </div>
          <div className="warehouse-list">
            {warehouses.map((warehouse) => (
              <div className="warehouse-row" key={warehouse.id}>
                <div>
                  <strong>{warehouse.name}</strong>
                  <small>{warehouse.location} · {warehouse.crop}</small>
                </div>
                <div className="warehouse-metrics">
                  <span>{warehouse.health}% health</span>
                  <StatusPill status={warehouse.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass panel-card">
          <div className="section-head">
            <div>
              <span className="eyebrow">Alerts</span>
              <h3>Latest events</h3>
            </div>
            <span className="soft-badge danger">{alerts.filter((a) => a.type === 'Critical').length} critical</span>
          </div>
          <div className="alert-mini-list">
            {alerts.slice(0, 4).map((alert) => (
              <article key={alert.id}>
                <StatusPill status={alert.status} label={alert.type} />
                <div>
                  <strong>{alert.title}</strong>
                  <small>{alert.location} · {alert.time}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
