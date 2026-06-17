"use client";
import {
  ServiceIcon, CapabilityIcon, ProcessIcon,
  GovernanceIcon, PortfolioIcon, AIIcon, CrossBorderIcon, RiskIcon, DigitalIcon,
  DocumentIcon, WealthIcon,
  LocationIcon, EmailIcon, LockIcon, ClockIcon, SuccessStateIcon,
} from "@/components/icons/GlassIcons";
import { ChallengeIcon, SolutionCheckIcon } from "@/components/icons";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FU, FI, FS, FL, SectionHeading, GlassCard, FeatureCard,
  HeroGlass, Divider
} from "@/components/DS";
import {
  ArchitecturalBg, ArchitecturalBgLight, StrataStack, StrataLines,
  GovernancePulse, GlassFacade, VerticalFins, StructuralLattice,
  StrataSculpture, BRAND_BLUE
} from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Logo3D } from "@/components/Logo3D";
import { GlassIcon } from "@/components/GlassIcon";
import { FlowingLines, FloatingParticles, GridPulse, AuroraGlow } from "@/components/ui/PremiumFx";

/* ════════════════════════════════════════════════════════
   HOME DATA
   ════════════════════════════════════════════════════════ */
const HOME_SERVICES = [
  { id:"stewardship", label:"Property Stewardship", icon:"◈", color:"var(--cyan)",
    title:"Professional oversight that preserves value across every cycle.",
    desc:"We manage your real estate portfolio as a unified, governed system — not a collection of fragmented assets. From daily operations to strategic positioning, every decision is made within a documented governance framework.",
    items:["Unified portfolio governance","Quarterly performance reporting","Multi-custodian consolidation","Benchmark attribution","Regulatory compliance","Strategic asset positioning"] },
  { id:"growth", label:"Governed Growth", icon:"⬡", color:"#8A5CFF",
    title:"Disciplined capital deployment within structural guardrails.",
    desc:"Growth without governance is speculation. We design investment mandates, acquisition criteria, and capital deployment frameworks that enable ambitious growth while maintaining structural integrity across market cycles.",
    items:["Investment mandate design","Capital deployment frameworks","Entity structure optimisation","Cross-border holding structures","Succession-proof architecture","Tax-efficient wrapper design"] },
  { id:"advisory", label:"Property Advisory", icon:"◉", color:"#4D8DFF",
    title:"Market intelligence converted into decisive action.",
    desc:"We convert raw market data into structured investment decisions. Our advisory practice covers deal origination, due diligence, valuation, and transaction execution — always governed by the family's long-term mandate.",
    items:["Deal origination & screening","Independent valuation","Due diligence management","Transaction governance","Market intelligence reports","Vendor & counterparty assessment"] },
  { id:"reporting", label:"Wealth Reporting", icon:"⬟", color:"#A855F7",
    title:"Complete visibility across every holding, every quarter.",
    desc:"Principals deserve a clear, accurate picture of their wealth. We produce consolidated reporting that covers performance, attribution, risk exposure, and governance compliance — structured for principals, trustees, and advisors.",
    items:["Consolidated quarterly packs","Performance attribution","Risk exposure mapping","Governance compliance reporting","Trustee-grade documentation","Custom dashboard access"] },
];

const CAPABILITIES = [
  { icon:"🏛️", title:"Governance Architecture", desc:"Entity structures, holding frameworks, and constitutional documents built for permanence.", accent:"#00D4FF" },
  { icon:"📊", title:"Portfolio Intelligence", desc:"Real-time analytics across all holdings — performance, risk, liquidity, and attribution.", accent:"#8A5CFF" },
  { icon:"🔐", title:"Succession Engineering", desc:"Multi-generational ownership structures that carry intent — not just assets — across generations.", accent:"#4D8DFF" },
  { icon:"⚡", title:"AI-Driven Insights", desc:"Machine learning models surfacing anomalies, opportunities, and risk signals before they become events.", accent:"#A855F7" },
  { icon:"🌐", title:"Cross-Border Structures", desc:"Multi-jurisdiction holding frameworks with consolidated reporting and unified governance.", accent:"#FF6EC7" },
  { icon:"🛡️", title:"Risk Management", desc:"Systematic identification, measurement, and mitigation of concentration, liquidity, and market risk.", accent:"#FFB56B" },
];

const TIMELINE = [
  { year:"2019", title:"Foundation", desc:"QMULATE established to govern — not merely manage — real estate wealth across generations." },
  { year:"2020", title:"First Mandate", desc:"Inaugural family office engagement. Multi-custodian consolidation completed within 90 days." },
  { year:"2021", title:"Platform Build", desc:"Proprietary governance platform deployed. Real-time reporting across all asset classes launched." },
  { year:"2023", title:"GCC Expansion", desc:"Expanded advisory practice to UAE and KSA. Regional governance mandates established." },
  { year:"2024", title:"AI Integration", desc:"Machine learning risk engine integrated. Predictive analytics active across portfolio." },
  { year:"2026", title:"Today", desc:"Multiple generational mandates active. Stewardship structures spanning jurisdictions. Platform v7 live.", current:true },
];

const FAQ = [
  { q:"How is QMULATE different from a traditional wealth manager?", a:"We are a governance-first family office, not a product-selling wealth manager. Our mandate is to organise, protect, and transfer wealth — not to generate fee income from product recommendations. We operate fee-only, with no conflicts of interest." },
  { q:"What types of principals do you work with?", a:"We engage with families and principals for whom governance infrastructure is proportionate to their mandate — typically multi-generational real estate wealth requiring structured oversight. Reach out in confidence to discuss whether we are the right fit." },
  { q:"How do you handle multi-jurisdictional structures?", a:"We maintain governance frameworks across KSA, UAE, UK, and key offshore jurisdictions. Each structure is designed for succession clarity, tax efficiency, and operational simplicity — with consolidated reporting in a single view." },
  { q:"What does 'governed growth' mean in practice?", a:"It means every capital deployment decision is made within a pre-approved investment mandate — with documented rationale, risk parameters, and approval governance. Growth happens, but never at the expense of structural integrity." },
];

const PILLARS = [
  { label:"Property Stewardship", icon:"◈", color:"#00D4FF", desc:"Every asset governed by a documented policy framework, not individual discretion." },
  { label:"Governed Growth", icon:"⬡", color:"#8A5CFF", desc:"Structures built to outlast principals — transferring wealth and intent across generations." },
  { label:"Long-Term Preservation", icon:"◉", color:"#4D8DFF", desc:"Real-time analytics across all holdings. No surprises. Full transparency." },
  { label:"Generational Continuity", icon:"⬟", color:"#A855F7", desc:"Succession structures built from day one, not as an afterthought." },
];

/* ════════════════════════════════════════════════════════
   ABOUT DATA
   ════════════════════════════════════════════════════════ */
const PRINCIPLES = [
  { n:"01", title:"Governance over returns", desc:"We don't optimise for yield. We build the structural frameworks that protect and perpetuate capital across market cycles and family generations." },
  { n:"02", title:"Perpetuity over performance", desc:"Every mandate is designed to outlast its principals. We engineer succession structures, constitutional documents, and governance protocols from day one." },
  { n:"03", title:"Transparency over opacity", desc:"Principals receive complete quarterly governance packs, real-time performance data, and unconditional access to every decision rationale." },
  { n:"04", title:"Discipline over discretion", desc:"Every investment decision is made within documented mandate parameters. No personal judgment replaces institutional process." },
];

const LAYERS = [
  { num:"01", name:"Governance Layer", color:"var(--cyan)", desc:"Constitutional documents, entity structures, voting rights, and succession protocols. The permanent framework that governs everything below it." },
  { num:"02", name:"Operations Layer", color:"#8A5CFF", desc:"Day-to-day management of all assets. Vendor governance, regulatory compliance, and facilities oversight — documented and auditable." },
  { num:"03", name:"Intelligence Layer", color:"#4D8DFF", desc:"Performance analytics, risk monitoring, benchmark attribution, and anomaly detection. Real-time visibility across every holding." },
  { num:"04", name:"Advisory Layer", color:"#A855F7", desc:"Market intelligence, deal origination, due diligence management, and transaction governance — always within the mandate framework." },
];

const TEAM = [
  { name:"Faisal Al-Mansouri", role:"Founding Partner", area:"Governance Architecture & Strategy" },
  { name:"Khalid Al-Rashid", role:"Partner, Portfolio Management", area:"Asset Strategy & Performance" },
  { name:"Sara Al-Ghamdi", role:"Director, Operations", area:"Operational Excellence & Compliance" },
  { name:"Ahmed Bin Saeed", role:"Director, Advisory", area:"Transaction Governance & Markets" },
];

/* ════════════════════════════════════════════════════════
   SERVICES DATA
   ════════════════════════════════════════════════════════ */
const SVC_LIST = [
  { id:"stewardship", icon:"◈", label:"Property Stewardship", color:"var(--cyan)",
    headline:"Professional oversight that preserves and compounds value.",
    body:"We manage your real estate portfolio as a unified, governed system — not a collection of fragmented assets. From daily operations to strategic positioning, every decision is made within a documented governance framework that ensures consistency, accountability, and long-term value preservation.",
    deliverables:["Unified portfolio governance framework","Quarterly performance and governance packs","Multi-custodian position consolidation","Benchmark attribution and peer comparison","Regulatory compliance monitoring","Strategic asset positioning reports","Vendor governance and oversight","Capital maintenance planning"] },
  { id:"growth", icon:"⬡", label:"Governed Growth", color:"#8A5CFF",
    headline:"Capital deployment within structural guardrails.",
    body:"Growth without governance is speculation. We design investment mandates, acquisition criteria, and capital deployment frameworks that enable ambitious expansion while maintaining structural integrity. Every investment decision is documented, rationale-driven, and made within pre-approved parameters.",
    deliverables:["Investment mandate design and documentation","Capital deployment framework","Entity and holding structure optimisation","Cross-border structure design","Succession-proof ownership architecture","Tax-efficient wrapper implementation","Board and governance committee design","Annual mandate review process"] },
  { id:"advisory", icon:"◉", label:"Property Advisory", color:"#4D8DFF",
    headline:"Market intelligence converted into decisive action.",
    body:"Our advisory practice converts raw market data into structured investment decisions. We cover deal origination, independent valuation, due diligence management, and transaction governance — always operating within the family's documented mandate framework.",
    deliverables:["Deal origination and pipeline management","Independent valuation and appraisal","Due diligence management and reporting","Transaction governance and documentation","Market intelligence reports","Vendor and counterparty assessment","Exit strategy analysis","Portfolio rebalancing recommendations"] },
  { id:"reporting", icon:"⬟", label:"Wealth Reporting", color:"#A855F7",
    headline:"Complete visibility across every holding, every quarter.",
    body:"Principals deserve a clear, accurate picture of their wealth. We produce consolidated reporting that covers performance, attribution, risk exposure, and governance compliance — structured for principals, trustees, advisors, and regulatory requirements.",
    deliverables:["Consolidated quarterly wealth packs","Performance attribution and analytics","Risk exposure mapping","Governance compliance reporting","Trustee-grade documentation","Custom executive dashboard","Benchmark performance comparison","Annual wealth governance report"] },
  { id:"risk", icon:"🛡️", label:"Risk Management", color:"#FF6EC7",
    headline:"Systematic protection against structural and market risk.",
    body:"Risk in real estate wealth is multidimensional — concentration risk, liquidity risk, succession risk, and market risk all compound in complex ways. We design systematic frameworks that identify, measure, and mitigate risk before it becomes an event.",
    deliverables:["Portfolio concentration analysis","Liquidity stress testing","Succession risk assessment","Market risk monitoring","Insurance governance review","Counterparty risk assessment","Scenario planning and modelling","Risk governance committee facilitation"] },
  { id:"digital", icon:"⚡", label:"Digital Transformation", color:"#FFB56B",
    headline:"Technology that makes governance effortless.",
    body:"We deploy the intelligence infrastructure to make governance automatic, not manual. From real-time analytics to AI-powered risk detection, our technology layer converts data from all sources into actionable, governed insights — available anywhere, any time.",
    deliverables:["Unified data platform deployment","Real-time performance dashboards","AI-powered anomaly detection","Automated compliance monitoring","Document management system","Multi-custodian data integration","Mobile principal dashboard","API integration with external systems"] },
];

/* ════════════════════════════════════════════════════════
   SOLUTIONS DATA
   ════════════════════════════════════════════════════════ */
const SOLUTIONS = [
  {icon:"🏛️",title:"Governance Platform",color:"var(--cyan)",desc:"End-to-end governance infrastructure — constitutional documents, mandate frameworks, entity structures, and succession protocols — deployed as a unified, auditable system.",features:["Constitutional document library","Board governance tools","Succession protocol engine","Mandate tracking dashboard","Audit trail and documentation","Regulatory compliance monitoring"]},
  {icon:"📊",title:"Portfolio Intelligence",color:"#8A5CFF",desc:"Real-time analytics across all holdings — performance, attribution, liquidity, concentration, and risk — unified into a single dashboard that gives principals complete visibility, always.",features:["Real-time performance analytics","Risk concentration mapping","Liquidity position monitoring","Benchmark attribution tools","Custom reporting builder","Multi-custodian aggregation"]},
  {icon:"🤖",title:"AI Risk Engine",color:"#4D8DFF",desc:"Machine learning models that surface anomalies, concentration risks, and market signals before they become governance events. Predictive, not reactive.",features:["Anomaly detection algorithms","Concentration risk signals","Market correlation analysis","Scenario stress testing","Predictive cash flow modelling","Early warning notifications"]},
  {icon:"🌐",title:"Multi-Jurisdiction Manager",color:"#A855F7",desc:"Consolidated governance across all jurisdictions — KSA, UAE, UK, and offshore — with unified reporting, compliance monitoring, and structural oversight in a single view.",features:["Cross-border structure mapping","Jurisdiction-specific compliance","Consolidated reporting","Tax efficiency monitoring","Entity relationship management","Regulatory change alerts"]},
  {icon:"🔄",title:"Asset Lifecycle Manager",color:"#FF6EC7",desc:"Full lifecycle governance from acquisition through development, management, and exit — with documented decision frameworks, performance tracking, and governance checkpoints at each stage.",features:["Acquisition governance checklist","Development milestone tracking","Operations performance dashboards","Exit strategy analytics","Capital event documentation","Historical performance archive"]},
  {icon:"📱",title:"Principal Portal",color:"#FFB56B",desc:"A secure, private portal giving principals real-time access to their complete wealth position — performance, governance, documents, and reporting — from any device, anywhere.",features:["Real-time wealth dashboard","Document secure access","Governance status overview","Custom notification preferences","Mobile-optimised interface","Secure communication channel"]},
];

/* ════════════════════════════════════════════════════════
   PROJECTS DATA
   ════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "001",
    title: "Multi-Generational Succession Framework",
    type: "Succession Engineering",
    status: "Active",
    year: "2024",
    duration: "18 months",
    accentColor: "#00D4FF",
    brief: "A third-generation family required a complete succession framework covering real estate assets across multiple jurisdictions — built for permanence, not just compliance.",
    challenge: "The family had accumulated assets across KSA, UAE, London, and Jersey over four decades with no unified governance structure, creating succession ambiguity and operational fragmentation.",
    solution: "We designed a four-layer governance architecture with structured entities, constitutional family documents, and a long-term succession roadmap engineered to outlast its principals.",
    pillars: [
      { label: "Governance Architecture", desc: "Constitutional documents, entity structuring, and voting rights frameworks designed for multi-generational clarity." },
      { label: "Jurisdiction Alignment", desc: "Unified governance visibility across KSA, UAE, London, and Jersey with consolidated reporting." },
      { label: "Succession Protocol", desc: "Third-generation succession framework with documented transfer mechanisms and family governance councils." },
      { label: "Long-Term Stewardship", desc: "Perpetual mandate design with succession-proof structures built to outlast its principals." },
    ],
  },
];

/* ════════════════════════════════════════════════════════
   CONTACT DATA
   ════════════════════════════════════════════════════════ */
const REASONS = ["Governance Architecture","Portfolio Intelligence","Succession Planning","Wealth Reporting","Risk Management","General Enquiry"];

export default function Home() {
  /* ── State ── */
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number|null>(null);
  const [activeSvc, setActiveSvc] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [form, setForm] = useState({ name:"",email:"",entity:"",reason:"",message:"" });
  const [focus, setFocus] = useState<string|null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  /* ── Hero parallax ── */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroOpacity = useTransform(scrollYProgress,[0,.6],[1,0]);
  const heroY = useTransform(scrollYProgress,[0,1],["0%","20%"]);

  const project = PROJECTS[activeProject];

  const inputStyle = (field:string):React.CSSProperties => ({
    width:"100%",background:"var(--g1)",
    border:`1px solid ${focus===field?"rgba(0,212,255,.5)":"rgba(255,255,255,.08)"}`,
    borderRadius:12,padding:"13px 16px",fontSize:14,color:"var(--text-1)",
    outline:"none",fontFamily:"'Inter',sans-serif",
    transition:"border-color .2s, box-shadow .2s",
    boxShadow:focus===field?"0 0 0 3px rgba(0,212,255,.12)":"none",
  });

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    setSending(true);
    await new Promise(r=>setTimeout(r,200));
    setSending(false);
    setSent(true);
  };

  return (
    <main className="hero-page" style={{ position: 'relative' }}>
      <PageBackground variant="home" />

      {/* ════════════════════════════════════════════════════════
          HOME — Hero
          ════════════════════════════════════════════════════════ */}
      <section id="home" ref={heroRef} style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)"}}>
        <FlowingLines />
        <motion.div style={{position:"absolute",inset:0,y:heroY}} className="will-change-transform">
          <ArchitecturalBg variant="mixed"/>
        </motion.div>

        <motion.div style={{position:"relative",zIndex:10,width:"100%",maxWidth:1240,padding:"0 clamp(20px,4vw,48px)",opacity:heroOpacity}}>
          <HeroGlass style={{borderRadius:36,padding:"clamp(44px,6vw,80px)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:"clamp(40px,5vw,80px)",alignItems:"center"}} className="hero-grid">
              <div>
                <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.7}} style={{marginBottom:28}}>
                  <span className="pill pill-c"><span className="dot-live"/>Real Estate Wealth Platform · Riyadh</span>
                </motion.div>

                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7,duration:.6}} style={{marginBottom:24}}>
                  <img src="/Logo.png" alt="QMULATE" style={{width:'150px',height:'auto',objectFit:'contain',filter:'drop-shadow(0 0 20px rgba(91,124,250,0.6)) drop-shadow(0 0 40px rgba(91,124,250,0.25))'}}/>
                </motion.div>

                <motion.h1 initial={{opacity:0,y:30,scale:.95}} animate={{opacity:1,y:0,scale:1}} transition={{delay:.8,duration:1.1,ease:[.25,.46,.45,.94]}} className="t-d gt-w" style={{marginBottom:20,fontSize:"clamp(44px,6vw,88px)"}}>
                  Wealth,<br/><span className="gt-c">structured</span><br/>to outlast<br/><span style={{color:"rgba(255,255,255,.25)"}}>its makers.</span>
                </motion.h1>

                <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:.8}} className="t-xl" style={{color:"var(--text-3)",maxWidth:480,marginBottom:12,lineHeight:1.75}}>
                  We organise real estate wealth — property management, brokerage, advisory, and facilities — into one governed, perpetual system.
                </motion.p>

                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.05,duration:.7}} style={{fontFamily:"'IBM Plex Sans Arabic',sans-serif",fontSize:14,color:"rgba(255,255,255,.2)",marginBottom:44,direction:"rtl"}}>
                  ثروة مبنية لتدوم بعد صانعيها.
                </motion.p>

                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.15,duration:.7}} style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:52}}>
                  <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 34px"}}>Request an introduction →</Link>
                  <Link href="#about" className="btn btn-ghost" style={{fontSize:15,padding:"14px 30px"}}>Our approach</Link>
                </motion.div>

                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3,duration:.8}} style={{display:"flex",gap:32,paddingTop:28,borderTop:"1px solid var(--glass-border)"}} className="hero-trust">
                  {[{label:"Property Stewardship",icon:"◈",color:"#00D4FF"},{label:"Governed Growth",icon:"⬡",color:"#8A5CFF"},{label:"Generational Continuity",icon:"◉",color:"#4D8DFF"}].map(item=>(
                    <div key={item.label}>
                      <div style={{fontSize:"clamp(16px,1.5vw,20px)",fontWeight:800,color:item.color,letterSpacing:"-0.02em",filter:`drop-shadow(0 0 12px ${item.color}66)`,marginBottom:3}}>{item.icon}</div>
                      <div className="t-xs" style={{color:"var(--text-4)"}}>{item.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:16}}>
                <motion.div initial={{opacity:0,scale:.9,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{delay:1.0,duration:1.0,ease:[.34,1.56,.64,1]}}>
                  <div style={{position:'relative',background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',minHeight:'460px'}}>
                    <Logo3D size={250} />
                  </div>
                </motion.div>
              </div>
            </div>
          </HeroGlass>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}} style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,zIndex:10}}>
          <div className="t-xs" style={{color:"rgba(255,255,255,.2)"}}>SCROLL TO EXPLORE</div>
          <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:2}} style={{width:1,height:48,background:`linear-gradient(${BRAND_BLUE},transparent)`}}/>
        </motion.div>
      </section>

      {/* HOME — Governance Pillars */}
      <section style={{background:"var(--bg-alt)",backdropFilter:"blur(40px)",borderTop:"1px solid var(--glass-border)",borderBottom:"1px solid var(--glass-border)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins" style={{opacity:0.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-4" style={{padding:"clamp(40px,5vw,64px) 0"}}>
            {PILLARS.map((p,i)=>(
              <motion.div key={p.label} {...FU(Math.min(i*0.04, 0.1))} style={{textAlign:"center",padding:"clamp(24px,3vw,40px) 16px"}}>
                <div style={{marginBottom:16,display:"flex",justifyContent:"center"}}><StrataLines count={4} width={72} opacity={0.25} color={p.color}/></div>
                <div style={{marginBottom:10,display:"flex",justifyContent:"center"}}>
                  <GlassIcon size={52} color={p.color==="#00D4FF"||p.color==="var(--cyan)"?"cyan":"blue"}>
                    <span style={{color:p.color,filter:`drop-shadow(0 0 10px ${p.color}88)`}}>{p.icon}</span>
                  </GlassIcon>
                </div>
                <div style={{fontSize:14,color:"var(--text-2)",fontWeight:600,marginBottom:6}}>{p.label}</div>
                <div className="t-xs" style={{color:"var(--text-4)",textTransform:"none",letterSpacing:0,fontSize:12,fontFamily:"inherit"}}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOME — What We Do */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-left"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center"}} className="grid-2">
            <div>
              <SectionHeading eyebrow="The Platform" title={<>One system for all<br/>your real estate wealth.</>} subtitle="We don't manage investments. We organise wealth. Property management, brokerage, advisory, and facilities — unified into a single, governed, perpetual system."/>
              <motion.div {...FU(.2)} style={{marginTop:36,display:"flex",flexDirection:"column",gap:14}}>
                {[["◈","Governance First","Every asset governed by a documented policy framework, not individual discretion."],["⬡","Perpetual Design","Structures built to outlast principals — transferring wealth and intent across generations."],["◉","Intelligence Layer","Real-time analytics across all holdings. No surprises. Full transparency."]].map(([icon,title,desc])=>(
                  <div key={String(title)} style={{display:"flex",gap:16,padding:"18px 20px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:16}}>
                    <GlassIcon size={40} color="blue">{icon}</GlassIcon>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{title}</div>
                      <div className="t-sm" style={{color:"var(--text-3)"}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div {...FU(.32)} style={{marginTop:32}}>
                <Link href="#about" className="btn btn-ghost" style={{gap:8}}>Explore our approach →</Link>
              </motion.div>
            </div>
            <motion.div {...FS(.12)} style={{position:"relative"}}>
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:12}}>
                {[{label:"Governance Layer",sub:"Constitutional documents · Voting rights · Succession protocols",color:"var(--cyan)",h:72},{label:"Operations Layer",sub:"Day-to-day management · Vendor governance · Compliance monitoring",color:"#8A5CFF",h:72},{label:"Intelligence Layer",sub:"Performance analytics · Risk monitoring · Benchmark attribution",color:"#4D8DFF",h:72},{label:"Advisory Layer",sub:"Deal sourcing · Market intelligence · Transaction governance",color:"#A855F7",h:72}].map((layer,i)=>(
                  <motion.div key={layer.label} {...FU(.12+i*.08)}>
                    <GlassCard style={{padding:"20px 24px",borderLeft:`2px solid ${layer.color}44`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{layer.label}</div>
                          <div className="t-xs" style={{color:"var(--text-3)",textTransform:"none",letterSpacing:0,fontSize:12}}>{layer.sub}</div>
                        </div>
                        <div style={{width:12,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,flexShrink:0}}/>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
                <div style={{position:"absolute",left:-24,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,#00D4FF,#8A5CFF,#4D8DFF,#A855F7,transparent)"}}/>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOME — Services Tabs */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Services" title="Everything your wealth requires." center subtitle="From daily operations to generational succession — governed by one integrated system."/>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap",justifyContent:"center"}}>
            {HOME_SERVICES.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveService(i)} whileHover={{scale:1.03}} whileTap={{scale:.98}} style={{padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",background:activeService===i?s.color:"rgba(255,255,255,.04)",color:activeService===i?"#020408":"var(--text-3)",border:`1px solid ${activeService===i?s.color:"rgba(255,255,255,.08)"}`,transition:"all .25s"}}>
                <ServiceIcon id={s.id} size="xs"/><span style={{marginLeft:4}}>{s.label}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeService} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.4}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(32px,4vw,64px)",alignItems:"start"}} className="grid-2">
                <div>
                  <div style={{marginBottom:16}}><ServiceIcon id={HOME_SERVICES[activeService].id} size="lg"/></div>
                  <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:16,lineHeight:1.25}}>{HOME_SERVICES[activeService].title}</h3>
                  <p className="t-lg" style={{color:"var(--text-3)",marginBottom:32,lineHeight:1.8}}>{HOME_SERVICES[activeService].desc}</p>
                  <Link href="#services" className="btn btn-primary">Explore {HOME_SERVICES[activeService].label} →</Link>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {HOME_SERVICES[activeService].items.map((item,i)=>(
                    <motion.div key={item} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:i*.06}}>
                      <div style={{display:"flex",gap:12,padding:"14px 18px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:12,alignItems:"center"}}>
                        <div style={{width:10,height:3,borderRadius:1,background:HOME_SERVICES[activeService].color,flexShrink:0,boxShadow:`0 0 8px ${HOME_SERVICES[activeService].color}`}}/>
                        <span style={{fontSize:13,color:"var(--text-2)"}}>{item}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* HOME — Capabilities */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Capabilities" title="What we can do for you." center subtitle="Six core capabilities that combine to deliver institutional-grade wealth governance."/>
          </div>
          <div className="grid-3">
            {CAPABILITIES.map((c,i)=>(
              <FeatureCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} accent={c.accent} index={i}/>
            ))}
          </div>
        </div>
      </section>

      {/* HOME — Philosophy */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <FloatingParticles count={25} />
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center"}} className="grid-2">
            <motion.div {...FL()}>
              <SectionHeading eyebrow="Philosophy" title={<>We govern. <span className="gt-c">We don&apos;t speculate.</span></>} subtitle="Most wealth managers are product sellers. We are governance engineers. We build structures, not portfolios. We protect mandates, not just returns."/>
              <motion.div {...FU(.2)} style={{display:"flex",flexDirection:"column",gap:20,marginTop:36}}>
                {[{n:"01",title:"Governance over returns",desc:"We don't chase yield. We build the structures that protect and perpetuate capital — so returns are a consequence of discipline, not luck."},{n:"02",title:"Perpetuity over performance",desc:"Every mandate is designed to outlast its principals. Succession structures, constitutional documents, and governance protocols are built in from day one."},{n:"03",title:"Transparency over opacity",desc:"Principals deserve complete visibility. We deliver quarterly governance packs, real-time performance data, and unconditional access to every decision rationale."}].map((p,i)=>(
                  <motion.div key={p.n} {...FU(.08+i*.1)} style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:"rgba(0,212,255,.09)",border:"1px solid rgba(0,212,255,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:11,color:"var(--cyan)",fontWeight:700}}>{p.n}</div>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>{p.title}</div>
                      <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div {...FS(.15)} style={{position:"relative"}}>
              <GlassCard style={{padding:"clamp(32px,4vw,52px)",textAlign:"center"}}>
                <div style={{marginBottom:28,display:"flex",justifyContent:"center"}}>
                  <StrataSculpture size={280} opacity={0.28} style={{position:"relative"}}/>
                </div>
                <blockquote style={{fontSize:"clamp(18px,2.2vw,26px)",fontWeight:700,color:"var(--text-1)",lineHeight:1.45,marginBottom:16,fontStyle:"italic"}}>
                  &ldquo;Wealth, structured to outlast its makers.&rdquo;
                </blockquote>
                <div className="t-xs" style={{color:"var(--text-4)",marginBottom:32}}>QMULATE FOUNDING PRINCIPLE · 2019</div>
                <div style={{display:"flex",justifyContent:"center",gap:24,paddingTop:24,borderTop:"1px solid var(--glass-border)"}}>
                  {[{label:"Structural Perpetuity",sub:"Built to outlast"},{label:"Governed Stewardship",sub:"Every mandate"}].map(item=>(
                    <div key={item.label} style={{textAlign:"center"}}>
                      <GovernancePulse width={100} height={24} opacity={0.25} color={BRAND_BLUE} style={{margin:"0 auto 8px"}}/>
                      <div style={{fontSize:12,fontWeight:700,color:"var(--text-2)",marginBottom:2}}>{item.label}</div>
                      <div className="t-xs" style={{color:"var(--text-4)",marginTop:2}}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOME — Timeline */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="pulse"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Our Journey" title="Seven years building the standard." center/>
          </div>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`linear-gradient(to bottom,transparent,${BRAND_BLUE}44,rgba(138,92,255,.3),transparent)`,transform:"translateX(-50%)"}} className="timeline-line"/>
            <div style={{display:"flex",flexDirection:"column",gap:32}}>
              {TIMELINE.map((item,i)=>(
                <motion.div key={item.year} {...FU(Math.min(i*0.04, 0.1))} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,position:"relative"}} className="timeline-row">
                  {i%2===0 ? (
                    <>
                      <div style={{textAlign:"right",paddingRight:40,paddingTop:8}}>
                        <div style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,color:item.current?BRAND_BLUE:"var(--text-5)",letterSpacing:"-0.04em",fontVariantNumeric:"tabular-nums",marginBottom:8,filter:item.current?`drop-shadow(0 0 20px ${BRAND_BLUE}77)`:undefined}}>{item.year}</div>
                        <GlassCard style={{padding:"20px 24px",display:"inline-block",textAlign:"left"}}>
                          <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>{item.title}</div>
                          <p className="t-sm" style={{color:"var(--text-3)"}}>{item.desc}</p>
                        </GlassCard>
                      </div>
                      <div/>
                    </>
                  ) : (
                    <>
                      <div/>
                      <div style={{paddingLeft:40,paddingTop:8}}>
                        <div style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,color:item.current?BRAND_BLUE:"var(--text-5)",letterSpacing:"-0.04em",fontVariantNumeric:"tabular-nums",marginBottom:8,filter:item.current?`drop-shadow(0 0 20px ${BRAND_BLUE}77)`:undefined}}>{item.year}</div>
                        <GlassCard style={{padding:"20px 24px"}}>
                          <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>{item.title}</div>
                          <p className="t-sm" style={{color:"var(--text-3)"}}>{item.desc}</p>
                        </GlassCard>
                      </div>
                    </>
                  )}
                  <div style={{position:"absolute",left:"50%",top:12,transform:"translateX(-50%)",width:item.current?28:18,height:item.current?4:3,borderRadius:2,background:item.current?BRAND_BLUE:"rgba(255,255,255,.15)",boxShadow:item.current?`0 0 16px ${BRAND_BLUE}88`:undefined,zIndex:2}}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOME — FAQ */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:"clamp(48px,6vw,96px)",alignItems:"start"}} className="grid-2">
            <div style={{position:"sticky",top:80}}>
              <SectionHeading eyebrow="FAQ" title="Questions principals ask us." subtitle="If you have a question not answered here, we're happy to speak in confidence."/>
              <motion.div {...FU(.2)} style={{marginTop:32}}>
                <Link href="#contact" className="btn btn-ghost">Speak to us in confidence →</Link>
              </motion.div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {FAQ.map((item,i)=>(
                <motion.div key={i} {...FU(Math.min(i*0.04, 0.1))}>
                  <GlassCard hover={false} style={{overflow:"hidden"}}>
                    <button onClick={()=>setActiveFaq(activeFaq===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,padding:"20px 24px",textAlign:"left",cursor:"pointer"}}>
                      <div style={{fontSize:14,fontWeight:600,color:"var(--text-1)",lineHeight:1.5}}>{item.q}</div>
                      <motion.div animate={{rotate:activeFaq===i?45:0}} transition={{duration:.25}} style={{flexShrink:0,width:22,height:22,borderRadius:4,background:"var(--g2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"var(--text-3)"}}>+</motion.div>
                    </button>
                    <AnimatePresence>
                      {activeFaq===i && (
                        <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3}}>
                          <div style={{padding:"0 24px 20px",borderTop:"1px solid var(--glass-border)",paddingTop:16}}>
                            <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.8}}>{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOME — CTA */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}><span className="pill pill-v" style={{marginBottom:28}}><span className="dot-live" style={{background:"#8A5CFF",boxShadow:"0 0 8px #8A5CFF"}}/>PRIVATE FAMILY OFFICE · RIYADH</span></motion.div>
          <motion.h2 {...FU(.08)} className="t-d gt-a" style={{marginBottom:20,fontSize:"clamp(44px,7vw,96px)"}}>Built to govern.<br/>Designed to last.</motion.h2>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:540,margin:"0 auto 44px",lineHeight:1.75}}>If you are ready to move from managing assets to governing wealth, we would be glad to speak with you in confidence.</motion.p>
          <motion.div {...FU(.22)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary glow-border" style={{fontSize:16,padding:"16px 40px"}}>Request an introduction →</Link>
            <Link href="#services" className="btn btn-ghost" style={{fontSize:16,padding:"16px 36px"}}>Explore our services</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ABOUT
          ════════════════════════════════════════════════════════ */}
      <section id="about" style={{scrollMarginTop:"64px",minHeight:"72vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}><span className="pill pill-c"><span className="dot-live"/>About QMULATE</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:780,marginBottom:24}}>A family office engineered<br/>for permanence.</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>QMULATE was founded to solve a specific problem: most real estate wealth is managed reactively, not governed proactively. We exist to change that.</motion.p>
        </div>
      </section>

      {/* ABOUT — Mission & Vision */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-2" style={{gap:"clamp(24px,3vw,40px)"}}>
            {[{label:"MISSION",color:"var(--cyan)",title:"We govern wealth. We don't manage products.",body:"QMULATE organises real estate wealth — property management, brokerage, advisory, and facilities — into one governed system. Every mandate is structured to preserve, grow, and transfer wealth across generations without loss of intent."},{label:"VISION",color:"#8A5CFF",title:"A world where wealth outlasts its makers.",body:"We believe every family that builds significant real estate wealth deserves a governance framework worthy of that achievement. Our vision is to become the standard of institutional-grade real estate wealth governance in the GCC and beyond."}].map((item,i)=>(
              <motion.div key={item.label} {...FU(i*0.05)}>
                <GlassCard style={{padding:"clamp(32px,4vw,52px)",height:"100%"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
                    <span className="t-xs" style={{color:item.color}}>{item.label}</span>
                    <div style={{flex:1,height:1,background:`linear-gradient(90deg,${item.color}44,transparent)`}}/>
                  </div>
                  <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:16,lineHeight:1.3}}>{item.title}</h3>
                  <p className="t-md" style={{color:"var(--text-3)",lineHeight:1.85}}>{item.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — Founding Principle */}
      <section style={{padding:"clamp(60px,8vw,100px) 0",position:"relative",overflow:"hidden",background:"var(--bg-alt)"}}>
        <ArchitecturalBg variant="strata-left"/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}><span className="pill pill-w" style={{marginBottom:32}}>Founding Principle</span></motion.div>
          <motion.blockquote {...FU(.08)} style={{fontSize:"clamp(24px,3.5vw,52px)",fontWeight:800,color:"var(--text-1)",lineHeight:1.2,maxWidth:900,margin:"0 auto 32px",letterSpacing:"-0.035em"}}>
            &ldquo;Wealth, structured to <span className="gt-c">outlast its makers.</span>&rdquo;
          </motion.blockquote>
          <motion.p {...FU(.16)} className="t-xs" style={{color:"var(--text-4)"}}>QMULATE · FOUNDED 2019 · RIYADH, SAUDI ARABIA</motion.p>
        </div>
      </section>

      {/* ABOUT — Governance Principles */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"start"}} className="grid-2">
            <div>
              <SectionHeading eyebrow="Our Principles" title={<>The beliefs we govern by.</>} subtitle="These four principles inform every structure we design, every decision we make, and every mandate we accept."/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {PRINCIPLES.map((p,i)=>(
                <motion.div key={p.n} {...FU(.06+i*.09)}>
                  <GlassCard style={{padding:"24px 28px"}}>
                    <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                      <div style={{width:34,height:34,borderRadius:10,background:"rgba(0,212,255,.08)",border:"1px solid rgba(0,212,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:11,color:"var(--cyan)",fontWeight:700,flexShrink:0}}>{p.n}</div>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:6}}>{p.title}</div>
                        <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{p.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT — Platform Architecture */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Platform" title="Four layers. One unified system." center subtitle="Our governance architecture organises wealth into four interlocking layers — each dependent on the one above it."/>
          </div>
          <div style={{position:"relative",maxWidth:800,margin:"0 auto"}}>
            <div style={{position:"absolute",left:-1,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,#00D4FF,#8A5CFF,#4D8DFF,#A855F7,transparent)"}}/>
            <div style={{display:"flex",flexDirection:"column",gap:16,paddingLeft:40}}>
              {LAYERS.map((layer,i)=>(
                <motion.div key={layer.num} {...FU(.08+i*.1)}>
                  <GlassCard style={{padding:"28px 32px",borderLeft:`2px solid ${layer.color}44`}}>
                    <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                      <div>
                        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                          <span style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:11,color:layer.color,fontWeight:700}}>{layer.num}</span>
                          <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-1)"}}>{layer.name}</h3>
                          <div style={{width:12,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,marginLeft:"auto"}}/>
                        </div>
                        <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{layer.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                  <div style={{position:"absolute",left:-8,width:16,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 10px ${layer.color}`,top:"50%",transform:"translateY(-50%)"}}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT — Governance Standards */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="pulse"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Track Record" title="Seven years building the standard." center subtitle="A governance platform built through practice — not theory."/>
          </div>
          <div className="grid-4">
            {[{label:"Property Stewardship",desc:"Every asset governed by policy framework",icon:"◈",color:"#00D4FF"},{label:"Long-Term Preservation",desc:"Structures built for generational continuity",icon:"⬡",color:"#8A5CFF"},{label:"Governed Growth",desc:"Capital deployed within structural guardrails",icon:"◉",color:"#4D8DFF"},{label:"Generational Continuity",desc:"Succession frameworks active across mandates",icon:"⬟",color:"#A855F7"}].map((p,i)=>(
              <motion.div key={p.label} {...FU(Math.min(i*0.04, 0.1))}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center"}}>
                  <div style={{marginBottom:16,display:"flex",justifyContent:"center"}}><StrataLines count={3} width={60} opacity={0.22} color={p.color}/></div>
                  <div style={{marginBottom:10,display:"flex",justifyContent:"center"}}>
                    <GlassIcon size={48} color={p.color==="#00D4FF"?"cyan":"blue"}>
                      <span style={{color:p.color,filter:`drop-shadow(0 0 10px ${p.color}88)`}}>{p.icon}</span>
                    </GlassIcon>
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:8}}>{p.label}</div>
                  <div className="t-xs" style={{color:"var(--text-4)",textTransform:"none",letterSpacing:0,fontSize:12,fontFamily:"inherit"}}>{p.desc}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — Leadership */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Leadership" title="The team behind the platform." center/>
          </div>
          <div className="grid-4">
            {TEAM.map((member,i)=>(
              <motion.div key={member.name} {...FU(Math.min(i*0.04, 0.1))}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center"}}>
                  <div style={{width:72,height:72,borderRadius:14,margin:"0 auto 20px",background:"linear-gradient(135deg,rgba(0,212,255,.10),rgba(138,92,255,.10))",border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:"0.02em"}}>
                    {member.name.split(" ").map((n: string)=>n[0]).join("")}
                  </div>
                  <div style={{fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{member.name}</div>
                  <div style={{fontSize:13,color:"var(--cyan)",marginBottom:8}}>{member.role}</div>
                  <div className="t-xs" style={{color:"var(--text-4)",textTransform:"none",letterSpacing:0,fontSize:12}}>{member.area}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — CTA */}
      <section className="section-sm" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>Ready to begin a conversation?</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>All introductions are private and confidential.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>Request an introduction →</Link>
            <Link href="#services" className="btn btn-ghost" style={{fontSize:15,padding:"14px 32px"}}>View our services</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVICES
          ════════════════════════════════════════════════════════ */}
      <section id="services" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}><span className="pill pill-c"><span className="dot-live"/>Services</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>Everything your real estate wealth requires.</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>Six service lines. One integrated governance system. Every service works together — because wealth governance is not a collection of products.</motion.p>
        </div>
      </section>

      {/* SERVICES — Tabs */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <FloatingParticles count={20} />
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",gap:8,marginBottom:48,flexWrap:"wrap"}}>
            {SVC_LIST.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveSvc(i)} whileHover={{scale:1.03}} whileTap={{scale:.97}} style={{padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",background:activeSvc===i?s.color:"rgba(255,255,255,.04)",color:activeSvc===i?"#020408":"var(--text-3)",border:`1px solid ${activeSvc===i?s.color:"rgba(255,255,255,.08)"}`,transition:"all .25s",display:"flex",alignItems:"center",gap:6}}>
                <ServiceIcon id={s.id} size="xs"/><span style={{marginLeft:4}}>{s.label}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeSvc} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.4}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(40px,5vw,80px)",alignItems:"start"}} className="grid-2">
                <div>
                  <div style={{marginBottom:20}}><ServiceIcon id={SVC_LIST[activeSvc].id} size="xl"/></div>
                  <h2 className="t-h2" style={{color:"var(--text-1)",marginBottom:20,lineHeight:1.2}}>{SVC_LIST[activeSvc].headline}</h2>
                  <p className="t-lg" style={{color:"var(--text-3)",marginBottom:36,lineHeight:1.85}}>{SVC_LIST[activeSvc].body}</p>
                  <Link href="#contact" className="btn btn-primary" style={{fontSize:14}}>Discuss this service →</Link>
                </div>
                <GlassCard style={{padding:"clamp(24px,3vw,40px)"}}>
                  <div className="t-xs" style={{color:"var(--text-4)",marginBottom:20}}>SERVICE DELIVERABLES</div>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {SVC_LIST[activeSvc].deliverables.map((item,i)=>(
                      <motion.div key={item} initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:i*.04}}>
                        <div style={{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:"1px solid var(--glass-border)"}}>
                          <div style={{width:10,height:3,borderRadius:1,background:SVC_LIST[activeSvc].color,flexShrink:0,boxShadow:`0 0 6px ${SVC_LIST[activeSvc].color}`}}/>
                          <span style={{fontSize:13,color:"var(--text-2)"}}>{item}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SERVICES — How We Work */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Our Process" title="How we onboard every mandate." center subtitle="Every new mandate follows the same disciplined onboarding process — regardless of size."/>
          </div>
          <div className="grid-4">
            {[{n:"01",icon:"🔍",title:"Discovery",desc:"We conduct a comprehensive diagnostic of existing structures, assets, governance gaps, and family mandate.",accent:"#00D4FF"},{n:"02",icon:"🏗️",title:"Architecture",desc:"We design the complete governance architecture — entity structures, mandate documents, and reporting frameworks.",accent:"#8A5CFF"},{n:"03",icon:"⚡",title:"Implementation",desc:"We deploy the governance infrastructure — systems, processes, and documentation — within a defined timeline.",accent:"#4D8DFF"},{n:"04",icon:"♾️",title:"Governance",desc:"We operate the mandate on an ongoing basis — reporting, advisory, and continuous governance improvement.",accent:"#A855F7"}].map((step,i)=>(
              <motion.div key={step.n} {...FU(Math.min(i*0.04, 0.1))}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center",height:"100%"}}>
                  <div style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:11,color:step.accent,marginBottom:16}}>{step.n}</div>
                  <div style={{marginBottom:16}}><ProcessIcon step={i} size="lg"/></div>
                  <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-1)",marginBottom:10}}>{step.title}</h3>
                  <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — CTA */}
      <section className="section-sm" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>Ready to discuss your mandate?</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>All conversations are private and confidential.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>Request an introduction →</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SOLUTIONS
          ════════════════════════════════════════════════════════ */}
      <section id="solutions" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}><span className="pill pill-c"><span className="dot-live"/>Solutions & Technology</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>Institutional-grade technology for real estate wealth.</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>Six integrated solutions that together form the complete infrastructure for governed real estate wealth management.</motion.p>
        </div>
      </section>

      {/* SOLUTIONS — Grid */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-3">
            {SOLUTIONS.map((s,i)=>(
              <motion.div key={s.title} {...FU(Math.min(i*0.04, 0.1))}>
                <GlassCard style={{padding:"clamp(24px,3vw,40px)",height:"100%"}}>
                  <div style={{marginBottom:20}}>
                    {i===0&&<GovernanceIcon size="lg" animated={false}/>}
                    {i===1&&<PortfolioIcon size="lg" animated={false}/>}
                    {i===2&&<AIIcon size="lg" animated={false}/>}
                    {i===3&&<CrossBorderIcon size="lg" animated={false}/>}
                    {i===4&&<RiskIcon size="lg" animated={false}/>}
                    {i===5&&<DigitalIcon size="lg" animated={false}/>}
                  </div>
                  <h3 style={{fontSize:18,fontWeight:700,color:"var(--text-1)",marginBottom:10,lineHeight:1.3}}>{s.title}</h3>
                  <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75,marginBottom:24}}>{s.desc}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {s.features.map(f=>(
                      <div key={f} style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{width:8,height:2,borderRadius:1,background:s.color,flexShrink:0,boxShadow:`0 0 5px ${s.color}`}}/>
                        <span style={{fontSize:12,color:"var(--text-3)"}}>{f}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS — Architecture */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="Architecture" title="How the platform is built." center subtitle="Every solution is an integrated module — not a standalone product. They share data, governance protocols, and reporting infrastructure."/>
          </div>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            {[{label:"Principal Portal",color:"#FFB56B",sub:"Real-time access layer for principals and trustees"},{label:"Intelligence & Analytics Layer",color:"#A855F7",sub:"Performance · Risk · Attribution · AI Engine"},{label:"Governance & Operations Layer",color:"#4D8DFF",sub:"Documents · Mandates · Compliance · Lifecycle"},{label:"Data Integration Layer",color:"#8A5CFF",sub:"Custodians · Banks · Registries · Market Data"},{label:"Asset & Entity Foundation",color:"var(--cyan)",sub:"All properties · Entities · Holdings · Structures"}].map((layer,i)=>(
              <motion.div key={layer.label} {...FU(.08+i*.1)} style={{marginBottom:8}}>
                <div style={{padding:"clamp(16px,2vw,24px) clamp(20px,3vw,36px)",background:`linear-gradient(135deg,${layer.color}0A,${layer.color}04)`,border:`1px solid ${layer.color}30`,borderRadius:16,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .3s"}}>
                  <div style={{fontWeight:700,color:"var(--text-1)",fontSize:"clamp(13px,1.5vw,16px)"}}>{layer.label}</div>
                  <div style={{fontSize:12,color:"var(--text-3)",textAlign:"right",maxWidth:360}}>{layer.sub}</div>
                  <div style={{width:14,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 10px ${layer.color}`,flexShrink:0}}/>
                </div>
                {i<4&&<div style={{width:1,height:16,background:layer.color,margin:"0 auto",opacity:.4}}/>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS — CTA */}
      <section className="section-sm" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="strata-right"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>See the platform in action.</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>We offer a private demonstration for qualified principals.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>Request a demonstration →</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PROJECTS
          ════════════════════════════════════════════════════════ */}
      <section id="projects" style={{scrollMarginTop:"64px",minHeight:"60vh",position:"relative",display:"flex",alignItems:"center",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)"}}>
        <GridPulse />
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI(0.05)} style={{marginBottom:20}}>
            <span className="pill pill-c">
              <span style={{display:"inline-block",width:10,height:3,borderRadius:1,background:BRAND_BLUE,marginRight:8,verticalAlign:"middle"}}/>
              Case Studies · Institutional Mandates
            </span>
          </motion.div>
          <motion.h1 {...FU(0.1)} className="t-d gt-w" style={{marginBottom:20,maxWidth:860,fontSize:"clamp(44px,6vw,88px)"}}>
            Mandates that<br/><span className="gt-c">redefined governance.</span>
          </motion.h1>
          <motion.p {...FU(0.1)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.75,marginBottom:40}}>
            Each engagement is a structured governance system — designed for permanence, not just performance.
          </motion.p>
          <motion.div {...FS(0.1)} style={{display:"flex",gap:32,alignItems:"flex-end",padding:"28px 32px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:20,backdropFilter:"blur(20px)",maxWidth:680,overflow:"hidden",position:"relative"}}>
            <StrataLines count={6} width={120} opacity={0.18} color={BRAND_BLUE}/>
            <div style={{flex:1}}><GovernancePulse width={320} height={48} opacity={0.22} color={BRAND_BLUE}/></div>
            <VerticalFins count={8} height={60} opacity={0.12} style={{flexShrink:0}}/>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS — Selector + Content */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FU(0)} style={{display:"flex",gap:12,marginBottom:56,flexWrap:"wrap"}}>
            {PROJECTS.map((p,i)=>(
              <motion.button key={p.id} onClick={()=>setActiveProject(i)} whileHover={{scale:1.03}} whileTap={{scale:0.98}} style={{padding:"12px 28px",borderRadius:100,fontSize:13,fontWeight:600,cursor:"pointer",background:activeProject===i?p.accentColor:"rgba(255,255,255,.04)",color:activeProject===i?"#020408":"var(--text-3)",border:`1px solid ${activeProject===i?p.accentColor:"rgba(255,255,255,.08)"}`,transition:"all .25s"}}>
                <span style={{fontFamily:"var(--font-geist-mono,'Courier New'),monospace",fontSize:10,opacity:0.7,marginRight:10}}>{p.id}</span>
                {p.type}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={activeProject} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-24}} transition={{duration:0.55,ease:[0.25,0.46,0.45,0.94]}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(32px,4vw,64px)",marginBottom:40}} className="grid-2">
                <div>
                  <div style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap"}}>
                    <span className="pill pill-c">{project.type}</span>
                    <span style={{padding:"4px 14px",borderRadius:100,fontSize:11,fontWeight:600,background:`${project.accentColor}18`,color:project.accentColor,border:`1px solid ${project.accentColor}33`}}>{project.status}</span>
                    <span style={{padding:"4px 14px",borderRadius:100,fontSize:11,color:"var(--text-4)",background:"var(--g1)",border:"1px solid var(--glass-border)"}}>{project.year} · {project.duration}</span>
                  </div>
                  <motion.h2 {...FU(0.05)} className="t-h1 gt-w" style={{marginBottom:24,lineHeight:1.15}}>{project.title}</motion.h2>
                  <motion.p {...FU(0.08)} className="t-lg" style={{color:"var(--text-3)",lineHeight:1.8}}>{project.brief}</motion.p>
                </div>
                <motion.div {...FS(0.08)} style={{position:"relative"}}>
                  <GlassCard style={{padding:"clamp(28px,3vw,44px)",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",borderLeft:`2px solid ${project.accentColor}33`,overflow:"hidden"}}>
                    <StrataLines count={7} width={280} opacity={0.18} color={project.accentColor}/>
                    <div style={{marginTop:20}}><GovernancePulse width={280} height={56} opacity={0.28} color={project.accentColor}/></div>
                    <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid var(--glass-border)"}}>
                      <div className="t-xs" style={{color:"var(--text-4)",marginBottom:6}}>GOVERNANCE SYSTEM</div>
                      <div style={{fontSize:13,color:"var(--text-2)",fontWeight:600}}>Structural perpetuity · Multi-generational</div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:48}} className="grid-2">
                {[{label:"The Challenge",body:project.challenge,icon:"challenge",accent:"rgba(255,107,107,0.6)"},{label:"Our Solution",body:project.solution,icon:"solution",accent:project.accentColor}].map((block,i)=>(
                  <motion.div key={block.label} {...FU(0.08+i*0.08)}>
                    <GlassCard style={{padding:"clamp(24px,3vw,40px)",height:"100%",borderLeft:`2px solid ${block.accent}55`}}>
                      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:18}}>
                        {block.icon==="challenge"&&<ChallengeIcon size="sm"/>}
                        {block.icon==="solution"&&<SolutionCheckIcon size="sm"/>}
                        <div style={{fontSize:13,fontWeight:700,color:"var(--text-1)",letterSpacing:"0.04em"}}>{block.label}</div>
                      </div>
                      <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.85}}>{block.body}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <motion.div {...FU(0.1)}>
                <div className="t-xs" style={{color:"var(--text-4)",marginBottom:24}}>GOVERNANCE ARCHITECTURE</div>
                <div className="grid-4" style={{gap:"clamp(12px,2vw,20px)"}}>
                  {project.pillars.map((pillar,i)=>(
                    <motion.div key={pillar.label} {...FU(Math.min(0.04+i*0.05,0.1))}>
                      <GlassCard style={{padding:"clamp(20px,2.5vw,32px)",height:"100%"}}>
                        <div style={{marginBottom:14}}><StrataLines count={3} width={64} opacity={0.25} color={project.accentColor}/></div>
                        <div style={{fontSize:13,fontWeight:700,color:"var(--text-1)",marginBottom:10,lineHeight:1.3}}>{pillar.label}</div>
                        <p className="t-xs" style={{color:"var(--text-3)",lineHeight:1.75,textTransform:"none",letterSpacing:0,fontSize:12,fontFamily:"inherit"}}>{pillar.desc}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* PROJECTS — Glass Facade */}
      <section style={{position:"relative",overflow:"hidden",background:"var(--bg-alt)",borderTop:"1px solid var(--glass-border)",borderBottom:"1px solid var(--glass-border)",padding:"clamp(48px,6vw,80px) 0"}}>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",gap:"clamp(24px,4vw,56px)",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
            <motion.div {...FS(0)}><GlassFacade cols={9} rows={6} cellW={32} cellH={24} gap={3} opacity={0.12} accent={BRAND_BLUE}/></motion.div>
            <div style={{maxWidth:380}}>
              <motion.div {...FL(0.1)}>
                <div className="t-xs" style={{color:"var(--text-4)",marginBottom:16}}>STEWARDSHIP STANDARD</div>
                <p className="t-lg" style={{color:"var(--text-2)",lineHeight:1.75}}>Every mandate is built on the same principle: governance that outlasts its principals — across assets, jurisdictions, and generations.</p>
              </motion.div>
            </div>
            <motion.div {...FS(0.05)}><StructuralLattice width={200} height={160} opacity={0.08}/></motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS — CTA */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
        <AuroraGlow />
        <ArchitecturalBg variant="mixed"/>
        {/* Glassmorphism logo — decorative background layer */}
        <div aria-hidden="true" style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
          <div aria-hidden="true" style={{position:"absolute",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle,rgba(91,124,250,0.12) 0%,transparent 70%)",filter:"blur(24px)",pointerEvents:"none",zIndex:-1}}/>
          <div style={{position:"relative",padding:"28px 36px",borderRadius:"28px",background:"rgba(255,255,255,0.02)",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",border:"1px solid rgba(255,255,255,0.04)",boxShadow:"0 4px 24px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.05),inset 0 -1px 0 rgba(0,0,0,0.1)"}}>
            <img src="/Logo.png" alt="" style={{width:"160px",height:"auto",opacity:0.18,filter:"brightness(1.4) saturate(1.2) contrast(1.1)",mixBlendMode:"screen",display:"block",maskImage:"linear-gradient(135deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.6) 50%,rgba(0,0,0,0.2) 100%)",WebkitMaskImage:"linear-gradient(135deg,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.6) 50%,rgba(0,0,0,0.2) 100%)"}}/>
          </div>
        </div>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI(0)} style={{marginBottom:24}}>
            <span className="pill pill-v"><span className="dot-live" style={{background:"#8A5CFF",boxShadow:"0 0 8px #8A5CFF"}}/>PRIVATE FAMILY OFFICE · RIYADH</span>
          </motion.div>
          <motion.h2 {...FU(0.1)} className="t-d gt-a" style={{marginBottom:20,fontSize:"clamp(36px,5.5vw,72px)"}}>Ready to become<br/>a case study?</motion.h2>
          <motion.p {...FU(0.08)} className="t-xl" style={{color:"var(--text-3)",maxWidth:500,margin:"0 auto 44px",lineHeight:1.75}}>If your wealth requires governance — not just management — we would be glad to speak with you in confidence.</motion.p>
          <motion.div {...FU(0.1)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary glow-border" style={{fontSize:16,padding:"16px 40px"}}>Request an introduction →</Link>
            <Link href="#services" className="btn btn-ghost" style={{fontSize:16,padding:"16px 36px"}}>Explore our services</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CONTACT
          ════════════════════════════════════════════════════════ */}
      <section id="contact" style={{scrollMarginTop:"64px",minHeight:"50vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <GridPulse />
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}><span className="pill pill-c"><span className="dot-live"/>Private & Confidential</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>Begin a conversation.</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>Every introduction is treated with complete discretion. We typically respond within one business day.</motion.p>
        </div>
      </section>

      {/* CONTACT — Form */}
      <section className="section-sm" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:"clamp(40px,5vw,96px)",alignItems:"start"}} className="grid-2">
            <div>
              <motion.div {...FU()}>
                <SectionHeading eyebrow="Contact" title="Private introductions only."/>
              </motion.div>
              <motion.div {...FU(.12)} style={{display:"flex",flexDirection:"column",gap:24,marginTop:36}}>
                {[{icon:"loc",label:"Office",val:"Riyadh, Saudi Arabia"},{icon:"email",label:"Enquiries",val:"enquiries@qmulate.com"},{icon:"lock",label:"Confidentiality",val:"All introductions are private"},{icon:"clock",label:"Response Time",val:"Within one business day"}].map(item=>(
                  <div key={item.label} style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                    <div style={{flexShrink:0}}>
                      {item.icon==="loc"&&<LocationIcon size="sm" animated={false}/>}
                      {item.icon==="email"&&<EmailIcon size="sm" animated={false}/>}
                      {item.icon==="lock"&&<LockIcon size="sm" animated={false}/>}
                      {item.icon==="clock"&&<ClockIcon size="sm" animated={false}/>}
                    </div>
                    <div>
                      <div className="t-xs" style={{color:"var(--text-4)",marginBottom:4}}>{item.label}</div>
                      <div style={{fontSize:14,color:"var(--text-2)"}}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div {...FU(.2)} style={{marginTop:40}}>
                <GlassCard style={{padding:"24px 28px"}}>
                  <div style={{fontSize:13,color:"var(--text-3)",lineHeight:1.8}}>
                    <strong style={{color:"var(--text-1)",display:"block",marginBottom:8}}>Minimum Mandate</strong>
                    We typically engage with principals managing real estate portfolios of SAR 100M and above. If you are below this threshold and believe our services are still relevant, we are happy to discuss your situation.
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            <motion.div {...FS(.15)}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="success" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>
                    <GlassCard style={{padding:"clamp(40px,5vw,64px)",textAlign:"center"}}>
                      <div style={{marginBottom:20,display:"flex",justifyContent:"center"}}><SuccessStateIcon size="xl" animated={false}/></div>
                      <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:12}}>Introduction received.</h3>
                      <p style={{color:"var(--text-3)",lineHeight:1.8,fontSize:15}}>Thank you. We have received your enquiry and will respond within one business day. All communications are treated with complete discretion.</p>
                    </GlassCard>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    <GlassCard style={{padding:"clamp(32px,4vw,52px)"}}>
                      <div className="t-xs" style={{color:"var(--text-4)",marginBottom:28}}>INTRODUCTION REQUEST</div>
                      <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:18}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                          <div>
                            <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Full name *</label>
                            <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" style={inputStyle("name")} onFocus={()=>setFocus("name")} onBlur={()=>setFocus(null)}/>
                          </div>
                          <div>
                            <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Email address *</label>
                            <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" style={inputStyle("email")} onFocus={()=>setFocus("email")} onBlur={()=>setFocus(null)}/>
                          </div>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Family / Entity name</label>
                          <input value={form.entity} onChange={e=>setForm({...form,entity:e.target.value})} placeholder="Your family or entity name" style={inputStyle("entity")} onFocus={()=>setFocus("entity")} onBlur={()=>setFocus(null)}/>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Area of interest</label>
                          <select value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} style={{...inputStyle("reason"),cursor:"pointer",appearance:"none"} as React.CSSProperties} onFocus={()=>setFocus("reason")} onBlur={()=>setFocus(null)}>
                            <option value="">Select an area</option>
                            {REASONS.map(r=><option key={r} value={r} style={{background:"var(--bg-1)"}}>{r}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>Message *</label>
                          <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your situation and what you are looking to achieve." style={{...inputStyle("message"),resize:"vertical",minHeight:120} as React.CSSProperties} onFocus={()=>setFocus("message")} onBlur={()=>setFocus(null)}/>
                        </div>
                        <button type="submit" disabled={sending} className="btn btn-primary" style={{fontSize:15,padding:"14px",width:"100%",opacity:sending?.7:1,cursor:sending?"not-allowed":"pointer"}}>
                          {sending ? "Sending..." : "Send introduction →"}
                        </button>
                        <p style={{fontSize:11,color:"var(--text-4)",textAlign:"center"}}>All introductions are private and confidential. We do not share your information.</p>
                      </form>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:900px){.hero-grid,.timeline-row{grid-template-columns:1fr!important}}
        @media(max-width:640px){.hero-trust{gap:20px!important;flex-wrap:wrap}}
        .timeline-line{display:none}
        @media(min-width:700px){.timeline-line{display:block}}
        @media(max-width:700px){.timeline-row{grid-template-columns:1fr!important}}
        @media(max-width:900px){.grid-2{grid-template-columns:1fr!important}}
        @media(max-width:640px){.grid-4{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.grid-4{grid-template-columns:1fr!important}}
      `}</style>
    </main>
  );
}
