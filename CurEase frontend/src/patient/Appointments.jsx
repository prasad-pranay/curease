import { Hourglass,History, IdCard, Star, Calendar, Download, Building, Stethoscope, X, Clock, TicketCheck, Hospital, Plus, Search } from 'lucide-react'
import React, { useState } from 'react'
import {AnimatePresence, motion} from "framer-motion"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { addNewAppointment, getMyData, hospitalDepartments } from '../BackendFunctions'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const TabItem = ({title,Icon,tabNumber,currentIndex,link})=>{
  return <motion.p initial={{opacity:0,scale:.2}} animate={{opacity:1,scale:1}} transition={{duration:.2}} className="w-full">
    <Link to={link} replace={true} className={`transition-all duration-300 cursor-pointer active:scale-80 flex whitespace-nowrap px-5 text-xs py-3 rounded-sm items-center gap-10 w-full ${tabNumber==currentIndex?"bg-[var(--button)] text-white hover:bg-[var(--button-hover)] ":"hover:bg-[var(--bg)]"}`}>
      <Icon size={25} />
      {title}
    </Link>
  
  </motion.p>
}

const ShowImage=({image, setShowReportImage})=>{
  return <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}} className="fixed z-[1000] w-screen h-screen top-0 left-0 flex flex-col items-center justify-center">
    {/* blackout screen */}
    <div onClick={()=>setShowReportImage("")} className='bg-black/90  w-full h-full absolute top-0 left-0'></div>
    <img src={`${import.meta.env.VITE_BACKEND_API_URL}/${image}`} alt="" className='h-[80%] relative' />
  </motion.div>
}

const PastAppointmentItem = ({id,date,setShowReportImage,doctor,department,val,rating,report})=>{
  
  const [currRate,setCurrRate] = useState(rating);
    return <motion.div key={val} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.1}} className='transition-all hover:bg-[var(--bg)] h-max duration-300 hover:-translate-y-1 border border-[var(--border)] px-10 py-7 rounded-xl w-full'>
      {/* top bar */}
        <div className='flex justify-between mb-3'>
          <p className='font-semibold text-xs'>ID : {id} </p>
          <p className='flex items-center gap-2 text-xs'><Calendar size={15}/>{date}</p>
        </div>
        {/* Information */}
        <div className='grid grid-cols-[auto_1fr] mt-5 gap-x-5 gap-y-2'>
          <img src="/appointment-done.gif" alt="" className='h-22 rounded-sm row-span-2' />
          {/* department name div */}
          <div>
            <p className='text-xs flex items-center gap-1'><Building size={12}/> Department</p>
            <p className='text-base capitalize'>{department}</p>
          </div>
          <div>
            <p className='text-xs flex items-center gap-1'><Stethoscope size={12}/> Doctor</p>
            <p>Dr. {doctor}</p>
          </div>
        </div>
        {/* rating and status */}
        <div className='flex mt-5 justify-between items-center'>
            <button onClick={()=>{setShowReportImage(report)}} className='active:scale-90 transition-all duration-300 hover:scale-110 group text-sm flex items-center gap-2 bg-[var(--text)] text-[var(--bg)] px-5 py-1.5 rounded-sm cursor-pointer'>
              <Download size={17} className='group-hover:scale-90 transition-transform duration-300'/>
              <span className='group-hover:scale-90 transition-transform duration-300'>Reports</span>
            </button>
          <div className='flex flex-wrap gap-2 justify-end w-max ml-auto cursor-pointer'>
            <p className='basis-full text-end text-xs'>{currRate==-1 ? "Leave a Rating":`You Rated ${currRate+1} stars`}</p>
            {[0,1,2,3,4].map((value)=>(
              <Star size={17} className={`hover:scale-110 ${value<=currRate ? "fill-yellow-500":""} `} onClick={()=>{setCurrRate(value);rateAppointment(id,value)}} />
            ))}
          </div>
        </div>
    </motion.div>
}

const UpcomingAppointment = ({date,time,department})=>{
  return <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.1}} className='border border-[var(--border)] transition-all hover:-translate-y-1 duration-300 hover:bg-[var(--bg)] px-20 py-10 rounded-xs flex justify-between'>
    {/* info with iamge */}
    <div className='grid grid-cols-[auto_1fr] gap-x-10 grid-rows-[auto_1fr]'>
      <img src="/appointment.gif" alt="" className='rounded-sm h-20 row-span-2' />
      <div className='flex gap-5'>
        <p className='text-xs flex gap-2'><Clock size={14}/>{time}</p>
        <p className='text-xs flex gap-2'><Calendar size={14}/>{date}</p>
      </div>
      <p className='flex flex-col self-end text-lg'><span className='text-xs flex items-center gap-1'><Building size={12}/>Department</span><span className='capitalize'>{department}</span></p>
    </div>
    {/* cancel or reshedule */}
    <div className='flex justify-between gap-10 mt-10'>
      <button className='text-sm px-5 py-2 rounded-sm bg-red-500 flex items-center gap-1 transition-all duration-300 hover:bg-red-600 text-white cursor-pointer hover:scale-105'><X size={15} />Cancel</button>
      <button className='text-sm px-5 py-2 rounded-sm bg-teal-500 flex items-center gap-1 transition-all duration-300 hover:bg-teal-600 text-white cursor-pointer hover:scale-105'><Clock size={15} />Reshedule</button>
    </div>
  </motion.div>
}

const BookAppointment = ({email,setMyData,myName})=>{
  const [date, setDate] = useState("")
  const [time, setTime] = useState("");
  const [search,setSearch] = useState("")
  const [calOpen,setCalOpen] = useState(false)
  return <div className='relative w-full bg-[var(--card)] h-full overflow-y-scroll patient-scrollbar rounded-tl-lg rounded-bl-lg px-10 py-10 flex flex-col'>
      <div className=' flex gap-10'>
        <motion.div onClick={()=>setCalOpen(prev=>!prev)} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className='relative'>
          <p className={`flex active:scale-90 transition-transform duration-100 items-center ${calOpen ? "bg-[var(--text)] text-[var(--bg)]" :"text-[var(--text)]"} hover:bg-[var(--text)] hover:text-[var(--bg)]  cursor-pointer transition-all duration-300 gap-3 border border-[var(--border)] text-base px-5 py-2 w-max rounded-sm `}>
            {date==""?"Select date ":`${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`}
            <Calendar size={16}/>
          </p>
          {calOpen && <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="absolute bg-[var(--bg)] top-[110%]">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </motion.div>}
        </motion.div>
          <motion.input initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}}
        type="time"
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border border-[var(--border)] hover:bg-[var(--text)] hover:text-[var(--bg)] text-[var(--text)] cursor-pointer transition-all duration-300 rounded-sm px-5 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className='ml-auto w-max self-end flex items-center gap-5 hover:scale-105 transition-transform duration-300 cursor-pointer text-base bg-[var(--button)] text-white active:scale-90 px-10 py-2 rounded-sm' onClick={()=>{
        if(search==""){
          toast.error("Department Not Selected")
        }else if(time==""){
          toast.error("Time not selected")
        }else{
          toast.success("Appointment Booked Successfully")
          setSearch("")
          setDate("")
          setTime("")
          addNewAppointment(`${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`,time,search,email,myName)
          getMyData(setMyData)
        }
      }}>Book <Plus/></motion.button>

      </div>
      {/* choose department */}
      <div className='mt-10'>
        {/* search  button */}
        <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className='flex gap-2 items-center border px-5 py-2 rounded-sm border-[var(--border)] mb-5'>
          <input type="text" value={search} onChange={e=>setSearch(e.target.value.toLowerCase())} placeholder='Search for department' className='w-full outline-none text-sm' />
          <Search/>
        </motion.div>

        <div className='grid grid-cols-3 gap-5'>
          {hospitalDepartments.map((value,index)=>{
            if(value.name.toLowerCase().includes(search) || value.description.toLowerCase().includes(search) ){
              return <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} onClick={()=>setSearch(value.name.toLowerCase())} key={index} className='grid grid-cols-[auto_1fr] gap-x-2 border border-[var(--border)] hover:border-[var(--button)] cursor-default rounded-sm px-5 py-2'>
                <img src={value.image} alt="" className='h-10 row-span-2 self-center' />
                <p className='text-lg'>{value.name}</p>
                <p className='text-xs'>{value.description}</p>
              </motion.div>
            }
        })}
        </div>
      </div>
  </div>
}

function rateAppointment(id,rating){
  try {
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/appointments/rate-appointment`, {
        method: "POST",
        credentials: "include", // sends cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id:id,
          rating:rating
        }),
      });
    } catch (err) {
      console.error("⚠️ Error updating cart:", err);
    }
}

const Appointments = ({currentIndex,data,setMyData}) => {
  // const [currentIndex,setCurrentIndex] = useState(tab)
  const [showReportPage,setShowReportImage] = useState("");
  return (
    <section className='bg-[var(--bg)] h-full w-full text-[var(--text)] py-10 max-w-screen px-10 overflow-hidden flex justify-center items-center'>
        <AnimatePresence>
          {showReportPage!="" && <ShowImage image={showReportPage} setShowReportImage={setShowReportImage} />}
        </AnimatePresence>
        <div className='overflow-x-hidden flex h-full overflow-y-auto gap-10 w-7xl'>
          {/* tabs */}
          <div className='sticky top-0 left-0 bg-[var(--card)] flex flex-col justify-evenly items-center rounded-xs pb-5 px-10 '>
            <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="text-left text-xl w-full mb-3 mt-3 text-[var(--button)] flex items-center gap-5 border-b-2 border-[var(--button)] pb-4"><Hospital/>Appointment</motion.p>
            <TabItem title={<>Upcoming  Appointments</>} Icon={Hourglass} tabNumber={0} currentIndex={currentIndex} link="/appointments" />
            <p className="w-full h-[2px] bg-[var(--bg)]"></p>
            <TabItem title={<>Previous  Appointments</>} Icon={History} tabNumber={1} currentIndex={currentIndex} link="/appointments/expired" />
            <p className="w-full h-[2px] bg-[var(--bg)]"></p>
            <TabItem title={<>Book  Appointments</>} Icon={TicketCheck} tabNumber={2} currentIndex={currentIndex} link="/appointments/new" />
            <p className="w-full h-[2px] bg-[var(--bg)]"></p>
            <TabItem title={<>Your Identitiy  Card</>} Icon={IdCard} tabNumber={3} currentIndex={currentIndex} link="/appointments/id" />
          </div>
          {currentIndex==1 && <div className='h-max min-h-full px-10 py-5 rounded-tl-xs rounded-bl-xs bg-[var(--card)] flex flex-wrap w-full justify-evenly gap-10'>
            {data["appointments"].filter(item => item.status == 2).length>0?
              <>
                {data["appointments"].filter(item => item.status == 2).map((value,index)=>{
                  if(value.status==2)return<PastAppointmentItem setShowReportImage={setShowReportImage} id={value._id} date={value.date} department={value.department} doctor={value.docName} key={index} val={index} rating={value.rating} report={value.report[0][0]} />
                })}
              </>:
              <div className='h-full w-full flex justify-center items-center flex-col gap-10 mt-5'>
                  <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} src="/nothing.gif" alt="" className='h-50 rounded-sm' />
                  <motion.h1 initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='text-xl'>You haven't have any completed Appointment</motion.h1>
                  <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='bg-[var(--button)] px-10 py-3 rounded-sm cursor-pointer active:scale-90 transition-all text-white duration-100 hover:bg-[var(--button-hover)]'>Okay</motion.button>
              </div>
            }   
          </div>}
          {currentIndex==0 && <div className='min-h-full h-max px-10 py-10 rounded-tl-xs w-full rounded-bl-xs bg-[var(--card)] flex flex-col max-w-full gap-10'>
            {data["appointments"].filter(item => item.status != 2).length>0?
              <>
                {data["appointments"].filter(item => item.status != 2).map((value,index)=>{
                  if(value.status!=2)return<UpcomingAppointment date={value.date} time={value.time} department={value.department} key={index} />
                })}
              </>:
              <div className='h-full w-full flex justify-center items-center flex-col gap-8 '>
                  <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} src="/nothing.gif" alt="" className='h-50 rounded-sm' />
                  <motion.h1 initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='text-xl'>You have no upcoming Appointment</motion.h1>
                  <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}>
                  <Link to="/appointments/new" className='bg-[var(--button)] px-10 py-3 rounded-sm cursor-pointer active:scale-90 transition-all text-white duration-100 hover:bg-[var(--button-hover)]'>Book New Appointment</Link>
                  </motion.div>
              </div>
            } 
          </div>}
          {currentIndex==2 && <BookAppointment email={data.contact.email} myName={data.name} setMyData={setMyData} />}
          {currentIndex==3 && <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className='rounded-tl-xs rounded-bl-xs bg-[var(--card)] flex justify-center gap-10 px-10 pb-5 pt-10'>  
            <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} src="/idcard.gif" alt="id card image" className='h-40' />
            <div>
              <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='text-2xl'>Unique Identity Card (UID)</motion.p>
              <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='text-sm mt-5'>Please download this identity card and present it to the security personnel at the entrance to gain entry to the premises. Make sure that the card is clearly visible and in good condition when shown. It serves as your official proof of authorization and access. Kindly keep the identity card with you at all times during your visit. We recommend storing it safely to prevent loss or damage, as it may be required for re-entry or verification. Thank you for your cooperation and understanding.</motion.p>
              <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='cursor-pointer mt-10 px-10 py-3 text-[var(--bg)] bg-[var(--text)] w-max h-max flex items-center gap-3 rounded-sm'>Download <Download/></motion.p>
            </div>
          </motion.div>}
        </div>
    </section>
  )
}

export default Appointments





