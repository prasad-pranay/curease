import React, { useEffect, useRef, useState } from 'react'
import Carousel from '../component/Carousel'
import { Ambulance, ChevronLeft, ChevronRight, HandHeart, ScanHeart } from 'lucide-react'
import { FiTrello } from 'react-icons/fi'
import { motion } from "framer-motion"


function scrollRight (containerRef,setLeftScrollLeft,setRightScrollLeft) {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: 400, behavior: "smooth" });
    setLeftScrollLeft(true)
    if(container.scrollLeft + container.clientWidth < container.scrollWidth-400){
        setRightScrollLeft(true)
    }else{
        setRightScrollLeft(false)
    }
};
function scrollLeft (containerRef,setLeftScrollLeft,setRightScrollLeft) {
  const container = containerRef.current;
  if (!container) return;
  container.scrollBy({ left: -400, behavior: "smooth" });
  setRightScrollLeft(true)
  if(container.scrollLeft -400 > 0){
    setLeftScrollLeft(true)
  }else{
    setLeftScrollLeft(false)
  }
};

const FeaturedBrands = ()=>{
    const containerRef = useRef(null);
    const [rightScrollLeft,setRightScrollLeft] = useState(true);
    const [leftScrollLeft,setLeftScrollLeft] = useState(false);
    
    const TabButtons = ({link,title})=>{
        return <motion.div initial={{opacity:0,scale:0}}
                whileInView={{ opacity: 1, scale:1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }} className='flex-shrink-0 h-30 w-30 '>
            <img src={link} alt="" className='h-full w-full rounded-lg' />
        </motion.div>
    }
    
    return <div className='bg-[var(--card)] transition-bg duration-400 w-screen px-20 py-5 shadow-sm relative'>
        <div ref={containerRef} className='overflow-x-auto scrollbar-hide flex gap-20 relative'>
            <TabButtons  link="https://onemg.gumlet.io/2025-10%2F1761806219_Protinex1.png?format=auto" />
            <TabButtons  link="https://onemg.gumlet.io/2025-10%2F1761718299_Himalaya.png?format=auto" />
            <TabButtons  link="https://onemg.gumlet.io/2025-10%2F1761806200_Cetaphil.png?format=auto" />
            <TabButtons  link="https://onemg.gumlet.io/2025-10%2F1761806192_Vaseline.jpg?format=auto" />
            <TabButtons  link="https://onemg.gumlet.io/2025-10%2F1761806185_Horlicks.png?format=auto" />
            <TabButtons  link="https://onemg.gumlet.io/2025-10%2F1761543423_Pilgrim-1.png?format=auto" />
            <TabButtons  link="https://onemg.gumlet.io/2025-10%2F1761806174_Morepen.png?format=auto" />
            <TabButtons  link="https://onemg.gumlet.io/diagnostics%2F2024-06%2F1719206984_Tata+1mg.png?format=auto" />
            <TabButtons  link="https://onemg.gumlet.io/diagnostics%2F2024-06%2F1719206972_tejasya.png?format=auto" />
        </div>
        <div className={`absolute left-5 top-0 flex items-center h-full transition-transform duration-300 hover:scale-130 cursor-pointer ${leftScrollLeft ? "opacity-100":"opacity-30"}`} 
            onClick={()=>scrollLeft(containerRef,setLeftScrollLeft,setRightScrollLeft)}>
                <ChevronLeft size={50} color='#FF6F61'/>
        </div>
        <div className={`absolute right-10 top-0 flex items-center h-full transition-transform duration-300 hover:scale-130 cursor-pointer ${rightScrollLeft ? "opacity-100":"opacity-30"}`} 
            onClick={()=>scrollRight(containerRef,setLeftScrollLeft,setRightScrollLeft)}>
                <ChevronRight size={50} color='#FF6F61'/>
        </div>
    </div>
}
const ShopByHealthCare = ()=>{
    const containerRef = useRef(null);
    const [rightScrollLeft,setRightScrollLeft] = useState(true);
    const [leftScrollLeft,setLeftScrollLeft] = useState(false);
    const TabButtons = ({link,title})=>{
        return <motion.div 
                initial={{opacity:0,scale:0}}
                whileInView={{ opacity: 1, scale:1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className='flex-shrink-0 group cursor-pointer hover:bg-[var(--bg)] px-5 py-2 rounded-lg transition-bg duration-500'>
            <div className='h-30 w-30 overflow-hidden rounded-lg'>
                <img src={link} alt="" className='h-full w-full group-hover:scale-120 transition-transform duration-500' />
            </div>
            <p className='text-sm mt-2'>{title}</p>
        </motion.div>
    }
    return <div className='bg-[var(--card)] transition-bg duration-400 w-screen px-20 py-3 shadow-sm relative'>
        <div ref={containerRef} className='overflow-x-auto scrollbar-hide flex gap-10'>
            <TabButtons title="Diabetes" link="https://onemg.gumlet.io/a56b26a0-30f1-4977-96f8-7acf1b3e0e02.png?format=auto" />
            <TabButtons title="Heart Care" link="https://onemg.gumlet.io/629aaf65-515f-4069-b730-28618f78597b.png?format=auto" />
            <TabButtons title="Stomach Care" link="https://onemg.gumlet.io/b251c9cf-8d88-4fb8-8c3c-7b328caa9f70.png?format=auto" />
            <TabButtons title="Liver Care" link="https://onemg.gumlet.io/573d8a1a-edd0-46a5-a0fe-01a1c2bcc8f2.png?format=auto" />
            <TabButtons title="Bone & Muscle" link="https://onemg.gumlet.io/a1af8b43-2836-483d-8709-99eff1cc6f70.png?format=auto" />
            <TabButtons title="Kidney Care" link="https://onemg.gumlet.io/96f9ed8a-ba62-426c-bd66-6762f40f3370.png?format=auto" />
            <TabButtons title="Derma Care" link="https://onemg.gumlet.io/730dbe50-4bdc-4fa8-9a09-93bc5d6c6f38.png?format=auto" />
            <TabButtons title="Respiratory Care" link="https://onemg.gumlet.io/8051e79c-6152-440e-b402-8d1ba8d7c82e.png?format=auto" />
            <TabButtons title="Eye Care" link="https://onemg.gumlet.io/1627c0d3-a6ed-470a-8b18-94baa9fdbcfc.png?format=auto" />
        </div>
        <div className={`absolute left-5 top-0 flex items-center h-full transition-transform duration-300 hover:scale-130 cursor-pointer ${leftScrollLeft ? "opacity-100":"opacity-30"}`} 
            onClick={()=>scrollLeft(containerRef,setLeftScrollLeft,setRightScrollLeft)}>
                <ChevronLeft size={50} color='#FF6F61'/>
        </div>
        <div className={`absolute right-10 top-0 flex items-center h-full transition-transform duration-300 hover:scale-130 cursor-pointer ${rightScrollLeft ? "opacity-100":"opacity-30"}`} 
            onClick={()=>scrollRight(containerRef,setLeftScrollLeft,setRightScrollLeft)}>
                <ChevronRight size={50} color='#FF6F61'/>
        </div>
    </div>
}
const FullBodyHealthCheckup = ()=>{
    const containerRef = useRef(null);
    const [rightScrollLeft,setRightScrollLeft] = useState(true);
    const [leftScrollLeft,setLeftScrollLeft] = useState(false);
    const TabButtons = ({label,title,price,original})=>{
        const discount = (1 - price / original) * 100
        return <motion.div 
                initial={{opacity:0,scale:0}}
                whileInView={{ opacity: 1, scale:1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }} 
                className='flex-shrink-0 border-1 border-gray-400 rounded-sm px-5 py-3 w-70'>
            <p className='truncate'>{title}</p>
            <p className='text-xs'>{label}</p>
            <div className='flex gap-5 items-end mt-2'>
                <p>₹{price} </p>
                <span className='text-sm text-gray-500 line-through'>₹{original}</span> 
                <span className='text-green-500 text-xs border-1 border-green-400 px-2 py-1 rounded-xs border-dashed'>{discount.toFixed(2)}%</span>
                <img src="https://simiradiagnostics.com/wp-content/uploads/2024/02/Lipid-profile-scaled.jpg" alt="" className='ml-auto rounded-sm h-10' />
            </div>
        </motion.div>
    }
    return <div className='bg-[var(--card)] transition-bg duration-400 w-screen px-20 py-5 shadow-sm relative'>
        <div ref={containerRef} className='overflow-x-auto scrollbar-hide flex gap-20'>
            <TabButtons title="Lipid Profile" label="Contains 8 tests" price={399} original={450}  />
            <TabButtons title="CBC (Complete Blood Count)" label="Contains 21 tests" price={319} original={350}  />
            <TabButtons title="Thyroid Profile Total (T3, T1, TSH)" label="Contains 3 tests" price={490} original={550}  />
            <TabButtons title="Lipid Profile, Non Fasting" label="Contains 8 tests" price={699} original={750}  />
            <TabButtons title="Coronavirus Covid-19 Test" label="Contains 1 tests" price={500} original={900}  />
            <TabButtons title="LFT (Liver Function Test)" label="Contains 11 tests" price={399} original={710}  />
            <TabButtons title="KFT with Electrolytes (Kidney Function Test)" label="Contains 8 tests" price={399} original={850}  />
            <TabButtons title="Vitamin B12" label="Contains 1 tests" price={680} original={1200}  />
        </div>
        <div className={`absolute left-5 top-0 flex items-center h-full transition-transform duration-300 hover:scale-130 cursor-pointer ${leftScrollLeft ? "opacity-100":"opacity-30"}`} 
            onClick={()=>scrollLeft(containerRef,setLeftScrollLeft,setRightScrollLeft)}>
                <ChevronLeft size={50} color='#FF6F61'/>
        </div>
        <div className={`absolute right-10 top-0 flex items-center h-full transition-transform duration-300 hover:scale-130 cursor-pointer ${rightScrollLeft ? "opacity-100":"opacity-30"}`} 
            onClick={()=>scrollRight(containerRef,setLeftScrollLeft,setRightScrollLeft)}>
                <ChevronRight size={50} color='#FF6F61'/>
        </div>
    </div>
}
const RadiologyTest = ()=>{
    const containerRef = useRef(null);
    const [rightScrollLeft,setRightScrollLeft] = useState(true);
    const [leftScrollLeft,setLeftScrollLeft] = useState(false);
    const TabButtons = ({label,title,price,original})=>{
        const discount = (1 - price / original) * 100
        return <motion.div initial={{opacity:0,scale:0}}
                whileInView={{ opacity: 1, scale:1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }} className='flex-shrink-0 border-1 border-gray-400 rounded-sm px-5 py-3 w-70'>
            <p className='truncate'>{title}</p>
            <p className='text-xs'>{label}</p>
            <div className='flex gap-5 items-end mt-2'>
                <p>₹{price} </p>
                <span className='text-sm text-gray-500 line-through'>₹{original}</span> 
                <span className='text-green-500 text-xs border-1 border-green-400 px-2 py-1 rounded-xs border-dashed'>{discount.toFixed(2)}%</span>
                <img src="https://simiradiagnostics.com/wp-content/uploads/2024/02/Lipid-profile-scaled.jpg" alt="" className='ml-auto rounded-sm h-10' />
            </div>
        </motion.div>
    }
    return <div className='bg-[var(--card)] transition-bg duration-400 w-screen px-20 py-5 shadow-sm relative'>
        <div ref={containerRef} className='overflow-x-auto scrollbar-hide flex gap-20'>
            <TabButtons title="Ultrasound Whole Abdomen" label="Contains 1 tests" price={665} original={700}  />
            <TabButtons title="Electrocardiography" label="Contains 1 tests" price={138} original={205}  />
            <TabButtons title="X- Ray Chest PA View" label="Contains 1 tests" price={171} original={220}  />
            <TabButtons title="MRI Brain" label="Contains 1 tests" price={2115} original={3000}  />
            <TabButtons title="MRI Lumbosacral Spine" label="Contains 1 tests" price={2250} original={3150}  />
            <TabButtons title="Treadmill Test" label="Contains 1 tests" price={1275} original={1540}  />
            <TabButtons title="Pulmonary Function Tests" label="Contains 1 tests" price={400} original={650}  />
            <TabButtons title="HRCT Scan Chest - Plain" label="Contains 1 tests" price={2000} original={2200}  />
            <TabButtons title="MRI Cervical Spine" label="Contains 1 tests" price={2250} original={2500}  />
        </div>
        <div className={`absolute left-5 top-0 flex items-center h-full transition-transform duration-300 hover:scale-130 cursor-pointer ${leftScrollLeft ? "opacity-100":"opacity-30"}`} 
            onClick={()=>scrollLeft(containerRef,setLeftScrollLeft,setRightScrollLeft)}>
                <ChevronLeft size={50} color='#FF6F61'/>
        </div>
        <div className={`absolute right-10 top-0 flex items-center h-full transition-transform duration-300 hover:scale-130 cursor-pointer ${rightScrollLeft ? "opacity-100":"opacity-30"}`} 
            onClick={()=>scrollRight(containerRef,setLeftScrollLeft,setRightScrollLeft)}>
                <ChevronRight size={50} color='#FF6F61'/>
        </div>
    </div>
}
const TopBanners = ()=>{
    const images = [
        "https://onemg.gumlet.io/249b7705-db71-4d9e-ba51-4bf14d9222e3_1760010206.png?w=1014&h=250&format=auto",
        "https://onemg.gumlet.io/2025-10%2F1761892488_Wegovy_Web_28thOc.jpeg?w=1014&h=250&format=auto",
        "https://onemg.gumlet.io/06b69537-30a1-4c94-a08f-ad632c4c5771_1756278636.png?w=1014&h=250&format=auto",
        "https://onemg.gumlet.io/2025-08%2F1756293934_Ayur_960x200.png?w=1014&h=250&format=auto",
        "https://onemg.gumlet.io/2025-09%2F1757069587_960x200.png?w=1014&h=250&format=auto",
        "https://onemg.gumlet.io/2025-10%2F1760095312_GST_960x200.png?w=1014&h=250&format=auto",
        "https://onemg.gumlet.io/2025-10%2F1761895402_AdultVAccination_Web_28thOct.jpeg?w=1014&h=250&format=auto"
    ]
    const [currentIndex,setCurrentIndex] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval); 
    }, [images.length]);

    return <div className='h-70 mb-5 grid grid-cols-[1fr_auto] gap-10 px-10'>
        <div className='bg-[var(--card)] transition-bg duration-400 pb-1 px-3 pt-3 shadow-sm rounded-xl flex flex-col'>
            <motion.img initial={{opacity:0,scale:0}}
                whileInView={{ opacity: 1, scale:1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}  key={currentIndex} src={images[currentIndex]} alt="Top banner"
                className="w-full h-full rounded-xl transition-opacity duration-700 ease-in-out" />
            <div className='flex pt-2 pb-1 justify-center gap-3 items-center'>
                <p className={`${currentIndex==0?"scale-130 bg-[var(--text)]":"bg-gray-400"} transition-all duration-300 p-1 h-max rounded-full w-max cursor-pointer hover:scale-130`} onClick={()=>setCurrentIndex(0)}></p>
                <p className={`${currentIndex==1?"scale-130 bg-[var(--text)]":"bg-gray-400"} transition-all duration-300 p-1 h-max rounded-full w-max cursor-pointer hover:scale-130`} onClick={()=>setCurrentIndex(1)}></p>
                <p className={`${currentIndex==2?"scale-130 bg-[var(--text)]":"bg-gray-400"} transition-all duration-300 p-1 h-max rounded-full w-max cursor-pointer hover:scale-130`} onClick={()=>setCurrentIndex(2)}></p>
                <p className={`${currentIndex==3?"scale-130 bg-[var(--text)]":"bg-gray-400"} transition-all duration-300 p-1 h-max rounded-full w-max cursor-pointer hover:scale-130`} onClick={()=>setCurrentIndex(3)}></p>
                <p className={`${currentIndex==4?"scale-130 bg-[var(--text)]":"bg-gray-400"} transition-all duration-300 p-1 h-max rounded-full w-max cursor-pointer hover:scale-130`} onClick={()=>setCurrentIndex(4)}></p>
                <p className={`${currentIndex==5?"scale-130 bg-[var(--text)]":"bg-gray-400"} transition-all duration-300 p-1 h-max rounded-full w-max cursor-pointer hover:scale-130`} onClick={()=>setCurrentIndex(5)}></p>
                <p className={`${currentIndex==6?"scale-130 bg-[var(--text)]":"bg-gray-400"} transition-all duration-300 p-1 h-max rounded-full w-max cursor-pointer hover:scale-130`} onClick={()=>setCurrentIndex(6)}></p>
            </div>
        </div>
        <motion.div initial={{opacity:0,scale:0}}
                whileInView={{ opacity: 1, scale:1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }} >
            <Carousel autoplay={true} autoplayDelay={3000} pauseOnHover={true} loop={true} />
        </motion.div>
    </div>
    
}

const SectionTitle = ({Title,Icon})=>{
    return <p className='px-15 text-xs font-semibold mb-3 flex gap-2 items-center mt-10'>
        <Icon size={15}/> 
        {Title}
    </p>
}

const Home = () => {
  return (
    <section className='pt-10 bg-[var(--bg)] transition-bg duration-400 max-w-screen overflow-hidden pb-10'>
        <TopBanners />
        <SectionTitle Title="Shop By health Concerns" Icon={Ambulance} />
        <ShopByHealthCare/>
        <SectionTitle Title="Pathology Tests" Icon={ScanHeart} />
        <FullBodyHealthCheckup />
        <SectionTitle Title="Featured Brands" Icon={FiTrello} />
        <FeaturedBrands />
        <SectionTitle Title="Radiology Tests" Icon={HandHeart} />
        <RadiologyTest />
    </section>
  )
}

export default Home
