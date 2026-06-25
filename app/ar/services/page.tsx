"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI, SectionHeading, GlassCard } from "@/components/DS";
import { GovernanceIcon, PortfolioIcon, DigitalIcon } from "@/components/icons/GlassIcons";
import { ArchitecturalBg } from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";

const SERVICE_ICONS_AR = [GovernanceIcon, PortfolioIcon, DigitalIcon];

const SERVICES_AR = [
  {
    num: "01",
    title: "هيكلة الملكية والحوكمة",
    color: "var(--cyan)",
    clients: [
      {
        label: "الشركات",
        body: "هيكلة ملكية الشركات والأصول وتنظيم العلاقة بين الشركاء والمستثمرين بما يضمن وضوح الصلاحيات، وفعالية اتخاذ القرار، واستدامة الاستثمار.",
      },
      {
        label: "الأوقاف",
        body: "تنظيم ملكية الأصول الوقفية ووضع أطر حوكمة واضحة تدعم تحقيق مقاصد الوقف، وتعزز الاستدامة والاستمرارية عبر الأجيال.",
      },
      {
        label: "الأفراد والعائلات",
        body: "تنظيم الأصول والاستثمارات الشخصية ضمن هيكل واضح يساعد على الحوكمة واتخاذ القرار والتخطيط للمستقبل.",
      },
    ],
  },
  {
    num: "02",
    title: "إدارة الأصول العقارية",
    color: "#8A5CFF",
    clients: [
      {
        label: "الشركات",
        body: "إدارة المحافظ والأصول العقارية من خلال التشغيل والتأجير والصيانة والتحصيل، بما يحافظ على قيمة الأصول ويعزز كفاءتها التشغيلية.",
      },
      {
        label: "الأوقاف",
        body: "إدارة وتشغيل الأصول الوقفية بما يحقق أفضل استفادة منها ويحافظ على استدامة منافعها وفق شروط الوقف.",
      },
      {
        label: "الأفراد والعائلات",
        body: "إدارة العقارات الشخصية والاستثمارية بطريقة توفر رؤية واضحة للأداء وتساعد على المحافظة على القيمة وتعزيز العوائد.",
      },
    ],
  },
  {
    num: "03",
    title: "التطوير والاستثمار",
    color: "#4D8DFF",
    clients: [
      {
        label: "الشركات",
        body: "دراسة فرص التوسع والتطوير وإعادة توظيف الأصول بما يدعم النمو ويحقق أفضل عائد استثماري.",
      },
      {
        label: "الأوقاف",
        body: "تحديد الفرص المناسبة لتنمية الأصول الوقفية وتطويرها بما يحقق الاستدامة ويعزز أثر الوقف.",
      },
      {
        label: "الأفراد والعائلات",
        body: "تقييم الفرص الاستثمارية وتحديد المسار الأنسب للتطوير أو الاحتفاظ أو التخارج بما يتوافق مع الأهداف المالية طويلة المدى.",
      },
    ],
  },
];

export default function ArServicesPage() {
  return (
    <main style={{ position: "relative", fontFamily: "'Madani Arabic',sans-serif" }}>
      <PageBackground variant="services" />

      {/* ── Hero ── */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: "clamp(120px,15vw,180px)", paddingBottom: "clamp(60px,8vw,100px)",
        background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)",
      }}>
        <ArchitecturalBg variant="mixed" />
        {/* Logo watermark */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden",
        }}>
          <img src="/Logo.png" alt="" style={{
            width: "55%", maxWidth: "580px", height: "auto",
            opacity: 0.03, filter: "brightness(10) saturate(0)",
            userSelect: "none",
          }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
          <motion.div {...FI()} style={{ marginBottom: 24 }}>
            <span className="pill pill-c"><span className="dot-live" />الخدمات</span>
          </motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{ maxWidth: 720, marginBottom: 24 }}>
            هيكلة مناسبة لكل نوع من أنواع الملكية.
          </motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 560, lineHeight: 1.9 }}>
            صُممت خدماتنا لتغطية مختلف احتياجات الملكية العقارية، بدءًا من هيكلة الملكية والحوكمة، مرورًا بإدارة الأصول، وصولًا إلى التطوير والاستثمار.
          </motion.p>
        </div>
      </section>

      {/* ── Services ── */}
      {SERVICES_AR.map((svc, si) => {
        const SvcIcon = SERVICE_ICONS_AR[si];
        return (
        <section key={svc.num} className="section" style={{
          position: "relative", overflow: "hidden",
          background: si % 2 === 1 ? "var(--bg-alt)" : undefined,
        }}>
          <ArchitecturalBg variant={si % 2 === 0 ? "strata-left" : "lattice"} />
          <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
            <motion.div {...FI()} style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 16, flexDirection: "row-reverse", justifyContent: "flex-end" }}>
              <SvcIcon size="md" />
              <span className="t-xs" style={{ color: svc.color, fontFamily: "var(--font-geist-mono,'Courier New'),monospace" }}>{svc.num}</span>
            </motion.div>
            <motion.h2 {...FU(.06)} className="t-h2" style={{ color: "var(--text-1)", marginBottom: "clamp(40px,5vw,64px)", borderRight: `3px solid ${svc.color}`, paddingRight: 20 }}>
              {svc.title}
            </motion.h2>
            <div className="grid-3" style={{ gap: "clamp(20px,2.5vw,32px)" }}>
              {svc.clients.map((c, ci) => (
                <motion.div key={c.label} {...FU(.06 + ci * .1)}>
                  <GlassCard style={{ padding: "clamp(24px,3vw,40px)", height: "100%", borderTop: `2px solid ${svc.color}44` }}>
                    <div style={{ fontSize: 12, color: svc.color, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 16, direction: "rtl" }}>
                      {c.label}
                    </div>
                    <p className="t-sm" style={{ color: "var(--text-3)", lineHeight: 1.9, direction: "rtl" }}>{c.body}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        );
      })}

      {/* ── CTA ── */}
      <section className="section" style={{
        position: "relative", overflow: "hidden", textAlign: "center",
        background: "linear-gradient(160deg,var(--bg-1),var(--bg-0))",
      }}>
        <ArchitecturalBg variant="mixed" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{ marginBottom: 16 }}>ابدأ محادثة.</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{ color: "var(--text-3)", marginBottom: 36 }}>
            كل تواصل يُعامَل بسرية تامة.
          </motion.p>
          <motion.div {...FU(.14)} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 36px" }}>← تواصل معنا</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
