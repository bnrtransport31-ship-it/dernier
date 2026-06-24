import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { NeonButton } from '@/components/NeonButton';
import { OutlineButton } from '@/components/OutlineButton';
import { Badge } from '@/components/Badge';
import { Clock } from 'lucide-react';

interface HeroSectionProps {
  isLoaded: boolean;
  onOrder: () => void;
}

export function HeroSection({ isLoaded, onOrder }: HeroSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();

    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(taglineRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')
      .fromTo(buttonsRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');

    return () => { tl.kill(); };
  }, [isLoaded]);

  return (
    <section className="relative w-full min-h-[100dvh] flex items-end justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-van.jpg"
          alt="Camion d'intervention B.A.C"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.5) 50%, #050505 100%)',
          }}
        />
      </div>

      {/* Status Badge */}
      <div className="absolute top-24 md:top-28 right-4 md:right-8 z-10">
        <Badge className="flex items-center gap-2 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>SERVICE DE NUIT 7J/7 — 18H-06H</span>
        </Badge>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center pb-16 md:pb-24 px-4 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="font-bebas text-[18vw] md:text-[12vw] text-white leading-[0.85] tracking-tight text-shadow-neon opacity-0"
        >
          B.A.C 31
        </h1>
        <div ref={subtitleRef} className="mt-2 opacity-0">
          <span className="font-bebas text-[5vw] md:text-[3vw] text-white tracking-[0.15em]">
            BRIGADE ANTI-CREUX
          </span>
        </div>
        <p
          ref={taglineRef}
          className="mt-4 font-inter font-medium text-base text-bac-gray tracking-[0.1em] uppercase opacity-0"
        >
          UNITÉ NOCTURNE — INTERVENTION GOURMANDE
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <NeonButton onClick={onOrder} icon>
            COMMANDER
          </NeonButton>
          <OutlineButton href="#menu">
            VOIR LE MENU
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}
