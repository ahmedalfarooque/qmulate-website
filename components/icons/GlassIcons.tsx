"use client";
/**
 * QMULATE — Premium Glassmorphism Icon System v1.0
 *
 * Visual inspiration: Apple Vision Pro, VisionOS, Stripe, Linear
 * Brand-matched: QMULATE Dark "Midnight Deep" + Light "Pearl Ink"
 *
 * Architecture:
 *  - Pure SVG with layered gradient glass effect
 *  - CSS drop-shadow glow (GPU-accelerated, no filter elements)
 *  - Theme-aware via next-themes + mounted guard
 *  - Framer Motion hover animations
 *  - useId() for stable, unique gradient IDs per instance
 */

import { useId } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// ── Size system ──────────────────────────────────────────────────
export type GlassSize = "xs"|"sm"|"md"|"lg"|"xl";
const SZ: Record<GlassSize,number> = { xs:28, sm:36, md:48, lg:64, xl:80 };

// ── Brand colour palettes ────────────────────────────────────────
// Each variant: [deep bg, mid, accent, glow]
const DARK: Record<string,[string,string,string,string]> = {
  cyan:    ["#003D5C","#006A96","#00D4FF","rgba(0,212,255,.7)"],
  violet:  ["#1A0A4A","#4B1EA0","#8A5CFF","rgba(138,92,255,.7)"],
  blue:    ["#050E3A","#1D3A8C","#4D8DFF","rgba(77,141,255,.7)"],
  pink:    ["#3A0830","#901860","#FF6EC7","rgba(255,110,199,.7)"],
  gold:    ["#3A1800","#905010","#FFB56B","rgba(255,181,107,.7)"],
  aurora:  ["#050E3A","#4B1EA0","#00D4FF","rgba(100,150,255,.7)"],
  emerald: ["#003330","#006860","#00D4B8","rgba(0,212,184,.7)"],
  indigo:  ["#0E0B2E","#2A2490","#818CF8","rgba(129,140,248,.7)"],
  rose:    ["#3A0A14","#901830","#FB7185","rgba(251,113,133,.7)"],
};

const LIGHT: Record<string,[string,string,string,string]> = {
  cyan:    ["#BAE6FD","#7DD3FC","#0284C7","rgba(2,132,199,.35)"],
  violet:  ["#EDE9FE","#C4B5FD","#6D28D9","rgba(109,40,217,.35)"],
  blue:    ["#DBEAFE","#BFDBFE","#1D4ED8","rgba(29,78,216,.35)"],
  pink:    ["#FCE7F3","#FBCFE8","#BE185D","rgba(190,24,93,.35)"],
  gold:    ["#FEF3C7","#FDE68A","#B45309","rgba(180,83,9,.35)"],
  aurora:  ["#EDE9FE","#DBEAFE","#4F46E5","rgba(79,70,229,.35)"],
  emerald: ["#D1FAF4","#99F6E4","#0F766E","rgba(15,118,110,.35)"],
  indigo:  ["#E0E7FF","#C7D2FE","#4338CA","rgba(67,56,202,.35)"],
  rose:    ["#FFE4E6","#FECDD3","#BE123C","rgba(190,18,60,.35)"],
};

// ── useThemeColors hook ───────────────────────────────────────────
function useVariantColors(variant: string) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>setMounted(true),[]);
  const isDark = !mounted || resolvedTheme !== "light";
  const palette = isDark ? DARK : LIGHT;
  return palette[variant] ?? palette.cyan;
}

// ── Hover animation preset ────────────────────────────────────────
const iconHover = {
  whileHover:{ scale:1.08, y:-3 },
  whileTap:{ scale:.96 },
  transition:{ type:"spring" as const, stiffness:400, damping:20 },
};

// ── Core glass SVG renderer ───────────────────────────────────────
function GlassSVG({
  uid, size, colors, path, rx=13,
  extraPaths, accentDots,
}:{
  uid:string; size:number; colors:[string,string,string,string];
  path:string; rx?:number;
  extraPaths?:React.ReactNode;
  accentDots?:{cx:number;cy:number;r:number;fill:string}[];
}) {
  const [deep, mid, accent, glow] = colors;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>setMounted(true),[]);
  const isDark = !mounted || resolvedTheme !== "light";

  // Overlay opacity — stronger in dark, softer in light
  const overlayOpacity = isDark ? 0.13 : 0.55;
  // Border opacity
  const borderOpacity = isDark ? 0.32 : 0.22;
  const symbolOpacity = isDark ? 0.95 : 0.9;
  // Shine brightness
  const shineOpacity = isDark ? 0.55 : 0.80;

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{display:"block",overflow:"visible"}}
    >
      <defs>
        {/* Gradient background */}
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={deep} stopOpacity={isDark?1:.95}/>
          <stop offset="55%" stopColor={mid}  stopOpacity={isDark?.97:.90}/>
          <stop offset="100%" stopColor={accent} stopOpacity={isDark?.85:.75}/>
        </linearGradient>
        {/* Top shine */}
        <linearGradient id={`sh-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity={shineOpacity}/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        {/* Border gradient — bright top-left */}
        <linearGradient id={`br-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity={borderOpacity+.18}/>
          <stop offset="40%"  stopColor="white" stopOpacity={borderOpacity}/>
          <stop offset="100%" stopColor="white" stopOpacity={isDark?.04:.08}/>
        </linearGradient>
        {/* Symbol gradient (for colorful symbols in light mode) */}
        <linearGradient id={`sym-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isDark?"#FFFFFF":mid}/>
          <stop offset="100%" stopColor={isDark?"rgba(255,255,255,.85)":deep}/>
        </linearGradient>
      </defs>

      {/* ── Layer 1: Ambient glow behind glass ── */}
      <rect x="4" y="6" width="40" height="40" rx={rx}
        fill={glow} opacity={isDark?.55:.30}
        style={{filter:"blur(10px)"}}/>

      {/* ── Layer 2: Glass background (the colored gradient) ── */}
      <rect x="1" y="1" width="46" height="46" rx={rx+1}
        fill={`url(#bg-${uid})`}/>

      {/* ── Layer 3: Frosted glass overlay ── */}
      <rect x="1" y="1" width="46" height="46" rx={rx+1}
        fill="white" opacity={overlayOpacity}/>

      {/* ── Layer 4: Top shine / reflection ── */}
      <rect x="5" y="2" width="38" height="19" rx={rx-1}
        fill={`url(#sh-${uid})`}/>

      {/* ── Layer 5: Border with gradient ── */}
      <rect x="1.5" y="1.5" width="45" height="45" rx={rx+.5}
        fill="none" stroke={`url(#br-${uid})`} strokeWidth="1"/>

      {/* ── Layer 6: Extra decorative paths (optional) ── */}
      {extraPaths}

      {/* ── Layer 7: Accent spheres (optional) ── */}
      {accentDots?.map((d,i)=>(
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r}
          fill={d.fill}
          style={{filter:`drop-shadow(0 0 ${d.r*1.5}px ${d.fill})`}}/>
      ))}

      {/* ── Layer 8: Icon symbol ── */}
      <g transform="translate(12,12)"
        style={{
          stroke: isDark?"white":`url(#sym-${uid})`,
          strokeWidth:1.75,
          strokeLinecap:"round",
          strokeLinejoin:"round",
          fill:"none",
          opacity:symbolOpacity,
        }}>
        <path d={path}/>
        {extraPaths}
      </g>
    </svg>
  );
}

// ── Master GlassIcon wrapper ──────────────────────────────────────
interface GlassIconProps {
  size?: GlassSize | number;
  variant?: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  animated?: boolean;
  children: (uid:string, size:number, colors:[string,string,string,string]) => React.ReactNode;
}

export function GlassIcon({
  size="md", variant="cyan", className="", style={}, title, animated=true, children
}: GlassIconProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g,"");
  const sz = typeof size === "number" ? size : SZ[size];
  const colors = useVariantColors(variant);
  const [,,,glow] = colors;

  const content = (
    <div
      role={title?"img":undefined}
      aria-label={title}
      title={title}
      className={className}
      style={{
        width:sz, height:sz, display:"inline-flex",
        alignItems:"center", justifyContent:"center",
        filter:`drop-shadow(0 ${sz*.06}px ${sz*.25}px ${glow})`,
        willChange:"transform, filter",
        ...style,
      }}
    >
      {children(uid, sz, colors)}
    </div>
  );

  if (!animated) return content;
  return (
    <motion.div
      {...iconHover}
      style={{display:"inline-flex", cursor:"default"}}
    >
      {content}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════
// ICON DEFINITIONS
// Each returns a <GlassIcon> with its specific SVG path
// ════════════════════════════════════════════════════

// ── Navigation Icons ─────────────────────────────────

export const MenuIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="violet" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors} rx={14}
      path="M4 6h16M4 12h16M4 18h16"/>}
  </GlassIcon>
);

export const CloseIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="rose" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors} rx={14}
      path="M18 6 6 18M6 6l12 12"/>}
  </GlassIcon>
);

export const SearchIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="cyan" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors} rx={14}
      path="M11 19a8 8 0 100-16 8 8 0 000 16zm10-1-4.35-4.35"/>}
  </GlassIcon>
);

export const HomeIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="blue" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10"/>}
  </GlassIcon>
);

// ── Service Icons ─────────────────────────────────────

export const GovernanceIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="violet" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 2l8 4v6c0 5.5-4 10.3-8 12-4-1.7-8-6.5-8-12V6l8-4z"
      accentDots={[
        {cx:8,cy:9,r:2.2,fill:"rgba(0,212,255,.7)"},
        {cx:39,cy:11,r:1.6,fill:"rgba(138,92,255,.6)"},
      ]}/>}
  </GlassIcon>
);

export const PortfolioIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="cyan" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M3 3v18h18M7 17l4-4 4 4 4-4"
      accentDots={[{cx:40,cy:9,r:2.5,fill:"rgba(0,212,255,.8)"}]}/>}
  </GlassIcon>
);

export const SuccessionIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="aurora" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>}
  </GlassIcon>
);

export const AIIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="indigo" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 2a10 10 0 100 20A10 10 0 0012 2zM8 12h.01M12 8h.01M16 12h.01M12 16h.01"
      accentDots={[
        {cx:9,cy:9,r:2.5,fill:"rgba(138,92,255,.9)"},
        {cx:39,cy:10,r:1.8,fill:"rgba(0,212,255,.8)"},
        {cx:38,cy:38,r:2,fill:"rgba(168,85,247,.7)"},
      ]}/>}
  </GlassIcon>
);

export const CrossBorderIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="emerald" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0v20M2 12h20M12 2c-2.8 3.3-4.5 7-4.5 10s1.7 6.7 4.5 10M12 2c2.8 3.3 4.5 7 4.5 10s-1.7 6.7-4.5 10"/>}
  </GlassIcon>
);

export const RiskIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="gold" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M10.3 3.1L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.1a2 2 0 00-3.4 0zM12 9v4M12 17h.01"/>}
  </GlassIcon>
);

export const DigitalIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="cyan" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M13 2L3 14h9l-1 8 10-12h-9z"
      accentDots={[{cx:40,cy:8,r:2.8,fill:"rgba(0,212,255,.9)"}]}/>}
  </GlassIcon>
);

// ── Process / Step Icons ─────────────────────────────

export const DiscoveryIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="cyan" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"/>}
  </GlassIcon>
);

export const ArchitectureIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="blue" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10"/>}
  </GlassIcon>
);

export const ImplementationIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="gold" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M13 2L3 14h9l-1 8 10-12h-9z"/>}
  </GlassIcon>
);

export const OperationsIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="violet" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>}
  </GlassIcon>
);

// ── Communication Icons ──────────────────────────────

export const EmailIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="blue" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6"/>}
  </GlassIcon>
);

export const PhoneIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="emerald" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M6.6 10.8a12.6 12.6 0 006.6 6.6l2.1-2.1a1 1 0 011.1-.2c1.2.5 2.5.7 3.6.7 1 0 1 1 1 2v3.5c0 1-.5 1-1 1C10.6 22 2 13.4 2 3c0-.5 0-1 1-1H6.5c1 0 1 0 1 1 0 1.2.2 2.5.7 3.6a1 1 0 01-.2 1.1L6.6 10.8z"/>}
  </GlassIcon>
);

export const ChatIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="aurora" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2zM8 10h.01M12 10h.01M16 10h.01"/>}
  </GlassIcon>
);

export const WhatsAppIconSvg = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="emerald" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.9-1.5.1-.2.1-.4 0-.5-.1-.1-.7-1.8-1-2.4-.3-.7-.5-.6-.7-.6-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4C8 8 7 9 7 11c0 2.1 1.5 4.1 1.7 4.4 2.3 3.5 4.9 4.7 7.6 4.7 1.1 0 2.1-.4 2.9-1.1.7-.7 1.2-1.7 1.3-2.7.1-.9-.1-1.5-.4-1.8z M12 2a10 10 0 100 20A10 10 0 0012 2z"/>}
  </GlassIcon>
);

// ── Location & Info Icons ────────────────────────────

export const LocationIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="pink" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 2a7 7 0 017 7c0 5.5-7 13-7 13S5 14.5 5 9a7 7 0 017-7zm0 4a3 3 0 100 6 3 3 0 000-6z"
      accentDots={[{cx:10,cy:41,r:3.5,fill:"rgba(255,110,199,.25)"}]}/>}
  </GlassIcon>
);

export const LockIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="violet" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M8 11V7a4 4 0 018 0v4M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2zM12 16v-2"/>}
  </GlassIcon>
);

export const ClockIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="gold" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2"
      accentDots={[
        {cx:9,cy:9,r:2.2,fill:"rgba(255,181,107,.9)"},
        {cx:38,cy:10,r:1.6,fill:"rgba(255,181,107,.6)"},
      ]}/>}
  </GlassIcon>
);

export const CheckIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="emerald" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M9 11.5l3 3 7-7M12 2a10 10 0 100 20A10 10 0 0012 2z"/>}
  </GlassIcon>
);

export const DocumentIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="blue" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8"/>}
  </GlassIcon>
);

export const UserIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="aurora" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>}
  </GlassIcon>
);

export const StarIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="gold" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>}
  </GlassIcon>
);

export const InfoIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="cyan" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 9h.01M12 13v4"/>}
  </GlassIcon>
);

// ── Report / Wealth Icons ────────────────────────────

export const ReportIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="violet" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M18 20V10M12 20V4M6 20v-6"
      accentDots={[{cx:40,cy:9,r:2.5,fill:"rgba(138,92,255,.9)"}]}/>}
  </GlassIcon>
);

export const WealthIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="gold" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z"/>}
  </GlassIcon>
);

// ── Social Icons ─────────────────────────────────────

export const LinkedInIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="blue" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/>}
  </GlassIcon>
);

export const TwitterXIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="indigo" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M4 4l16 16M4 20L20 4"/>}
  </GlassIcon>
);

// ── Advisory Icon ────────────────────────────────────

export const AdvisoryIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="blue" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M9 17H5a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3M13 21l4-4H19a2 2 0 002-2v-4a2 2 0 00-2-2h-6a2 2 0 00-2 2v6l-2 2z"/>}
  </GlassIcon>
);

export const StripesIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="aurora" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M3 12h18M3 6h18M3 18h18"/>}
  </GlassIcon>
);

// ── Infinity / Long-term ─────────────────────────────

export const InfinityIcon = ({ size="md" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="violet" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z"/>}
  </GlassIcon>
);

// ── Success / Check state icon ────────────────────────

export const SuccessStateIcon = ({ size="lg" as GlassSize, ...p }: Omit<GlassIconProps,"children"|"variant"> & {size?:GlassSize}) => (
  <GlassIcon size={size} variant="emerald" {...p}>
    {(uid,sz,colors)=><GlassSVG uid={uid} size={sz} colors={colors}
      path="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"
      accentDots={[
        {cx:11,cy:10,r:3,fill:"rgba(0,212,184,.85)"},
        {cx:38,cy:9,r:2,fill:"rgba(0,212,184,.6)"},
      ]}/>}
  </GlassIcon>
);

// ── WhatsApp FAB icon ─────────────────────────────────

export const WhatsAppFAB = ({ size=52 }: { size?: number }) => (
  <motion.div
    whileHover={{ scale:1.1, y:-2 }}
    whileTap={{ scale:.95 }}
    style={{
      width:size, height:size, borderRadius:"50%",
      background:"linear-gradient(135deg,#00A843,#25D366,#80ED99)",
      display:"flex", alignItems:"center", justifyContent:"center",
      boxShadow:"0 4px 24px rgba(37,211,102,.55),0 1px 0 rgba(255,255,255,.25) inset",
      cursor:"pointer", overflow:"hidden", position:"relative",
    }}
  >
    {/* Inner shine */}
    <div style={{
      position:"absolute",top:0,left:0,right:0,height:"45%",
      background:"linear-gradient(to bottom,rgba(255,255,255,.3),transparent)",
      borderRadius:"50% 50% 0 0",pointerEvents:"none",
    }}/>
    <svg width={size*.52} height={size*.52} viewBox="0 0 24 24" fill="none">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.9-1.5.1-.2.1-.4 0-.5-.1-.1-.7-1.8-1-2.4-.3-.7-.5-.6-.7-.6-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4C8 8 7 9 7 11c0 2.1 1.5 4.1 1.7 4.4 2.3 3.5 4.9 4.7 7.6 4.7 1.1 0 2.1-.4 2.9-1.1.7-.7 1.2-1.7 1.3-2.7.1-.9-.1-1.5-.4-1.8z"
        fill="white"/>
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"
        fill="white" opacity=".3"/>
    </svg>
  </motion.div>
);

// ── Service tab icon helper ───────────────────────────
// Maps service ID to its glass icon component
export function ServiceIcon({ id, size="md" as GlassSize }: { id:string; size?:GlassSize }) {
  const icons: Record<string, React.FC<{size?:GlassSize}>> = {
    stewardship: GovernanceIcon,
    growth:      OperationsIcon,
    advisory:    AdvisoryIcon,
    reporting:   ReportIcon,
    risk:        RiskIcon,
    digital:     DigitalIcon,
  };
  const Icon = icons[id] ?? GovernanceIcon;
  return <Icon size={size}/>;
}

// ── Capability icon helper ────────────────────────────
export function CapabilityIcon({ index, size="md" as GlassSize }: { index:number; size?:GlassSize }) {
  const Icons = [GovernanceIcon, PortfolioIcon, SuccessionIcon, AIIcon, CrossBorderIcon, RiskIcon];
  const Icon = Icons[index % Icons.length];
  return <Icon size={size}/>;
}

// ── Process step icon helper ──────────────────────────
export function ProcessIcon({ step, size="md" as GlassSize }: { step:number; size?:GlassSize }) {
  const Icons = [DiscoveryIcon, ArchitectureIcon, ImplementationIcon, InfinityIcon];
  const Icon = Icons[Math.min(step, Icons.length-1)];
  return <Icon size={size}/>;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ChallengeIcon = ({ size = "sm" }: { size?: string }) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L2 22h20L12 2z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M12 9v4" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SolutionCheckIcon = ({ size = "sm" }: { size?: string }) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M7 12l3 3 7-7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);