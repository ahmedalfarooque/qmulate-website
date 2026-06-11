"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StrataMark } from "./StrataMark";

export function Footer() {
  const path = usePathname();
  const isAr = path.startsWith("/ar");

  const en = {
    links:[
      {h:"About",items:[{l:"Our Story",h:"/about"},{l:"Mission & Vision",h:"/about"},{l:"Governance Philosophy",h:"/about"},{l:"Leadership",h:"/about"}]},
      {h:"Services",items:[{l:"Property Stewardship",h:"/services"},{l:"Governed Growth",h:"/services"},{l:"Property Advisory",h:"/services"},{l:"Wealth Reporting",h:"/services"},{l:"Risk Management",h:"/services"}]},
      {h:"Platform",items:[{l:"Solutions",h:"/solutions"},{l:"Projects",h:"/projects"},{l:"Intelligence",h:"/solutions"},{l:"Technology",h:"/solutions"}]},
      {h:"Company",items:[{l:"Contact Us",h:"/contact"},{l:"Privacy Policy",h:"/contact"},{l:"Terms of Service",h:"/contact"},{l:"Confidentiality",h:"/contact"}]},
    ],
    tagline:"Wealth, structured to outlast its makers.",
    sub:"QMULATE is a specialist real estate family office. All communications are private and confidential.",
    copy:"© 2026 QMULATE. All rights reserved. Private & Confidential.",
  };
  const ar = {
    links:[
      {h:"الشركة",items:[{l:"قصتنا",h:"/ar/about"},{l:"الرؤية والرسالة",h:"/ar/about"},{l:"فلسفة الحوكمة",h:"/ar/about"},{l:"القيادة",h:"/ar/about"}]},
      {h:"الخدمات",items:[{l:"إدارة العقارات",h:"/ar/services"},{l:"النمو المحكوم",h:"/ar/services"},{l:"الاستشارات",h:"/ar/services"},{l:"تقارير الثروة",h:"/ar/services"},{l:"إدارة المخاطر",h:"/ar/services"}]},
      {h:"المنصة",items:[{l:"الحلول",h:"/ar/solutions"},{l:"المشاريع",h:"/ar/projects"},{l:"الذكاء الاستثماري",h:"/ar/solutions"},{l:"التكنولوجيا",h:"/ar/solutions"}]},
      {h:"التواصل",items:[{l:"اتصل بنا",h:"/ar/contact"},{l:"سياسة الخصوصية",h:"/ar/contact"},{l:"شروط الخدمة",h:"/ar/contact"},{l:"السرية",h:"/ar/contact"}]},
    ],
    tagline:"ثروة مبنية لتدوم بعد صانعيها.",
    sub:"كيوميليت مكتب عائلي متخصص في العقارات. جميع المراسلات سرية وخاصة.",
    copy:"© 2026 كيوميليت. جميع الحقوق محفوظة.",
  };
  const t = isAr ? ar : en;

  return (
    <footer style={{
      background:"var(--bg-0)",backdropFilter:"blur(40px)",
      borderTop:"1px solid var(--hr-color)",
      position:"relative",overflow:"hidden",
      direction:isAr?"rtl":"ltr",
      fontFamily:isAr?"'IBM Plex Sans Arabic',sans-serif":"'Inter',sans-serif",
    }}>
      {/* Background gradient */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 50% at 50% 100%,color-mix(in srgb,var(--cyan) 5%,transparent),transparent 70%)",pointerEvents:"none"}}/>
      <div className="hr-glow" style={{opacity:.4}}/>

      <div className="container" style={{position:"relative",zIndex:1,paddingTop:"clamp(60px,8vw,96px)",paddingBottom:"clamp(40px,5vw,60px)"}}>
        {/* Top section */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",gap:"clamp(24px,3vw,48px)",marginBottom:"clamp(48px,6vw,72px)"}} className="footer-grid">
          {/* Brand column */}
          <div>
            <Link href={isAr?"/ar":"/"} style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,textDecoration:"none"}}>
              <StrataMark size={30} style={{color:"var(--text-1)"}}/>
              <div>
                <div style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:13,letterSpacing:"0.17em",color:"var(--text-1)",lineHeight:1}}>QMULATE</div>
                <div style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:8,color:"rgba(148,163,184,.45)",letterSpacing:"0.10em",marginTop:2}}>FAMILY OFFICE</div>
              </div>
            </Link>
            <p style={{fontSize:15,color:"var(--text-3)",lineHeight:1.75,marginBottom:16,maxWidth:280}}>{t.tagline}</p>
            <p style={{fontSize:12,color:"var(--text-4)",lineHeight:1.7,maxWidth:300}}>{t.sub}</p>
          </div>

          {/* Link columns */}
          {t.links.map(col=>(
            <div key={col.h}>
              <div className="t-xs" style={{color:"var(--text-4)",marginBottom:16}}>{col.h}</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {col.items.map(item=>(
                  <Link key={item.l} href={item.h} style={{
                    fontSize:13,color:"var(--text-3)",transition:"color .2s",lineHeight:1.5,
                  }}
                  onMouseEnter={e=>(e.currentTarget.style.color="var(--text-2)")}
                  onMouseLeave={e=>(e.currentTarget.style.color="var(--text-3)")}
                  >{item.l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="hr-dim" style={{marginBottom:24}}/>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:16}}>
          <p style={{fontSize:11,color:"var(--text-5)",fontFamily:"var(--font-geist-mono,'Courier New'),monospace"}}>{t.copy}</p>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <Link href={isAr?"/":"/ar"} style={{fontSize:11,color:"var(--text-5)",transition:"color .2s"}}
              onMouseEnter={e=>(e.currentTarget.style.color="var(--text-3)")}
              onMouseLeave={e=>(e.currentTarget.style.color="var(--text-5)")}
            >{isAr?"English":"العربية"}</Link>
            <span style={{color:"var(--text-5)",fontSize:9}}>●</span>
            <span style={{fontSize:11,color:"var(--text-5)",fontFamily:"var(--font-geist-mono,'Courier New'),monospace"}}>v7.0 · 2026</span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1000px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:600px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}
