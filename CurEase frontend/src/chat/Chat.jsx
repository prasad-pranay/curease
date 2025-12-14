import { Check, CheckCheck, ChevronDown, ChevronUp, Copy, Info, Link, Lock, Phone, Search, Send, Smile, SquircleDashed, Trash, Video, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { firebaseDb } from './Firebase';
import { doc, setDoc, onSnapshot, arrayUnion, getDoc, updateDoc  } from "firebase/firestore";
import {AnimatePresence, motion} from "framer-motion"
import toast from 'react-hot-toast';

async function createUserAndFriend(myId,friendId,friendName,myname,friendImage,myImage){
    // this function creates the user in everyone , if it already exists then adds the friend if not the array is created
    const ref = doc(firebaseDb, "messages", "everyone");
    // updating my details
    // if (data.hasOwnProperty(myId)) {
        await updateDoc(ref, {
          [`${myId}.${friendId}`]: {name:friendName,lastMsg:"",time:"",image: friendImage}
        });
    // }
    // updating frieds tab
        await updateDoc(ref, {
          [`${friendId}.${myId}`]: {name:myname,lastMsg:"",time:"",image: myImage}
        });
}

async function updateLastMsg(myId,friendId,lastMsg,time) {
    const ref = doc(firebaseDb, "messages", "everyone");
    // updating my details
        await updateDoc(ref, {
          [`${myId}.${friendId}.lastMsg`]: lastMsg,
          [`${myId}.${friendId}.time`]: time
        });
    // }
    // updating frieds tab
        await updateDoc(ref, {
          [`${friendId}.${myId}.lastMsg`]: lastMsg,
          [`${friendId}.${myId}.time`]: time
        });
}

async function sendMsg(message,myId,friendId){
    const now = new Date();
    const msgObj = {
      from: myId,
      to: friendId,
      msg: message,
      time:`${now.getHours()}:${now.getMinutes()}`,
      date:`${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
      read: false
    };
    await updateDoc(doc(firebaseDb, "messages", "message"), {
      "messages": arrayUnion(msgObj)
    });

    updateLastMsg(myId,friendId,message,`${now.getHours()}:${now.getMinutes()}`)
}


const Sidebar = ({personList,setCurrentPerson,everyoneData,currentPerson,id,name,image})=>{
    const [search,setSearch] = useState("")
    const [showDoctorSearches,setShowDoctorSearches] = useState(true)
    const [showPatientSearches,setShowPatientSearches] = useState(true)
    return <section className='row-span-2 px-5 py-5 border-r-2 flex flex-col h-full'>
        <p className='flex text-lg justify-between items-center py-3 gap-10'>
            <motion.span initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} >Chats</motion.span> 
            <button className='relative group transition-all duration-200 active:scale-90 hover:scale-110 cursor-pointer outline-none'>
            <SquircleDashed />
            <span className='absolute bottom-[120%] scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 pointer-events-none text-[var(--text)] px-3 pt-[1px] rounded-xs text-xs left-1/2 -translate-x-1/2'>Status</span>
            </button>
        </p>
        {/* search */}
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='bg-white dark:bg-[#161C24] gap-5 relative text-gray-800 mt-3 rounded-xs px-5 py-2 shadow-sm items-center flex'>
            <Search strokeWidth={1} className='text-blue-500'/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder='Search...' type="text" className='text-base text-[var(--text)] outline-none' />
            {search && <X size={18} className='absolute top-1/2 right-3 -translate-y-1/2 text-slate-800 hover:scale-120 transition-transform duration-200 cursor-pointer' onClick={()=>setSearch('')}/>}
        </motion.div>
        {/* speperator */}
        <div className='w-full border-t-1 my-5'></div>
        {/* chats here */}
        {!search ? Object.keys(personList).length==0 ? <div className='h-full w-full flex flex-col items-center pb-20 justify-center'>
            <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  src="/null.gif" alt="" className='h-30 w-30 rounded-sm' />
            <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='mt-5 text-sm text-slate-800'>You have no chat's till now</motion.p>
        </div> : Object.keys(personList).map((person,index)=>{
                const img = personList[person].image.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${personList[person].image}` : personList[person].image
            return(
            <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} key={index} onClick={()=>{setCurrentPerson(person)}} className={`active:scale-90 grid grid-cols-[auto_1fr_auto] transition-all duration-200 shadow-xs mb-3 py-3 px-5 rounded-sm cursor-pointer hover:-translate-y-1 hover:scale-102 ${currentPerson==person ?"bg-teal-300 dark:bg-[#0162C4]":"bg-white dark:bg-[#161C24] hover:bg-[var(--bg)]"}`}>
                <img src={img} alt="" className='row-span-2 h-10 w-10 rounded-full mr-3' />
                <p className='row-1 col-2 font-normal text-slate-800 dark:text-slate-100 capitalize'>{person==id? '(You)' : personList[person].name}</p>
                <p className='row-2 col-2 text-sm dark:text-slate-300 font-light'>{personList[person].lastMsg}</p>
                <p className='row-span-2 text-xs'>{personList[person].time}</p>
            </motion.div>
        )}):<>
        <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='text-xs font-light mb-2 flex justify-between items-center cursor-pointer' onClick={()=>setShowDoctorSearches(prev=>!prev)}>Doctors {showDoctorSearches ? <ChevronDown size={18} /> : <ChevronUp size={18} />}</motion.p>
            {showDoctorSearches && everyoneData["doctor"].map((value,index)=>{
                const img = value.imageUrl.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${value.imageUrl}` : value.imageUrl
                if(!personList.hasOwnProperty(value._id)) return(
                <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  key={index} onClick={()=>{setSearch('');createUserAndFriend(id,value._id,value.name,name,value.imageUrl,image)}} className='active:scale-80 grid grid-cols-[auto_1fr_auto] transition-all duration-200 bg-white shadow-xs mb-3 py-3 px-5 rounded-sm cursor-pointer hover:bg-[var(--bg)]'>
                    <img src={img} alt="" className='row-span-2 h-10 w-10 rounded-full mr-3' />
                    <p className='row-1 col-2 font-normal text-slate-800 capitalize'>{value.name}</p>
                    <p className='row-2 text-xs col-2 font-normal text-slate-800'>{value.department}</p>
                </motion.div>
            )})}
        <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='mt-5 text-xs font-light mb-2 flex justify-between items-center cursor-pointer' onClick={()=>setShowPatientSearches(prev=>!prev)}>Patients {showPatientSearches ? <ChevronDown size={18} /> : <ChevronUp size={18} />}</motion.p>
            {showPatientSearches && everyoneData["patient"].map((value,index)=>{
                const img = value.imageUrl.includes("PatientProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${value.imageUrl}` : value.imageUrl
                if(!personList.hasOwnProperty(value._id)) return(
                <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  key={index} onClick={()=>{setSearch('');createUserAndFriend(id,value._id,value.name,name,value.imageUrl,image)}} className='active:scale-80 flex items-center transition-all duration-200 bg-white shadow-xs mb-3 py-3 px-5 rounded-sm cursor-pointer hover:bg-[var(--bg)]'>
                    <img src={img} alt="" className='h-10 w-10 rounded-full mr-3' />
                    <p className='font-normal text-slate-800 capitalize'>{value.name}</p>
                </motion.div>
            )})}
        </>}

    </section>
}

const ChatHeader = ({person,image,personId,id})=>{
    const img = image.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${image}` : image

    return <section className='border-b-2 py-2 px-2 pr-3 flex items-center justify-between'>
        {/* left side name and all */}
        <div className='grid grid-cols-[auto_1fr] py-1 px-3 rounded-sm active:scale-95 dark:shadow-white/5 cursor-pointer transition-all duration-100 gap-x-3 grid-rows-[auto_1fr] hover:shadow-sm'>
            <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='row-span-2 relative'>
                <img src={img} alt="" className='h-9 w-9 rounded-full' />
                <p className='absolute bottom-1 right-[1px] w-2 h-2 rounded-full bg-green-400 animate-[pulse_1s_ease-in-out_infinite]'>
                </p>
            </motion.div>
            <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className={`${personId==id && "row-span-2 self-center"} text-base font-medium text-slate-800 dark:text-slate-100 capitalize`}>{personId==id ? `${person} (You)` : person}</motion.p>
            {personId!=id && <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='text-xs dark:text-slate-300'>Online</motion.p>}
        </div>
        {/* right side */}
        <div className='flex gap-5 items-center'>
            <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='active:scale-90 text-slate-700 dark:text-slate-300 py-2 px-2 rounded-sm cursor-pointer hover:bg-[var(--bg)]'><Video size={18} strokeWidth={1.5} /></motion.button>
            <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='active:scale-90 text-slate-700 dark:text-slate-300 py-2 px-2 rounded-sm cursor-pointer hover:bg-[var(--bg)]'><Phone size={18} strokeWidth={1.5} /></motion.button>
            <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='active:scale-90 text-slate-700 dark:text-slate-300 py-2 px-2 rounded-sm cursor-pointer hover:bg-[var(--bg)]'><Search size={18} strokeWidth={1.5} /></motion.button>
        </div>
    </section>
}

const month = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
function copyText(text){
    navigator.clipboard.writeText(text)
    .then(() => toast.success("Text Copied!"))
    .catch(err => toast.error("Failed to copy"));
}
const ChatContextMenu=({value})=>{
    return <motion.div style={{top:value.y,left:value.x}} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} className='fixed z-[12000] bg-white dark:bg-[#212529] rounded-sm px-1 py-1'>
        <div className=''>
            {String(value.read).includes(":") && <div className='flex flex-col border-b-1 px-2 pt-1 pb-2'>
                <p className='flex items-center gap-2'><CheckCheck size={14} className='text-blue-700 dark:text-green-300' /> Read</p>
                <span className='text-xs'>{value.read.split("|")[0]},{value.read.split("|")[1].split("/")[0]} {month[value.read.split("/")[1]]}</span>
            </div>}
            <div className='flex flex-col px-2 pt-1 pb-2'>
                <p className='flex items-center gap-2'><CheckCheck size={14} className='text-gray-500 dark:text-white' /> Delivered</p>
                <span className='text-xs'>{value.time} , {value.date.split("/")[0]} {month[value.date.split("/")[1]]}</span>
            </div>
        </div>
        {/* <p className='text-sm flex items-center gap-5 pl-4 pr-10 py-2 rounded-sm hover:bg-gray-200 dark:hover:bg-[#343a40] cursor-pointer transition-all duration-100 active:scale-90'><Info size={16} />Info</p> */}
        <p onClick={()=>copyText(value.text)} className='text-sm flex items-center gap-5 pl-4 pr-10 py-2 rounded-sm hover:bg-gray-200 dark:hover:bg-[#343a40] cursor-pointer transition-all duration-100 active:scale-90'><Copy size={16} />Copy</p>
        <p className='text-sm flex items-center gap-5 pl-4 pr-10 py-2 rounded-sm hover:bg-gray-200 dark:hover:bg-[#343a40] cursor-pointer transition-all duration-100 active:scale-90'><Trash size={16} />Delete</p>
    </motion.div>
}

async function MarkMessageRead(index){
    const ref = doc(firebaseDb, "messages", "message");
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  const today = new Date()
  // Update the array locally
  data.messages[index].read = `${today.getHours()}:${today.getMinutes()} | ${today.getDate()}/${today.getMonth()}`;   // <-- update your property

//   // Save entire array back to Firestore
  await updateDoc(ref, {
    messages: data.messages
  });
}

const ChatScreen = ({id,friendId,currentPerson,everyoneMessageData})=>{
    const [chatMessage,setChatMessage] = useState('')
    const [showContextMenu,setShowContextMenu] = useState({x:0,y:0,read:"",time:'',date:'',text:""})
    return <section className='flex flex-col h-60vh' onClick={e=>{if(showContextMenu.x!=0)setShowContextMenu({x:0})}} 
    onContextMenu={e=>{
        e.preventDefault();
        if(showContextMenu.x!=0){
            setShowContextMenu({x:0})
        }
    }}>
        {/* chats here */}
        <AnimatePresence>{showContextMenu.x !=0 && <ChatContextMenu value={showContextMenu} />}</AnimatePresence>
        <aside className='h-[380px] overflow-y-scroll patient-scrollbar'>
            <article className='w-full min-h-[380px] bg-[#F0F4FA] dark:bg-[#161C24] justify-end px-10 py-5 flex flex-col gap-2 '>
            {everyoneMessageData.map((value,index)=>{
                if(currentPerson==value.from && id==value.to && currentPerson!=id && value.read == false){
                    // means we have recieved a message
                    MarkMessageRead(index)
                }
                if((currentPerson == value.to && id==value.from) || (id==value.to && currentPerson==value.from))return (
                    <motion.div onContextMenu={e=>{e.preventDefault();setShowContextMenu({x:e.pageX,y:e.pageY,read:value.read,time:value.time,date:value.date,text:value.msg})}} initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className={`${id==value.from ? "self-end bg-teal-400 dark:bg-[#0162C4] text-white px-5 min-w-20":"bg-white dark:bg-[#212B36] dark:text-white text-black px-3 min-w-15 text-right"} cursor-default border-2 border-transparent hover:border-gray-500 dark:hover:border-gray-300 transition-transform duration-200 w-max relative pt-2 pb-5 rounded-sm`} key={index}>
                        <p className='max-w-30 text-sm'>{value.msg}</p>
                        <span className={`text-[9px] absolute bottom-1 ${id==value.from ? "right-8":"right-2"}`}>{value.time}</span>
                        {id!=currentPerson && currentPerson==value.to && <span className={`${value.read ? "text-blue-600 dark:text-green-300": "text-white"} absolute bottom-1 right-2`}><CheckCheck size={14}/></span>}
                        {id==currentPerson && <span className={`dark:text-green-400 absolute bottom-1 right-2`}><CheckCheck size={14}/></span>}
                    </motion.div>
                )
            })}
        </article>
        </aside>
        {/* chat bottom here */}
        <aside className='sticky bottom-0 bg-white dark:bg-[#212B36] border-t-2 px-5 py-3 flex items-center gap-5'>
            {/* chat writer here */}
            <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  className='bg-[#ECEFF5] dark:bg-[#2F3944] flex items-center w-full px-6 py-2.5 gap-2 rounded-sm'>
                <Link size={20} className='text-slate-800 dark:text-slate-300 hover:scale-110 transition-transform duration-200 active:scale-80 cursor-pointer' />
                <input value={chatMessage} onChange={e=>setChatMessage(e.target.value)} type="text" placeholder='Write a message...' className='text-sm w-full outline-none' />
                <Smile size={20} className='text-slate-800 dark:text-slate-300 hover:scale-110 transition-transform duration-200 active:scale-80 cursor-pointer' />
            </motion.div>
            {/* send button */}
            <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}  onClick={()=>{
                if(chatMessage==''){
                    toast.error("Cannot send empty messages")
                    return
                }
                setChatMessage('');sendMsg(chatMessage,id,friendId,)}
            } className='active:scale-80 bg-[#0162C4] pl-2 pr-2.5 cursor-pointer hover:scale-105 py-2 rounded-md text-white'>
                <Send size={20} />
            </motion.button>
        </aside>
    </section>
}


const ChatHome = ()=>{
    return <section className='h-full w-full overflow-hidden row-span-2 px-10 relative flex flex-col items-center justify-center'>
        <p className='mt-10 text-[var(--text)] text-5xl font-light backdrop-blur-sm px-10 py-2 rounded-sm'>Welcome</p>
        <p className='text-xs mb-10 font-light'>Start by opening a chat! OR search for new friends :)</p>
        <img src="/chat.gif" alt="" className='h-60 rounded shadow-sm mb-15' />
        <p className='flex items-center gap-2 text-sm absolute bottom-2 left-1/2 -translate-x-1/2'><Lock size={12}/>End-To-End Encrypted</p>
    </section>
}

const ChatPage = ({id,name,image}) => {
    const [doctorData,setDoctorData] = useState([])
    const [patientData,setPatientData] = useState([])
    useEffect(() => {
     listenToMessage()
     listenToNewFriends()
     fetch(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/list-patients`).then(data=>data.json()).then(data=>{
        setPatientData(data.data)
     })
     fetch(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/list-doctors`).then(data=>data.json()).then(data=>{
        setDoctorData(data.data)
     })
     
    }, [])
    
    const [currentPerson,setCurrentPerson] = useState(null)
    const [frientList,setFriendList] = useState({})
    const [everyoneMessageData,setEveryOneMessageData] = useState([])
    const listenToNewFriends = () => {
        const unsub = onSnapshot(doc(firebaseDb, "messages", "everyone"), (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.data()
            if(data.hasOwnProperty(id)){
                setFriendList(data[id])
            }
        } else {
          console.log("Document does not exist");
        }
      });
    };
    const listenToMessage = () => {
        const unsub = onSnapshot(doc(firebaseDb, "messages", "message"), (snapshot) => {
        if (snapshot.exists()) {
            setEveryOneMessageData(snapshot.data().messages)
        } else {
          console.log("Document does not exist");
        }
      });
    };
  return (
    <motion.main initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} className='fixed grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] top-20 right-20  bg-[#F8FAFF] dark:bg-[#212B36] z-[10000] h-[70vh] w-[60vw] rounded-sm'>
        <Sidebar image={image} name={name} currentPerson={currentPerson} everyoneData={{doctor:doctorData,patient:patientData}} id={id} setCurrentPerson={setCurrentPerson} personList={frientList} />
        {currentPerson && <ChatHeader id={id} personId={currentPerson} person={frientList[currentPerson].name} image={frientList[currentPerson].image} />}
        {currentPerson ? <ChatScreen currentPerson={currentPerson} everyoneMessageData={everyoneMessageData} id={id} friendId={currentPerson} /> : <ChatHome/>}
    </motion.main>
  )
}

export default ChatPage
