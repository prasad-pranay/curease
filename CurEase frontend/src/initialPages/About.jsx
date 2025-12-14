import React, { useState } from "react";
import { Code, Database, Server, Smartphone, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header(){
  const navigation = useNavigate()
  return <nav className="z-[10000] stick top-0 left-0 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 font-medium relative z-10 bg-white/80 backdrop-blur-md">
        {/* <!-- Logo --> */}
        {/* <a href="https://prebuiltui.com">
            <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.904 28.28q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.868 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.456.924-3.276.924m-7.196 5.32V14.56h3.08v3.612l-.532 3.276.532 3.248V33.6zm6.692-8.232q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.868.504 1.988.504M56.95 28V14.56h3.08V28zm3.08-7.476-1.064-.532q0-2.548 1.12-4.116 1.148-1.596 3.444-1.596 1.008 0 1.82.364.812.365 1.512 1.176l-2.016 2.072a2.1 2.1 0 0 0-.812-.56 3 3 0 0 0-1.036-.168q-1.287 0-2.128.812-.84.811-.84 2.548m14.156 7.756q-2.016 0-3.64-.896a7 7 0 0 1-2.548-2.52q-.924-1.596-.924-3.584t.924-3.556a6.87 6.87 0 0 1 2.492-2.52q1.596-.924 3.528-.924 1.876 0 3.304.868a6.05 6.05 0 0 1 2.268 2.38q.84 1.512.84 3.444 0 .336-.056.7a7 7 0 0 1-.112.756H69.23v-2.52h9.436l-1.148 1.008q-.056-1.232-.476-2.072a3 3 0 0 0-1.204-1.288q-.756-.448-1.876-.448-1.176 0-2.044.504a3.43 3.43 0 0 0-1.344 1.428q-.476.896-.476 2.156t.504 2.212 1.428 1.484q.924.504 2.128.504 1.037 0 1.904-.364a4 4 0 0 0 1.512-1.064l1.96 1.988a6.3 6.3 0 0 1-2.38 1.736 7.6 7.6 0 0 1-2.968.588m15.91 0q-1.54 0-2.745-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.821 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.869 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.455.924-3.276.924M82.898 28V7.84h3.08v10.024l-.532 3.248.532 3.276V28zm6.692-2.632q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128.001 1.204.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.87.504 1.988.504m15.067 2.912q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.644.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.976-.28V14.56h3.08V28zm1.54-15.904q-.783 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.813 0 1.316.532t.504 1.316q0 .784-.504 1.316t-1.316.532M120.169 28V7.84h3.08V28zm8.552 0V8.96h3.08V28zm-3.22-10.64v-2.8h9.52v2.8zm17.274 10.92q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.785 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532" fill="#050040" />
                <path d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585" stroke="#050040" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </a> */}
        <motion.h1 onClick={()=>window.location.href="/"} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="cursor-pointer hover:scale-105 transition-all duration-200 text-2xl font-bold text-slate-800">CUREASE</motion.h1>
        {/* <!-- Hamburger (Mobile) --> */}
        <button id="menu-toggle" className="md:hidden text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        {/* <!-- Nav Links --> */}
        <ul id="nav-menu" className="hidden max-md:absolute top-full left-0 max-md:w-full md:flex md:items-center gap-8 max-md:bg-white max-md:shadow-md max-md:px-6 max-md:py-4 flex-col md:flex-row z-50">
            <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#hero">Home</a></motion.li>
            <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#tech">Tech Used</a></motion.li>
            <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#libraries">Libraries</a></motion.li>
            <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#architecture">Arhitecture</a></motion.li>
            <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} ><a className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition" href="#developer">Developer</a></motion.li>

            {/* <!-- Login button for mobile --> */}
            <motion.li initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="block md:hidden mt-4">
                <button className="group flex items-center gap-2">
                    Log In
                    <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </motion.li>
        </ul>

        {/* <!-- Login button for desktop --> */}
        <motion.button onClick={()=>navigation("/sign-in")} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="group hidden md:flex items-center gap-2">
            Log In
            <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>
        </motion.button>
    </nav>
}

function Hero(){
  const navigation = useNavigate()
  return<div id="hero" className="h-[580px] flex flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-sm text-gray-800 max-w-full">
            <p>Explore My Other Project's.</p>
            <div onClick={()=>window.open("https://pranay-portfolio-gamma.vercel.app/")} className="flex items-center cursor-pointer gap-2 bg-white border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap">
                <p>Explore</p>
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </motion.div>

        <motion.h1 initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">How This Project Was Made</motion.h1>
        <motion.p initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="max-w-xl text-center mt-6 px-4">Start scolling down or click any of the link on navbar.</motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <motion.button initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="px-7 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium">Explore</motion.button>
            <motion.button onClick={()=>navigation("/sign-in")} initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="group px-7 py-2.5 flex items-center gap-2 font-medium">
                Log In
                <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.button>
        </div>
    </div>
}

const TechnicalArchitectureDetailed = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto antialiased text-slate-800 relative">
        {/* Architecture Canvas */}
          {/* Top: Client / Frontend */}
          <section className="flex flex-col md:flex-row items-stretch gap-6">
            {/* Clients */}
            <div className="flex-1">
              <h2 className="text-sm uppercase text-gray-500 mb-3">Clients</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
                  <div className="font-semibold">Web</div>
                  <div className="text-sm text-gray-600 mt-1">
                    React • Tailwind • Framer Motion
                  </div>
                </motion.div>
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
                  <div className="font-semibold">Mobile</div>
                  <div className="text-sm text-gray-600 mt-1">
                    React Native / Flutter (optional)
                  </div>
                </motion.div>
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
                  <div className="font-semibold">Admin / Dashboard</div>
                  <div className="text-sm text-gray-600 mt-1">
                    React + ShadCN UI / Tailwind
                  </div>
                </motion.div>
              </div>
            </div>

            {/* API Gateway */}
            <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="w-full md:w-72">
              <h2 className="text-sm uppercase text-gray-500 mb-3">
                Edge / API
              </h2>
              <div className="p-4 rounded-lg border border-gray-200 ">
                <div className="font-semibold">API Gateway</div>
                <div className="text-xs text-gray-600 mt-2">
                  Reverse proxy / rate limiting / TLS termination <br />
                  Nginx / Cloud Load Balancer / Cloudflare
                </div>
              </div>
            </motion.div>
          </section>

          {/* Arrow from Clients to Gateway */}
          <svg
            className="absolute inset-0 w-full h-12 md:h-24 pointer-events-none"
            style={{ top: "78px", left: "0" }}
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#9CA3AF" />
              </marker>
            </defs>
            <line
              x1="12%"
              y1="68"
              x2="58%"
              y2="68"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
            />
          </svg>

          {/* Middle: Backend, ML, Data */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Backend */}
            <div>
              <h3 className="text-sm uppercase text-gray-500 mb-3">
                Application
              </h3>
              <div className="space-y-4">
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold">Backend API</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Node.js • Express • REST / GraphQL
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Handles routing, business logic, validation
                  </div>
                </motion.div>
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold">Authentication</div>
                  <div className="text-sm text-gray-600 mt-1">
                    JWT • bcrypt • OAuth (social logins)
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    User sessions, tokens, access control
                  </div>
                </motion.div>
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold">Realtime / Notifications</div>
                  <div className="text-sm text-gray-600 mt-1">
                    WebSockets / Socket.IO • Push
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Live consults, status, notifications
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ML Service */}
            <div>
              <h3 className="text-sm uppercase text-gray-500 mb-3">
                Machine Learning
              </h3>
              <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200">
                <div className="font-semibold">ML Service</div>
                <div  className="text-sm text-gray-600 mt-1">
                  Python • Flask / FastAPI
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Symptom analysis models, inference API, model versioning
                </div>
                <div className="mt-3">
                  <div className="text-xs font-medium text-gray-700">
                    Model Ops
                  </div>
                  <div className="text-xs text-gray-500">
                    Dockerized models • optional GPU instances • monitoring
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Data / Storage */}
            <div>
              <h3 className="text-sm uppercase text-gray-500 mb-3">
                Data & Storage
              </h3>
              <div className="space-y-4">
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
                  <div className="font-semibold">Primary DB</div>
                  <div className="text-sm text-gray-600 mt-1">
                    MongoDB / Atlas
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Patients, records, logs, app data
                  </div>
                </motion.div>
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
                  <div className="font-semibold">File Storage</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Firebase Storage / S3
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Medical images, reports, attachments
                  </div>
                </motion.div>
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="p-4 rounded-lg border border-gray-200 ">
                  <div className="font-semibold">Auth / Identity</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Firebase Auth / Custom JWT
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Secure sign-in and multi-factor
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Connectors */}
          <svg
            className="absolute w-full pointer-events-none"
            style={{ height: "160px", top: "240px" }}
          >
            <defs>
              <marker
                id="arrow2"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
              </marker>
            </defs>
            <line
              x1="55"
              y1="20"
              x2="260"
              y2="20"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              markerEnd="url(#arrow2)"
            />
            <line
              x1="55%"
              y1="20"
              x2="52%"
              y2="20"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              markerEnd="url(#arrow2)"
            />
            <line
              x1="75%"
              y1="20"
              x2="88%"
              y2="20"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              markerEnd="url(#arrow2)"
            />
          </svg>

          {/* Infrastructure */}
          <section className="mt-12 border-t pt-6">
            <h3 className="text-sm uppercase text-gray-500 mb-3">
              Infrastructure & DevOps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  title: "Deployment",
                  desc: "Docker • Kubernetes / Cloud Run",
                },
                {
                  title: "CI / CD",
                  desc: "GitHub Actions • Tests • Auto-deploy",
                },
                {
                  title: "Monitoring",
                  desc: "Prometheus / Grafana • Sentry • Logging",
                },
                {
                  title: "Security & Compliance",
                  desc: "Encryption (at-rest & in-transit) • Regular audits",
                },
              ].map((item, i) => (
                <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}}
                  key={i}
                  className="p-4 rounded-lg border border-gray-200 "
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-6 text-sm text-gray-500">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <strong className="text-gray-700">Notes:</strong>
                <span className="ml-2">
                  This is a high-level diagram. Scale components (e.g., ML on
                  GPU instances, DB replicas) as per traffic & compliance.
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Icons / logos removed for clarity — replace with logos if
                desired.
              </div>
            </div>
          </footer>
        </div>
  );
};

const DeveloperSection = () => {
  return (
    <section
      id="developer"
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
    >
      {/* Floating gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 via-transparent to-pink-200 opacity-40 blur-3xl -z-10" />

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <img
            src="https://avatars.githubusercontent.com/u/148135405?v=4"
            alt="Developer"
            className="rounded-2xl w-64 h-64 object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            Pranay Prasad
          </h2>
          <p className="text-lg text-slate-500 font-medium mb-6">
            Building future-ready apps with modern web technologies.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/pranayvips"
              className="p-3 bg-slate-200 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/pranay-prasad-/"
              className="p-3 bg-slate-200 hover:bg-blue-700 hover:text-white rounded-full transition-colors"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:prasadpranay2005@email.com"
              className="p-3 bg-slate-200 hover:bg-red-600 hover:text-white rounded-full transition-colors"
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TechnicalArchitecture = () => {
  return (
    <section className=" py-20 px-6 md:px-16" id="architecture">
      <div className="max-full mx-auto text-center mb-16">
        <motion.p initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-gray-600 text-lg max-w-3xl mx-auto">
          A modern dual-backend architecture where <span className="font-semibold text-blue-600">React</span> frontend communicates with both 
          <span className="font-semibold text-green-600"> Node.js</span> and 
          <span className="font-semibold text-yellow-600"> Flask</span> servers for data, authentication, and AI processing.
        </motion.p>
      </div>

      <div className="relative flex flex-col items-center space-y-10">
        {/* Frontend */}
        <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className=" border border-gray-200 rounded-2xl px-10 py-6 w-[90%] md:w-[60%] text-center backdrop-blur-lg">
          <h3 className="text-2xl font-bold text-blue-600">Frontend (React + Tailwind CSS)</h3>
          <p className="text-gray-600 mt-2">
            User interacts with the web app — sends requests to both backends based on the operation type.
          </p>
        </motion.div>

        {/* Down Arrow */}
        <div className="flex flex-col items-center">
          <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400"></div>
        </div>

        {/* Backend Layer */}
        <div className="grid md:grid-cols-2 gap-8 w-[90%] md:w-[80%]">
          {/* Node.js Backend */}
          <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="relative  border border-gray-200 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">🟢 Node.js + Express.js</h3>
            <p className="text-gray-600 mb-3">Handles all core backend logic and communication with MongoDB.</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Authentication (JWT, bcrypt)</li>
              <li>Data storage & retrieval</li>
              <li>API routing and validation</li>
              <li>Integration with frontend</li>
            </ul>

            {/* Arrow to Database */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400"></div>
            </div>
          </motion.div>

          {/* Flask Backend */}
          <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="relative  border border-gray-200 backdrop-blur-lg rounded-2xl p-6 ">
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">🟡 Flask (Python)</h3>
            <p className="text-gray-600 mb-3">Handles AI, ML, and image-based requests, integrated with Gemini API.</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Machine learning model inference</li>
              <li>Image & text processing</li>
              <li>Gemini API communication</li>
              <li>ML-powered disease prediction</li>
            </ul>
          </motion.div>
        </div>

        {/* Arrows Down */}
        <div className="flex justify-center items-center space-x-20 mt-10">
          <div className="flex flex-col items-center">
            <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400"></div>
          </div>
        </div>

        {/* Bottom Layer */}
        <div className="grid md:grid-cols-2 gap-8 w-[90%] md:w-[70%]">
          {/* MongoDB */}
          <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="border border-gray-200 rounded-2xl p-6 text-center ">
            <h3 className="text-xl font-semibold text-green-700">🗄️ MongoDB Database</h3>
            <p className="text-gray-600 mt-2">
              Stores all user data, medical history, and app records securely.
            </p>
          </motion.div>

          {/* Gemini API */}
          <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="border border-gray-200 rounded-2xl p-6 text-center ">
            <h3 className="text-xl font-semibold text-purple-700">🤖 Gemini API</h3>
            <p className="text-gray-600 mt-2">
              Connected through Flask for advanced AI tasks like medical reasoning & image understanding.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


function TechUsed(){

  const Tech = [
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
    name: "Flask",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  {
    name: "Python",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Machine Learning",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/2560px-Scikit_learn_logo_small.svg.png",
  },
  {
    name: "Firebase",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "ShadCN UI",
    image: "https://ui.shadcn.com/favicon.ico",
  },
  {
    name: "GSAP",
    image: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
  },
  {
    name: "GitHub",
    image: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
  },
  {
    name: "Firebase",
    image: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
  },
  {
    name: "JWT",
    image: "https://jwt.io/img/pic_logo.svg",
  },
  {
    name: "bcrypt",
    image: "https://cdn-icons-png.flaticon.com/512/2919/2919592.png",
  },
  {
    name: "Gemini API",
    image: "https://images.seeklogo.com/logo-png/62/2/google-gemini-icon-logo-png_seeklogo-623016.png",
  },
  ]
  return <section id="tech" className="py-20 h-screen">
         <div className="max-w-6xl mx-auto px-6 text-center">
           <motion.h2 initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-7xl font-bold mb-20 text-gray-900">
             Technologies Used
           </motion.h2>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 items-center">
             {Tech.map((tech, i) => (
              <motion.div initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}}
                key={i}
                className="flex flex-col items-center hover:scale-105 transition"
              >
                <img src={tech.image} alt={tech.name} className="w-16 h-16 mb-3" />
                <p className="text-gray-700 font-medium">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

  </section>
}


const LibrariesUsed = () => {
  const tabs = [
    {
      name: "Python Libraries",
      details: [
        "🐍 NumPy – Numerical computations and arrays.",
        "📊 Pandas – Data analysis and manipulation.",
        "🤖 Scikit-learn – Machine learning models.",
        "🧠 TensorFlow – Deep learning and neural networks.",
        "🧪 Flask – Lightweight backend web framework."
      ],
    },
    {
      name: "Node Js Libraries",
      details: [
        "⚙️ Express.js – Simplified backend server framework.",
        "🔐 Bcrypt – Secure password hashing.",
        "🪶 JWT – Token-based authentication.",
        "💾 Mongoose – MongoDB object modeling.",
        "📦 Nodemailer – Send emails from Node server."
      ],
    },
    {
      name: "React Js Libraries",
      details: [
        "⚛️ React Router – Navigation and routing.",
        "💨 Framer Motion – Smooth animations.",
        "🎨 Tailwind CSS – Fast, responsive UI styling.",
        "🧱 ShadCN UI – Prebuilt modern UI components.",
        "🌐 Axios – Simplified HTTP requests."
      ],
    },
    {
      name: "Javascript Frameworks",
      details: [
        "⚡ Locomotive Scroll js – Scrollbar controlling js.",
        "🔥 Scroll Trigger – Trigger animations on based on user scroll and visibility.",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div id="libraries" className="max-w-7xl mx-auto p-6 h-screen flex flex-col items-cente justify-center ">
      <motion.h1 initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-7xl font-bold mb-15 text-center text-gray-800">
        📚 Technology Libraries & Frameworks
      </motion.h1>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-6 backdrop-blur-lg shadow-sm px-10 py-2">
        {tabs.map((tab) => (
          <motion.button
          initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}}
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-5 py-2 w-full rounded-sm font-medium transition-all duration-300 cursor-pointer active:scale-90 ${
              activeTab === tab.name
                ? "bg-black text-white"
                : " text-gray-700 hover:bg-black/10"
            }`}
          >
            {tab.name}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5 border border-gray-200 rounded-xs shadow-sm backdrop-blur-lg">
        {tabs
          .filter((tab) => tab.name === activeTab)
          .map((tab) => (
            <div key={tab.name}>
              <motion.h2 initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className="text-3xl font-semibold mb-7 text-slate-800">
                {tab.name}
              </motion.h2>
              <ul className="list-disc list-inside text-gray-700 text-lg">
                {tab.details.map((item, i) => (
                  <motion.li initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} key={i} className="hover:translate-x-2 py-2 transition-transform">
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};



function Architecture(){
  const [tab,setTab] = useState(true)
  return <main id="architecture" className="flex flex-col justify-center items-center mt-20">
    <div className="flex sticky top-0 left-0 z-[1000] w-full max-w-7xl py-2 px-10 gap-10 backdrop-blur-lg">
      <motion.p initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className={`text-base font-semibold w-full py-5 text-center rounded-sm ${tab ? "bg-black text-white backdrop-blur-lg":"hover:bg-black/10"}`} onClick={()=>setTab(true)}>Diagram Architecture</motion.p>
      <motion.p initial={{opacity:0,scale:0}}  whileInView={{opacity:1,scale:1}} className={`text-base font-semibold w-full py-5 text-center rounded-sm ${!tab ? "bg-black text-white backdrop-blur-lg":"hover:bg-black/10"}`} onClick={()=>setTab(false)}>Detailed Architecture</motion.p>
    </div>

    <section className="w-7xl">
      {tab?
      <TechnicalArchitecture/>:
      <TechnicalArchitectureDetailed/>
    }
    </section>

  </main>
}

const AboutPage = () => {

//   <script>
//     const toggleBtn = document.getElementById('menu-toggle');
//     const navMenu = document.getElementById('nav-menu');

//     toggleBtn.addEventListener('click', () => {
//         navMenu.classList.toggle('hidden');
//     });
// </script>
  return (
    <main className="bg-white">
    <section className="h-screen overflow-y-scroll bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] text-sm text-gray-500">
      <Header/>
      <Hero/>
      <TechUsed/>
      <LibrariesUsed/>
      <Architecture/>
      <DeveloperSection/>
    </section>
    </main>
  );
};

export default AboutPage;
