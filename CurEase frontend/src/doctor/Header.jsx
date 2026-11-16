
import React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CalendarClock,
  House,
  MessageCircle,
  Moon,
  Pill,
  SquareActivity,
  Sun,
  User,
} from "lucide-react";

import { ToggleDarkMode } from "../BackendFunctions";

const pageInfo = {
  0: { title: "Overview", Icon: House },
  1: { title: "Appointments", Icon: CalendarClock },
  2: { title: "Pharmacy", Icon: Pill },
  3: { title: "Medical records", Icon: SquareActivity },
  4: { title: "Profile", Icon: User },
};

const Header = ({ whichTab, setShowChat, image }) => {
  const isDark = document.documentElement.classList.contains("dark");

  const img =
    image && image.includes("ProfileImage")
      ? `${import.meta.env.VITE_BACKEND_API_URL}${image}`
      : image;

  const currentPage = pageInfo[whichTab] || pageInfo[0];
  const PageIcon = currentPage.Icon;

  const actionClass =
    "inline-flex items-center justify-center gap-2 h-10 px-3 min-h-max h-20 text-sm " +
    "text-gray-500 dark:text-gray-400 " +
    "hover:text-gray-950 dark:hover:text-white " +
    "hover:bg-gray-100 dark:hover:bg-white/[0.06] " +
    "transition-colors duration-200 rounded-md";

  return (
    <header className="sticky top-0 z-40 flex h-[76px] w-full items-center justify-between border-b border-gray-200/80 bg-white/90 px-5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#151515]/90 sm:px-8 lg:px-10">

      {/* Current page */}
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="flex min-w-0 items-center gap-3"
      >
        <PageIcon
          size={19}
          strokeWidth={1.7}
          className="shrink-0 text-gray-500 dark:text-gray-400"
        />

        <h1 className="truncate text-[17px] font-medium tracking-[-0.4px] text-gray-900 dark:text-white sm:text-lg">
          {currentPage.title}
        </h1>
      </motion.div>

      {/* Actions */}
      <div className="ml-4 flex shrink-0 items-center gap-1 sm:gap-2">

        {/* Messages */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowChat((prev) => !prev)}
          aria-label="Open messages"
          className={`${actionClass} px-2.5 sm:px-3`}
        >
          <MessageCircle size={18} strokeWidth={1.7} />
          <span className="hidden sm:inline">Messages</span>
        </motion.button>

        {/* Theme toggle */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => ToggleDarkMode(true)}
          aria-label="Toggle theme"
          title="Toggle theme"
          className={actionClass}
        >
          {isDark ? (
            <Sun size={19} strokeWidth={1.7} />
          ) : (
            <Moon size={19} strokeWidth={1.7} />
          )}
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          aria-label="Notifications"
          title="Notifications"
          className={`${actionClass} relative`}
        >
          <Bell size={19} strokeWidth={1.7} />
        </motion.button>

        {/* Divider */}
        <div className="mx-2 hidden h-7 w-px bg-gray-200 dark:bg-white/10 sm:block" />

        {/* Profile */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          aria-label="Profile"
          title="Profile"
          className="ml-1 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 transition-colors hover:border-gray-400 dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/30"
        >
          {img ? (
            <img
              src={img}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <User
              size={19}
              strokeWidth={1.7}
              className="text-gray-500 dark:text-gray-400"
            />
          )}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;

// import { Bell, Home, House, CalendarClock, Pill, SquareActivity, User, MessageCircle, Moon } from 'lucide-react'
// import React, { useEffect, useState } from 'react'
// import {motion} from "framer-motion"
// import { ToggleDarkMode } from '../BackendFunctions'

// const pair = {
//   0:<> <House size={20} /> Home</>,
// 1:<> <CalendarClock size={20} /> Appointments</>,
// 2:<> <Pill size={20} /> Pharmacy</>,
// 3:<> <SquareActivity size={20} /> Records</>,
// 4:<> <User size={20} /> Profile</>,
// }

// const Header = ({whichTab,setShowChat,image}) => {
//     const img = image && image.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${image}` : image;

//   return (
//     <header className='flex items-center gap-5 px-10 py-5 relative bg-[var(--card)'>
//         {/* hide previous */}
//         {/* <div className='absolute h-full left-[-5px] z-[1000] top-0 bg-[var(--card) bg-blue-500 w-2'></div> */}
//         {/* current page title */}
//         <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='flex items-center gap-4 hover:text-[var(--button)] cursor-default transition-text duration-300 capitalize'>
//           {pair[whichTab]}
//         </motion.p>
//         {/* buttons */}
//         <motion.button onClick={()=>setShowChat(prev=>!prev)} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 dark:bg-[var(--text)] dark:text-[var(--bg)] bg-[var(--card)] active:scale-90 cursor-pointer transition-all duration-200  ml-auto flex items-center gap-3 text-sm px-5 py-2 rounded-xs '>
//           <span>Messages</span>
//           <MessageCircle size={18} />
//         </motion.button>
//         <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 dark:bg-[var(--text)] dark:text-[var(--bg)] bg-[var(--card)] active:scale-90 cursor-pointer transition-all duration-200  px-3 py-2 rounded-xs' onClick={()=>ToggleDarkMode(true)} ><Moon size={20} /></motion.button>
//         <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 dark:bg-[var(--text)] dark:text-[var(--bg)] bg-[var(--card)] active:scale-90 cursor-pointer transition-all duration-200  px-3 py-2 rounded-xs' ><Bell size={20} /></motion.button>
//         <div>
//             <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:bg-[var(--bg)] cursor-pointer transition-all duration-200  flex justify-center rounded-full '><img src={img} alt="" className='rounded-full h-9 w-9' /></motion.button>
//         </div>
//     </header>
//   )
// }

// export default Header
