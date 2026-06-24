import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NeonLine } from '@/components/NeonLine';

gsap.registerPlugin(ScrollTrigger);

const MENUS = [
  {
    name: 'MENU PATROUILLE',
    description: 'Burger + Frites + Boisson',
    price: '13,90€',
    image: '/images/menu-patrouille.jpg',
  },
  {
    name: 'MENU UNITÉ SPÉCIALE',
    description: 'Burger au choix + Crousty 2 pièces + Frites + Boisson',
    price: '16,90€',
    image: '/images/menu-unite-speciale.jpg',
  },
  {
    name: 'MENU B.A.C MAX',
    description: 'Burger au choix + Crousty 3 pièces + Frites + Boisson + Sauce',
    price: '19,90€',
    image: '/images/menu-bac-max.jpg',
  },
];

export function MenusComboSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="menus" className="relative bg-bac-surface py-16 md:py-20">
      <NeonLine />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-16">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10">
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide">
            MENUS D&apos;INTERVENTION
          </h2>
          <p className="mt-2 font-inter text-sm text-bac-blue-light tracking-[0.1em] uppercase">
            MAXI FAIM. MAXI PLAISIR.
          </p>
          <NeonLine className="mt-6 max-w-md mx-auto" />
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MENUS.map(menu => (
            <div
              key={menu.name}
              className="group bg-bac-dark border border-white/[0.08] rounded-lg overflow-hidden
                hover:border-bac-blue/40 hover:shadow-[0_0_20px_rgba(0,68,255,0.15)] transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bebas text-2xl text-white tracking-wide">{menu.name}</h3>
                <p className="mt-1 font-inter text-sm text-bac-gray">{menu.description}</p>
                <p className="mt-4 font-bebas text-3xl text-bac-blue">{menu.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
