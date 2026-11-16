import React, { useEffect, useState } from 'react'
import Header from './Header'
import SendNotification from './SendNotification'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import AddDoctor from './AddDoctor'
import SearchData from './SearchData'
import Orders from './Orders'
import Logout from './Logout'


const AdminHome = () => {
  const [currentPage,setCurrentPage] = useState("Notification")
  // useEffect(() => {
  //   console.log("hey")
  //   localStorage.setItem("theme","1")
  //     document.body.classList.add("dark")
  //   // document.documentElement.classList.add("dark")
  // }, [])
  
  return (
    <main className='relative admin bg-[#0a0a0a] flex flex-col justify-center items-center overflow-hidden h-screen w-screen'>
        <Header title={currentPage} setCurrentPage={setCurrentPage} />
        <AnimatePresence>
          {currentPage=="Notification" && <SendNotification/>}
          {currentPage=="Add Doctor" && <AddDoctor/>}
          {currentPage=="Search" && <SearchData/>}
          {currentPage=="Orders" && <Orders/>}
          {currentPage=="Log Out" && <Logout/>}
        </AnimatePresence>
        <Toaster position="top-right" reverseOrder={true} />

        <svg className="absolute z-0 pointer-events-none w-screen h-screen -mt-40 md:mt-0" width="1440" height="676" viewBox="0 0 1440 676" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="-92" y="-948" width="1624" height="1624" rx="812" fill="url(#a)"/>
        <defs>
            <radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 428 292)scale(812)">
                <stop offset=".63" stopColor="#372AAC" stopOpacity="0"/>
                <stop offset="1" stopColor="#372AAC"/>
            </radialGradient>
        </defs>
    </svg>
    </main>
  )
}

export default AdminHome
