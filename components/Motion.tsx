"use client";
/**
 * QMULATE — Premium Motion Design System v1.0
 *
 * Philosophy: "Motion that earns trust"
 * - GPU-accelerated transforms only (opacity, transform)
 * - prefers-reduced-motion respected globally
 * - Spring physics for natural feel
 * - Stagger for compositional rhythm
 * - No distracting or competing animations
 */

import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, useReducedMotion,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback, ReactNode } from "react";

// ══════════════════════════════════════════════════════════════
// DESIGN TOKENS — Easing + Duration
// ══════════════════════════════════════════════════════════════

export const EASE = {
  smooth:  [0.25, 0.46, 0.45, 0.94] as [number,number,number,number],
  out:     [0.00, 0.00, 0.20, 1.00] as [number,number,number,number],
  luxury:  [0.16, 1.00, 0.30, 1.00] as [number,number,number,number],
  spring:  [0.34, 1.56, 0.64, 1.00] as [number,number,number,number],
  precise: [0.40, 0.00, 0.20, 1.00] as [number,number,number,number],
};

export const DUR = { fast:.22, normal:.28, slow:.2, luxury:.2, epic:.35 };

// Spring configs
export const SPRING = {
  soft:    { type:"spring" as const, stiffness:120, damping:22, mass:1   },
  snappy:  { type:"spring" as const, stiffness:320, damping:28, mass:.8  },
  gentle:  { type:"spring" as const, stiffness: 80, damping:18, mass:1.2 },
  precise: { type:"spring" as const, stiffness:400, damping:38, mass:.6  },
};

// ══════════════════════════════════════════════════════════════
// PAGE TRANSITION
// ══════════════════════════════════════════════════════════════

export function PageTransition({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Always render the same <div> on server and client — never branch on useReducedMotion
  // (framer-motion returns true on the server for that hook, causing a tree-structure mismatch).
  // CSS transition only kicks in after mount, so SSR and initial client render agree exactly.
  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateY(12px)',
        transition: mounted
          ? `opacity ${DUR.slow}s cubic-bezier(${EASE.luxury.join(',')}), transform ${DUR.slow}s cubic-bezier(${EASE.luxury.join(',')})`
          : 'none',
        minHeight: '100%',
      }}
    >
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SCROLL PROGRESS BAR
// ══════════════════════════════════════════════════════════════

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30, restDelta:.001 });
  return (
    <motion.div
      style={{
        scaleX, transformOrigin:"left",
        position:"fixed", top:0, left:0, right:0, height:2,
        background:"linear-gradient(90deg,var(--cyan),#4D8DFF,#8A5CFF)",
        zIndex:99999, boxShadow:"0 0 8px rgba(0,212,255,.5)",
      }}
    />
  );
}

// ══════════════════════════════════════════════════════════════
// 3D CARD TILT
// ══════════════════════════════════════════════════════════════

export function CardTilt3D({
  children, maxTilt=6, scale=1.018, style={}, className="",
}: {
  children: ReactNode; maxTilt?:number; scale?:number;
  style?:React.CSSProperties; className?:string;
}) {
  const [mounted, setMounted] = useState(false);
  // Mouse-driven tilt is meaningless on touch (no hover), and the
  // perspective + preserve-3d it requires creates a real GPU compositing
  // cost per card — multiplied across every GlassCard on a section, this
  // is the same class of mobile compositor overload as the backdrop-filter
  // issue (see globals.css "MOBILE SAFARI FIX"). Skip the 3D wrapper
  // entirely under the project's mobile breakpoint.
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y,[-0.5,0.5],[maxTilt,-maxTilt]), SPRING.snappy);
  const rotateY = useSpring(useTransform(x,[-0.5,0.5],[-maxTilt,maxTilt]), SPRING.snappy);
  const glowX = useTransform(x,[-0.5,0.5],[0,100]);
  const glowY = useTransform(y,[-0.5,0.5],[0,100]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  // Before mount: plain <div> — SSR and initial client render agree exactly.
  // On mobile: stay a plain div permanently — no perspective/3D compositing.
  // After mount on desktop/tablet: switch to motion.div with 3D tilt.
  if (!mounted || isMobile) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX, rotateY, transformStyle:"preserve-3d", perspective:1200 }}
      whileHover={{ scale }}
      transition={SPRING.snappy}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic specular highlight */}
      <motion.div
        style={{
          position:"absolute", inset:0, borderRadius:"inherit",
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,.08) 0%, transparent 65%)",
          backgroundPositionX: glowX.get() + "%",
          backgroundPositionY: glowY.get() + "%",
          pointerEvents:"none", zIndex:10, opacity:.8,
        }}
      />
      {children}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ══════════════════════════════════════════════════════════════

export function MagneticButton({
  children, strength=0.35, className="", style={}, onClick,
}: {
  children: ReactNode; strength?:number;
  className?:string; style?:React.CSSProperties;
  onClick?:()=>void;
}) {
  const should = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, SPRING.snappy);
  const ySpring = useSpring(y, SPRING.snappy);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || should) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength, should]);

  const handleMouseLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x:xSpring, y:ySpring, display:"inline-block", ...style }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// HOVER LIFT — simple lift with shadow
// ══════════════════════════════════════════════════════════════

export function HoverLift({
  children, lift=8, className="", style={},
}: {
  children: ReactNode; lift?:number;
  className?:string; style?:React.CSSProperties;
}) {
  const should = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={should ? {} : { y:-lift, transition:SPRING.snappy }}
      whileTap={should ? {} : { y:-lift/2, scale:.99 }}
    >
      {children}
    </motion.div>
  );
}
