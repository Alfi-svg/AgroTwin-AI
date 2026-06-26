export type StatusLevel = 'optimal' | 'warning' | 'critical';

export type PageKey =
  | 'dashboard'
  | 'monitoring'
  | 'digitalTwin'
  | 'prediction'
  | 'alerts'
  | 'analytics'
  | 'warehouses'
  | 'settings'
  | 'assistant';

export interface SensorMetric {
  label: string;
  value: number;
  unit: string;
  status: StatusLevel;
  delta: string;
  target: string;
}

export interface SensorPoint {
  time: string;
  temperature: number;
  humidity: number;
  spoilage: number;
  efficiency: number;
  moisture: number;
  gas: number;
}

export interface AlertItem {
  id: string;
  type: 'Critical' | 'Warning' | 'Info';
  title: string;
  location: string;
  message: string;
  time: string;
  status: StatusLevel;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  crop: string;
  health: number;
  risk: number;
  capacity: number;
  status: StatusLevel;
}

export interface SensorMarker {
  id: string;
  name: string;
  position: [number, number, number];
  value: string;
  status: StatusLevel;
}
