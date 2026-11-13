import React from 'react'
import "./404.css"
// import { Home } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

const CenterAnimation = ()=>{
    return <div className="main_wrapper">
  <div className="main">
    <div className="antenna">
      <div className="antenna_shadow"></div>
      <div className="a1"></div>
      <div className="a1d"></div>
      <div className="a2"></div>
      <div className="a2d"></div>
      <div className="a_base"></div>
    </div>
    <div className="tv">
      <div className="cruve">
        <svg
          className="curve_svg"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 189.929 189.929"
          xmlSpace="preserve"
        >
          <path
            d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
        C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
          ></path>
        </svg>
      </div>
      <div className="display_div">
        <div className="screen_out">
          <div className="screen_out1">
            <div className="screen">
              <span className="notfound_text"> NOT FOUND</span>
            </div>
            <div className="screenM">
              <span className="notfound_text"> NOT FOUND</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lines">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="buttons_div">
        <div className="b1"><div></div></div>
        <div className="b2"></div>
        <div className="speakers">
          <div className="g1">
            <div className="g11"></div>
            <div className="g12"></div>
            <div className="g13"></div>
          </div>
          <div className="g"></div>
          <div className="g"></div>
        </div>
      </div>
    </div>
    <div className="bottom">
      <div className="base1"></div>
      <div className="base2"></div>
      <div className="base3"></div>
    </div>
  </div>
  <div className="text_404">
    <div className="text_4041">4</div>
    <div className="text_4042">0</div>
    <div className="text_4043">4</div>
  </div>
</div>
}



import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, ArrowUpRight } from "lucide-react";
// import CenterAnimation from "./CenterAnimation";

const states = {
  "-1": "Not signed in",
  "0": "Doctor",
  "1": "Patient",
  "2": "Administrator",
};

const PageNotFound404 = ({ islogin }) => {
  const navigate = useNavigate();

  const loginStatus = states[String(islogin)] ?? "Unknown";

  return (
    <main className="page-not-found relative flex min-h-screen flex-col overflow-hidden bg-[#fafbfc] text-slate-900">

      {/* Header */}
      <header className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2.5"
          aria-label="CurEase home"
        >
          <img
            src="/icon.png"
            alt=""
            className="h-8 w-8 object-contain"
          />

          <span className="text-lg font-semibold tracking-[-0.06em] text-slate-900">
            CurEase<span className="text-blue-600">.</span>
          </span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span>Session</span>
          <span className="font-medium text-slate-800">{loginStatus}</span>
        </div>
      </header>

      {/* Main content */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-28 text-center">

        {/* Small label */}
        {/* <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
          <span className="h-px w-6 bg-blue-300" />
          Page unavailable
          <span className="h-px w-6 bg-blue-300" />
        </div> */}

        {/* Animation */}
        {/* <div className="w-full max-w-[420px]"> */}
          <CenterAnimation />
        {/* </div> */}

        {/* Message */}
        <div className="mt-3 max-w-lg">
          <h1 className="text-4xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl">
            Lost your way?
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-sm font-light">
            The page you're looking for doesn't seem to exist, or it may have
            been moved. Let's get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center justify-center gap-3 rounded-md bg-blue-600 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/15 active:translate-y-0"
          >
            <Home size={16} />
            Back to home
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
          >
            <ArrowLeft size={15} />
            Go back
          </button>
        </div>
      </section>


    </main>
  );
};

export default PageNotFound404;



// const states = {
//   "-1": 'No Login' ,
//   "0": 'Doctor' ,
//   "1": 'Patient' ,
//   "2": 'Admin'
// }

// const PageNotFound404 = ({islogin}) => {
//   const navigate = useNavigate()
//   return (
//     <section className='page-not-found h-screen w-screen flex flex-col justify-center items-center relative'>
//       <header className='absolute w-full flex items-center py-5 px-10 top-0 left-0 justify-between'>
//         <h1 className='flex items-center gap-2 text-xl font-bold tracking-wide text-blue-300'>
//           <img src="/icon.png" alt="" className='h-8 ' />
//           CUREASE
//         </h1>
//         <p className='font-bold px-2 text-red-500'>Login Status : <span className='text-blue-600 text-base font-bold px-5 py-1 rounded-xs mx-2'>{states[islogin]}</span></p>
//       </header>
//         <CenterAnimation/>

//         <div className='flex items-c'>
//           <button onClick={()=>navigate("/")} className='text-white flex items-center bg-indigo-600 gap-5 px-15 py-3 rounded-sm hover:scale-105 hover:-translate-y-1 transition-transform duration-200 active:scale-80 cursor-pointer'>Go To Home <Home/></button>
//         </div>
//     </section>
//   )
// }

// export default PageNotFound404



