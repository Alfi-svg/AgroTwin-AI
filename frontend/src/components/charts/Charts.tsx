import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { forecast, warehouses } from '../../data/mockData';

export function TrendLine({ dataKey = 'temperature', height = 220 }: { dataKey?: keyof typeof forecast[number]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={forecast} margin={{ top: 10, right: 12, bottom: 0, left: -18 }}>
        <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis dataKey="hour" tick={{ fill: 'rgba(238,255,246,.48)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(238,255,246,.48)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: '#08120f', border: '1px solid rgba(0,255,136,.22)', borderRadius: 14, color: '#effff7' }} />
        <Line type="monotone" dataKey={dataKey as string} stroke="#00FF88" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AreaTrend({ dataKey = 'humidity', height = 220 }: { dataKey?: keyof typeof forecast[number]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={forecast} margin={{ top: 10, right: 12, bottom: 0, left: -18 }}>
        <defs><linearGradient id={`g-${dataKey}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00FF88" stopOpacity={0.42}/><stop offset="95%" stopColor="#00FF88" stopOpacity={0}/></linearGradient></defs>
        <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis dataKey="hour" tick={{ fill: 'rgba(238,255,246,.48)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(238,255,246,.48)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: '#08120f', border: '1px solid rgba(0,255,136,.22)', borderRadius: 14, color: '#effff7' }} />
        <Area type="monotone" dataKey={dataKey as string} stroke="#00FF88" strokeWidth={2} fill={`url(#g-${dataKey})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function WarehouseBars() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={warehouses} margin={{ top: 10, right: 12, bottom: 0, left: -18 }}>
        <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
        <XAxis dataKey="location" tick={{ fill: 'rgba(238,255,246,.55)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(238,255,246,.55)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: '#08120f', border: '1px solid rgba(0,255,136,.22)', borderRadius: 14, color: '#effff7' }} />
        <Bar dataKey="health" radius={[10, 10, 0, 0]} fill="#00FF88" />
        <Bar dataKey="risk" radius={[10, 10, 0, 0]} fill="#FFD166" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RiskDonut() {
  const data = [
    { name: 'Healthy', value: 72, color: '#00FF88' },
    { name: 'Warning', value: 21, color: '#FFD166' },
    { name: 'Critical', value: 7, color: '#FF4D6D' }
  ];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} innerRadius={58} outerRadius={84} paddingAngle={4} dataKey="value">
          {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
        </Pie>
        <Tooltip contentStyle={{ background: '#08120f', border: '1px solid rgba(0,255,136,.22)', borderRadius: 14, color: '#effff7' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
