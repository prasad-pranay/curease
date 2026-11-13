
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  ChartNoAxesCombined,
  ChevronDown,
  CodeXml,
  HeartPulse,
  Lightbulb,
  Menu,
  Rocket,
  ShieldCheck,
  Stethoscope,
  Users,
  X,
  FileText,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

import "./page.css";

const transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

const Reveal = ({
  children,
  className = "",
  delay = 0,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion ? false : { opacity: 0, y: 18 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
};

const Container = ({
  children,
  className = "",
}) => (
  <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({
  eyebrow,
  title,
  description,
  centered = false,
}) => (
  <Reveal
    className={`mb-10 sm:mb-14 ${
      centered ? "mx-auto text-center" : ""
    }`}
  >
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
      {eyebrow}
    </p>

    <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
      {title}
    </h2>

    {description && (
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
        {description}
      </p>
    )}
  </Reveal>
);

// ---------------------------------------------
// Header
// ---------------------------------------------

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Why CurEase", href: "#why-us" },
    { label: "Insights", href: "#landing-info" },
    { label: "Pricing", href: "#landing-pricing" },
    { label: "FAQ", href: "#landing-faq" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <Container>
        <div className="flex h-[68px] items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            CurEase<span className="text-blue-600">.</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-blue-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 sm:flex">
            <button
              onClick={() => navigate("/sign-in")}
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-blue-700"
            >
              Sign in
            </button>

            <button
              onClick={() => navigate("/sign-in")}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800"
            >
              Get started
            </button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-800 hover:bg-slate-100 sm:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-100 py-4 sm:hidden">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/sign-in");
              }}
              className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white"
            >
              Get started
            </button>
          </nav>
        )}
      </Container>
    </header>
  );
};

// ---------------------------------------------
// Hero
// ---------------------------------------------

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white"
    >
      <Container className="grid min-h-[610px] items-center gap-12 py-20 lg:grid-cols-2 lg:gap-8 lg:py-24">
        <div className="relative z-10">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-xs font-medium text-blue-800">
              <Activity size={14} />
              A smarter approach to healthcare
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.13] tracking-tight text-slate-900 sm:text-5xl lg:text-[60px]">
              Empowering smarter healthcare with{" "}
              <span className="text-blue-700">CurEase.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-500">
              Understand your health better with intelligent
              insights, organized medical records and access
              to personalized care.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/sign-in")}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-800"
              >
                Get started
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/about")}
                className="rounded-lg border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                About CurEase
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck size={17} className="text-blue-700" />
              Your health information deserves care.
            </div>
          </Reveal>
        </div>

        <Reveal className="relative flex items-center justify-center">
          <div className="absolute h-[320px] w-[320px] rounded-full bg-blue-100/60 blur-[90px] sm:h-[430px] sm:w-[430px]" />

          <img
            src="/healthcare.png"
            alt="CurEase healthcare illustration"
            fetchPriority="high"
            className="relative z-10 h-auto max-h-[440px] w-full max-w-[520px] object-contain"
          />
        </Reveal>
      </Container>
    </section>
  );
};

// ---------------------------------------------
// Features
// ---------------------------------------------

const features = [
  {
    icon: Lightbulb,
    title: "Symptom Checker",
    description:
      "Explore possible health conditions by selecting your symptoms.",
  },
  {
    icon: HeartPulse,
    title: "Nutrition Analyzer",
    description:
      "Understand your meals with accessible nutritional insights.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Health Dashboard",
    description:
      "Keep your health reports, analytics and progress together.",
  },
  {
    icon: Rocket,
    title: "Emergency Aid",
    description:
      "Access useful emergency guidance when it matters.",
  },
];

const OurFeatures = () => (
  <section id="features" className="bg-slate-50/80 py-20 sm:py-28">
    <Container>
      <SectionHeading
        eyebrow="What you can do"
        title="Everything you need, in one place."
        description="A collection of tools that make understanding and managing your health simpler."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <Reveal key={feature.title} delay={index * 0.06}>
              <article className="feature-item group h-full rounded-xl border border-slate-200/80 bg-white p-6 transition-colors hover:border-blue-200">
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <h3 className="text-base font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  </section>
);

// ---------------------------------------------
// Why choose CurEase
// ---------------------------------------------

const benefits = [
  {
    number: "01",
    icon: Brain,
    title: "AI Diagnosis",
    description:
      "Symptom analysis and machine-learning-powered health predictions help you explore possible conditions.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Trusted Security",
    description:
      "Your medical information is handled with security and privacy in mind.",
  },
  {
    number: "03",
    icon: Users,
    title: "Doctor Network",
    description:
      "Connect with doctors for consultations, guidance and second opinions.",
  },
];

const WhyChooseUs = () => (
  <section id="why-us" className="bg-white py-20 sm:py-28">
    <Container>
      <SectionHeading
        eyebrow="Why CurEase"
        title="Healthcare should feel simpler."
        description="Bringing useful technology and essential healthcare tools into one connected experience."
      />

      <div className="grid gap-10 border-t border-slate-200 pt-8 md:grid-cols-3 md:gap-8">
        {benefits.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.number} delay={index * 0.08}>
              <article className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-medium tracking-wider text-slate-300">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
                  {item.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  </section>
);

// ---------------------------------------------
// Information sections
// ---------------------------------------------

const InfoSections = () => (
  <section id="landing-info" className="bg-slate-50/80 py-20 sm:py-28">
    <Container className="space-y-24 sm:space-y-32">

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src="/healtcare2.png"
            alt="Healthcare technology"
            loading="lazy"
            className="mx-auto h-auto max-h-[400px] w-full max-w-[480px] object-contain"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Connected healthcare
            </p>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Revolutionizing healthcare, one insight at a time.
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
              Empowering patients and doctors through AI-driven
              insights, automation and real-time analytics to
              make healthcare smarter and more accessible.
            </p>

            <ul className="mt-7 space-y-4">
              {[
                "AI-powered diagnosis for quicker insights",
                "Intelligent medical predictions",
                "Designed for patients and healthcare professionals",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-blue-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Meaningful information
            </p>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Insights that help you understand your health.
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
              CurEase turns your health data into visual
              insights that help you make more informed
              decisions about your health and lifestyle.
            </p>

            <ul className="mt-7 space-y-4">
              {[
                "Analyze nutrition, habits and sleep",
                "View prediction confidence scores",
                "Track daily health trends",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <Activity size={18} className="mt-0.5 shrink-0 text-blue-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <img
            src="/healthcare3.png"
            alt="Health analytics and insights"
            loading="lazy"
            className="mx-auto h-auto max-h-[400px] w-full max-w-[480px] object-contain"
          />
        </Reveal>
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src="https://cdn.devdojo.com/images/november2020/feature-graphic.png"
            alt="Organized health information"
            loading="lazy"
            className="mx-auto h-auto max-h-[380px] w-full max-w-[480px] object-contain"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Your health, simplified
            </p>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Keep everything organized.
            </h2>

            <p className="mt-5 text-sm leading-8 text-slate-500 sm:text-base">
              Keep your reports, appointments and prescriptions
              accessible through a more organized health experience.
            </p>

            <ul className="mt-7 space-y-4">
              {[
                "Manage medical files in one place",
                "Appointment reminders",
                "Personalized wellness dashboard",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <FileText size={18} className="mt-0.5 shrink-0 text-blue-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

    </Container>
  </section>
);

// ---------------------------------------------
// Testimonials
// ---------------------------------------------

const testimonials = [
  {
    name: "John Doe",
    role: "CEO of Something",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80",
    quote:
      "This is a no-brainer if you want to take your business to the next level. If you are looking for the ultimate toolset, this is it!",
  },
  {
    name: "Jane Doe",
    role: "CTO of Business",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&q=80",
    quote:
      "Thanks for creating this service. My life is so much easier. Thanks for making such a great product.",
  },
  {
    name: "John Smith",
    role: "Creator of Stuff",
    image:
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=200&q=80",
    quote:
      "Packed with awesome content and exactly what I was looking for. I would highly recommend it.",
  },
];

const Testimonials = () => (
  <section id="landing-testimonials" className="bg-white py-20 sm:py-28">
    <Container>
      <SectionHeading
        eyebrow="Testimonials"
        title="What people are saying."
        description="A closer look at the experiences shared by our users."
        centered
      />

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.07}>
            <article className="h-full rounded-xl border border-slate-200 p-6 sm:p-7">
              <div className="mb-7 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-600">
                “{item.quote}”
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

// ---------------------------------------------
// Pricing
// ---------------------------------------------

const plans = [
  {
    name: "Basic",
    subtitle: "Health Starter",
    price: "Free",
    period: "Forever",
    description:
      "Get quick AI-powered symptom checks and basic health insights for everyday wellness.",
    featured: false,
  },
  {
    name: "Plus",
    subtitle: "",
    price: "₹100",
    period: "per month",
    description:
      "Unlock unlimited symptom analysis, nutrition scanning and smart health tracking.",
    featured: true,
  },
  {
    name: "Pro",
    subtitle: "",
    price: "₹250",
    period: "per user / month",
    description:
      "Experience AI-driven healthcare with doctor consultations and predictive alerts.",
    featured: false,
  },
];

const PriceSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="landing-pricing"
      className="bg-slate-50/80 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Simple pricing"
          title="Choose what works for you."
          description="Plans to support different healthcare needs."
          centered
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.07}>
              <article
                className={`relative flex h-full flex-col rounded-xl border p-7 sm:p-8 ${
                  plan.featured
                    ? "border-blue-700 bg-white shadow-[0_12px_35px_rgba(30,64,175,0.08)]"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                    Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {plan.name}
                  </h3>

                  {plan.subtitle && (
                    <p className="mt-1 text-xs text-slate-400">
                      {plan.subtitle}
                    </p>
                  )}
                </div>

                <p className="mt-7 min-h-[84px] text-sm leading-7 text-slate-500">
                  {plan.description}
                </p>

                <div className="my-7 flex items-baseline gap-2 border-t border-slate-100 pt-7">
                  <span className="text-4xl font-semibold tracking-tight text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400">
                    {plan.period}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/sign-in")}
                  className={`mt-auto w-full rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                    plan.featured
                      ? "bg-slate-900 text-white hover:bg-blue-800"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Get started
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

// ---------------------------------------------
// FAQ
// ---------------------------------------------

const faqs = [
  {
    question: "How does the symptom analysis feature work?",
    answer:
      "Our system uses machine learning algorithms to analyze your selected symptoms and suggest possible conditions. These insights are intended to support, not replace, professional medical advice.",
  },
  {
    question: "Can I talk to real doctors through this platform?",
    answer:
      "Yes. CurEase provides access to doctors for online consultations, second opinions and personalized health advice.",
  },
  {
    question: "Is my medical data safe and private?",
    answer:
      "CurEase is designed with medical data security and privacy in mind. Please review the platform's privacy policy for details about data handling.",
  },
  {
    question: "How fast can I get results from the symptom checker?",
    answer:
      "The analysis is designed to provide results quickly after you select your symptoms.",
  },
  {
    question: "Can I get treatment or prescriptions here?",
    answer:
      "You can access preliminary health guidance and, where supported, consult doctors regarding treatment and prescriptions.",
  },
  {
    question: "Do I need to install an app to use CurEase?",
    answer:
      "No installation is required for the web experience. You can access CurEase through a supported browser.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="landing-faq"
      className="bg-white py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Frequently asked questions
            </p>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Have a question?
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500">
              Find answers to common questions about using
              CurEase and its healthcare features.
            </p>

            <img
              src="/healthfaq.png"
              alt="Frequently asked questions"
              loading="lazy"
              className="mt-8 hidden h-auto w-full max-w-[320px] object-contain sm:block"
            />
          </Reveal>

          <div className="divide-y divide-slate-200 border-t border-slate-200">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.question} className="py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 text-left"
                  >
                    <span className="text-sm font-semibold leading-6 text-slate-800 sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pt-4 text-sm leading-7 text-slate-500">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

// ---------------------------------------------
// Footer
// ---------------------------------------------

const Footer = () => {
  const socials = [
    {
      label: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/pranayy.c3/",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/pranay-prasad-/",
    },
    {
      label: "GitHub",
      icon: Github,
      href: "https://github.com/pranayvips",
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a
              href="#home"
              className="text-xl font-bold tracking-tight text-slate-900"
            >
              CurEase<span className="text-blue-600">.</span>
            </a>

            <p className="mt-2 text-xs text-slate-400">
              Making healthcare easier to understand.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-200 py-5">
          <p className="text-center text-xs text-slate-400 sm:text-left">
            © {new Date().getFullYear()} CurEase. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

// ---------------------------------------------
// Landing page
// ---------------------------------------------

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-slate-900">
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
