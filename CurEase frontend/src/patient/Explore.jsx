import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"

const Explore = () => {
  return (
    <section className='bg-[var(--bg)] h-full w-full text-[var(--text)] py-10 px-20  flex justify-center items-center'>
        <div className='grid grid-cols-2 items-center gap-20 w-full'>
            <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='justify-self-center w-[80%] cursor-pointer bg-[var(--card)] rounded-xl  px-10 py-10 overflow-hidden group'>
              <Link to="/explore/events" >
                <img src="/event.png" alt="" className='h-70 w-max mx-auto group-hover:scale-110 transition-transform duration-300 ' />
                <p className='text-3xl text-center'>Events</p>
              </Link>
            </motion.div>
            <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='cursor-pointer bg-[var(--card)] rounded-xl w-[80%] justify-self-center px-10 py-10 overflow-hidden group'>
              <Link to="/explore/community">
                <img src="/community.png" alt="" className='h-70 w-max mx-auto group-hover:scale-110 transition-transform duration-300 ' />
                <p className='text-3xl text-center'>Community</p>
              </Link>
            </motion.div>
        </div>
    </section>
  )
}

export default Explore
