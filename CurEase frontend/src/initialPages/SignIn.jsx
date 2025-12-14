import React, {  useState } from 'react'
import "./initial.css"
import { useGoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { Info, BrushCleaning } from 'lucide-react';
import {AnimatePresence, motion, useAnimation} from "framer-motion"
import { MakeLogin } from '../BackendFunctions';
import toast, { Toaster } from "react-hot-toast";
import PatientSignup from './PatientSignup';
import { useEffect } from 'react';


const ForgotPassword = ({setForgotpassshow})=>{
  const [mail,setMail] = useState("")
  const [send,setSend] = useState(false)
  async function sendforgotmail(){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:mail}),
      });
    const result = await res.json()
    if(result.code==0){
      toast.success("Your password has been sent to your email!")
      setSend(true);
    }else if(result.code==1){
      toast.error("User does not exist")
    }else{
      toast.error(result.msg)
    }
  }
  return <motion.article 
  initial={{y:"100%",opacity:0}} 
  animate={{y:0,opacity:1}} 
  exit={{ y: "100%",opacity:0}} 
  transition={{duration:.6}} 
  className='absolute h-full w-full left-0 z-100 top-0 flex flex-col items-center justify-center px-20'>
      <img src="/forgot.gif" alt="" className='h-65 rounded-sm' />
      <h2 className="text-3xl text-gray-800 font-medium mt-5">Reset Password</h2>
      <p className='text-xs text-center mt-5 text-neutral-600'>We will send you a login link to you registered email address.</p>
      <div className="mb-5 relative w-full mt-10 mb-10">
        <input disabled={send} type="text" placeholder="Email" value={mail} onChange={e=>setMail(e.target.value)} className="text-black w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#c0cefeff] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300" required/>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
      </div>
      <button onClick={()=>{
        if(send){
          setForgotpassshow(false)
        }else{
          sendforgotmail()
        }
      }} type="submit" className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300">
       {send?"Mail Sent":" Send Login Link"}
      </button>
      <div className="text-center mt-6 text-sm text-gray-600">
        Back to log in?
        <a onClick={()=>setForgotpassshow(false)} className="cursor-pointer ml-2 border-b-1 border-transparent hover:border-purple-500 px-1 text-indigo-500 font-semibold hover:text-purple-500 transition-colors">Sign In</a>
      </div>
  </motion.article>
}

const LoginContainer = ({whichPage,setWhichPage})=>{
  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.access_token
    // You can now send this token to your backend for verification
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token: token }),
    })
      .then(async (res) => {
        const data = await res.json()
        if(data.code == "0"){
          toast.success("Login Successfull")
          setTimeout(() => {
            window.location.href = "/"
          }, 1500);
        }else if(data.code == "1") {
          toast.error("This email does not exist")
        }else{
          console.log("some problem occured",data)
        }
      })
      .then((data) => console.log("Backend:", data));
  };
  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => toast.error('Login Failed'),
  });
  const formControlAnimation = useAnimation();
  const [password,setPassword] = useState("")
  const [mail,setMail] = useState("")
  const [forgotpassShow,setForgotpassshow] = useState(false)
  useEffect(() => {
    if(forgotpassShow){
      formControlAnimation.start({
      x: [0,"-100%"],
      opacity:[1,0],
      transition: { duration: .6 },
    });
  }else{
      formControlAnimation.start({
      x: ["-100%",0],
      opacity:[0,1],
      transition: { duration: .6 },
    });

    }
  }, [forgotpassShow])
  
  return <div className={`${forgotpassShow?"bg-[#D1DBFC]":"bg-[#F3F1FF]"} w-full px-10 py-10 transition-all duration-400 ${whichPage=="signup"&&"translate-y-[-100%]"}`}>
    <AnimatePresence>
      {forgotpassShow && <ForgotPassword setForgotpassshow={setForgotpassshow}/>}
    </AnimatePresence>
       <div className="w-full flex flex-col items-center justify-center">
        <motion.form  animate={formControlAnimation} className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={async (e)=>{
          e.preventDefault()
              if(mail.length>0 && password.length>0){
                const code = await MakeLogin(mail,password);
                if(code==1){
                  // user not found
                  toast.error("User Not Found!")
                }else if(code==2){
                  // wrong password
                  toast("Wrong Password", {icon: <Info size={18}/>,style: {borderRadius: "10px",background: "#fa5252",color: "#fff",}})
                }else if(code==0){
                  // login succesffull
                  toast.success("User Found Successfully!")
                  setTimeout(() => {
                    window.location = "/"
                  }, 500);
                }
              }else{
                toast("Emtpy Filds", {icon: <BrushCleaning size={18}/>,style: {borderRadius: "10px",background: "#fd7e14",color: "#fff",}})
              }
            }}  >
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-5xl text-white">
            👤
          </div>
            <h2 className="text-3xl text-gray-800 font-medium">Sign in</h2>
            {/* <p className="text-xs text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p> */}

            <button onClick={() => login()} type="button" className="w-full cursor-pointer hover:bg-blue-400/50 transition-bg duration-300 mt-8 bg-blue-400/10 flex gap-5 items-center justify-center h-12 rounded-sm">
                <img src="/google.png" alt="googleLogo" className='h-6'/>
                <p className='text-base text-gray-800'>Sign In With Google</p>
            </button>
            {/* <GoogleLogin onSuccess={handleSuccess} onError={handleError} /> */}

            <div className="flex items-center gap-4 w-full my-5">
                <div className="w-full h-px bg-gray-300/90"></div>
                <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
                <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            {/* <!-- Username --> */}
            <div className="mb-5 relative w-full">
              <input type="text" placeholder="Username" value={mail} onChange={e=>setMail(e.target.value)} className="text-black w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300" required/>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
            </div>

            {/* <!-- Password --> */}
            <div className=" relative w-full">
              <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}  className="text-black w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300" required/>
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
            </div>

            <div className="select-none w-full flex items-center justify-between mt-8 mb-3 text-gray-700">
                <div className="container w-max">
                    <input type="checkbox" id="cbx" className='hidden' checked readOnly/>
                    <label htmlFor="cbx" className="check grid grid-cols-2 gap-6.5 text-sm">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                        <span className='whitespace-nowrap'>Remember me</span>
                    </label>
                </div>

                <p className="transition-transform duration-100 cursor-pointer text-indigo-500 hover:text-purple-500 transition-colors text-sm active:scale-95" onClick={()=>setForgotpassshow(true)}>Forgot Password?</p>
            </div>

            <button type="submit" className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300">
              Login
            </button>
            <div className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?
              <span onClick={()=>setWhichPage("signup")} className="cursor-pointer active:scale-90 ml-2 border-b-1 border-transparent hover:border-purple-500 px-1 text-indigo-500 font-semibold hover:text-purple-500 transition-colors">Sign up</span>
            </div>
        </motion.form>
    </div>
</div>
}


const SignIn = () => {
  const [whichPage,setWhichPage] = useState("login")
  return (
    <main className="text-black min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 overflow-hidden relative">

  {/* <!-- Floating shapes background --> */}
  <div className="absolute inset-0 z-0">
    <div className="absolute w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm top-[10%] left-[10%] animate-float"></div>
    <div className="absolute w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm top-[70%] left-[80%] animate-float delay-[2s]"></div>
    <div className="absolute w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm top-[40%] left-[5%] animate-float delay-[4s]"></div>
    <div className="absolute w-24 h-24 bg-white/20 rounded-full backdrop-blur-sm top-[20%] left-[85%] animate-float delay-[1s]"></div>
    <div className="absolute w-24 h-24 bg-white/20 rounded-full backdrop-blur-sm top-[60%] left-[15%] animate-float delay-[3s]"></div>
  </div>

  <section className={`overflow-hidden flex justify-center relative transition-all duration-400 rounded-xl z-10 ${whichPage=="login"?"w-xl":"w-5xl"}`}>
    {/* <!-- Login container --> */}
    <LoginContainer whichPage={whichPage} setWhichPage={setWhichPage} />
    <PatientSignup whichPage={whichPage} setWhichPage={setWhichPage} />

    <Toaster position="top-right" reverseOrder={true} />
  </section>

</main>
  )
}

export default SignIn
