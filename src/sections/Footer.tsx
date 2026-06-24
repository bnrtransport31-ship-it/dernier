import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Instagram, Music2, Ghost } from 'lucide-react';
import { NeonLine } from '@/components/NeonLine';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (colsRef.current) {
        gsap.fromTo(colsRef.current.children, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.1,
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        });
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="footer" className="relative bg-bac-black py-16 md:py-20">
      <NeonLine />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-16">
        <div ref={colsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <div className="font-bebas text-4xl text-white tracking-wider">B.A.C</div>
            <div className="font-bebas text-base text-bac-gray tracking-wider mt-1">BRIGADE ANTI-CREUX</div>
            <div className="mt-4 flex items-center gap-2 text-bac-gray">
              <span className="text-xs">🍔</span>
              <span className="text-xs">⚡</span>
              <span className="text-xs">🌙</span>
              <span className="font-inter text-xs ml-2">INGRÉDIENTS FRAIS</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-bac-gray">
              <span className="font-inter text-xs">VIANDES HALAL</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-bac-gray">
              <span className="font-inter text-xs">FAIT MAISON</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bebas text-xl text-white mb-4">CONTACT</h3>
            <div className="space-y-2">
              <a href="tel:+336XXXXXXXX" className="flex items-center gap-2 font-inter text-base text-bac-gray hover:text-bac-blue transition-colors">
                <Phone className="w-4 h-4" />
                06 XX XX XX XX
              </a>
              <p className="font-inter text-base text-bac-gray">contact@bac31.fr</p>
              <p className="font-inter text-sm text-bac-gray">Toulouse & Métropole</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bebas text-xl text-white mb-4">HORAIRES</h3>
            <p className="font-inter font-medium text-base text-bac-blue">OUVERT 7J/7</p>
            <p className="font-inter text-base text-white mt-1">18H - 06H</p>
            <span className="inline-block mt-3 px-3 py-1 bg-bac-blue/15 text-bac-blue-light text-xs font-inter font-medium rounded border border-bac-blue/30">
              SERVICE DE NUIT
            </span>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bebas text-xl text-white mb-4">SUIVEZ-NOUS</h3>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/brigade_anti_creux" target="_blank" rel="noopener noreferrer"
                className="text-bac-gray hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com/@brigade_anti_creux" target="_blank" rel="noopener noreferrer"
                className="text-bac-gray hover:text-white transition-colors">
                <Music2 className="w-6 h-6" />
              </a>
              <a href="https://snapchat.com/add/brigade_anti_creux" target="_blank" rel="noopener noreferrer"
                className="text-bac-gray hover:text-white transition-colors">
                <Ghost className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <NeonLine className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-bac-gray">
            © 2025 B.A.C 31 — Brigade Anti-Creux. Tous droits réservés.
          </p>
          <span className="font-bebas text-sm text-bac-blue-light tracking-wider">
            ON INTERPELLE TA FAIM.
          </span>
        </div>
      </div>
    </footer>
  );
}
