import { useEffect, useRef, useCallback } from 'react';

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef(Array(5).fill({ x: -100, y: -100 }));
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('[data-cursor-hover]')
    ) {
      isHovering.current = true;
    }
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('[data-cursor-hover]')
    ) {
      isHovering.current = false;
    }
  }, []);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth <= 1024) return;

    document.body.style.cursor = 'none';

    const animate = () => {
      // Lerp for smooth follow
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      haloPos.current = {
        x: lerp(haloPos.current.x, pos.current.x, 0.15),
        y: lerp(haloPos.current.y, pos.current.y, 0.15),
      };

      const newTrailPos = trailPos.current.map((p, i) => ({
        x: lerp(p.x, pos.current.x, 0.08 - i * 0.01),
        y: lerp(p.y, pos.current.y, 0.08 - i * 0.01),
      }));
      trailPos.current = newTrailPos;

      if (cursorRef.current) {
        const size = isHovering.current ? 20 : 12;
        cursorRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
      }

      if (haloRef.current) {
        const haloSize = isHovering.current ? 60 : 40;
        haloRef.current.style.transform = `translate(${haloPos.current.x - haloSize / 2}px, ${haloPos.current.y - haloSize / 2}px)`;
        haloRef.current.style.width = `${haloSize}px`;
        haloRef.current.style.height = `${haloSize}px`;
        haloRef.current.style.opacity = isHovering.current ? '0.6' : '0.3';
      }

      trailsRef.current.forEach((trail, i) => {
        if (trail) {
          const size = 10 - i * 1.5;
          const opacity = 0.3 - i * 0.05;
          trail.style.transform = `translate(${trailPos.current[i].x - size / 2}px, ${trailPos.current[i].y - size / 2}px)`;
          trail.style.width = `${size}px`;
          trail.style.height = `${size}px`;
          trail.style.opacity = String(opacity);
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 1024) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-bac-blue rounded-full transition-[width,height] duration-200"
        style={{ willChange: 'transform' }}
      />
      {/* Halo ring */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 w-10 h-10 border border-bac-blue/30 rounded-full transition-[width,height,opacity] duration-200"
        style={{ willChange: 'transform' }}
      />
      {/* Trail dots */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => { trailsRef.current[i] = el; }}
          className="fixed top-0 left-0 bg-bac-blue/40 rounded-full"
          style={{ willChange: 'transform' }}
        />
      ))}
    </div>
  );
}
