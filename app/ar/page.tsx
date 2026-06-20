"use client";
import {
  LocationIcon, EmailIcon, LockIcon, ClockIcon, PhoneIcon,
} from "@/components/icons/GlassIcons";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FU, FI, FS, SectionHeading, GlassCard,
  HeroGlass,
} from "@/components/DS";
import {
  ArchitecturalBg,
} from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Logo3D } from "@/components/Logo3D";
import ScanLine from "@/components/ScanLine";

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

const SERVICES_DETAIL_AR = [
  {
    num: "01", title: "هيكلة الملكية والحوكمة", color: "var(--cyan)",
    clients: [
      { label: "الشركات", body: "هيكلة ملكية الشركات والأصول وتنظيم العلاقة بين الشركاء والمستثمرين بما يضمن وضوح الصلاحيات، وفعالية اتخاذ القرار، واستدامة الاستثمار." },
      { label: "الأوقاف", body: "تنظيم ملكية الأصول الوقفية ووضع أطر حوكمة واضحة تدعم تحقيق مقاصد الوقف، وتعزز الاستدامة والاستمرارية عبر الأجيال." },
      { label: "الأفراد والعائلات", body: "تنظيم الأصول والاستثمارات الشخصية ضمن هيكل واضح يساعد على الحوكمة واتخاذ القرار والتخطيط للمستقبل." },
    ],
  },
  {
    num: "02", title: "إدارة الأصول العقارية", color: "#8A5CFF",
    clients: [
      { label: "الشركات", body: "إدارة المحافظ والأصول العقارية من خلال التشغيل والتأجير والصيانة والتحصيل، بما يحافظ على قيمة الأصول ويعزز كفاءتها التشغيلية." },
      { label: "الأوقاف", body: "إدارة وتشغيل الأصول الوقفية بما يحقق أفضل استفادة منها ويحافظ على استدامة منافعها وفق شروط الوقف." },
      { label: "الأفراد والعائلات", body: "إدارة العقارات الشخصية والاستثمارية بطريقة توفر رؤية واضحة للأداء وتساعد على المحافظة على القيمة وتعزيز العوائد." },
    ],
  },
  {
    num: "03", title: "التطوير والاستثمار", color: "#4D8DFF",
    clients: [
      { label: "الشركات", body: "دراسة فرص التوسع والتطوير وإعادة توظيف الأصول بما يدعم النمو ويحقق أفضل عائد استثماري." },
      { label: "الأوقاف", body: "تحديد الفرص المناسبة لتنمية الأصول الوقفية وتطويرها بما يحقق الاستدامة ويعزز أثر الوقف." },
      { label: "الأفراد والعائلات", body: "تقييم الفرص الاستثمارية وتحديد المسار الأنسب للتطوير أو الاحتفاظ أو التخارج بما يتوافق مع الأهداف المالية طويلة المدى." },
    ],
  },
];

const AREAS_AR = ["هيكلة الملكية والحوكمة", "إدارة الأصول العقارية", "التطوير والاستثمار", "استفسار عام"];

const WATERMARK = (
  <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
    <img src="/Logo.png" alt="" style={{ width: "55%", maxWidth: "580px", height: "auto", opacity: 0.03, filter: "brightness(10) saturate(0)", userSelect: "none" }} />
  </div>
);

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
export default function ArHome() {
  const [form, setForm] = useState({ name: "", email: "", entity: "", reason: "", message: "" });
  const [focus, setFocus] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, .6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const inp = (field: string): React.CSSProperties => ({
    width: "100%", background: "var(--g1)",
    border: `1px solid ${focus === field ? "rgba(0,212,255,.5)" : "rgba(255,255,255,.08)"}`,
    borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "var(--text-1)",
    outline: "none", fontFamily: "'IBM Plex Sans Arabic',sans-serif",
    direction: "rtl", textAlign: "right",
    transition: "border-color .2s, box-shadow .2s",
    boxShadow: focus === field ? "0 0 0 3px rgba(0,212,255,.12)" : "none",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("طلب تواصل — كيوميليت");
    const body = encodeURIComponent(
      `الاسم: ${form.name}\nالبريد الإلكتروني: ${form.email}\nالعائلة / الجهة: ${form.entity}\nمجال الاهتمام: ${form.reason}\n\nالرسالة:\n${form.message}`
    );
    window.location.href = `mailto:enquiries@qmulate.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="hero-page" style={{ position: "relative", fontFamily: "'IBM Plex Sans Arabic',sans-serif" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(40px,5vw,80px)", alignItems: "center", direction: "rtl" }} className="hero-grid">
              <div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7, duration: .6 }} style={{ marginBottom: 24 }}>
                  <img src="/Logo.png" alt="QMULATE" style={{ width: "150px", height: "auto", objectFit: "contain" }} />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .8, duration: 1.1, ease: [.25, .46, .45, .94] }} className="t-d gt-w" style={{ marginBottom: 20, fontSize: "clamp(44px,6vw,88px)" }}>
                  نحوّل الملكية إلى قيمة مستدامة.
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: .8 }} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 480, marginBottom: 44, lineHeight: 1.9 }}>
                  منظومة عقارية متكاملة للعائلات والشركات والأفراد، تتخصص في إدارة الأصول والحفاظ على قيمتها وتحقيق النمو المستدام على المدى البعيد.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: .7 }} style={{ display: "flex", gap: 14, flexWrap: "wrap", direction: "rtl" }}>
                  <a href="#contact" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 34px" }}>← طلب تواصل خاص</a>
                  <a href="#about" className="btn btn-ghost" style={{ fontSize: 15, padding: "14px 30px" }}>من نحن</a>
                </motion.div>
              </div>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
                <motion.div initial={{ opacity: 0, scale: .9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 1.0, duration: 1.0, ease: [.34, 1.56, .64, 1] }}>
                  <div style={{ position: "relative", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "460px" }}>
                    <Logo3D size={250} />
                  </div>
                </motion.div>
              </div>
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
        <div className="container" style={{ padding: "clamp(48px,6vw,80px) 0", position: "relative", zIndex: 1, direction: "rtl" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(32px,4vw,48px)" }}>
            <div className="t-xs" style={{ color: "var(--cyan)", marginBottom: 12 }}>الجهات التنظيمية</div>
            <h2 className="t-h2" style={{ color: "var(--text-1)" }}>مرخّصون ومنظَّمون.</h2>
          </div>
          <div className="grid-3" style={{ gap: "clamp(16px,2vw,24px)" }}>
            {[1, 2, 3].map(i => (
              <GlassCard key={i} style={{ padding: "clamp(24px,3vw,40px)", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, background: "rgba(255,255,255,.06)", borderRadius: 10, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--text-5)" }}>LOGO</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-5)" }}>شعار الجهة</div>
              </GlassCard>
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
        <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(48px,6vw,96px)", alignItems: "center" }} className="grid-2">
            <div>
              <SectionHeading eyebrow="من نحن" title={<>منظومة عقارية متكاملة.</>} subtitle="نقدم نهجًا متكاملًا لإدارة الأصول العقارية وهيكلة الملكية، نساعد من خلاله عملاءنا على إدارة أصولهم وفق أطر حوكمة واضحة وإدارة فعّالة ونظرة بعيدة المدى." />
            </div>
            <motion.div {...FS(.12)} style={{ position: "relative" }}>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "هيكلة الملكية", sub: "أطر واضحة · حوكمة القرار · وضوح المدى البعيد", color: "var(--cyan)" },
                  { label: "إدارة الأصول", sub: "التأجير · التشغيل · الصيانة · الحفاظ على القيمة", color: "#8A5CFF" },
                  { label: "التطوير والاستثمار", sub: "التوسع · إعادة التوظيف · النمو المستدام", color: "#4D8DFF" },
                ].map((layer, i) => (
                  <motion.div key={layer.label} {...FU(.12 + i * .08)}>
                    <GlassCard style={{ padding: "20px 24px", borderRight: `2px solid ${layer.color}44` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", direction: "rtl" }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-1)", marginBottom: 4 }}>{layer.label}</div>
                          <div className="t-xs" style={{ color: "var(--text-3)", textTransform: "none", letterSpacing: 0, fontSize: 12 }}>{layer.sub}</div>
                        </div>
                        <div style={{ width: 12, height: 3, borderRadius: 1, background: layer.color, boxShadow: `0 0 8px ${layer.color}`, flexShrink: 0 }} />
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
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
        <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px,5vw,64px)" }}>
            <SectionHeading eyebrow="خدماتنا" title="هيكلة مناسبة لكل نوع من أنواع الملكية." center subtitle="صُممت خدماتنا لتغطية مختلف احتياجات الملكية العقارية، بدءًا من هيكلة الملكية والحوكمة، مرورًا بإدارة الأصول، وصولًا إلى التطوير والاستثمار." />
          </div>
          <div className="grid-3" style={{ gap: "clamp(16px,2vw,24px)", marginBottom: "clamp(32px,4vw,48px)" }}>
            {SERVICES_AR.map((s, i) => (
              <motion.div key={s.id} {...FU(i * 0.06)}>
                <GlassCard style={{ padding: "clamp(24px,3vw,40px)", height: "100%" }}>
                  <div style={{ width: 10, height: 3, borderRadius: 1, background: s.color, marginBottom: 20, boxShadow: `0 0 8px ${s.color}` }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-1)", marginBottom: 12, lineHeight: 1.5 }}>{s.label}</h3>
                  <p className="t-sm" style={{ color: "var(--text-3)", lineHeight: 1.9 }}>{s.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="#services" className="btn btn-ghost" style={{ fontSize: 15, padding: "14px 32px" }}>← عرض جميع الخدمات</a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. ABOUT
          ════════════════════════════════════════════════════════ */}
      <section id="about" style={{ scrollMarginTop: 64, position: "relative", overflow: "hidden" }} className="section">
        <ScanLine />
        <ArchitecturalBg variant="fins" />
        {WATERMARK}
        <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
          <motion.div {...FI()} style={{ marginBottom: 24 }}>
            <span className="pill pill-c"><span className="dot-live" />من نحن</span>
          </motion.div>
          <motion.h2 {...FU(.08)} className="t-h1 gt-w" style={{ maxWidth: 780, marginBottom: 24 }}>
            نؤمن بأن العقار أكثر من مجرد أصل.
          </motion.h2>
          <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 620, lineHeight: 1.9, marginBottom: "clamp(48px,6vw,72px)" }}>
            إنه قيمة تستحق الحفاظ عليها وإدارتها وتنميتها من خلال وصاية مدروسة ورؤية بعيدة المدى.
          </motion.p>
          <div className="grid-2" style={{ gap: "clamp(24px,3vw,40px)", marginBottom: "clamp(40px,5vw,64px)" }}>
            {[
              { label: "الرؤية", color: "var(--cyan)", title: "شريك موثوق عبر الأجيال.", body: "أن نكون الشريك الموثوق للعائلات والشركات والأفراد في هيكلة الملكية العقارية وإدارة الأصول وتحويلها إلى فرص مستدامة تحافظ على القيمة وتدعم النمو عبر الأجيال." },
              { label: "المهمة", color: "#8A5CFF", title: "أطر حوكمة راسخة ودائمة.", body: "نطور ونُدير الأصول العقارية وفق أطر حوكمة وإدارة واضحة تحافظ على قيمتها وتعزز عوائدها وتدعم استدامة الاستثمار على المدى البعيد." },
            ].map((item, i) => (
              <motion.div key={item.label} {...FU(i * .1)}>
                <GlassCard style={{ padding: "clamp(32px,4vw,52px)", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, direction: "rtl" }}>
                    <span className="t-xs" style={{ color: item.color }}>{item.label}</span>
                    <div style={{ flex: 1, height: 1, background: `linear-gradient(270deg,${item.color}44,transparent)` }} />
                  </div>
                  <h3 className="t-h3" style={{ color: "var(--text-1)", marginBottom: 16, lineHeight: 1.4 }}>{item.title}</h3>
                  <p className="t-md" style={{ color: "var(--text-3)", lineHeight: 1.9 }}>{item.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div className="t-xs" style={{ color: "var(--text-4)", marginBottom: "clamp(24px,3vw,36px)" }}>القيم</div>
          </div>
          <div className="grid-3" style={{ gap: "clamp(16px,2vw,24px)" }}>
            {[
              { title: "تراكم", body: "دع الهيكل لا الضجيج يقود العوائد على مدى عقود.", color: "var(--cyan)", icon: "◈" },
              { title: "حماية", body: "تحكّم لدرء المخاطر؛ احفظ القيمة قبل أن تنمو.", color: "#8A5CFF", icon: "⬡" },
              { title: "انتقال", body: "انقل النية لا الأصول فحسب بين الأجيال.", color: "#4D8DFF", icon: "◉" },
            ].map((v, i) => (
              <motion.div key={v.title} {...FU(i * .1)}>
                <GlassCard style={{ padding: "clamp(28px,3.5vw,44px)", textAlign: "center", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 16, color: v.color, filter: `drop-shadow(0 0 12px ${v.color}66)` }}>{v.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-1)", marginBottom: 12 }}>{v.title}</h3>
                  <p className="t-sm" style={{ color: "var(--text-3)", lineHeight: 1.9 }}>{v.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. SERVICES DETAIL
          ════════════════════════════════════════════════════════ */}
      <section id="services" style={{ scrollMarginTop: 64, position: "relative", overflow: "hidden" }}>
        <ScanLine />
        <div style={{ background: "var(--bg-alt)", padding: "clamp(60px,8vw,96px) 0", position: "relative" }}>
          <ArchitecturalBg variant="mixed" />
          <div className="container" style={{ position: "relative", zIndex: 1, direction: "rtl" }}>
            <motion.div {...FI()} style={{ marginBottom: 24 }}>
              <span className="pill pill-c"><span className="dot-live" />الخدمات</span>
            </motion.div>
            <motion.h2 {...FU(.08)} className="t-h1 gt-w" style={{ maxWidth: 720, marginBottom: 24 }}>
              هيكلة مناسبة لكل نوع من أنواع الملكية.
            </motion.h2>
            <motion.p {...FU(.16)} className="t-xl" style={{ color: "var(--text-3)", maxWidth: 560, lineHeight: 1.9 }}>
              صُممت خدماتنا لتغطية مختلف احتياجات الملكية العقارية، من الهيكلة والحوكمة إلى الإدارة والتطوير والاستثمار.
            </motion.p>
          </div>
        </div>

        {SERVICES_DETAIL_AR.map((svc, si) => (
          <div key={svc.num} style={{ background: si % 2 === 1 ? "var(--bg-alt)" : undefined, position: "relative", overflow: "hidden" }}>
            <ArchitecturalBg variant={si % 2 === 0 ? "strata-left" : "lattice"} />
            <div className="container" style={{ position: "relative", zIndex: 1, padding: "clamp(48px,6vw,80px) 0", direction: "rtl" }}>
              <motion.div {...FI()} style={{ marginBottom: 12 }}>
                <span className="t-xs" style={{ color: svc.color, fontFamily: "monospace" }}>{svc.num}</span>
              </motion.div>
              <motion.h3 {...FU(.06)} className="t-h2" style={{ color: "var(--text-1)", marginBottom: "clamp(40px,5vw,64px)", borderRight: `3px solid ${svc.color}`, paddingRight: 20 }}>
                {svc.title}
              </motion.h3>
              <div className="grid-3" style={{ gap: "clamp(20px,2.5vw,32px)" }}>
                {svc.clients.map((c, ci) => (
                  <motion.div key={c.label} {...FU(.06 + ci * .1)}>
                    <GlassCard style={{ padding: "clamp(24px,3vw,40px)", height: "100%", borderTop: `2px solid ${svc.color}44` }}>
                      <div style={{ fontSize: 12, color: svc.color, fontWeight: 700, marginBottom: 16, direction: "rtl" }}>{c.label}</div>
                      <p className="t-sm" style={{ color: "var(--text-3)", lineHeight: 1.9 }}>{c.body}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════════════════════════════
          7. CONTACT
          ════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ scrollMarginTop: 64, position: "relative", overflow: "hidden", background: "linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 60%,var(--bg-0) 100%)" }}>
        <ScanLine />
        <ArchitecturalBg variant="strata-right" />
        <div className="container" style={{ position: "relative", zIndex: 1, padding: "clamp(80px,10vw,120px) 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(48px,6vw,96px)", alignItems: "start", direction: "rtl" }} className="grid-2">

            {/* ── RTL first column — details ── */}
            <div>
              <motion.div {...FI()} style={{ marginBottom: 24 }}>
                <span className="pill pill-c"><span className="dot-live" />تواصل</span>
              </motion.div>
              <motion.h2 {...FU(.08)} className="t-h2 gt-w" style={{ marginBottom: 40, lineHeight: 1.2 }}>
                تواصل خاص وحصري.
              </motion.h2>

              <motion.div {...FU(.14)} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { Icon: LocationIcon, label: "المكتب",   value: "جدة، المملكة العربية السعودية", href: undefined },
                  { Icon: EmailIcon,    label: "المراسلة", value: "enquiries@qmulate.com",          href: "mailto:enquiries@qmulate.com" },
                  { Icon: PhoneIcon,    label: "الهاتف",   value: "+966 53 333 9052",               href: "tel:+966533339052" },
                  { Icon: LockIcon,     label: "السرية",   value: "جميع طلبات التواصل خاصة وسرية", href: undefined },
                  { Icon: ClockIcon,    label: "وقت الرد", value: "خلال يوم عمل واحد",             href: undefined },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "20px 0", borderBottom: "1px solid var(--glass-border)", direction: "rtl" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--g1)", border: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size="sm" />
                    </div>
                    <div>
                      <div className="t-xs" style={{ color: "var(--text-4)", marginBottom: 4 }}>{label}</div>
                      {href
                        ? <a href={href} style={{ fontSize: 14, color: "var(--cyan)", fontWeight: 500, direction: "ltr", display: "block", textAlign: "right" }}>{value}</a>
                        : <div style={{ fontSize: 14, color: "var(--text-2)", fontWeight: 500 }}>{value}</div>
                      }
                    </div>
                  </div>
                ))}

                <div style={{ padding: "20px 0", borderBottom: "1px solid var(--glass-border)" }}>
                  <div className="t-xs" style={{ color: "var(--text-4)", marginBottom: 4 }}>العنوان</div>
                  <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.8 }}>
                    طريق الملك عبدالعزيز، حي البساتين<br />
                    ص.ب 23718، جدة 9351<br />
                    المملكة العربية السعودية
                  </p>
                </div>
              </motion.div>

              <motion.p {...FU(.32)} style={{ fontSize: 11, color: "var(--text-5)", marginTop: 28, fontFamily: "var(--font-geist-mono,'Courier New'),monospace", direction: "ltr", textAlign: "right" }}>
                خاص وسري · السجل التجاري: 7054453274 · الرقم الضريبي: 314819612900003
              </motion.p>
            </div>

            {/* ── RTL second column — form ── */}
            <motion.div {...FU(.1)}>
              <GlassCard style={{ padding: "clamp(32px,4vw,52px)" }}>
                <div className="t-xs" style={{ color: "var(--cyan)", marginBottom: 28, direction: "rtl" }}>طلب تواصل</div>

                {sent ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-1)", marginBottom: 8 }}>تم إرسال الطلب.</h3>
                    <p style={{ fontSize: 14, color: "var(--text-3)" }}>سنتواصل معك خلال يوم عمل واحد.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, direction: "rtl" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-grid">
                      <div>
                        <label style={{ fontSize: 11, color: "var(--text-4)", display: "block", marginBottom: 6 }}>الاسم الكامل *</label>
                        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          onFocus={() => setFocus("name")} onBlur={() => setFocus(null)}
                          style={inp("name")} placeholder="اسمك الكامل" />
                      </div>
                      <div>
                        <label style={{ fontSize: 11, color: "var(--text-4)", display: "block", marginBottom: 6 }}>البريد الإلكتروني *</label>
                        <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          onFocus={() => setFocus("email")} onBlur={() => setFocus(null)}
                          style={{ ...inp("email"), direction: "ltr", textAlign: "left" }} placeholder="you@example.com" />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: "var(--text-4)", display: "block", marginBottom: 6 }}>اسم العائلة / الجهة</label>
                      <input value={form.entity} onChange={e => setForm(f => ({ ...f, entity: e.target.value }))}
                        onFocus={() => setFocus("entity")} onBlur={() => setFocus(null)}
                        style={inp("entity")} placeholder="اسم العائلة أو المؤسسة" />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: "var(--text-4)", display: "block", marginBottom: 6 }}>مجال الاهتمام</label>
                      <select value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                        onFocus={() => setFocus("reason")} onBlur={() => setFocus(null)}
                        style={{ ...inp("reason"), appearance: "none", cursor: "pointer" }}>
                        <option value="">اختر مجالاً</option>
                        {AREAS_AR.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: "var(--text-4)", display: "block", marginBottom: 6 }}>الرسالة *</label>
                      <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        onFocus={() => setFocus("message")} onBlur={() => setFocus(null)}
                        style={{ ...inp("message"), resize: "vertical", minHeight: 120 }} rows={5}
                        placeholder="أخبرنا عن محفظتك وأهدافك" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ fontSize: 15, padding: "14px", justifyContent: "center" }}>
                      إرسال الطلب ←
                    </button>
                    <p style={{ fontSize: 11, color: "var(--text-5)", textAlign: "center", lineHeight: 1.7 }}>
                      جميع طلبات التواصل خاصة وسرية. لا نشارك معلوماتك مع أي طرف آخر.
                    </p>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.hero-grid,.grid-2,.form-grid{grid-template-columns:1fr!important}}
        @media(max-width:640px){.grid-3{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
