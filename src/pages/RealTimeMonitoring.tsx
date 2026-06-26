import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { MetricCard } from '../components/MetricCard';
import { TrendChart } from '../components/Charts';
import { dashboardMetrics, trendData } from '../data/demoData';
import type { SensorMetric, SensorPoint, StatusLevel } from '../types';

function getStatus(label: string, value: number): StatusLevel {
  if (label.includes('Gas') && value > 820) return 'critical';
  if (label.includes('Humidity') && value > 70) return 'warning';
  if (label.includes('Temperature') && value > 27) return 'critical';
  if (label.includes('Spoilage') && value > 35) return 'critical';
  if (value > 75 && !label.includes('Health')) return 'warning';
  return 'optimal';
}

export function RealTimeMonitoring() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 2500);
    return () => window.clearInterval(timer);
  }, []);

  const liveMetrics: SensorMetric[] = useMemo(() => {
    return dashboardMetrics.map((metric, index) => {
      const drift = Math.sin((tick + index) / 2) * (index % 2 === 0 ? 1.4 : 2.8);
      const nextValue = Number((metric.value + drift).toFixed(metric.unit === '°C' ? 1 : 0));
      return {
        ...metric,
        value: nextValue,
        status: getStatus(metric.label, nextValue),
        delta: `${drift >= 0 ? '+' : ''}${drift.toFixed(metric.unit === '°C' ? 1 : 0)}${metric.unit || ''}`,
      };
    });
  }, [tick]);

  const liveTrend: SensorPoint[] = useMemo(() => {
    return trendData.map((point, index) => ({
      ...point,
      temperature: Number((point.temperature + Math.sin((tick + index) / 3) * 0.8).toFixed(1)),
      humidity: Number((point.humidity + Math.cos((tick + index) / 4) * 2).toFixed(0)),
      gas: Number((point.gas + Math.sin((tick + index) / 2) * 42).toFixed(0)),
    }));
  }, [tick]);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Real-Time Monitoring"
        title="Live warehouse telemetry"
        description="Simulated sensor stream for temperature, humidity, gas concentration, moisture, air quality, and active alerts."
        action={<span className="sync-badge"><i /> Streaming demo data</span>}
      />

      <section className="metric-grid">
        {liveMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} compact />
        ))}
      </section>

      <section className="dashboard-grid three">
        <TrendChart data={liveTrend} metric="temperature" title="Temperature live stream" suffix="°C" variant="area" />
        <TrendChart data={liveTrend} metric="humidity" title="Humidity live stream" suffix="%" />
        <TrendChart data={liveTrend} metric="gas" title="Gas level stream" suffix="ppm" variant="bar" />
      </section>

      <section className="glass panel-card">
        <div className="section-head">
          <div>
            <span className="eyebrow">Sensor Grid</span>
            <h3>Zone-level monitoring matrix</h3>
          </div>
        </div>
        <div className="sensor-table">
          {['Zone A', 'Zone B', 'Cold Room', 'Rack T3', 'Dry Storage'].map((zone, index) => (
            <div className="sensor-table-row" key={zone}>
              <strong>{zone}</strong>
              <span>{(23.5 + index * 0.7 + Math.sin(tick / 2)).toFixed(1)}°C</span>
              <span>{(61 + index * 3 + Math.cos(tick / 2) * 2).toFixed(0)}% RH</span>
              <span>{(540 + index * 88 + Math.sin(tick / 3) * 24).toFixed(0)} ppm</span>
              <span>{index > 2 ? 'Warning' : 'Optimal'}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
