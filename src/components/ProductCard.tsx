import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  className?: string;
}

export function ProductCard({ name, description, price, image, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'group bg-bac-dark border border-white/[0.08] rounded-lg overflow-hidden',
        'transition-all duration-300',
        isHovered && 'border-bac-blue/40 shadow-[0_0_20px_rgba(0,68,255,0.15)]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className={cn(
            'w-full h-full object-cover transition-transform duration-400',
            isHovered ? 'scale-105' : 'scale-100'
          )}
        />
      </div>
      <div className="p-6">
        <h3 className="font-bebas text-2xl text-bac-white tracking-wide">{name}</h3>
        <p className="mt-1 font-inter text-sm text-bac-gray">{description}</p>
        <p className="mt-3 font-bebas text-xl text-bac-blue">{price}</p>
      </div>
    </div>
  );
}
