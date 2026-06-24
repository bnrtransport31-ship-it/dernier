import { cn } from '@/lib/utils';

interface NeonLineProps {
  className?: string;
  animate?: boolean;
}

export function NeonLine({ className, animate = true }: NeonLineProps) {
  return (
    <div
      className={cn(
        'h-px w-full bg-gradient-to-r from-transparent via-bac-blue to-transparent',
        'shadow-[0_0_8px_rgba(0,68,255,0.4)]',
        animate && 'animate-neon-pulse',
        className
      )}
    />
  );
}
