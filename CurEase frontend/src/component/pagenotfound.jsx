import React from 'react'
import "./404.css"
import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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

const states = {
  "-1": 'No Login' ,
  "0": 'Doctor' ,
  "1": 'Patient' ,
  "2": 'Admin'
}

const PageNotFound404 = ({islogin}) => {
  const navigate = useNavigate()
  return (
    <section className='page-not-found h-screen w-screen flex flex-col justify-center items-center relative'>
      <header className='absolute w-full flex items-center py-5 px-10 top-0 left-0 justify-between'>
        <h1 className='flex items-center gap-2 text-xl font-bold tracking-wide text-blue-300'>
          <img src="/icon.png" alt="" className='h-8 ' />
          CUREASE
        </h1>
        <p className='font-bold px-2 text-red-500'>Login Status : <span className='text-blue-600 text-base font-bold px-5 py-1 rounded-xs mx-2'>{states[islogin]}</span></p>
      </header>
        <CenterAnimation/>

        <div className='flex items-c'>
          <button onClick={()=>navigate("/")} className='text-white flex items-center bg-indigo-600 gap-5 px-15 py-3 rounded-sm hover:scale-105 hover:-translate-y-1 transition-transform duration-200 active:scale-80 cursor-pointer'>Go To Home <Home/></button>
        </div>
    </section>
  )
}

export default PageNotFound404
