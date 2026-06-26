import { PageHeader } from '../components/PageHeader';

export function Settings() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Settings"
        title="System configuration"
        description="Configure thresholds, automation behavior, notification preferences, and data sync options."
        action={<button className="primary-button">Save changes</button>}
      />

      <section className="settings-grid">
        <SettingsPanel title="Risk thresholds" items={['Temperature critical: 28°C', 'Humidity warning: 68%', 'CO₂ warning: 700 ppm', 'Spoilage critical: 40%']} />
        <SettingsPanel title="Automation" items={['Auto ventilation enabled', 'Cooling assist enabled', 'Dehumidifier recommendations', 'Manual approval for critical actions']} />
        <SettingsPanel title="Notifications" items={['Email alerts', 'SMS for critical events', 'Dashboard notifications', 'Daily summary report']} />
        <SettingsPanel title="Data sync" items={['IoT stream interval: 10 min', 'Prediction refresh: hourly', 'Analytics retention: 12 months', 'Demo mode active']} />
      </section>
    </div>
  );
}

function SettingsPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="glass panel-card settings-panel">
      <h3>{title}</h3>
      {items.map((item) => (
        <label key={item} className="toggle-row">
          <span>{item}</span>
          <input type="checkbox" defaultChecked />
          <i />
        </label>
      ))}
    </article>
  );
}
