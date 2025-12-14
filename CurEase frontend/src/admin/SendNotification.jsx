import {
  Badge,
  BadgeAlert,
  BadgeCheck,
  Bell,
  Captions,
  Contact,
  Plane,
  ScrollText,
  Search,
  Stethoscope,
  User2,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const SendNotiButton = ({handler}) => {
  return (
    <motion.button
    onClick={()=>handler()}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative inline-block p-px font-semibold leading-6 text-white cursor-pointer rounded-sm shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 rounded-sm bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

      <span className="relative z-10 block px-6 py-3 rounded-sm bg-gray-800">
        <div className="relative z-10 flex items-center space-x-2">
          <span className="transition-all text-sm duration-500 group-hover:translate-x-1">
            Send Notification
          </span>
          <Bell
            size={18}
            className="transition-transform duration-500 group-hover:translate-x-1"
          />
        </div>
      </span>
    </motion.button>
  );
};

function Everyone() {
    async function handler(){
        if(data.title==""){
                toast.error("Title Cannot be empty for sending notification")
                return 
            }else if(data.content==""){
                toast.error("Content Cannot be empty for sending notification")
                return 
            }
            const Response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/notification/multiple-person`,{
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priority: priority,
                    type: "everyone",
                    title: data.title,
                    content: data.content,
                    _id: data._id
                }),
            })
            const recievedata = await Response.json()
            if(recievedata.success){
                toast.success("Notification Sent Successfully")
                setData({...data,"title":"",content:""})
            }else{
                toast.error("An Error Occured check backend for it")
            }
    }
  const [priority, setPriority] = useState(0);
      const [data,setData] = useState({"title":'',content:"","_id":""})

  return (
    <div className="w-full">
      <motion.p
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-red-400 text-sm mb-5"
      >
        Note: This notification will be sent to everyone without any filters.
      </motion.p>
      <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2">
        <ScrollText size={18} />
        Notification Title
      </Label>
      <Input value={data.title} onChange={e=>setData({...data,"title":e.target.value})} placeholder="Enter the title for the notification uppercase" />
      <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2 mt-5">
        <Captions size={18} />
        Notification Content
      </Label>
      <Textarea
      value={data.content} onChange={e=>setData({...data,"content":e.target.value})}
        className="w-full text-xl px-10 py-10 resize-none capitalize"
        placeholder="Enter the notification content you want to send..."
      ></Textarea>
      <div className="flex items-center justify-between mt-10">
        {/* priority */}
        <div className="flex gap-10 ">
          <Label className="flex flex-col items-center gap-2">
            <Plane size={18} /> Priority
          </Label>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex gap-5 items-center justify-center py-2 px-5 text-xs cursor-pointer active:scale-90 transition-all duration-200 border-2 rounded-sm ${
              priority == 0
                ? "border-black dark:border-white hover:bg-green-100/10 dark:hover:bg-teal-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(0)}
          >
            <Badge />
            Low
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex gap-5 items-center justify-center py-2 px-5 text-xs cursor-pointer active:scale-90 transition-all duration-200 border-2 rounded-sm ${
              priority == 1
                ? "border-black dark:border-white hover:bg-blue-100/10 dark:hover:bg-indigo-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(1)}
          >
            <BadgeCheck />
            Normal
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex gap-5 items-center justify-center py-2 px-5 text-xs cursor-pointer active:scale-90 transition-all duration-200 border-2 rounded-sm ${
              priority == 2
                ? "border-black dark:border-white hover:bg-red-100/10 dark:hover:bg-red-600/10"
                : "border-transparent "
            }`}
            onClick={() => setPriority(2)}
          >
            <BadgeAlert />
            High
          </motion.button>
        </div>
        <SendNotiButton handler={handler} />
      </div>
    </div>
  );
}

function EveryDoctor(){
    async function handler(){
        if(data.title==""){
                toast.error("Title Cannot be empty for sending notification")
                return 
            }else if(data.content==""){
                toast.error("Content Cannot be empty for sending notification")
                return 
            }
            const Response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/notification/multiple-person`,{
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priority: priority,
                    type: "doctor",
                    title: data.title,
                    content: data.content,
                    _id: data._id
                }),
            })
            const recievedata = await Response.json()
            if(recievedata.success){
                toast.success("Notification Sent Successfully")
                setData({...data,"title":"",content:""})
            }else{
                toast.error("An Error Occured check backend for it")
            }
    }
  const [priority, setPriority] = useState(0);
      const [data,setData] = useState({"title":'',content:"","_id":""})

    return <div className="w-full h-full flex flex-col justify-center">
        <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2">
        <ScrollText size={18} />
        Notification Title
      </Label>
      <Input value={data.title} onChange={e=>setData({...data,"title":e.target.value})} placeholder="Enter the title for the notification uppercase" />
      <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2 mt-5">
        <Captions size={18} />
        Notification Content
      </Label>
      <Textarea
      value={data.content} onChange={e=>setData({...data,"content":e.target.value})}
        className="w-full text-xl px-10 py-10 resize-none capitalize"
        placeholder="Enter the notification content you want to send..."
      ></Textarea>
      <div className="flex items-center justify-between mt-3">
        {/* priority */}
        <div className="grid grid-cols-3 gap-x-10 ">
          <Label className="col-span-3 flex items-center gap-2 mb-2">
            <Plane size={18} /> Priority
          </Label>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 0
                ? "border-black dark:border-white hover:bg-green-100/10 dark:hover:bg-teal-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(0)}
          >
            <Badge size={18} />
            Low
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 1
                ? "border-black dark:border-white hover:bg-blue-100/10 dark:hover:bg-indigo-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(1)}
          >
            <BadgeCheck size={18} />
            Normal
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 2
                ? "border-black dark:border-white hover:bg-red-100/10 dark:hover:bg-red-600/10"
                : "border-transparent "
            }`}
            onClick={() => setPriority(2)}
          >
            <BadgeAlert size={18} />
            High
          </motion.button>
        </div>
        <div className="mt-10">

        <SendNotiButton handler={handler} />
        </div>
    </div>
    </div>
}

function EveryPatient(){
    async function handler(){
        if(data.title==""){
                toast.error("Title Cannot be empty for sending notification")
                return 
            }else if(data.content==""){
                toast.error("Content Cannot be empty for sending notification")
                return 
            }
            const Response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/notification/multiple-person`,{
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priority: priority,
                    type: "patient",
                    title: data.title,
                    content: data.content,
                    _id: data._id
                }),
            })
            const recievedata = await Response.json()
            if(recievedata.success){
                toast.success("Notification Sent Successfully")
                setData({...data,"title":"",content:""})
            }else{
                toast.error("An Error Occured check backend for it")
            }
    }
  const [priority, setPriority] = useState(0);
      const [data,setData] = useState({"title":'',content:"","_id":""})

    return <div className="w-full h-full flex flex-col justify-center">
        <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2">
        <ScrollText size={18} />
        Notification Title
      </Label>
      <Input value={data.title} onChange={e=>setData({...data,"title":e.target.value})} placeholder="Enter the title for the notification uppercase" />
      <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2 mt-5">
        <Captions size={18} />
        Notification Content
      </Label>
      <Textarea
      value={data.content} onChange={e=>setData({...data,"content":e.target.value})}
        className="w-full text-xl px-10 py-10 resize-none capitalize"
        placeholder="Enter the notification content you want to send..."
      ></Textarea>
      <div className="flex items-center justify-between mt-3">
        {/* priority */}
        <div className="grid grid-cols-3 gap-x-10 ">
          <Label className="col-span-3 flex items-center gap-2 mb-2">
            <Plane size={18} /> Priority
          </Label>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 0
                ? "border-black dark:border-white hover:bg-green-100/10 dark:hover:bg-teal-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(0)}
          >
            <Badge size={18} />
            Low
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 1
                ? "border-black dark:border-white hover:bg-blue-100/10 dark:hover:bg-indigo-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(1)}
          >
            <BadgeCheck size={18} />
            Normal
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 2
                ? "border-black dark:border-white hover:bg-red-100/10 dark:hover:bg-red-600/10"
                : "border-transparent "
            }`}
            onClick={() => setPriority(2)}
          >
            <BadgeAlert size={18} />
            High
          </motion.button>
        </div>
        <div className="mt-10">

        <SendNotiButton handler={handler} />
        </div>
    </div>
    </div>
}

function SinglePatient({patientList}){
    async function handler(){
        if(data.title==""){
                toast.error("Title Cannot be empty for sending notification")
                return 
            }else if(data.content==""){
                toast.error("Content Cannot be empty for sending notification")
                return 
            }
            const Response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/notification/single-person`,{
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priority: priority,
                    type: "patient",
                    title: data.title,
                    content: data.content,
                    _id: data._id
                }),
            })
            const recievedata = await Response.json()
            if(recievedata.success){
                toast.success("Notification Sent Successfully")
                setData({...data,"title":"",content:""})
            }else{
                toast.error("An Error Occured check backend for it")
            }
    }
    const [patientSearch, setPatientSearch] = useState("");
    // searchpage will contain the sinle person specific id,name,image
    const [searchPage,setSearchPage] = useState([])
    const [priority, setPriority] = useState(0);
    const [data,setData] = useState({"title":'',content:"","_id":""})

    
    return <article className="py-10 flex h-full">
    {searchPage.length==0 && <aside className="h-full w-full pr-5 overflow-y-scroll patient-scrollbar max-h-76">
        <div className="sticky top-0 z-[1000] bg-[#F1F4FF] dark:bg-black/10 p-2">
            <div className='flex items-center gap-2 border rounded-sm px-8 py-2.5'>
            {patientSearch && <X onClick={()=>setPatientSearch("")} className="hover:scale-110 cursor-pointer active:scale-80 text-gray-500" />}
            <input value={patientSearch} onChange={e=>setPatientSearch(e.target.value)} type="text" placeholder='Search for a patient name' className='text-base outline-none w-full' />
            <Search className="hover:scale-110 cursor-pointer active:scale-80 text-gray-500"/>
            </div>
        </div>
        {patientList.map((value,index)=>{
            if(!value.name.toLowerCase().includes(patientSearch))return
            return <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  key={index} onClick={()=>{setData({...data,"_id":value._id});setSearchPage([value._id,value.name,value.imageUrl])}} 
            className="cursor-pointer mb-2 flex shadow-sm hover:bg-indigo-100 dark:hover:bg-blue-900/20 px-10 py-5 rounded-sm gap-10 items-center group hover:-translate-y-1 transition-transform duration-300">
                <img src={(value["imageUrl"] =="") ? `${import.meta.env.VITE_BACKEND_API_URL}/nouser.jpg` : `${import.meta.env.VITE_BACKEND_API_URL}${value["imageUrl"]}`} alt="" className="h-30 rounded-sm group-hover:scale-105 transition-transform duration-300" />
                <div>
                    <p className="text-xs">Id : {value._id}</p>
                    <p className="text-xl capitalize">{value.name}</p>
                    <p className="text-xs">Age : {value.info.age}</p>
                    <p className="capitalize mt-2 text-xs border-2 w-max px-3 py-1 rounded-xs">{value.plan}</p>
                </div>
            </motion.div>
        })}
    </aside>}
    {searchPage.length>0 && <div className="w-full h-full flex flex-col justify-center">
        <div className="grid grid-cols-[.5fr_1fr] gap-x-10">
        <div className="row-span-4 flex flex-col bg-indigo-100 dark:bg-indigo-900/20 items-center justify-center gap-5 group">
            <img src={(searchPage[2] =="") ? `${import.meta.env.VITE_BACKEND_API_URL}/nouser.jpg` : `${import.meta.env.VITE_BACKEND_API_URL}${searchPage[2]}`} alt="" className="h-30 w-max rounded-sm group-hover:scale-105 transition-transform duration-300" />
            {/* <p className="text-xs">Id : {value._id}</p> */}
            <p className="text-xl capitalize">{searchPage[1]}</p>
        </div>
        
        <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2">
        <ScrollText size={18} />
        Notification Title
      </Label>
      <Input value={data.title} onChange={e=>setData({...data,"title":e.target.value})} placeholder="Enter the title for the notification uppercase" />
      <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2 mt-5">
        <Captions size={18} />
        Notification Content
      </Label>
      <Textarea
      value={data.content} onChange={e=>setData({...data,"content":e.target.value})}
        className="w-full text-xl px-10 py-10 resize-none capitalize"
        placeholder="Enter the notification content you want to send..."
      ></Textarea>

        </div>

      <div className="flex items-center justify-between mt-3">
        {/* priority */}
        <div className="grid grid-cols-3 gap-x-10 ">
          <Label className="col-span-3 flex items-center gap-2 mb-2">
            <Plane size={18} /> Priority
          </Label>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 0
                ? "border-black dark:border-white hover:bg-green-100/10 dark:hover:bg-teal-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(0)}
          >
            <Badge size={18} />
            Low
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 1
                ? "border-black dark:border-white hover:bg-blue-100/10 dark:hover:bg-indigo-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(1)}
          >
            <BadgeCheck size={18} />
            Normal
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 2
                ? "border-black dark:border-white hover:bg-red-100/10 dark:hover:bg-red-600/10"
                : "border-transparent "
            }`}
            onClick={() => setPriority(2)}
          >
            <BadgeAlert size={18} />
            High
          </motion.button>
        </div>
        <div className="mt-10">

        <SendNotiButton handler={handler} />
        </div>
    </div>
    </div>}
    </article>
}
function Patient({patientList}){
    

  const [patientTab, setPatientTab] = useState(true);

    return <div className="w-full grid grid-cols-[.5fr_1fr] h-full py-5 gap-10">
            <article className="flex flex-col gap-5 py-10">
              <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} 
                className={`flex flex-col w-full h-full items-center justify-center rounded-sm outline-none transition-all duration-200 cursor-pointer gap-5 text-xl ${
                  patientTab
                    ? "bg-blue-400 hover:bg-blue-500 dark:bg-indigo-800/80 text-white"
                    : "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/10"
                }`}
                onClick={() => setPatientTab(true)}
              >
                <Users />
                All Patients
              </motion.button>
              <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} 
                className={`flex flex-col w-full h-full items-center justify-center rounded-sm outline-none transition-all duration-200 cursor-pointer gap-5 text-xl ${
                  !patientTab
                    ? "bg-blue-400 hover:bg-blue-500 dark:bg-indigo-800/80 text-white"
                    : "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/10"
                }`}
                onClick={() => setPatientTab(false)}
              >
                <Contact />
                Specific Patients
              </motion.button>
            </article>
            <article>
                {patientTab?<EveryPatient/>:<SinglePatient patientList={patientList} />}
            </article>
          </div>
}

function SingleDoctor({doctorList}){
    async function handler(){
        if(data.title==""){
                toast.error("Title Cannot be empty for sending notification")
                return 
            }else if(data.content==""){
                toast.error("Content Cannot be empty for sending notification")
                return 
            }
            const Response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/notification/single-person`,{
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priority: priority,
                    type: "doctor",
                    title: data.title,
                    content: data.content,
                    _id: data._id
                }),
            })
            const recievedata = await Response.json()
            if(recievedata.success){
                toast.success("Notification Sent Successfully")
                setData({...data,"title":"",content:""})
            }else{
                toast.error("An Error Occured check backend for it")
            }
    }
    const [doctorSearch, setDoctorSearch] = useState("");
    // searchpage will contain the sinle doctor specific id,name,image
    const [searchPage,setSearchPage] = useState([])
    const [priority, setPriority] = useState(0);
    const [data,setData] = useState({"title":'',content:"","_id":""})
    return <article className="py-10 flex h-full">
    {searchPage.length==0 && <aside className="h-full w-full pr-5 overflow-y-scroll patient-scrollbar max-h-76">
        <div className="sticky top-0 z-[1000] bg-[#F1F4FF] dark:bg-black/10 p-2">
            <div className='flex items-center gap-2 border rounded-sm px-8 py-2.5'>
            {doctorSearch && <X onClick={()=>setDoctorSearch("")} className="hover:scale-110 cursor-pointer active:scale-80 text-gray-500" />}
            <input value={doctorSearch} onChange={e=>setDoctorSearch(e.target.value)} type="text" placeholder='Search for a Doctor name' className='text-base outline-none w-full' />
            <Search className="hover:scale-110 cursor-pointer active:scale-80 text-gray-500"/>
            </div>
        </div>
        {doctorList.map((value,index)=>{
            if(!value.name.toLowerCase().includes(doctorSearch))return
            return <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  key={index} onClick={()=>{setData({...data,"_id":value._id});setSearchPage([value._id,value.name,value.imageUrl])}} 
            className="cursor-pointer mb-2 flex shadow-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/20 px-10 py-5 rounded-sm gap-10 items-center group hover:-translate-y-1 transition-transform duration-300">
                <img src={(value["imageUrl"] =="") ? `${import.meta.env.VITE_BACKEND_API_URL}/nouser.jpg` : `${import.meta.env.VITE_BACKEND_API_URL}${value["imageUrl"]}`} alt="" className="h-30 rounded-sm group-hover:scale-105 transition-transform duration-300" />
                <div>
                    <p className="text-xs">Id : {value._id}</p>
                    <p className="text-xl capitalize">{value.name}</p>
                    <p className="text-xs">{value.department}</p>
                </div>
            </motion.div>
        })}
    </aside>}
    {searchPage.length>0 && <div className="w-full h-full flex flex-col justify-center">

        <div className="grid grid-cols-[.5fr_1fr] gap-x-10">
        <div className="row-span-4 flex flex-col bg-indigo-100 dark:bg-indigo-900/20 items-center justify-center gap-5 group">
            <img src={(searchPage[2] =="") ? `${import.meta.env.VITE_BACKEND_API_URL}/nouser.jpg` : `${import.meta.env.VITE_BACKEND_API_URL}${searchPage[2]}`} alt="" className="h-30 w-max rounded-sm group-hover:scale-105 transition-transform duration-300" />
            {/* <p className="text-xs">Id : {value._id}</p> */}
            <p className="text-xl capitalize">{searchPage[1]}</p>
        </div>
        
        <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2">
        <ScrollText size={18} />
        Notification Title
      </Label>
      <Input value={data.title} onChange={e=>setData({...data,"title":e.target.value})} placeholder="Enter the title for the notification uppercase" />
      <Label className="mb-2 text-slate-700 dark:text-slate-400 flex items-center gap-2 mt-5">
        <Captions size={18} />
        Notification Content
      </Label>
      <Textarea
        value={data.content} onChange={e=>setData({...data,"content":e.target.value})}
        className="w-full text-xl px-10 py-10 resize-none capitalize"
        placeholder="Enter the notification content you want to send..."
      ></Textarea>

        </div>

      <div className="flex items-center justify-between mt-3">
        {/* priority */}
        <div className="grid grid-cols-3 gap-x-10 ">
          <Label className="col-span-3 flex items-center gap-2 mb-2">
            <Plane size={18} /> Priority
          </Label>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 0
                ? "border-black dark:border-white hover:bg-green-100/10 dark:hover:bg-teal-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(0)}
          >
            <Badge size={18} />
            Low
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 1
                ? "border-black dark:border-white hover:bg-blue-100/10 dark:hover:bg-indigo-600/10"
                : "border-transparent"
            }`}
            onClick={() => setPriority(1)}
          >
            <BadgeCheck size={18} />
            Normal
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col gap-1 items-center justify-center py-2 px-5 text-xs rounded-sm cursor-pointer active:scale-90 transition-all duration-200 border-2 ${
              priority == 2
                ? "border-black dark:border-white hover:bg-red-100/10 dark:hover:bg-red-600/10"
                : "border-transparent "
            }`}
            onClick={() => setPriority(2)}
          >
            <BadgeAlert size={18} />
            High
          </motion.button>
        </div>
        <div className="mt-10">

        <SendNotiButton handler={handler} />
        </div>
    </div>
    </div>}
    </article>
}

function Doctor({doctorList}){
  const [DoctorTab, setDoctorTab] = useState(true);

    return <div className="w-full grid grid-cols-[1fr_.5fr] h-full py-5 gap-10">
            <article>
                {DoctorTab?<EveryDoctor/>:<SingleDoctor doctorList={doctorList} />}
            </article>
            <article className="flex flex-col gap-5 py-10">
              <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} 
                className={`flex flex-col w-full h-full items-center justify-center rounded-sm outline-none transition-all duration-200 cursor-pointer gap-5 text-xl ${
                  DoctorTab
                    ? "bg-blue-400 hover:bg-blue-500 dark:bg-indigo-800/80 text-white"
                    : "bg-blue-100 dark:bg-blue-900/10 hover:bg-blue-200"
                }`}
                onClick={() => setDoctorTab(true)}
              >
                <Users />
                All Doctors
              </motion.button>
              <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} 
                className={`flex flex-col w-full h-full items-center justify-center rounded-sm outline-none transition-all duration-200 cursor-pointer gap-5 text-xl ${
                  !DoctorTab
                    ? "bg-blue-400 hover:bg-blue-500 dark:bg-indigo-800/80 text-white"
                    : "bg-blue-100 dark:bg-blue-900/10 hover:bg-blue-200"
                }`}
                onClick={() => setDoctorTab(false)}
              >
                <Contact />
                Specific Doctors
              </motion.button>
            </article>
            
          </div>
}

const SendNotification = () => {
  const [tab, selectedtab] = useState("everyone");
  const [patientList,setPatientList] = useState([])
  const [doctorList,setDoctorList] = useState([])
  
  useEffect(() => {
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/list-patients`).then(data=>data.json()).then(data=>{
        setPatientList(data.data)
      })
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/list-doctors`).then(data=>data.json()).then(data=>{
        setDoctorList(data.data)
      })
    }, [])

  return (
    <motion.section initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} className="bg-white/90 dark:bg-black/20 p-10 rounded-sm h-[70vh] w-6xl">
      {/* tabs */}
      <div className="flex gap-10 py-2 items-center px-10">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${
            tab == "everyone"
              ? "bg-blue-400 dark:bg-indigo-800 text-white hover:bg-blue-500"
              : "hover:bg-blue-100 dark:hover:bg-indigo-900/50"
          } transition-all duration-200 cursor-pointer  py-2 rounded-sm flex items-center gap-2 justify-center w-full`}
          onClick={() => selectedtab("everyone")}
        >
          <Users size={18} />
          Everyone
        </motion.button>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${
            tab == "patient"
              ? "bg-blue-400 dark:bg-indigo-800 text-white hover:bg-blue-500"
              : "hover:bg-blue-100 dark:hover:bg-indigo-900/50"
          } transition-all duration-200 cursor-pointer  py-2 rounded-sm flex items-center gap-2 justify-center w-full`}
          onClick={() => selectedtab("patient")}
        >
          <User2 size={18} />
          Patient
        </motion.button>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${
            tab == "doctor"
              ? "bg-blue-400 dark:bg-indigo-800 text-white hover:bg-blue-500"
              : "hover:bg-blue-100 dark:hover:bg-indigo-900/50"
          } transition-all duration-200 cursor-pointer  py-2 rounded-sm flex items-center gap-2 justify-center w-full`}
          onClick={() => selectedtab("doctor")}
        >
          <Stethoscope size={18} />
          Doctor
        </motion.button>
      </div>
      <aside className="px-10 flex flex-col h-full justify-center items-center">
        {tab == "everyone" && <Everyone />}
        {tab == "patient" && <Patient patientList={patientList} />}
        {tab == "doctor" && <Doctor doctorList={doctorList} />}
      </aside>
    </motion.section>
  );
};

export default SendNotification;
