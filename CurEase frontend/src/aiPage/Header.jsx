import { BotMessageSquare, Camera, Image, Moon, Plus, ScrollText, Sidebar, SidebarClose, SidebarOpen, Slash, Sun, X } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"
import { ToggleDarkMode } from '../BackendFunctions';


const Header = ({setSidebarOpen,sidebarOpen}) => {
  return (
    <nav className="border-b-1 border-gray-800 flex items-center justify-between w-full md:px-16 lg:px-24 xl:px-10 py-4">
        {/* title */}
        <div className='flex gap-2 items-center'>
            <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}>
                <Link to="/" className='text-2xl font-semibold flex items-center gap-3' >
                <img src="/icon.png" alt="iconimage" className='h-10' />
               CurEase
                </Link> 
            </motion.p>
            <Slash className='-rotate-20'/>
            <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='flex items-center gap-2 text-lg relative group cursor-pointer'>
                <BotMessageSquare className='stroke-blue-500'/> 
                <span className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>Rica Ai</span>
                <span className='absolute top-[120%] h-[2px] w-full group-hover:bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 scale-x-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300'></span>
            </motion.p>
        </div>

       <div className='flex items-center gap-10'>
         <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='relative cursor-pointer group' onClick={()=>ToggleDarkMode(true)}>
            <Sun className='dark:block hidden group-hover:rotate-180 transition-transform duration-300' />
            <Moon className='block dark:hidden group-hover:rotate-180 transition-transform duration-300' />
            <span className={`absolute top-[130%] left-1/2 -translate-x-1/2 rounded-sm text-xs px-5 py-1 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none whitespace-nowrap dark:text-black dark:bg-white bg-black text-white`}>
                <span className='hidden dark:block'>Light Mode</span>
                <span className='dark:hidden block'>Dark Mode</span>
            </span>
        </motion.button>
        <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='relative cursor-pointer group' onClick={()=>setSidebarOpen(prev=>!prev)}>
            {sidebarOpen && <SidebarClose/>}
            {!sidebarOpen && <SidebarOpen/>}
            <span className={`absolute top-[130%] left-1/2 -translate-x-1/2 rounded-sm text-xs px-5 py-1 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none dark:text-black dark:bg-white bg-black text-white`}>Sidebar</span>
        </motion.button>
        {/* <button className="max-md:hidden px-6 py-2 bg-white hover:bg-gray-200 text-black transition active:scale-95 rounded-full border border-gray-600">
            Get Started
        </button> */}
       </div>
        <button aria-label="menu burger" className="size-6 md:hidden" id="open-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-align-justify-icon lucide-align-justify">
                <path d="M3 12h18M3 18h18M3 6h18" />
            </svg>
        </button>
    </nav>
  )
}

export default Header
