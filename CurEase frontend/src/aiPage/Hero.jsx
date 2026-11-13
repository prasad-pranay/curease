import { Bot, BotMessageSquare, Camera, Image, Moon, Plus, ScrollText, Slash, Sun, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {AnimatePresence, motion} from "framer-motion"

function formatGeminiResponse(text) {
  let formatted = text;

  // 1. Remove single asterisks used for bullets: "* text"
  formatted = formatted.replace(/(^|\s)\*(?!\*)(.+?)(?=\n|$)/g, "$1$2");

  // 2. Convert **bold** into bigger bold text
  formatted = formatted.replace(
    /\*\*(.*?)\*\*/g,(match, p1) =>
    `<strong onclick="window.open('https://google.com/search?q=${encodeURIComponent(p1)}')" className='text-slate-700 dark:text-slate-400 dark:group-hover:text-blue-400 group-hover:text-blue-700 cursor-pointer hover:-translate-y-[2px] transition-all inline-block duration-300 font-normal'>${p1}</strong>`
  );

  return formatted;
}

const HeroNewChatPage = ({setCurrentChatData}) => {
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file)); // Create temporary URL for preview
      }
    };

    const [query,setQuery] = useState('')

    function uploadQuery(query){
        if(query.length==0)return
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/gemini/get-response`,{
            method:"POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({query:query,chatId:null}),
        }).then(data=>data.json()).then(data=>{
            setCurrentChatData(data.chatId)
        })
    }

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <motion.h1 initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="text-4xl md:text-[40px]">
            What do you want to ask?
        </motion.h1>
        <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="text-base mt-6">Ask anything or upload a image</motion.p>
        {/* text area div */}
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className={`max-w-xl w-full dark:bg-gray-300 dark:text-black bg-gray-900 text-white transition-bg duration-300 rounded-xl mt-4`}>
            {/* show image here */}
            {image!=null && <div className='px-2 pt-2 relative w-max'>
                <img src={image} className="w-9 h-9 object-cover rounded-xl" />
                <X className='stroke-white absolute h-5 w-5 top-0 right-0 p-1 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300' onClick={()=>setImage(null)}/>
            </div>}
            <textarea value={query} onChange={e=>setQuery(e.target.value)} className="w-full p-3 pb-0 resize-none outline-none bg-transparent"
                placeholder="Ask me anything..." rows="3"></textarea>
            <div className="flex items-center justify-between pb-3 px-3">
                {/* add files button */}
                <button className="flex items-center justify-center bg-gray-500 p-1 rounded-full size-6 relative group hover:bg-blue-600 focus:bg-blue-600 transition-bg duration-300 cursor-pointer" aria-label="Add">
                    <Plus size={15} className='stroke-white group-focus:rotate-45 transition-transform duration-300' />
                    <span className={`absolute bottom-[150%] px-2 py-1 left-1/2 -translate-x-1/2 rounded-sm whitespace-nowrap text-xs group-focus:opacity-100 group-focus:scale-100 opacity-0 scale-0 transition-all duration-300 dark:bg-white dark:text-black bg-blue-600 text-white`}>
                        <span className={`flex gap-2 items-center px-5 cursor-pointer transition-bg duration-300 rounded-sm py-3 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white`}><Camera size={14}/> Take a Photo</span>
                        <label htmlFor='ask-ai-upload-photo' className={`flex gap-2 items-center px-5 cursor-pointer transition-bg duration-300 rounded-sm py-3 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white`}>
                            <Image size={14}/>
                            Upload a Photo
                            <input type="file" hidden id='ask-ai-upload-photo' accept="image/*" onChange={handleImageChange} />
                        </label>
                    </span>
                </button>
                {/* upload question button */}
                <button onClick={()=>uploadQuery(query)} className="active:scale-90 transition-all duration-150 hover:scale-105 cursor-pointer flex items-center justify-center p-1 rounded size-6 bg-indigo-600" aria-label="Send">
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1" stroke="#fff" strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </motion.div>
        <div className={`grid grid-cols-2 gap-4 mt-8 dark:text-slate-400 text-slate-500"}`}>
            <motion.p initial={{y:"30px",opacity:0}} animate={{y:0,opacity:1}} className="cursor-pointer active:scale-90 hover:text-slate-400 dark:hover:text-slate-300" onClick={()=>setQuery("What are the symptoms of covid 19?")} >What are the symptoms of covid 19?</motion.p>
            <motion.p initial={{y:"30px",opacity:0}} animate={{y:0,opacity:1}} className="cursor-pointer active:scale-90 hover:text-slate-400 dark:hover:text-slate-300" onClick={()=>setQuery("What does my X-ray Scan means?")} >What does my X-ray Scan means?</motion.p>
            <div className="w-full h-px bg-gray-400/50"></div>
            <div className="w-full h-px bg-gray-400/50"></div>
            <motion.p initial={{y:"30px",opacity:0}} animate={{y:0,opacity:1}} className="cursor-pointer active:scale-90 hover:text-slate-400 dark:hover:text-slate-300" onClick={()=>setQuery("Home Remedy for Cough & Cold?")} >Home Remedy for Cough & Cold?</motion.p>
            <motion.p initial={{y:"30px",opacity:0}} animate={{y:0,opacity:1}} className="cursor-pointer active:scale-90 hover:text-slate-400 dark:hover:text-slate-300" onClick={()=>setQuery("Feeling too tired all day?")} >Feeling too tired all day?</motion.p>
        </div>
    </div>
)
}
function SearchLoader(){
    return <motion.section initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} className='absolute dark:bg-gray-900 bg-gray-100/50 w-full h-full top-0 left-0'>
        <div className="flex flex-row gap-2 items-center justify-center translate-y-5">
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
</div>
    </motion.section>
}
const CenterLoader = ()=>{
    return <motion.section initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} className='absolute top-0 left-0 w-full h-full'>
        <div className="flex-col gap-4 w-full flex h-full items-center justify-center">
  <div
    className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>
    </motion.section>
}

const HeroChatPage = ({currentChatData})=>{
    const [allChats,setAllChats] = useState([])
    const [query,setQuery] = useState('')
    const [image,setImage] = useState(null)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        //   load all chats at once here
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/gemini/get-data`,{
            method:"POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({chatId:currentChatData}),
        }).then(data=>data.json()).then(data=>{
            console.log(data)
            setAllChats(data.data)
        })
    }, [currentChatData])
    function handleImageChange(){

    }

    function uploadQuery(query){
        if(query.length==0)return
        setLoading(true)
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/gemini/get-response`,{
            method:"POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({query:query,chatId:currentChatData}),
        }).then(data=>data.json()).then(data=>{
            setAllChats(data.data)
            setQuery('')
            setLoading(false)
        })
    }
    return <section className="flex flex-col py-5 items-center justify-center w-full px-10 h-full" >
        <article className='overflow-y-scroll overflow-x-hidden w-full h-[calc(100%-40px)] pr-3 patient-scrollbar'>
            <article className=' w-full flex flex-col gap-5 min-h-[calc(100%-40px)] items-end justify-end relative'>
            <AnimatePresence>
                {loading && <CenterLoader/>}
            </AnimatePresence>
            {allChats.map((value,index)=>(
                <div key={index} className='grid grid-cols-[1fr_auto] items-center gap-5'>
                    <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}
                      className="px-5 py-2 rounded-sm shadow-xs hover:-translate-y-1 transition-all duration-300 group backdrop-blur-lg bg-white/30 dark:bg-black/60"
                      dangerouslySetInnerHTML={{
                        __html: formatGeminiResponse(value.parts[0].text),
                      }}
                    ></motion.div>
                    <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} className={` py-3 px-3 bg-white/30 rounded-full shadow-sm relative group hover:scale-120 dark:bg-black transition-transform duration-200`}>
                        {value["role"]=="user"?<User size={18} />:<Bot size={18} />}
                        <span className='absolute bottom-[120%] left-1/2 -translate-x-1/2 pointer-events-none text-[9px] uppercase dark:bg-black bg-white shadow-sm px-5 py-1.5 whitespace-nowrap scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300'>{value["role"]=="user"?"You":"Rica Ai"}</span>
                    </motion.button>
                </div>
            ))}
        </article>
        </article>


        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className={`relative flex gap-5 items-center px-5 py-3 w-full bg-gray-100/50 shadow-lg text-black dark:bg-gray-900 dark:text-white transition-bg duration-300 rounded-xl mt-4`}>
            {/* show image here */}
            {image!=null && <div className='px-2 pt-2 relative w-max'>
                <img src={image} className="w-9 h-9 object-cover rounded-xl" />
                <X className='stroke-white absolute h-5 w-5 top-0 right-0 p-1 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300' onClick={()=>setImage(null)}/>
            </div>}
                <button className="flex items-center justify-center bg-gray-500 p-1 rounded-full size-6 relative group hover:bg-blue-600 focus:bg-blue-600 transition-bg duration-300 cursor-pointer" aria-label="Add">
                    <Plus size={15} className='stroke-white group-focus:rotate-45 transition-transform duration-300' />
                    <span className={`absolute bottom-[150%] px-2 py-1 left-1/2 -translate-x-1/2 rounded-sm whitespace-nowrap text-xs group-focus:opacity-100 group-focus:scale-100 opacity-0 scale-0 transition-all duration-300 dark:bg-white dark:text-black bg-blue-600 text-white`}>
                        <span className={`flex gap-2 items-center px-5 cursor-pointer transition-bg duration-300 rounded-sm py-3 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white`}><Camera size={14}/> Take a Photo</span>
                        <label htmlFor='ask-ai-upload-photo' className={`flex gap-2 items-center px-5 cursor-pointer transition-bg duration-300 rounded-sm py-3 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white`}>
                            <Image size={14}/>
                            Upload a Photo
                            <input type="file" hidden id='ask-ai-upload-photo' accept="image/*" onChange={handleImageChange} />
                        </label>
                    </span>
                </button>
            <input value={query} onChange={e=>setQuery(e.target.value)} className="w-full resize-none outline-none bg-transparent" placeholder="Ask me anything..." />
                {/* upload question button */}
                <button onClick={()=>uploadQuery(query)} className="active:scale-90 transition-all duration-150 hover:scale-105 cursor-pointer flex items-center justify-center p-1 rounded size-6 bg-indigo-600" aria-label="Send">
                    <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1" stroke="#fff" strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </button>
                <AnimatePresence>
                {loading && <SearchLoader/>}
                </AnimatePresence>
        </motion.div>
    </section>
}


const Hero = ({currentChatData,setCurrentChatData}) => {    
  return (
    <main className='h-full w-full flex overflow-hidden'>
        {currentChatData==null && <HeroNewChatPage setCurrentChatData={setCurrentChatData} />}
        {currentChatData!=null && <HeroChatPage currentChatData={currentChatData} />}
    </main>
  )
}


export default Hero
