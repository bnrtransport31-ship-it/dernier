import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';
import { ProductCard } from '@/components/ProductCard';
import { MenuListItem } from '@/components/MenuListItem';
import { NeonLine } from '@/components/NeonLine';

gsap.registerPlugin(ScrollTrigger);

const BURGERS = [
  { name: 'LE CLASSIC INTERVENTION', description: 'Steak smashé, cheddar, oignons, pickles, sauce B.A.C', price: '9,90€', image: '/images/burger-classic.jpg' },
  { name: 'LE B.A.C SPÉCIAL', description: 'Double steak smashé, cheddar, bacon, oignons crispy, sauce B.A.C spéciale', price: '12,90€', image: '/images/burger-bac-special.jpg' },
  { name: 'LE CRISPY UNITÉ', description: 'Poulet pané, cheddar, salade, sauce miel moutarde', price: '10,90€', image: '/images/burger-crispy.jpg' },
  { name: 'LE NIGHT STACK', description: 'Double steak, cheddar, oignons caramélisés, sauce B.A.C', price: '13,90€', image: '/images/burger-night-stack.jpg' },
  { name: 'LE FRENCH B.A.C', description: 'Steak, raclette, lardons, oignons, sauce B.A.C', price: '11,90€', image: '/images/burger-bac-special.jpg' },
];

const CROUSTY = [
  { name: 'CROUSTY CLASSIC', description: '2 pièces de poulet crousty', price: '5,90€', image: '/images/crousty-classic.jpg' },
  { name: 'CROUSTY B.A.C', description: '3 pièces de poulet crousty', price: '7,90€', image: '/images/crousty-classic.jpg' },
  { name: 'CROUSTY TENDERS', description: '4 tenders croustillants', price: '6,90€', image: '/images/crousty-classic.jpg' },
  { name: 'BOX CROUSTÉRATION', description: '5 pièces de poulet, tenders + sauce au choix', price: '12,90€', image: '/images/crousty-classic.jpg' },
];

const ACCOMPAGNEMENTS = [
  { name: 'FRITES MAISON', price: '3,50€' },
  { name: 'FRITES CHEESY B.A.C', description: 'Sauce cheddar, oignons crispy', price: '4,50€' },
  { name: 'ONION RINGS', price: '4,00€' },
  { name: 'NUGGETS x6', price: '4,50€' },
  { name: 'SAUCE AU CHOIX', description: 'B.A.C / Mayo / Algérienne / Barbecue / Samouraï', price: '0,60€' },
];

const BOISSONS = [
  { name: 'COCA / COCA ZÉRO / FANTA / SPRITE', price: '2,50€' },
  { name: 'ICE TEA / TROPICO', price: '2,50€' },
  { name: 'EAU PLATE / EAU GAZEUSE', price: '1,50€' },
  { name: 'RED BULL', price: '3,50€' },
];

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      categoriesRef.current.forEach(cat => {
        if (cat) {
          const items = cat.querySelectorAll('.menu-item');
          gsap.fromTo(items, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08,
            scrollTrigger: { trigger: cat, start: 'top 80%' },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="menu" className="relative bg-bac-black py-16 md:py-20">
      <NeonLine />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-16">
        {/* Burgers */}
        <div ref={el => { categoriesRef.current[0] = el; }} className="mb-16">
          <SectionHeader
            icon="🍔"
            title="BURGERS"
            subtitle="100% FRAIS — VIANDES SÉLECTIONNÉES"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BURGERS.map(burger => (
              <div key={burger.name} className="menu-item">
                <ProductCard
                  name={burger.name}
                  description={burger.description}
                  price={burger.price}
                  image={burger.image}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Crousty */}
        <div ref={el => { categoriesRef.current[1] = el; }} className="mb-16">
          <SectionHeader
            icon="🍗"
            title="CROUSTY"
            subtitle="CROUSTILLANT. JUSQU'AU BOUT."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CROUSTY.map(item => (
              <div key={item.name} className="menu-item">
                <ProductCard
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Accompagnements */}
        <div ref={el => { categoriesRef.current[2] = el; }} className="mb-16">
          <SectionHeader
            icon="🍟"
            title="ACCOMPAGNEMENTS"
            subtitle="///"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {ACCOMPAGNEMENTS.map(item => (
              <div key={item.name} className="menu-item">
                <MenuListItem
                  name={item.name}
                  description={item.description}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Boissons */}
        <div ref={el => { categoriesRef.current[3] = el; }}>
          <SectionHeader
            icon="🥤"
            title="BOISSONS"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {BOISSONS.map(item => (
              <div key={item.name} className="menu-item">
                <MenuListItem
                  name={item.name}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <NeonLine className="mt-16" />
    </section>
  );
}
