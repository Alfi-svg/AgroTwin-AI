import { alerts, dashboardMetrics, forecast, sensors, warehouses } from '../data/mockData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

async function request<T>(path: string, fallback: T, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) } });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export const api = {
  dashboard: () => request('/dashboard', { ...dashboardMetrics, sensors, alerts, warehouses, forecast }),
  sensors: () => request('/sensors', sensors),
  alerts: () => request('/alerts', alerts),
  warehouses: () => request('/warehouses', warehouses),
  forecast: () => request('/forecast', forecast),
  assistant: async (message: string) => request('/assistant', {
    reply: 'AgroTwin AI recommends lowering humidity, inspecting risky racks, and running the ventilation cycle before spoilage probability increases.',
    confidence: 0.91,
    recommendedActions: ['Run ventilation cycle', 'Inspect Zone A2', 'Export forecast report']
  }, { method: 'POST', body: JSON.stringify({ message }) })
};
