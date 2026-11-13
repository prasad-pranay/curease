import { Activity, Calendar, CalendarCheck, CalendarClock, CalendarRange, Clock, Info, RotateCcw, Send, Stethoscope, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {motion} from "framer-motion"
import { Toaster } from 'react-hot-toast';
import { WeatherSunIcon } from '../BackendFunctions';

const data = [
  { name: "Monday", Patient: 400 },
  { name: "Tuesday", Patient: 300 },
  { name: "Wednesday", Patient: 200 },
  { name: "Thursday", Patient: 278 },
  { name: "Friday", Patient: 189 },
  { name: "Saturday", Patient: 189 },
];

function VerticalBarChart() {
  return (
    <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="w-full h-full border pr-5 pt-5 rounded-lg">
        {/* <h1 className='text-xl mb-5'>Patients diagnosed this week</h1> */}
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip labelClassName='text-black' />
          <Legend />
          <Bar dataKey="Patient" fill="#8884d8" barSize={40} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const week = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
const SetAvability = ()=>{
  const today = new Date()
    return <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="group w-full mt-5 h-full mx-auto [perspective:1000px] cursor-pointer">
    <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
        {/* <!-- Front Side --> */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col gap-5 items-center justify-center rounded-xs bg-[var(--card)] borde border-[var(--border)]">
            <Calendar size={60} />
            <p className='text-4xl'>{today.getDate()} {month[today.getMonth()]} </p>
            <p>{week[today.getDay()]}</p>
        </div>

        {/* <!-- Back Side --> */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col px-5 gap-2 items-center justify-center rounded-xs bg-[var(--card)] borde text-[var(--text)] [transform:rotateX(180deg)]">
            <h1 className='flex items-center gap-5 text-2xl'><Clock size={25} />Your Avability</h1>
            {/* <p className='text-xs text-[var(--button)] border-b-1 w-full text-center pb-4'>Till which time you are available today</p> */}
            <input type="time" name="" id="" className='outline-none border px-5 py-2 w-full my-6' />
            <div className='flex justify-between w-full'>
                <button className='bg-red-500 px-5 py-2 rounded-xs  text-xs flex items-center gap-2 active:scale-90 hover:bg-red-600 cursor-pointer text-white '><RotateCcw size={15}/> Reset</button>
                <button className='bg-teal-600 px-5 py-2 rounded-xs  text-xs flex items-center gap-2 active:scale-90 hover:bg-teal-700 cursor-pointer text-white '><Send size={15} /> Submit</button>
            </div>
        </div>
    </div>
</motion.div>
}

const HomeBox = ({title,Icon,color,text,label})=>{
  return <motion.div 
              initial={{opacity:0,scale:0}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:0}} className='grid grid-cols-[1fr_auto] border gap-x-10 w-max px-10 py-3.5 rounded-lg'>
    <p className='text-base font-light'>{title}</p>
    <Icon className={`${color} row-span-2 p-4 rounded-lg`} size={60}/>
    <p className='text-4xl mt-1'>{text}</p>
    <p className='text-xs mt-2 font-light'>{label}</p>
  </motion.div>
}

const AppointmentBox = ({img,name,time,type,status})=>{
  return <motion.div 
              initial={{opacity:0,scale:0}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:0}} className='flex hover:bg-[var(--card)] hover:-translate-y-1 transition-all duration-150 cursor-pointer hover:border-[var(--text)] items-center gap-x-5 w-full border rounded-lg px-7 py-3 h-max'>
    <img src={img} alt="" className='rounded-full h-12 w-12' />
    <div>
      <p className='text-xl mb-1'>{name}</p>
      <p className='text-sm text-slate-700 dark:text-slate-400 flex items-center gap-2 capitalize'><Clock size={13} />{time} <span className='mx-2'>•</span> {type}</p>
    </div>
    <button className={`ml-auto cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-200 text-sm h-max ${status==0?"bg-blue-200 text-blue-500":"bg-green-200 text-green-500"} px-3 py-1 rounded-xl`}>{status==0?"Scheduled":"Completed"}</button>
  </motion.div>
}

const DoctorHome = ({MyData,temp}) => {
  const img = MyData.imageUrl && MyData.imageUrl.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${MyData.imageUrl}` : MyData.imageUrl;
  const today = new Date()
  const [patientList,setPatientList] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/list-patients`)
      .then((data) => data.json())
      .then((data) => {
        setPatientList(data.data);
      });
  }, [])
  
  return (
    <section className='flex flex-col gap-10 p-10 items-center justify-center h-full'>
        {/* top box */}
        <div className='flex justify-between items-center border-1 rounded-lg w-full px-10 py-5'>
          {/* lefft */}
          <motion.div initial={{opacity:0,scale:0}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:0}} className='grid grid-cols-[auto_1fr] w-max items-center gap-x-5'>
            <Activity size={75} className='row-span-2 bg-[var(--button)] p-3 text-white rounded-sm' />
            {/* weather */}
            <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='hover:shadow-lg transition-all duration-300 hover:-translate-y-1 lg:ml-5 grid grid-cols-[auto_1fr] items-center gap-y-1 gap-x-2 rounded-sm cursor-pointer'>
                <WeatherSunIcon/>
                <p className='text-3xl font-light'>{temp.temp}</p>
            </motion.div>
            {/* date and time */}
            <p>{week[today.getDay()]}, {month[today.getMonth()]}, {today.getFullYear()}</p>
          </motion.div>
          {/* right side profile */}
          <motion.div initial={{opacity:0,scale:0}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:0}} className='grid grid-cols-[1fr_auto] w-max gap-x-5 items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 px-10 py-3.5 rounded-sm'>
            <p className='text-2xl'>{MyData.name}</p>
              <img src={img} alt="" className='h-15 w-15 rounded-full row-span-2' />
            <p>{MyData.department}</p>
          </motion.div>
        </div>
        {/* stat box */}
        <div className='flex gap-10 justify-between w-full'>
          <HomeBox title="Today's Patients" Icon={Users} color="bg-blue-100 stroke-blue-500" text={MyData.appointments.length} label={`${MyData.appointments.filter(value=>value.status==0).length} Completed` } />
          <HomeBox title="Appointments" Icon={Calendar} color="bg-teal-100 stroke-teal-500" text={MyData.appointments.length} label={`${MyData.appointments.filter(value=>value.status==0).length} remaining` }/>
          <HomeBox title="Avg. Wait Time" Icon={Clock} color="bg-green-100 stroke-green-500" text="15m" label="5m less than usual" />
          <HomeBox title="Pending Tasks" Icon={Info} color="bg-orange-100 stroke-orange-500" text="3" label="1 urgent" />
        </div>
        {/* bottom box */}
        <aside className='grid grid-cols-[.5fr_1fr] gap-10 w-full h-full'>
          <VerticalBarChart/>
          {/* show list of appointments */}
          <div className='px-10 py-5 h-full flex gap-5 flex-col max-h-65 patient-scrollbar overflow-y-auto border rounded-lg'>
            <h1 className='flex items-center gap-3 text-sm'><TrendingUp size={14}/>Today's Appointments</h1>
            {MyData.appointments.map((value,index)=>{
              const patient = patientList.find(
              (p) => p.contact.email === value.email
            );
                const img = patient?.imageUrl
              ? `${import.meta.env.VITE_BACKEND_API_URL}${patient.imageUrl}`
              : "/nouser.jpg";
              return <AppointmentBox img={img} name={value.name} time={value.time} key={index} type="Consultation" status={value.status} />

            })}
          </div>
        </aside>
    </section>
  )
}




// const DoctorHome = ({MyData}) => {
//   const img = MyData.imageUrl && MyData.imageUrl.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${MyData.imageUrl}` : MyData.imageUrl;

//   return (
//     <section className='grid grid-cols-[.4fr_1fr] gap-10 p-10 items-center justify-center h-full'>
//         {/* left side */}
//         <article className='flex flex-col h-full'>
//             { /* welcome  */}
//             <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 active:scale-90 transition-transform duration-200 flex flex-col px-10 py-10 bg-[var(--card)] rounded-xs items-center'>
//                 <img src={img} alt="" className='h-25 w-25 row-span-2 rounded-sm' />
//                 <p className='text-xl text-center whitespace-nowrap mt-5'>Good Morning <br /> <span className='text-3xl'>{MyData.name}</span></p>
//                 <p className='w-max py-1 text-sm flex gap-2 items-center mt-3'><Stethoscope size={15}/>{MyData.department}</p>
//             </motion.div>
//             {/* stats here */}
//             {/* <div className='flex gap-10 bg-[var(--card)] px-10 py-5 mt-5  rounded-xs'> */}
//                 {/* stat 1 ---- TOTAL PATINET DIAGNOSED BY ME TILL NOW */}
//                 {/* <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className=' w-full flex flex-col items-center justify-center bg-[var(--bg)] hover:scale-105 rounded-xs px-10 py-5'>
//                     <p className='text-2xl font-semibold'>25</p>
//                     <p className='text-xs'>Total</p>
//                 </motion.div> */}
//                 {/* stat 2  ---- TODAYS NUMBER OF PATINENT IN MY DEPARTMENT*/}
//                 {/* <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className=' w-full flex flex-col items-center justify-center bg-[var(--bg)] hover:scale-105 rounded-xs px-10 py-5'>
//                     <p className='text-2xl font-semibold'>25</p>
//                     <p className='text-xs'>Today</p>
//                 </motion.div> */}
//             {/* </div> */}
//             {/* set schedule here */}
//             <SetAvability/>
//         </article>
//       <Toaster position="top-right" reverseOrder={true} />

//         <article className='w-full h-full flex flex-col'>
//             {/* upper bar */}
//             <div className='flex justify-between gap-10 mb-10'>
//                 <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 active:scale-90 transition-transform duration-200 w-full relative flex flex-wrap gap-5  items-center  px-8 justify-center py-5 bg-[var(--card)] rounded-xs group'>
//                     <CalendarRange size={30} />
//                     <p className='font-semibold absolute bottom-[100%] group-hover:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none w-max left-0 px-5 py-2 text-xs text-center font-light'>Today Completed Appointment By You</p>
//                     <p className='text-base px-2'>Today</p>
//                     <p className='bg-[var(--bg)] px-5 py-3 rounded-sm text-base'>10</p>
//                 </motion.div>
//                 {/* <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='w-full relative flex flex-wrap gap-5  items-center  px-8 justify-center py-5 bg-[var(--card)] rounded-xs group'>
//                     <CalendarCheck size={30}/>
//                     <p className='font-semibold absolute bottom-[100%] group-hover:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none w-max left-0 px-5 py-2 text-xs text-center'>Appointment's completed</p>
//                     <p className='text-base '>Completed</p>
//                     <p className='bg-[var(--bg)] px-5 py-3 rounded-sm text-base'>10</p>
//                 </motion.div> */}
//                 <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='hover:scale-105 active:scale-90 transition-transform duration-200 w-full relative flex flex-wrap gap-5  items-center  px-8 justify-center py-5 bg-[var(--card)] rounded-xs group'>
//                     <CalendarClock size={30}/>
//                     <p className='font-semibold absolute bottom-[100%] group-hover:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none w-max left-0 px-5 py-2 text-xs text-center font-light'>Total Patients Viewed By You</p>
//                     <p className='text-base '>Total</p>
//                     <p className='bg-[var(--bg)] px-5 py-3 rounded-sm text-base'>10</p>
//                 </motion.div>
//             </div>
//             <VerticalBarChart/>
//         </article>

//     </section>
//   )
// }

export default DoctorHome
