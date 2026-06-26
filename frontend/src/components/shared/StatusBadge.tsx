import type { AlertType, Status } from '../../types';
import { statusLabel, statusTone } from '../../lib/status';

export function StatusBadge({ status }: { status: Status | AlertType }) {
  return <span className={`status-badge ${statusTone[status]}`}>{statusLabel[status]}</span>;
}
