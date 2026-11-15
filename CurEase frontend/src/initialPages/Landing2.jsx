import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Apple,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Brain,
  ChartLine,
  Check,
  ChevronDown,
  HeartPulse,
  Menu,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./page.css";
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

const ease = [0.22, 1, 0.36, 1];

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const reduceMotion = useReducedMotion();
  const offset = direction === "left" ? { x: 22, y: 0 } : direction === "right" ? { x: -22, y: 0 } : { x: 0, y: 24 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">{children}</p>;
}

function SectionTitle({
  eyebrow,
  title,
  description,
  className = "",
}) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(2.35rem,5vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.055em] text-slate-950">{title}</h2>
      {description && <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 md:text-sm font-light">{description}</p>}
    </Reveal>
  );
}

function TextLink({ children, onClick }) {
  return (
    <button onClick={onClick} className="group inline-flex items-center gap-2 text-sm font-medium text-slate-900">
      {children}
      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </button>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const links = [
    ["Features", "#features"],
    ["Why CurEase", "#why-curease"],
    ["Pricing", "#landing-pricing"],
    ["FAQs", "#landing-faq"],
  ];

  return (
    <header id="landing-header" className="fixed inset-x-0 top-0 z-50 px-5 md:px-12">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between borderb border-slate-900/[0.07] bg-white/85 backdrop-blur-md">
        <a href="#top" aria-label="CurEase home" className="text-[21px] font-semibold tracking-[-1.3px] text-slate-950">
          CurEase<span className="text-blue-600">.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="nav-underline py-2 text-[13px] text-slate-500 transition-colors duration-300 hover:text-slate-950">
              {label}
            </a>
          ))}
        </nav>

        <button onClick={() => navigate("/sign-in")} className="group hidden items-center gap-2 text-[13px] font-medium text-slate-900 md:flex">
          Get started <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </button>

        <button className="p-2 text-slate-900 md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-b border-slate-900/[0.07] bg-white px-5 py-5 shadow-sm md:hidden"
          >
            {links.map(([label, href], index) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.045 }}
                className="block border-b border-slate-900/[0.06] py-4 text-base text-slate-800"
              >
                {label}
              </motion.a>
            ))}
            <button onClick={() => navigate("/sign-in")} className="mt-5 text-sm font-medium text-blue-700">Get started ↗</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:pt-20 md:px-16 md:pb-36">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div className="relative z-10">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mb-7 text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-700"
          >
            A life in balance.
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.14, ease }}
            className="max-w-[760px] text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[0.98] tracking-[-0.07em] text-slate-950"
          >
            Healthcare that feels <span className="text-blue-700">closer.</span>
          </motion.h1>
          {/* <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.27, ease }}
            className="mt-8 max-w-lg text-base leading-7 text-slate-500 md:text-lg md:leading-8"
          >
            Understand your health, make sense of everyday information, and keep the important things in one place with CurEase.
          </motion.p> */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.38, ease }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <button onClick={() => navigate("/sign-in")} className="primary-link group">
              Get started <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
            <button onClick={() => navigate("/about")} className="secondary-link group">
              Explore the project <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 30, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.18, ease }}
          className="hero-visual relative mx-auto w-full max-w-[620px]"
        >
          <div className="relative overflow-hidden ">
            <img src="/healthcare.png" alt="Illustration representing the CurEase healthcare experience" className="hero-image h-auto w-full object-contain" loading="eager" />
          </div>
          {/* <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-[11px] uppercase tracking-[0.14em] text-slate-400">
            <span>Beyond Wellness</span>
            <span>01 / CurEase</span>
          </div> */}
        </motion.div>
      </div>
      <a href="#features" className="mx-auto mt-20 flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-slate-900">
        Scroll to explore <ArrowDown size={14} className="animate-gentle-down" />
      </a>
    </section>
  );
}

const features = [
  { number: "01", title: "Symptom Checker", description: "Explore possible explanations for selected symptoms through guided analysis.", Icon: Activity },
  { number: "02", title: "Nutrition Analyzer", description: "Get a clearer picture of the food you eat and its nutritional value.", Icon: Apple },
  { number: "03", title: "Health Dashboard", description: "Bring health information, reports and progress into one view.", Icon: ChartLine },
  { number: "04", title: "Emergency Aid", description: "Find helpful first-response information when you need it quickly.", Icon: HeartPulse },
];

function OurFeatures() {
  return (
    <section id="features" className="bg-[#f7f8fa] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <SectionTitle eyebrow="What you can do" title={<>Useful tools.<br />A clearer picture.</>} />
          <Reveal className="max-w-sm md:pb-2" delay={0.12}>
            <p className="text-sm leading-7 text-slate-500">A collection of practical tools designed to make everyday health information easier to understand and manage.</p>
          </Reveal>
        </div>
        <div className="border-t border-slate-300">
          {features.map(({ number, title, description, Icon }, index) => (
            <motion.a
              href="/sign-in"
              key={number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.055, ease }}
              className="feature-row group grid grid-cols-[34px_1fr_auto] items-center gap-4 border-b border-slate-300 py-7 md:grid-cols-[64px_1fr_1fr_34px] md:gap-8 md:py-9"
            >
              <span className="font-mono text-[11px] text-slate-400">{number}</span>
              <div className="flex items-center gap-4">
                <Icon size={19} strokeWidth={1.5} className="shrink-0 text-slate-400 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-blue-700" />
                <h3 className="text-lg font-medium tracking-[-0.03em] text-slate-900 transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">{title}</h3>
              </div>
              <p className="hidden max-w-sm text-sm leading-6 text-slate-500 md:block">{description}</p>
              <ArrowUpRight size={18} className="text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-700" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    number: "01",
    title: "Guidance that starts with you",
    description: "Use symptom analysis to explore possible conditions and understand what your symptoms may indicate. It is intended as guidance, not a medical diagnosis.",
    Icon: Brain,
  },
  {
    number: "02",
    title: "Your information, organised",
    description: "Keep useful health details together, making it easier to revisit information and follow your own progress.",
    Icon: ShieldCheck,
  },
  {
    number: "03",
    title: "A more connected experience",
    description: "Bring health tools and information into one experience, with access to the features that matter to your everyday routine.",
    Icon: Stethoscope,
  },
];

function WhyChooseUs() {
  return (
    <section id="why-curease" className="px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle
            eyebrow="Why CurEase"
            title={<>Less scattered.<br /><span className="text-blue-700">More considered.</span></>}
            description="A simpler way to bring useful health tools and information together, without making the experience feel complicated."
          />
          <Reveal delay={0.15} className="mt-12 hidden max-w-[390px] lg:block">
            <img src="/feature.png" alt="CurEase feature illustration" loading="lazy" className="w-full object-contain" />
          </Reveal>
        </div>
        <div className="border-t border-slate-200">
          {reasons.map(({ number, title, description, Icon }, index) => (
            <Reveal key={number} delay={index * 0.08}>
              <article className="reason-row group border-b border-slate-200 py-9 md:py-12">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">{number} / 03</span>
                  <Icon size={21} strokeWidth={1.4} className="text-slate-400 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:text-blue-700" />
                </div>
                <h3 className="max-w-xl text-2xl font-medium tracking-[-0.04em] text-slate-900 md:text-3xl">{title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoSections() {
  const info = [
    {
      id: "01",
      title: "A more informed approach to everyday health.",
      description: "CurEase brings AI-assisted insights, useful tools and health information into one place to help make everyday decisions feel less overwhelming.",
      points: ["Explore symptom information", "Review useful health insights", "Access tools from one place"],
      image: "/healtcare2.png",
      alt: "CurEase healthcare information illustration",
      reverse: false,
    },
    {
      id: "02",
      title: "Understand the details that matter.",
      description: "Make health information easier to revisit and understand, from nutrition insights to personal health trends.",
      points: ["Explore nutrition information", "Review prediction confidence", "Follow health trends"],
      image: "/healthcare3.png",
      alt: "CurEase health insights illustration",
      reverse: true,
    },
    {
      id: "03",
      title: "Your health, in one place.",
      description: "Keep useful reports, appointments and prescriptions organised and easier to access when you need them.",
      points: ["Manage medical files", "Keep track of appointments", "Review your wellness information"],
      image: "https://cdn.devdojo.com/images/november2020/feature-graphic.png",
      alt: "Healthcare technology illustration",
      reverse: false,
    },
  ];

  return (
    <section id="landing-info" className="bg-[#f7f8fa] px-6 py-24 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle eyebrow="The CurEase experience" title={<>Health information,<br />made more useful.</>} className="mb-20 md:mb-28" />
        <div className="space-y-24 md:space-y-36">
          {info.map((item, index) => (
            <div key={item.id} className={`grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${item.reverse ? "" : ""}`}>
              <Reveal direction={item.reverse ? "right" : "left"} className={item.reverse ? "lg:order-2" : ""}>
                <div className="overflow-hidden bgwhite">
                  <motion.img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    whileHover={{ scale: 1.025 }}
                    transition={{ duration: 0.8, ease }}
                    className="aspect-[5/4] w-full object-contain p-5 md:p-10"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.08} className={item.reverse ? "lg:order-1" : ""}>
                <p className="mb-6 font-mono text-xs text-blue-700">{item.id} — {index === 0 ? "DISCOVER" : index === 1 ? "UNDERSTAND" : "ORGANISE"}</p>
                <h3 className="max-w-xl text-3xl font-medium leading-[1.1] tracking-[-0.05em] text-slate-950 md:text-5xl">{item.title}</h3>
                <p className="mt-6 max-w-lg text-base leading-7 text-slate-500">{item.description}</p>
                <ul className="mt-8 space-y-4 border-t border-slate-200 pt-6">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-slate-600">
                      <Check size={15} strokeWidth={1.7} className="text-blue-700" /> {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "Yea i like the ease of access.",
    name: "Rachna",
    role: "Doctor",
    image: "/2.jpg",
  },
  {
    quote: "Would reccommend this to 100 of my male best friends.",
    name: "Tripti",
    role: "CTO of Yapping",
    image: "/1.jpg",
  },
  {
    quote: "Packed with awesome features and usefull tools, check it out!",
    name: "Pranay Prasad",
    role: "Creator of Curease",
    image: "/me.png",
  },
];

function Testimonials() {
  return (
    <section id="landing-testimonials" className="px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <SectionTitle eyebrow="Kind words" title={<>Experiences worth<br />sharing.</>} />
          <Reveal className="max-w-xs md:pb-2">
            <p className="text-sm leading-7 text-slate-500">A few words from people about their experience with CurEase.</p>
          </Reveal>
        </div>
        <div className="grid gap-0 border-y border-slate-200 md:grid-cols-3 md:divide-x md:divide-slate-200">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08} className="h-full">
              <article className="testimonial-item flex h-full flex-col px-0 py-9 md:px-7 md:py-10">
                <span className="mb-7 text-4xl font-serif leading-none text-blue-700">“</span>
                <blockquote className="flex-1 text-base leading-7 text-slate-700">{item.quote}</blockquote>
                <div className="mt-9 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <img src={item.image} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover grayscale" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {/* <p className="mt-4 text-[11px] text-slate-400">Note: replace these sample testimonials with genuine user feedback before publishing.</p> */}
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Basic",
    descriptor: "Health Starter",
    description: "For individuals looking for simple guidance and everyday health insights.",
    price: "Free",
    period: "Forever",
    features: ["Basic symptom checks", "Everyday health insights", "Limited report storage"],
  },
  {
    name: "Plus",
    descriptor: "More room to explore",
    description: "For people who want deeper insights and more consistent health tracking.",
    price: "₹100",
    period: "per month",
    features: ["Unlimited symptom analysis", "Nutrition scanning", "Smart health tracking"],
  },
  {
    name: "Pro",
    descriptor: "A fuller experience",
    description: "For users looking for a more comprehensive health management experience.",
    price: "₹250",
    period: "per user / month",
    features: ["All Plus features", "Doctor consultation access", "Predictive alerts"],
  },
];

function PriceSection() {
  const navigate = useNavigate();
  return (
    <section id="landing-pricing" className="bg-[#f7f8fa] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 flex flex-col justify-between gap-7 md:mb-20 md:flex-row md:items-end">
          <SectionTitle eyebrow="Plans" title={<>Start simple.<br />Choose what fits.</>} description="Choose a plan that suits the way you want to use CurEase." />
          <Reveal className="max-w-xs md:pb-2"><p className="text-sm leading-7 text-slate-500">Straightforward options for getting started and exploring more.</p></Reveal>
        </div>
        <div className="grid border-y border-slate-300 md:grid-cols-3 md:divide-x md:divide-slate-300">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.07} className="h-full">
              <article className="plan-column flex h-full flex-col px-0 py-9 md:px-7 md:py-10">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-medium tracking-[-0.04em] text-slate-950">{plan.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{plan.descriptor}</span>
                </div>
                <p className="mt-5 min-h-[56px] text-sm leading-6 text-slate-500">{plan.description}</p>
                <div className="mt-8 flex items-end gap-2 border-b border-slate-200 pb-7">
                  <span className="text-4xl font-medium tracking-[-0.06em] text-slate-950">{plan.price}</span>
                  <span className="pb-1 text-xs text-slate-400">{plan.period}</span>
                </div>
                <ul className="mt-7 flex-1 space-y-4">
                  {plan.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm text-slate-600"><Check size={15} className="mt-0.5 shrink-0 text-blue-700" />{feature}</li>)}
                </ul>
                <button onClick={() => navigate("/sign-in")} className={`mt-10 flex w-full items-center justify-between border-b py-4 text-sm font-medium transition-colors duration-300 ${index === 1 ? "border-blue-700 text-blue-700" : "border-slate-300 text-slate-800 hover:border-slate-900"}`}>
                  Get started <ArrowUpRight size={16} />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "How does the symptom analysis feature work?",
    answer: "You select the symptoms you are experiencing and the system analyses the information to suggest possible conditions. These results are informational only and should not replace advice from a qualified healthcare professional.",
  },
  {
    question: "Can I talk to real doctors through this platform?",
    answer: "CurEase is intended to support access to healthcare information and tools. Availability of doctor consultations depends on the features enabled in your version of the platform.",
  },
  {
    question: "Is my medical data safe and private?",
    answer: "Please review CurEase's privacy policy for the specific information collected, how it is stored, and when it may be shared. Avoid entering sensitive information until you understand those terms.",
  },
  {
    question: "How quickly can I get results from the symptom checker?",
    answer: "The system is designed to provide analysis after you submit your selected symptoms. The result is an informational suggestion, not a confirmed diagnosis.",
  },
  {
    question: "Can I get treatment or prescriptions here?",
    answer: "CurEase information should not be treated as a prescription or a substitute for medical care. Consult a qualified healthcare professional for diagnosis and treatment decisions.",
  },
  {
    question: "Do I need to install an app to use CurEase?",
    answer: "CurEase is accessible through its website, so you can use it in a supported browser without installing a separate app.",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="landing-faq" className="px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto grid max-w-[1200px] items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
        <div className="lg:sticky lg:top-32">
          <SectionTitle eyebrow="A few answers" title={<>Good to know<br />before you begin.</>} description="Some useful details about using CurEase." />
          <Reveal delay={0.1} className="mt-10 max-w-sm">
            <img src="/healthfaq.png" alt="CurEase frequently asked questions illustration" loading="lazy" className="w-full object-contain" />
          </Reveal>
          <a href="/about" className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-800">More about CurEase <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
        </div>
        <div className="border-t border-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <Reveal key={faq.question} delay={index * 0.035}>
                <div className="border-b border-slate-200">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                  >
                    <span className="text-base font-medium tracking-[-0.02em] text-slate-900 transition-colors group-hover:text-blue-700 md:text-lg">{faq.question}</span>
                    <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-700" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-8 text-sm leading-7 text-slate-500 md:text-base">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [time, setTime] = useState("");
  const year = new Date().getFullYear();

  useEffect(() => {
    const updateTime = () => {
      setTime(new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(new Date()));
    };
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer id="landing-footer" className="overflow-hidden bg-[#f0f2f5] px-6 pt-16 md:px-16 md:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-12 border-b border-slate-300 pb-14 md:flex-row md:items-end">
          <div className="max-w-md">
            <Eyebrow>Take care, one step at a time</Eyebrow>
            <p className="text-2xl font-medium leading-snug tracking-[-0.04em] text-slate-800 md:text-3xl">Making health information feel a little more human.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 text-sm">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Explore</p>
              <a href="#features" className="footer-link block">Features</a>
              <a href="#why-curease" className="footer-link block">Why CurEase</a>
              <a href="#landing-faq" className="footer-link block">FAQs</a>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Continue</p>
              <a href="/sign-in" className="footer-link block">Sign in</a>
              <a href="/about" className="footer-link block">About the project</a>
              <a href="https://www.instagram.com/pranayy.c3/" target="_blank" rel="noreferrer" className="footer-link block">Instagram ↗</a>
              <a href="https://www.linkedin.com/in/pranay-prasad-/" target="_blank" rel="noreferrer" className="footer-link block">LinkedIn ↗</a>
            </div>
          </div>
        </div>

        <Reveal className="pt-12 md:pt-16">
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.5, ease }}>
            <p aria-label="CurEase" className="select-none whitespace-nowrap text-center text-[18vw] font-semibold leading-[0.78] tracking-[-0.095em] text-slate-950 md:text-[16vw]">
              CurEase<span className="text-blue-700">.</span>
            </p>
          </motion.div>
        </Reveal>

        <div className="flex flex-col justify-between gap-4 py-7 text-[11px] text-slate-500 sm:flex-row sm:items-center">
          <p>© {year} CurEase. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>Delhi, India</span>
            <span className="flex items-center gap-2 tabular-nums text-slate-700" aria-label={`Local time ${time}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Local time {time || "--:--"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage2() {
  return (
      <main id="top" className="overflow-clip bg-white text-slate-900">
      <Header />
      <HeroSection />
      <OurFeatures />
      <WhyChooseUs />
      <InfoSections />
      <Testimonials />
      <PriceSection />
      <Faq />
      <Footer />
    </main>
  );
}
