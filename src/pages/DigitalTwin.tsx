import { PageHeader } from '../components/PageHeader';
import { TwinScene } from '../components/TwinScene';
import { sensorMarkers } from '../data/demoData';
import { StatusPill } from '../components/StatusPill';

export function DigitalTwin() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Digital Twin"
        title="Interactive 3D warehouse model"
        description="Rotate, zoom, inspect sensor markers, and view heatmap layers for warehouse storage conditions."
        action={<button className="primary-button">Sync physical warehouse</button>}
      />

      <section className="twin-layout">
        <TwinScene />
        <aside className="glass panel-card twin-side-panel">
          <div className="section-head">
            <div>
              <span className="eyebrow">Live Markers</span>
              <h3>Sensor status</h3>
            </div>
          </div>
          <div className="marker-list">
            {sensorMarkers.map((marker) => (
              <article key={marker.id}>
                <div>
                  <strong>{marker.name}</strong>
                  <small>{marker.id} · {marker.value}</small>
                </div>
                <StatusPill status={marker.status} />
              </article>
            ))}
          </div>
          <div className="hint-card">
            <strong>3D controls</strong>
            <p>Drag to rotate, scroll to zoom, and inspect colored markers. Heatmap zones show green, yellow, and red risk areas.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
