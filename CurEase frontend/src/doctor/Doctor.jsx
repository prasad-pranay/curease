import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import ChatPage from '../chat/Chat'
import { Toaster } from 'react-hot-toast'

const Doctor = ({id,name,image,temp}) => {
  const [isSidebarOpen,setIsSidebarOpen] = useState(false)
  const [whichTab,setWhichTab] = useState(0)
  const [showChat,setShowChat] = useState(false)
  const location = useLocation()
  useEffect(() => {
    if(location.pathname.includes("appointments")){
      setWhichTab(1)
    }else if(location.pathname.includes("records")){
      setWhichTab(3)
    }else if(location.pathname.includes("profile")){
      setWhichTab(4)
    }else{
      setWhichTab(0)
    }
  }, [location])
  
  return (
    <main className='doctor grid grid-cols-[auto_1fr] h-screen w-screen relative bg-[var(--bg)]'>
        <Sidebar whichTab={whichTab} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <Toaster position="top-right" reverseOrder={true} />
        <main className='flex flex-col  max-w-screen overflow-hidden'>
            <Header whichTab={whichTab} image={image} setShowChat={setShowChat} />
            <Outlet />
        </main>
        {showChat && <div className='absolute top-0 left-0 bg-black/10 w-screen h-screen' onClick={()=>setShowChat(false)}>

        </div>}
        {showChat && <ChatPage id={id} image={image} name={name} />}
    </main>
  )
}

export default Doctor
