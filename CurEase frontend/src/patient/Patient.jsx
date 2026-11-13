import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Patient = ({temp,notification,id,name,image}) => {
  return (
    <main className='patient flex flex-col h-screen w-screen overflow-x-hidden patient-scrollbar'>
        <Header id={id} temp={temp} name={name} image={image} notification={notification} />
        <Outlet />
        <Toaster position="top-right" reverseOrder={true} />
    </main>
  )
}

export default Patient
