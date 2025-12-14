import { ChevronLeft, Locate, MapPin, Moon, PiggyBank, Search, ShoppingBasket, ShoppingCart, Trash, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {motion} from "framer-motion"
import { ToggleDarkMode } from '../BackendFunctions'

const NavbarLinks = ({title,toPath,isCurrent})=>{
    return <motion.div initial={{opacity:0,y:"-100px"}} animate={{opacity:1,y:0}} transition={{duration:.5}} className='active:scale-90 transition-transform duration-100 hover:scale-95'>
      <Link to={toPath} className={`uppercase text-base px-3 pb-[1px] border-b-2  ${isCurrent ? "text-[var(--button)] border-[var(--button)]":"border-transparent hover:scale-95"}`}>{title}</Link>
    </motion.div>
}
const Navbar = ({currentIndex,cartItem,setCartItem})=>{
  const navigate = useNavigate()
  function CountTotalCost(){
    let cost = 0;
    Object.keys(cartItem || {}).map((value)=>(cost+=(cartItem[value][2]*cartItem[value][3])))
    return cost.toFixed(2)
  }
  const [totalCost,setTotalCost] = useState(0)
  useEffect(() => {
    const total = CountTotalCost()
    setTotalCost(total)
  }, [cartItem])

  const [showCart,SetShowCart] = useState(false);
  
    return <section className='flex items-center pt-5 justify-between px-5'>
      
        <motion.div onClick={()=>navigate("/")} initial={{x:"-100%",opacity:0}} animate={{x:0,opacity:1}} transition={{duration:.5}} className='cursor-pointer active:scale-90 transition-transform duration-200 flex gap-5'>
          <h1 className={`text-2xl text-[var(--text)] ml-5 flex gap-2 items-center`}>
        <img src="/icon.png" alt="" className='h-10 w-max' />
        CurEase
        </h1>
        <Link to="/" className='flex gap-1 cursor-pointer hover:text-[var(--button)] items-center text-sm'><ChevronLeft size={15}/>Go Back</Link>
        </motion.div>
        {/* links */}
        <div className='flex gap-10'>
            <NavbarLinks isCurrent={currentIndex==0} title="Home" toPath="/pharmacy" />
            <NavbarLinks isCurrent={currentIndex==1} title="Medicines" toPath="/pharmacy/medicines" />
            <NavbarLinks isCurrent={currentIndex==2} title="Consult Doctors" toPath="/pharmacy/consult-doctors" />
            {/* <NavbarLinks isCurrent={currentIndex==3} title="Lab Tests" toPath="/pharmacy/lab-tests" /> */}
        </div>
        <div className='flex items-center gap-5'>
            <div className='relative'>
              <button className={`bg-[var(--bg)] p-2 rounded-sm cursor-pointer hover:bg-[var(--button)] hover:text-[var(--bg)] transition-all duration-400 group relative ${showCart && "z-[2000] outline-2 outline-[var(--text)]"} `} onClick={()=>SetShowCart(prev=>!prev)}>
                <ShoppingCart size={20} className=''/>
                {/* show cart name on hover */}
                <p className='absolute top-[130%] bg-[var(--text)] scale-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap text-[var(--bg)] left-1/2 -translate-x-1/2 pointer-events-none text-xs px-3 py-1 rounded-sm'>Your Cart</p>
              </button>
              {/* cart item count */}
              <div className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-[var(--button)] text-[var(--bg)] w-5 h-5 flex items-center justify-center text-xs rounded-full ${showCart && "z-[2000] outline-2 outline-[var(--text)]"}`}>
                {Object.keys(cartItem || {}).length}
              </div>
              {/* the cart card is here */}
              <div className={`z-[2000] absolute top-[150%] right-0 px-10 py-10 bg-[var(--card)] shadow-xl border rounded-sm flex flex-col transition-all duration-300 ${showCart?"translate-y-0 opacity-100":"translate-y-[-50%] opacity-0 pointer-events-none"}`}>
                <h1 className={`flex items-center text-xl whitespace-nowrap gap-5 mb-5`}><ShoppingBasket/>Your Cart</h1>
                {Object.keys(cartItem || {}).length==0 && <div>
                  <img src="/empty.gif" alt="empty gif" className='h-40 w-120' />
                  <p className='text-sm whitespace-nowrap px-5 py-3'>Your Basket is Empty</p>
                </div>}
                {Object.keys(cartItem || {}).map((value,index)=>(
                  // [id]:[title,image,price,newQuantity]
                  <div key={index} className='grid grid-cols-[auto_1fr_auto] rounded-sm transition-bg duration-400 gap-x-5 min-w-[50vw] w-full py-3 px-5 hover:bg-[var(--bg)]'>
                    <div className='bg-[var(--bg)] flex items-center justify-center h-full row-span-2 col-1 row-1 flex-shrink-0'>
                      <img src={cartItem[value][1]} alt={cartItem[value][1]} className='h-15 w-20 ' />
                    </div>
                    <p className='col-2 row-1'>{cartItem[value][0]}</p>
                    <div className='col-2 row-2 flex justify-between mt-2 gap-5'>
                      <div className='flex items-center border-b-1 px-3 '>
                        <span className='self-center text-xs'>Quantity</span>
                        <select className='outline-none cursor-pointer px-3 bg-[var(--card)]' value={cartItem[value][3]} onChange={(e) => setCartItem(prev=>({...prev,[value]:[cartItem[value][0],cartItem[value][1],cartItem[value][2],Number(e.target.value)]}))}>
                          {Array.from({ length: 10 }, (_, i) => (
                            <option className='outline-none border-none' key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className='flex flex-col'>
                        <span className='text-xs'>₹{cartItem[value][2]}</span>
                        <span className='text-base'>₹{(cartItem[value][2]*cartItem[value][3]).toFixed(2)}</span>
                      </p>
                    </div>
                    <button className='bg-transparent hover:bg-red-600 transition-bg duration-300 cursor-pointer text-red-500 hover:text-white dark:text-white col-3 row-1 row-span-2 px-5 rounded-sm' onClick={()=>{
                      setCartItem((prev) => {
                        // Create a shallow copy
                        const updated = { ...prev };
                        delete updated[value]; // remove the id
                        return updated; // return the new object
                      });
                    }}>
                      <Trash />
                    </button>
                  </div>
                ))}
                {Object.keys(cartItem || {}).length>0 && <div className='flex gap-5  mt-5'>
                  <p className='flex flex-col'>
                    <span className='text-xs'>Total</span>
                    <span className='text-base'>₹{totalCost}</span>
                  </p>
                  <Link to="/pharmacy/complete-payment" onClick={()=>SetShowCart(false)} className='bg-green-500 rounded-xs text-white hover:bg-green-600 cursor-pointer py-2 ml-auto px-10 flex items-center gap-2 w-max'>
                    <PiggyBank size={20}/>
                    Proceed to Buy
                  </Link>  
                </div>}
              </div>
              {showCart && <div className="z-[1000] w-screen h-screen fixed top-0 left-0 backdrop-blur-xs" onClick={()=>SetShowCart(false)}></div>}
            </div>
            <button className='bg-[var(--bg)] p-2 group rounded-sm cursor-pointer relative hover:bg-[var(--text)] hover:text-[var(--bg)] transition-bg duration-300 ' onClick={()=>ToggleDarkMode(true)}>
              <Moon size={20} />
              <p className='absolute top-[130%] bg-[var(--text)] scale-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 whitespace-nowrap text-[var(--bg)] left-1/2 -translate-x-1/2 pointer-events-none text-xs px-3 py-1 rounded-sm'>Toggle Theme</p>
            </button>
            <button className='text-xs self-center'>Need Help?</button>
        </div>
    </section>
}

const BottomBar = ({showQuickUpload})=>{
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText,setSearchText] = useState(searchParams.get("search_q")??"")
  const navigate = useNavigate()
  const location = useLocation()
  function OnChangeData(data){
    setSearchText(data);
    if(data==""){
      setSearchParams({});
      return;
    }
    if (!location.pathname.includes("/medicines")) {
      navigate(`/pharmacy/medicines?search_q=${data}`);
    }else{
      setSearchParams({ search_q: data });
    }
  }
    return <section className='grid grid-cols-[auto_1fr_auto] px-10 py-5 items-center justify-between gap-5'>
        {/* location */}
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  className='flex gap-3 py-2 px-5 items-center rounded-sm bg-[var(--bg)]'>
            <MapPin size={18}/>
            <p className='pr-10 text-sm'>Gurgoan</p>
            <Locate size={18} className='text-gray-500'/>
        </motion.div>
        {/* search */}
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}}  className='flex gap-3 py-2 px-5 items-center rounded-sm bg-[var(--bg)] w-[80%]'>
            {searchText.length>0 && <X size={20} className='cursor-pointer' onClick={()=>OnChangeData("")}/>}
            <input value={searchText} onChange={e=>OnChangeData(e.target.value)} type="text" placeholder='Search for Medicines and Health Products' className='w-full outline-none' />
            <Search/>
        </motion.div>
        {/* right side quick buy with image */}
        {showQuickUpload ? <div className='flex gap-5 items-center'>
            <p className='text-sm font-light'>Buy with prescription image!</p>
            <Link to="/pharmacy/medicines/upload" className='bg-[var(--button)] text-white px-5 py-1 rounded-sm'>Quick Order</Link>
        </div>: <div className='flex gap-5 items-center'>
          <p className='text-sm font-light'>Browse all medicines</p>
            <Link to="/pharmacy/medicines" className='bg-[var(--button)] text-white px-5 py-1 rounded-sm'>Browse All</Link>
          </div>}
    </section>
}

const Header = ({ cartItem,setCartItem}) => {
  const location = useLocation()
  const [currentIndex,setCurrentIndex] = useState(0)
  const [showBottomBar,setShowBottomBar] = useState(true);
  const [showQuickUpload,setShowQuickUpload] = useState(true)
  useEffect(() => {
    // checking condition for showing bottom bar or not
    if(location.pathname=="/pharmacy" || location.pathname.includes("/pharmacy/medicine")){
      setShowBottomBar(true)
    }else{
      setShowBottomBar(false)
    }
    // set show quick uppload
    if(location.pathname=="/pharmacy/medicines/upload"){
      setShowQuickUpload(false)
    }else{
      setShowQuickUpload(true)
    }
    // checking the pathname and setting the navlink
    if(location.pathname.includes("/pharmacy/medicines")){
      setCurrentIndex(1)
    }else if(location.pathname.includes("/pharmacy/consult-doctors")){
      setCurrentIndex(2)
    }else if(location.pathname=="/pharmacy/lab-tests"){
      setCurrentIndex(3)
    }else{
      setCurrentIndex(0)
    }
  }, [location])
  
  return (
    <header className={`border-b-1 border-gray-400 sticky top-0 z-200 transition-bg duration-400 bg-[var(--card)] ${!showBottomBar && "pb-2"}`}>
        {/* top navbar */}
        <Navbar currentIndex={currentIndex} cartItem={cartItem} setCartItem={setCartItem} />
        {/* bottom bar */}
        {showBottomBar && <BottomBar showQuickUpload={showQuickUpload} />}
    </header>
  )
}

export default Header
