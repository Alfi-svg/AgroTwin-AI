import type { AlertItem, DashboardMetrics, ForecastPoint, SensorReading, Warehouse } from '../types';

const wave = (base: number, step: number, count = 24) =>
  Array.from({ length: count }, (_, i) => Number((base + Math.sin(i / 2.4) * step + (i % 5) * 0.16).toFixed(2)));

export const dashboardMetrics: DashboardMetrics = {
  storageHealthScore: 94,
  spoilageRiskScore: 18,
  temperature: 18.4,
  humidity: 68,
  gasLevel: 312,
  moisture: 13.8,
  airQuality: 91,
  activeAlerts: 3
};

export const sensors: SensorReading[] = [
  { id: 'TMP-A1', label: 'Temperature', value: 18.4, unit: '°C', status: 'healthy', zone: 'A1', trend: '+0.3', health: 98, min: 12, max: 28, series: wave(18.2, 2.2) },
  { id: 'HUM-A2', label: 'Humidity', value: 68, unit: '%', status: 'warning', zone: 'A2', trend: '+4', health: 83, min: 42, max: 82, series: wave(64, 6.4) },
  { id: 'GAS-B1', label: 'Gas Level', value: 312, unit: 'ppm', status: 'healthy', zone: 'B1', trend: '-12', health: 91, min: 120, max: 480, series: wave(302, 34) },
  { id: 'MOI-B3', label: 'Moisture', value: 13.8, unit: '%', status: 'healthy', zone: 'B3', trend: '-0.6', health: 96, min: 8, max: 22, series: wave(13.5, 2.1) },
  { id: 'AIR-C2', label: 'Air Quality', value: 91, unit: 'AQI', status: 'healthy', zone: 'C2', trend: '+2', health: 94, min: 40, max: 100, series: wave(88, 6.8) }
];

export const warehouses: Warehouse[] = [
  { id: 'wh-001', name: 'Dhaka Cold Storage Alpha', location: 'Dhaka', manager: 'Ops Team Alpha', crops: ['Potato', 'Onion', 'Tomato'], capacity: 86, health: 94, risk: 12, efficiency: 92, status: 'healthy', coordinates: { lat: 23.8103, lng: 90.4125 } },
  { id: 'wh-002', name: 'Chattogram Grain Hub', location: 'Chattogram', manager: 'Coastal Storage Unit', crops: ['Rice', 'Wheat', 'Maize'], capacity: 73, health: 82, risk: 28, efficiency: 81, status: 'warning', coordinates: { lat: 22.3569, lng: 91.7832 } },
  { id: 'wh-003', name: 'Rajshahi Mango Reserve', location: 'Rajshahi', manager: 'Fresh Produce Team', crops: ['Mango', 'Litchi'], capacity: 69, health: 76, risk: 41, efficiency: 78, status: 'warning', coordinates: { lat: 24.3745, lng: 88.6042 } },
  { id: 'wh-004', name: 'Sylhet Tea Storage Node', location: 'Sylhet', manager: 'Tea Supply Node', crops: ['Tea', 'Spices'], capacity: 91, health: 97, risk: 8, efficiency: 95, status: 'healthy', coordinates: { lat: 24.8949, lng: 91.8687 } }
];

export const alerts: AlertItem[] = [
  { id: 'ALT-1001', type: 'critical', title: 'Humidity spike in Zone A2', warehouse: 'Dhaka Cold Storage Alpha', zone: 'A2', message: 'Humidity is above safe threshold for potato sacks for 14 minutes. AI recommends immediate ventilation cycle and pallet inspection.', createdAt: '2026-06-26 09:20', status: 'open', priority: 99 },
  { id: 'ALT-1002', type: 'warning', title: 'Ethylene gas trend increasing', warehouse: 'Chattogram Grain Hub', zone: 'B1', message: 'Gas reading is rising faster than the 24-hour baseline. Check overripe produce separation and sensor calibration.', createdAt: '2026-06-26 08:54', status: 'investigating', priority: 74 },
  { id: 'ALT-1003', type: 'info', title: 'Ventilation cycle completed', warehouse: 'Sylhet Tea Storage Node', zone: 'C4', message: 'Automated airflow optimization completed successfully. No operator action required.', createdAt: '2026-06-26 07:30', status: 'resolved', priority: 32 },
  { id: 'ALT-1004', type: 'warning', title: 'Moisture variance in Rack R7', warehouse: 'Rajshahi Mango Reserve', zone: 'R7', message: 'Moisture variance may reduce shelf-life by 9%. Inspect crate insulation and floor condensation.', createdAt: '2026-06-25 22:15', status: 'open', priority: 67 },
  { id: 'ALT-1005', type: 'critical', title: 'Cooling unit failover triggered', warehouse: 'Dhaka Cold Storage Alpha', zone: 'Cooling Bay', message: 'Backup cooling compressor is active. Maintenance should verify primary compressor within 30 minutes.', createdAt: '2026-06-25 21:42', status: 'investigating', priority: 96 }
];

export const forecast: ForecastPoint[] = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  temperature: Number((18 + Math.sin(i / 4) * 2 + i * 0.03).toFixed(1)),
  humidity: Number((62 + Math.sin(i / 3) * 7 + (i > 14 ? 5 : 0)).toFixed(1)),
  gas: Number((284 + Math.sin(i / 2.7) * 42 + i * 2.2).toFixed(0)),
  spoilage: Number(Math.min(78, 12 + i * 1.85 + Math.sin(i / 2) * 4).toFixed(1)),
  efficiency: Number(Math.max(72, 96 - i * 0.55 + Math.sin(i / 2) * 2).toFixed(1)),
  accuracy: Number((94 - Math.sin(i / 4) * 2 - (i > 18 ? 3 : 0)).toFixed(1))
}));

export const twinSensors = [
  { id: 'A1', position: [-3.2, 1.25, -1.8] as [number, number, number], status: 'healthy' as const, label: 'TMP-A1', value: '18.4°C' },
  { id: 'A2', position: [-1.3, 1.65, 1.7] as [number, number, number], status: 'warning' as const, label: 'HUM-A2', value: '68%' },
  { id: 'B1', position: [0.9, 1.35, -2.1] as [number, number, number], status: 'healthy' as const, label: 'GAS-B1', value: '312ppm' },
  { id: 'B3', position: [2.6, 1.2, 1.2] as [number, number, number], status: 'healthy' as const, label: 'MOI-B3', value: '13.8%' },
  { id: 'C2', position: [3.5, 1.5, -0.3] as [number, number, number], status: 'critical' as const, label: 'AIR-C2', value: 'Risk zone' }
];

export const aiRecommendations = [
  'Start ventilation cycle in Zone A2 for 18 minutes.',
  'Move high-ethylene produce away from Rack B1.',
  'Recalibrate HUM-A2 if deviation remains above 4%.',
  'Keep humidity target below 64% for the next 24 hours.',
  'Prioritize primary compressor inspection before next cold cycle.'
];

export const quickActions = [
  'Run AI diagnosis',
  'Start ventilation',
  'Generate investor report',
  'Export sensor CSV',
  'Create maintenance ticket'
];
