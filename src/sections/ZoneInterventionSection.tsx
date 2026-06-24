import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Truck } from 'lucide-react';
import { NeonLine } from '@/components/NeonLine';

gsap.registerPlugin(ScrollTrigger);

const SECTORS = [
  'TOULOUSE CENTRE', 'BALMA', "L'UNION", 'MONTRABÉ',
  'SAINT-JEAN', 'AUCAMVILLE', 'FENOUILLET', 'BEAUZELLE',
  'BLAGNAC', 'COLOMIERS', 'TOURNEFEUILLE', 'PORTET-SUR-GARONNE',
];

export function ZoneInterventionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo(mapRef.current, { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.6, delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      if (sectorsRef.current) {
        gsap.fromTo(sectorsRef.current.children, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.05,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="zone" className="relative bg-bac-blue-night py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 ref={titleRef} className="font-bebas text-5xl md:text-6xl text-white tracking-wide">
            ZONE D&apos;INTERVENTION
          </h2>
          <p className="mt-3 font-inter text-lg text-bac-gray max-w-xl mx-auto">
            On intervient sur tout Toulouse et ses alentours pour éliminer ta faim
          </p>
        </div>

        <NeonLine className="mb-8" />

        {/* Content: Map + Sectors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div ref={mapRef} className="relative aspect-video rounded-lg overflow-hidden border border-bac-blue/20">
            <img
              src="/images/map-toulouse.jpg"
              alt="Carte de Toulouse - Zone d'intervention"
              className="w-full h-full object-cover"
            />
            {/* Pulsing radar dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-bac-blue rounded-full relative">
                <div className="absolute inset-0 bg-bac-blue rounded-full animate-radar-pulse" />
              </div>
            </div>
          </div>

          {/* Sectors */}
          <div ref={sectorsRef} className="grid grid-cols-2 gap-3">
            <h3 className="col-span-2 font-bebas text-2xl text-white mb-2">
              SECTEURS D&apos;INTERVENTION
            </h3>
            {SECTORS.map(sector => (
              <div
                key={sector}
                className="flex items-center gap-2 px-3 py-2.5 bg-white/5 rounded hover:bg-bac-blue/10 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-bac-blue shrink-0" />
                <span className="font-inter font-medium text-sm text-white">{sector}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery info */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 text-bac-blue-light">
            <Truck className="w-6 h-6" />
            <span className="font-bebas text-xl tracking-wide">
              LIVRAISON DE NUIT 7J/7 — 18H - 06H
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
