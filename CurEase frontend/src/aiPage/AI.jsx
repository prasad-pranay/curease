import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import Header from './Header'
import Footer from './footer'
import Sidebar from './Sidebar'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const AI = ({chatPages,image,plan}) => {
    const [sidebarOpen,setSidebarOpen] = useState(false)
    // stores id of current chat, becomes null on new chats
    const [currentChatData,setCurrentChatData] = useState(null)
    const [loading,setLoading] = useState(false)
    function uploadQuery(query){
        if(query.length==0)return
        setLoading(true)
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/gemini/get-response`,{
            method:"POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({query:query,chatId:null}),
        }).then(data=>data.json()).then(data=>{
            setCurrentChatData(data.chatId)
            setSearchParams({});
            setLoading(false)
        })
    }
    const [searchParams,setSearchParams] = useSearchParams();
    useEffect(() => {
        const query = searchParams.get("query");
        if(!query)return
        uploadQuery(query)
    }, [])
    
  return (
    <section className='dark:bg-gray-900 bg-white relative'>
        {loading && <aside className='absolute flex items-center justify-center w-full h-full bg-black/10'>
            <div
  class="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
>
  <div
    class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
  ></div>
</div>
</aside>}
        <Toaster position="top-right" reverseOrder={true} />
        {chatPages && <main className={`flex items-center flex-col justify-between bg-cover text-sm max-md:px-4 text-center h-screen transition-all duration-300 dark:bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-2.png')] dark:text-white bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient.png')] text-gray-800"
        }`}>
            <Header  setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <main className={`grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] w-full h-full overflow-hidden`}>
                <Sidebar plan={plan} image={image} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setCurrentChatData={setCurrentChatData} currentChatData={currentChatData}  />
                <Hero currentChatData={currentChatData} setCurrentChatData={setCurrentChatData} />
                {currentChatData==null && <Footer />}
            </main>
        </main>}
        {!chatPages && <main className={`flex items-center flex-col justify-between bg-cover text-sm max-md:px-4 text-center h-screen transition-all duration-300 
            dark:bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-2.png')] dark:text-white bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient.png')] text-gray-800"
        }`}>
            <Outlet/>
        </main>}
    </section>
  )
}

export default AI
