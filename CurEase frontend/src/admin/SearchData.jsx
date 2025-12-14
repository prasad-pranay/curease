import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { Search, X } from 'lucide-react'

const DoctorPage = ({doctorList})=>{
    const [tab,setTab] = useState(true)
    const [search,setSearch] = useState('')
    
    return <section className='flex flex-col h-full'>
        {tab && <>
                {/* search box */}
                <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='flex border-2 border-blue-200 px-10 py-2.5 mt-5 rounded-sm gap-5 items-center'>
                    {search && <X onClick={()=>setSearch("")} className='cursor-pointer text-gray-500 hover:text-blue-500 hover:scale-110 active:scale-90 transition-all duration-150' size={18} />}
                    <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder='Search for a doctor here' className='text-sm w-full outline-none' />
                    <Search className='cursor-pointer text-gray-500 hover:text-blue-500 hover:scale-110 active:scale-90 transition-all duration-150' size={18} />
                </motion.div>
                <aside className='flex flex-col gap-5 mt-5 h-full overflow-y-auto patient-scrollbar pt-3 pr-5'>
                    {doctorList.map((value,index)=>{
                                if(!value.name.toLowerCase().includes(search))return
                                const img = (value["imageUrl"].includes("https://")) ? `${value["imageUrl"]}` : `${import.meta.env.VITE_BACKEND_API_URL}${value["imageUrl"]}`
                                return <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  key={index} onClick={()=>{alert('click funciton not defined')}} 
                                className="cursor-pointer mb-2 flex shadow-sm hover:bg-indigo-200 dark:hover:bg-indigo-600/10 px-10 py-5 rounded-sm gap-10 items-center group hover:-translate-y-1 transition-transform duration-300">
                                    <img src={img} alt="" className="h-30 rounded-sm group-hover:scale-105 transition-transform duration-300" />
                                    <div>
                                        <p className="text-xs">Id : {value._id}</p>
                                        <p className="text-xl capitalize">{value.name}</p>
                                        <p className="text-xs">{value.department}</p>
                                    </div>
                                </motion.div>
                    })}
                </aside>
        </>}
    </section>
}
const PatientPage = ({patientList})=>{
    const [tab,setTab] = useState(true)
    const [search,setSearch] = useState('')
    
    return <section className='flex flex-col h-full'>
        {tab && <>
                {/* search box */}
                <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='flex border-2 border-blue-200 px-10 py-2.5 mt-5 rounded-sm gap-5 items-center'>
                    {search && <X onClick={()=>setSearch("")} className='cursor-pointer text-gray-500 hover:text-blue-500 hover:scale-110 active:scale-90 transition-all duration-150' size={18} />}
                    <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder='Search for a doctor here' className='text-sm w-full outline-none' />
                    <Search className='cursor-pointer text-gray-500 hover:text-blue-500 hover:scale-110 active:scale-90 transition-all duration-150' size={18} />
                </motion.div>
                <aside className='flex flex-col gap-5 mt-5 h-full overflow-y-auto pt-3 pr-5'>
                    {patientList.map((value,index)=>{
                                if(!value.name.toLowerCase().includes(search))return
                                const img = (value["imageUrl"].includes("https://")) ? `${value["imageUrl"]}` : `${import.meta.env.VITE_BACKEND_API_URL}${value["imageUrl"]}`
                                return <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  key={index} onClick={()=>{alert('click funciton not defined')}} 
                                className="cursor-pointer mb-2 flex shadow-sm hover:bg-indigo-200 dark:hover:bg-indigo-500/10 px-10 py-5 rounded-sm gap-10 items-center group hover:-translate-y-1 transition-transform duration-300">
                                    <img src={img} alt="" className="h-30 rounded-sm group-hover:scale-105 transition-transform duration-300" />
                                    <div>
                                        <p className="text-xs">Id : {value._id}</p>
                                        <p className="text-xl capitalize">{value.name}</p>
                                        <p className="text-xs">{value.department}</p>
                                    </div>
                                </motion.div>
                    })}
                </aside>
        </>}
    </section>
}

const SearchData = () => {
    const [tab,setTab] = useState(true)
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
    <motion.section
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="bg-white/80 dark:bg-blue-800/20 p-10 rounded-sm h-[70vh] w-6xl flex flex-col justify-center"
    >
        {/* top tab bar */}
        <div className='flex w-full gap-10'>
            <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className={`flex flex-col w-full rounded-sm active:scale-90 transition-all duration-200 py-2 justify-center items-center cursor-pointer ${tab?"bg-indigo-500 dark:bg-indigo-800/80 hover:bg-indigo-600 text-white":"bg-blue-200 dark:bg-blue-900/10 hover:bg-blue-300"}`} onClick={()=>setTab(true)} >Doctor's</motion.p>
            <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className={`flex flex-col w-full rounded-sm active:scale-90 transition-all duration-200 py-2 justify-center items-center cursor-pointer ${!tab?"bg-indigo-500 dark:bg-indigo-800/80 hover:bg-indigo-600 text-white":"bg-blue-200 dark:bg-blue-900/10 hover:bg-blue-300"}`} onClick={()=>setTab(false)} >Patient's</motion.p>
        </div>

        <article className='h-full w-full'>
            {tab ? <DoctorPage doctorList={doctorList} /> : <PatientPage patientList={patientList} />}
        </article>
      
    </motion.section>
  )
}

export default SearchData
