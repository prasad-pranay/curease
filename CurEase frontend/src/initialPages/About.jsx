
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Code2,
  Database,
  Server,
  Smartphone,
  Globe,
  Layers3,
  Brain,
  ShieldCheck,
  Workflow,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ----------------------------------
   Shared animation and layout
---------------------------------- */

const ease = [0.22, 1, 0.36, 1];

function Reveal({
  children,
  className = "",
  delay = 0,
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-900 sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          {description}
        </p>
      )}
    </Reveal>
  );
}

/* ----------------------------------
   Header
---------------------------------- */

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Overview", href: "#hero" },
    { label: "Technology", href: "#tech" },
    { label: "Libraries", href: "#libraries" },
    { label: "Architecture", href: "#architecture" },
    { label: "Developer", href: "#developer" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 borderb border-slate-200/70 bg-[#fafbfc]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2"
        >
          <span className="text-xl font-semibold tracking-[-0.07em] text-slate-900">
            CurEase<span className="text-blue-600">.</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 text-[13px] font-medium text-slate-500 transition-colors hover:text-slate-950"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => navigate("/sign-in")}
            className="group flex items-center gap-2 text-sm font-medium text-slate-800 transition-colors hover:text-blue-600"
          >
            Sign in
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center text-slate-700 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-200 bg-[#fafbfc] md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="border-b border-slate-100 py-3.5 text-sm text-slate-600 hover:text-blue-600"
                >
                  {link.label}
                </motion.a>
              ))}

              <button
                onClick={() => {
                  closeMenu();
                  navigate("/sign-in");
                }}
                className="flex items-center justify-between py-4 text-sm font-medium text-blue-600"
              >
                Sign in <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ----------------------------------
   Hero
---------------------------------- */

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-slate-200/70"
    >
      <div className="mx-auto grid min-h-[610px] max-w-7xl items-center gap-12 px-6 py-24 md:px-10 lg:grid-cols-[1fr_0.65fr] lg:px-16">
        <div>
          <Reveal>
            <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              <span className="h-px w-8 bg-blue-500" />
              Behind the project
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.065em] text-slate-900 sm:text-6xl lg:text-[76px]">
              How CurEase
              <br />
              <span className="text-slate-400">comes together.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-lg text-base leading-8 text-slate-500">
              A closer look at the technologies, libraries and architecture
              behind CurEase — from the interface to the systems powering it.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#tech"
                className="group flex items-center gap-3 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/15"
              >
                Explore the stack
                <ArrowDown
                  size={15}
                  className="transition-transform group-hover:translate-y-1"
                />
              </a>

              <button
                onClick={() => navigate("/sign-in")}
                className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
              >
                Visit CurEase
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative hidden lg:block">
          <div className="relative mx-auto max-w-[390px]">
            <div className="absolute -inset-10 rounded-full bg-blue-100/60 blur-3xl" />

            <div className="relative border border-slate-200 bg-white p-7 shadow-[0_20px_80px_-45px_rgba(30,64,120,0.25)]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <span className="text-sm font-semibold tracking-tight text-slate-800">
                  CurEase / System
                </span>
                <span className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Architecture
                </span>
              </div>

              <div className="space-y-5 py-7">
                {[
                  { icon: Globe, name: "Frontend", detail: "React interface" },
                  { icon: Server, name: "Backend", detail: "Node.js + Express" },
                  { icon: Brain, name: "AI processing", detail: "Python + Flask" },
                  { icon: Database, name: "Data", detail: "MongoDB" },
                ].map((item, index) => (
                  <div key={item.name}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600">
                        <item.icon size={18} strokeWidth={1.7} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.detail}
                        </p>
                      </div>

                      <span className="ml-auto text-xs text-slate-300">
                        0{index + 1}
                      </span>
                    </div>

                    {index !== 3 && (
                      <div className="ml-5 mt-2 h-5 w-px bg-slate-200" />
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 text-xs text-slate-400">
                A simplified view of the system
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-0 right-0 hidden h-px w-1/3 bg-gradient-to-l from-blue-300 to-transparent lg:block" />
    </section>
  );
}

/* ----------------------------------
   Technologies
---------------------------------- */

const technologies = [
  {
    category: "Frontend",
    items: [
      {
        name: "HTML",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "React",
        image: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
      },
      {
        name: "Tailwind CSS",
        image: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      },
      {
        name: "ShadCN UI",
        image: "https://ui.shadcn.com/favicon.ico",
      },
      {
        name: "GSAP",
        image: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
      },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      {
        name: "Node.js",
        image: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
      },
      {
        name: "Express.js",
        image: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
      },
      {
        name: "MongoDB",
        image: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
      },
      {
        name: "Firebase",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "JWT",
        image: "https://jwt.io/img/pic_logo.svg",
      },
    ],
  },
  {
    category: "AI & Other",
    items: [
      {
        name: "Flask",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      },
      {
        name: "Python",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Machine Learning",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/2560px-scikit_learn_logo_small.svg.png",
      },
      {
        name: "GitHub",
        image: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
      },
      {
        name: "Gemini API",
        image: "https://images.seeklogo.com/logo-png/62/2/google-gemini-icon-logo-png_seeklogo-623016.png",
      },
      {
        name: "bcrypt",
        image: "https://cdn-icons-png.flaticon.com/512/2919/2919592.png",
      },
    ],
  },
];

function TechUsed() {
  return (
    <section id="tech" className="scroll-mt-24 border-b border-slate-200/70 py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="01 / Technology stack"
          title="The tools behind the experience."
          description="The core technologies used across the CurEase interface, backend and AI-related functionality."
        />

        <div className="space-y-12">
          {technologies.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 0.05}>
              <div className="grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-[180px_1fr]">
                <h3 className="text-sm font-semibold text-slate-500">
                  {group.category}
                </h3>

                <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
                  {group.items.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-slate-200 bg-white p-2 transition-colors group-hover:border-blue-200">
                        <img
                          src={tech.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <span className="text-xs font-medium text-slate-600 transition-colors group-hover:text-blue-600 sm:text-sm">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------
   Libraries
---------------------------------- */

const libraryTabs = [
  {
    name: "Python",
    number: "01",
    description: "Libraries used for data processing and AI functionality.",
    details: [
      ["NumPy", "Numerical computations and arrays."],
      ["Pandas", "Data analysis and manipulation."],
      ["Scikit-learn", "Machine learning models."],
      ["TensorFlow", "Deep learning and neural networks."],
      ["Flask", "Lightweight backend web framework."],
    ],
  },
  {
    name: "Node.js",
    number: "02",
    description: "Packages used for backend logic and server functionality.",
    details: [
      ["Express.js", "Backend server framework."],
      ["Bcrypt", "Password hashing."],
      ["JWT", "Token-based authentication."],
      ["Mongoose", "MongoDB object modeling."],
      ["Nodemailer", "Sending emails from the Node server."],
    ],
  },
  {
    name: "React",
    number: "03",
    description: "Tools used to build the frontend experience.",
    details: [
      ["React Router", "Navigation and routing."],
      ["Framer Motion", "Interface animations."],
      ["Tailwind CSS", "Responsive UI styling."],
      ["ShadCN UI", "Reusable UI components."],
      ["Axios", "HTTP requests."],
    ],
  },
  {
    name: "Animation",
    number: "04",
    description: "Tools used for scroll behaviour and animation.",
    details: [
      ["Locomotive Scroll", "Scroll behaviour and interaction."],
      ["ScrollTrigger", "Scroll-based animation triggers."],
    ],
  },
];

function LibrariesUsed() {
  const [activeTab, setActiveTab] = useState("Python");

  const activeLibrary = libraryTabs.find(
    (tab) => tab.name === activeTab
  );

  return (
    <section
      id="libraries"
      className="scroll-mt-24 border-b border-slate-200/70 py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="02 / Libraries & frameworks"
          title="The supporting pieces."
          description="A closer look at the packages and frameworks used in different parts of the application."
        />

        <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-20">
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {libraryTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex shrink-0 items-center justify-between gap-5 border-b px-4 py-4 text-left text-sm transition-colors lg:border-b-0 lg:border-l-2 ${
                  activeTab === tab.name
                    ? "border-blue-600 bg-blue-50/60 font-semibold text-blue-700"
                    : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                <span>{tab.name}</span>
                <span className="text-xs text-slate-400">{tab.number}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="min-w-0"
            >
              <div className="mb-8 border-b border-slate-200 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                  {activeLibrary.number} / {activeLibrary.name}
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                  {activeLibrary.name} ecosystem
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {activeLibrary.description}
                </p>
              </div>

              <div>
                {activeLibrary.details.map(([name, description], index) => (
                  <div
                    key={name}
                    className="group flex flex-col gap-2 border-b border-slate-100 py-5 transition-colors hover:bg-blue-50/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs tabular-nums text-slate-300">
                        0{index + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-800">
                        {name}
                      </h4>
                    </div>

                    <p className="pl-8 text-sm text-slate-500 sm:pl-0">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------
   Architecture diagrams
---------------------------------- */

const diagramLayers = [
  {
    name: "Frontend",
    subtitle: "React + Tailwind CSS",
    description:
      "The user-facing interface through which users interact with CurEase.",
    icon: Globe,
  },
  {
    name: "Node.js + Express",
    subtitle: "Core backend",
    description:
      "Authentication, data operations, API routing and application logic.",
    icon: Server,
  },
  {
    name: "Python + Flask",
    subtitle: "AI processing",
    description:
      "Machine learning inference, image and text processing, Gemini API communication.",
    icon: Brain,
  },
  {
    name: "MongoDB",
    subtitle: "Database",
    description:
      "Stores user data, medical history and application records.",
    icon: Database,
  },
];

function ArchitectureDiagram() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-0">
        {diagramLayers.map((layer, index) => (
          <Reveal key={layer.name} delay={index * 0.08}>
            <div className="relative mx-auto max-w-2xl">
              <div className="group flex items-center gap-5 border-b border-slate-200 py-7 transition-colors hover:bg-blue-50/30 sm:gap-8">
                <span className="w-8 shrink-0 text-xs tabular-nums text-slate-300">
                  0{index + 1}
                </span>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <layer.icon size={20} strokeWidth={1.6} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-slate-900">
                    {layer.name}
                  </h3>
                  <p className="mt-1 text-xs text-blue-600">
                    {layer.subtitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {layer.description}
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </div>

              {index !== diagramLayers.length - 1 && (
                <div className="absolute bottom-0 left-[61px] h-3 w-px bg-blue-200" />
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-7 text-xs leading-6 text-slate-400">
        Simplified representation of the application's main technology layers.
      </p>
    </div>
  );
}

const detailedArchitecture = [
  {
    title: "Clients",
    icon: Smartphone,
    items: [
      ["Web", "React • Tailwind • Framer Motion"],
      ["Mobile", "React Native / Flutter (optional)"],
      ["Admin / Dashboard", "React + ShadCN UI / Tailwind"],
    ],
  },
  {
    title: "Edge / API",
    icon: Globe,
    items: [
      ["API Gateway", "Reverse proxy, rate limiting and TLS termination"],
      ["Possible tools", "Nginx / Cloud Load Balancer / Cloudflare"],
    ],
  },
  {
    title: "Application",
    icon: Server,
    items: [
      ["Backend API", "Node.js • Express • REST / GraphQL"],
      ["Authentication", "JWT • bcrypt • OAuth"],
      ["Realtime / Notifications", "WebSockets / Socket.IO • Push"],
    ],
  },
  {
    title: "Machine Learning",
    icon: Brain,
    items: [
      ["ML Service", "Python • Flask / FastAPI"],
      ["Model Ops", "Dockerized models • optional GPU instances • monitoring"],
    ],
  },
  {
    title: "Data & Storage",
    icon: Database,
    items: [
      ["Primary DB", "MongoDB / Atlas"],
      ["File Storage", "Firebase Storage / S3"],
      ["Auth / Identity", "Firebase Auth / Custom JWT"],
    ],
  },
  {
    title: "Infrastructure & DevOps",
    icon: Workflow,
    items: [
      ["Deployment", "Docker • Kubernetes / Cloud Run"],
      ["CI / CD", "GitHub Actions • Tests • Auto-deploy"],
      ["Monitoring", "Prometheus / Grafana • Sentry • Logging"],
      ["Security", "Encryption • Regular audits"],
    ],
  },
];

function DetailedArchitecture() {
  return (
    <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
      {detailedArchitecture.map((group, index) => (
        <Reveal key={group.title} delay={(index % 2) * 0.08}>
          <div className="border-t border-slate-200 pt-5">
            <div className="mb-6 flex items-center gap-3">
              <group.icon size={19} className="text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                {group.title}
              </h3>
            </div>

            <div className="space-y-5">
              {group.items.map(([name, description]) => (
                <div
                  key={name}
                  className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-5"
                >
                  <p className="text-sm font-medium text-slate-800">{name}</p>
                  <p className="max-w-sm text-sm leading-6 text-slate-500 sm:text-right">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Architecture() {
  const [activeTab, setActiveTab] = useState("diagram");

  return (
    <section
      id="architecture"
      className="scroll-mt-24 border-b border-slate-200/70 py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow="03 / System architecture"
          title="How the parts connect."
          description="An overview of the system structure, the communication between services and the supporting infrastructure."
        />

        <div className="mb-12 flex gap-7 border-b border-slate-200">
          {[
            { id: "diagram", label: "Architecture diagram" },
            { id: "detailed", label: "Detailed overview" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-700"
                  : "text-slate-400 hover:text-slate-800"
              }`}
            >
              {tab.label}

              {activeTab === tab.id && (
                <motion.span
                  layoutId="architecture-tab"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "diagram" ? (
              <ArchitectureDiagram />
            ) : (
              <DetailedArchitecture />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ----------------------------------
   Developer
---------------------------------- */

function DeveloperSection() {
  return (
    <section
      id="developer"
      className="scroll-mt-24 border-b border-slate-200/70 py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[0.75fr_1fr] lg:gap-24 lg:px-16">
        <Reveal className="relative mx-auto w-full max-w-[360px]">
          <div className="absolute -bottom-4 -right-4 h-full w-full border border-blue-200" />

          <div className="relative aspect-square overflow-hidden bg-slate-100">
            <img
              src="/me.png"
              alt="Developer portrait"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          <p className="mt-5 text-xs tracking-wide text-slate-400">
            THE PERSON BEHIND CUREASE
          </p>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              About the developer
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl">
              Pranay Prasad<span className="text-blue-600">.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-500">
              Building future-ready applications with modern web technologies.
              CurEase brings together frontend engineering, backend systems
              and AI-powered functionality into one healthcare-focused project.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="https://github.com/prasad-pranay"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
              >
                <Github size={18} />
                GitHub
                <ArrowUpRight size={13} className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/pranay-prasad-/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
              >
                <Linkedin size={18} />
                LinkedIn
                <ArrowUpRight size={13} className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href="mailto:prasadpranay2005@email.com"
                aria-label="Email"
                className="group flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
              >
                <Mail size={18} />
                Email
                <ArrowUpRight size={13} className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------
   Footer
---------------------------------- */

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="overflow-hidden bg-[#fafbfc]">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 md:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-10 border-b border-slate-200 pb-12 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              CurEase
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.065em] text-slate-900 sm:text-6xl">
              Care, made closer.
            </h2>
          </div>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            Back to CurEase
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-7 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} CurEase. All rights reserved.</p>
          <p>Project overview / Technology & architecture</p>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------
   Main page
---------------------------------- */

export default function AboutPage() {
  return (
    <main className="bg-[#fafbfc] text-slate-900 antialiased">
      <Header />

      <Hero />

      <TechUsed />

      <LibrariesUsed />

      <Architecture />

      <DeveloperSection />

      <Footer />
    </main>
  );
}

// import React, { useState } from "react";
// import { Code, Database, Server, Smartphone, Globe } from "lucide-react";
// import { motion } from "framer-motion";
// import { Github, Linkedin, Mail } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function Header(){
//   const navigation = useNavigate()
//   return <nav className="z-[10000] stick top-0 left-0 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 font-medium relative z-10 bg-white/80 backdrop-blur-md">
//         {/* <!-- Logo --> */}
//         {/* <a href="https://prebuiltui.com">
//             <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M47.904 28.28q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.868 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.456.924-3.276.924m-7.196 5.32V14.56h3.08v3.612l-.532 3.276.532 3.248V33.6zm6.692-8.232q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.868.504 1.988.504M56.95 28V14.56h3.08V28zm3.08-7.476-1.064-.532q0-2.548 1.12-4.116 1.148-1.596 3.444-1.596 1.008 0 1.82.364.812.365 1.512 1.176l-2.016 2.072a2.1 2.1 0 0 0-.812-.56 3 3 0 0 0-1.036-.168q-1.287 0-2.128.812-.84.811-.84 2.548m14.156 7.756q-2.016 0-3.64-.896a7 7 0 0 1-2.548-2.52q-.924-1.596-.924-3.584t.924-3.556a6.87 6.87 0 0 1 2.492-2.52q1.596-.924 3.528-.924 1.876 0 3.304.868a6.05 6.05 0 0 1 2.268 2.38q.84 1.512.84 3.444 0 .336-.056.7a7 7 0 0 1-.112.756H69.23v-2.52h9.436l-1.148 1.008q-.056-1.232-.476-2.072a3 3 0 0 0-1.204-1.288q-.756-.448-1.876-.448-1.176 0-2.044.504a3.43 3.43 0 0 0-1.344 1.428q-.476.896-.476 2.156t.504 2.212 1.428 1.484q.924.504 2.128.504 1.037 0 1.904-.364a4 4 0 0 0 1.512-1.064l1.96 1.988a6.3 6.3 0 0 1-2.38 1.736 7.6 7.6 0 0 1-2.968.588m15.91 0q-1.54 0-2.745-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.821 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.869 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.455.924-3.276.924M82.898 28V7.84h3.08v10.024l-.532 3.248.532 3.276V28zm6.692-2.632q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128.001 1.204.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.87.504 1.988.504m15.067 2.912q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.644.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.976-.28V14.56h3.08V28zm1.54-15.904q-.783 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.813 0 1.316.532t.504 1.316q0 .784-.504 1.316t-1.316.532M120.169 28V7.84h3.08V28zm8.552 0V8.96h3.08V28zm-3.22-10.64v-2.8h9.52v2.8zm17.274 10.92q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.785 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532" fill="#050040" />
//                 <path d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585" stroke="#050040" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//         </a> */}
//         <motion.h1 onClick={()=>window.location.href="/"} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="cursor-pointer hover:scale-105 transition-all duration-200 text-2xl font-bold text-slate-800">CUREASE</motion.h1>
//         {/* <!-- Hamburger (Mobile) --> */}
//         <button id="menu-toggle" className="md:hidden text-gray-700 focus:outline-none">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
//                 strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//         </button>

//         {/* <!-- Nav Links --> */}
//         <ul id="nav-menu" className="hidden max-md:absolute top-full left-0 max-md:w-full md:flex md:items-center gap-8 max-md:bg-white max-md:shadow-md max-md:px-6 max-md:py-4 flex-col md:flex-row z-50">
//             <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#hero">Home</a></motion.li>
//             <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#tech">Tech Used</a></motion.li>
//             <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#libraries">Libraries</a></motion.li>
//             <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#architecture">Arhitecture</a></motion.li>
//             <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#developer">Developer</a></motion.li>

//             {/* <!-- Login button for mobile --> */}
//             <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="block md:hidden mt-4">
//                 <button className="group flex items-center gap-2">
//                     Log In
//                     <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
//                         fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
//                             strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                 </button>
//             </motion.li>
//         </ul>

//         {/* <!-- Login button for desktop --> */}
//         <motion.button onClick={()=>navigation("/sign-in")} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="group hidden md:flex items-center gap-2">
//             Log In
//             <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
//                 fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"
//                     strokeLinejoin="round" />
//             </svg>
//         </motion.button>
//     </nav>
// }

// function Hero(){
//   const navigation = useNavigate()
//   return<div id="hero" className="h-[580px] flex flex-col items-center justify-center px-4 text-center">
//         <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-sm text-gray-800 max-w-full">
//             <p>Explore My Other Project's.</p>
//             <div onClick={()=>window.open("https://pranay-portfolio-gamma.vercel.app/")} className="flex items-center cursor-pointer gap-2 bg-white border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap">
//                 <p>Explore</p>
//                 <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
//                         strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//             </div>
//         </motion.div>

//         <motion.h1 initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">How This Project Was Made</motion.h1>
//         <motion.p initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="max-w-xl text-center mt-6 px-4">Start scolling down or click any of the link on navbar.</motion.p>
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
//             <motion.button initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="px-7 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium">Explore</motion.button>
//             <motion.button onClick={()=>navigation("/sign-in")} initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="group px-7 py-2.5 flex items-center gap-2 font-medium">
//                 Log In
//                 <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
//                     fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
//                         strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//             </motion.button>
//         </div>
//     </div>
// }

// const TechnicalArchitectureDetailed = () => {
//   return (
//     <div className="min-h-screen max-w-7xl mx-auto antialiased text-slate-800 relative">
//         {/* Architecture Canvas */}
//           {/* Top: Client / Frontend */}
//           <section className="flex flex-col md:flex-row items-stretch gap-6">
//             {/* Clients */}
//             <div className="flex-1">
//               <h2 className="text-sm uppercase text-gray-500 mb-3">Clients</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
//                   <div className="font-semibold">Web</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     React • Tailwind • Framer Motion
//                   </div>
//                 </motion.div>
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
//                   <div className="font-semibold">Mobile</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     React Native / Flutter (optional)
//                   </div>
//                 </motion.div>
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
//                   <div className="font-semibold">Admin / Dashboard</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     React + ShadCN UI / Tailwind
//                   </div>
//                 </motion.div>
//               </div>
//             </div>

//             {/* API Gateway */}
//             <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="w-full md:w-72">
//               <h2 className="text-sm uppercase text-gray-500 mb-3">
//                 Edge / API
//               </h2>
//               <div className="p-4 rounded-lg border border-gray-200 ">
//                 <div className="font-semibold">API Gateway</div>
//                 <div className="text-xs text-gray-600 mt-2">
//                   Reverse proxy / rate limiting / TLS termination <br />
//                   Nginx / Cloud Load Balancer / Cloudflare
//                 </div>
//               </div>
//             </motion.div>
//           </section>

//           {/* Arrow from Clients to Gateway */}
//           <svg
//             className="absolute inset-0 w-full h-12 md:h-24 pointer-events-none"
//             style={{ top: "78px", left: "0" }}
//           >
//             <defs>
//               <marker
//                 id="arrow"
//                 viewBox="0 0 10 10"
//                 refX="8"
//                 refY="5"
//                 markerWidth="6"
//                 markerHeight="6"
//                 orient="auto-start-reverse"
//               >
//                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#9CA3AF" />
//               </marker>
//             </defs>
//             <line
//               x1="12%"
//               y1="68"
//               x2="58%"
//               y2="68"
//               stroke="#9CA3AF"
//               strokeWidth="1.5"
//               markerEnd="url(#arrow)"
//             />
//           </svg>

//           {/* Middle: Backend, ML, Data */}
//           <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Backend */}
//             <div>
//               <h3 className="text-sm uppercase text-gray-500 mb-3">
//                 Application
//               </h3>
//               <div className="space-y-4">
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200">
//                   <div className="font-semibold">Backend API</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     Node.js • Express • REST / GraphQL
//                   </div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     Handles routing, business logic, validation
//                   </div>
//                 </motion.div>
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200">
//                   <div className="font-semibold">Authentication</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     JWT • bcrypt • OAuth (social logins)
//                   </div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     User sessions, tokens, access control
//                   </div>
//                 </motion.div>
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200">
//                   <div className="font-semibold">Realtime / Notifications</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     WebSockets / Socket.IO • Push
//                   </div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     Live consults, status, notifications
//                   </div>
//                 </motion.div>
//               </div>
//             </div>

//             {/* ML Service */}
//             <div>
//               <h3 className="text-sm uppercase text-gray-500 mb-3">
//                 Machine Learning
//               </h3>
//               <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200">
//                 <div className="font-semibold">ML Service</div>
//                 <div  className="text-sm text-gray-600 mt-1">
//                   Python • Flask / FastAPI
//                 </div>
//                 <div className="text-xs text-gray-500 mt-2">
//                   Symptom analysis models, inference API, model versioning
//                 </div>
//                 <div className="mt-3">
//                   <div className="text-xs font-medium text-gray-700">
//                     Model Ops
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Dockerized models • optional GPU instances • monitoring
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Data / Storage */}
//             <div>
//               <h3 className="text-sm uppercase text-gray-500 mb-3">
//                 Data & Storage
//               </h3>
//               <div className="space-y-4">
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
//                   <div className="font-semibold">Primary DB</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     MongoDB / Atlas
//                   </div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     Patients, records, logs, app data
//                   </div>
//                 </motion.div>
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
//                   <div className="font-semibold">File Storage</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     Firebase Storage / S3
//                   </div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     Medical images, reports, attachments
//                   </div>
//                 </motion.div>
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
//                   <div className="font-semibold">Auth / Identity</div>
//                   <div className="text-sm text-gray-600 mt-1">
//                     Firebase Auth / Custom JWT
//                   </div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     Secure sign-in and multi-factor
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </section>

//           {/* Connectors */}
//           <svg
//             className="absolute w-full pointer-events-none"
//             style={{ height: "160px", top: "240px" }}
//           >
//             <defs>
//               <marker
//                 id="arrow2"
//                 viewBox="0 0 10 10"
//                 refX="8"
//                 refY="5"
//                 markerWidth="6"
//                 markerHeight="6"
//                 orient="auto"
//               >
//                 <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
//               </marker>
//             </defs>
//             <line
//               x1="55"
//               y1="20"
//               x2="260"
//               y2="20"
//               stroke="#cbd5e1"
//               strokeWidth="1.5"
//               markerEnd="url(#arrow2)"
//             />
//             <line
//               x1="55%"
//               y1="20"
//               x2="52%"
//               y2="20"
//               stroke="#cbd5e1"
//               strokeWidth="1.5"
//               markerEnd="url(#arrow2)"
//             />
//             <line
//               x1="75%"
//               y1="20"
//               x2="88%"
//               y2="20"
//               stroke="#cbd5e1"
//               strokeWidth="1.5"
//               markerEnd="url(#arrow2)"
//             />
//           </svg>

//           {/* Infrastructure */}
//           <section className="mt-12 border-t pt-6">
//             <h3 className="text-sm uppercase text-gray-500 mb-3">
//               Infrastructure & DevOps
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {[
//                 {
//                   title: "Deployment",
//                   desc: "Docker • Kubernetes / Cloud Run",
//                 },
//                 {
//                   title: "CI / CD",
//                   desc: "GitHub Actions • Tests • Auto-deploy",
//                 },
//                 {
//                   title: "Monitoring",
//                   desc: "Prometheus / Grafana • Sentry • Logging",
//                 },
//                 {
//                   title: "Security & Compliance",
//                   desc: "Encryption (at-rest & in-transit) • Regular audits",
//                 },
//               ].map((item, i) => (
//                 <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}}
//                   key={i}
//                   className="p-4 rounded-lg border border-gray-200 "
//                 >
//                   <div className="font-semibold">{item.title}</div>
//                   <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </section>

//           {/* Footer */}
//           <footer className="mt-6 text-sm text-gray-500">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//               <div>
//                 <strong className="text-gray-700">Notes:</strong>
//                 <span className="ml-2">
//                   This is a high-level diagram. Scale components (e.g., ML on
//                   GPU instances, DB replicas) as per traffic & compliance.
//                 </span>
//               </div>
//               <div className="text-xs text-gray-500">
//                 Icons / logos removed for clarity — replace with logos if
//                 desired.
//               </div>
//             </div>
//           </footer>
//         </div>
//   );
// };

// const DeveloperSection = () => {
//   return (
//     <section
//       id="developer"
//       className="relative min-h-screen flex items-center justify-center px-6 py-20"
//     >
//       {/* Floating gradient glow */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 via-transparent to-pink-200 opacity-40 blur-3xl -z-10" />

//       <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
//         {/* Image */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="relative group"
//         >
//           <img
//             src="https://avatars.githubusercontent.com/u/148135405?v=4"
//             alt="Developer"
//             className="rounded-2xl w-64 h-64 object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
//         </motion.div>

//         {/* Info */}
//         <motion.div
//           initial={{ x: 50, opacity: 0 }}
//           whileInView={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="flex flex-col items-center md:items-start text-center md:text-left"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
//             Pranay Prasad
//           </h2>
//           <p className="text-lg text-slate-500 font-medium mb-6">
//             Building future-ready apps with modern web technologies.
//           </p>

//           <div className="flex items-center gap-5">
//             <a
//               href="https://github.com/pranayvips"
//               className="p-3 bg-slate-200 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
//             >
//               <Github size={22} />
//             </a>
//             <a
//               href="https://www.linkedin.com/in/pranay-prasad-/"
//               className="p-3 bg-slate-200 hover:bg-blue-700 hover:text-white rounded-full transition-colors"
//             >
//               <Linkedin size={22} />
//             </a>
//             <a
//               href="mailto:prasadpranay2005@email.com"
//               className="p-3 bg-slate-200 hover:bg-red-600 hover:text-white rounded-full transition-colors"
//             >
//               <Mail size={22} />
//             </a>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// const TechnicalArchitecture = () => {
//   return (
//     <section className=" py-20 px-6 md:px-16" id="architecture">
//       <div className="max-full mx-auto text-center mb-16">
//         <motion.p initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-gray-600 text-lg max-w-3xl mx-auto">
//           A modern dual-backend architecture where <span className="font-semibold text-blue-600">React</span> frontend communicates with both 
//           <span className="font-semibold text-green-600"> Node.js</span> and 
//           <span className="font-semibold text-yellow-600"> Flask</span> servers for data, authentication, and AI processing.
//         </motion.p>
//       </div>

//       <div className="relative flex flex-col items-center space-y-10">
//         {/* Frontend */}
//         <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className=" border border-gray-200 rounded-2xl px-10 py-6 w-[90%] md:w-[60%] text-center backdrop-blur-lg">
//           <h3 className="text-2xl font-bold text-blue-600">Frontend (React + Tailwind CSS)</h3>
//           <p className="text-gray-600 mt-2">
//             User interacts with the web app — sends requests to both backends based on the operation type.
//           </p>
//         </motion.div>

//         {/* Down Arrow */}
//         <div className="flex flex-col items-center">
//           <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
//           <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400"></div>
//         </div>

//         {/* Backend Layer */}
//         <div className="grid md:grid-cols-2 gap-8 w-[90%] md:w-[80%]">
//           {/* Node.js Backend */}
//           <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="relative  border border-gray-200 backdrop-blur-lg rounded-2xl p-6">
//             <h3 className="text-xl font-semibold text-green-700 mb-2">🟢 Node.js + Express.js</h3>
//             <p className="text-gray-600 mb-3">Handles all core backend logic and communication with MongoDB.</p>
//             <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
//               <li>Authentication (JWT, bcrypt)</li>
//               <li>Data storage & retrieval</li>
//               <li>API routing and validation</li>
//               <li>Integration with frontend</li>
//             </ul>

//             {/* Arrow to Database */}
//             <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
//               <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
//               <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400"></div>
//             </div>
//           </motion.div>

//           {/* Flask Backend */}
//           <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="relative  border border-gray-200 backdrop-blur-lg rounded-2xl p-6 ">
//             <h3 className="text-xl font-semibold text-yellow-700 mb-2">🟡 Flask (Python)</h3>
//             <p className="text-gray-600 mb-3">Handles AI, ML, and image-based requests, integrated with Gemini API.</p>
//             <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
//               <li>Machine learning model inference</li>
//               <li>Image & text processing</li>
//               <li>Gemini API communication</li>
//               <li>ML-powered disease prediction</li>
//             </ul>
//           </motion.div>
//         </div>

//         {/* Arrows Down */}
//         <div className="flex justify-center items-center space-x-20 mt-10">
//           <div className="flex flex-col items-center">
//             <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
//             <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400"></div>
//           </div>
//           <div className="flex flex-col items-center">
//             <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
//             <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400"></div>
//           </div>
//         </div>

//         {/* Bottom Layer */}
//         <div className="grid md:grid-cols-2 gap-8 w-[90%] md:w-[70%]">
//           {/* MongoDB */}
//           <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="border border-gray-200 rounded-2xl p-6 text-center ">
//             <h3 className="text-xl font-semibold text-green-700">🗄️ MongoDB Database</h3>
//             <p className="text-gray-600 mt-2">
//               Stores all user data, medical history, and app records securely.
//             </p>
//           </motion.div>

//           {/* Gemini API */}
//           <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="border border-gray-200 rounded-2xl p-6 text-center ">
//             <h3 className="text-xl font-semibold text-purple-700">🤖 Gemini API</h3>
//             <p className="text-gray-600 mt-2">
//               Connected through Flask for advanced AI tasks like medical reasoning & image understanding.
//             </p>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };


// function TechUsed(){

//   const Tech = [
// {
//     name: "HTML",
//     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
//   },
//   {
//     name: "React",
//     image: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
//   },
//   {
//     name: "Tailwind CSS",
//     image: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
//   },
//   {
//     name: "Node.js",
//     image: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
//   },
//   {
//     name: "Express.js",
//     image: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
//   },
//   {
//     name: "MongoDB",
//     image: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
//   },
//   {
//     name: "Flask",
//     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
//   },
//   {
//     name: "Python",
//     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
//   },
//   {
//     name: "Machine Learning",
//     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/2560px-Scikit_learn_logo_small.svg.png",
//   },
//   {
//     name: "Firebase",
//     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
//   },
//   {
//     name: "ShadCN UI",
//     image: "https://ui.shadcn.com/favicon.ico",
//   },
//   {
//     name: "GSAP",
//     image: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
//   },
//   {
//     name: "GitHub",
//     image: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
//   },
//   {
//     name: "Firebase",
//     image: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
//   },
//   {
//     name: "JWT",
//     image: "https://jwt.io/img/pic_logo.svg",
//   },
//   {
//     name: "bcrypt",
//     image: "https://cdn-icons-png.flaticon.com/512/2919/2919592.png",
//   },
//   {
//     name: "Gemini API",
//     image: "https://images.seeklogo.com/logo-png/62/2/google-gemini-icon-logo-png_seeklogo-623016.png",
//   },
//   ]
//   return <section id="tech" className="py-20 h-screen">
//          <div className="max-w-6xl mx-auto px-6 text-center">
//            <motion.h2 initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-7xl font-bold mb-20 text-gray-900">
//              Technologies Used
//            </motion.h2>

//            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 items-center">
//              {Tech.map((tech, i) => (
//               <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}}
//                 key={i}
//                 className="flex flex-col items-center hover:scale-105 transition"
//               >
//                 <img src={tech.image} alt={tech.name} className="w-16 h-16 mb-3" />
//                 <p className="text-gray-700 font-medium">{tech.name}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//   </section>
// }


// const LibrariesUsed = () => {
//   const tabs = [
//     {
//       name: "Python Libraries",
//       details: [
//         "🐍 NumPy – Numerical computations and arrays.",
//         "📊 Pandas – Data analysis and manipulation.",
//         "🤖 Scikit-learn – Machine learning models.",
//         "🧠 TensorFlow – Deep learning and neural networks.",
//         "🧪 Flask – Lightweight backend web framework."
//       ],
//     },
//     {
//       name: "Node Js Libraries",
//       details: [
//         "⚙️ Express.js – Simplified backend server framework.",
//         "🔐 Bcrypt – Secure password hashing.",
//         "🪶 JWT – Token-based authentication.",
//         "💾 Mongoose – MongoDB object modeling.",
//         "📦 Nodemailer – Send emails from Node server."
//       ],
//     },
//     {
//       name: "React Js Libraries",
//       details: [
//         "⚛️ React Router – Navigation and routing.",
//         "💨 Framer Motion – Smooth animations.",
//         "🎨 Tailwind CSS – Fast, responsive UI styling.",
//         "🧱 ShadCN UI – Prebuilt modern UI components.",
//         "🌐 Axios – Simplified HTTP requests."
//       ],
//     },
//     {
//       name: "Javascript Frameworks",
//       details: [
//         "⚡ Locomotive Scroll js – Scrollbar controlling js.",
//         "🔥 Scroll Trigger – Trigger animations on based on user scroll and visibility.",
//       ],
//     },
//   ];

//   const [activeTab, setActiveTab] = useState(tabs[0].name);

//   return (
//     <div id="libraries" className="max-w-7xl mx-auto p-6 h-screen flex flex-col items-cente justify-center ">
//       <motion.h1 initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-7xl font-bold mb-15 text-center text-gray-800">
//         📚 Technology Libraries & Frameworks
//       </motion.h1>

//       {/* Tabs */}
//       <div className="flex justify-center gap-3 mb-6 backdrop-blur-lg shadow-sm px-10 py-2">
//         {tabs.map((tab) => (
//           <motion.button
//           initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}}
//             key={tab.name}
//             onClick={() => setActiveTab(tab.name)}
//             className={`px-5 py-2 w-full rounded-sm font-medium transition-all duration-300 cursor-pointer active:scale-90 ${
//               activeTab === tab.name
//                 ? "bg-black text-white"
//                 : " text-gray-700 hover:bg-black/10"
//             }`}
//           >
//             {tab.name}
//           </motion.button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="p-5 border border-gray-200 rounded-xs shadow-sm backdrop-blur-lg">
//         {tabs
//           .filter((tab) => tab.name === activeTab)
//           .map((tab) => (
//             <div key={tab.name}>
//               <motion.h2 initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-3xl font-semibold mb-7 text-slate-800">
//                 {tab.name}
//               </motion.h2>
//               <ul className="list-disc list-inside text-gray-700 text-lg">
//                 {tab.details.map((item, i) => (
//                   <motion.li initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} key={i} className="hover:translate-x-2 py-2 transition-transform">
//                     {item}
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };



// function Architecture(){
//   const [tab,setTab] = useState(true)
//   return <main id="architecture" className="flex flex-col justify-center items-center mt-20">
//     <div className="flex sticky top-0 left-0 z-[1000] w-full max-w-7xl py-2 px-10 gap-10 backdrop-blur-lg">
//       <motion.p initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className={`text-base font-semibold w-full py-5 text-center rounded-sm ${tab ? "bg-black text-white backdrop-blur-lg":"hover:bg-black/10"}`} onClick={()=>setTab(true)}>Diagram Architecture</motion.p>
//       <motion.p initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className={`text-base font-semibold w-full py-5 text-center rounded-sm ${!tab ? "bg-black text-white backdrop-blur-lg":"hover:bg-black/10"}`} onClick={()=>setTab(false)}>Detailed Architecture</motion.p>
//     </div>

//     <section className="w-7xl">
//       {tab?
//       <TechnicalArchitecture/>:
//       <TechnicalArchitectureDetailed/>
//     }
//     </section>

//   </main>
// }

// const AboutPage = () => {
//   return (
//     <main className="bg-white">
//     <section className="h-screen overflow-y-scroll bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] text-sm text-gray-500">
//       <Header/>
//       <Hero/>
//       <TechUsed/>
//       <LibrariesUsed/>
//       <Architecture/>
//       <DeveloperSection/>
//     </section>
//     </main>
//   );
// };

// export default AboutPage;
