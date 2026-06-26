import { PageHeader } from '../components/PageHeader';
import { warehouses } from '../data/demoData';
import { StatusPill } from '../components/StatusPill';

export function MultiWarehouse() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Multi-Warehouse"
        title="Distributed storage network"
        description="Manage multiple agricultural warehouses, capacity, crop batches, health scores, and risk levels from one command layer."
        action={<button className="primary-button">Add warehouse</button>}
      />

      <section className="warehouse-grid-cards">
        {warehouses.map((warehouse) => (
          <article className="warehouse-card glass" key={warehouse.id}>
            <div className="warehouse-card-head">
              <div>
                <span>{warehouse.id}</span>
                <h3>{warehouse.name}</h3>
              </div>
              <StatusPill status={warehouse.status} />
            </div>
            <p>{warehouse.location} · {warehouse.crop}</p>
            <div className="warehouse-stat-lines">
              <StatLine label="Health" value={warehouse.health} />
              <StatLine label="Spoilage Risk" value={warehouse.risk} inverse />
              <StatLine label="Capacity" value={warehouse.capacity} />
            </div>
            <button className="secondary-button full">Open command room</button>
          </article>
        ))}
      </section>
    </div>
  );
}

function StatLine({ label, value, inverse = false }: { label: string; value: number; inverse?: boolean }) {
  const fill = inverse ? 100 - value : value;
  return (
    <div className="stat-line">
      <div><span>{label}</span><strong>{value}%</strong></div>
      <em><i style={{ width: `${fill}%` }} /></em>
    </div>
  );
}
