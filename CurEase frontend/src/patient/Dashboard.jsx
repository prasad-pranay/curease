import { Brain, BriefcaseMedical, Calendar, CalendarClock, Clock, HandHeart, Mic, Moon, Pill, Power, ScrollText, Send, ShoppingBag, ShoppingCart, SquareUserRound, Stethoscope, Sun, Sunset, User, Users, Wand, Waypoints, Wrench } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"
import { hospitalDepartments, ToggleDarkMode } from '../BackendFunctions'
import Stack from "../component/Stack"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const Dashboard = (props) => {
    const navigate = useNavigate()
    const [userImagePath,setUserImagePath] = useState(null)
    useEffect(() => {
        // console.log(props.orders)
      const img = props.imageUrl;
      if(!img){
        // setUserImagePath("/person.webp")
        setUserImagePath(`${import.meta.env.VITE_BACKEND_API_URL}/nouser.jpg`)
      }else{
        setUserImagePath(`${import.meta.env.VITE_BACKEND_API_URL}${img}`)
      }
    }, [])
    
  return (
    <main className='bg-[var(--bg)] transition-bg duration-300 h-full w-full text-[var(--text)]'>
        <div className='mt-10 max-[890px]:px-5 max-[890px]:pb-5 px-10 flex max-[890px]:flex-col gap-10'>
            <div className='flex flex-col'>
                {/* profile widget */}
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:.1}} className='max-[890px]:w-full hover:-translate-y-1 hover:shadow-sm transition-all duration-300 bg-[var(--card)] px-10 py-7 grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-2 w-max shadow-xs rounded-sm'>
                    <img src={userImagePath}  alt="" className='border-2 border-[var(--bg)] p-[2px] h-16 w-16 rounded-full self-center' />
                    <p className='text-base flex flex-col'>
                        <span className='flex gap-x-2 items-center'>
                            <Sun size={14}/>Good Morning,
                        </span>
                        <span className='text-3xl font-light capitalize'>{props.name.split(" ")[0]}</span>
                    </p>
                    <Link to="/profiles" className='border border-[var(--bg)] h-max p-2 rounded-sm cursor-pointer transition-bg duration-300 hover:bg-[var(--bg)]'><User size={18}/></Link>
                    <div className='h-[1px] w-[95%] ml-[2.5%] bg-[var(--bg)] col-span-3 mt-4 mb-5'></div>
                    <div className='col-span-3 grid grid-cols-3 gap-5 '>
                        <p className='max-[890px]:w-max max-[890px]:mx-auto px-3 py-1 gap-y-1 grid grid-cols-[auto_1fr] items-center text-2xl rounded-sm transition-all delay-100 cursor-pointer relative duration-300 hover:-translate-y-1 hover:shadow-sm font-light'>
                            <BriefcaseMedical strokeWidth={1.5} size={20} className='mx-2'/>
                            <span>{(props["appointments"].filter(item => item.status != 2) ?? []).length}</span>
                            <span className='col-span-2 text-xs font-normal text-center'>Appointment</span>
                        </p>
                        <p className='max-[890px]:w-max max-[890px]:mx-auto px-3 py-1 gap-y-1 grid grid-cols-[auto_1fr] items-center text-2xl rounded-sm transition-all delay-100 cursor-pointer relative duration-300 hover:-translate-y-1 hover:shadow-sm font-light'>
                            <ShoppingCart strokeWidth={1.5} size={20} className='mx-2'/>
                            <span>{(props.orders ?? []).length}</span>
                            <span className='col-span-2 text-xs font-normal text-center'>My Orders</span>
                        </p>
                        <p className='max-[890px]:w-max max-[890px]:mx-auto px-3 py-1 gap-y-1 grid grid-cols-[auto_1fr] items-center text-2xl rounded-sm transition-all delay-100 cursor-pointer relative duration-300 hover:-translate-y-1 hover:shadow-sm font-light'>
                            <ShoppingBag strokeWidth={1.5} size={20} className='mx-2'/>
                            <span>{props.cartCount}</span>
                            <span className='col-span-2 text-xs font-normal text-center'>Your Cart</span>
                        </p>
                    </div>
                </motion.div>
                {/* New Reports */}
                <motion.div onClick={()=>navigate("/manage")} initial={{scale:0}} animate={{scale:1}} transition={{duration:.1}} className='max-[890px]:hidden hover:-translate-y-1 hover:shadow-sm transition-all duration-300 bg-[var(--card)] px-10 py-7 shadow-xs rounded-sm w-full flex justify-evenly h-auto mt-10'>
                    <p className='flex flex-col gap-2 items-center text-lg text-center'><ScrollText size={30}/>Your Recent <br /> Reports</p>
                    <img src="/report.png" alt="" className='h-25 w-max self-center' />
                </motion.div>
            </div>
            <div className='select-none grid xl:grid-cols-2 xl:grid-rows-[auto_1fr] gap-x-10 w-full'>
                {/* upcoming appointment */}
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:.1}} className='col-span-2 xl:col-span-1 relative hover:-translate-y-1 hover:shadow-sm transition-all duration-300 bg-[var(--card)] px-10 py-7 shadow-xs rounded-sm w-full h-max'>
                    <div className='flex justify-between items-center border-b-1 border-[var(--bg)] pb-3 z-[10] relative'>
                        <p className='flex gap-2 items-center text-xs  font-semibold'><CalendarClock size={14}/>Upcoming Appointments</p>
                        <Link to="/appointments" className='block text-xs hover:scale-150 transition-all duration-100 cursor-pointer hover:text-[var(--button)] px-1 py-1 rounded-xs'><Send size={15} /></Link>
                    </div>
                    {<div className={`flex flex-col ${props["appointments"].filter(item => item.status != 2).length>0?"opacity-0":"opacity-100"}`}>
                        <img src="/noAppointments.png" alt="" className='h-25 mt-7 w-max self-center' />
                        <div className='grid grid-cols-[1fr_auto] mt-5 items-center'>
                            <p className='text-xs'>No upcoming Appointment.</p>
                            <Link to="/appointments/new" className='bg-[var(--button)] active:scale-90 text-white h-max self-end px-5 cursor-pointer py-2 rounded-sm text-sm flex gap-5 items-center transition-all duration-300 hover:-translate-y-1'>Book New <Send size={17}/></Link>
                        </div>
                    </div>}
                    <div className={`absolute top-0 w-full h-full pt-20 pb-5  top-0 left-0 ${props["appointments"].filter(item => item.status != 2).length>0 ? "opacity-100":"opacity-0 pointer-events-none"}`}>
                        <div className='h-full overflow-y-auto px-8'>
                            {props["appointments"].map((value,index)=>{
                                const image = hospitalDepartments.filter(data=>data.name.toLowerCase()==value.department.toLowerCase())
                                if(value.status != 2 ) return <div key={index} className='flex gap-3 px-4 py-3 w-full hover:bg-[var(--bg)] rounded-sm'>
                                    <img src={image[0]["image"]} alt="" className='h-10' />
                                    <div className='grid grid-cols-[1fr_auto] w-full'>
                                        <p className='text-xs'>Department</p>
                                        <p className='text-xs'>{value.time}</p>
                                        <p className='text-base capitalize text-[var(--button)]'>{value.department}</p>
                                        <p className='text-xs'>{value.date}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </motion.div>
                {/* order history */}
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:.1}} className='hover:-translate-y-1 hover:shadow-sm transition-all duration-300 bg-[var(--card)] px-10 py-7 shadow-xs rounded-sm w-full max-[500px]:grid max-[500px]:col-span-2 max-[500px]:mt-10  hidden xl:grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-full max-h-[280px] gap-x-8'>
                    {/*  */}
                    <div className='flex justify-between items-center border-b-1 border-[var(--bg)] pb-3 mb-7 z-[10] relative col-span-2'>
                        <p className='flex gap-2 items-center text-xs  font-semibold'><ShoppingCart size={14}/>Your Orders</p>
                        <Link to="/manage" className='block text-xs hover:scale-150 transition-all duration-100 cursor-pointer hover:text-[var(--button)] px-1 py-1 rounded-xs'><Send size={15} /></Link>
                    </div>
                    {(props.orders ?? []).length>0 ? <div className='h-full overflow-y-auto patient-scrollbar overflow-x-hidden col-span-2 self-start w-full flex flex-col'>
                        {props.orders.reverse().map((val,ind)=>{
                            var listImg = Object.keys(val["medicine"]).map(value=>({id:val["medicine"][value].name,img:val["medicine"][value].img}))

                            return <div onClick={()=>console.log(val)} key={ind} className=' mb-5 hover:bg-gray-100 dark:hover:bg-[var(--bg)] shadow-sm rounded-sm w-full min-h-30 py-4 px-3 relative '>
                                
                                <div className='overflow-x-hidden h-25 w-25 absolute'>
                                    <Stack randomRotation={true}
                                    sensitivity={180}
                                    sendToBackOnClick={false}
                                    cardClass='h-20 w-full'
                                    cardsData={listImg}
                                />
                                </div>
                                <div className='ml-35'>
                                    <Select value={listImg[0]['id']} >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a fruit" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>Ordered Items</SelectLabel>
                                          {listImg.map((val,index)=>(
                                            <SelectItem key={index} value={val.id}>{val.id}</SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                </div>
                                    {/* order status */}
                                    <div className='flex items-center absolute bottom-5 gap-2 w-full justify-between pl-35 pr-8'>
                                        <p className='uppercase text-[10px] relative'> 
                                            <span className={`w-5 h-5 block rounded-full border-2 ${val["status"]>=0 ? "border-teal-500 bg-teal-500":"border-gray-400"}`}></span> 
                                            <span className={`absolute left-1/2 -translate-x-1/2 top-[105%] text-[8px] whitespace-nowrap ${val["status"]>=0 ? "font-bold text-teal-500":""}`}>Placed</span> 
                                        </p>
                                        <div className={`border-t-1 w-full ${val["status"]>=0 ?"border-teal-500":""}`}></div>
                                        <p className='uppercase text-[10px] relative'> 
                                            <span className={`w-5 h-5 block rounded-full border-2 ${val["status"]>=1 ? "border-teal-500 bg-teal-500":"border-gray-400"}`}></span> 
                                            <span className={`absolute left-1/2 -translate-x-1/2 top-[105%] text-[8px] whitespace-nowrap ${val["status"]>=1 ? "font-bold text-teal-500":""}`}>Shipped</span> 
                                        </p>
                                        <div className={`border-t-1 w-full ${val["status"]>=1 ?"border-teal-500":""}`}></div>
                                        <p className='uppercase text-[10px] relative'> 
                                            <span className={`w-5 h-5 block rounded-full border-2 ${val["status"]>=2 ? "border-teal-500 bg-teal-500":"border-gray-400"}`}></span> 
                                            <span className={`absolute left-1/2 -translate-x-1/2 top-[105%] text-[8px] whitespace-nowrap ${val["status"]>=2 ? "font-bold text-teal-500":""}`}>Out for Del</span> 
                                        </p>
                                        <div className={`border-t-1 w-full ${val["status"]>=2 ?"border-teal-500":""}`}></div>
                                        <p className='uppercase text-[10px] relative'> 
                                            <span className={`w-5 h-5 block rounded-full border-2 ${val["status"]>=3 ? "border-teal-500 bg-teal-500":"border-gray-400"}`}></span> 
                                            <span className={`absolute left-1/2 -translate-x-1/2 top-[105%] text-[8px] whitespace-nowrap ${val["status"]>=3 ? "font-bold text-teal-500":""}`}>Delivered</span> 
                                        </p>
                                    </div>
                            </div>
                        })}
                    </div> :<>
                        <img src="/noOrders.png" alt="" className='h-35 w-max self-center' />
                        <div className='self-start h-full flex flex-col'>
                            <p className='text-2xl'>No Orders Placed!</p>
                            <p className='mt-3 text-xs'>You haven't placed any order with us.</p>
                            <Link to="/pharmacy" className='bg-[var(--button)] text-white w-full py-2 text-sm rounded-sm mt-auto flex gap-2 items-center justify-center transition-all duration-300 hover:-translate-y-1'><Pill size={18}/>Browse Pharmacy</Link>
                        </div>
                    </>}

                </motion.div> 
                {/* top actions */}
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:.1}} className='flex patient-scrollbar-horizontal hover:-translate-y-1 hover:shadow-sm transition-all duration-300 col-span-2  w-full py-3 bg-[var(--card)] mt-10 rounded-sm items-center overflow-y-auto justify-between px-10 gap-5'>
                    {/* <div className='mr-auto flex flex-col'>
                        <p className='flex text-sm font-semibold gap-2 items-center'><Waypoints size={18} strokeWidth={2}/> Actions</p>
                        <div className='flex mt-5 gap-5'>
                            <Power size={20} className='rounded-sm transition-transform duration-300 hover:scale-120 cursor-pointer'/>
                            <Moon size={20} className='rounded-sm transition-transform duration-300 hover:scale-120 cursor-pointer' onClick={()=>ToggleDarkMode()}/>
                            <ShoppingCart size={20} className='rounded-sm transition-transform duration-300 hover:scale-120 cursor-pointer'/>
                        </div>
                    </div> */}
                    <Link to="/utilities" className='hover:bg-[var(--bg) active:scale-90 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 h-max py-2 px-5 rounded-sm flex flex-col items-center gap-3 text-xs gap-1 hover:-translate-y-1 whitespace-nowrap'><Wrench/>Utilities</Link>
                    <Link to="/symptoms-predictor" className='hover:bg-[var(--bg) active:scale-90 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 h-max py-2 px-5 rounded-sm flex flex-col items-center gap-3 text-xs gap-1 hover:-translate-y-1 whitespace-nowrap'><Stethoscope/>Symptoms</Link>
                    <Link to="/explore/events" className='hover:bg-[var(--bg) active:scale-90 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 h-max py-2 px-5 rounded-sm flex flex-col items-center gap-3 text-xs gap-1 hover:-translate-y-1 whitespace-nowrap'><Sunset/>Events</Link>
                    <Link to="/explore/community" className='hover:bg-[var(--bg) active:scale-90 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 h-max py-2 px-5 rounded-sm flex flex-col items-center gap-3 text-xs gap-1 hover:-translate-y-1 whitespace-nowrap'><Users/>Community</Link>
                    <Link to="/ask" className='hover:bg-[var(--bg) active:scale-90 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 h-max py-2 px-5 rounded-sm flex flex-col items-center gap-3 text-xs gap-1 hover:-translate-y-1 whitespace-nowrap'><Brain/>AI Chat</Link>
                    <Link to="/emergency" className='hover:bg-[var(--bg) active:scale-90 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 h-max py-2 px-5 rounded-sm flex flex-col items-center text-xs gap-1 hover:-translate-y-1 whitespace-nowrap'><HandHeart/>Emergency</Link>
                    <p className='hover:bg-[var(--bg) active:scale-90 hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300 h-max py-2 px-5 rounded-sm flex flex-col items-center gap-3 text-xs gap-1 hover:-translate-y-1 whitespace-nowrap' onClick={()=>ToggleDarkMode(true)} ><Moon/>Switch Theme</p>
                    {/* <Link to="/makeLogout" className='hover:bg-[var(--bg)] cursor-pointer transition-all duration-300 h-max py-2 px-5 rounded-sm flex flex-col items-center gap-3 text-xs gap-1 hover:-translate-y-1 '><Power/>Sign Out</Link> */}
                </motion.div>
            </div>
        </div>
    </main>
  )
}

export default Dashboard
