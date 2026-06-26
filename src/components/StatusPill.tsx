import type { StatusLevel } from '../types';
import { statusClass, statusText } from '../lib/status';

interface StatusPillProps {
  status: StatusLevel;
  label?: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  return <span className={`status-pill ${statusClass(status)}`}>{label ?? statusText[status]}</span>;
}
