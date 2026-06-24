import { cn } from '@/lib/utils';

interface OptionListItemProps {
  name: string;
  price: string;
  className?: string;
}

export function OptionListItem({ name, price, className }: OptionListItemProps) {
  return (
    <div className={cn('py-2 border-b border-white/[0.06]', className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-bebas text-lg text-bac-white tracking-wide">{name}</span>
        <span className="font-inter font-medium text-base text-bac-blue">{price}</span>
      </div>
    </div>
  );
}
