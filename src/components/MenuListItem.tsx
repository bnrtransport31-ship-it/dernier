import { cn } from '@/lib/utils';

interface MenuListItemProps {
  name: string;
  description?: string;
  price: string;
  className?: string;
}

export function MenuListItem({ name, description, price, className }: MenuListItemProps) {
  return (
    <div className={cn('py-3 border-b border-white/[0.06]', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-bebas text-xl text-bac-white tracking-wide">{name}</h4>
          {description && (
            <p className="mt-0.5 font-inter text-xs text-bac-gray">{description}</p>
          )}
        </div>
        <span className="font-bebas text-lg text-bac-blue whitespace-nowrap">{price}</span>
      </div>
    </div>
  );
}
