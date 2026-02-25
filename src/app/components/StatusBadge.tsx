import { ApplicationStatus } from '../types';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusStyles: Record<ApplicationStatus, { bg: string; text: string; label: string }> = {
  draft: {
    bg: 'bg-muted',
    text: 'text-muted-foreground',
    label: 'Draft',
  },
  submitted: {
    bg: 'bg-chart-1/20',
    text: 'text-chart-1',
    label: 'Submitted',
  },
  'in-review': {
    bg: 'bg-chart-2/20',
    text: 'text-chart-2',
    label: 'In Review',
  },
  accepted: {
    bg: 'bg-chart-2/20',
    text: 'text-chart-2',
    label: 'Accepted',
  },
  rejected: {
    bg: 'bg-destructive/20',
    text: 'text-destructive',
    label: 'Rejected',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status];
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
