"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FU, FI, FS, SectionHeading,
  HeroGlass,
} from "@/components/DS";
import {
  ArchitecturalBg,
} from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Logo3D } from "@/components/Logo3D";
import ScanLine from "@/components/ScanLine";

/* ─── TRUE GLASSMORPHISM SYSTEM ──────────────────────────────────────────── */

const GLASS_BASE = {
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  borderRadius: '22px',
  position: 'relative' as const,
  overflow: 'hidden' as const,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
};

const glass = {
  ...GLASS_BASE,
  background: 'rgba(8, 14, 44, 0.62)',
  border: '1px solid rgba(255,255,255,0.14)',
  boxShadow: `
    inset 0 1.5px 0 rgba(255,255,255,0.45),
    inset 1px 0 0 rgba(255,255,255,0.18),
    inset -1px 0 0 rgba(255,255,255,0.06),
    inset 0 -1px 0 rgba(255,255,255,0.04),
    0 24px 60px rgba(0,0,0,0.65),
    0 8px 20px rgba(0,0,0,0.45),
    0 0 0 1px rgba(255,255,255,0.06)
  `,
};

const glassCyan = {
  ...GLASS_BASE,
  background: 'rgba(0, 30, 80, 0.62)',
  border: '1px solid rgba(0,200,255,0.28)',
  boxShadow: `
    inset 0 1.5px 0 rgba(0,220,255,0.55),
    inset 1px 0 0 rgba(0,200,255,0.22),
    inset -1px 0 0 rgba(0,200,255,0.06),
    inset 0 -1px 0 rgba(0,200,255,0.04),
    0 24px 60px rgba(0,0,0,0.65),
    0 8px 20px rgba(0,10,60,0.50),
    0 0 0 1px rgba(0,200,255,0.10)
  `,
};

const glassPurple = {
  ...GLASS_BASE,
  background: 'rgba(20, 8, 60, 0.62)',
  border: '1px solid rgba(140,90,255,0.28)',
  boxShadow: `
    inset 0 1.5px 0 rgba(160,110,255,0.55),
    inset 1px 0 0 rgba(140,90,255,0.22),
    inset -1px 0 0 rgba(140,90,255,0.06),
    inset 0 -1px 0 rgba(140,90,255,0.04),
    0 24px 60px rgba(0,0,0,0.65),
    0 8px 20px rgba(20,0,60,0.50),
    0 0 0 1px rgba(140,90,255,0.10)
  `,
};

const glassHeavy = {
  ...GLASS_BASE,
  borderRadius: '26px',
  background: 'rgba(6, 10, 36, 0.68)',
  border: '1px solid rgba(255,255,255,0.16)',
  boxShadow: `
    inset 0 2px 0 rgba(255,255,255,0.50),
    inset 1px 0 0 rgba(255,255,255,0.22),
    inset -1px 0 0 rgba(255,255,255,0.08),
    inset 0 -1px 0 rgba(255,255,255,0.04),
    0 32px 80px rgba(0,0,0,0.70),
    0 12px 32px rgba(0,0,0,0.50),
    0 0 0 1px rgba(255,255,255,0.08)
  `,
};

const glassPill = {
  backdropFilter: 'blur(16px) saturate(140%)',
  WebkitBackdropFilter: 'blur(16px) saturate(140%)',
  background: 'rgba(8, 14, 44, 0.55)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '14px',
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.35),
    inset 1px 0 0 rgba(255,255,255,0.10),
    0 8px 24px rgba(0,0,0,0.50)
  `,
  position: 'relative' as const,
  overflow: 'hidden' as const,
  transition: 'all 0.3s ease',
};

const glassHoverCyan = {
  background: 'rgba(0, 40, 100, 0.70)',
  border: '1px solid rgba(0,220,255,0.45)',
  boxShadow: `
    inset 0 1.5px 0 rgba(0,220,255,0.70),
    inset 1px 0 0 rgba(0,200,255,0.30),
    0 32px 80px rgba(0,0,0,0.70),
    0 0 60px rgba(0,150,255,0.20)
  `,
  transform: 'translateY(-5px)',
};

const glassHoverPurple = {
  background: 'rgba(30, 10, 80, 0.70)',
  border: '1px solid rgba(160,110,255,0.45)',
  boxShadow: `
    inset 0 1.5px 0 rgba(160,110,255,0.70),
    inset 1px 0 0 rgba(140,90,255,0.30),
    0 32px 80px rgba(0,0,0,0.70),
    0 0 60px rgba(120,60,255,0.20)
  `,
  transform: 'translateY(-5px)',
};

// True glass plate — very low opacity, strong blur, vivid edge highlights, deep 3D shadow stack
const glassLight3D = {
  backdropFilter: 'blur(48px) saturate(200%) brightness(1.08)',
  WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.08)',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255,255,255,0.30)',
  borderRadius: '20px',
  position: 'relative' as const,
  overflow: 'hidden' as const,
  boxShadow: `
    inset 0 1.5px 0 rgba(255,255,255,0.55),
    inset 1px 0 0 rgba(255,255,255,0.22),
    inset -1px 0 0 rgba(255,255,255,0.08),
    inset 0 -1px 0 rgba(255,255,255,0.06),
    0 4px 0 rgba(0,0,0,0.22),
    0 8px 0 rgba(0,0,0,0.16),
    0 14px 0 rgba(0,0,0,0.10),
    0 22px 0 rgba(0,0,0,0.06),
    0 36px 80px rgba(0,0,0,0.65),
    0 12px 30px rgba(0,0,0,0.40)
  `,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
};

const SUB_GLASS = [glassCyan, glassPurple, glass];
const SUB_HIGHLIGHT = ['rgba(0,220,255,0.55)', 'rgba(160,110,255,0.55)', 'rgba(255,255,255,0.40)'];

/* ─── GLASS DECORATOR COMPONENTS ─────────────────────────────────────────── */

function GlassHighlight({ color = 'rgba(255,255,255,0.25)' }: { color?: string }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
      background: `linear-gradient(90deg, transparent 0%, ${color} 30%, rgba(255,255,255,0.35) 50%, ${color} 70%, transparent 100%)`,
      pointerEvents: 'none', zIndex: 3,
    }} />
  );
}

function GlassLeftEdge({ color = 'rgba(255,255,255,0.12)' }: { color?: string }) {
  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, width: '1px', bottom: 0,
      background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
      pointerEvents: 'none', zIndex: 3,
    }} />
  );
}

function GlassInnerGlow({ color = 'rgba(255,255,255,0.06)' }: { color?: string }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '60%',
      background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
      pointerEvents: 'none', zIndex: 0, borderRadius: 'inherit',
    }} />
  );
}

function GlassSheen() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 30%, transparent 60%, rgba(0,0,0,0.05) 100%)',
      pointerEvents: 'none', zIndex: 0, borderRadius: 'inherit',
    }} />
  );
}

/* ─── AMBIENT BLOBS ───────────────────────────────────────────────────────── */
function AmbientBlobs({ cyan = true }: { cyan?: boolean }) {
  return (
    <>
      <div style={{
        position: 'absolute', top: '15%', right: '5%',
        width: '650px', height: '650px',
        background: `radial-gradient(circle, ${cyan ? 'rgba(0,160,255,0.38)' : 'rgba(130,70,255,0.34)'} 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 0, filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '5%',
        width: '550px', height: '550px',
        background: `radial-gradient(circle, ${cyan ? 'rgba(110,60,255,0.30)' : 'rgba(0,160,255,0.28)'} 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 0, filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '20%',
        width: '400px', height: '400px',
        background: `radial-gradient(circle, ${cyan ? 'rgba(0,220,255,0.20)' : 'rgba(180,100,255,0.18)'} 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0, filter: 'blur(60px)',
      }} />
    </>
  );
}

/* ─── SERVICE ICONS (SVG) ─────────────────────────────────────────────────── */
const SERVICE_ICONS = [
  (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="1" width="6" height="5" rx="1.5"/>
      <line x1="12" y1="6" x2="12" y2="10"/>
      <line x1="4.5" y1="10" x2="19.5" y2="10"/>
      <line x1="4.5" y1="10" x2="4.5" y2="13"/>
      <line x1="19.5" y1="10" x2="19.5" y2="13"/>
      <rect x="1.5" y="13" width="6" height="5" rx="1.5"/>
      <rect x="16.5" y="13" width="6" height="5" rx="1.5"/>
    </svg>
  ),
  (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/>
      <path d="M5 21V7.5L12 3l7 4.5V21"/>
      <rect x="9" y="13" width="2.5" height="8"/>
      <rect x="12.5" y="13" width="2.5" height="8"/>
      <rect x="8.5" y="8.5" width="2" height="2" rx="0.4"/>
      <rect x="13.5" y="8.5" width="2" height="2" rx="0.4"/>
    </svg>
  ),
  (color: string) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 8.5 11 13 15.5 21 7"/>
      <polyline points="16 7 21 7 21 12"/>
      <line x1="3" y1="21" x2="21" y2="21"/>
    </svg>
  ),
];

/* ════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════ */
const SERVICES_AR = [
  {
    id: "structuring", label: "هيكلة الملكية والحوكمة", color: "var(--cyan)",
    body: "تنظيم أطر الملكية وهياكل صنع القرار لضمان الوضوح والسيطرة على المدى البعيد.",
  },
  {
    id: "asset-management", label: "إدارة الأصول العقارية", color: "#8A5CFF",
    body: "إدارة المحافظ من خلال التأجير والتشغيل والصيانة للحفاظ على القيمة وتعزيزها.",
  },
  {
    id: "development", label: "التطوير والاستثمار", color: "#4D8DFF",
    body: "تحديد وتنفيذ الفرص للتوسع وإعادة التوظيف والنمو المستدام.",
  },
];


const WATERMARK = (
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
    <img src="/Logo.png" alt="" style={{ width: "55%", maxWidth: "580px", height: "auto", opacity: 0.03, filter: "brightness(10) saturate(0)", userSelect: "none" }} />
  </div>
);

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
export default function ArHome() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, .6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const wwaRef = useRef<HTMLDivElement>(null);
  const wwaVisible = useInView(wwaRef, { once: true, margin: "-20px" });

  return (
    <main className="hero-page" style={{ position: "relative", fontFamily: "'Madani Arabic',sans-serif" }}>
      <PageBackground variant="home" />

      {/* ════════════════════════════════════════════════════════
          1. HERO
          ════════════════════════════════════════════════════════ */}
      <section id="home" ref={heroRef} style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)" }}>
        <ScanLine />
        {WATERMARK}
        <motion.div style={{ position: "absolute", inset: 0, y: heroY }} className="will-change-transform">
          <ArchitecturalBg variant="mixed" />
        </motion.div>
        <motion.div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1240, padding: "0 clamp(20px,4vw,48px)", opacity: heroOpacity }}>
          <HeroGlass style={{ borderRadius: 36, padding: "clamp(44px,6vw,80px)" }}>
            <div style={{ position: "relative", width: "100%", direction: "rtl" }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7, duration: .6 }} style={{ marginBottom: 32 }}>
                <Logo3D size={220} />
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .8, duration: 1.1, ease: [.25, .46, .45, .94] }} className="t-d gt-w" style={{ marginBottom: 20, fontSize: "clamp(36px,4.5vw,68px)", lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 16, width: "100%" }}>
                نحوّل الملكية إلى قيمة مستدامة.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: .8 }} className="t-xl" style={{ color: "var(--text-3)", maxWidth: "100%", marginBottom: 44, lineHeight: 1.9 }}>
                منظومة عقارية متكاملة للعائلات والشركات والأفراد، تتخصص في إدارة الأصول والحفاظ على قيمتها وتحقيق النمو المستدام على المدى البعيد.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: .7 }} style={{ display: "flex", gap: 14, flexWrap: "wrap", direction: "rtl" }}>
                <a href="/ar/contact" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 34px" }}>← طلب تواصل خاص</a>
                <a href="/ar/about" className="btn btn-ghost" style={{ fontSize: 15, padding: "14px 30px" }}>من نحن</a>
              </motion.div>
            </div>
          </HeroGlass>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. REGULATORY
          TODO: Replace placeholder cards with actual authority logos
          ════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-alt)", backdropFilter: "blur(40px)", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)", position: "relative", overflow: "hidden" }}>
        <ScanLine />
        <AmbientBlobs cyan={true} />
        <div className="container" style={{ padding: "clamp(48px,6vw,80px) 0", position: "relative", zIndex: 1, direction: "rtl" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,4vw,48px)" }}>
            <div className="t-xs" style={{ color: "var(--cyan)", marginBottom: 12 }}>الجهات التنظيمية</div>
            <h2 className="t-h2" style={{ color: "var(--text-1)" }}>مرخّصون ومنظَّمون.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: "clamp(16px,2vw,24px)" }}>
            {[
              { name: "أوقاف", img: "/Regulatory%20Authorities/AWQAF%20LOGO.png" },
              { name: "إحكام", img: "/Regulatory%20Authorities/EHKAAM%20LOGO.png" },
              { name: "وزارة الإسكان", img: "/Regulatory%20Authorities/Ministry%20of%20Housing%20Logo.png" },
              { name: "هيئة العقار", img: "/Regulatory%20Authorities/REAL%20ESTATE%20GENERAL%20AUTHORITY%20LOGO.png" },
              { name: "هيئة أملاك الدولة", img: "/Regulatory%20Authorities/STATE%20PROPERTY%20OF%20GENERAL%20AUTHORITY%20LOGO.png" },
            ].map((r, i) => (
              <motion.div key={r.name} {...FU(i * 0.07)} style={{ position: "relative", paddingBottom: 22 }}>
                {/* 3D depth shadows — strictly below the card */}
                <div style={{ position: "absolute", left: "4%", right: "4%", bottom: 4, height: "80%", borderRadius: 20, background: "rgba(0,0,0,0.40)", filter: "blur(12px)", zIndex: 0, pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: "8%", right: "8%", bottom: 0, height: "60%", borderRadius: 20, background: "rgba(0,0,0,0.25)", filter: "blur(20px)", zIndex: 0, pointerEvents: "none" }} />
                {/* Light frosted card */}
                <div style={{ ...glassLight3D, padding: "clamp(28px,3vw,44px) clamp(16px,2vw,28px)", textAlign: "center", position: "relative", zIndex: 1, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 160 }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.55) 30%,rgba(255,255,255,0.75) 50%,rgba(255,255,255,0.55) 70%,transparent)", zIndex: 3, pointerEvents: "none" }} />
                  <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
                    <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.img} alt={r.name} style={{ maxHeight: (i===0||i===4) ? 145 : 120, maxWidth: (i===0||i===4) ? "100%" : "90%", width: (i===0||i===4) ? "100%" : undefined, objectFit: "contain", transform: (i===0||i===4) ? "scale(1.35)" : "none", transformOrigin: "center center", filter: "brightness(1.1) drop-shadow(0 2px 16px rgba(0,160,255,0.35))" }} />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "rgba(255,255,255,0.88)", lineHeight: 1.4, direction: "rtl" }}>{r.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. WHO WE ARE
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{ position: "relative", overflow: "hidden" }}>
        <ScanLine />
        <ArchitecturalBg variant="strata-left" />
        <AmbientBlobs cyan={false} />
        <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,96px)", alignItems: "center" }} className="grid-2">
            <div>
              <SectionHeading eyebrow="من نحن" title={<>منظومة عقارية متكاملة.</>} subtitle="نقدم نهجًا متكاملًا لإدارة الأصول العقارية وهيكلة الملكية، نساعد من خلاله عملاءنا على إدارة أصولهم وفق أطر حوكمة واضحة وإدارة فعّالة ونظرة بعيدة المدى." />
            </div>
            <motion.div
              ref={wwaRef}
              initial="hidden"
              animate={wwaVisible ? "visible" : "hidden"}
              variants={{ visible: { transition: { staggerChildren: 0.35 } } }}
              style={{ position: "relative", display: "flex", flexDirection: "column" }}
            >
              {[
                { label: "هيكلة الملكية",       sub: "أطر واضحة · حوكمة القرار · وضوح المدى البعيد",       color: "var(--cyan)" },
                { label: "إدارة الأصول",         sub: "التأجير · التشغيل · الصيانة · الحفاظ على القيمة",   color: "#8A5CFF" },
                { label: "التطوير والاستثمار",   sub: "التوسع · إعادة التوظيف · النمو المستدام",            color: "#4D8DFF" },
              ].map((layer, i) => (
                <motion.div
                  key={layer.label}
                  variants={{
                    hidden:  { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
                  }}
                >
                  <div style={{ ...glass, padding: "20px 24px", borderRight: `2px solid ${layer.color}66` }}>
                    <GlassHighlight /><GlassLeftEdge /><GlassInnerGlow /><GlassSheen />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", direction: "rtl", position: "relative", zIndex: 2 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", marginBottom: 4 }}>{layer.label}</div>
                        <div className="t-xs" style={{ color: "rgba(255,255,255,0.82)", textTransform: "none", letterSpacing: 0, fontSize: 12 }}>{layer.sub}</div>
                      </div>
                      <div style={{ width: 12, height: 3, borderRadius: 1, background: layer.color, boxShadow: `0 0 8px ${layer.color}`, flexShrink: 0 }} />
                    </div>
                  </div>
                  {i < 2 && (
                    <motion.div
                      variants={{
                        hidden:  { scaleY: 0, opacity: 0 },
                        visible: { scaleY: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut", delay: 0.45 } },
                      }}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", transformOrigin: "top", overflow: "hidden" }}
                    >
                      <div style={{ width: 2, height: 32, background: "linear-gradient(180deg,rgba(0,220,255,0.8) 0%,rgba(0,180,255,0.3) 100%)", boxShadow: "0 0 6px rgba(0,220,255,0.5)", borderRadius: 2 }} />
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(0,220,255,0.7)", boxShadow: "0 0 8px rgba(0,220,255,0.6)" }} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. SERVICES PREVIEW
          ════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
        <ScanLine />
        <ArchitecturalBg variant="lattice" />
        <AmbientBlobs cyan={true} />
        <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
          <div style={{ marginBottom: "clamp(40px,5vw,64px)", direction: "rtl" }}>
            <SectionHeading wide eyebrow="خدماتنا" title="هيكلة مناسبة لكل نوع من أنواع الملكية." subtitle="صُممت خدماتنا لتغطية مختلف احتياجات الملكية العقارية، بدءًا من هيكلة الملكية والحوكمة، مرورًا بإدارة الأصول، وصولًا إلى التطوير والاستثمار." />
          </div>
          <div className="grid-3" style={{ gap: "clamp(16px,2vw,24px)", marginBottom: "clamp(32px,4vw,48px)" }}>
            {SERVICES_AR.map((s, i) => (
              <motion.div key={s.id} {...FU(i * 0.06)}>
                <div
                  style={{ ...glass, ...(hoveredService === i ? glassHoverCyan : {}), padding: "clamp(24px,3vw,40px)", height: "100%" }}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <GlassHighlight />
                  <GlassLeftEdge />
                  <GlassInnerGlow />
                  <GlassSheen />
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, marginBottom: 20,
                      background: 'rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(20px) saturate(160%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                      border: `1px solid ${s.color}55`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 16px rgba(0,0,0,0.40), 0 0 16px ${s.color}22`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,${s.color}99,rgba(255,255,255,0.45),transparent)`, zIndex: 2 }} />
                      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%,${s.color}25 0%,transparent 70%)`, zIndex: 0 }} />
                      <span style={{ position: 'relative', zIndex: 1, filter: `drop-shadow(0 0 8px ${s.color}) drop-shadow(0 0 18px ${s.color}66)` }}>{SERVICE_ICONS[i](s.color)}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", marginBottom: 12, lineHeight: 1.5 }}>{s.label}</h3>
                    <p className="t-sm" style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.9 }}>{s.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="/ar/services" className="btn btn-ghost" style={{ fontSize: 15, padding: "14px 32px" }}>← عرض جميع الخدمات</a>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
