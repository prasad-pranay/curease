import React, { useEffect, useState } from "react";
import "./splash.css";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, History } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Splash = ({CheckLogin}) => {
  const [noServerPage, setNoServerPage] = useState(false);
  useEffect(() => {
    gsap.to(".back-text tspan", {
      strokeDashoffset: "0",
      duration: 3,
      stagger: 0.2,
      delay: 1,
    });
    setTimeout(() => {
      setNoServerPage(true);
    }, 4500);
  }, []);

  async function retryLogin(){
      const result = await CheckLogin(500);
      if(result==-2){
        toast.error("Server Still offline")
      }else{
        toast.success("Server Back online")
      }
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      <AnimatePresence>
        {!noServerPage && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="splash-screen"
        >
          <svg viewBox="0 0 600 100">
            <defs>
              <mask id="text-mask">
                <text
                  y="50%"
                  x="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                >
                  <tspan>C</tspan>
                  <tspan>u</tspan>
                  <tspan>r</tspan>
                  <tspan>E</tspan>
                  <tspan>a</tspan>
                  <tspan>s</tspan>
                  <tspan>e</tspan>
                </text>
                {/* <!-- <text y="50%" x="50%" text-anchor="middle" dominantBaseline="middle" fill="white">OUTLINE</text> --> */}
              </mask>
            </defs>

            <text
              y="50%"
              x="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="back-text"
            >
              <tspan>C</tspan>
              <tspan>u</tspan>
              <tspan>r</tspan>
              <tspan>E</tspan>
              <tspan>a</tspan>
              <tspan>s</tspan>
              <tspan>e</tspan>
            </text>

            <rect
              x="0"
              y="0"
              width="600"
              fill="white"
              className="fill-rect"
              mask="url(#text-mask)"
            ></rect>
          </svg>
          <h1>Loading...</h1>
        </motion.div>
      )}
      {noServerPage && <motion.section initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }} className="h-full w-full flex items-center justify-center bg-[#191C24]">
      <Toaster position="top-right" reverseOrder={true} />
      <article className="px-10 py-10 rounded-sm bg-[#F7FAF5] flex gap-5">
        <motion.video initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }} src="/server.mp4" className="h-100 rounded-sm w-max" autoPlay loop muted preload="auto">
          Server Video
        </motion.video>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className=" shadow-l rounded-2xl p-10 text-center max-w-md w-full"
          >
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-16 h-16 text-yellow-500" />
          </div>
          <motion.h1 initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }} className="text-3xl font-bold text-gray-800 mb-3">
            Server is Down
          </motion.h1>
          <motion.p initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }} className="text-gray-600 mb-6">
            We're experiencing technical difficulties right now.
            <br /> Please try again later.
          </motion.p>
          <motion.button initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
            onClick={retryLogin}
            className="px-10 py-3 rounded-sm flex mx-auto cursor-pointer active:scale-90 items-center gap-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-200"
            >
              <History size={20} />
            Retry
          </motion.button>
        </motion.div>
      </article>
            </motion.section>}
      </AnimatePresence>
    </main>
  );
};

export default Splash;
