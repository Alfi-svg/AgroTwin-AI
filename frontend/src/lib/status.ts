import type { AlertType, Status } from '../types';

export const statusLabel: Record<Status | AlertType, string> = {
  healthy: 'Healthy',
  warning: 'Warning',
  critical: 'Critical',
  info: 'Info'
};

export const statusTone: Record<Status | AlertType, string> = {
  healthy: 'green',
  warning: 'yellow',
  critical: 'red',
  info: 'blue'
};

export function riskText(value: number) {
  if (value < 25) return 'Low';
  if (value < 55) return 'Moderate';
  return 'High';
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
