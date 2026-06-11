"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FU, FI, SectionHeading, GlassCard, OrbBg, IrisBlob, MouseGlow } from "@/components/DS";

const titles: Record<string,{h1:string,sub:string,badge:string}> = {
  about:   {badge:"من نحن",h1:"مكتب عائلة مُهندَس للديمومة.",sub:"تأسَّست كيوميليت لحل مشكلة محددة: معظم الثروات العقارية تُدار بصورة تفاعلية لا استباقية. نحن هنا لتغيير ذلك."},
  services:{badge:"الخدمات",h1:"كل ما تحتاجه ثروتك العقارية.",sub:"ست خطوط خدمة. منظومة حوكمة موحَّدة. كل خدمة تعمل بالتنسيق مع الأخريات."},
  solutions:{badge:"الحلول والتقنية",h1:"تقنية بمستوى المؤسسات للثروة العقارية.",sub:"ست حلول متكاملة تشكّل البنية التحتية الكاملة لإدارة الثروة العقارية المحكومة."},
  projects:{badge:"مشاريع مختارة",h1:"تفويضات أعادت تعريف معنى الحوكمة.",sub:"ثلاث دراسات حالة من محفظتنا — مُخفاة الهوية بإذن العملاء."},
  contact: {badge:"خاص وسري",h1:"ابدأ محادثة.",sub:"كل مقدمة تُعامَل بسرية تامة. عادةً ما نرد خلال يوم عمل واحد."},
};
const t = titles["about"];

export default function ArPage() {
  return (
    <main className="ar">
      <MouseGlow/>
      <section style={{minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <OrbBg cyan violet/>
        <IrisBlob size={480} top="-15%" right="-8%" opacity={0.28}/>
        <div className="bg-grid" style={{opacity:.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24,display:"flex",justifyContent:"flex-end"}}><span className="pill pill-c"><span className="dot-live"/>{t.badge}</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24,textAlign:"right"}}>{t.h1}</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.85,marginLeft:"auto",textAlign:"right"}}>{t.sub}</motion.p>
          <motion.div {...FU(.24)} style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-end",marginTop:36}}>
            <Link href="/ar/contact" className="btn btn-primary" style={{fontSize:14}}>اطلب مقدمة ←</Link>
            <Link href="/ar" className="btn btn-ghost" style={{fontSize:14}}>الرئيسية</Link>
          </motion.div>
        </div>
      </section>
      <section className="section" style={{position:"relative",overflow:"hidden",background:"var(--bg-alt)"}}>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <SectionHeading eyebrow={t.badge} title={t.h1} center/>
          <motion.p {...FU(.1)} className="t-lg" style={{color:"var(--text-3)",marginTop:16}}>{t.sub}</motion.p>
          <motion.div {...FU(.2)} style={{marginTop:40,display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/ar/contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>اطلب مقدمة ←</Link>
            <Link href="/ar/about" className="btn btn-ghost" style={{fontSize:15}}>من نحن</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
