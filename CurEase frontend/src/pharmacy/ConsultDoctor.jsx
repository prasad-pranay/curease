import React from 'react'
import {motion} from "framer-motion"


const ConsultDoctor = () => {
  return (
    <section className=' '>
        {/* top bar */}
        <div className='overflow-hidden w-5xl mx-auto grid grid-cols-[1fr_auto] gap-x-10 bg-[var(--card)] shadow-md rounded-sm px-10 py-5 mt-10'>
            <motion.p initial={{y:"-100px",opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.5}}  className='text-3xl'>Online doctor consultation <br /> with qualified doctors</motion.p>
            <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  src="https://onemg.gumlet.io/marketing/793368e4-7232-45b3-9690-2fc81da12287.svg" alt="" className='col-2 row-span-4' />
            <motion.p initial={{x:"-100px",opacity:0}} animate={{x:0,opacity:1}} transition={{duration:.5}}  className='text-sm mt-2'>Starting at ₹199</motion.p>
            <div className='flex mt-5 gap-10'>
                <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  className='flex gap-3 items-center'>
                    <img src="https://onemg.gumlet.io/marketing/e7391473-ce45-403b-ae9e-04f25674874c.svg" alt="" className='h-10' />
                    <p>Talk within 30 min</p>
                </motion.div>
                <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  className='flex gap-3 items-center'>
                    <img src="https://onemg.gumlet.io/marketing/7df1fb1e-dc1e-4d1d-9031-bb05955710fa.svg" alt="" className='h-10' />
                    <p>Free follow up for 3 days</p>
                </motion.div>
                <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  className='flex gap-3 items-center'>
                    <img src="https://onemg.gumlet.io/marketing/a420ec3a-01da-40f8-95f2-db07e89c1421.svg" alt="" className='h-10' />
                    <p>Talk within 30 min</p>
                </motion.div>
            </div>
            <motion.button initial={{y:"100px",opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.5}}  className='mt-10 bg-[var(--button)] py-2 rounded-sm w-max px-10 text-white'>Consult Now</motion.button>
        </div>
        {/* stats bar */}
        <div className='w-5xl mx-auto grid grid-cols-5 items-center mt-15 px-15 py-10 bg-[var(--card)] items-center border-1 rounded-sm border-[var(--text)]'>
            <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  className='flex flex-col items-center group'>
                <p className='text-5xl text-[var(--button)] transition-transform duration-400 group-hover:scale-120'>30L+</p>
                <p className='text-sm mt-2'>Consultations</p>
            </motion.div>
            <div className='h-[90%] w-[1px] justify-self-center bg-gray-400'></div>
            <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  className='flex flex-col items-center group'>
                <p className='text-5xl text-[var(--button)]  transition-transform duration-400 group-hover:scale-120'>3K+</p>
                <p className='text-sm mt-2'>Daily Consumer</p>
            </motion.div>
            <div className='h-[90%] w-[1px] justify-self-center bg-gray-400'></div>
            <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  className='flex flex-col items-center group'>
                <p className='text-5xl text-[var(--button)]  transition-transform duration-400 group-hover:scale-120'>22+</p>
                <p className='text-sm mt-2'>Specialities</p>
            </motion.div>
        </div>
        {/* show security bar */}
        <div className='grid grid-cols-4 gap-10 px-10 py-10 bg-[var(--card)] mt-15'>
            <div className='group flex flex-col items-center cursor-default'>
                <img src="https://www.1mg.com/images/confidential.svg" alt="" className='h-30 w-max transition-transform duration-300 group-hover:scale-120' />
                <p className='text-xl mt-10'>100% Confidential</p>
                <p className='text-sm mt-5 text-gray-400 text-center'>All advice & consultations are completely confidential. You can also delete chats whenever you want.</p>
            </div>
            <div className='group flex flex-col items-center cursor-default'>
                <img src="https://www.1mg.com/images/certified.svg" alt="" className='h-30 w-max transition-transform duration-300 group-hover:scale-120' />
                <p className='text-xl mt-10'>Certified Doctors</p>
                <p className='text-sm mt-5 text-gray-400 text-center'>We offer quality healthcare through our network of certified and experienced doctors.</p>
            </div>
            <div className='group flex flex-col items-center cursor-default'>
                <img src="https://www.1mg.com/images/convenience.svg" alt="" className='h-30 w-max transition-transform duration-300 group-hover:scale-120' />
                <p className='text-xl mt-10'>Convenience</p>
                <p className='text-sm mt-5 text-gray-400 text-center'>Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.</p>
            </div>
            <div className='group flex flex-col items-center cursor-default'>
                <img src="https://www.1mg.com/images/costEffective.svg" alt="" className='h-30 w-max transition-transform duration-300 group-hover:scale-120' />
                <p className='text-xl mt-10'>Cost Effective</p>
                <p className='text-sm mt-5 text-gray-400 text-center'>We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to queries.</p>
            </div>
        </div>
    </section>
  )
}

export default ConsultDoctor
