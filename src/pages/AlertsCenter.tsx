import { alerts } from '../data/demoData';
import { PageHeader } from '../components/PageHeader';
import { StatusPill } from '../components/StatusPill';

export function AlertsCenter() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Alerts Center"
        title="Critical alerts, warnings, and notifications"
        description="Prioritized event feed for spoilage risk, sensor drift, climate deviation, and automated corrections."
        action={<button className="primary-button">Acknowledge all</button>}
      />

      <section className="alert-summary-grid">
        <SummaryCard label="Critical alerts" value={alerts.filter((a) => a.type === 'Critical').length} tone="critical" />
        <SummaryCard label="Warning alerts" value={alerts.filter((a) => a.type === 'Warning').length} tone="warning" />
        <SummaryCard label="Notifications" value={alerts.filter((a) => a.type === 'Info').length} tone="optimal" />
      </section>

      <section className="glass panel-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Event Queue</span>
            <h3>Live alert timeline</h3>
          </div>
          <span className="soft-badge">Auto-prioritized</span>
        </div>
        <div className="alert-list">
          {alerts.map((alert) => (
            <article key={alert.id} className={`alert-item status-border-${alert.status}`}>
              <div className="alert-id">{alert.id}</div>
              <div>
                <div className="alert-heading">
                  <strong>{alert.title}</strong>
                  <StatusPill status={alert.status} label={alert.type} />
                </div>
                <p>{alert.message}</p>
                <small>{alert.location} · {alert.time}</small>
              </div>
              <button className="secondary-button small">Open</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <article className={`glass summary-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>Last 24 hours</small>
    </article>
  );
}
