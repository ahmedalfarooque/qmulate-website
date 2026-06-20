"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const path = usePathname();
  const isAr = path.startsWith("/ar");

  const en = {
    navLinks:[
      {l:"Home",h:"/"},{l:"About",h:"/about"},{l:"Services",h:"/services"},{l:"Contact",h:"/contact"},
    ],
    tagline:"Transforming Ownership into Enduring Value.",
    sub:"QMULATE is a specialist real estate platform. All communications are private and confidential.",
    copy:"© 2026 QMULATE. All rights reserved. Private & Confidential.",
    email:"enquiries@qmulate.com",
  };
  const ar = {
    navLinks:[
      {l:"الرئيسية",h:"/ar"},{l:"من نحن",h:"/ar/about"},{l:"خدماتنا",h:"/ar/services"},{l:"تواصل",h:"/ar/contact"},
    ],
    tagline:"نحوّل الملكية إلى قيمة مستدامة.",
    sub:"كيوميليت منظومة عقارية متكاملة. جميع المراسلات سرية وخاصة.",
    copy:"© 2026 كيوميليت. جميع الحقوق محفوظة. خاص وسري.",
    email:"enquiries@qmulate.com",
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
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"clamp(24px,3vw,48px)",marginBottom:"clamp(48px,6vw,72px)",alignItems:"start"}} className="footer-grid">
          {/* Brand column */}
          <div>
            <Link href={isAr?"/ar":"/"} style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,textDecoration:"none"}}>
              <img src="/Logo.png" alt="QMULATE" style={{height:'36px',width:'auto',display:'block',objectFit:'contain',mixBlendMode:'screen',filter:'drop-shadow(0 0 4px rgba(91,124,250,0.45))'}} />
              <div>
                <div style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:13,letterSpacing:"0.17em",color:"var(--text-1)",lineHeight:1}}>QMULATE</div>
                <div style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:8,color:"rgba(148,163,184,.45)",letterSpacing:"0.10em",marginTop:2}}>REAL ESTATE PLATFORM</div>
              </div>
            </Link>
            <p style={{fontSize:15,color:"var(--text-3)",lineHeight:1.75,marginBottom:12,maxWidth:320}}>{t.tagline}</p>
            <p style={{fontSize:12,color:"var(--text-4)",lineHeight:1.7,maxWidth:320,marginBottom:12}}>{t.sub}</p>
            <a href={`mailto:${t.email}`} style={{fontSize:12,color:"var(--cyan)",lineHeight:1.7}}>{t.email}</a>
          </div>

          {/* Navigation column */}
          <div>
            <div className="t-xs" style={{color:"var(--text-4)",marginBottom:16}}>{isAr?"روابط":"Navigation"}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {t.navLinks.map(item=>(
                <Link key={item.l} href={item.h} style={{
                  fontSize:13,color:"var(--text-3)",transition:"color .2s",lineHeight:1.5,
                }}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--text-2)")}
                onMouseLeave={e=>(e.currentTarget.style.color="var(--text-3)")}
                >{item.l}</Link>
              ))}
            </div>
          </div>
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
        @media(max-width:600px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}
