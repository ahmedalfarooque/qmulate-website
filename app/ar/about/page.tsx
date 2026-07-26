"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, GlassCard } from "@/components/DS";
import { PageBackground } from "@/components/PageBackground";
import { Reveal } from "@/components/Reveal";
import { LineReveal } from "@/components/TextReveal";
import {
  PortfolioIcon, DocumentIcon,
  LockIcon, UserIcon, StarIcon, WealthIcon, GovernanceIcon,
} from "@/components/icons/GlassIcons";

/* ── Values — real Arabic business copy, ported unchanged ── */
const VALUES = [
  { Icon:LockIcon,       title:"النزاهة",             color:"#4C63D2", desc:"نلتزم بالشفافية والصدق والمساءلة في كل ما نقوم به، بناءً على ثقة راسخة مع عملائنا وشركائنا." },
  { Icon:UserIcon,       title:"التركيز على العميل",  color:"#5B7CFA", desc:"نصمم حلولنا وفق الاحتياجات الفريدة لكل عميل، لضمان نهج شخصي يحقق القيمة المطلوبة." },
  { Icon:StarIcon,       title:"التميّز",              color:"#0A0B0D", desc:"نلتزم بتقديم عمل عالي الجودة يجمع بين الخبرة العقارية العميقة والممارسات المؤسسية الرصينة." },
  { Icon:WealthIcon,     title:"الاستدامة",            color:"#3B54C4", desc:"نسعى إلى حماية قيمة الأصول وتعزيزها مع دعم النمو طويل الأمد واستمراريتها عبر الأجيال." },
  { Icon:GovernanceIcon, title:"المسؤولية",            color:"#4C63D2", desc:"نتعامل مع كل أصل بجدية وعناية، مدركين الأثر البعيد المدى للقرارات التي نتخذها." },
] as const;

/* ── Highlights — same real facts, mirrored into compact rows ── */
const HIGHLIGHTS = [
  { Icon:GovernanceIcon, title:"حوكمة واضحة",              body:"أطر ملكية وآليات لصنع القرار واضحة لكل أصل." },
  { Icon:WealthIcon,     title:"الحفاظ على القيمة",         body:"ممارسات مؤسسية منضبطة تحمي القيمة وتعزّز نموها على المدى الطويل." },
  { Icon:DocumentIcon,   title:"امتثال على مستوى المملكة", body:"هيكلة وفق الإطار التنظيمي السعودي عبر خمس جهات ترخيص." },
] as const;

/* ── Stacked cards — right column (visually left in RTL) ── */
const STACK_CARDS = [
  { Icon:PortfolioIcon,  title:"الرؤية", body:"أن نكون الشريك الموثوق في تنظيم الملكية وإدارة الأصول العقارية، وتحويلها إلى فرص استثمارية مستدامة تعزز القيمة وتدعم استمرارية الثروة عبر الأجيال." },
  { Icon:DocumentIcon,   title:"الرسالة", body:"نطوّر وننظّم الأصول العقارية ضمن أطر حوكمة وإدارة واضحة، بما يحفظ القيمة، ويعزز العائد، ويحقق استدامة الاستثمار على المدى الطويل." },
  { Icon:GovernanceIcon, title:"القيم الجوهرية", body:"النزاهة والتركيز على العميل والاستدامة والمسؤولية — توجّه كل قرار نتخذه، وتُستعرض بالتفصيل أدناه." },
  { Icon:StarIcon,       title:"التميّز", body:"نلتزم بتقديم عمل عالي الجودة يجمع بين الخبرة العقارية العميقة والممارسات المؤسسية الرصينة." },
] as const;

/* ═══════════════════════════════════════════════════
   PAGE — Arabic mirror of app/about/page.tsx
   ═══════════════════════════════════════════════════ */
export default function ArAboutPage() {
  return (
    <main className="hero-page" style={{ position:"relative", fontFamily:"'Madani Arabic',sans-serif" }}>
      <PageBackground variant="about"/>

      {/* ── HERO — قسم واحد موحّد، النص فوق صورة معمارية راقية ── */}
      <section className="svc-hero" dir="rtl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="svc-hero-img" src="/Background%20Images/Hero_About%20Page1.jpg" alt="كيوميليت" style={{ objectPosition:"center 42%" }}/>
        <div className="svc-hero-scrim" />

        <div className="container svc-hero-inner">
          <div className="svc-hero-copy" style={{ textAlign:"right" }}>
            <Reveal direction="up" delay={0.05}>
              <span className="pill pill-c" style={{ marginBottom:22 }}>
                عن كيوميليت
              </span>
            </Reveal>

            <h1 className="t-h1 gt-w" style={{ marginBottom:0 }}>
              <LineReveal delay={0.15}><span>نحوّل الأصول العقارية إلى فرص نمو مستدامة على المدى البعيد.</span></LineReveal>
            </h1>

            <motion.p
              {...FU(.4)}
              className="t-lg"
              style={{ color:"var(--text-3)", maxWidth:540, marginTop:26, marginRight:0, marginLeft:"auto" }}
            >
              من خلال مساعدة الملاك والعائلات والشركات والأوقاف على إرساء
              أطر ملكية وإدارة واضحة، نعمل على تعزيز أداء الأصول وإطلاق
              إمكاناتها الحقيقية وخلق قيمة دائمة تمتد عبر الأجيال.
            </motion.p>

            <motion.div {...FU(.48)} className="ed-hero-cta-row" style={{ justifyContent:"flex-end" }}>
              <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize:14, padding:"14px 30px" }}>تواصل معنا ←</Link>
              <Link href="/ar/services" className="btn btn-ghost" style={{ fontSize:14, padding:"14px 26px" }}>خدماتنا</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── من نحن — سرد · تكوين زجاجي تجريدي · بطاقات مكدّسة ── */}
      <section className="section-lux section-lux-tight-bottom" dir="rtl" style={{ position:"relative", overflow:"hidden" }}>
        <div className="deco-shard" style={{ top:"8%", left:"-2%" }} />
        <div className="deco-shard" style={{ bottom:"10%", right:"-3%", transform:"rotate(-16deg)" }} />
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <div className="about-split">

            {/* يمين (أول عمود بصريًا في RTL) — السرد */}
            <div className="about-narrative" style={{ textAlign:"right" }}>
              <Reveal direction="up">
                <span className="pill pill-c">من نحن</span>
              </Reveal>
              <LineReveal delay={0.08} style={{ marginTop:18 }}>
                <h2 className="t-h2 gt-w">منصة قائمة على الحوكمة لملكية الأصول العقارية.</h2>
              </LineReveal>

              <motion.p {...FU(.16)} className="t-md about-narrative-p">
                كيوميليت منصة لملكية الأصول العقارية وإدارتها، مصمّمة للعائلات
                والشركات والأوقاف في مختلف أنحاء المملكة. نساعد عملاءنا على
                إرساء أطر ملكية واضحة، وحوكمة أصولهم بانضباط، وتحويل الأصول
                الثابتة إلى مصادر قيمة طويلة الأمد.
              </motion.p>

              <motion.p {...FU(.24)} className="t-md about-narrative-p">
                يقوم كل تعامل معنا على المبدأ ذاته: وضوح الملكية يمنح الثقة
                في اتخاذ القرار. من الهيكلة والحوكمة إلى إدارة الأصول والتطوير
                والاستثمار، نجلب الانضباط المؤسسي إلى كل مرحلة من مراحل دورة
                حياة الملكية.
              </motion.p>

              <div className="about-highlights">
                {HIGHLIGHTS.map((h,i)=>(
                  <Reveal key={h.title} direction="up" delay={.3+i*.06}>
                    <div className="about-highlight-row" style={{ flexDirection:"row-reverse", textAlign:"right" }}>
                      <h.Icon size="sm"/>
                      <div>
                        <div className="about-highlight-title">{h.title}</div>
                        <div className="about-highlight-body">{h.body}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* يسار (العمود الثاني بصريًا) — بطاقات زجاجية مكدّسة */}
            <div className="about-cards-col">
              {STACK_CARDS.map((c,i)=>(
                <Reveal key={c.title} direction="up" delay={.1+i*.08}>
                  <GlassCard style={{ padding:"clamp(24px,2.6vw,34px)", textAlign:"right" }}>
                    <c.Icon size="md"/>
                    <h4 className="t-h4 about-card-title">{c.title}</h4>
                    <p className="t-sm about-card-body">{c.body}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-lux section-lux-tight-top" dir="rtl">
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:"clamp(48px,6vw,72px)" }}>
            <Reveal direction="up">
              <span className="pill pill-c">قيمنا</span>
            </Reveal>
            <LineReveal delay={0.1} style={{ marginTop:18 }}>
              <h2 className="t-h2 gt-w">قيمنا</h2>
            </LineReveal>
            <Reveal direction="up" delay={0.2}>
              <p className="t-md" style={{ color:"var(--text-3)", marginTop:16 }}>
                المبادئ التي توجّه كل قرار نتخذه
              </p>
            </Reveal>
          </div>

          <div className="values-grid" style={{ direction:"rtl" }}>
            {VALUES.map((value, i) => (
              <Reveal key={value.title} direction="up" delay={i * 0.07}>
                <GlassCard style={{
                  padding:"clamp(28px,3vw,42px) clamp(22px,2.4vw,32px)",
                  height:"100%",
                }}>
                  <div className="value-num-prefix">{String(i+1).padStart(2,"0")}</div>
                  <value.Icon size="md"/>
                  <h4 className="t-h4" style={{
                    color:"var(--text-1)",
                    marginTop:"1.1rem",
                    marginBottom:"0.75rem",
                  }}>{value.title}</h4>
                  <p className="t-sm" style={{ color:"var(--text-3)", lineHeight:1.78 }}>{value.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOWCASE + CTA (single contained dark band) ── */}
      <div className="container" style={{ padding:"0 clamp(20px,4vw,48px) clamp(80px,10vw,140px)" }} dir="rtl">
        <Reveal direction="up">
          <div className="showcase-dark" style={{ textAlign:"center" }}>
            <div className="showcase-quote showcase-quote-sm" style={{ maxWidth:680, margin:"0 auto" }}>
              نطوّر وننظّم الأصول العقارية ضمن أطر حوكمة وإدارة واضحة، بما يحفظ القيمة ويحقق استدامة الاستثمار على المدى الطويل.
            </div>
            <h2 className="showcase-cta-h" style={{ marginTop:"clamp(22px,2.8vw,32px)", marginBottom:10 }}>هل أنت مستعد لبدء محادثة؟</h2>
            <p className="showcase-sub" style={{ maxWidth:440, margin:"0 auto 26px" }}>
              جميع المقدمات خاصة وسرية.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/ar/contact" className="btn btn-primary" style={{ fontSize:14, padding:"13px 32px" }}>← تواصل معنا</Link>
              <Link href="/ar/services" className="btn btn-ghost" style={{ fontSize:14, padding:"13px 28px", color:"#F5F6F8", borderColor:"rgba(255,255,255,0.20)" }}>خدماتنا</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
