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
  useInView, useMotionValue, AnimatePresence,
  useReducedMotion, animate, stagger,
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

export const DUR = { fast:.22, normal:.55, slow:.85, luxury:1.10, epic:1.6 };

// Spring configs
export const SPRING = {
  soft:    { type:"spring" as const, stiffness:120, damping:22, mass:1   },
  snappy:  { type:"spring" as const, stiffness:320, damping:28, mass:.8  },
  gentle:  { type:"spring" as const, stiffness: 80, damping:18, mass:1.2 },
  precise: { type:"spring" as const, stiffness:400, damping:38, mass:.6  },
};

// ══════════════════════════════════════════════════════════════
// FRAMER MOTION PRESETS (enhanced)
// ══════════════════════════════════════════════════════════════

export const preset = {
  fadeUp: (delay=0, distance=32) => ({
    initial:{ opacity:0, y:distance },
    whileInView:{ opacity:1, y:0 },
    viewport:{ once:true, margin:"-80px" },
    transition:{ duration:DUR.slow, delay, ease:EASE.luxury },
  }),
  fadeIn: (delay=0) => ({
    initial:{ opacity:0 },
    whileInView:{ opacity:1 },
    viewport:{ once:true, margin:"-60px" },
    transition:{ duration:DUR.normal, delay, ease:EASE.smooth },
  }),
  scaleIn: (delay=0) => ({
    initial:{ opacity:0, scale:.94 },
    whileInView:{ opacity:1, scale:1 },
    viewport:{ once:true, margin:"-60px" },
    transition:{ duration:DUR.luxury, delay, ease:EASE.luxury },
  }),
  slideLeft: (delay=0) => ({
    initial:{ opacity:0, x:-40 },
    whileInView:{ opacity:1, x:0 },
    viewport:{ once:true, margin:"-60px" },
    transition:{ duration:DUR.slow, delay, ease:EASE.luxury },
  }),
  slideRight: (delay=0) => ({
    initial:{ opacity:0, x:40 },
    whileInView:{ opacity:1, x:0 },
    viewport:{ once:true, margin:"-60px" },
    transition:{ duration:DUR.slow, delay, ease:EASE.luxury },
  }),
  // Hero entrance — starts from larger offset, blur
  heroEntrance: (delay=0) => ({
    initial:{ opacity:0, y:48, filter:"blur(8px)", scale:.97 },
    animate:{ opacity:1, y:0, filter:"blur(0px)", scale:1 },
    transition:{ duration:DUR.epic, delay, ease:EASE.luxury },
  }),
};

// ══════════════════════════════════════════════════════════════
// PAGE TRANSITION
// ══════════════════════════════════════════════════════════════

export function PageTransition({ children }: { children: ReactNode }) {
  const should = useReducedMotion();
  if (should) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity:0, y:16, filter:"blur(4px)" }}
      animate={{ opacity:1, y:0, filter:"blur(0px)" }}
      transition={{ duration:DUR.slow, ease:EASE.luxury }}
      style={{ minHeight:"100%" }}
    >
      {children}
    </motion.div>
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
  const should = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y,[-0.5,0.5],[maxTilt,-maxTilt]), SPRING.snappy);
  const rotateY = useSpring(useTransform(x,[-0.5,0.5],[-maxTilt,maxTilt]), SPRING.snappy);
  const glowX = useTransform(x,[-0.5,0.5],[0,100]);
  const glowY = useTransform(y,[-0.5,0.5],[0,100]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || should) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [x, y, should]);

  const handleMouseLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  if (should) return <div className={className} style={style}>{children}</div>;

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
  children, strength=0.35, className="", style={}, onClick, href,
}: {
  children: ReactNode; strength?:number;
  className?:string; style?:React.CSSProperties;
  onClick?:()=>void; href?:string;
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
// TEXT WORD STAGGER REVEAL
// ══════════════════════════════════════════════════════════════

export function TextReveal({
  text, className="", style={}, delay=0, tag="div",
}: {
  text: string; className?:string; style?:React.CSSProperties;
  delay?:number; tag?: "h1"|"h2"|"h3"|"p"|"span"|"div";
}) {
  const should = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const words = text.split(" ");

  if (should) {
    const Tag = tag;
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  return (
    <div ref={ref} className={className} style={{ ...style, overflow:"hidden" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display:"inline-block", overflow:"hidden", verticalAlign:"top" }}>
          <motion.span
            style={{ display:"inline-block" }}
            initial={{ y:"110%", opacity:0 }}
            animate={inView ? { y:"0%", opacity:1 } : {}}
            transition={{
              duration: DUR.slow,
              delay: delay + i * 0.045,
              ease: EASE.luxury,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STAGGER CONTAINER — children appear in sequence
// ══════════════════════════════════════════════════════════════

export function StaggerReveal({
  children, delay=0, staggerDelay=0.08, direction="up", className="", style={},
}: {
  children: ReactNode; delay?:number; staggerDelay?:number;
  direction?: "up"|"left"|"right"|"scale";
  className?:string; style?:React.CSSProperties;
}) {
  const should = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  const variants: Record<string, any> = {
    hidden: {},
    show: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
  };
  const childVariants: Record<string, any> = {
    up:     { hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:DUR.slow, ease:EASE.luxury }} },
    left:   { hidden:{ opacity:0, x:-28}, show:{ opacity:1, x:0, transition:{ duration:DUR.slow, ease:EASE.luxury }} },
    right:  { hidden:{ opacity:0, x:28 }, show:{ opacity:1, x:0, transition:{ duration:DUR.slow, ease:EASE.luxury }} },
    scale:  { hidden:{ opacity:0, scale:.92 }, show:{ opacity:1, scale:1, transition:{ duration:DUR.luxury, ease:EASE.luxury }} },
  };
  const cv = childVariants[direction];

  if (should) return <div className={className} style={style}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={cv}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={cv}>{children}</motion.div>
      }
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// PARALLAX LAYER
// ══════════════════════════════════════════════════════════════

export function ParallaxLayer({
  children, speed=0.25, className="", style={},
}: {
  children: ReactNode; speed?:number;
  className?:string; style?:React.CSSProperties;
}) {
  const should = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const range = speed * 80;
  const y = useTransform(scrollYProgress, [0,1], [`-${range}px`, `${range}px`]);
  const ySpring = useSpring(y, { stiffness:60, damping:20 });

  if (should) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y:ySpring, willChange:"transform" }}>
      {children}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// NUMBER COUNTER — blur-in reveal
// ══════════════════════════════════════════════════════════════

export function AnimatedNumber({
  value, prefix="", suffix="", decimals=0, className="", style={},
}: {
  value: number; prefix?:string; suffix?:string;
  decimals?:number; className?:string; style?:React.CSSProperties;
}) {
  const should = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-100px" });

  useEffect(() => {
    if (!inView || should) { setDisplay(value); return; }
    let start = 0;
    const step = value / 72;
    const timer = setInterval(() => {
      start = Math.min(start + step, value);
      setDisplay(start);
      if (start >= value) clearInterval(timer);
    }, 1000/60);
    return () => clearInterval(timer);
  }, [inView, value, should]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString();

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity:0, filter:"blur(12px)", y:20 }}
      animate={inView ? { opacity:1, filter:"blur(0px)", y:0 } : {}}
      transition={{ duration:DUR.luxury, ease:EASE.luxury }}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  );
}

// ══════════════════════════════════════════════════════════════
// DRAW LINE — animated divider
// ══════════════════════════════════════════════════════════════

export function DrawLine({
  delay=0, color="linear-gradient(90deg,transparent,var(--cyan),rgba(138,92,255,.5),transparent)",
  height=1, className="", style={},
}: {
  delay?:number; color?:string; height?:number;
  className?:string; style?:React.CSSProperties;
}) {
  const should = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <div ref={ref} className={className} style={{ overflow:"hidden", ...style }}>
      <motion.div
        style={{
          height, background:color,
          boxShadow:`0 0 8px rgba(0,212,255,.25)`,
        }}
        initial={{ scaleX:0, transformOrigin:"left" }}
        animate={inView && !should ? { scaleX:1 } : {}}
        transition={{ duration:DUR.luxury, delay, ease:EASE.luxury }}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// REVEAL SECTION — wraps a section with entrance
// ══════════════════════════════════════════════════════════════

export function RevealSection({
  children, className="", style={},
}: {
  children: ReactNode; className?:string; style?:React.CSSProperties;
}) {
  const should = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-120px" });

  return (
    <motion.section
      ref={ref}
      className={className}
      style={style}
      initial={should ? {} : { opacity:0, y:32 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:DUR.luxury, ease:EASE.luxury }}
    >
      {children}
    </motion.section>
  );
}

// ══════════════════════════════════════════════════════════════
// SHIMMER BUTTON WRAPPER
// ══════════════════════════════════════════════════════════════

export function ShimmerButton({
  children, className="", style={}, onClick, as="button",
}: {
  children: ReactNode; className?:string; style?:React.CSSProperties;
  onClick?:()=>void; as?:"button"|"a";
}) {
  const should = useReducedMotion();
  return (
    <motion.button
      className={className}
      style={{ position:"relative", overflow:"hidden", ...style }}
      whileHover={should ? {} : { scale:1.04, y:-1 }}
      whileTap={should ? {} : { scale:.97 }}
      transition={SPRING.snappy}
      onClick={onClick}
    >
      {/* Shimmer sweep */}
      {!should && (
        <motion.div
          style={{
            position:"absolute", top:0, left:"-100%", width:"60%", height:"100%",
            background:"linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)",
            pointerEvents:"none", zIndex:10,
          }}
          initial={{ left:"-100%" }}
          whileHover={{ left:"160%" }}
          transition={{ duration:.65, ease:EASE.out }}
        />
      )}
      {children}
    </motion.button>
  );
}

// ══════════════════════════════════════════════════════════════
// FLOATING ELEMENT — subtle perpetual float
// ══════════════════════════════════════════════════════════════

export function FloatElement({
  children, amplitude=12, period=5, delay=0, className="", style={},
}: {
  children: ReactNode; amplitude?:number; period?:number;
  delay?:number; className?:string; style?:React.CSSProperties;
}) {
  const should = useReducedMotion();
  if (should) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y:[0, -amplitude, 0] }}
      transition={{ duration:period, delay, repeat:Infinity, ease:"easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════
// TIMELINE NODE — architectural stratum marker
// ══════════════════════════════════════════════════════════════

export function TimelineNode({
  active=false, color="var(--cyan)",
}: {
  active?:boolean; color?:string;
}) {
  const should = useReducedMotion();
  return (
    <motion.div
      initial={{ scaleX:0, opacity:0 }}
      whileInView={{ scaleX:1, opacity:1 }}
      viewport={{ once:true }}
      transition={{ duration:0.4, ease:[0.2,0.8,0.2,1] }}
      style={{
        position:"absolute", left:"50%", transform:"translateX(-50%)",
        width:active?28:18, height:active?4:3, borderRadius:2,
        background:active?color:"rgba(255,255,255,.25)",
        boxShadow:active?`0 0 12px ${color}88`:undefined,
        zIndex:2, transformOrigin:"left",
      }}
    >
      {active && !should && (
        <motion.div
          style={{
            position:"absolute", top:0, left:0, right:0, height:"100%",
            borderRadius:2,
            background:`linear-gradient(90deg, transparent, ${color}66, transparent)`,
          }}
          animate={{ x:["-100%","200%"] }}
          transition={{ duration:2.4, repeat:Infinity, ease:"easeInOut" }}
        />
      )}
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
