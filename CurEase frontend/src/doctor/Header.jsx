import { Bell, Home, House, CalendarClock, Pill, SquareActivity, User, MessageCircle, Moon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { ToggleDarkMode } from '../BackendFunctions'

const pair = {
  0:<> <House size={20} /> Home</>,
1:<> <CalendarClock size={20} /> Appointments</>,
2:<> <Pill size={20} /> Pharmacy</>,
3:<> <SquareActivity size={20} /> Records</>,
4:<> <User size={20} /> Profile</>,
}

const Header = ({whichTab,setShowChat,image}) => {
    const img = image && image.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${image}` : image;

  return (
    <header className='flex items-center gap-5 px-10 py-5 relative bg-[var(--card)'>
        {/* hide previous */}
        {/* <div className='absolute h-full left-[-5px] z-[1000] top-0 bg-[var(--card) bg-blue-500 w-2'></div> */}
        {/* current page title */}
        <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='flex items-center gap-4 hover:text-[var(--button)] cursor-default transition-text duration-300 capitalize'>
          {pair[whichTab]}
        </motion.p>
        {/* buttons */}
        <motion.button onClick={()=>setShowChat(prev=>!prev)} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 dark:bg-[var(--text)] dark:text-[var(--bg)] bg-[var(--card)] active:scale-90 cursor-pointer transition-all duration-200  ml-auto flex items-center gap-3 text-sm px-5 py-2 rounded-xs '>
          <span>Messages</span>
          <MessageCircle size={18} />
        </motion.button>
        <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 dark:bg-[var(--text)] dark:text-[var(--bg)] bg-[var(--card)] active:scale-90 cursor-pointer transition-all duration-200  px-3 py-2 rounded-xs' onClick={()=>ToggleDarkMode(true)} ><Moon size={20} /></motion.button>
        <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 dark:bg-[var(--text)] dark:text-[var(--bg)] bg-[var(--card)] active:scale-90 cursor-pointer transition-all duration-200  px-3 py-2 rounded-xs' ><Bell size={20} /></motion.button>
        <div>
            <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:bg-[var(--bg)] cursor-pointer transition-all duration-200  flex justify-center rounded-full '><img src={img} alt="" className='rounded-full h-9 w-9' /></motion.button>
        </div>
    </header>
  )
}

export default Header
