"use client";
import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  style = {} as React.CSSProperties,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  direction?: "up" | "left" | "right" | "scale" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Detect RTL from html element — set by ArabicLayout useEffect
  const isRTL =
    typeof document !== 'undefined' &&
    document.documentElement.dir === 'rtl'

  const from =
    direction === "left"  ? `translateX(${isRTL ? '24px' : '-24px'})` :
    direction === "right" ? `translateX(${isRTL ? '-24px' : '24px'})` :
    direction === "up"    ? "translateY(24px)"  :
    direction === "scale" ? "scale(0.92)"       : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : from,
        transition: `opacity 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
