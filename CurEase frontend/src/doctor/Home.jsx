
import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  RotateCcw,
  LoaderCircle,
  AlertCircle,
  ChevronRight,
  Sun,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { WeatherSunIcon } from "../BackendFunctions";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const weekData = [
  { name: "Mon", Patient: 400 },
  { name: "Tue", Patient: 300 },
  { name: "Wed", Patient: 200 },
  { name: "Thu", Patient: 278 },
  { name: "Fri", Patient: 189 },
  { name: "Sat", Patient: 189 },
];

const week = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

const month = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const sectionAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

// --------------------------------------------------
// Page section heading
// --------------------------------------------------

const SectionHeading = ({ title, subtitle, action }) => (
  <div className="flex items-end justify-between gap-4">
    <div>
      <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>

    {action}
  </div>
);

// --------------------------------------------------
// Statistics strip
// --------------------------------------------------

const StatItem = ({ label, value, description }) => (
  <div className="min-w-0 py-3 sm:py-0">
    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">
      {label}
    </p>

    <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
      {value}
    </p>

    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
      {description}
    </p>
  </div>
);

// --------------------------------------------------
// Weekly patient activity
// --------------------------------------------------

const VerticalBarChart = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="min-w-0"
    >
      <SectionHeading
        title="Patient activity"
        subtitle="Appointments over the last seven days"
        action={
          <span className="text-xs text-gray-500 dark:text-gray-400">
            This week
          </span>
        }
      />

      <div className="mt-6 h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weekData}
            margin={{
              top: 10,
              right: 5,
              left: -25,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="currentColor"
              opacity={0.1}
              strokeDasharray="3 4"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "currentColor",
                fontSize: 11,
              }}
              opacity={0.65}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "currentColor",
                fontSize: 11,
              }}
              opacity={0.65}
            />

            <Tooltip
              cursor={{ fill: "currentColor", opacity: 0.04 }}
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text)",
                fontSize: "12px",
              }}
            />

            <Bar
              dataKey="Patient"
              name="Patients"
              fill="var(--button)"
              barSize={26}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------
// Availability
// --------------------------------------------------

const SetAvailability = ({ onSubmit }) => {
  const [time, setTime] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!time) {
      toast.error("Select your availability time.");
      return;
    }

    try {
      setSaving(true);
      await onSubmit?.(time);
    } catch (error) {
      toast.error("Unable to update availability.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      className="border-t border-gray-200 pt-5 dark:border-white/10"
    >
      <SectionHeading
        title="Availability"
        subtitle="Manage your working hours"
      />

      <div className="mt-5">
        <label
          htmlFor="availability"
          className="mb-2 block text-xs text-gray-500 dark:text-gray-400"
        >
          Available until
        </label>

        <div className="flex items-center gap-3 border-b border-gray-300 py-2 focus-within:border-gray-900 dark:border-white/20 dark:focus-within:border-white">
          <Clock
            size={16}
            className="text-gray-500 dark:text-gray-400"
          />

          <input
            id="availability"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-900 outline-none dark:text-white"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setTime("")}
            disabled={saving}
            className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <RotateCcw size={13} />
            Reset
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 bg-gray-900 px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50 dark:bg-white dark:text-gray-900"
          >
            {saving && (
              <LoaderCircle size={13} className="animate-spin" />
            )}
            Save availability
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------
// Appointment row
// --------------------------------------------------

const AppointmentBox = ({
  img,
  name,
  time,
  type,
  status,
}) => {
  const completed = status != 0;

  return (
    <motion.div
      variants={fadeUp}
      className="group flex items-center gap-3 border-b border-gray-100 py-3.5 transition-colors last:border-0 dark:border-white/[0.07]"
    >
      <img
        src={img || "/nouser.jpg"}
        alt=""
        onError={(e) => {
          e.currentTarget.src = "/nouser.jpg";
        }}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {name}
        </p>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {time} <span className="mx-1">·</span> {type}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            completed ? "bg-green-500" : "bg-amber-500"
          }`}
        />

        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          {completed ? "Completed" : "Scheduled"}
        </span>
      </div>
    </motion.div>
  );
};

// --------------------------------------------------
// Doctor dashboard
// --------------------------------------------------

const DoctorHome = ({ MyData, temp }) => {
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const today = new Date();
  const appointments = MyData?.appointments || [];

  // Based on the original status convention:
  // 0 = Scheduled, non-zero = Completed.

  const completedAppointments = useMemo(
    () => appointments.filter((item) => item.status != 0),
    [appointments]
  );

  const pendingAppointments =
    appointments.length - completedAppointments.length;

  const profileImage = useMemo(() => {
    if (!MyData?.imageUrl) return "/nouser.jpg";

    return MyData.imageUrl.includes("ProfileImage")
      ? `${API_URL}${MyData.imageUrl}`
      : MyData.imageUrl;
  }, [MyData?.imageUrl]);

  // Fetch patients

  useEffect(() => {
    const controller = new AbortController();

    const fetchPatients = async () => {
      try {
        setLoading(true);
        setFetchError(false);

        const response = await fetch(
          `${API_URL}/doctor/list-patients`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Patient request failed");
        }

        const result = await response.json();

        setPatientList(
          Array.isArray(result.data) ? result.data : []
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
          setFetchError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPatients();

    return () => controller.abort();
  }, []);

  // Patient image lookup

  const getPatientImage = (email) => {
    const patient = patientList.find(
      (p) => p.contact?.email === email
    );

    if (!patient?.imageUrl) return "/nouser.jpg";

    return patient.imageUrl.includes("ProfileImage")
      ? `${API_URL}${patient.imageUrl}`
      : patient.imageUrl;
  };

  return (
    <section daata-lenis-prevent className="overflow-y-auto scrollbar-thin min-h-full w-full bg-white px-5 py-7 text-gray-900 dark:bg-[#111111] dark:text-white sm:px-8 lg:px-10">

      <Toaster position="top-right" />

      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-[1600px]"
      >

        {/* Header */}

        <motion.header
          variants={fadeUp}
          className="flex flex-wrap items-center justify-between gap-5 border-b border-gray-200 pb-7 dark:border-white/10"
        >
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {week[today.getDay()]}, {today.getDate()}{" "}
              {month[today.getMonth()]} {today.getFullYear()}
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Good day, Dr. {MyData?.name?.split(" ")[1] || "Doctor"}
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {MyData?.department}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <WeatherSunIcon />

            <div>
              <p className="text-sm font-medium">
                {temp?.temp ?? "--"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Current temperature
              </p>
            </div>
          </div>
        </motion.header>

        {/* Statistics */}

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 gap-x-6 gap-y-5 border-b border-gray-200 py-6 dark:border-white/10 sm:grid-cols-4 sm:gap-8"
        >
          <StatItem
            label="Today's patients"
            value={appointments.length}
            description="Total appointments"
          />

          <StatItem
            label="Scheduled"
            value={pendingAppointments}
            description="Awaiting consultation"
          />

          <StatItem
            label="Completed"
            value={completedAppointments.length}
            description="Consultations finished"
          />

          <StatItem
            label="Average wait"
            value="15m"
            description="5m less than usual"
          />
        </motion.div>

        {/* Main workspace */}

        <div className="grid grid-cols-1 gap-10 py-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.85fr)]">

          {/* Left: chart */}

          <div className="min-w-0">
            <VerticalBarChart />
          </div>

          {/* Right: appointments and availability */}

          <div className="flex min-w-0 flex-col">

            <motion.div variants={fadeUp}>
              <SectionHeading
                title="Today's appointments"
                subtitle={`${appointments.length} appointments`}
              />

              <div className="mt-3">
                {loading ? (
                  <div className="flex items-center gap-2 py-8 text-sm text-gray-500 dark:text-gray-400">
                    <LoaderCircle
                      size={15}
                      className="animate-spin"
                    />
                    Loading patient details...
                  </div>
                ) : fetchError ? (
                  <div className="flex items-center gap-2 py-8 text-sm text-red-500">
                    <AlertCircle size={15} />
                    Unable to load patient details.
                  </div>
                ) : appointments.length === 0 ? (
                  <p className="py-8 text-sm text-gray-500 dark:text-gray-400">
                    No appointments scheduled today.
                  </p>
                ) : (
                  <div className="max-h-[340px] overflow-y-auto">
                    {appointments.map((value, index) => (
                      <AppointmentBox
                        key={value._id || `${value.email}-${index}`}
                        img={getPatientImage(value.email)}
                        name={value.name}
                        time={value.time}
                        type="Consultation"
                        status={value.status}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Availability */}

            <div className="mt-8">
              <SetAvailability
                onSubmit={async (time) => {
                  // Connect your actual availability API here.
                  // No successful save is claimed without an API.
                  toast.error(
                    "Availability API has not been connected yet."
                  );
                }}
              />
            </div>
          </div>
        </div>


      </motion.div>
    </section>
  );
};

export default DoctorHome;



// import { Activity, Calendar, CalendarCheck, CalendarClock, CalendarRange, Clock, Info, RotateCcw, Send, Stethoscope, TrendingUp, Users } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";
// import {motion} from "framer-motion"
// import { Toaster } from 'react-hot-toast';
// import { WeatherSunIcon } from '../BackendFunctions';

// const data = [
//   { name: "Monday", Patient: 400 },
//   { name: "Tuesday", Patient: 300 },
//   { name: "Wednesday", Patient: 200 },
//   { name: "Thursday", Patient: 278 },
//   { name: "Friday", Patient: 189 },
//   { name: "Saturday", Patient: 189 },
// ];

// function VerticalBarChart() {
//   return (
//     <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="w-full h-full border pr-5 pt-5 rounded-lg">
//         {/* <h1 className='text-xl mb-5'>Patients diagnosed this week</h1> */}
//       <ResponsiveContainer>
//         <BarChart data={data}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip labelClassName='text-black' />
//           <Legend />
//           <Bar dataKey="Patient" fill="#8884d8" barSize={40} radius={[5, 5, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </motion.div>
//   );
// }

// const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
// const week = [
//   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
// ];
// const SetAvability = ()=>{
//   const today = new Date()
//     return <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="group w-full mt-5 h-full mx-auto [perspective:1000px] cursor-pointer">
//     <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
//         {/* <!-- Front Side --> */}
//         <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col gap-5 items-center justify-center rounded-xs bg-[var(--card)] borde border-[var(--border)]">
//             <Calendar size={60} />
//             <p className='text-4xl'>{today.getDate()} {month[today.getMonth()]} </p>
//             <p>{week[today.getDay()]}</p>
//         </div>

//         {/* <!-- Back Side --> */}
//         <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col px-5 gap-2 items-center justify-center rounded-xs bg-[var(--card)] borde text-[var(--text)] [transform:rotateX(180deg)]">
//             <h1 className='flex items-center gap-5 text-2xl'><Clock size={25} />Your Avability</h1>
//             {/* <p className='text-xs text-[var(--button)] border-b-1 w-full text-center pb-4'>Till which time you are available today</p> */}
//             <input type="time" name="" id="" className='outline-none border px-5 py-2 w-full my-6' />
//             <div className='flex justify-between w-full'>
//                 <button className='bg-red-500 px-5 py-2 rounded-xs  text-xs flex items-center gap-2 active:scale-90 hover:bg-red-600 cursor-pointer text-white '><RotateCcw size={15}/> Reset</button>
//                 <button className='bg-teal-600 px-5 py-2 rounded-xs  text-xs flex items-center gap-2 active:scale-90 hover:bg-teal-700 cursor-pointer text-white '><Send size={15} /> Submit</button>
//             </div>
//         </div>
//     </div>
// </motion.div>
// }

// const HomeBox = ({title,Icon,color,text,label})=>{
//   return <motion.div 
//               initial={{opacity:0,scale:0}}
//               animate={{opacity:1,scale:1}}
//               exit={{opacity:0,scale:0}} className='grid grid-cols-[1fr_auto] border gap-x-10 w-max px-10 py-3.5 rounded-lg'>
//     <p className='text-base font-light'>{title}</p>
//     <Icon className={`${color} row-span-2 p-4 rounded-lg`} size={60}/>
//     <p className='text-4xl mt-1'>{text}</p>
//     <p className='text-xs mt-2 font-light'>{label}</p>
//   </motion.div>
// }

// const AppointmentBox = ({img,name,time,type,status})=>{
//   return <motion.div 
//               initial={{opacity:0,scale:0}}
//               animate={{opacity:1,scale:1}}
//               exit={{opacity:0,scale:0}} className='flex hover:bg-[var(--card)] hover:-translate-y-1 transition-all duration-150 cursor-pointer hover:border-[var(--text)] items-center gap-x-5 w-full border rounded-lg px-7 py-3 h-max'>
//     <img src={img} alt="" className='rounded-full h-12 w-12' />
//     <div>
//       <p className='text-xl mb-1'>{name}</p>
//       <p className='text-sm text-slate-700 dark:text-slate-400 flex items-center gap-2 capitalize'><Clock size={13} />{time} <span className='mx-2'>•</span> {type}</p>
//     </div>
//     <button className={`ml-auto cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-200 text-sm h-max ${status==0?"bg-blue-200 text-blue-500":"bg-green-200 text-green-500"} px-3 py-1 rounded-xl`}>{status==0?"Scheduled":"Completed"}</button>
//   </motion.div>
// }

// const DoctorHome = ({MyData,temp}) => {
//   const img = MyData.imageUrl && MyData.imageUrl.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${MyData.imageUrl}` : MyData.imageUrl;
//   const today = new Date()
//   const [patientList,setPatientList] = useState([])
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/list-patients`)
//       .then((data) => data.json())
//       .then((data) => {
//         setPatientList(data.data);
//       });
//   }, [])
  
//   return (
//     <section className='flex flex-col gap-10 p-10 items-center justify-center h-full'>
//         {/* top box */}
//         <div className='flex justify-between items-center border-1 rounded-lg w-full px-10 py-5'>
//           {/* lefft */}
//           <motion.div initial={{opacity:0,scale:0}}
//               animate={{opacity:1,scale:1}}
//               exit={{opacity:0,scale:0}} className='grid grid-cols-[auto_1fr] w-max items-center gap-x-5'>
//             <Activity size={75} className='row-span-2 bg-[var(--button)] p-3 text-white rounded-sm' />
//             {/* weather */}
//             <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='hover:shadow-lg transition-all duration-300 hover:-translate-y-1 lg:ml-5 grid grid-cols-[auto_1fr] items-center gap-y-1 gap-x-2 rounded-sm cursor-pointer'>
//                 <WeatherSunIcon/>
//                 <p className='text-3xl font-light'>{temp.temp}</p>
//             </motion.div>
//             {/* date and time */}
//             <p>{week[today.getDay()]}, {month[today.getMonth()]}, {today.getFullYear()}</p>
//           </motion.div>
//           {/* right side profile */}
//           <motion.div initial={{opacity:0,scale:0}}
//               animate={{opacity:1,scale:1}}
//               exit={{opacity:0,scale:0}} className='grid grid-cols-[1fr_auto] w-max gap-x-5 items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 px-10 py-3.5 rounded-sm'>
//             <p className='text-2xl'>{MyData.name}</p>
//               <img src={img} alt="" className='h-15 w-15 rounded-full row-span-2' />
//             <p>{MyData.department}</p>
//           </motion.div>
//         </div>
//         {/* stat box */}
//         <div className='flex gap-10 justify-between w-full'>
//           <HomeBox title="Today's Patients" Icon={Users} color="bg-blue-100 stroke-blue-500" text={MyData.appointments.length} label={`${MyData.appointments.filter(value=>value.status==0).length} Completed` } />
//           <HomeBox title="Appointments" Icon={Calendar} color="bg-teal-100 stroke-teal-500" text={MyData.appointments.length} label={`${MyData.appointments.filter(value=>value.status==0).length} remaining` }/>
//           <HomeBox title="Avg. Wait Time" Icon={Clock} color="bg-green-100 stroke-green-500" text="15m" label="5m less than usual" />
//           <HomeBox title="Pending Tasks" Icon={Info} color="bg-orange-100 stroke-orange-500" text="3" label="1 urgent" />
//         </div>
//         {/* bottom box */}
//         <aside className='grid grid-cols-[.5fr_1fr] gap-10 w-full h-full'>
//           <VerticalBarChart/>
//           {/* show list of appointments */}
//           <div className='px-10 py-5 h-full flex gap-5 flex-col max-h-65 patient-scrollbar overflow-y-auto border rounded-lg'>
//             <h1 className='flex items-center gap-3 text-sm'><TrendingUp size={14}/>Today's Appointments</h1>
//             {MyData.appointments.map((value,index)=>{
//               const patient = patientList.find(
//               (p) => p.contact.email === value.email
//             );
//                 const img = patient?.imageUrl
//               ? `${import.meta.env.VITE_BACKEND_API_URL}${patient.imageUrl}`
//               : "/nouser.jpg";
//               return <AppointmentBox img={img} name={value.name} time={value.time} key={index} type="Consultation" status={value.status} />

//             })}
//           </div>
//         </aside>
//     </section>
//   )
// }
// export default DoctorHome




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

// export default DoctorHome
