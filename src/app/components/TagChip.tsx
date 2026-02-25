import { X } from 'lucide-react';

interface TagChipProps {
  name: string;
  color: string;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}

export function TagChip({ name, color, removable, onRemove, onClick }: TagChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-all duration-200 hover:scale-105 cursor-pointer"
      style={{ 
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`
      }}
      onClick={onClick}
    >
      <span className="text-sm">{name}</span>
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="hover:opacity-70 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
