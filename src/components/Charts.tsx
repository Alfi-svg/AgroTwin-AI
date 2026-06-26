import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { SensorPoint } from '../types';

interface ChartProps {
  data: SensorPoint[] | Array<Record<string, string | number>>;
  metric: string;
  title: string;
  suffix?: string;
  variant?: 'line' | 'area' | 'bar';
}

export function TrendChart({ data, metric, title, suffix = '', variant = 'line' }: ChartProps) {
  return (
    <section className="chart-card glass">
      <div className="chart-head">
        <div>
          <span className="eyebrow">Trend</span>
          <h3>{title}</h3>
        </div>
        <span className="live-dot">Live</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        {variant === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(238,255,246,.55)" tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(238,255,246,.55)" tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip suffix={suffix} />} />
            <Bar dataKey={metric} radius={[12, 12, 2, 2]} fill="url(#barGradient)" />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5CFF9D" />
                <stop offset="100%" stopColor="#0A7D4F" />
              </linearGradient>
            </defs>
          </BarChart>
        ) : variant === 'area' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`${metric}Area`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5CFF9D" stopOpacity={0.42} />
                <stop offset="95%" stopColor="#5CFF9D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(238,255,246,.55)" tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(238,255,246,.55)" tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip suffix={suffix} />} />
            <Area type="monotone" dataKey={metric} stroke="#5CFF9D" fill={`url(#${metric}Area)`} strokeWidth={3} />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,.07)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(238,255,246,.55)" tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(238,255,246,.55)" tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip suffix={suffix} />} />
            <Line type="monotone" dataKey={metric} stroke="#5CFF9D" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </section>
  );
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
  suffix?: string;
}

function ChartTooltip({ active, payload, label, suffix = '' }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {payload.map((item) => (
        <span key={item.name}>{item.name}: {item.value}{suffix}</span>
      ))}
    </div>
  );
}
