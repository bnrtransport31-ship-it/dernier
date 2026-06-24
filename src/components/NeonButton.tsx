import { cn } from '@/lib/utils';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: boolean;
  fullWidth?: boolean;
}

export function NeonButton({ children, onClick, href, className, icon = false, fullWidth = false }: NeonButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 px-8 py-4 font-inter font-medium text-sm uppercase text-white',
    'bg-gradient-neon rounded transition-all duration-300',
    'neon-glow hover:neon-glow-strong hover:scale-[1.02]',
    'active:scale-[0.98]',
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {icon && (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
          <path d="M12 7L0 14V0L12 7Z" />
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {content}
    </button>
  );
}
