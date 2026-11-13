import { AnimatePresence, motion } from "framer-motion";
import { Bell, HelpCircle, MessageCircle, Mic, Moon,Lock,  User, LogOut, Power, Settings, Sun, UserRound, Home, Hospital, Pill, History, Telescope, FolderKanban, Send, Menu, CheckCircle, Info, CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToggleDarkMode, WeatherSunIcon } from "../BackendFunctions";
import VoiceToText from "../component/VoiceToText";
import StaggeredMenu from '../component/StaggeredMenu';
import ChatPage from "../chat/Chat";

const month = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const week = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];


const BottomPart = ({temp})=>{
  const [showMic,setShowMic] = useState(false)
  const [micTextContent,setMicTextContent] = useState("")
  const navigate = useNavigate()
   const today = new Date()
    return <motion.section initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} className={`basis-full bg-[var(--card)] text-[var(--text)] px-10 pt-10 pb-5 hidden sm:flex justify-between transition-all duration-300 `}>
        {/* left side */}
        <div className='flex items-center'>
            {/* todays date and day */}
            <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='hidden lg:flex hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer  gap-5 items-center mr-3 h-full px-5 rounded-sm'>
                <p className='rounded-full border-[var(--text)] px-5 text-5xl font-light'>{today.getDate()}</p>
                <p>{week[today.getDay()]}, <br />{month[today.getMonth()]}</p>
            </motion.div>
            {/* seperator */}
            <div className='bg-gray-400 w-[1px] h-full ml-3 hidden lg:block'></div>
            {/* weather */}
            <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='hover:shadow-lg transition-all duration-300 hover:-translate-y-1 lg:ml-5 grid grid-cols-[auto_1fr] items-center gap-y-1 gap-x-2 rounded-sm cursor-pointer px-5 py-2'>
                {/* <Sun size={40} strokeWidth={1.5}/> */}
                <WeatherSunIcon/>
                <p className='text-3xl font-light'>{temp.temp}</p>
                <p className='col-span-2 text-xs text-center mt-[-15px]'>Gurgoan, Haryana</p>
            </motion.div>
        </div>
        {/* right side */}
        <div className="overflow-hidden">
          <motion.div initial={{opacity:0,x:"120%"}} animate={{opacity:1,scale:1,x:0}} transition={{duration:1}} className='flex items-center gap-2'>
            <div className='flex flex-col gap-1'>
                <p className='text-3xl'>Hey, Need Help? 👋</p>
                <input type="text" value={micTextContent} onChange={e=>setMicTextContent(e.target.value)} className='font-thin text-2xl outline-none text-[var(--text)]' placeholder='Just ask me anything!' />
            </div>
            <button onClick={()=>setShowMic(true)} className='bg-[var(--bg)] py-5 px-5 rounded-full hover:text-white shadow-xs transition-bg duration-600 hover:bg-[var(--button)] cursor-pointer'>
                <Mic/>
            </button>
            {micTextContent && <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} onClick={()=>navigate(`/ask?query=${micTextContent}`)} className="bg-teal-600  text-white hover:bg-teal-700 cursor-pointer rounded-full w-15 h-15 flex justify-center items-center"><Send/></motion.div>}
            {showMic && <VoiceToText setText={setMicTextContent} setHideThis={setShowMic} />}
        </motion.div>
        </div>
    </motion.section>
}

const HeaderLinks = ({to,tabNumber,title,activeTab,Icon})=>{
  const navigation = useNavigate();
  return <motion.p onClick={()=>{navigation(to)}} initial={{y:"-100%",opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.3,delay:0.1*tabNumber}} className="relative group cursor-pointer transition-transform duration-100 active:scale-90">
    <button
    className={`md:absolute xl:top-0 xl:left-0 xl:-translate-x-0 xl:scale-1 xl:opacity-100 xl:scale-100 top-[150%] left-1/2 -translate-x-1/2 md:group-hover:scale-100 md:group-hover:opacity-100 scale-0 opacity-0 xl:relative rounded-[5px] px-3 py-1.5 transition-bg duration-500 ${
      activeTab == tabNumber ? "xl:bg-[var(--text)] xl:text-[var(--bg)]" : "xl:group-hover:bg-[var(--card)]"
    }`}
  >
    {title}
  </button>
  {<Icon size={25} className={`xl:absolute md:relative ${activeTab==tabNumber?"bg-[var(--text)] text-[var(--bg)]":"bg-[var(--bg)] text-[var(--text)] xl:group-hover:bg-[var(--bg)] md:group-hover:bg-[var(--card)]"} xl:py-1 xl:px-1 md:px-1 md:mx-3 xl:mx-0 rounded-sm xl:top-[200%] xl:left-1/2 xl:-translate-x-1/2 xl:opacity-0 xl:scale-0 xl:group-hover:scale-100 xl:group-hover:opacity-100 transition-all duration-300 `}/>}
  </motion.p>
}


const SettingsCard = ({className}) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme")=="1");
  
  const [privateAccount, setPrivateAccount] = useState(false);

  return (
    <div className={`absolute top-[150%] right-0 ${className}`}>
      <div className="bg-[var(--card)] shadow-md rounded-sm w-max p-8">
        <div className="flex items-center mb-6">
          <Settings className="text-gray-800 dark:text-gray-200 mr-2" size={22} />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Settings</h2>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Account */}
          <div className="flex items-center justify-between bg-[var(--bg)] border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <User className="text-blue-600" />
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">Private Account</p>
                <p className="text-gray-500 text-sm">Hide your profile from public</p>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={privateAccount}
                onChange={() => setPrivateAccount(!privateAccount)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between bg-[var(--bg)] border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <Bell className="text-blue-600" />
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">Notifications</p>
                <p className="text-gray-500 text-sm">Receive updates and alerts</p>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between bg-[var(--bg)] border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <Moon className="text-blue-600" />
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">Toggle Theme</p>
                <p className="text-gray-500 text-sm">Switch to dark theme</p>
              </div>
            </div>
            <label className="inline-flex items-center cursor-pointer" onClick={()=>ToggleDarkMode(true)}>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          {/* Privacy */}
          <div className="flex items-center justify-between bg-[var(--bg)] border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <Lock className="text-blue-600" />
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">Change Password</p>
                <p className="text-gray-500 text-sm">Update your login credentials</p>
              </div>
            </div>
            <button className="text-blue-500 text-xs ml-5 cursor-pointer font-medium hover:underline">Change</button>
          </div>

          {/* Logout */}
          <div className="flex items-center justify-between bg-[var(--bg)] border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <LogOut className="text-red-500" />
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">Logout</p>
                <p className="text-gray-500 text-sm">Sign out of your account</p>
              </div>
            </div>
            <Link to="/makeLogout" className="text-red-500 hover:scale-105 text-sm font-medium hover:underline">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderLinksDevices = ({openvalue,setOpen})=>{
  

const menuItems = [
  { label: 'Dashboard', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Appointment', ariaLabel: 'Learn about us', link: '/appointments' },
  { label: 'Pharmacy', ariaLabel: 'View our services', link: '/pharmacy' },
  { label: 'Manage', ariaLabel: 'Get in touch', link: '/manage' },
  { label: 'Explore', ariaLabel: 'Get in touch', link: '/explore' },
  { label: 'Profile', ariaLabel: 'Get in touch', link: '/profiles' }
];

// <HeaderLinks to="/" tabNumber={0} title="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} Icon={Home} />
//         <HeaderLinks to="/appointments" tabNumber={1} title="Appointment" activeTab={activeTab} setActiveTab={setActiveTab} Icon={Hospital} />
//         <HeaderLinks to="/pharmacy" tabNumber={2} title="Pharmacy" activeTab={activeTab} setActiveTab={setActiveTab} Icon={Pill} />
//         <HeaderLinks to="/manage" tabNumber={3} title="Manage" activeTab={activeTab} setActiveTab={setActiveTab} Icon={FolderKanban} />
//         <HeaderLinks to="/explore" tabNumber={4} title="Explore" activeTab={activeTab} setActiveTab={setActiveTab} Icon={Telescope} />
//         <HeaderLinks to="/profiles" tabNumber={5} title="Profile" activeTab={activeTab} setActiveTab={setActiveTab} Icon={User} />

const socialItems = [
  { label: 'Twitter', link: 'https://github.com/pranayvips' },
  { label: 'Instagram', link: 'https://www.instagram.com/pranayy.c3/' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/pranay-prasad-/' }
]

return   <StaggeredMenu
    position="right"
    items={menuItems}
    setOpen={setOpen}
    open={openvalue}
    socialItems={socialItems}
    displaySocials={true}
    displayItemNumbering={true}
    isFixed={true}
    menuButtonColor="#fff"
    openMenuButtonColor="#fff"
    changeMenuColorOnOpen={true}
    colors={['#B19EEF', '#5227FF']}
    logoUrl="/path-to-your-logo.svg"
    accentColor="#ff6b6b"
    onMenuOpen={() => console.log('Menu opened')}
    onMenuClose={() => console.log('Menu closed')}
  />
}

const Header = ({temp,notification,id,name,image}) => {
  const location = useLocation()
  const [showBottom,setShowBottom] = useState(true)
  const [activeTab, setActiveTab] = useState(0);
  const [profileClick,setProfileClick] = useState(false)
  const [settingsClick,setSettingsClick] = useState(false)
  const [chatClick,setChatClick] = useState(false)
  const [notificationClick,setNotificationClick] = useState(false)
  const [openvalue,setOpenValue] = useState(false)
  useEffect(() => {
    // if(location.pathname=="/settings" || location.pathname.includes("/profiles") || location.pathname.includes("/utilities")  || location.pathname.includes("/explore/") || location.pathname=="/emergency"){
    //   setShowBottom(false)
    //   document.title = "CurEase : My Settings"
    // }else if(!showBottom){
    //   setShowBottom(true)
    // }

    // change active tab based on location
    setShowBottom(true)
    if(location.pathname.includes("/appointments")){
      document.title = "CurEase : My Appointments"
      setActiveTab(1)
    }else if(location.pathname.includes("manage")){
      document.title = "CurEase : Manage"
      setActiveTab(3)
    }else if(location.pathname == "/"){
      document.title = "CurEase : Home"
      setActiveTab(0)
    }else if(location.pathname.includes("profile")){
      document.title = "CurEase : Profile"
      setShowBottom(false)
      setActiveTab(5)
    }else{
      document.title = "CurEase : Explore"
      setActiveTab(4)
      setShowBottom(false)
    }
  }, [location])
  const navigate = useNavigate()
  const [hideUnreadNoti,setHideUnreadNoti] = useState(true);
  return (
    
    <header className={`max-[890px]:sticky top-0 border-b-2 border-[var(--bg)] z-[500] relative flex flex-wrap items-center bg-[var(--card)] px-5 py-5 transition-all duration-300`}>
      <motion.h1 onClick={()=>navigate("/")} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className="cursor-pointer active:scale-90 transition duration-150 text-2xl font-bold  py-1 px-3 rounded-[4px] flex gap-2 items-center ">
        <img src="/icon.png" alt="" className="h-8 max-[500px]:hidden" />
        <span className="text-cyan-700 dark:text-[#A4D4FF] max-[500px]:uppercase">CurEase</span>
      </motion.h1>
      {/* tabs */}
      <div className="bg-[var(--bg)] hidden hidden lg:flex transition-bg duration-300 px-2 xl:py-1.5 py-3 rounded-[8px] gap-2 ml-auto shadow-xs text-sm text-[var(--text)]">
        <HeaderLinks to="/" tabNumber={0} title="Dashboard" activeTab={activeTab} Icon={Home} />
        <HeaderLinks to="/appointments" tabNumber={1} title="Appointment" activeTab={activeTab} Icon={Hospital} />
        <HeaderLinks to="/pharmacy" tabNumber={2} title="Pharmacy" activeTab={activeTab} Icon={Pill} />
        <HeaderLinks to="/manage" tabNumber={3} title="Manage" activeTab={activeTab} Icon={FolderKanban} />
        <HeaderLinks to="/explore" tabNumber={4} title="Explore" activeTab={activeTab} Icon={Telescope} />
        <HeaderLinks to="/profiles" tabNumber={5} title="Profile" activeTab={activeTab} Icon={User} />
      </div>
      {/* chat button */}
      
      <div className="relative max-[560px]:hidden">
        <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className={`${chatClick && "z-[2000]"} max-[560px]:hidden lg:ml-5 ml-auto hover:bg-[var(--button)] hover:text-white dark:hover:text-[var(--text)] active:scale-80 transition-all duration-300 cursor-pointer flex gap-2 items-center ml-5 bg-[var(--bg)] text-[var(--text)] py-3 px-5 rounded-[6px] text-sm shadow-xs`}  onClick={()=>setChatClick(prev=>!prev)}>
          <MessageCircle size={15} /> <span className="hidden sm:block">Chat</span>
        </motion.button>
        <AnimatePresence>
          {chatClick && <ChatPage id={id} image={image} name={name} />}
        </AnimatePresence>
        {chatClick && <div className="bg-black/50 fixed top-0 left-0 h-screen w-screen z-[1000]" onClick={()=>setChatClick(false)}></div>}
      </div>
      {/* settings button */}
      <div className="relative max-[560px]:hidden">
        <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className={`${settingsClick&&"z-[2000]"} hover:text-white hover:bg-[var(--button)] dark:hover:text-[var(--text)] active:scale-70 transition-all duration-500 cursor-pointer relative flex gap-2 items-center mx-3 bg-[var(--bg)] text-[var(--text)] py-3 px-5 rounded-[6px] text-sm shadow-xs`} onClick={()=>setSettingsClick(prev=>!prev)}>
          <Settings size={15} /> <span className="hidden sm:block">Setting</span>
        </motion.button>
        <SettingsCard className={`z-[2000] transition-all duraiton-300 ${settingsClick ? "opacity-100 translate-y-0":"translate-y-[-100%] opacity-0 pointer-events-none"}`}/>
        {settingsClick && <div className="bg-black/50 fixed top-0 left-0 h-screen w-screen z-[1000]" onClick={()=>setSettingsClick(false)}></div>}
      </div>
      {/* notifiation */}
      <div className="relative max-[560px]:hidden">
        <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className={`${notificationClick && "z-[2000]"} active:scale-30 group hover:bg-[var(--button)] hover:text-[var(--card)] transition-all duration-500 relative cursor-pointer flex gap-2 py-3 px-4 bg-[var(--bg)] text-[var(--text)] rounded-md mr-3 shadow-xs`} onClick={()=>setNotificationClick(prev=>!prev)}>
          <Bell size={18} className="group-hover:stroke-white" />
          <p className="absolute top-[130%] pointer-events-none opacity-0 scale-0 duration-500 transition-all group-hover:scale-100 group-hover:opacity-100 right-1/2 translate-x-1/2 whitespace-nowrap text-xs bg-[var(--button)] text-white px-4 py-1.5 rounded-sm">Notifications</p>
        </motion.button>
        <div className={`z-[2000] absolute px-5 py-5 top-[150%] bg-[var(--card)] border-gray-400 border-2 rounded-sm right-2  transition-all duraiton-300 ${notificationClick ? "opacity-100 translate-y-0":"translate-y-[-100%] opacity-0 pointer-events-none"}`}>
          {notification.filter(data=>(!hideUnreadNoti || data[0]==false)).length==0?<><img src="/notification.gif" alt="notification gif" className="h-50 w-max" />
          <p className="whitespace-nowrap text-[var(--text)] text-sm mt-5 font-semibold px-10 flex items-center gap-2"><Bell size={14}/>No New Notifications</p>
          <button className="flex justify-center items-center gap-3 w-full bg-[var(--button)] py-1 text-white rounded mt-5 active:scale-90 hover:bg-[var(--button)]/90 transition duration-150 cursor-pointer" onClick={()=>setHideUnreadNoti(false)}>Show Previous</button></>:
          <div className="flex flex-col gap-5">
            {notification.reverse().map((value,index)=>{
              // to read only new notification applying conditions
              if((!hideUnreadNoti || value[0]==false) && value)
              return <div key={index} className="min-w-80 bg-[var(--bg)] px-7 gap-x-5 hover:-translate-y-1 hover:scale-105 transition-transform duration-200 cursor-default py-2.5 rounded-sm grid grid-cols-[auto_1fr] items-center justify-center">
                {value[1] == 0 && <CheckCircle className="text-green-600 row-span-2" />}
                {value[1] == 1 && <Info className="text-blue-600 row-span-2" />}
                {value[1] == 2 && <CircleAlert className="text-red-600 row-span-2" />}
                <p className={`text-base font-semibold capitalize`}>{value[2]}</p>
                <p className="text-sm">{value[3]}</p>
              </div>
            })}
          </div>}
        </div>
        {notificationClick && <div className="bg-black/50 fixed top-0 left-0 h-screen w-screen z-[1000]" onClick={()=>setNotificationClick(false)}></div>}
      </div>
      {/* profile icon on top right */}
      <div className="relative max-[560px]:ml-auto">
        <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className={`${profileClick&&"z-[2000]"} group relative py-3 px-4 bg-[var(--bg)] text-[var(--text)] rounded-md shadow-xs hover:bg-[var(--text)] hover:text-[var(--card)] transition-all duration-500 cursor-pointer `} onClick={()=>setProfileClick(prev=>!prev)} >
            <UserRound size={18}/>
            <p className="absolute top-[130%] pointer-events-none opacity-0 scale-0 duration-500 transition-all group-hover:scale-100 group-hover:opacity-100 right-0 whitespace-nowrap text-xs bg-[var(--text)] text-[var(--bg)] px-4 py-1.5 rounded-sm">You</p>
        </motion.button>
        <div className={`z-[2000] absolute top-[100%] mt-2 whitespace-nowrap right-0 bg-[var(--bg)] text-[var(--text)] px-3 py-3 rounded-sm shadow-[var(--text)] shadow-lg transition-all duraiton-300 ${profileClick ? "opacity-100 translate-y-0":"translate-y-[-100%] opacity-0 pointer-events-none"}`}>
            <p className="flex gap-3 px-3 py-1.5 text-sm items-center cursor-pointer dark:hover:bg-gray-300/20 hover:bg-black/5 mb-1" onClick={()=>{ToggleDarkMode(true);setProfileClick(false)}}><Moon size={15} strokeWidth={1.5}/>Dark Mode</p>
            <p className="flex gap-3 px-3 py-1.5 text-sm items-center cursor-pointer dark:hover:bg-gray-300/20 hover:bg-black/5 mb-1"><HelpCircle size={15} strokeWidth={1.5}/>Help</p>
            <Link to="/makeLogout" className="flex gap-3 px-3 py-1.5 text-sm items-center cursor-pointer dark:hover:bg-red-400/80 hover:bg-red-500/20"><Power size={15} strokeWidth={1.5}/>Sign Out</Link>
        </div>
        {profileClick && <div className="bg-black/50 fixed top-0 left-0 h-screen w-screen z-[1000]" onClick={()=>setProfileClick(false)}></div>}
      </div>
      <motion.button 
      initial={{opacity:0,scale:0}} 
      animate={{opacity:1,scale:1}} 
      transition={{duration:.5}} 
      className={`lg:hidden ml-3 active:scale-30  group hover:bg-[var(--button)] hover:text-[var(--card)] transition-all duration-500 relative cursor-pointer flex gap-2 py-3 px-4 bg-[var(--bg)] text-[var(--text)] rounded-md mr-3 shadow-xs`}
       onClick={()=>setOpenValue(prev=>!prev)}>
          <Menu size={18} className="group-hover:stroke-white" />
          <p className="hidden sm:block absolute top-[130%] pointer-events-none opacity-0 scale-0 duration-500 transition-all group-hover:scale-100 group-hover:opacity-100 right-1/2 translate-x-1/2 whitespace-nowrap text-xs bg-[var(--button)] text-white px-4 py-1.5 rounded-sm">Open Menu</p>
      </motion.button>
      {showBottom&&<BottomPart temp={temp} />}
      <HeaderLinksDevices openvalue={openvalue} setOpen={setOpenValue} />
    </header>
  );
};

export default Header;
