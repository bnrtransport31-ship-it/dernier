import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingOverlayProps {
  onComplete: () => void;
}

export function LoadingOverlay({ onComplete }: LoadingOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(2.4);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete();
          },
        });
      },
    });

    // Counter animation
    const counter = { val: 2.4 };
    tl.to(counter, {
      val: 0,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(parseFloat(counter.val.toFixed(1)));
      },
    }, 0);

    // Progress bar
    tl.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 3, ease: 'power2.inOut' },
      0
    );

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-4 bg-bac-black"
    >
      {/* Logo */}
      <div className="text-center animate-pulse">
        <div className="font-bebas text-5xl text-white tracking-wider">B.A.C</div>
        <div className="font-inter text-sm text-bac-gray tracking-widest mt-1">BRIGADE ANTI-CREUX</div>
      </div>

      {/* Text */}
      <div className="font-bebas text-2xl text-white tracking-[0.2em]">
        INTERVENTION EN COURS
      </div>

      {/* Distance counter */}
      <div className="text-center mt-4">
        <div className="font-inter text-xs text-bac-gray uppercase tracking-wider">Distance</div>
        <span
          ref={counterRef}
          className="block font-bebas text-4xl text-bac-blue mt-1"
        >
          {count.toFixed(1)} km
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-[200px] h-0.5 bg-white/10 rounded-full overflow-hidden mt-2">
        <div
          ref={barRef}
          className="h-full bg-bac-blue origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
