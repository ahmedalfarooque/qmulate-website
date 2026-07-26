"use client";
/**
 * QMULATE — Premium Real Estate Icon System v3.0
 *
 * Bare, transparent, professional icons — no container, no box, no glow,
 * no glass on the glyph itself. Glassmorphism belongs to cards/sections/
 * buttons only. Glyphs come from Lucide (lucide-react), a single
 * consistent icon family, rendered flat in one ink/charcoal colour, with
 * blue reserved strictly for the hover/active state.
 *
 * Every exported name below is unchanged from the previous system, so no
 * page or component that consumes these icons needs to change.
 */

import type { CSSProperties, ReactNode } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Menu, X, Search, Home, Landmark, Building2, Users, BrainCircuit,
  Globe2, AlertTriangle, Zap, Building,
  Construction, Cog, Mail, Phone, MessageCircle, MapPin, Lock, Clock,
  CheckCircle2, FileText, User, Star, Info, BarChart3, TrendingUp,
  Handshake, AlignJustify, Infinity as InfinityGlyph,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// ── Size system — responsive via clamp() so glyphs scale continuously
// across mobile → tablet → desktop (per spec: ~24–32 / 28–36 / 32–42px),
// no per-breakpoint jumps, no blurring at any width. ─────────────────
export type GlassSize = "xs"|"sm"|"md"|"lg"|"xl";
const SIZE_CLAMP: Record<GlassSize,string> = {
  xs: "clamp(16px, 0.9vw + 13px, 22px)",
  sm: "clamp(20px, 1.1vw + 14px, 28px)",
  md: "clamp(24px, 1.4vw + 16px, 40px)",
  lg: "clamp(28px, 1.7vw + 18px, 46px)",
  xl: "clamp(32px, 2vw + 20px, 52px)",
};

// One consistent ink/charcoal colour everywhere; blue only on hover
// (the hover colour itself lives in the .qi-icon:hover CSS rule).
const INK = "#232833";

// ── Hover interaction — colour + slight scale only, nothing flashy,
// no background/glow/shadow ever appears on the glyph. ───────────────
const iconHover = {
  whileHover:{ scale:1.05 },
  whileTap:{ scale:.97 },
  transition:{ type:"spring" as const, stiffness:420, damping:26 },
};

// ── Master GlassIcon wrapper (public surface unchanged) ───────────
// "variant" is accepted for backward compatibility but no longer
// changes anything visual — every icon is the same flat ink colour.
interface GlassIconProps {
  size?: GlassSize | number;
  variant?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
  animated?: boolean;
  icon?: LucideIcon;
  strokeWidth?: number;
  customGlyph?: ReactNode;
}

export function GlassIcon({
  size="md", className="", style={}, title, animated=true,
  icon:Icon, strokeWidth=2, customGlyph,
}: GlassIconProps) {
  const dim = typeof size === "number" ? `${size}px` : SIZE_CLAMP[size];

  const content = (
    <span
      role={title?"img":undefined}
      aria-label={title}
      title={title}
      className={`qi-icon ${className}`}
      style={{
        display:"inline-flex", alignItems:"center", justifyContent:"center",
        width:dim, height:dim,
        color:INK,
        flexShrink:0,
        ...style,
      }}
    >
      {customGlyph ?? (Icon && <Icon width="100%" height="100%" strokeWidth={strokeWidth} absoluteStrokeWidth />)}
    </span>
  );

  if (!animated) return content;
  return (
    <motion.span {...iconHover} style={{display:"inline-flex", cursor:"default"}}>
      {content}
    </motion.span>
  );
}

type IconProps = { size?: GlassSize; className?: string; style?: CSSProperties; title?: string; animated?: boolean };

/* ══════════════════════════════════════════════════
   ICON DEFINITIONS — real-estate-mapped Lucide glyphs
   Every icon is a bare, transparent, single-colour glyph.
   ══════════════════════════════════════════════════ */

// ── Navigation ─────────────────────────────────────
export const MenuIcon    = (p: IconProps) => <GlassIcon icon={Menu} {...p}/>;
export const CloseIcon   = (p: IconProps) => <GlassIcon icon={X} {...p}/>;
export const SearchIcon  = (p: IconProps) => <GlassIcon icon={Search} {...p}/>;

// ── Core real-estate / capability icons ────────────
export const HomeIcon         = (p: IconProps) => <GlassIcon icon={Home} {...p}/>;          // Property Owners / Residential
export const GovernanceIcon   = (p: IconProps) => <GlassIcon icon={Landmark} {...p}/>;       // Governance & Structuring
export const PortfolioIcon    = (p: IconProps) => <GlassIcon icon={Building2} {...p}/>;      // Portfolio / Asset Management
export const SuccessionIcon   = (p: IconProps) => <GlassIcon icon={Users} {...p}/>;          // Families / Succession
export const AIIcon           = (p: IconProps) => <GlassIcon icon={BrainCircuit} {...p}/>;   // Digital intelligence
export const CrossBorderIcon  = (p: IconProps) => <GlassIcon icon={Globe2} {...p}/>;         // Cross-border / Market reach
export const RiskIcon         = (p: IconProps) => <GlassIcon icon={AlertTriangle} {...p}/>;  // Risk
export const DigitalIcon      = (p: IconProps) => <GlassIcon icon={Zap} {...p}/>;            // Digital / Implementation speed

// ── Process / step icons ───────────────────────────
export const DiscoveryIcon      = (p: IconProps) => <GlassIcon icon={Search} {...p}/>;
export const ArchitectureIcon   = (p: IconProps) => <GlassIcon icon={Building} {...p}/>;
export const ImplementationIcon = (p: IconProps) => <GlassIcon icon={Construction} {...p}/>;
export const OperationsIcon     = (p: IconProps) => <GlassIcon icon={Cog} {...p}/>;

// ── Communication ──────────────────────────────────
export const EmailIcon   = (p: IconProps) => <GlassIcon icon={Mail} {...p}/>;
export const PhoneIcon   = (p: IconProps) => <GlassIcon icon={Phone} {...p}/>;
export const ChatIcon    = (p: IconProps) => <GlassIcon icon={MessageCircle} {...p}/>;

/* WhatsApp — brand mark kept authentic (not a generic Lucide glyph) so it
   stays instantly recognizable, rendered as a bare flat glyph like every
   other icon (the circular green button lives only in WhatsAppFAB below,
   a floating action button — a different UI convention, not a content icon). */
const WhatsAppGlyphPath = "M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.9-1.5.1-.2.1-.4 0-.5-.1-.1-.7-1.8-1-2.4-.3-.7-.5-.6-.7-.6-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4C8 8 7 9 7 11c0 2.1 1.5 4.1 1.7 4.4 2.3 3.5 4.9 4.7 7.6 4.7 1.1 0 2.1-.4 2.9-1.1.7-.7 1.2-1.7 1.3-2.7.1-.9-.1-1.5-.4-1.8z M12 2a10 10 0 100 20A10 10 0 0012 2z";
export const WhatsAppIconSvg = (p: IconProps) => (
  <GlassIcon
    customGlyph={<svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d={WhatsAppGlyphPath}/></svg>}
    {...p}
  />
);

// ── Location & trust ────────────────────────────────
export const LocationIcon = (p: IconProps) => <GlassIcon icon={MapPin} {...p}/>;
export const LockIcon     = (p: IconProps) => <GlassIcon icon={Lock} {...p}/>;
export const ClockIcon    = (p: IconProps) => <GlassIcon icon={Clock} {...p}/>;
export const CheckIcon    = (p: IconProps) => <GlassIcon icon={CheckCircle2} {...p}/>;
export const DocumentIcon = (p: IconProps) => <GlassIcon icon={FileText} {...p}/>;          // Endowments / Documentation
export const UserIcon     = (p: IconProps) => <GlassIcon icon={User} {...p}/>;
export const StarIcon     = (p: IconProps) => <GlassIcon icon={Star} {...p}/>;
export const InfoIcon     = (p: IconProps) => <GlassIcon icon={Info} {...p}/>;

// ── Reporting / wealth ──────────────────────────────
export const ReportIcon = (p: IconProps) => <GlassIcon icon={BarChart3} {...p}/>;
export const WealthIcon = (p: IconProps) => <GlassIcon icon={TrendingUp} {...p}/>;          // Growth / Investment

// ── Social — brand marks kept authentic, bare glyph ─────────────
export const LinkedInIcon = (p: IconProps) => (
  <GlassIcon
    customGlyph={
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.11 20.45H3.56V9h3.55v11.45z"/>
      </svg>
    }
    {...p}
  />
);
export const TwitterXIcon = (p: IconProps) => (
  <GlassIcon
    customGlyph={
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-6.6L4.8 22H1.7l8-9.2L1 2h7.1l4.9 6.1L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z"/>
      </svg>
    }
    {...p}
  />
);

// ── Advisory / partnership ───────────────────────────
export const AdvisoryIcon = (p: IconProps) => <GlassIcon icon={Handshake} {...p}/>;
export const StripesIcon  = (p: IconProps) => <GlassIcon icon={AlignJustify} {...p}/>;

// ── Long-term / infinity ─────────────────────────────
export const InfinityIcon = (p: IconProps) => <GlassIcon icon={InfinityGlyph} {...p}/>;

// ── Success state ────────────────────────────────────
export const SuccessStateIcon = ({ size="lg" as GlassSize, ...p }: IconProps) => (
  <GlassIcon icon={CheckCircle2} size={size} {...p}/>
);

// ── WhatsApp floating action button — the one deliberate exception:
// a circular FAB is the universal convention for a floating chat
// launcher, not a content icon, so it keeps its brand-green button. ──
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
    <div style={{
      position:"absolute",top:0,left:0,right:0,height:"45%",
      background:"linear-gradient(to bottom,rgba(255,255,255,.3),transparent)",
      borderRadius:"50% 50% 0 0",pointerEvents:"none",
    }}/>
    <FaWhatsapp size={size*.58} color="white" aria-hidden="true" style={{ position:"relative", display:"block" }}/>
  </motion.div>
);

// ── Service tab icon helper ───────────────────────────
export function ServiceIcon({ id, size="md" as GlassSize }: { id:string; size?:GlassSize }) {
  const icons: Record<string, FC<IconProps>> = {
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

// ── Small inline list icons — challenge / solution rows ───
export const ChallengeIcon = ({ size = 18 }: { size?: number }) => (
  <AlertTriangle size={size} strokeWidth={2} color="currentColor" />
);
export const SolutionCheckIcon = ({ size = 18 }: { size?: number }) => (
  <CheckCircle2 size={size} strokeWidth={2} color="currentColor" />
);
