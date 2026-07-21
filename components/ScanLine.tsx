'use client';

import { useEffect, useRef } from 'react';

export default function ScanLine() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const parent = el.parentElement?.parentElement;
    if (!parent) return;

    // Ensure parent is positioned
    const parentStyle = window.getComputedStyle(parent);
    if (parentStyle.position === 'static') {
      parent.style.position = 'relative';
    }

    let start: number | null = null;
    let raf: number;
    const duration = 16000; // ms for one full pass

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % duration;
      const progress = elapsed / duration; // 0 to 1

      const parentHeight = parent!.offsetHeight;
      const y = progress * (parentHeight + 4);

      el!.style.transform = `translateY(${y}px)`;
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible',
      }}
    >
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: '-2px',
          left: 0,
          right: 0,
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,200,255,0.12) 20%, rgba(0,200,255,0.50) 50%, rgba(0,200,255,0.12) 80%, transparent 100%)',
          boxShadow: '0 0 6px rgba(0,200,255,0.30), 0 0 14px rgba(0,200,255,0.10)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
