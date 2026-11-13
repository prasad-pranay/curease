import { HeartPulse, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";

const SearchPage = ({listPatients,setSearchPage}) => {
    const navigate = useNavigate()
  const [search, setSearch] = useState("");
  return (
    <section className="px-10 py-10">
      <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="bg-[var(--card)] p-10 rounded-xs">
        <div className="text-4xl gap-x-5 grid grid-cols-[auto_1fr]">
            <img src="/search.gif" alt="" className="h-20 row-span-2 rounded-sm" />
            <h1 className="flex items-center gap-5">
                <HeartPulse size={35} />
                Search Patient
            </h1>
            <p className="text-base mt-3 mb-5">
          Start searching with a name or browse the list of patients below
        </p>
        </div>
        
        <div className="flex items-center gap-3 bg-[var(--bg)] mt-5 px-5 py-2 rounded-xs">
          {search && <X size={20} className="hover:scale-110 active:scale-100 transition-transform duration-100 cursor-pointer hover:text-red-500" onClick={()=>setSearch("")} />}
          <input
            type="text"
            placeholder="Search for a Patient"
            className="w-full outline-none"
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />
          <Search size={20} className="hover:scale-110 active:scale-100 transition-transform duration-100 cursor-pointer hover:text-teal-600" />
        </div>
      </motion.div>

      <article className="flex flex-wrap gap-5 mt-10">
        {listPatients.map((value,index)=>{
            return <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  key={index} onClick={()=>{setSearchPage(false);navigate(`/records?patient=${value._id}`)}} className="cursor-pointer flex bg-[var(--card)] px-10 py-5 rounded-sm gap-10 items-center group hover:-translate-y-1 transition-transform duration-300">
                <img src={(value["imageUrl"] =="") ? `${import.meta.env.VITE_BACKEND_API_URL}/nouser.jpg` : `${import.meta.env.VITE_BACKEND_API_URL}${value["imageUrl"]}`} alt="" className="h-30 rounded-sm group-hover:scale-105 transition-transform duration-300" />
                <div>
                    <p className="text-xs">Id : {value._id}</p>
                    <p className="text-xl capitalize">{value.name}</p>
                    <p className="text-xs">Age : {value.info.age}</p>
                    <p className="capitalize mt-2 text-xs bg-[var(--text)] text-[var(--card)] w-max px-3 py-1 rounded-xs">{value.plan}</p>
                </div>
            </motion.div>
        })}
      </article>
    </section>
  );
};

const DoctorRecord = () => {
  const [listPatients,setListPatients] = useState([])
  const [searchPage, setSearchPage] = useState(true);
  
  function getListOfPatient() {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/list-patients`).then(data=>data.json()).then(data=>{
        setListPatients(data["data"])
      })
  }

  useEffect(() => {
    getListOfPatient()
  }, [])
  
  return (
    <main>
      {searchPage && <SearchPage listPatients={listPatients} setSearchPage={setSearchPage} />}
    </main>
  );
};

export default DoctorRecord;
