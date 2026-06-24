import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OptionListItem } from '@/components/OptionListItem';

gsap.registerPlugin(ScrollTrigger);

const OPTIONS = [
  { name: 'DOUBLE STEAK', price: '+2,50€' },
  { name: 'BACON', price: '+1,50€' },
  { name: 'CHEDDAR', price: '+1,00€' },
  { name: 'GALETTE DE POMME DE TERRE', price: '+1,50€' },
  { name: 'OIGNONS CRISPY', price: '+0,80€' },
];

export function OptionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      if (listRef.current) {
        gsap.fromTo(listRef.current.children, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.3, stagger: 0.06,
          scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bac-black py-12 md:py-16">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        <h2 ref={titleRef} className="font-bebas text-3xl md:text-4xl text-white text-center tracking-wide">
          OPTIONS SUPPLÉMENTAIRES
        </h2>
        <div ref={listRef} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {OPTIONS.map(opt => (
            <OptionListItem key={opt.name} name={opt.name} price={opt.price} />
          ))}
        </div>
      </div>
    </section>
  );
}
