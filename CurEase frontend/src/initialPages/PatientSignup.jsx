import React, { useEffect, useState } from 'react'
import { AddNewPatient } from '../BackendFunctions';
import { CheckCircle, ChevronRight, Contact, Eye, EyeClosed,Mail, Flag, Key, Keyboard, Pencil, Rocket, Send, User, UserCheck, UserStar, Phone, ChevronLeft, Feather, Trash} from 'lucide-react';
import {AnimatePresence, motion} from "framer-motion"
import toast from 'react-hot-toast';



const SignUpTabs = ({tabNumber,Icon,title,currentTab,setCurrentTab})=>{
  return <div onClick={()=>setCurrentTab(tabNumber)} className={`flex gap-5 items-center cursor-pointer ${currentTab==tabNumber? "hover:bg-blue-100" : tabNumber<currentTab ? "hover:bg-teal-100 opacity-50" :""} transition-bg duration-300 px-10 py-3 rounded-sm`}>
    <p className={`w-10 h-10 rounded-full  flex items-center justify-center text-xs ${currentTab==tabNumber?"bg-gradient-to-br from-indigo-500 to-purple-500 text-white":tabNumber<currentTab?"bg-gradient-to-br from-teal-400 to-teal-500":"bg-blue-100 text-gray-600"}`}>{tabNumber}</p>
    <p className={`text-base flex gap-2 items-center ${currentTab==tabNumber? "text-indigo-600" : tabNumber<currentTab ? "text-teal-500" :"text-gray-800" }`}>{<Icon size={20}/>}{title}</p>
  </div>
}
function checkPasswordConditions(password) {
  return {
    hasMinLength: password.length >= 8,
    hasNumberOrSymbol: /[\d\W]/.test(password), // digit or special character
    hasUpperAndLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
  };
}
const Page2Input =({value,type,setValue,title,place,id})=>{
  return <div className="w-full px-5 py-2 rounded-lg"  >
    <label className="block text-sm mb-2 overflow-hidden" htmlFor={id}>
      <motion.div initial={{opacity:0,y:"-100px"}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
        {title}
      </motion.div>
    </label>
    <motion.input initial={{opacity:0,scaleX:0}} animate={{opacity:1,scaleX:1}} transition={{duration:.5}} value={value} onChange={e=>setValue(e.target.value)} className="text-sm custom-input w-full px-10 py-4 border border-gray-300 rounded-lg shadow-xs transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300" placeholder={place} id={id} required="" autoComplete="off" type={type} />
  </div>
}
const PageTwo = ({setCurrentPage,myData,setData})=>{
    const [email,setemail]=useState(myData["email"])
    const [contact,setContact] = useState(myData["contactNo"])
    return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className='w-full h-full flex flex-col justify-center  px-10 py-5 overflow-x-hidden'>
        {/* your info div */}
        <div className='grid grid-cols-[auto_1fr] gap-x-10 mb-5'>
          <motion.p initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='mx-auto rounded-full flex w-25 h-25 items-center justify-center p-2 bg-indigo-100 relative row-span-2'>
            <User size={50} strokeWidth={1} />
          </motion.p>
          <p className='text-3xl self-center'>Welcome {myData["fName"]},</p>
          <p className='text-sm text-gray-600'>Please provide your contact information so we can assist you better.</p>
        </div>
        {/* Phone Number */}
        <div className='text-[#1F2470] flex items-center w-full'>
            <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}} src="/contact.png" alt="" className='h-30' />
            <Page2Input place="Your Phone Number" value={contact} id="signup-patient-phone" setValue={setContact} title={<p className='flex items-center gap-2'><Phone size={17} /> Phone Number</p>} type='number' />
        </div>
        {/* Email Address */}
        <div className='text-[#1F2470] flex items-center w-full'>
            <Page2Input place="Your Mail id" id="signup-patient-mail" value={email} setValue={setemail} title={<p className='flex items-center gap-2'><Mail size={17} /> Email Address</p>} type='email' />
            <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}} src="/mail.png" alt="" className='h-30' />
        </div>

        <div className='flex justify-between mt-10'>
            <motion.button initial={{opacity:0,x:"-100px"}} animate={{opacity:1,x:0}} transition={{duration:.5}} className='bg-[#fa5252] pl-10 pr-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 rounded-lg flex items-center gap-2 text-white' 
                onClick={()=>setCurrentPage(prev=>prev-1)}>
              <Feather size={18}/>
              Previous
              <span className='ml-10 w-10 h-10 flex items-center bg-[#ff8787] rounded-full justify-center'><ChevronLeft/></span>
            </motion.button>
            <motion.button initial={{opacity:0,x:"100px"}} animate={{opacity:1,x:0}} transition={{duration:.5}} className='bg-[#4D5EFE] pl-10 pr-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 rounded-lg flex items-center gap-2 text-white' 
                onClick={()=>{
                  setData(prev=>({...prev,"email":email,"phone":contact}))
                  setCurrentPage(prev=>prev+1)
                }}>
              <Flag size={18}/>
              Next
              <span className='ml-10 w-10 h-10 flex items-center bg-[#6E80FE] rounded-full justify-center'><ChevronRight/></span>
            </motion.button>
        </div>
    </motion.div>
}


const PatientSignup = ({whichPage,setWhichPage})=>{
  const [currentTab,setCurrentTab] = useState(1)
  const [data,setdata] = useState({
    "fName": "",
    "lName": "",
    "email": "",
    "password": "",
    "repassword": "",
    "phone": "",
    "image":null,
  })
  const [hideRePassword,setHideRePassword] = useState(true);
  const [hidePassword,setHidePassword] = useState(true);
  const [passCondition,setPassCondition] = useState({
    "hasMinLength":false,
    "hasNumberOrSymbol":false,
    "hasUpperAndLower":false,
  })

  useEffect(() => {
    const result = checkPasswordConditions(data["password"]);
    setPassCondition({hasMinLength:result.hasMinLength,hasNumberOrSymbol:result.hasNumberOrSymbol,hasUpperAndLower:result.hasUpperAndLower})
  }, [data["password"]])
  const [passError,setPassError] = useState("")
  const [previewImage,setPreviewImage] = useState(null)
  const handleFileChange = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setdata({...data,image:e.target.files[0]});
  };

  return <section className={`bg-[#F3F1FF] px-10 absolute transition-all h-full top-0 left-0 w-5xl flex flex-col ${whichPage=="signup" ? "translate-x-0 opacity-100 duration-300 delay-300":"opacity-0 translate-x-[100%] duration-300"}`}>
        {/* stepper tabs */}
        <div className='flex justify-evenly w-full pt-5 pb-3 relative'>
          <SignUpTabs tabNumber={1} Icon={Rocket} title="Get Started" currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <SignUpTabs tabNumber={2} Icon={Contact} title="Contact Details" currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <SignUpTabs tabNumber={3} Icon={Send} title="Final Touches" currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {/* progress bar */}
          <div className='absolute h-[2px] w-full left-0 bottom-0 bg-gray-300'>
            <p className='bg-indigo-800 h-[2px] transition-w duration-300' style={{width:`${33.3*currentTab}%`}}>
            </p>
          </div>
        </div>
        {currentTab==1 && <form className='mt-10 pb-10 px-5 flex flex-col h-full' onSubmit={e=>{
          e.preventDefault();
          setCurrentTab(prev=>prev+1)
          if(data["password"]==data['repassword']){
            if(passCondition.hasMinLength && passCondition.hasNumberOrSymbol && passCondition.hasUpperAndLower){
              setPassError("")
            }else{
              setPassError("Password conditions need to be fulfilled")
            }
          }else{
            setPassError("Password does not match")
          }
        }}>
        {/* top tab here */}
          <div className='grid grid-cols-[auto_1fr] gap-x-10'>
          {/* title tab here */}
            <motion.div initial={{opacity:0,x:"-100%"}} animate={{opacity:1,x:0}} transition={{duration:.5}} className='grid grid-cols-[auto_1fr] gap-x-5 items-center mb-5'>
              <img src="/icon.png" alt="" className='h-15 w-15 row-span-2' />
              {/* title here */}
              <p className='text-4xl text-gray-800'>Sign Up</p>
              {/* small text below heading here */}
              <p className='text-xs text-gray-600 '>Join us and experience a healthier, worry-free lifestyle!</p>
            </motion.div>
            {/* user image herer */}
            <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='col-2 row-span-2 w-full h-full rounded-full text-gray-600'>
              <p className='mx-auto rounded-xl flex items-center justify-center w-max p-2 bg-indigo-100 relative'>
                <User size={120} strokeWidth={1} />
                <AnimatePresence>
                  {previewImage && <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} src={previewImage} alt="" className='absolute w-full h-full top-0 left-0 rounded-sm' />}
                </AnimatePresence>
                {previewImage && <div  onClick={()=>{setPreviewImage(null);setdata({...data,image:null})}} className='absolute group text-gray-600 hover:text-violet-800 bottom-0 right-0 translate-x-2 translate-y-1 bg-[#F4EDFF] rounded-lg p-2 cursor-pointer'>
                  <Trash size={20} />
                  <span className='group-hover:opacity-100 transition-opacity duration-300 opacity-0 text-xs absolute top-[120%] bg-gray-700 text-white px-3 py-1 rounded-sm pointer-events-none whitespace-nowrap right-0 translate-x-1/2'>Delete Image</span>
                </div>}
                {!previewImage && <label htmlFor='patient-signup-image' className='absolute group text-gray-600 hover:text-violet-800 bottom-0 right-0 translate-x-2 translate-y-1 bg-[#F4EDFF] rounded-lg p-2 cursor-pointer'>
                  <Pencil size={20} />
                  <span className='group-hover:opacity-100 transition-opacity duration-300 opacity-0 text-xs absolute top-[120%] bg-gray-700 text-white px-3 py-1 rounded-sm pointer-events-none whitespace-nowrap right-0 translate-x-1/2'>Upload a Image</span>
                </label>}
                <input type="file" id="patient-signup-image" hidden accept="image/*" onChange={handleFileChange}  />
              </p>
            </motion.div>
            
            {/* get name here */}
            <div className='flex gap-10 pt-3 overflow-hidden h-full'>
              {/* fisrt name box  */}
              <motion.label initial={{opacity:0,y:"-100px"}} animate={{opacity:1,y:0}} transition={{duration:.5}} htmlFor='signup-user-first-name' className='flex py-3 items-center pr-2 pl-10 relative gap-5 '>
                <input autoComplete='off' id='signup-user-first-name' value={data["fName"]} onChange={e=>setdata(prev=>({...prev,"fName":e.target.value}))} type="text" className='peer text-base outline-none border-none w-full' required />
                <UserStar size={20} className='absolute top-1/2 -translate-y-1/2 left-2  transition-stroke duration-500 stroke-gray-500 peer-focus:stroke-violet-800'/>
                <CheckCircle size={18} className={`transition-stroke duration-500  ${data["fName"]==""? "peer-focus:stroke-violet-800 stroke-gray-500":"stroke-teal-500"} `} />
                <span className='absolute text-base text-gray-600 left-10 top-1/2 -translate-y-1/2 transition-all duration-300 peer-focus:top-0 peer-focus:text-sm peer-focus:text-indigo-800 peer-valid:top-0 peer-valid:text-sm peer-valid:text-indigo-800 '>First Name</span>
                <p className='absolute w-full bottom-0 border-t-1 border-gray-300 peer-focus:border-violet-800 transition-border duration-300 left-0'></p>
              </motion.label>
              {/* last name boxx */}
              <motion.label initial={{opacity:0,y:"100px"}} animate={{opacity:1,y:0}} transition={{duration:.5}} htmlFor='signup-user-last-name' className='flex py-3 items-center pr-2 pl-10 relative gap-5 '>
                <input autoComplete='off' id='signup-user-last-name' value={data["lName"]} onChange={e=>setdata(prev=>({...prev,"lName":e.target.value}))} type="text" className='peer text-base outline-none border-none w-full'  required />
                <UserCheck size={20} className='absolute top-1/2 -translate-y-1/2 left-2  transition-stroke duration-500 stroke-gray-500 peer-focus:stroke-violet-800'/>
                <CheckCircle size={18} className={`transition-stroke duration-500  ${data["lName"]==""? "peer-focus:stroke-violet-800 stroke-gray-500":"stroke-teal-500"} `} />
                <span className='absolute text-base text-gray-600 left-10 top-1/2 -translate-y-1/2 transition-all duration-300 peer-focus:top-0 peer-focus:text-sm peer-focus:text-indigo-800 peer-valid:top-0 peer-valid:text-sm peer-valid:text-indigo-800 '>Last Name</span>
                <p className='absolute w-full bottom-0 border-t-1 border-gray-300 peer-focus:border-violet-800 transition-border duration-300 left-0'></p>
              </motion.label>
            </div>
          </div>
          {/* password fild here */}
          <div className='mt-7'>
            <motion.label initial={{opacity:0,scaleY:0}} animate={{opacity:1,scaleY:1}} transition={{duration:.5}}  htmlFor='signup-user-password' className='flex py-3 items-center pr-2 pl-10 relative gap-5 '>
              <input autoComplete='off' id='signup-user-password' value={data["password"]} onChange={e=>setdata(prev=>({...prev,"password":e.target.value}))} type={hidePassword ? "password" : "text"} className='peer text-base outline-none border-none w-full'  required />
              <Key size={20} className='absolute top-1/2 -translate-y-1/2 left-2  transition-stroke duration-500 stroke-gray-500 peer-focus:stroke-violet-800'/>
              <p className='cursor-pointer' onClick={()=>setHidePassword(prev=>!prev)}>{hidePassword ? <EyeClosed size={18} /> : <Eye size={18} />}</p>
              <span className='absolute text-base text-gray-600 left-10 top-1/2 -translate-y-1/2 transition-all duration-300 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-800 peer-valid:top-1 peer-valid:text-sm peer-valid:text-indigo-800 '>Password</span>
              <p className='absolute w-full bottom-0 border-t-1 border-gray-300 peer-focus:border-violet-800 transition-border duration-300 left-0'></p>
            </motion.label>
            <ul className={` pl-5 mt-3 text-xs transition-h duration-300 overflow-hidden ${(passCondition.hasMinLength && passCondition.hasNumberOrSymbol && passCondition.hasUpperAndLower) ? "h-0" : "h-[60px]"}`}>
              <motion.li initial={{opacity:0,x:"-100px"}} animate={{opacity:1,x:0}} transition={{duration:.5}}  className={`list-disc mb-1 ${passCondition.hasMinLength ? "text-teal-500":"text-gray-600"}`}>Least 8 Characters</motion.li>
              <motion.li initial={{opacity:0,x:"-200px"}} animate={{opacity:1,x:0}} transition={{duration:.5}}  className={`list-disc mb-1 ${passCondition.hasNumberOrSymbol ? "text-teal-500":"text-gray-600"}`}>Lease one number (0-9) or symbol</motion.li>
              <motion.li initial={{opacity:0,x:"-300px"}} animate={{opacity:1,x:0}} transition={{duration:.5}}  className={`list-disc ${passCondition.hasUpperAndLower ? "text-teal-500":"text-gray-600"}`}>Lowercase (a-z) and uppercase (A-Z)</motion.li>
            </ul>
          </div>
          {/* re password filed here */}
          <div className='mt-5'>
            <motion.label initial={{opacity:0,scaleY:0}} animate={{opacity:1,scaleY:1}} transition={{duration:.5}}  htmlFor='signup-user-repassword' className='flex py-3 items-center pr-2 pl-10 relative gap-5 '>
              <input autoComplete='off' id='signup-user-repassword' value={data["repassword"]} onChange={e=>setdata(prev=>({...prev,"repassword":e.target.value}))} type={hideRePassword ? "password" : "text"} className={`peer text-base outline-none border-none w-full ${data["repassword"]==data["password"]?"text-green-500":"text-red-500"}`}  required />
              <Keyboard size={20} className='absolute top-1/2 -translate-y-1/2 left-2  transition-stroke duration-500 stroke-gray-500 peer-focus:stroke-violet-800'/>
              <p className='cursor-pointer' onClick={()=>setHideRePassword(prev=>!prev)}>{hideRePassword ? <EyeClosed size={18} /> : <Eye size={18} />}</p>
              <span className='absolute text-base text-gray-600 left-10 top-1/2 -translate-y-1/2 transition-all duration-300 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-800 peer-valid:top-1 peer-valid:text-sm peer-valid:text-indigo-800 '>Retype Password</span>
              <p className='absolute w-full bottom-0 border-t-1 border-gray-300 peer-focus:border-violet-800 transition-border duration-300 left-0'></p>
            </motion.label>
          </div>
          <p className='text-sm text-red-400 mt-2'>{passError}</p>
          {/* signup buttons */}
          <div className='flex items-center gap-15 mt-auto'>
            <motion.button initial={{opacity:0,x:"-100%"}} animate={{opacity:1,x:0}} transition={{duration:.5}}  className='#6372f8ff bg-[#4D5EFE] pl-10 pr-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 rounded-lg flex items-center gap-2 text-white'>
              <Flag size={18}/>
              Next
              <span className='ml-10 w-10 h-10 flex items-center bg-[#6E80FE] rounded-full justify-center'><ChevronRight/></span>
            </motion.button>
            <span className='text-sm text-gray-400'>Or</span>
            <motion.button initial={{opacity:0,y:"200%"}} animate={{opacity:1,y:0}} transition={{duration:.5}}  className='border-gray-200 border-2 p-2 rounded-lg group'>
              <img src="/google.png" alt="" className='h-8 w-8 transition-transform duration-300 cursor-pointer group-hover:scale-110' />
            </motion.button>
            <div className="ml-auto flex items-center text-sm text-gray-600">
              Already have an account?
              <a onClick={()=>setWhichPage("login")} className="ml-2 border-b-1 border-transparent hover:border-purple-500 px-1 text-indigo-500 font-semibold hover:text-purple-500 transition-colors cursor-pointer">Sign In</a>
            </div>
          </div>
        </form>}
        {currentTab==2 && <PageTwo myData={data} setCurrentPage={setCurrentTab} setData={setdata} />}
        {currentTab==3 && <div className='flex flex-col w-full h-full items-center justify-center'>
          <p className='text-5xl text-gray-800 mb-10'>All Set to go!</p>
          <motion.img initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} src="/completed.gif" alt="" className='h-40 w-max rounded-xl' />
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className='text-base mt-5'>You can Edit these settings anytime by going into your profile</motion.p>
          <motion.button initial={{opacity:0,y:"100px"}} animate={{opacity:1,y:0}} transition={{duration:.5}} className='mt-15 bg-[#4D5EFE] pl-10 pr-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 rounded-lg flex items-center gap-2 text-white' 
                onClick={()=>{
                  AddNewPatient(data.phone,data.email,`${data.fName} ${data.lName}`,data.password,data.image)
                  toast.success("You have been registered with us successfully!")
                  setTimeout(() => {
                    toast.success(`Welcome ${data.fName}...`)
                  }, 1000);
                  setWhichPage("login")
                }}>
              <Flag size={18}/>
              Log In
              <span className='ml-10 w-10 h-10 flex items-center bg-[#6E80FE] rounded-full justify-center'><ChevronRight/></span>
            </motion.button>
        </div>}
  </section>
}

export default PatientSignup
