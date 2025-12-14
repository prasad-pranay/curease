import {
  MessageSquareText,
  Search,
  Settings2,
  SidebarClose,
  SidebarOpen,
  Trash,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion"

// {
//       role: "user",
//       parts: [{ text: "Hello" }]
//     },

const Sidebar = ({plan, sidebarOpen, setSidebarOpen,currentChatData,setCurrentChatData,image="" }) => {
  const [searchValue, setSearchValue] = useState("");
  const [savedChat,setSavedChat] = useState([])
    useEffect(() => {
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/gemini/saved-chat`,{
            method:"POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
        }).then(data=>data.json()).then(data=>{
            setSavedChat(data.data.reverse())
        })
    }, [currentChatData])
    const img = image ? image.includes("Profile") ? `${import.meta.env.VITE_BACKEND_API_URL}${image}`:image : "/nouser.jpg"
  return (
    <section
      className={`bg-gray-90 backdrop-blur-2xl border-r-1 border-gray-800 row-span-2 transition-all duration-300 h-full pt-10 ${
        sidebarOpen ? "w-[300px]" : "w-0"
      } `}
    >
      <section className={`w-[300px] transition-transform duration-300 flex flex-col h-full ${sidebarOpen?"translate-x-0":"translate-x-[-100%]"}`}>
        <div>
          <p onClick={()=>setCurrentChatData(null)} className="flex gap-2 items-center mx-2 px-3 py-2 mb-2 text-sm hover:bg-white/50 dark:hover:bg-gray-700/50 hover:scale-101 hover:-translate-y-1 transition-all duration-200 cursor-pointer rounded-sm">
            <MessageSquareText size={18} />
            New Chat
          </p>
          <p className="flex gap-2 items-center mx-2 px-3 py-2 text-sm hover:bg-white/50 dark:hover:bg-gray-700/50 hover:scale-101 hover:-translate-y-1 transition-all duration-200 cursor-pointer rounded-sm">
            <Settings2 size={18} />
            Settings
          </p>
          <div className="px-3 mt-10">
            <p className="text-left text-[10px] uppercase mb-3">Search Chat</p>
            {/* search box */}
            <div
              className={`flex px-5 py-2 rounded-sm items-center gap-2 border dark:text-white text-black`}
            >
              {searchValue.length > 0 && <X onClick={()=>setSearchValue('')} />}
              <input
                type="text"
                placeholder="Search chats here"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="text-sm w-full outline-none"
              />
              <Search />
            </div>
          </div>
        </div>
        {/* chat history */}
        <div className="mt-10 flex flex-col items-start px-2 gap-3">
          <h1 className="text-[10px] uppercase pl-1">Chats</h1>
          <AnimatePresence>
            {savedChat.map((value,index)=>{
            if(value[0].includes(searchValue))return(
            <motion.p initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} key={index} 
              className="px-5 py-3 group cursor-pointer capitalize hover:shadow-sm hover:-translate-y-1 w-full text-left shadow-none transition-all duration-300 flex items-center text-sm gap-2" 
              onClick={()=>{setCurrentChatData(value[1])}}>
                <MessageSquareText size={16} />
                {value[0]}
                <Trash size={20} className="py-1 px-1 hover:bg-red-500 hover:text-white rounded-xs hover:scale-120 text-red-500 ml-auto scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"/>
            </motion.p>
          )})}
          </AnimatePresence>
          {savedChat.length==0 && <div className="w-full py-5 flex items-center flex-col gap-5">
            <img src="/null.gif" alt="" className="h-30 w-30 rounded-sm transition-transform hover:scale-110 duration-300" />
            <p className="text-xs">You have no saved chats till now</p>
          </div>}
        </div>
        {/* footer */}
        <div className="border-t-1 border-gray-800 py-3 flex items-center justify-between gap-5 mt-auto px-5">
          <img src={img} alt="" className="h-10 w-10 rounded-full" />
          {/* plan details */}
          <Link to="/ask/pricing" className="transition-transform duration-300 hover:scale-95 text-blue-500 border border-blue-500 rounded-sm border-dashed px-5 py-1 capitalize">{plan}</Link>
        </div>
      </section>
    </section>
  );
};

export default Sidebar;
