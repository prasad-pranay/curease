import { CalendarClock, House, Pill, Settings, SidebarClose, SidebarOpen, SquareActivity, User } from 'lucide-react'
import React, { useState } from 'react'
import {AnimatePresence, motion, scale} from "framer-motion"
import { useNavigate } from 'react-router-dom'


const SidebarButtons = ({tabNum,whichTab,isSidebarOpen,text,Icon,link})=>{
  const navigate = useNavigate()
  return <motion.button onClick={()=>navigate(link)} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className={`${isSidebarOpen ? "px-5 py-3 hover:bg-[var(--bg)]":"p-3 hover:bg-black/10"} ${tabNum==whichTab ? "bg-[var(--button)] hover:text-[var(--button)]":""} active:scale-50 relative group cursor-pointer flex items-center gap-5 transition-bg duration-500 rounded-sm`}>
      <Icon className={`group-hover:scale-120 transition-transform duration-300 ${tabNum==whichTab  && "stroke-white group-hover:stroke-[var(--button)]"}`} size={22} />
      {!isSidebarOpen && <span className='absolute left-[150%] top-1/4 scale-0 pointer-events-none transition-all duration-300 group-hover:scale-100 group-hover:opacity-100'>
          {text}
      </span>}
      <AnimatePresence>{isSidebarOpen && <motion.p initial={{x:"-100%",opacity:0}} animate={{x:0,opacity:1}} exit={{x:"-100%",opacity:0}} className={`text-base ${tabNum==whichTab  && "text-white group-hover:text-[var(--button)]"}`}>
          {text}
      </motion.p>}</AnimatePresence>
  </motion.button>
}

const Sidebar = ({whichTab,isSidebarOpen,setIsSidebarOpen}) => {
  return (
    <section className='flex flex-col items-center justify-between h-full py-5 border-r- border-[var(--border)] px-3 bg-[var(--card) relative'>
        {/* <div className='absolute h-[79px] right-[-5px] z-[1000] top-0 bg-[var(--card)] w-2'></div> */}

        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='p-3 flex items-center justify-center gap-5'>
          <img src="/icon.png" alt="" className='h-10' />
          <AnimatePresence>
            {isSidebarOpen && <motion.p initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} className='font-normal text-4xl text-[var(--text)]' >
              Curease
            </motion.p>}
          </AnimatePresence>
        </motion.div>
        {/* Links */}
        <div className='bg-[#6433FA flex flex-col gap-5 pb-5'>

            <SidebarButtons tabNum={0} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/" Icon={House} text="Home" />
            <SidebarButtons tabNum={1} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/appointments" Icon={CalendarClock} text="Appointments" />
            <SidebarButtons tabNum={2} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/pharmacy" Icon={Pill} text="Pharmacy" />
            <SidebarButtons tabNum={3} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/records" Icon={SquareActivity} text="Records" />
            <SidebarButtons tabNum={4} whichTab={whichTab} isSidebarOpen={isSidebarOpen} link="/profile" Icon={User} text="Profile" />

        </div>
        <div className='flex items-center justify-between w-full px-3'>
        {isSidebarOpen && <button>
          <Settings/>
        </button>}
        {/* open close sidebar */}
        <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='p-3 group relative' onClick={()=>setIsSidebarOpen(prev=>!prev)}>
           <span className='whitespace-nowrap text-xs absolute bottom-[100%] left-1/2 -translate-x-1/2 scale-0 pointer-events-none transition-all duration-300 group-hover:scale-100 group-hover:opacity-100'>
                    Open Sidebar
                </span>
          {isSidebarOpen ?<SidebarClose className='group-hover:scale-120 transition-transform duration-300' size={22} /> :<SidebarOpen className='group-hover:scale-120 transition-transform duration-300' size={22} />}
        </motion.button>
        </div>
    </section>
  )
}

export default Sidebar
