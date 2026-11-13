import { Box, CircleX, Factory, Frown, Meh, Minus, Pill, Plus, ShoppingCart, Smile, ThumbsDown, ThumbsUp, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import {motion} from "framer-motion"
import toast from 'react-hot-toast';

function addItem(id,title,image,price,quantity=1,cartItem,setCartItem,maxStock){
      if((cartItem || {}).hasOwnProperty(id)){
        const newQuantity = cartItem[id][3]+quantity
        if(newQuantity>maxStock){
          toast.error(`Only ${maxStock} quantities are available...`)
          return;
        }
        if(newQuantity<=0){
          setCartItem((prev) => {
            // Create a shallow copy
            const updated = { ...prev };
            delete updated[id]; // remove the id
            return updated; // return the new object
          });
        }else{
          setCartItem(prev=>({...prev,[id]:[title,image,price,newQuantity]}))
        }
      }else{
        toast.success("Item added to cart")
        setCartItem(prev=>({...prev,[id]:[title,image,price,quantity]}))
      }
}

const MedicineItem = ({index,ID,imageUrl,MedicineName,excellentReview,PoorReview,AverageReview,price,cartItem,setCartItem,onClick,stock})=>{
  return <motion.div initial={{scale:0,opacity:0}} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay:0.1*index ,ease: "easeOut" }}
      className='hover:scale-110 group bg-[var(--card)] relative transition-all duration-400 cursor-pointer px-5 py-5 shadow-xs overflow-hidden w-full rounded-sm flex flex-col items-center'>
        {/* image */}
        <div onClick={onClick} className='transition duration-150 active:scale-90 h-20 overflow-y-hidden w-full scrollbar-hide'>
            <img src={imageUrl} alt="" className='h-full w-max group-hover:scale-120 mx-auto transition-transform duration-300' />
        </div>
        {/* title */}
        <p onClick={onClick} className='transition duration-150 active:scale-90 text-base truncate overflow-hidden w-full mx-5 mt-2'>{MedicineName}</p>
        {/* review */}
        <div onClick={onClick} className='transition duration-150 active:scale-90 flex justify-between w-full mt-2'>
            <p className='flex gap-2 items-center px-3 py-1 rounded-sm text-sm'><ThumbsUp size={15}/>{excellentReview}</p>
            <p className='flex gap-2 items-center px-3 py-1 rounded-sm text-sm'><ThumbsDown size={15}/>{PoorReview}</p>
            <p className='flex gap-2 items-center px-3 py-1 rounded-sm text-sm'><Meh size={15}/>{AverageReview}</p>
        </div>
        {/* price  | Add to Cart*/}
        <div className='flex justify-between mt-5 w-full items-center'>
            <p className='text-base'>₹{price}</p>
            {(cartItem||{}).hasOwnProperty(ID) ? <button className='flex bg-[var(--text)] text-[var(--bg)] text-sm py-1.5 px-3 rounded-sm items-center gap-2'>
               <Minus size={18} className='cursor-pointer hover:scale-120 transition-transform duration-300' onClick={()=>addItem(ID,MedicineName,imageUrl,price,-1,cartItem,setCartItem,stock)} />
               {cartItem[ID][3]}
               <Plus size={18} className='cursor-pointer hover:scale-120 transition-transform duration-300' onClick={()=>addItem(ID,MedicineName,imageUrl,price,1,cartItem,setCartItem,stock)} />
            </button> : <button className='cursor-pointer hover:scale-120 transition-all duration-300 bg-[var(--button)] px-5 py-1.5 rounded-sm text-white flex gap-2 items-center text-sm' 
              onClick={()=>addItem(ID,MedicineName,imageUrl,price,1,cartItem,setCartItem,stock)}>
              <ShoppingCart size={17}/>
              <span>Add</span>
            </button>}
        </div>

        {stock>0 && stock<5 && <p className='absolute top-2 right-2 bg-[var(--text)] px-5 py-1 text-xs text-[var(--bg)] rounded-sm dark:bg-red-500 dark:text-white flex gap-2'><TrendingUp size={14}/>{stock} left in stock </p>}
        {stock==0 && <p className='absolute top-0 right-0 bg-red-600/50 px-5 py-1 text-xs text-[var(--text)] text-2xl w-full h-full flex items-center justify-center gap-3'><CircleX/>Out of Stock</p>}
        
  </motion.div>
}

const MedicineInfoTab = ({title,number,activeTab,setActiveTab})=>{
  return <p className={`cursor-pointer active:scale-90 transition-all duration-100 text-xs py-2 rounded w-full flex justify-center gap-2 ${number==activeTab ? "bg-[var(--card)]":""}`} onClick={()=>setActiveTab(number)}>
    {title}
  </p>
}
const MedicineInfo = ({setShowMedicineInfo,value,cartItem,setCartItem})=>{
  const [activeTab,setActiveTab] = useState(0)
  
  return <section className='z-[1000] fixed pt-10 top-0 left-0 h-full w-full backdrop-blur-xs flex justify-center items-center'>
    <div className='absolute top-0 left-0 w-full h-full bg-white/20' onClick={()=>setShowMedicineInfo(false)} ></div>
    <article className='relative mt-[60px] w-6xl grid grid-cols-[auto_1fr] gap-10 bg-[var(--card)] shadow-lg shadow-white/10 rounded-sm px-10 py-5'>
      <div className='bg-[var(--bg)] h-full px-10 rounded-sm flex items-center '>
        <img src={value["Image URL"]} alt=""  className='rounded-sm h-60 w-100' />
      </div>
      <div className='w-full flex flex-col px-5 py-5'>
        <div className="flex justify-between mb-5">
        <p className='flex gap-4 items-center text-3xl'><Pill/>{value["Medicine Name"]}</p>
        <p className='flex items-center gap-2 bg-[var(--text)] text-[var(--bg)] px-5 rounded-sm text-xs py-1'><Box size={16} />{value["instock"]}</p>
        </div>
        {/* Manufacturer && right side; positive negative neutral */}
        <div className='flex justify-between items-center'>
          <p className='flex items-center gap-2 text-xs mt-3'><Factory size={15} />{value["Manufacturer"]}</p>
          <div className='flex items-center gap-10'>
            <p className='flex items-center gap-2 text-sm'><Smile size={18} />{value["Excellent Review %"]}</p>
            <p className='flex items-center gap-2 text-sm'><Frown size={18} />{value["Average Review %"]}</p>
            <p className='flex items-center gap-2 text-sm'><Meh size={18} />{value["Poor Review %"]}</p>
          </div>
        </div>
        {/* composition and uses and side effects on right */}
        <div className='mt-7 w-full'>
          {/* tabs */}
          <div className='flex gap-10 bg-[var(--bg)] px-5 py-2 rounded w-full'>
              <MedicineInfoTab title="Composition" number={0} activeTab={activeTab} setActiveTab={setActiveTab} />
              <MedicineInfoTab title="Uses" number={1} activeTab={activeTab} setActiveTab={setActiveTab} />
              <MedicineInfoTab title="Side Effects" number={2} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {activeTab==0 && <p className='text-xs mt-5'>
            {value["Composition"]}
          </p>}
          {activeTab==1 && <p className='text-xs mt-5'>
            {value["Uses"]}
          </p>}
          {activeTab==2 && <p className='text-xs mt-5'>
            {value["Side_effects"]}
          </p>}
        </div>
        {/* add to cart here && right side price will be shown */}
        <div className='flex justify-between mt-10'>
            {(cartItem||{}).hasOwnProperty(value["ID"]) ? <button className='flex bg-[var(--text)] text-[var(--bg)] text-sm py-1.5 px-3 rounded-sm items-center gap-2'>
               <Minus size={18} className='cursor-pointer hover:scale-120 transition-transform duration-300' onClick={()=>addItem(value["ID"],value["Medicine Name"],value["Image URL"],value["price"],-1,cartItem,setCartItem)} />
               {cartItem[value["ID"]][3]}
               <Plus size={18} className='cursor-pointer hover:scale-120 transition-transform duration-300' onClick={()=>addItem(value["ID"],value["Medicine Name"],value["Image URL"],value["price"],1,cartItem,setCartItem,value["instock"])} />
            </button> : <button className='cursor-pointer hover:scale-120 transition-all duration-300 bg-[var(--button)] px-5 py-1.5 rounded-sm text-white flex gap-2 items-center text-sm' 
              onClick={()=>{addItem(value["ID"],value["Medicine Name"],value["Image URL"],value["price"],1,cartItem,setCartItem)}}>
              <ShoppingCart size={17}/>
              <span>Add</span>
            </button>}
            <button className='px-5 py-2 rounded bg-[var(--bg)]'>₹{value["price"]}</button>
        </div>
      </div>
    </article>
  </section>
}

const Medicines = ({ cartItem,setCartItem}) => {
    const [medicineList,setMedicineList] = useState([]);
    // this was for other edataset Average Review %,Composition,Excellent Review %,Image URL,Manufacturer,Medicine Name,Poor Review %,Side_effects,Uses
    // for 1mg dataset === Name,pack_size,rating_count,rating,price,mrp
    useEffect(() => {
      console.log("came here")
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/pharmacy/random-rows`).then(data=>data.json()).then(data=>{
        console.log("came here")
        setMedicineList(data)
      })
    }, [])
    
    const [medicineSearching,setMedicineSearching] = useState([]);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("search_q");
    useEffect(() => {
      // if input is empty, clear results immediately
      if (!query) {
        setMedicineSearching([]);
        return;
      }
    
      // optional: debounce (avoid too many requests while typing)
      const timeoutId = setTimeout(() => {
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/pharmacy/search?q=${query}`)
          .then((res) => res.json())
          .then((data) => {
            setMedicineSearching(data);
            console.log("Fetched:", data);
          })
          .catch((err) => console.error("Error fetching:", err));
      }, 300); // waits 300ms before fetching
    
      // cleanup to prevent race conditions
      return () => clearTimeout(timeoutId);
    }, [query]);

    const [showMedicineInfo,setShowMedicineInfo] = useState(null)
  return (
    <section className='grid grid-cols-5 px-10 py-10 gap-10 relative'>
      {/* search toal count result p */}
      {medicineSearching.length>0 && <p className='col-span-5 text-xs'>Showing {medicineSearching.length} result</p>}
      {showMedicineInfo && <MedicineInfo setShowMedicineInfo={setShowMedicineInfo} value={showMedicineInfo} cartItem={cartItem} setCartItem={setCartItem} />}
      {/* showing home page of shuffuled medicine */}
      {(medicineSearching.length==0 ? medicineList : medicineSearching).map((value,index)=>
        <div key={index} className=' rounded-sm'  >
          <MedicineItem 
            onClick={()=>setShowMedicineInfo(value)}
            index={index}
            ID={value["ID"]}
            imageUrl={value["Image URL"]}
            MedicineName={value["Medicine Name"]} 
            excellentReview={value["Excellent Review %"]}
            PoorReview={value["Poor Review %"]}
            AverageReview={value["Average Review %"]} 
            price={value["price"]}
            cartItem={cartItem}
            setCartItem={setCartItem}
            stock={value["instock"]}
          />
        </div>
      )}

    </section>
  )
}

export default Medicines
