import React, { useEffect, useRef, useState } from "react";
import "./page.css";
import {  ArrowRight,Brain,ChartLine,ChartNoAxesCombined,ChevronRight,ChevronUp,CircleDollarSign,CircleQuestionMark,Clock,CodeXml,Forklift,Gauge,Globe,HandHelping,Home,Lightbulb,Mail,MapPin,Menu,MessageCircle,Monitor,Palette,Phone,Rocket,Share,Shield,Star,Telescope,User,UserPlus,Users2,X,} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveScrollProvider from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import {RoughPage} from "./rough";
import Dock from "../component/Dock";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const SignInButton = ({ showText = true }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={() => navigate("/sign-in")}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      className={`sign-in-button ${
        showText ? "p-[0.8em_1.3em_0.8em_0.9em]" : "p-[0.8em_0.8em_0.8em_0.8em]"
      }`}
    >
      <svg
        height="24"
        width="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          fill="currentColor"
        ></path>
      </svg>
      {showText && <span>Sign Up</span>}
    </motion.button>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="pb-32 md:pb-44  text-slate-800 text-sm">
      <div className="flex flex-col-reverse gap-10 md:flex-row px-4 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-20 w-full">
        <div className="w-full">
          <motion.h5
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-4xl md:text-[75px] font-semibold text-slate-900"
          >
            Empowering Smarter Healthcare with CurEase
          </motion.h5>

          {/* <p className="text-sm md:text-lg mt-6 max-md:px-2 text-slate-600">
            Diagnose, manage, and monitor your health instantly with AI-powered
            medical insights, emergency help, and personalized care.
          </p> */}
          <div className="flex items-center gap-4 mt-14">
            <motion.button
              onClick={() => navigate("/about")}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              className="about-us-button scale-95"
            >
              <span>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                    fill="currentColor"
                  ></path>
                </svg>
                Project
              </span>
            </motion.button>
            <SignInButton />
          </div>
        </div>
        <div className="w-max ">
          <motion.img
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="h-10 w-max"
            src="/healthcare.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

const WhyChooseButton = ({ number, heading, content, Icon, points = [] }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
      className="backdrop-blur-lg  shadow-[0px_0px_15px_rgba(0,0,0,0.09)] px-20 py-15 space-y-3 relative overflow-hidden hover:scale-110 transition-transform duration-300"
    >
      <div className="w-24 h-24 bg-slate-900 rounded-full absolute -right-5 -top-7">
        <p className="absolute bottom-6 left-7 text-white text-2xl">
          0{number}
        </p>
      </div>
      <div className="fill-slate-900 w-12">
        <Icon className="text-slate-900" size={35} />
      </div>
      <h1 className="font-bold text-slate-900 text-4xl">{heading}</h1>
      <p className="text-lg text-zinc-500 leading-6 mb-4">{content}</p>
      {points.map((val, index) => (
        <p key={index} className="text-sm ml-5">
          {val}
        </p>
      ))}
    </motion.div>
  );
};
const WhyChooseUs = () => {
  return (
    <section
      className="section about h-screen overflow-hidden flex px-20 gap-10 items-center justify-center"
      id="sectionPin"
    >
      <article className="pin-wrap flex h-screen justify-start align-center">
        <div className="w-[200vw]"></div>
        <div className="w-screen h-full items-center justify-center flex flex-col gap-10">
          <figure className="">
            <motion.img
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              src="https://github.com/codewithsadee/desinic/blob/master/assets/images/about-banner.png?raw=true"
              width="700"
              height="532"
              loading="lazy"
              alt="about banner"
              className="w-80 banner-animation"
            />
          </figure>
          <motion.h2
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="h2 section-title underliner font-bold text-8xl mb-10 text-slate-900"
          >
            Why Choose Us
          </motion.h2>
        </div>
        <div className="about-content flex flex-col justify-center">
          <div className="flex gap-50 mt-15">
            <WhyChooseButton
              Icon={Brain}
              number={1}
              heading="AI Diagnosis"
              // content="Accurate symptom analysis powered by machine learning for quick and precise insights."
              content={
                "Accurate symptom analysis powered by machine learning for quick and precise insights."
              }
              points={[
                "🤖 Detects likely conditions from your symptoms instantly.",
                "📊 Uses AI models for precise health predictions.",
                "⚡ Learns and improves with real-time data.",
                "✅ Shows confidence levels for each result.",
                "🧠 Helps you make faster, smarter decisions.",
              ]}
            />
            <WhyChooseButton
              Icon={Shield}
              number={2}
              heading="Trusted Security"
              // content="We ensure your medical data is encrypted and stored with top-level privacy protocols."
              content={
                "We ensure your medical data is encrypted and stored with top-level privacy protocols."
              }
              points={[
                "🔒 End-to-end encryption for all health data.",
                "🧱 Stored securely on trusted servers.",
                "🪪 Strict access with authentication layers.",
                "🧾 Regular audits for compliance and safety.",
                "🙅‍♂️ No third-party data sharing — ever.",
              ]}
            />
            <WhyChooseButton
              Icon={Users2}
              number={3}
              heading="Doctor Network"
              content="Get connected to real doctors instantly for consultations and second opinions."
              points={[
                "👨‍⚕️ Chat instantly with certified doctors.",
                "💬 Get real-time advice and diagnoses.",
                "🌐 Access specialists anytime, anywhere.",
                "🩺 Receive trusted second opinions fast.",
                "🔐 Private and secure consultations always.",
              ]}
            />
          </div>
        </div>
      </article>
    </section>
  );
};

function OurFeatureTab({ Icon, title, content }) {
  return (
    <motion.li
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-100 gap-y-2.5 hover:scale-105 hover:-translate-y-1 transition-transform duration-200 hover:shadow-xl grid grid-cols-[auto_1fr] items-center justify-center gap-x-5 backdrop-blur-lg shadow-md px-10 py-5 rounded-lg"
    >
      <div className="bg-slate-900 p-2.5 rounded-full text-white">
        <Icon size={18} />
      </div>
      <h3 className="font-semibold text-slate-800 text-xl">{title}</h3>
      <p className="col-span-2 text text-[#51558A] text-sm ml-6">{content}</p>
    </motion.li>
  );
}
const OurFeatures = () => {
  return (
    <section
      className="section features min-h-screen flex items-center justify-center"
      id="features"
    >
      <div className="container mx-15">
        <motion.h2
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="h2 section-title text-7xl font-bold underliner mb-10 text-slate-900"
        >
          Features You’ll Love
        </motion.h2>

        <ul className="grid grid-cols-2 items-center gap-25 justify-center col-span-3 relative">
          <OurFeatureTab
            Icon={Lightbulb}
            title="Symptom Checker"
            content="Quickly detect potential diseases by simply selecting your symptoms — fast, accurate, and effortless."
          />
          <OurFeatureTab
            Icon={Palette}
            title="Nutrition Analyzer"
            content="Snap your meal, upload it, and discover what’s really on your plate — instant nutrition insights in seconds."
          />
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src="/feature.png"
            width="369"
            height="318"
            loading="lazy"
            alt="Features Banner"
            className="w-80 h-max banner-animation z-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <OurFeatureTab
            Icon={CodeXml}
            title="Health Dashboard"
            content="Stay on top of your performance with a single view of all reports, analytics, and progress tracking."
          />
          <OurFeatureTab
            Icon={Rocket}
            title="Emergency Aid"
            content="Access quick, organ-specific emergency treatment instructions to act effectively before professional help reaches you."
          />
        </ul>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer
      id="landing-footer"
      className="flex flex-col backdrop-blur-lg items-center justify-around w-full py-16 text-sm text-gray-800/70 pb-25"
    >
      <div className="flex items-center gap-4 mt-8 text-indigo-500">
        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          href="https://www.instagram.com/pranayy.c3/"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          href="https://www.instagram.com/pranayy.c3/"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          href="https://www.linkedin.com/in/pranay-prasad-/"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          href="https://www.instagram.com/pranayy.c3/"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          href="https://github.com/pranayvips"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 18c-4.51 2-5-2-7-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>
      <motion.p
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="mt-8 text-center"
      >
        Copyright © 2025 <a href="#">CUREASE</a>. All rights reservered.
      </motion.p>
    </footer>
  );
};

const HeaderLinks = ({ title, icon }) => {
  return (
    <motion.p
      className="relative px-3 py-2 active:scale-90 navbar-item font-semibold text-sm whitespace-nowrap cursor-pointer text-indigo-900 hover:text-blue-600 group"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
      data-navbar-link
    >
      {icon}
      <span className="absolute opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 top-[110%] left-1/2 -translate-x-1/2">
        {title}
      </span>
    </motion.p>
  );
};
const Header = ({ scroller }) => {
  const Items = [
    {
      icon: <Home size={18} />,
      label: "Home",
      onClick: () => scroller.scrollTo("#landing-header"),
    },
    {
      icon: <HandHelping size={18} />,
      label: "Why Us",
      onClick: () => scroller.scrollTo("#sectionPin"),
    },
    {
      icon: <ChartLine size={18} />,
      label: "Info",
      onClick: () => scroller.scrollTo("#landing-info"),
    },
    {
      icon: <Star size={18} />,
      label: "Testimonials",
      onClick: () => scroller.scrollTo("#landing-testimonials"),
    },
    {
      icon: <CircleDollarSign size={18} />,
      label: "Subscriptions",
      onClick: () => scroller.scrollTo("#landing-pricing"),
    },
    {
      icon: <CircleQuestionMark size={18} />,
      label: "Faq",
      onClick: () => scroller.scrollTo("#landing-faq"),
    },
    {
      icon: <Phone size={18} />,
      label: "Contact Us",
      onClick: () => scroller.scrollTo("#landing-footer"),
    },
  ];
  // useEffect(() => {
  //   const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  //   const navbar = document.querySelector("[data-navbar]");
  //   const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  //   const overlay = document.querySelector("[data-overlay]");

  //   const elemArr = [navCloseBtn, overlay, navOpenBtn];

  //   for (let i = 0; i < elemArr.length; i++) {
  //     elemArr[i].addEventListener("click", function () {
  //       navbar.classList.toggle("active");
  //       overlay.classList.toggle("active");
  //     });
  //   }

  //   /**
  //    * toggle navbar & overlay when click any navbar-link
  //    */

  //   const navbarLinks = document.querySelectorAll("[data-navbar-link]");

  //   for (let i = 0; i < navbarLinks.length; i++) {
  //     navbarLinks[i].addEventListener("click", function () {
  //       navbar.classList.toggle("active");
  //       overlay.classList.toggle("active");
  //     });
  //   }

  //   /**
  //    * header & go-top-btn active
  //    * when window scroll down to 400px
  //    */

  //   const header = document.querySelector("[data-header]");
  //   const goTopBtn = document.querySelector("[data-go-top]");

  //   LandingPage3.current.addEventListener("scroll", function () {
  //     if (LandingPage3.current.scrollTop >= 200) {
  //       header.classList.add("active");
  //       goTopBtn.classList.add("active");
  //     } else {
  //       header.classList.remove("active");
  //       goTopBtn.classList.remove("active");
  //     }
  //   });
  // }, []);
  return (
    <header className="header" id="landing-header">
      <div className="container w-7xl mx-auto">
        <div className="overlay" data-overlay></div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="font-semibold bg-gradient-to-r from-slate-900 to-gray-900 text-2xl bg-clip-text text-transparent"
        >
          CUREASE
        </motion.div>

        <nav className="navbar" data-navbar>
          <div className="navbar-top">
            <a href="#" className="logo">
              CUREASE
            </a>

            <button
              className="nav-close-btn"
              aria-label="Close Menu"
              data-nav-close-btn
            >
              <X />
            </button>
          </div>

          <ul className="navbar-list mr-10">
            {Items.map((value, index) => (
              <li key={index} onClick={() => value.onClick()}>
                <HeaderLinks title={value.label} icon={value.icon} />
              </li>
            ))}
          </ul>
        </nav>

        <SignInButton showText={false} />

        <button
          className="nav-open-btn"
          aria-label="Open Menu"
          data-nav-open-btn
        >
          <Menu />
        </button>
      </div>
    </header>
  );
};

const PriceSection = () => {
  return (
    <section
      id="landing-pricing"
      className="box-border py-8 leading-7 text-gray-900 border-0 border-gray-200 border-solid sm:py-12 md:py-16 lg:py-24"
    >
      <div className="box-border max-w-6xl px-4 pb-12 mx-auto border-solid sm:px-6 md:px-6 lg:px-4">
        <div className="flex flex-col items-center leading-7 text-center text-gray-900">
          <motion.h2
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl"
          >
            Pricing Options
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="box-border mt-4 text-2xl leading-normal text-gray-900 border-solid"
          >
            We've got a plan for companies of any size
          </motion.p>
        </div>
        <div className="grid max-w-md mx-auto mt-6 overflow-hidden leading-7 text-gray-900 border border-b-4 border-gray-300 border-blue-600 rounded-xl md:max-w-lg lg:max-w-none sm:mt-10 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="box-border px-4 py-8 mb-6 text-center border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10"
          >
            <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
              Basic
            </h3>
            <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
              The basic plan is a good fit for smaller teams and startups
            </p>
            <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
              <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                ₹19
              </p>
              <p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
                per user <span className="block">per month</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="box-border px-4 py-8 mb-6 text-center border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10"
          >
            <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
              Plus
            </h3>
            <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
              The plus plan is a good fit for medium-size to larger companies
            </p>
            <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
              <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                ₹39
              </p>
              <p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
                per user <span className="block">per month</span>
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="box-border px-4 py-8 text-center  border-solid sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10"
          >
            <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
              Pro
            </h3>
            <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
              The pro plan is a good fit for larger and enterprise companies.
            </p>
            <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
              <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                ₹59
              </p>
              <p className="box-border my-0 ml-4 mr-0 text-xs text-center border-0 border-gray-200">
                per user <span className="block">per month</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InfoSections = () => {
  return (
    <section id="landing-info">
      <section className="w-full  pt-7 pb-7 md:pt-20 md:pb-24">
        <div className="box-border  h-screen justify-center grid grid-cols-[auto_1fr] items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid lg:px-16">
          {/* <!-- Image --> */}
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            src="/healtcare2.png"
            className="w-120 banner-animation"
          />

          {/* <!-- Content --> */}
          <div className="box-border order-first w-full text-black border-solid md:pl-10 md:order-none mt-10">
            <motion.h2
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="col-span-2 m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-8xl md:text-2xl text-slate-900"
            >
              Revolutionizing Healthcare
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="pt-4 pb-8 m-0 leading-7 text-[#51558A] border-0 border-gray-300 sm:pr-10 lg:text-3xl"
            >
              Empowering patients and doctors through AI-driven insights,
              automation, and real-time analytics to make healthcare smarter and
              faster.
            </motion.p>
            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
              <motion.li
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="box-border relative py-3 text-left text-[#51558A] border-solid flex text-2xl hover:backdrop-blur-lg hover:shadow-xl px-5 flex items-center gap-3"
              >
                <span className="inline-flex items-center justify-center p-3 shadow-xl mr-2 text-white bg-gray-100 rounded-full">
                  <span className="text-sm font-bold mx-auto my-[2px] w-max">
                    ⚡
                  </span>
                </span>
                AI-powered diagnosis for quick decision-making
              </motion.li>
              <motion.li
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="box-border relative py-3 text-left text-[#51558A] border-solid flex text-2xl hover:backdrop-blur-lg hover:shadow-xl px-5 flex items-center gap-3"
              >
                <span className="inline-flex items-center justify-center p-3 shadow-xl mr-2 text-white bg-gray-100 rounded-full">
                  <span className="text-sm font-bold mx-auto my-[2px] w-max">
                    🧠
                  </span>
                </span>
                Intelligent medical predictions for better outcomes
              </motion.li>
              <motion.li
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="box-border relative py-3 text-left text-[#51558A] border-solid flex text-2xl hover:backdrop-blur-lg hover:shadow-xl px-5 flex items-center gap-3"
              >
                <span className="inline-flex items-center justify-center p-3 shadow-xl mr-2 text-white bg-gray-100 rounded-full">
                  <span className="text-sm font-bold mx-auto my-[2px] w-max">
                    🩹
                  </span>
                </span>
                Designed for patients, hospitals, and research centers
              </motion.li>
            </ul>
          </div>
          {/* <!-- End  Content --> */}
        </div>
        <div className="box-border h-screen justify-center flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row lg:px-16">
          {/* <!-- Content --> */}
          <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
            <motion.h2
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="m-0 text-xl font-semibold leading-tight text-slate-900 border-0 border-gray-300 lg:text-8xl md:text-2xl"
            >
              Insights That Matter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="pt-4 pb-8 m-0 leading-7 text-[#51558A] border-0 border-gray-300 sm:pr-10 lg:text-3xl"
            >
              CurEase turns your data into visual insights that help you make
              better decisions about your health and lifestyle.
            </motion.p>
            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
              <motion.li
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="hover:backdrop-blur-lg hover:shadow-xl px-5 flex items-center gap-3 box-border relative py-3 pl-0 text-left text-[#51558A] flex border-solid items-center text-2xl"
              >
                <span className="inline-flex items-center justify-center py-2 px-2.5 h-max mr-2 text-white bg-white shadow-xl rounded-full">
                  <span className="text-sm font-bold w-max mx-auto my-[2px]">
                    🥗
                  </span>
                </span>
                Analyze nutrition, habits, and sleep
              </motion.li>
              <motion.li
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="hover:backdrop-blur-lg hover:shadow-xl px-5 flex items-center gap-3 box-border relative py-3 pl-0 text-left text-[#51558A] flex border-solid items-center text-2xl"
              >
                <span className="inline-flex items-center justify-center py-2 px-2.5 h-max mr-2 text-white bg-white shadow-xl rounded-full">
                  <span className="text-sm font-bold w-max mx-auto my-[2px]">
                    🧬
                  </span>
                </span>
                View prediction confidence scores
              </motion.li>
              <motion.li
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="hover:backdrop-blur-lg hover:shadow-xl px-5 flex items-center gap-3 box-border relative py-3 pl-0 text-left text-[#51558A] flex border-solid items-center text-2xl"
              >
                <span className="inline-flex items-center justify-center py-2 px-2.5 h-max mr-2 text-white bg-white shadow-xl rounded-full">
                  <span className="text-sm font-bold w-max mx-auto my-[2px]">
                    📈
                  </span>
                </span>
                Track daily health trends
              </motion.li>
            </ul>
          </div>
          {/* <!-- End  Content --> */}

          {/* <!-- Image --> */}
          <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              src="/healthcare3.png"
              className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"
            />
          </div>
        </div>
      </section>

      {/* <!-- Section 4 --> */}
      <section className="flex flex-col items-center py-20">
        <div className="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
          <div className="flex flex-wrap items-center -mx-3">
            <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
              <div className="w-full">
                <motion.h2
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-7xl font-heading text-[#1F2470]"
                >
                  Your Health, Simplified
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="mb-4 text-4xl font-medium tracking-tight text-[#51558A] xl:mb-6"
                >
                  All your reports, appointments, and prescriptions — organized
                  and accessible anytime, anywhere.
                </motion.p>
                <ul>
                  <motion.li
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-2xl flex items-center py-2 space-x-4 xl:py-3"
                  >
                    <svg
                      className="w-8 h-8 text-pink-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      ></path>
                    </svg>
                    <span className="font-medium text-[#51558A]">
                      Manage all medical files in one place
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-2xl flex items-center py-2 space-x-4 xl:py-3"
                  >
                    <svg
                      className="w-8 h-8 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      ></path>
                    </svg>
                    <span className="font-medium text-[#51558A]">
                      Auto reminders for appointments
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-2xl flex items-center py-2 space-x-4 xl:py-3"
                  >
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span className="font-medium text-[#51558A]">
                      Personalized wellness dashboard
                    </span>
                  </motion.li>
                </ul>
              </div>
            </div>
            <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
              <img
                className="mx-auto sm:max-w-sm lg:max-w-full"
                src="https://cdn.devdojo.com/images/november2020/feature-graphic.png"
                alt="feature image"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section
      id="landing-testimonials"
      className="flex items-center justify-center py-40  max-w-screen"
    >
      <div className="px-16 ">
        <div className="container flex flex-col items-start mx-auto lg:items-center">
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex items-start justify-start w-full text-xl mb-3 font-bold tracking-wider text-[#EF1F76] uppercase lg:justify-center lg:items-center"
          >
            Don't just take our word for it
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex items-start justify-start w-full max-w-3xl text-8xl text-center font-bold lg:justify-center text-[#1F2470]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#1F2470"
              className="absolute right-0 hidden w-12 h-12 -mt-2 -mr-16 text-gray-200 lg:inline-block"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            See what others are saying
          </motion.h2>
          <div className="block w-full h-0.5 max-w-lg mt-6 bg-purple-100 rounded-full"></div>

          <div className="items-center justify-center w-full mt-10 mb-4 lg:flex">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl transition-shadow shadow-lg px-10 py-10 rounded-xl flex flex-col items-start justify-start w-full h-auto mb-12 lg:w-1/3 lg:mb-0"
            >
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1700&amp;q=80"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h4 className="font-bold text-[#1F2470] text-2xl">
                    John Doe
                  </h4>
                  <p className="text-gray-600 text-base">CEO of Something</p>
                </div>
              </div>
              <blockquote className="mt-8 text-xl text-gray-500">
                "This is a no-brainer if you want to take your business to the
                next level. If you are looking for the ultimate toolset, this is
                it!"
              </blockquote>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl transition-shadow shadow-lg px-10 py-10 rounded-xl flex flex-col items-start justify-start w-full h-auto  lg:w-1/3 lg:mb-0 lg:px-8 lg:mx-8 "
            >
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2547&amp;q=80"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h4 className="font-bold text-[#1F2470] text-2xl">
                    Jane Doe
                  </h4>
                  <p className="text-gray-600 text-base">CTO of Business</p>
                </div>
              </div>
              <blockquote className="mt-8 text-xl text-gray-500">
                "Thanks for creating this service. My life is so much easier.
                Thanks for making such a great product."
              </blockquote>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl transition-shadow shadow-lg px-10 py-10 rounded-xl flex flex-col items-start justify-start w-full h-auto lg:w-1/3"
            >
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1256&amp;q=80"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h4 className="font-bold text-[#1F2470] text-2xl">
                    John Smith
                  </h4>
                  <p className="text-gray-600 text-base">Creator of Stuff</p>
                </div>
              </div>
              <blockquote className="mt-8 text-xl text-gray-500">
                "Packed with awesome content and exactly what I was looking for.
                I would highly recommend this to anyone."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DockComponent = ({ scroller }) => {
  const items = [
    {
      icon: <Home size={18} />,
      label: "Home",
      onClick: () => scroller.scrollTo("#landing-header"),
    },
    {
      icon: <HandHelping size={18} />,
      label: "Why Us",
      onClick: () => scroller.scrollTo("#sectionPin"),
    },
    {
      icon: <ChartLine size={18} />,
      label: "Info",
      onClick: () => scroller.scrollTo("#landing-info"),
    },
    {
      icon: <Star size={18} />,
      label: "Testimonials",
      onClick: () => scroller.scrollTo("#landing-testimonials"),
    },
    {
      icon: <CircleDollarSign size={18} />,
      label: "Subscriptions",
      onClick: () => scroller.scrollTo("#landing-pricing"),
    },
    {
      icon: <CircleQuestionMark size={18} />,
      label: "Faq",
      onClick: () => scroller.scrollTo("#landing-faq"),
    },
    {
      icon: <Phone size={18} />,
      label: "Contact Us",
      onClick: () => scroller.scrollTo("#landing-footer"),
    },
  ];
  return (
    <motion.section
      initial={{ y: "200px", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "200px", opacity: 0 }}
      className="fixed bottom-0 left-1/2 z-[10000]"
    >
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </motion.section>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "🩺 How does the symptom analysis feature work?",
      answer:
        "Our system uses machine learning algorithms to analyze your selected symptoms and suggest possible conditions instantly. It continuously improves accuracy through real-time learning.",
    },
    {
      question: "👨‍⚕️ Can I talk to real doctors through this platform?",
      answer:
        "Yes! You can connect instantly with certified doctors for online consultations, get second opinions, and receive personalized health advice securely.",
    },
    {
      question: "🔒 Is my medical data safe and private?",
      answer:
        "Absolutely. All your data is encrypted, securely stored, and never shared with third parties. We follow strict privacy and compliance standards.",
    },
    {
      question: "⚡ How fast can I get results from the symptom checker?",
      answer:
        "The analysis is almost instant. Once you select your symptoms, our AI system processes them and provides insights within seconds.",
    },
    {
      question: "💊 Can I get treatment or prescriptions here?",
      answer:
        "You can receive preliminary treatment guidance and, in some cases, e-prescriptions from verified doctors, depending on your location and consultation type.",
    },
    {
      question: "🌐 Do I need to install an app to use CurEase?",
      answer:
        "No installation needed! You can use CurEase directly through your browser on desktop or mobile, anytime and anywhere.",
    },
  ];
  return (
    <div
      id="landing-faq"
      className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0"
    >
      <motion.img
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full rounded-xl h-auto"
        src="/healthfaq.png"
        alt=""
      />
      <div className="w-full">
        <motion.p
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-indigo-600 text-sm font-medium"
        >
          FAQ's
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-3xl font-semibold"
        >
          Looking for answer?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-sm text-slate-500 mt-2 pb-4"
        >
          You can contact us anytime for further info! :)
        </motion.p>
        {faqs.map((faq, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="border-b border-slate-200 py-4 cursor-pointer"
            key={index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">{faq.question}</h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  openIndex === index ? "rotate-180" : ""
                } transition-all duration-500 ease-in-out`}
              >
                <path
                  d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                  stroke="#1D293D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${
                openIndex === index
                  ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                  : "opacity-0 max-h-0 -translate-y-2"
              }`}
            >
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function LandingPage() {
  // const LandingPage3 = useRef();
  const [showDock, setShowDock] = useState(false);
  const containerRef = useRef(null);
  const [scroller, setScroller] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    // Initialize Locomotive Scroll
    const scroller = new LocomotiveScroll({
      el: container,
      smooth: true,
    });
    setScroller(scroller);
    scroller.on("scroll", ScrollTrigger.update);

    scroller.on("scroll", (args) => {
      // Get current scroll Y
      if (args.scroll.y > 250) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    });

    // Connect ScrollTrigger with Locomotive
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: container.style.transform ? "transform" : "fixed",
    });

    // Horizontal scroll animation
    const pinWrap = document.querySelector(".pin-wrap");
    const pinWrapWidth = pinWrap.scrollWidth;
    const horizontalScrollLength = pinWrapWidth - 2 * window.innerWidth;

    gsap.to(".pin-wrap", {
      x: -horizontalScrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: "#sectionPin",
        scroller: container,
        scrub: true,
        pin: true,
        start: "top top",

        end: () => "+=" + pinWrapWidth,
      },
    });

    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();

    return () => {
      if (scroller) {
        scroller.destroy();
      }
    };
  }, []);

  return (
    // <RoughPage/>
    <main className="relative">
      <div className="absolute top-0 left-0 z-[-1] h-screen w-screen bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradient-bg-with-grid.png')] bg-cover bg-center bg-no-repeat">
        <img src="" alt="" />
      </div>

      <AnimatePresence>
        {showDock && <DockComponent scroller={scroller} />}
      </AnimatePresence>
      <section
        id="top"
        className="landingpage3 text-slate-900"
        ref={containerRef}
      >
        <Header scroller={scroller} />
        <HeroSection />
        <OurFeatures />
        <WhyChooseUs />
        <InfoSections />
        <Testimonials />
        <PriceSection />
        <Faq />
        <Footer />
      </section>
    </main>
  );
}
