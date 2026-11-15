
import React, { useEffect, useRef, useState } from "react";
import "./splash.css";

import gsap from "gsap";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

import toast, { Toaster } from "react-hot-toast";


const Splash = ({ setLogin, CheckLogin }) => {
  const [noServerPage, setNoServerPage] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const wordmarkRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  /* -------------------------------------------
     Splash animation and transition
  ------------------------------------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogin(-1)
      // setNoServerPage(true);
    }, shouldReduceMotion ? 800 : 4500);

    if (!shouldReduceMotion && wordmarkRef.current) {
      const letters = wordmarkRef.current.querySelectorAll("tspan");

      const animation = gsap.to(letters, {
        strokeDashoffset: 0,
        fill: "#34415f",
        duration: 1.3,
        stagger: 0.16,
        delay: 0.3,
        ease: "power2.out",
      });

      return () => {
        clearTimeout(timer);
        animation.kill();
      };
    }

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  /* -------------------------------------------
     Retry server connection
  ------------------------------------------- */

  async function retryLogin() {
    if (retrying) return;

    try {
      setRetrying(true);

      const result = await CheckLogin(500);

      if (result === -2) {
        toast.error("Server is still unavailable");
      } else {
        toast.success("Server is back online");

        // Keep your existing application flow here.
        // If CheckLogin already redirects, no additional
        // navigation is needed.
      }
    } catch (error) {
      console.error("Connection retry failed:", error);
      toast.error("Unable to connect. Please try again.");
    } finally {
      setRetrying(false);
    }
  }

  return (
    <main className="
      relative min-h-screen w-full overflow-hidden
      bg-[#f6f7fa] text-slate-800
    ">

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            borderRadius: "8px",
            fontSize: "13px",
          },
        }}
      />

      <AnimatePresence mode="wait">

        {/* ---------------------------------------
            Initial splash
        --------------------------------------- */}

        {!noServerPage && (
          <motion.section
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="
              absolute inset-0 z-10
              flex flex-col items-center justify-center
              bg-[#f6f7fa]
            "
          >
            <div className="flex flex-col items-center">

              {/* Wordmark */}

              <svg
                ref={wordmarkRef}
                viewBox="0 0 600 115"
                className="w-[250px] sm:w-[340px] md:w-[410px]"
                role="img"
                aria-label="CurEase"
              >
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-semibold"
                  style={{
                    fontSize: "96px",
                    letterSpacing: "-5px",
                    color: "#34415f",
                  }}
                  fill="transparent"
                  stroke="#34415f"
                  strokeWidth="1.2"
                >
                  {["C", "u", "r", "E", "a", "s", "e"].map(
                    (letter, index) => (
                      <tspan
                        key={index}
                        style={{
                          strokeDasharray: 180,
                          strokeDashoffset: 180,
                        }}
                      >
                        {letter}
                      </tspan>
                    )
                  )}
                </text>
              </svg>

              {/* Loading indicator */}

              <div className="mt-9 flex items-center gap-3">
                <div className="
                  h-[3px] w-20 overflow-hidden
                  rounded-full bg-slate-200
                ">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-full w-full bg-indigo-500"
                  />
                </div>

                <span className="
                  text-[10px] font-medium uppercase
                  tracking-[0.2em] text-slate-400
                ">
                  Initializing
                </span>
              </div>
            </div>

          </motion.section>
        )}

        {/* ---------------------------------------
            Server unavailable
        --------------------------------------- */}

        {noServerPage && (
          <motion.section
            key="server-error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="
              relative flex min-h-screen w-full
              items-center justify-center
              px-5 py-16 sm:px-10
            "
          >

            <div className="
              mx-auto grid w-full max-w-6xl
              items-center gap-12
              lg:grid-cols-[1fr_0.9fr]
            ">

              {/* Left side: Illustration / video */}

              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, ...{ duration: 0.55 } }}
                className="relative hidden lg:block"
              >
                <div className="
                  relative aspect-[5/4] w-full
                  overflow-hidden rounded-xl
                  border1 border-slate-200
                  bg[#e9edf4]
                ">
                  <video
                    src="/server.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="
                      h-full w-full object-cover
                    "
                  >
                    Server connection illustration
                  </video>

                  {/* <div className="
                    absolute bottom-4 left-4
                    flex items-center gap-2
                    rounded-md border border-white/70
                    bg-white/85 px-3 py-2
                    text-xs font-medium text-slate-600
                    backdrop-blur-sm
                  ">
                    <span className="
                      h-2 w-2 rounded-full bg-red-400
                    " />
                    Connection interrupted
                  </div> */}
                </div>

                {/* <div className="
                  mt-5 flex items-center justify-between
                  border-t border-slate-200 pt-4
                  text-[10px] uppercase tracking-[0.16em]
                  text-slate-400
                ">
                  <span>CurEase System Status</span>
                  <span>Connection / 001</span>
                </div> */}
              </motion.div>

              {/* Right side: Error content */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.55 }}
                className="mx-auto w-full max-w-md lg:mx-0"
              >

                {/* Status label */}

                {/* Heading */}

                <div className="mb-6">
                  <div className="
                    mb-5 flex h-12 w-12 items-center
                    justify-center rounded-lg
                    bg-slate-200/70 text-slate-600
                  ">
                    <ShieldAlert size={25} strokeWidth={1.5} />
                  </div>

                  <p className="
                    mb-3 text-[11px] font-semibold
                    uppercase tracking-[0.2em]
                    text-[#1748B5]
                  ">
                    Backend Not Found
                  </p>

                  <h1 className="
                    text-4xl font-semibold
                    tracking-[-0.045em]
                    text-slate-900 sm:text-5xl
                  ">
                    We’ll be
                    <br />
                    <span className="text-slate-400">
                      right back.
                    </span>
                  </h1>

                  <p className="
                    mt-5 max-w-sm text-sm
                    leading-7 text-slate-500
                  ">
                    CurEase is having trouble connecting
                    to its server. This means no backend server is running.
                  </p>
                </div>

                {/* Connection details */}

                <div className="
                  mb-7 border-y border-slate-200
                  py-4
                ">
                  <div className="
                    flex items-center justify-between
                    text-xs
                  ">
                    <span className="text-slate-500">
                      Server connection
                    </span>

                    <span className="
                      flex items-center gap-2
                      font-medium text-red-500
                    ">
                      <span className="
                        h-1.5 w-1.5 rounded-full
                        bg-red-500
                      " />
                      Offline
                    </span>
                  </div>

                  <div className="
                    mt-3 flex items-center justify-between
                    text-xs
                  ">
                    <span className="text-slate-500">
                      Application
                    </span>

                    <span className="
                      font-medium text-emerald-600
                    ">
                      Running
                    </span>
                  </div>
                </div>

                {/* Retry */}

                <button
                  type="button"
                  onClick={retryLogin}
                  disabled={retrying}
                  className="
                    group flex h-[52px] w-full
                    items-center justify-center gap-3
                    rounded-lg bg-[#1748B5]
                    text-sm font-semibold text-white
                    transition-all duration-200
                    hover:bg-indigo-700
                    active:scale-[0.99]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <RefreshCw
                    size={17}
                    className={retrying ? "animate-spin" : ""}
                  />

                  {retrying ? "Checking connection..." : "Try again"}

                  {!retrying && (
                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={()=>setLogin(-1)}
                  disabled={retrying}
                  className="
                    group flex h-[52px] w-full
                    items-center justify-center gap-3
                    rounded-lg border mt-10 border-[#1748B5]
                    text-sm font-semibold text-[#1748B5]
                    transition-all duration-200
                    hover:bg-indigo-700
                    active:scale-[0.99]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  View Landing Page

                  {!retrying && (
                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  )}
                </button>

                {/* <p className="
                  mt-4 text-center text-[11px]
                  leading-5 text-slate-400
                ">
                  If the problem continues, please try again later.
                </p> */}
              </motion.div>
            </div>

            {/* Footer */}

            {/* <div className="
              absolute bottom-5 left-0 right-0
              flex justify-center
              text-[10px] tracking-[0.15em]
              text-slate-400
            ">
              CUREASE · SYSTEM STATUS
            </div> */}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Splash;

// import React, { useEffect, useState } from "react";
// import "./splash.css";
// import gsap from "gsap";
// import { AnimatePresence, motion } from "framer-motion";
// import { AlertTriangle, History } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// const Splash = ({CheckLogin}) => {
//   const [noServerPage, setNoServerPage] = useState(false);
//   useEffect(() => {
//     gsap.to(".back-text tspan", {
//       strokeDashoffset: "0",
//       duration: 3,
//       stagger: 0.2,
//       delay: 1,
//     });
//     setTimeout(() => {
//       setNoServerPage(true);
//     }, 4500);
//   }, []);

//   async function retryLogin(){
//       const result = await CheckLogin(500);
//       if(result==-2){
//         toast.error("Server Still offline")
//       }else{
//         toast.success("Server Back online")
//       }
//   }

//   return (
//     <main className="h-screen w-screen overflow-hidden">
//       <AnimatePresence>
//         {!noServerPage && (
//         <motion.div
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }}
//           className="splash-screen"
//         >
//           <svg viewBox="0 0 600 100">
//             <defs>
//               <mask id="text-mask">
//                 <text
//                   y="50%"
//                   x="50%"
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   fill="white"
//                 >
//                   <tspan>C</tspan>
//                   <tspan>u</tspan>
//                   <tspan>r</tspan>
//                   <tspan>E</tspan>
//                   <tspan>a</tspan>
//                   <tspan>s</tspan>
//                   <tspan>e</tspan>
//                 </text>
//                 {/* <!-- <text y="50%" x="50%" text-anchor="middle" dominantBaseline="middle" fill="white">OUTLINE</text> --> */}
//               </mask>
//             </defs>

//             <text
//               y="50%"
//               x="50%"
//               textAnchor="middle"
//               dominantBaseline="middle"
//               className="back-text"
//             >
//               <tspan>C</tspan>
//               <tspan>u</tspan>
//               <tspan>r</tspan>
//               <tspan>E</tspan>
//               <tspan>a</tspan>
//               <tspan>s</tspan>
//               <tspan>e</tspan>
//             </text>

//             <rect
//               x="0"
//               y="0"
//               width="600"
//               fill="white"
//               className="fill-rect"
//               mask="url(#text-mask)"
//             ></rect>
//           </svg>
//           <h1>Loading...</h1>
//         </motion.div>
//       )}
//       {noServerPage && <motion.section initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }} className="h-full w-full flex items-center justify-center bg-[#191C24]">
//       <Toaster position="top-right" reverseOrder={true} />
//       <article className="px-10 py-10 rounded-sm bg-[#F7FAF5] flex gap-5">
//         <motion.video initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }} src="/server.mp4" className="h-100 rounded-sm w-max" autoPlay loop muted preload="auto">
//           Server Video
//         </motion.video>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//           className=" shadow-l rounded-2xl p-10 text-center max-w-md w-full"
//           >
//           <div className="flex justify-center mb-6">
//             <AlertTriangle className="w-16 h-16 text-yellow-500" />
//           </div>
//           <motion.h1 initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }} className="text-3xl font-bold text-gray-800 mb-3">
//             Server is Down
//           </motion.h1>
//           <motion.p initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }} className="text-gray-600 mb-6">
//             We're experiencing technical difficulties right now.
//             <br /> Please try again later.
//           </motion.p>
//           <motion.button initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }}
//             onClick={retryLogin}
//             className="px-10 py-3 rounded-sm flex mx-auto cursor-pointer active:scale-90 items-center gap-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-200"
//             >
//               <History size={20} />
//             Retry
//           </motion.button>
//         </motion.div>
//       </article>
//             </motion.section>}
//       </AnimatePresence>
//     </main>
//   );
// };

// export default Splash;
