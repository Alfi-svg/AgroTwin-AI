import { useMemo, useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatusBadge } from '../components/shared/StatusBadge';
import { alerts } from '../data/mockData';
import type { AlertItem, AlertType } from '../types';

const tabs: (AlertType | 'all')[] = ['all', 'critical', 'warning', 'info'];

export function AlertsCenter() {
  const [tab, setTab] = useState<AlertType | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<AlertItem | null>(null);
  const filtered = useMemo(() => alerts.filter((alert) => (tab === 'all' || alert.type === tab) && [alert.title, alert.warehouse, alert.zone, alert.message].join(' ').toLowerCase().includes(query.toLowerCase())), [tab, query]);
  return (
    <div className="page-stack">
      <PageHeader eyebrow="Alert Center" title="Prioritized Incident Workflow" description="Critical, warning and informational alerts with search, filtering, pagination-ready table, badges and details modal." action={<button className="ghost-btn"><Filter size={16} /> Smart filters</button>} />
      <section className="glass-card"><div className="alert-toolbar"><div className="tabs">{tabs.map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div><div className="table-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search alerts..." /></div></div><div className="alert-table">{filtered.map((alert) => <button key={alert.id} className="alert-row" onClick={() => setSelected(alert)}><span>{alert.id}</span><strong>{alert.title}</strong><em>{alert.warehouse}</em><small>{alert.zone}</small><StatusBadge status={alert.type} /><small>{alert.status}</small></button>)}</div><div className="pagination"><button>Previous</button><span>Page 1 of 1 · {filtered.length} alerts</span><button>Next</button></div></section>
      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><article className="modal glass-shell" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X size={18} /></button><StatusBadge status={selected.type} /><h2>{selected.title}</h2><p>{selected.message}</p><dl><div><dt>Warehouse</dt><dd>{selected.warehouse}</dd></div><div><dt>Zone</dt><dd>{selected.zone}</dd></div><div><dt>Status</dt><dd>{selected.status}</dd></div><div><dt>Priority</dt><dd>{selected.priority}/100</dd></div></dl><button className="primary-btn">Create maintenance ticket</button></article></div>}
    </div>
  );
}
