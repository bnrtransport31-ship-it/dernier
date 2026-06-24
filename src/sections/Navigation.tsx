import { useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { NeonButton } from '@/components/NeonButton';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onOrder: () => void;
}

const NAV_LINKS = [
  { label: 'MENU', href: '#menu' },
  { label: "ZONE D'INTERVENTION", href: '#zone' },
  { label: 'MENUS', href: '#menus' },
  { label: 'À PROPOS', href: '#footer' },
];

export function Navigation({ onOrder }: NavigationProps) {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHidden = !isAtTop && scrollDirection === 'down';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[90] transition-all duration-400',
        isHidden ? '-translate-y-full' : 'translate-y-0',
        isAtTop ? 'bg-transparent' : 'bg-bac-black/90 backdrop-blur-xl'
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-bebas text-3xl text-white tracking-wider">B.A.C</span>
          <span className="hidden sm:block font-inter text-xs text-bac-gray tracking-wider">31</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-inter font-medium text-base text-white hover:text-bac-blue transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <NeonButton onClick={onOrder} className="py-3 px-6 text-sm">
            COMMANDER
          </NeonButton>
        </div>

        {/* Mobile: Commander + Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <NeonButton onClick={onOrder} className="py-2.5 px-4 text-xs">
            COMMANDER
          </NeonButton>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={cn(
              'w-6 h-0.5 bg-white transition-all duration-300',
              mobileMenuOpen && 'rotate-45 translate-y-2'
            )} />
            <span className={cn(
              'w-6 h-0.5 bg-white transition-all duration-300',
              mobileMenuOpen && 'opacity-0'
            )} />
            <span className={cn(
              'w-6 h-0.5 bg-white transition-all duration-300',
              mobileMenuOpen && '-rotate-45 -translate-y-2'
            )} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'lg:hidden overflow-hidden transition-all duration-300',
        mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="px-4 pb-4 space-y-3 bg-bac-black/95 backdrop-blur-xl">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-inter font-medium text-base text-white hover:text-bac-blue transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
