import React, { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

const Pharmacy = ({cartItem,setCartItem}) => {
 
  return (
    <section className='pharmacy bg-[var(--bg)] h-screen w-full text-[var(--text)] flex flex-col'>
        <Header cartItem={cartItem} setCartItem={setCartItem} />
        <main className='h-full overflow-y-auto patient-scrollbar'>
        <Outlet/>
        <Footer/>
        </main>
        <Toaster position="top-right" reverseOrder={true} />
    </section>
  )
}

export default Pharmacy
