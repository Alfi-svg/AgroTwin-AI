export type PageKey = 'dashboard' | 'monitoring' | 'digitalTwin' | 'prediction' | 'alerts' | 'analytics' | 'warehouses' | 'assistant' | 'settings';
export type AuthView = 'login' | 'signup' | 'forgot';
export type Status = 'healthy' | 'warning' | 'critical' | 'info';
export type AlertType = 'critical' | 'warning' | 'info';

export interface SensorReading {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: Status;
  zone: string;
  trend: string;
  health: number;
  min: number;
  max: number;
  series: number[];
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  manager: string;
  crops: string[];
  capacity: number;
  health: number;
  risk: number;
  efficiency: number;
  status: Status;
  coordinates: { lat: number; lng: number };
}

export interface AlertItem {
  id: string;
  type: AlertType;
  title: string;
  warehouse: string;
  zone: string;
  message: string;
  createdAt: string;
  status: 'open' | 'investigating' | 'resolved';
  priority: number;
}

export interface ForecastPoint {
  hour: string;
  temperature: number;
  humidity: number;
  gas: number;
  spoilage: number;
  efficiency: number;
  accuracy: number;
}

export interface DashboardMetrics {
  storageHealthScore: number;
  spoilageRiskScore: number;
  temperature: number;
  humidity: number;
  gasLevel: number;
  moisture: number;
  airQuality: number;
  activeAlerts: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}
