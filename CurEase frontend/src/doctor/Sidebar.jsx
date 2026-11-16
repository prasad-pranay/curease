
import React from "react";
import {
  CalendarClock,
  House,
  Pill,
  Settings,
  SidebarClose,
  SidebarOpen,
  SquareActivity,
  User,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { useNavigate } from "react-router-dom";

const navigationItems = [
  {
    id: 0,
    label: "Overview",
    icon: House,
    link: "/",
  },
  {
    id: 1,
    label: "Appointments",
    icon: CalendarClock,
    link: "/appointments",
  },
  {
    id: 2,
    label: "Pharmacy",
    icon: Pill,
    link: "/pharmacy",
  },
  {
    id: 3,
    label: "Medical records",
    icon: SquareActivity,
    link: "/records",
  },
  {
    id: 4,
    label: "Profile",
    icon: User,
    link: "/profile",
  },
];

// --------------------------------------------------
// Navigation item
// --------------------------------------------------

const SidebarButtons = ({
  tabNum,
  whichTab,
  isSidebarOpen,
  text,
  Icon,
  link,
}) => {
  const navigate = useNavigate();

  const active = tabNum === whichTab;

  return (
    <button
      type="button"
      onClick={() => navigate(link)}
      title={!isSidebarOpen ? text : undefined}
      aria-current={active ? "page" : undefined}
      className={`
        relative group flex w-full items-center
        ${isSidebarOpen ? "gap-3 px-3" : "justify-center px-0"}
        h-10
        transition-colors duration-150
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--button)]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--card)]
        ${
          active
            ? "bg-gray-100 text-gray-950 dark:bg-white/[0.09] dark:text-white"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.045] dark:hover:text-white"
        }
      `}
    >
      {/* Active indicator */}

      {active && (
        <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-[var(--button)]" />
      )}

      <Icon
        size={19}
        strokeWidth={active ? 2 : 1.7}
        className="shrink-0"
      />

      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.15 }}
            className={`
              whitespace-nowrap text-[13px]
              ${active ? "font-normal" : "font-light"}
            `}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Collapsed tooltip */}

      {!isSidebarOpen && (
        <span
          className="
            absolute left-full z-50 ml-3
            pointer-events-none whitespace-nowrap
            bg-gray-900 px-3 py-2 text-xs text-white
            opacity-0 transition-opacity duration-150
            group-hover:opacity-100
            dark:bg-white dark:text-gray-900
          "
        >
          {text}
        </span>
      )}
    </button>
  );
};

// --------------------------------------------------
// Sidebar
// --------------------------------------------------

const Sidebar = ({
  whichTab,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isSidebarOpen ? 248 : 76,
      }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative z-40 flex h-full shrink-0 flex-col
        overflow-visible
        border-r border-gray-200
        bg-white
        dark:border-white/10 dark:bg-[#151515]
      "
    >
      {/* Brand */}

      <div
        className={`
          flex h-[76px] shrink-0 items-center
          border-b border-gray-100 dark:border-white/[0.07]
          ${isSidebarOpen ? "gap-3 px-5" : "justify-center"}
        `}
      >
        <img
          src="/icon.png"
          alt="CuraEase"
          className="h-9 w-9 shrink-0 object-contain"
        />

        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.15 }}
              className="min-w-0 overflow-hidden"
            >
              <p className="whitespace-nowrap text-[19px] font-semibold tracking-tight text-gray-900 dark:text-white">
                CurEase
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-7">
        {isSidebarOpen && (
          <p className="mb-3 px-3 text-[10px] font-light uppercase tracking-[0.13em] text-gray-400 dark:text-gray-500">
            Workspace
          </p>
        )}

        <div className="flex flex-col gap-1">
          {navigationItems.map((item) => (
            <SidebarButtons
              key={item.id}
              tabNum={item.id}
              whichTab={whichTab}
              isSidebarOpen={isSidebarOpen}
              link={item.link}
              Icon={item.icon}
              text={item.label}
            />
          ))}
        </div>
      </nav>

      {/* Bottom controls */}

      <div className="shrink-0 border-t border-gray-100 px-3 py-4 dark:border-white/[0.07]">

        {/* Settings */}

        <button
          type="button"
          onClick={() => navigate("/settings")}
          title={!isSidebarOpen ? "Settings" : undefined}
          className={`
            group flex h-10 w-full items-center
            text-gray-500 transition-colors
            hover:bg-gray-50 hover:text-gray-900
            dark:text-gray-400 dark:hover:bg-white/[0.045]
            dark:hover:text-white
            ${isSidebarOpen ? "gap-3 px-3" : "justify-center"}
          `}
        >
          <Settings size={19} strokeWidth={1.7} />

          {isSidebarOpen && (
            <span className="text-[13px] font-light">
              Settings
            </span>
          )}
        </button>

        {/* Collapse */}

        <button
          type="button"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className={`
            mt-2 flex h-10 w-full items-center
            text-gray-400 transition-colors
            hover:bg-gray-50 hover:text-gray-900
            dark:text-gray-500 dark:hover:bg-white/[0.045]
            dark:hover:text-white
            ${isSidebarOpen ? "gap-3 px-3" : "justify-center"}
          `}
        >
          {isSidebarOpen ? (
            <SidebarClose size={19} strokeWidth={1.7} />
          ) : (
            <SidebarOpen size={19} strokeWidth={1.7} />
          )}

          {isSidebarOpen && (
            <span className="text-[12px] font-light">
              Collapse
            </span>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

// import { CalendarClock, House, Pill, Settings, SidebarClose, SidebarOpen, SquareActivity, User } from 'lucide-react'
// import React, { useState } from 'react'
// import {AnimatePresence, motion, scale} from "framer-motion"
// import { useNavigate } from 'react-router-dom'


// const SidebarButtons = ({tabNum,whichTab,isSidebarOpen,text,Icon,link})=>{
//   const navigate = useNavigate()
//   return <motion.button onClick={()=>navigate(link)} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className={`${isSidebarOpen ? "px-5 py-3 hover:bg-[var(--bg)]":"p-3 hover:bg-black/10"} ${tabNum==whichTab ? "bg-[var(--button)] hover:text-[var(--button)]":""} active:scale-50 relative group cursor-pointer flex items-center gap-5 transition-bg duration-500 rounded-sm`}>
//       <Icon className={`group-hover:scale-120 transition-transform duration-300 ${tabNum==whichTab  && "stroke-white group-hover:stroke-[var(--button)]"}`} size={22} />
//       {!isSidebarOpen && <span className='absolute left-[150%] top-1/4 scale-0 pointer-events-none transition-all duration-300 group-hover:scale-100 group-hover:opacity-100'>
//           {text}
//       </span>}
//       <AnimatePresence>{isSidebarOpen && <motion.p initial={{x:"-100%",opacity:0}} animate={{x:0,opacity:1}} exit={{x:"-100%",opacity:0}} className={`text-base ${tabNum==whichTab  && "text-white group-hover:text-[var(--button)]"}`}>
//           {text}
//       </motion.p>}</AnimatePresence>
//   </motion.button>
// }

// const Sidebar = ({whichTab,isSidebarOpen,setIsSidebarOpen}) => {
//   return (
//     <section className='flex flex-col items-center justify-between h-full py-5 border-r- border-[var(--border)] px-3 bg-[var(--card) relative'>
//         {/* <div className='absolute h-[79px] right-[-5px] z-[1000] top-0 bg-[var(--card)] w-2'></div> */}

//         <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='p-3 flex items-center justify-center gap-5'>
//           <img src="/icon.png" alt="" className='h-10' />
//           <AnimatePresence>
//             {isSidebarOpen && <motion.p initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} className='font-normal text-4xl text-[var(--text)]' >
//               Curease
//             </motion.p>}
//           </AnimatePresence>
//         </motion.div>
//         {/* Links */}
//         <div className='bg-[#6433FA flex flex-col gap-5 pb-5'>

//             <SidebarButtons tabNum={0} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/" Icon={House} text="Home" />
//             <SidebarButtons tabNum={1} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/appointments" Icon={CalendarClock} text="Appointments" />
//             <SidebarButtons tabNum={2} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/pharmacy" Icon={Pill} text="Pharmacy" />
//             <SidebarButtons tabNum={3} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/records" Icon={SquareActivity} text="Records" />
//             <SidebarButtons tabNum={4} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/profile" Icon={User} text="Profile" />

//         </div>
//         <div className='flex items-center justify-between w-full px-3'>
//         {isSidebarOpen && <button>
//           <Settings/>
//         </button>}
//         {/* open close sidebar */}
//         <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='p-3 group relative' onClick={()=>setIsSidebarOpen(prev=>!prev)}>
//            <span className='whitespace-nowrap text-xs absolute bottom-[100%] left-1/2 -translate-x-1/2 scale-0 pointer-events-none transition-all duration-300 group-hover:scale-100 group-hover:opacity-100'>
//                     Open Sidebar
//                 </span>
//           {isSidebarOpen ?<SidebarClose className='group-hover:scale-120 transition-transform duration-300' size={22} /> :<SidebarOpen className='group-hover:scale-120 transition-transform duration-300' size={22} />}
//         </motion.button>
//         </div>
//     </section>
//   )
// }

// export default Sidebar
