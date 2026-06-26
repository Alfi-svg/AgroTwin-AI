import type { StatusLevel } from '../types';

export const statusText: Record<StatusLevel, string> = {
  optimal: 'Optimal',
  warning: 'Warning',
  critical: 'Critical',
};

export function statusClass(status: StatusLevel) {
  return `status-${status}`;
}

export function clamp(value: number, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

export function formatValue(value: number, decimals = 0) {
  return Number.isInteger(value) ? String(value) : value.toFixed(decimals);
}
