import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'blue';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-inter font-medium uppercase',
        variant === 'default' && 'bg-bac-blue/15 text-bac-blue-light border border-bac-blue/30',
        variant === 'blue' && 'bg-bac-blue/15 text-bac-blue-light border border-bac-blue/30',
        className
      )}
    >
      {children}
    </span>
  );
}
