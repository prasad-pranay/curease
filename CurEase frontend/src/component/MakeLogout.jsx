
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  ArrowLeft,
  HeartPulse,
  ShieldCheck,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const MakeLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  async function logOut() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/login/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unable to log out. Please try again.");
      }

      setLoggedOut(true);
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || "Something went wrong.");
      setIsLoggingOut(false);
    }
  }

  useEffect(() => {
    if (!loggedOut) return;

    const timer = setTimeout(() => {
      window.location.replace("/");
    }, 2200);

    return () => clearTimeout(timer);
  }, [loggedOut]);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#fafafa] text-[#202124] flex items-center justify-center px-5 py-12 relative overflow-hidden">

      {/* Background detail */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#e9e9e9]" />

      <div className="absolute top-8 left-8 md:top-10 md:left-12">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#5146a5] text-white flex items-center justify-center">
            <HeartPulse size={19} strokeWidth={2.2} />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            CurEase<span className="text-[#5146a5]">.</span>
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!loggedOut ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[470px]"
          >
            {/* Illustration */}
            <div className="flex justify-center mb-9">
              <div className="w-24 h-24 rounded-[28px] bg[#f0effa] border1 border-[#e5e2f6] flex items-center justify-center">
                <LogOut
                  size={39}
                  strokeWidth={1.5}
                  className="text-[#5146a5]"
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#77728e] mb-4">
                Before you go
              </p>

              <h1 className="text-[32px] sm:text-[38px] font-semibold tracking-[-0.045em] leading-tight">
                Leaving CurEase?
              </h1>

              <p className="text-xs leading-7 text-[#77777f] mt-4 max-w-[350px] mx-auto">
                Are you sure you want to sign out of your account? You can
                always come back whenever you need us.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-10 space-y-3">
              <button
                onClick={logOut}
                disabled={isLoggingOut}
                className="w-full h-[54px] rounded-xl bg-[#5146a5] text-white text-[14px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#43398f] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Signing you out...
                  </>
                ) : (
                  <>
                    <LogOut size={17} />
                    Yes, sign me out
                  </>
                )}
              </button>

              <button
                onClick={goBack}
                disabled={isLoggingOut}
                className="w-full h-[54px] rounded-xl border border-[#e7e7e9] bg-white text-[#42424a] text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#f7f7f8] transition-all disabled:opacity-50"
              >
                <ArrowLeft size={16} />
                No, take me back
              </button>
            </div>

            {/* Security note */}
            {/* <div className="mt-9 flex items-center justify-center gap-2 text-[12px] text-[#92929a]">
              <ShieldCheck size={15} />
              Your account and personal information remain secure.
            </div> */}
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[450px] text-center"
          >
            <div className="flex justify-center mb-9">
              <div className="w-24 h-24 rounded-[28px] bg-[#edf6f0] border border-[#dceee1] flex items-center justify-center">
                <CheckCircle2
                  size={42}
                  strokeWidth={1.5}
                  className="text-[#39845a]"
                />
              </div>
            </div>

            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#39845a] mb-4">
              Signed out successfully
            </p>

            <h1 className="text-[32px] sm:text-[38px] font-semibold tracking-[-0.045em] leading-tight">
              Take care of yourself.
            </h1>

            <p className="text-[15px] leading-7 text-[#77777f] mt-4 max-w-[340px] mx-auto">
              Thank you for spending time with CurEase. Wishing you good
              health and brighter days ahead.
            </p>

            <div className="mt-10 flex items-center justify-center gap-2 text-[13px] text-[#92929a]">
              <LoaderCircle size={15} className="animate-spin" />
              Taking you back to the home page...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {/* <div className="absolute bottom-7 left-0 w-full text-center">
        <p className="text-[11px] tracking-wide text-[#b0b0b5]">
          CurEase · Your health, our priority
        </p>
      </div> */}
    </section>
  );
};

export default MakeLogout;

// import React from 'react'
// import { useState } from 'react'
// import {motion} from "framer-motion"
// import { useEffect } from 'react'
// import toast from 'react-hot-toast'


// const MakeLogout = () => {
//     const [next,setNext] = useState(false)
//     async function logOut(){
//         setNext(true)
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/logout`, {
//         method: "POST",
//         credentials: "include", // sends cookie
//         headers: {
//           "Content-Type": "application/json",
//         },
//     });
//     console.log("logout data")
//     const data = await res.json()
//     console.log(data)
//     }
//     useEffect(() => {
//         if(!next)return
//       setTimeout(() => {
//         window.location.href="/"
//       }, 2000);
//     }, [next])
    
//   return (
//     <section className='dark:bg-black dark:text-white bg-white h-screen w-screen flex flex-col items-center justify-center text-black'>
//       {next ? <>
//       <motion.img initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} src="/logout.gif" alt="" className='h-[50vh]' />
//         <motion.h1 initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='text-5xl mt-15'>Take care and stay healthy...</motion.h1>
//         <p className='text-sm mt-15'>Loging you out.... Please wait</p>
//       </>:<>
//       <motion.img initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} src="/lockout.gif" alt="" className='h-[50vh] rounded-full' />
//         <motion.h1 initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='text-5xl mt-10'>Do you really want to log out?</motion.h1>
//         <div className='flex justify-between w-2xl mt-20'>
//             <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='bg-teal-500 text-white px-15 text-base py-4 rounded-sm hover:bg-teal-600 active:scale-90 cursor-pointer hover:scale-105 transition-all duration-100' onClick={()=>{toast.success("Write Choice Made!");history.back()}}>No, Cancel</motion.button>
//             <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='bg-red-500 text-white px-15 text-base py-4 rounded-sm hover:bg-red-600 active:scale-90 cursor-pointer hover:scale-105 transition-all duration-100' onClick={()=>logOut()}>Yes, Log me out</motion.button>
//       </div></>}
//     </section>
//   )
// }

// export default MakeLogout
