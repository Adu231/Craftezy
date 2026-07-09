import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'default';
  prefix?: string;
  suffix?: string;
}

const COLOR_MAP = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/15 text-[hsl(35,70%,40%)]',
  default: 'bg-muted text-muted-foreground',
};

export default function StatCard({ title, value, change, icon, color = 'default', prefix = '', suffix = '' }: Props) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-card rounded-2xl p-5 border border-border hover:shadow-craft transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', COLOR_MAP[color])}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full',
            isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="font-display font-bold text-2xl text-foreground mb-1">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  );
}
