import type { SensorMetric } from '../types';
import { clamp } from '../lib/status';
import { StatusPill } from './StatusPill';

interface MetricCardProps {
  metric: SensorMetric;
  compact?: boolean;
}

export function MetricCard({ metric, compact = false }: MetricCardProps) {
  const inverse = metric.label.toLowerCase().includes('risk') || metric.label.toLowerCase().includes('alert');
  const width = inverse ? 100 - clamp(metric.value) : clamp(metric.value);

  return (
    <article className={`metric-card glass ${compact ? 'compact' : ''}`}>
      <div className="metric-topline">
        <span>{metric.label}</span>
        <StatusPill status={metric.status} />
      </div>
      <div className="metric-value">
        {metric.value}
        <small>{metric.unit}</small>
      </div>
      <div className="metric-meta">
        <span>{metric.delta}</span>
        <span>{metric.target}</span>
      </div>
      <div className="metric-track" aria-hidden="true">
        <span className={`metric-fill status-bg-${metric.status}`} style={{ width: `${Math.max(8, width)}%` }} />
      </div>
    </article>
  );
}
