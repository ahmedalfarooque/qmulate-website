"use client";
import {
  ServiceIcon,
  GovernanceIcon, PortfolioIcon, AIIcon, CrossBorderIcon, RiskIcon, DigitalIcon,
  LocationIcon, EmailIcon, LockIcon, ClockIcon, SuccessStateIcon,
} from "@/components/icons/GlassIcons";
import { ChallengeIcon, SolutionCheckIcon } from "@/components/icons";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FU, FI, FS, FL, SectionHeading, GlassCard, FeatureCard,
  HeroGlass,
} from "@/components/DS";
import {
  ArchitecturalBg, StrataLines, GovernancePulse, VerticalFins,
  GlassFacade, StrataSculpture, StructuralLattice, BRAND_BLUE
} from "@/components/Strata";
import { PageBackground } from "@/components/PageBackground";
import { Logo3D } from "@/components/Logo3D";
import { GlassIcon } from "@/components/GlassIcon";

/* ══════════════════════════════════════════════════
   HOME DATA
   ══════════════════════════════════════════════════ */
const SERVICES_AR = [
  { id:"stewardship", icon:"◈", label:"إدارة العقارات", color:"var(--cyan)",
    headline:"إشراف احترافي يحافظ على القيمة ويضاعفها.",
    body:"نُدير محفظتك العقارية كمنظومة موحّدة ومحكومة — وليس مجرد مجموعة أصول متفرقة. كل قرار يُتَّخذ ضمن إطار حوكمة موثَّق يضمن الاتساق والمساءلة والقيمة طويلة الأمد.",
    items:["إطار حوكمة موحَّد","تقارير ربعية للأداء والحوكمة","تجميع مراكز متعددة الحراس","توجيه القياسي ونسب الأداء","متابعة الامتثال التنظيمي","تقارير التموضع الاستراتيجي"] },
  { id:"growth", icon:"⬡", label:"النمو المحكوم", color:"#8A5CFF",
    headline:"نشر رأس المال ضمن حواجز هيكلية.",
    body:"النمو بلا حوكمة مضاربة. نصمّم تفويضات الاستثمار ومعايير الاستحواذ وأُطر نشر رأس المال التي تُتيح توسُّعاً طموحاً مع الحفاظ على سلامة الهيكل.",
    items:["تصميم تفويض الاستثمار","إطار نشر رأس المال","تحسين هيكل الكيانات والحيازات","تصميم الهياكل العابرة للحدود","هيكلة صديقة للتوريث","تصميم الأغلفة الضريبية الكفؤة"] },
  { id:"advisory", icon:"◉", label:"الاستشارات العقارية", color:"#4D8DFF",
    headline:"تحويل ذكاء السوق إلى قرارات حاسمة.",
    body:"نُحوِّل بيانات السوق الخام إلى قرارات استثمار منظَّمة. تغطي ممارستنا الاستشارية نشأة الصفقات والتقييم المستقل وإدارة الاستحواذ وحوكمة المعاملات.",
    items:["نشأة الصفقات وإدارة الأنابيب","التقييم المستقل والتقدير","إدارة العناية الواجبة","حوكمة المعاملات","تقارير ذكاء السوق","تقييم البائعين والأطراف المقابلة"] },
  { id:"reporting", icon:"⬟", label:"تقارير الثروة", color:"#A855F7",
    headline:"رؤية كاملة عبر كل حيازة كل ربع.",
    body:"يستحق الأصيلون صورة واضحة ودقيقة عن ثروتهم. نُنتج تقارير موحَّدة تغطي الأداء والنسب والتعرُّض للمخاطر وامتثال الحوكمة.",
    items:["حزم ثروة ربعية موحَّدة","نسب الأداء وتحليلاته","رسم خريطة التعرض للمخاطر","تقارير امتثال الحوكمة","توثيق بمستوى الأمناء","وصول مخصص للوحة التحكم"] },
];

const PILLARS_AR = [
  { label:"رعاية العقار", icon:"◈", color:"#00D4FF", desc:"كل أصل محكوم بإطار سياسات موثَّق، لا بتقدير فردي." },
  { label:"النمو المحكوم", icon:"⬡", color:"#8A5CFF", desc:"هياكل مبنية لتتجاوز عمر الأصيلين — تنقل الثروة والنوايا عبر الأجيال." },
  { label:"الحفاظ طويل الأمد", icon:"◉", color:"#4D8DFF", desc:"تحليلات فورية عبر جميع الحيازات. لا مفاجآت. شفافية كاملة." },
  { label:"الاستمرارية الجيلية", icon:"⬟", color:"#A855F7", desc:"هياكل التوريث مبنية من اليوم الأول، لا كفكرة لاحقة." },
];

const CAPABILITIES_AR = [
  { icon:"🏛️", title:"هندسة الحوكمة", desc:"هياكل الكيانات وأُطر الحيازة والوثائق الدستورية المبنية للديمومة.", accent:"#00D4FF" },
  { icon:"📊", title:"ذكاء المحفظة", desc:"تحليلات فورية عبر جميع الحيازات — الأداء والمخاطر والسيولة والنسب.", accent:"#8A5CFF" },
  { icon:"🔐", title:"هندسة التوريث", desc:"هياكل ملكية متعددة الأجيال تنقل النوايا — لا الأصول فحسب — عبر الأجيال.", accent:"#4D8DFF" },
  { icon:"⚡", title:"رؤى الذكاء الاصطناعي", desc:"نماذج التعلم الآلي التي تكشف عن الشذوذات والفرص وإشارات المخاطر مبكراً.", accent:"#A855F7" },
  { icon:"🌐", title:"الهياكل العابرة للحدود", desc:"أُطر حيازة متعددة الاختصاصات مع تقارير موحَّدة وحوكمة موحَّدة.", accent:"#FF6EC7" },
  { icon:"🛡️", title:"إدارة المخاطر", desc:"تحديد منهجي وقياس والحد من مخاطر التركيز والسيولة والسوق.", accent:"#FFB56B" },
];

const TIMELINE_AR = [
  { year:"٢٠١٩", title:"التأسيس", desc:"تأسَّست كيوميليت لحوكمة الثروة العقارية — لا لمجرد إدارتها — عبر الأجيال." },
  { year:"٢٠٢٠", title:"أول تفويض", desc:"أول تعامل مع مكتب عائلة. اكتمل التجميع متعدد الحراس خلال ٩٠ يوماً." },
  { year:"٢٠٢١", title:"بناء المنصة", desc:"نشر منصة الحوكمة الخاصة. إطلاق التقارير الفورية عبر جميع فئات الأصول." },
  { year:"٢٠٢٣", title:"التوسع في الخليج", desc:"توسيع ممارسة الاستشارات إلى الإمارات والمملكة العربية السعودية. تأسيس تفويضات الحوكمة الإقليمية." },
  { year:"٢٠٢٤", title:"تكامل الذكاء الاصطناعي", desc:"دمج محرك مخاطر التعلم الآلي. التحليلات التنبؤية نشطة عبر المحفظة." },
  { year:"٢٠٢٦", title:"اليوم", desc:"تفويضات جيلية متعددة نشطة. هياكل رعاية تمتد عبر الاختصاصات. المنصة v7 مباشرة.", current:true },
];

/* ══════════════════════════════════════════════════
   ABOUT DATA
   ══════════════════════════════════════════════════ */
const PRINCIPLES_AR = [
  { n:"٠١", title:"الحوكمة فوق العوائد", desc:"لا نُحسِّن من أجل العائد. بل نبني الأُطر الهيكلية التي تحمي رأس المال وتُديمه عبر دورات السوق وأجيال الأسرة." },
  { n:"٠٢", title:"الديمومة فوق الأداء", desc:"كل تفويض مُصمَّم ليتجاوز عمر أصيليه. نُهندس هياكل التوريث والوثائق الدستورية وبروتوكولات الحوكمة منذ اليوم الأول." },
  { n:"٠٣", title:"الشفافية فوق الغموض", desc:"يحصل الأصيلون على حزم حوكمة ربعية كاملة، وبيانات أداء فورية، ووصول غير مشروط إلى كل مبرر قرار." },
  { n:"٠٤", title:"الانضباط فوق التقدير", desc:"كل قرار استثماري يُتَّخذ ضمن معايير التفويض الموثَّقة. لا يحل الحكم الشخصي محل العملية المؤسسية." },
];

const LAYERS_AR = [
  { num:"٠١", name:"طبقة الحوكمة", color:"var(--cyan)", desc:"الوثائق الدستورية وهياكل الكيانات وحقوق التصويت وبروتوكولات التوريث. الإطار الدائم الذي يحكم كل شيء تحته." },
  { num:"٠٢", name:"طبقة العمليات", color:"#8A5CFF", desc:"الإدارة اليومية لجميع الأصول. حوكمة المورِّدين والامتثال التنظيمي والإشراف على المرافق — موثَّقة وقابلة للتدقيق." },
  { num:"٠٣", name:"طبقة الذكاء", color:"#4D8DFF", desc:"تحليلات الأداء ومراقبة المخاطر ونسب المعيار القياسي والكشف عن الشذوذات. رؤية فورية عبر كل حيازة." },
  { num:"٠٤", name:"طبقة الاستشارات", color:"#A855F7", desc:"ذكاء السوق ونشأة الصفقات وإدارة العناية الواجبة وحوكمة المعاملات — دائماً ضمن إطار التفويض." },
];

const TEAM_AR = [
  { name:"فيصل المنصوري", role:"الشريك المؤسس", area:"هندسة الحوكمة والاستراتيجية" },
  { name:"خالد الراشد", role:"شريك، إدارة المحافظ", area:"استراتيجية الأصول والأداء" },
  { name:"سارة الغامدي", role:"مديرة العمليات", area:"التميُّز التشغيلي والامتثال" },
  { name:"أحمد بن سعيد", role:"مدير الاستشارات", area:"حوكمة المعاملات والأسواق" },
];

/* ══════════════════════════════════════════════════
   SERVICES DATA
   ══════════════════════════════════════════════════ */
const SVC_LIST_AR = [
  { id:"stewardship", icon:"◈", label:"إدارة العقارات", color:"var(--cyan)",
    headline:"إشراف احترافي يحافظ على القيمة ويُضاعفها.",
    body:"نُدير محفظتك العقارية كمنظومة موحَّدة ومحكومة. من العمليات اليومية إلى التموضع الاستراتيجي، كل قرار يُتَّخذ ضمن إطار حوكمة موثَّق يضمن الاتساق والمساءلة والقيمة طويلة الأمد.",
    deliverables:["إطار حوكمة المحفظة الموحَّدة","حزم الأداء والحوكمة الربعية","تجميع المراكز متعددة الحراس","نسب الأداء والمقارنة بالمعيار","مراقبة الامتثال التنظيمي","تقارير التموضع الاستراتيجي","حوكمة الموردين والإشراف","تخطيط صيانة رأس المال"] },
  { id:"growth", icon:"⬡", label:"النمو المحكوم", color:"#8A5CFF",
    headline:"نشر رأس المال ضمن حواجز هيكلية.",
    body:"النمو بلا حوكمة مضاربة. نصمِّم تفويضات الاستثمار وأُطر نشر رأس المال التي تُتيح توسُّعاً طموحاً مع الحفاظ على السلامة الهيكلية.",
    deliverables:["تصميم وتوثيق تفويض الاستثمار","إطار نشر رأس المال","تحسين هيكل الكيانات والحيازات","تصميم الهياكل العابرة للحدود","هيكلة صديقة للتوريث","تطبيق الأغلفة الضريبية الكفؤة","تصميم مجلس الإدارة ولجنة الحوكمة","عملية المراجعة السنوية للتفويض"] },
  { id:"advisory", icon:"◉", label:"الاستشارات العقارية", color:"#4D8DFF",
    headline:"تحويل ذكاء السوق إلى قرارات حاسمة.",
    body:"تُحوِّل ممارستنا الاستشارية بيانات السوق الخام إلى قرارات استثمار منظَّمة. نغطي نشأة الصفقات والتقييم المستقل وإدارة العناية الواجبة وحوكمة المعاملات.",
    deliverables:["نشأة الصفقات وإدارة الأنابيب","التقييم المستقل والتقدير","إدارة وتقارير العناية الواجبة","حوكمة وتوثيق المعاملات","تقارير ذكاء السوق","تقييم البائعين والأطراف المقابلة","تحليل استراتيجية الخروج","توصيات إعادة توازن المحفظة"] },
  { id:"reporting", icon:"⬟", label:"تقارير الثروة", color:"#A855F7",
    headline:"رؤية كاملة عبر كل حيازة، كل ربع.",
    body:"يستحق الأصيلون صورة واضحة ودقيقة عن ثروتهم. نُنتج تقارير موحَّدة تغطي الأداء والنسب والتعرض للمخاطر وامتثال الحوكمة.",
    deliverables:["حزم الثروة الربعية الموحَّدة","نسب الأداء وتحليلاته","رسم خريطة التعرض للمخاطر","تقارير امتثال الحوكمة","توثيق بمستوى الأمناء","لوحة تحكم تنفيذية مخصصة","مقارنة الأداء بالمعيار القياسي","تقرير حوكمة الثروة السنوي"] },
  { id:"risk", icon:"🛡️", label:"إدارة المخاطر", color:"#FF6EC7",
    headline:"حماية منهجية من المخاطر الهيكلية والسوقية.",
    body:"المخاطر في الثروة العقارية متعددة الأبعاد. نُصمِّم أُطراً منهجية لتحديد مخاطر التركيز والسيولة والتوريث والسوق وقياسها والحد منها قبل أن تتحول إلى أحداث.",
    deliverables:["تحليل تركيز المحفظة","اختبار إجهاد السيولة","تقييم مخاطر التوريث","مراقبة مخاطر السوق","مراجعة حوكمة التأمين","تقييم مخاطر الطرف المقابل","تخطيط السيناريو والنمذجة","تيسير لجنة حوكمة المخاطر"] },
  { id:"digital", icon:"⚡", label:"التحول الرقمي", color:"#FFB56B",
    headline:"تقنية تجعل الحوكمة سهلة تلقائياً.",
    body:"نُنشر البنية التحتية للذكاء لجعل الحوكمة تلقائية لا يدوية. من التحليلات الفورية إلى الكشف عن المخاطر بالذكاء الاصطناعي، تحوِّل طبقة التقنية البيانات إلى رؤى محكومة قابلة للتنفيذ.",
    deliverables:["نشر منصة البيانات الموحَّدة","لوحات الأداء الفورية","الكشف عن الشذوذات بالذكاء الاصطناعي","مراقبة الامتثال الآلية","نظام إدارة الوثائق","تكامل بيانات متعددة الحراس","لوحة تحكم الأصيل على الجوال","تكامل API مع الأنظمة الخارجية"] },
];

/* ══════════════════════════════════════════════════
   SOLUTIONS DATA
   ══════════════════════════════════════════════════ */
const SOLUTIONS_AR = [
  {icon:"🏛️",title:"منصة الحوكمة",color:"var(--cyan)",desc:"بنية تحتية للحوكمة من البداية إلى النهاية — وثائق دستورية وأُطر تفويض وهياكل كيانات وبروتوكولات توريث — مُنشرة كمنظومة موحَّدة قابلة للتدقيق.",features:["مكتبة الوثائق الدستورية","أدوات حوكمة مجلس الإدارة","محرك بروتوكول التوريث","لوحة تتبع التفويضات","مسار التدقيق والتوثيق","مراقبة الامتثال التنظيمي"]},
  {icon:"📊",title:"ذكاء المحفظة",color:"#8A5CFF",desc:"تحليلات فورية عبر جميع الحيازات — الأداء والنسب والسيولة والتركيز والمخاطر — مُوحَّدة في لوحة تحكم واحدة تمنح الأصيلين رؤية كاملة دائماً.",features:["تحليلات الأداء الفورية","رسم خريطة تركيز المخاطر","مراقبة موقف السيولة","أدوات نسب المعيار القياسي","منشئ التقارير المخصصة","تجميع متعدد الحراس"]},
  {icon:"🤖",title:"محرك المخاطر بالذكاء الاصطناعي",color:"#4D8DFF",desc:"نماذج التعلم الآلي التي تكشف عن الشذوذات ومخاطر التركيز وإشارات السوق قبل أن تصبح أحداث حوكمة. استباقي لا تفاعلي.",features:["خوارزميات الكشف عن الشذوذات","إشارات مخاطر التركيز","تحليل الارتباط بالسوق","اختبار الإجهاد للسيناريو","نمذجة التدفق النقدي التنبؤية","إشعارات الإنذار المبكر"]},
  {icon:"🌐",title:"مدير متعدد الاختصاصات",color:"#A855F7",desc:"حوكمة موحَّدة عبر جميع الاختصاصات — المملكة العربية السعودية والإمارات والمملكة المتحدة والخارج — مع تقارير موحَّدة ومراقبة الامتثال في رؤية واحدة.",features:["رسم خريطة الهياكل العابرة للحدود","الامتثال الخاص بكل اختصاص","التقارير الموحَّدة","مراقبة الكفاءة الضريبية","إدارة علاقات الكيانات","تنبيهات التغييرات التنظيمية"]},
  {icon:"🔄",title:"مدير دورة حياة الأصول",color:"#FF6EC7",desc:"حوكمة دورة الحياة الكاملة من الاستحواذ عبر التطوير والإدارة والخروج — مع أُطر قرار موثَّقة وتتبع الأداء ونقاط تفتيش الحوكمة في كل مرحلة.",features:["قائمة تحقق حوكمة الاستحواذ","تتبع مراحل التطوير","لوحات أداء العمليات","تحليلات استراتيجية الخروج","توثيق الأحداث الرأسمالية","أرشيف الأداء التاريخي"]},
  {icon:"📱",title:"بوابة الأصيل",color:"#FFB56B",desc:"بوابة آمنة وخاصة تمنح الأصيلين وصولاً فورياً إلى موقف ثروتهم الكامل — الأداء والحوكمة والوثائق والتقارير — من أي جهاز وأي مكان.",features:["لوحة الثروة الفورية","الوصول الآمن للوثائق","نظرة عامة على حالة الحوكمة","تفضيلات الإشعارات المخصصة","واجهة محسَّنة للجوال","قناة تواصل آمنة"]},
];

/* ══════════════════════════════════════════════════
   PROJECTS DATA
   ══════════════════════════════════════════════════ */
const PROJECTS_AR = [
  {
    id: "٠٠١",
    title: "إطار التوريث متعدد الأجيال",
    type: "هندسة التوريث",
    status: "نشط",
    year: "٢٠٢٤",
    duration: "١٨ شهراً",
    accentColor: "#00D4FF",
    brief: "احتاجت أسرة من الجيل الثالث إلى إطار توريث كامل يغطي الأصول العقارية عبر اختصاصات متعددة — مبني للديمومة لا للامتثال فحسب.",
    challenge: "راكمت الأسرة أصولاً في المملكة العربية السعودية والإمارات ولندن وجيرزي على مدى أربعة عقود دون هيكل حوكمة موحَّد، مما أوجد غموضاً في التوريث وتشتتاً تشغيلياً.",
    solution: "صمَّمنا بنية حوكمة رباعية الطبقات مع كيانات منظَّمة ووثائق أسرية دستورية وخارطة طريق للتوريث طويلة الأمد مُهندَسة لتتجاوز عمر أصيليها.",
    pillars: [
      { label: "هندسة الحوكمة", desc: "وثائق دستورية وهيكلة كيانات وأُطر حقوق التصويت مُصمَّمة للوضوح متعدد الأجيال." },
      { label: "توحيد الاختصاصات", desc: "رؤية حوكمة موحَّدة عبر المملكة العربية السعودية والإمارات ولندن وجيرزي مع تقارير موحَّدة." },
      { label: "بروتوكول التوريث", desc: "إطار توريث للجيل الثالث مع آليات نقل موثَّقة ومجالس حوكمة الأسرة." },
      { label: "الرعاية طويلة الأمد", desc: "تصميم تفويض دائم مع هياكل صديقة للتوريث مبنية لتتجاوز عمر أصيليها." },
    ],
  },
];

const REASONS_AR = ["هندسة الحوكمة","ذكاء المحفظة","تخطيط التوريث","تقارير الثروة","إدارة المخاطر","استفسار عام"];

export default function ArHome() {
  const [activeService, setActiveService] = useState(0);
  const [activeSvc, setActiveSvc] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number|null>(null);
  const [form, setForm] = useState({ name:"",email:"",entity:"",reason:"",message:"" });
  const [focus, setFocus] = useState<string|null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroOpacity = useTransform(scrollYProgress,[0,.6],[1,0]);
  const heroY = useTransform(scrollYProgress,[0,1],["0%","20%"]);

  const project = PROJECTS_AR[activeProject];

  const inputStyle = (field:string):React.CSSProperties => ({
    width:"100%", background:"var(--g1)",
    border:`1px solid ${focus===field?"rgba(0,212,255,.5)":"rgba(255,255,255,.08)"}`,
    borderRadius:12, padding:"13px 16px", fontSize:14, color:"var(--text-1)",
    outline:"none", fontFamily:"'IBM Plex Sans Arabic',sans-serif",
    transition:"border-color .2s, box-shadow .2s",
    boxShadow:focus===field?"0 0 0 3px rgba(0,212,255,.12)":"none",
    direction:"rtl", textAlign:"right",
  });

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    setSending(true);
    await new Promise(r=>setTimeout(r,200));
    setSending(false);
    setSent(true);
  };

  return (
    <main className="hero-page ar" style={{ position: 'relative' }}>
      <PageBackground variant="home" />

      {/* ══════════════════════════════
          HOME — Hero
          ══════════════════════════════ */}
      <section id="home" ref={heroRef} style={{minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)"}}>
        <motion.div style={{position:"absolute",inset:0,y:heroY}} className="will-change-transform">
          <ArchitecturalBg variant="mixed"/>
        </motion.div>
        <motion.div style={{position:"relative",zIndex:10,width:"100%",maxWidth:1240,padding:"0 clamp(20px,4vw,48px)",opacity:heroOpacity}}>
          <HeroGlass style={{borderRadius:36,padding:"clamp(44px,6vw,80px)"}}>
            {/* direction:"ltr" keeps child-1=LEFT(logo) child-2=RIGHT(text) regardless of RTL */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:"clamp(40px,5vw,80px)",alignItems:"center",direction:"ltr"}} className="hero-grid">
              {/* LEFT — 3D Logo */}
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:16,alignItems:"center",justifyContent:"center"}}>
                <motion.div initial={{opacity:0,scale:.9,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{delay:.3,duration:.45,ease:[.34,1.56,.64,1]}}>
                  <Logo3D size={250}/>
                </motion.div>
              </div>
              {/* RIGHT — Text (RTL internally) */}
              <div style={{direction:"rtl"}}>
                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.05,duration:.3}} style={{marginBottom:28}}>
                  <span className="pill pill-c"><span className="dot-live"/>منصة الثروة العقارية · الرياض</span>
                </motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.08,duration:.25}} style={{marginBottom:24}}>
                  <img src="/Logo.png" alt="QMULATE" style={{width:'150px',height:'auto',objectFit:'contain',filter:'drop-shadow(0 0 20px rgba(91,124,250,0.6)) drop-shadow(0 0 40px rgba(91,124,250,0.25))'}}/>
                </motion.div>
                <motion.h1 initial={{opacity:0,y:16,scale:.97}} animate={{opacity:1,y:0,scale:1}} transition={{delay:.12,duration:.4,ease:[.25,.46,.45,.94]}} className="t-d gt-w" style={{marginBottom:20,fontSize:"clamp(44px,6vw,88px)"}}>
                  ثروة،<br/><span className="gt-c">منظَّمة</span><br/>لتدوم بعد<br/><span style={{color:"rgba(255,255,255,.25)"}}>صانعيها.</span>
                </motion.h1>
                <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.18,duration:.3}} className="t-xl" style={{color:"var(--text-3)",maxWidth:480,marginBottom:12,lineHeight:1.85}}>
                  نُنظِّم الثروة العقارية — إدارة عقارات، وساطة، استشارات، ومرافق — في منظومة حوكمة واحدة ودائمة.
                </motion.p>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.22,duration:.25}} style={{fontFamily:"'Inter',sans-serif",fontSize:14,color:"rgba(255,255,255,.2)",marginBottom:44}}>
                  Wealth, structured to outlast its makers.
                </motion.p>
                <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.26,duration:.3}} style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:52}}>
                  <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 34px"}}>← اطلب مقدمة</Link>
                  <Link href="#about" className="btn btn-ghost" style={{fontSize:15,padding:"14px 30px"}}>نهجنا</Link>
                </motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.32,duration:.3}} style={{display:"flex",gap:28,paddingTop:28,borderTop:"1px solid var(--glass-border)",flexWrap:"wrap"}} className="hero-trust">
                  {[{icon:"◈",v:"رعاية العقار",l:"حوكمة الأصول",c:"#00D4FF"},{icon:"⬡",v:"النمو المحكوم",l:"نشر رأس المال",c:"#8A5CFF"},{icon:"◉",v:"الاستمرارية الجيلية",l:"إطار التوريث",c:"#4D8DFF"}].map(item=>(
                    <div key={item.l}>
                      <div style={{fontSize:"clamp(16px,1.5vw,20px)",fontWeight:800,color:item.c,filter:`drop-shadow(0 0 12px ${item.c}66)`,marginBottom:3}}>{item.icon}</div>
                      <div className="t-xs" style={{color:"var(--text-4)"}}>{item.v}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </HeroGlass>
        </motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5}} style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,zIndex:10}}>
          <div className="t-xs" style={{color:"rgba(255,255,255,.2)"}}>مرر للاستكشاف</div>
          <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:2}} style={{width:1,height:48,background:`linear-gradient(${BRAND_BLUE},transparent)`}}/>
        </motion.div>
      </section>

      {/* HOME — Pillars */}
      <section style={{background:"var(--bg-alt)",backdropFilter:"blur(40px)",borderTop:"1px solid var(--glass-border)",borderBottom:"1px solid var(--glass-border)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins" style={{opacity:0.6}}/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-4" style={{padding:"clamp(40px,5vw,64px) 0"}}>
            {PILLARS_AR.map((p,i)=>(
              <motion.div key={p.label} {...FU(i*0.1)} style={{textAlign:"center",padding:"clamp(24px,3vw,40px) 16px"}}>
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
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center",direction:"rtl"}} className="grid-2">
            <div>
              <SectionHeading eyebrow="المنصة" title={<>منظومة واحدة لكل<br/>ثروتك العقارية.</>} subtitle="لا ندير الاستثمارات. بل نُنظِّم الثروة. إدارة عقارات ووساطة واستشارات ومرافق — موحَّدة في منظومة واحدة محكومة ودائمة."/>
              <motion.div {...FU(.2)} style={{marginTop:36,display:"flex",flexDirection:"column",gap:14}}>
                {[["◈","الحوكمة أولاً","كل أصل محكوم بإطار سياسات موثَّق، لا بتقدير فردي."],["⬡","تصميم دائم","هياكل مبنية لتتجاوز عمر الأصيلين — تنقل الثروة والنوايا عبر الأجيال."],["◉","طبقة الذكاء","تحليلات فورية عبر جميع الحيازات. لا مفاجآت. شفافية كاملة."]].map(([icon,title,desc])=>(
                  <div key={String(title)} style={{display:"flex",gap:16,padding:"18px 20px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:16,direction:"rtl"}}>
                    <GlassIcon size={40} color="blue">{icon}</GlassIcon>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{title}</div>
                      <div className="t-sm" style={{color:"var(--text-3)"}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div {...FU(.32)} style={{marginTop:32}}>
                <Link href="#about" className="btn btn-ghost">استكشف نهجنا ←</Link>
              </motion.div>
            </div>
            <motion.div {...FS(.12)} style={{position:"relative"}}>
              <div style={{position:"relative",display:"flex",flexDirection:"column",gap:12}}>
                {[{label:"طبقة الحوكمة",sub:"وثائق دستورية · حقوق التصويت · بروتوكولات التوريث",color:"var(--cyan)"},{label:"طبقة العمليات",sub:"الإدارة اليومية · حوكمة الموردين · مراقبة الامتثال",color:"#8A5CFF"},{label:"طبقة الذكاء",sub:"تحليلات الأداء · مراقبة المخاطر · نسب المعيار",color:"#4D8DFF"},{label:"طبقة الاستشارات",sub:"مصادر الصفقات · ذكاء السوق · حوكمة المعاملات",color:"#A855F7"}].map((layer,i)=>(
                  <motion.div key={layer.label} {...FU(.12+i*.08)}>
                    <GlassCard style={{padding:"20px 24px",borderRight:`2px solid ${layer.color}44`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",direction:"rtl"}}>
                        <div style={{width:12,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,flexShrink:0}}/>
                        <div style={{flex:1,paddingRight:12}}>
                          <div style={{fontSize:14,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>{layer.label}</div>
                          <div className="t-xs" style={{color:"var(--text-3)",textTransform:"none",letterSpacing:0,fontSize:12}}>{layer.sub}</div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
                <div style={{position:"absolute",right:-24,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,#00D4FF,#8A5CFF,#4D8DFF,#A855F7,transparent)"}}/>
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
            <SectionHeading eyebrow="الخدمات" title="كل ما تحتاجه ثروتك." center subtitle="من العمليات اليومية إلى التوريث الجيلي — محكوم بمنظومة موحَّدة واحدة."/>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap",justifyContent:"center"}}>
            {SERVICES_AR.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveService(i)} whileHover={{scale:1.03}} whileTap={{scale:.98}} style={{padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",background:activeService===i?s.color:"rgba(255,255,255,.04)",color:activeService===i?"#020408":"var(--text-3)",border:`1px solid ${activeService===i?s.color:"rgba(255,255,255,.08)"}`,transition:"all .25s"}}>
                <ServiceIcon id={s.id} size="xs"/><span style={{marginRight:4}}>{s.label}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeService} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.25}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"clamp(32px,4vw,64px)",alignItems:"start",direction:"rtl"}} className="grid-2">
                <div>
                  <div style={{marginBottom:16,fontSize:28}}>{SERVICES_AR[activeService].icon}</div>
                  <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:16,lineHeight:1.25}}>{SERVICES_AR[activeService].headline}</h3>
                  <p className="t-lg" style={{color:"var(--text-3)",marginBottom:32,lineHeight:1.9}}>{SERVICES_AR[activeService].body}</p>
                  <Link href="#services" className="btn btn-primary">← استكشف الخدمة</Link>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {SERVICES_AR[activeService].items.map((item,i)=>(
                    <motion.div key={item} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*.04,duration:.2}}>
                      <div style={{display:"flex",gap:12,padding:"14px 18px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:12,alignItems:"center",direction:"rtl"}}>
                        <div style={{width:10,height:3,borderRadius:1,background:SERVICES_AR[activeService].color,flexShrink:0,boxShadow:`0 0 8px ${SERVICES_AR[activeService].color}`}}/>
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
            <SectionHeading eyebrow="القدرات" title="ما يمكننا تحقيقه لك." center subtitle="ست قدرات جوهرية تتحد لتقديم حوكمة ثروة بمستوى المؤسسات."/>
          </div>
          <div className="grid-3">
            {CAPABILITIES_AR.map((c,i)=>(
              <FeatureCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} accent={c.accent} index={i}/>
            ))}
          </div>
        </div>
      </section>

      {/* HOME — Philosophy */}
      <section className="section" style={{background:"var(--bg-alt)",position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"center",direction:"rtl"}} className="grid-2">
            <motion.div {...FL()}>
              <SectionHeading eyebrow="الفلسفة" title={<>نحكم. <span className="gt-c">لا نُضارب.</span></>} subtitle="معظم مديري الثروات باعة منتجات. نحن مهندسو حوكمة. نبني هياكل لا محافظ. نحمي التفويضات لا العوائد فقط."/>
              <motion.div {...FU(.2)} style={{display:"flex",flexDirection:"column",gap:20,marginTop:36}}>
                {[{n:"٠١",title:"الحوكمة فوق العوائد",desc:"لا نسعى وراء العائد. بل نبني الهياكل التي تحمي رأس المال وتُديمه — فتكون العوائد نتيجة الانضباط لا الحظ."},{n:"٠٢",title:"الديمومة فوق الأداء",desc:"كل تفويض مُصمَّم ليتجاوز عمر أصيليه. هياكل التوريث والوثائق الدستورية وبروتوكولات الحوكمة مدمجة منذ اليوم الأول."},{n:"٠٣",title:"الشفافية فوق الغموض",desc:"يستحق الأصيلون رؤية كاملة. نقدم حزم حوكمة ربعية وبيانات أداء فورية ووصولاً غير مشروط لكل مبرر قرار."}].map((p,i)=>(
                  <motion.div key={p.n} {...FU(.08+i*.1)} style={{display:"flex",gap:20,alignItems:"flex-start",direction:"rtl"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:"rgba(0,212,255,.09)",border:"1px solid rgba(0,212,255,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"monospace",fontSize:11,color:"var(--cyan)",fontWeight:700}}>{p.n}</div>
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
                <blockquote style={{fontSize:"clamp(18px,2.2vw,26px)",fontWeight:700,color:"var(--text-1)",lineHeight:1.45,marginBottom:16}}>
                  &ldquo;ثروة، منظَّمة لتدوم بعد صانعيها.&rdquo;
                </blockquote>
                <div className="t-xs" style={{color:"var(--text-4)",marginBottom:32}}>المبدأ التأسيسي لكيوميليت · ٢٠١٩</div>
                <div style={{display:"flex",justifyContent:"center",gap:24,paddingTop:24,borderTop:"1px solid var(--glass-border)"}}>
                  {[{label:"الديمومة الهيكلية",sub:"مبني ليدوم"},{label:"الرعاية المحكومة",sub:"كل تفويض"}].map(item=>(
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
            <SectionHeading eyebrow="رحلتنا" title="سبع سنوات في بناء المعيار." center/>
          </div>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`linear-gradient(to bottom,transparent,${BRAND_BLUE}44,rgba(138,92,255,.3),transparent)`,transform:"translateX(-50%)"}} className="timeline-line"/>
            <div style={{display:"flex",flexDirection:"column",gap:32}}>
              {TIMELINE_AR.map((item,i)=>(
                <motion.div key={item.year} {...FU(i*.08)} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,position:"relative"}} className="timeline-row">
                  {i%2===0 ? (
                    <>
                      <div style={{textAlign:"right",paddingRight:40,paddingTop:8}}>
                        <div style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,color:item.current?BRAND_BLUE:"var(--text-5)",letterSpacing:"-0.04em",marginBottom:8,filter:item.current?`drop-shadow(0 0 20px ${BRAND_BLUE}77)`:undefined}}>{item.year}</div>
                        <GlassCard style={{padding:"20px 24px",display:"inline-block",textAlign:"right"}}>
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
                        <div style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,color:item.current?BRAND_BLUE:"var(--text-5)",letterSpacing:"-0.04em",marginBottom:8,filter:item.current?`drop-shadow(0 0 20px ${BRAND_BLUE}77)`:undefined}}>{item.year}</div>
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

      {/* HOME — CTA */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div {...FI()}><span className="pill pill-v" style={{marginBottom:28}}><span className="dot-live" style={{background:"#8A5CFF",boxShadow:"0 0 8px #8A5CFF"}}/>مكتب العائلة الخاص · الرياض</span></motion.div>
          <motion.h2 {...FU(.08)} className="t-d gt-a" style={{marginBottom:20,fontSize:"clamp(44px,7vw,96px)"}}>مبني للحوكمة.<br/>مصمَّم ليدوم.</motion.h2>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:540,margin:"0 auto 44px",lineHeight:1.85}}>إذا كنت مستعداً للانتقال من إدارة الأصول إلى حوكمة الثروة، يسعدنا التحدث معك بسرية تامة.</motion.p>
          <motion.div {...FU(.22)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary glow-border" style={{fontSize:16,padding:"16px 40px"}}>← اطلب مقدمة</Link>
            <Link href="#services" className="btn btn-ghost" style={{fontSize:16,padding:"16px 36px"}}>استكشف خدماتنا</Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          ABOUT
          ══════════════════════════════ */}
      <section id="about" style={{scrollMarginTop:"64px",minHeight:"72vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}><span className="pill pill-c"><span className="dot-live"/>من نحن</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:780,marginBottom:24}}>مكتب عائلة مُهندَس<br/>للديمومة.</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>تأسَّست كيوميليت لحل مشكلة محددة: معظم الثروات العقارية تُدار بصورة تفاعلية لا استباقية. نحن هنا لتغيير ذلك.</motion.p>
        </div>
      </section>

      {/* ABOUT — Mission & Vision */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="fins"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-2" style={{gap:"clamp(24px,3vw,40px)"}}>
            {[{label:"المهمة",color:"var(--cyan)",title:"نحكم الثروة. لا نبيع المنتجات.",body:"تُنظِّم كيوميليت الثروة العقارية — إدارة العقارات والوساطة والاستشارات والمرافق — في منظومة محكومة واحدة. كل تفويض مُهيكَل لحماية الثروة ونموها ونقلها عبر الأجيال دون فقدان النوايا."},{label:"الرؤية",color:"#8A5CFF",title:"عالم تدوم فيه الثروة بعد صانعيها.",body:"نؤمن بأن كل أسرة تبني ثروة عقارية كبيرة تستحق إطار حوكمة يليق بهذا الإنجاز. رؤيتنا أن نصبح المعيار للحوكمة المؤسسية للثروة العقارية في منطقة الخليج وما وراءها."}].map((item,i)=>(
              <motion.div key={item.label} {...FU(i*.1)}>
                <GlassCard style={{padding:"clamp(32px,4vw,52px)",height:"100%"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24,direction:"rtl"}}>
                    <span className="t-xs" style={{color:item.color}}>{item.label}</span>
                    <div style={{flex:1,height:1,background:`linear-gradient(270deg,${item.color}44,transparent)`}}/>
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
          <motion.div {...FI()}><span className="pill pill-w" style={{marginBottom:32}}>المبدأ التأسيسي</span></motion.div>
          <motion.blockquote {...FU(.08)} style={{fontSize:"clamp(24px,3.5vw,52px)",fontWeight:800,color:"var(--text-1)",lineHeight:1.2,maxWidth:900,margin:"0 auto 32px",letterSpacing:"-0.02em"}}>
            &ldquo;ثروة، منظَّمة <span className="gt-c">لتدوم بعد صانعيها.</span>&rdquo;
          </motion.blockquote>
          <motion.p {...FU(.16)} className="t-xs" style={{color:"var(--text-4)"}}>كيوميليت · تأسست ٢٠١٩ · الرياض، المملكة العربية السعودية</motion.p>
        </div>
      </section>

      {/* ABOUT — Principles */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(48px,6vw,96px)",alignItems:"start",direction:"rtl"}} className="grid-2">
            <div>
              <SectionHeading eyebrow="مبادؤنا" title="المعتقدات التي نحكم بها." subtitle="هذه المبادئ الأربعة تُوجِّه كل هيكل نصممه وكل قرار نتخذه وكل تفويض نقبله."/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {PRINCIPLES_AR.map((p,i)=>(
                <motion.div key={p.n} {...FU(.06+i*.09)}>
                  <GlassCard style={{padding:"24px 28px"}}>
                    <div style={{display:"flex",gap:16,alignItems:"flex-start",direction:"rtl"}}>
                      <div style={{width:34,height:34,borderRadius:10,background:"rgba(0,212,255,.08)",border:"1px solid rgba(0,212,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:11,color:"var(--cyan)",fontWeight:700,flexShrink:0}}>{p.n}</div>
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
            <SectionHeading eyebrow="المنصة" title="أربع طبقات. منظومة موحَّدة." center subtitle="تُنظِّم بنية الحوكمة لدينا الثروة في أربع طبقات متشابكة — كل منها تعتمد على ما فوقها."/>
          </div>
          <div style={{position:"relative",maxWidth:800,margin:"0 auto"}}>
            <div style={{position:"absolute",right:-1,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,#00D4FF,#8A5CFF,#4D8DFF,#A855F7,transparent)"}}/>
            <div style={{display:"flex",flexDirection:"column",gap:16,paddingRight:40}}>
              {LAYERS_AR.map((layer,i)=>(
                <motion.div key={layer.num} {...FU(.08+i*.1)} style={{position:"relative"}}>
                  <GlassCard style={{padding:"28px 32px",borderRight:`2px solid ${layer.color}44`}}>
                    <div style={{display:"flex",gap:20,alignItems:"flex-start",direction:"rtl"}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10,direction:"rtl"}}>
                          <span style={{fontFamily:"monospace",fontSize:11,color:layer.color,fontWeight:700}}>{layer.num}</span>
                          <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-1)"}}>{layer.name}</h3>
                          <div style={{width:12,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 8px ${layer.color}`,marginRight:"auto"}}/>
                        </div>
                        <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.75}}>{layer.desc}</p>
                      </div>
                    </div>
                  </GlassCard>
                  <div style={{position:"absolute",right:-8,width:16,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 10px ${layer.color}`,top:"50%",transform:"translateY(-50%)"}}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT — Standards */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="pulse"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,64px)"}}>
            <SectionHeading eyebrow="السجل الحافل" title="سبع سنوات في بناء المعيار." center subtitle="منصة حوكمة بُنيت من خلال الممارسة — لا النظرية."/>
          </div>
          <div className="grid-4">
            {[{label:"رعاية العقار",desc:"كل أصل محكوم بإطار سياسات",icon:"◈",color:"#00D4FF"},{label:"الحفاظ طويل الأمد",desc:"هياكل مبنية للاستمرارية الجيلية",icon:"⬡",color:"#8A5CFF"},{label:"النمو المحكوم",desc:"رأس المال يُنشر ضمن حواجز هيكلية",icon:"◉",color:"#4D8DFF"},{label:"الاستمرارية الجيلية",desc:"أُطر التوريث نشطة عبر التفويضات",icon:"⬟",color:"#A855F7"}].map((p,i)=>(
              <motion.div key={p.label} {...FU(i*.09)}>
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
            <SectionHeading eyebrow="القيادة" title="الفريق خلف المنصة." center/>
          </div>
          <div className="grid-4">
            {TEAM_AR.map((member,i)=>(
              <motion.div key={member.name} {...FU(i*.08)}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center"}}>
                  <div style={{width:72,height:72,borderRadius:14,margin:"0 auto 20px",background:"linear-gradient(135deg,rgba(0,212,255,.10),rgba(138,92,255,.10))",border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"rgba(255,255,255,.35)"}}>
                    {member.name.charAt(0)}
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
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>هل أنت مستعد لبدء محادثة؟</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>جميع المقدمات خاصة وسرية.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>← اطلب مقدمة</Link>
            <Link href="#services" className="btn btn-ghost" style={{fontSize:15,padding:"14px 32px"}}>استعرض خدماتنا</Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          SERVICES
          ══════════════════════════════ */}
      <section id="services" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}><span className="pill pill-c"><span className="dot-live"/>الخدمات</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>كل ما تحتاجه ثروتك العقارية.</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>ست خطوط خدمة. منظومة حوكمة موحَّدة. كل خدمة تعمل بالتنسيق مع الأخريات — لأن حوكمة الثروة ليست مجموعة منتجات.</motion.p>
        </div>
      </section>

      {/* SERVICES — Tabs */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",gap:8,marginBottom:48,flexWrap:"wrap"}}>
            {SVC_LIST_AR.map((s,i)=>(
              <motion.button key={s.id} onClick={()=>setActiveSvc(i)} whileHover={{scale:1.03}} whileTap={{scale:.97}} style={{padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer",background:activeSvc===i?s.color:"rgba(255,255,255,.04)",color:activeSvc===i?"#020408":"var(--text-3)",border:`1px solid ${activeSvc===i?s.color:"rgba(255,255,255,.08)"}`,transition:"all .25s",display:"flex",alignItems:"center",gap:6}}>
                <ServiceIcon id={s.id} size="xs"/><span style={{marginRight:4}}>{s.label}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeSvc} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.25}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(40px,5vw,80px)",alignItems:"start",direction:"rtl"}} className="grid-2">
                <div>
                  <div style={{marginBottom:20,fontSize:28}}>{SVC_LIST_AR[activeSvc].icon}</div>
                  <h2 className="t-h2" style={{color:"var(--text-1)",marginBottom:20,lineHeight:1.2}}>{SVC_LIST_AR[activeSvc].headline}</h2>
                  <p className="t-lg" style={{color:"var(--text-3)",marginBottom:36,lineHeight:1.85}}>{SVC_LIST_AR[activeSvc].body}</p>
                  <Link href="#contact" className="btn btn-primary" style={{fontSize:14}}>← ناقش هذه الخدمة</Link>
                </div>
                <GlassCard style={{padding:"clamp(24px,3vw,40px)"}}>
                  <div className="t-xs" style={{color:"var(--text-4)",marginBottom:20}}>مخرجات الخدمة</div>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {SVC_LIST_AR[activeSvc].deliverables.map((item,i)=>(
                      <motion.div key={item} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*.04}}>
                        <div style={{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:"1px solid var(--glass-border)",direction:"rtl"}}>
                          <div style={{width:10,height:3,borderRadius:1,background:SVC_LIST_AR[activeSvc].color,flexShrink:0,boxShadow:`0 0 6px ${SVC_LIST_AR[activeSvc].color}`}}/>
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
            <SectionHeading eyebrow="عمليتنا" title="كيف نُعالج كل تفويض." center subtitle="كل تفويض جديد يتبع نفس عملية الانضمام المنضبطة — بغض النظر عن حجمه."/>
          </div>
          <div className="grid-4">
            {[{n:"٠١",icon:"🔍",title:"الاستكشاف",desc:"نُجري تشخيصاً شاملاً للهياكل الحالية والأصول وثغرات الحوكمة وتفويض الأسرة.",accent:"#00D4FF"},{n:"٠٢",icon:"🏗️",title:"الهندسة المعمارية",desc:"نصمِّم بنية الحوكمة الكاملة — هياكل الكيانات ووثائق التفويض وأُطر التقارير.",accent:"#8A5CFF"},{n:"٠٣",icon:"⚡",title:"التنفيذ",desc:"نُنشر البنية التحتية للحوكمة — الأنظمة والعمليات والتوثيق — ضمن جدول زمني محدد.",accent:"#4D8DFF"},{n:"٠٤",icon:"♾️",title:"الحوكمة المستمرة",desc:"ندير التفويض بصورة مستمرة — تقارير واستشارات وتحسين مستمر للحوكمة.",accent:"#A855F7"}].map((step,i)=>(
              <motion.div key={step.n} {...FU(i*.1)}>
                <GlassCard style={{padding:"clamp(24px,3vw,36px)",textAlign:"center",height:"100%"}}>
                  <div style={{fontFamily:"monospace",fontSize:11,color:step.accent,marginBottom:16}}>{step.n}</div>
                  <div style={{marginBottom:16,fontSize:28}}>{step.icon}</div>
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
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>هل أنت مستعد لمناقشة تفويضك؟</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>جميع المحادثات خاصة وسرية.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>← اطلب مقدمة</Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          SOLUTIONS
          ══════════════════════════════ */}
      <section id="solutions" style={{scrollMarginTop:"64px",minHeight:"60vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}><span className="pill pill-c"><span className="dot-live"/>الحلول والتقنية</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>تقنية بمستوى المؤسسات للثروة العقارية.</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>ستة حلول متكاملة تشكّل معاً البنية التحتية الكاملة لإدارة الثروة العقارية المحكومة.</motion.p>
        </div>
      </section>

      {/* SOLUTIONS — Grid */}
      <section className="section" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="grid-3">
            {SOLUTIONS_AR.map((s,i)=>(
              <motion.div key={s.title} {...FU(i*.07)}>
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
                      <div key={f} style={{display:"flex",gap:10,alignItems:"center",direction:"rtl"}}>
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
            <SectionHeading eyebrow="البنية المعمارية" title="كيف بُنيت المنصة." center subtitle="كل حل هو وحدة متكاملة — لا منتج مستقل. تتشارك البيانات وبروتوكولات الحوكمة والبنية التحتية للتقارير."/>
          </div>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            {[{label:"بوابة الأصيل",color:"#FFB56B",sub:"طبقة الوصول الفوري للأصيلين والأمناء"},{label:"طبقة الذكاء والتحليلات",color:"#A855F7",sub:"الأداء · المخاطر · النسب · محرك الذكاء الاصطناعي"},{label:"طبقة الحوكمة والعمليات",color:"#4D8DFF",sub:"الوثائق · التفويضات · الامتثال · دورة الحياة"},{label:"طبقة تكامل البيانات",color:"#8A5CFF",sub:"الحراس · البنوك · السجلات · بيانات السوق"},{label:"الأصول والكيانات الأساسية",color:"var(--cyan)",sub:"جميع العقارات · الكيانات · الحيازات · الهياكل"}].map((layer,i)=>(
              <motion.div key={layer.label} {...FU(.08+i*.1)} style={{marginBottom:8}}>
                <div style={{padding:"clamp(16px,2vw,24px) clamp(20px,3vw,36px)",background:`linear-gradient(225deg,${layer.color}0A,${layer.color}04)`,border:`1px solid ${layer.color}30`,borderRadius:16,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .3s",direction:"rtl"}}>
                  <div style={{width:14,height:3,borderRadius:1,background:layer.color,boxShadow:`0 0 10px ${layer.color}`,flexShrink:0}}/>
                  <div style={{fontSize:12,color:"var(--text-3)",textAlign:"right",maxWidth:360}}>{layer.sub}</div>
                  <div style={{fontWeight:700,color:"var(--text-1)",fontSize:"clamp(13px,1.5vw,16px)"}}>{layer.label}</div>
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
          <motion.h2 {...FU()} className="t-h2 gt-w" style={{marginBottom:16}}>شاهد المنصة عملياً.</motion.h2>
          <motion.p {...FU(.08)} className="t-lg" style={{color:"var(--text-3)",marginBottom:36}}>نقدم عرضاً توضيحياً خاصاً للأصيلين المؤهَّلين.</motion.p>
          <motion.div {...FU(.14)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary" style={{fontSize:15,padding:"14px 36px"}}>← اطلب عرضاً توضيحياً</Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          PROJECTS
          ══════════════════════════════ */}
      <section id="projects" style={{scrollMarginTop:"64px",minHeight:"60vh",position:"relative",display:"flex",alignItems:"center",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-0) 0%,var(--bg-1) 50%,var(--bg-0) 100%)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI(0.05)} style={{marginBottom:20}}>
            <span className="pill pill-c">
              <span style={{display:"inline-block",width:10,height:3,borderRadius:1,background:BRAND_BLUE,marginLeft:8,verticalAlign:"middle"}}/>
              دراسات الحالة · التفويضات المؤسسية
            </span>
          </motion.div>
          <motion.h1 {...FU(0.1)} className="t-d gt-w" style={{marginBottom:20,maxWidth:860,fontSize:"clamp(44px,6vw,88px)"}}>
            تفويضات<br/><span className="gt-c">أعادت تعريف الحوكمة.</span>
          </motion.h1>
          <motion.p {...FU(0.18)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.75,marginBottom:40}}>
            كل تعامل هو منظومة حوكمة منظَّمة — مصمَّمة للديمومة، لا للأداء فحسب.
          </motion.p>
          <motion.div {...FS(0.22)} style={{display:"flex",gap:32,alignItems:"flex-end",padding:"28px 32px",background:"var(--g1)",border:"1px solid var(--glass-border)",borderRadius:20,backdropFilter:"blur(20px)",maxWidth:680,overflow:"hidden",position:"relative"}}>
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
            {PROJECTS_AR.map((p,i)=>(
              <motion.button key={p.id} onClick={()=>setActiveProject(i)} whileHover={{scale:1.03}} whileTap={{scale:0.98}} style={{padding:"12px 28px",borderRadius:100,fontSize:13,fontWeight:600,cursor:"pointer",background:activeProject===i?p.accentColor:"rgba(255,255,255,.04)",color:activeProject===i?"#020408":"var(--text-3)",border:`1px solid ${activeProject===i?p.accentColor:"rgba(255,255,255,.08)"}`,transition:"all .25s",direction:"rtl"}}>
                <span style={{fontFamily:"monospace",fontSize:10,opacity:0.7,marginLeft:10}}>{p.id}</span>
                {p.type}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={activeProject} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:0.25,ease:[0.25,0.46,0.45,0.94]}}>
              <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"clamp(32px,4vw,64px)",marginBottom:40,direction:"rtl"}} className="grid-2">
                <div>
                  <div style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap",direction:"rtl"}}>
                    <span className="pill pill-c">{project.type}</span>
                    <span style={{padding:"4px 14px",borderRadius:100,fontSize:11,fontWeight:600,background:`${project.accentColor}18`,color:project.accentColor,border:`1px solid ${project.accentColor}33`}}>{project.status}</span>
                    <span style={{padding:"4px 14px",borderRadius:100,fontSize:11,color:"var(--text-4)",background:"var(--g1)",border:"1px solid var(--glass-border)"}}>{project.year} · {project.duration}</span>
                  </div>
                  <motion.h2 {...FU(0.05)} className="t-h1 gt-w" style={{marginBottom:24,lineHeight:1.15}}>{project.title}</motion.h2>
                  <motion.p {...FU(0.12)} className="t-lg" style={{color:"var(--text-3)",lineHeight:1.8}}>{project.brief}</motion.p>
                </div>
                <motion.div {...FS(0.15)} style={{position:"relative"}}>
                  <GlassCard style={{padding:"clamp(28px,3vw,44px)",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",borderRight:`2px solid ${project.accentColor}33`,overflow:"hidden"}}>
                    <StrataLines count={7} width={280} opacity={0.18} color={project.accentColor}/>
                    <div style={{marginTop:20}}><GovernancePulse width={280} height={56} opacity={0.28} color={project.accentColor}/></div>
                    <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid var(--glass-border)"}}>
                      <div className="t-xs" style={{color:"var(--text-4)",marginBottom:6}}>منظومة الحوكمة</div>
                      <div style={{fontSize:13,color:"var(--text-2)",fontWeight:600}}>الديمومة الهيكلية · متعدد الأجيال</div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:48,direction:"rtl"}} className="grid-2">
                {[{label:"التحدي",body:project.challenge,icon:"challenge",accent:"rgba(255,107,107,0.6)"},{label:"الحل",body:project.solution,icon:"solution",accent:project.accentColor}].map((block,i)=>(
                  <motion.div key={block.label} {...FU(0.08+i*0.08)}>
                    <GlassCard style={{padding:"clamp(24px,3vw,40px)",height:"100%",borderRight:`2px solid ${block.accent}55`}}>
                      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:18,direction:"rtl"}}>
                        {block.icon==="challenge"&&<ChallengeIcon size="sm"/>}
                        {block.icon==="solution"&&<SolutionCheckIcon size="sm"/>}
                        <div style={{fontSize:13,fontWeight:700,color:"var(--text-1)"}}>{block.label}</div>
                      </div>
                      <p className="t-sm" style={{color:"var(--text-3)",lineHeight:1.85}}>{block.body}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <motion.div {...FU(0.18)}>
                <div className="t-xs" style={{color:"var(--text-4)",marginBottom:24}}>البنية المعمارية للحوكمة</div>
                <div className="grid-4" style={{gap:"clamp(12px,2vw,20px)"}}>
                  {project.pillars.map((pillar,i)=>(
                    <motion.div key={pillar.label} {...FU(0.04+i*0.07)}>
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
                <div className="t-xs" style={{color:"var(--text-4)",marginBottom:16}}>معيار الرعاية</div>
                <p className="t-lg" style={{color:"var(--text-2)",lineHeight:1.75}}>كل تفويض مبني على نفس المبدأ: حوكمة تتجاوز عمر أصيليها — عبر الأصول والاختصاصات والأجيال.</p>
              </motion.div>
            </div>
            <motion.div {...FS(0.05)}><StructuralLattice width={200} height={160} opacity={0.08}/></motion.div>
          </div>
        </div>
      </section>

      {/* PROJECTS — CTA */}
      <section className="section" style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,var(--bg-1),var(--bg-0))"}}>
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
            <span className="pill pill-v"><span className="dot-live" style={{background:"#8A5CFF",boxShadow:"0 0 8px #8A5CFF"}}/>مكتب العائلة الخاص · الرياض</span>
          </motion.div>
          <motion.h2 {...FU(0.1)} className="t-d gt-a" style={{marginBottom:20,fontSize:"clamp(36px,5.5vw,72px)"}}>هل أنت مستعد<br/>لتكون دراسة حالة؟</motion.h2>
          <motion.p {...FU(0.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:500,margin:"0 auto 44px",lineHeight:1.75}}>إذا كانت ثروتك تحتاج إلى حوكمة — لا مجرد إدارة — يسعدنا التحدث معك بسرية تامة.</motion.p>
          <motion.div {...FU(0.22)} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="#contact" className="btn btn-primary glow-border" style={{fontSize:16,padding:"16px 40px"}}>← اطلب مقدمة</Link>
            <Link href="#services" className="btn btn-ghost" style={{fontSize:16,padding:"16px 36px"}}>استكشف خدماتنا</Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          CONTACT
          ══════════════════════════════ */}
      <section id="contact" style={{scrollMarginTop:"64px",minHeight:"50vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:"clamp(120px,15vw,180px)",paddingBottom:"clamp(60px,8vw,100px)"}}>
        <ArchitecturalBg variant="mixed"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <motion.div {...FI()} style={{marginBottom:24}}><span className="pill pill-c"><span className="dot-live"/>خاص وسري</span></motion.div>
          <motion.h1 {...FU(.08)} className="t-h1 gt-w" style={{maxWidth:720,marginBottom:24}}>ابدأ محادثة.</motion.h1>
          <motion.p {...FU(.16)} className="t-xl" style={{color:"var(--text-3)",maxWidth:560,lineHeight:1.8}}>كل مقدمة تُعامَل بسرية تامة. عادةً ما نرد خلال يوم عمل واحد.</motion.p>
        </div>
      </section>

      {/* CONTACT — Form */}
      <section className="section-sm" style={{position:"relative",overflow:"hidden"}}>
        <ArchitecturalBg variant="lattice"/>
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:"clamp(40px,5vw,96px)",alignItems:"start",direction:"rtl"}} className="grid-2">
            <div>
              <motion.div {...FU()}>
                <SectionHeading eyebrow="التواصل" title="مقدمات خاصة فقط."/>
              </motion.div>
              <motion.div {...FU(.12)} style={{display:"flex",flexDirection:"column",gap:24,marginTop:36}}>
                {[{icon:"loc",label:"المكتب",val:"الرياض، المملكة العربية السعودية"},{icon:"email",label:"الاستفسارات",val:"enquiries@qmulate.com"},{icon:"lock",label:"السرية",val:"جميع المقدمات خاصة"},{icon:"clock",label:"وقت الرد",val:"خلال يوم عمل واحد"}].map(item=>(
                  <div key={item.label} style={{display:"flex",gap:16,alignItems:"flex-start",direction:"rtl"}}>
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
                    <strong style={{color:"var(--text-1)",display:"block",marginBottom:8}}>الحد الأدنى للتفويض</strong>
                    نتعامل عادةً مع الأصيلين الذين يديرون محافظ عقارية بقيمة ١٠٠ مليون ريال سعودي وما فوق. إذا كنت دون هذا الحد وتعتقد أن خدماتنا لا تزال ذات صلة، يسعدنا مناقشة وضعك.
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
                      <h3 className="t-h3" style={{color:"var(--text-1)",marginBottom:12}}>تم استلام مقدمتك.</h3>
                      <p style={{color:"var(--text-3)",lineHeight:1.8,fontSize:15}}>شكراً لك. لقد استلمنا استفسارك وسنرد خلال يوم عمل واحد. تُعامَل جميع المراسلات بسرية تامة.</p>
                    </GlassCard>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    <GlassCard style={{padding:"clamp(32px,4vw,52px)"}}>
                      <div className="t-xs" style={{color:"var(--text-4)",marginBottom:28}}>طلب مقدمة</div>
                      <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:18,direction:"rtl"}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                          <div>
                            <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>الاسم الكامل *</label>
                            <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="اسمك" style={inputStyle("name")} onFocus={()=>setFocus("name")} onBlur={()=>setFocus(null)}/>
                          </div>
                          <div>
                            <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>البريد الإلكتروني *</label>
                            <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" style={inputStyle("email")} onFocus={()=>setFocus("email")} onBlur={()=>setFocus(null)}/>
                          </div>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>اسم الأسرة / الكيان</label>
                          <input value={form.entity} onChange={e=>setForm({...form,entity:e.target.value})} placeholder="اسم أسرتك أو كيانك" style={inputStyle("entity")} onFocus={()=>setFocus("entity")} onBlur={()=>setFocus(null)}/>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>مجال الاهتمام</label>
                          <select value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} style={{...inputStyle("reason"),cursor:"pointer",appearance:"none"} as React.CSSProperties} onFocus={()=>setFocus("reason")} onBlur={()=>setFocus(null)}>
                            <option value="">اختر مجالاً</option>
                            {REASONS_AR.map(r=><option key={r} value={r} style={{background:"var(--bg-1)"}}>{r}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={{fontSize:12,color:"var(--text-3)",display:"block",marginBottom:7}}>الرسالة *</label>
                          <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="أخبرنا عن وضعك وما تسعى إلى تحقيقه." style={{...inputStyle("message"),resize:"vertical",minHeight:120} as React.CSSProperties} onFocus={()=>setFocus("message")} onBlur={()=>setFocus(null)}/>
                        </div>
                        <button type="submit" disabled={sending} className="btn btn-primary" style={{fontSize:15,padding:"14px",width:"100%",opacity:sending?.7:1,cursor:sending?"not-allowed":"pointer"}}>
                          {sending ? "جارٍ الإرسال..." : "← إرسال المقدمة"}
                        </button>
                        <p style={{fontSize:11,color:"var(--text-4)",textAlign:"center"}}>جميع المقدمات خاصة وسرية. لا نشارك معلوماتك.</p>
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
