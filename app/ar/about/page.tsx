"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU } from "@/components/DS";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Reveal } from "@/components/Reveal";
import {
  PortfolioIcon, DocumentIcon,
  LockIcon, UserIcon, StarIcon, WealthIcon, GovernanceIcon,
} from "@/components/icons/GlassIcons";

export default function ArAboutPage() {
  return (
    <main style={{ position: "relative", fontFamily: "'Madani Arabic',sans-serif" }}>
      <PageBackground variant="about" />

      {/* ── Hero ── */}
      <section dir="rtl" style={{
        paddingTop: 'clamp(100px, 12vw, 140px)', paddingBottom: 'clamp(60px, 8vw, 100px)',
        position: 'relative', overflow: 'hidden', direction: 'rtl',
        background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
      }}>
        <ArchitecturalBg variant="mixed" />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden",
        }}>
          <img src="/Logo.png" alt="" style={{
            width: "55%", maxWidth: "580px", height: "auto",
            opacity: 0.03, filter: "brightness(10) saturate(0)", userSelect: "none",
          }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, direction: 'rtl', textAlign: 'right' }}>
          <Reveal direction="right">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '6px 16px', borderRadius: '999px',
              border: '1px solid rgba(91,124,250,0.28)',
              background: 'rgba(91,124,250,0.10)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              marginBottom: '1.5rem', flexDirection: 'row-reverse',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B7CFA', boxShadow: '0 0 8px rgba(91,124,250,0.8)' }}/>
              <span style={{ color: 'rgba(91,124,250,0.9)', fontSize: 11, letterSpacing: '0.05em', fontFamily: 'var(--font-geist-mono), monospace' }}>
                عن كيوميليت
              </span>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <h1 style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800,
              color: 'var(--text-1)', lineHeight: 1.2, maxWidth: '900px', marginBottom: '1.5rem',
            }}>
              نحوّل الأصول العقارية إلى فرص نمو مستدامة على المدى البعيد.
            </h1>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.8, color: 'var(--text-3)', maxWidth: '760px' }}>
              من خلال مساعدة الملاك والعائلات والشركات والأوقاف على إرساء
              أطر ملكية وإدارة واضحة، نعمل على تعزيز أداء الأصول وإطلاق
              إمكاناتها الحقيقية وخلق قيمة دائمة تمتد عبر الأجيال.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section dir="rtl" style={{ padding: 'clamp(40px, 6vw, 80px) 0', position: 'relative', overflow: 'hidden', direction: 'rtl' }}>
        <ArchitecturalBg variant="fins" />
        <div className="container" style={{ position: 'relative', zIndex: 1, direction: 'rtl' }}>
          <div className="grid-2" style={{ gap: 'clamp(24px,3vw,40px)' }}>
            <Reveal direction="right">
              <div style={{
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                background: 'rgba(8,14,44,0.62)',
                border: '1px solid rgba(0,200,255,0.28)',
                borderRadius: '20px',
                padding: 'clamp(28px, 3vw, 40px)',
                height: '100%',
                boxShadow: 'inset 0 1.5px 0 rgba(0,220,255,0.55), 0 24px 60px rgba(0,0,0,0.65)',
                direction: 'rtl', textAlign: 'right',
              }}>
                <PortfolioIcon size="lg" />
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginTop: '1.25rem', marginBottom: '0.75rem' }}>الرؤية</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--text-3)' }}>
                  أن نكون الشريك الموثوق في تنظيم الملكية وإدارة الأصول العقارية،
                  وتحويلها إلى فرص استثمارية مستدامة تعزز القيمة وتدعم استمرارية
                  الثروة عبر الأجيال.
                </p>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div style={{
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                background: 'rgba(0,30,80,0.62)',
                border: '1px solid rgba(0,200,255,0.28)',
                borderRadius: '20px',
                padding: 'clamp(28px, 3vw, 40px)',
                height: '100%',
                boxShadow: 'inset 0 1.5px 0 rgba(0,220,255,0.55), 0 24px 60px rgba(0,0,0,0.65)',
                direction: 'rtl', textAlign: 'right',
              }}>
                <DocumentIcon size="lg" />
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginTop: '1.25rem', marginBottom: '0.75rem' }}>الرسالة</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--text-3)' }}>
                  نطوّر وننظّم الأصول العقارية ضمن أطر حوكمة وإدارة واضحة،
                  بما يحفظ القيمة، ويعزز العائد، ويحقق استدامة الاستثمار
                  على المدى الطويل.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section dir="rtl" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden', direction: 'rtl' }}>
        <ArchitecturalBg variant="lattice" />
        <div className="container" style={{ position: 'relative', zIndex: 1, direction: 'rtl' }}>
          <Reveal direction="up">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.75rem' }}>قيمنا</h2>
              <p style={{ fontSize: 16, color: 'var(--text-3)' }}>المبادئ التي توجّه كل قرار نتخذه</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {([
              { Icon: LockIcon,       title: 'النزاهة',            desc: 'نلتزم بالشفافية والصدق والمساءلة في كل ما نقوم به، بناءً على ثقة راسخة مع عملائنا وشركائنا.' },
              { Icon: UserIcon,       title: 'التركيز على العميل', desc: 'نصمم حلولنا وفق الاحتياجات الفريدة لكل عميل، لضمان نهج شخصي يحقق القيمة المطلوبة.' },
              { Icon: StarIcon,       title: 'التميّز',             desc: 'نلتزم بتقديم عمل عالي الجودة يجمع بين الخبرة العقارية العميقة والممارسات المؤسسية الرصينة.' },
              { Icon: WealthIcon,     title: 'الاستدامة',           desc: 'نسعى إلى حماية قيمة الأصول وتعزيزها مع دعم النمو طويل الأمد واستمراريتها عبر الأجيال.' },
              { Icon: GovernanceIcon, title: 'المسؤولية',           desc: 'نتعامل مع كل أصل بجدية وعناية، مدركين الأثر البعيد المدى للقرارات التي نتخذها.' },
            ] as const).map((value, i) => (
              <Reveal key={i} direction="up" delay={i * 0.08}>
                <div style={{
                  backdropFilter: 'blur(24px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                  background: 'rgba(8,14,44,0.62)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: '18px',
                  padding: '28px 24px',
                  height: '100%',
                  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.45), 0 24px 60px rgba(0,0,0,0.65)',
                  direction: 'rtl', textAlign: 'right',
                }}>
                  <value.Icon size="md" />
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-1)', marginTop: '1rem', marginBottom: '0.5rem' }}>{value.title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-3)' }}>{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
        <ArchitecturalBg variant="strata-right" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{ marginBottom: 16 }}>هل أنت مستعد لبدء محادثة؟</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{ color: "var(--text-3)", marginBottom: 36 }}>
            جميع المقدمات خاصة وسرية.
          </motion.p>
          <motion.div {...FU(.14)} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 36px" }}>← تواصل معنا</Link>
            <Link href="/ar/services" className="btn btn-ghost" style={{ fontSize: 15, padding: "14px 32px" }}>خدماتنا</Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
