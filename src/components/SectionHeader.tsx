import { NeonLine } from './NeonLine';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ icon, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-white text-2xl">{icon}</span>}
        <h2 className="font-bebas text-5xl md:text-6xl text-bac-white tracking-wide">{title}</h2>
      </div>
      {subtitle && (
        <p className="font-inter text-sm text-bac-blue-light tracking-[0.1em] uppercase">
          {subtitle}
        </p>
      )}
      <NeonLine className="mt-4" />
    </div>
  );
}
