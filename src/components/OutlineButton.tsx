import { cn } from '@/lib/utils';

interface OutlineButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

export function OutlineButton({ children, onClick, href, className, fullWidth = false }: OutlineButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 px-8 py-4 font-inter font-medium text-sm uppercase text-white',
    'bg-transparent border-2 border-bac-blue rounded transition-all duration-300',
    'hover:bg-bac-blue/10 hover:shadow-[0_0_20px_rgba(0,68,255,0.3)]',
    'active:scale-[0.98]',
    fullWidth && 'w-full',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {children}
    </button>
  );
}
