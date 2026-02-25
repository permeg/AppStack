import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: string;
}

export function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm mb-2">{label}</p>
          <p className="text-3xl text-white">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground mt-2">{trend}</p>
          )}
        </div>
        <div className="text-primary opacity-80">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}