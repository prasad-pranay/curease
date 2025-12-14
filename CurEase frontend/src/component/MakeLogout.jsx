import React from 'react'
import { useState } from 'react'
import {motion} from "framer-motion"
import { useEffect } from 'react'
import toast from 'react-hot-toast'


const MakeLogout = () => {
    const [next,setNext] = useState(false)
    async function logOut(){
        setNext(true)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/logout`, {
        method: "POST",
        credentials: "include", // sends cookie
        headers: {
          "Content-Type": "application/json",
        },
    });
    console.log("logout data")
    const data = await res.json()
    console.log(data)
    }
    useEffect(() => {
        if(!next)return
      setTimeout(() => {
        window.location.href="/"
      }, 2000);
    }, [next])
    
  return (
    <section className='dark:bg-black dark:text-white bg-white h-screen w-screen flex flex-col items-center justify-center text-black'>
      {next ? <>
      <motion.img initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} src="/logout.gif" alt="" className='h-[50vh]' />
        <motion.h1 initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='text-5xl mt-15'>Take care and stay healthy...</motion.h1>
        <p className='text-sm mt-15'>Loging you out.... Please wait</p>
      </>:<>
      <motion.img initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} src="/lockout.gif" alt="" className='h-[50vh] rounded-full' />
        <motion.h1 initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='text-5xl mt-10'>Do you really want to log out?</motion.h1>
        <div className='flex justify-between w-2xl mt-20'>
            <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='bg-teal-500 text-white px-15 text-base py-4 rounded-sm hover:bg-teal-600 active:scale-90 cursor-pointer hover:scale-105 transition-all duration-100' onClick={()=>{toast.success("Write Choice Made!");history.back()}}>No, Cancel</motion.button>
            <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='bg-red-500 text-white px-15 text-base py-4 rounded-sm hover:bg-red-600 active:scale-90 cursor-pointer hover:scale-105 transition-all duration-100' onClick={()=>logOut()}>Yes, Log me out</motion.button>
      </div></>}
    </section>
  )
}

export default MakeLogout
