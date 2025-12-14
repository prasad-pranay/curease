import { Calendar, CircleStar, Clock, Diamond, Download, FileDigit, FileText, FolderKanban, HelpCircle, Hospital, MapIcon, MapPin, Phone, ScrollText, Search, ShoppingBasket, Smile, SquareStar, Star, User } from 'lucide-react'
import React, { useState } from 'react'
import Stack from '../component/Stack';
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import toast from 'react-hot-toast';

const OrderItemOrderStatus=({title,completed})=>{
  return <div className='flex flex-col items-center text-xs whitespace-nowrap gap-3 relative group'>
    <span className={`h-5 w-5 border-2 group-hover:scale-110 transition-transform duration-200 ${completed?"border-teal-500 bg-teal-500":"border-[var(--text)]"} rounded-full`}></span>
    <span className={`absolute top-[130%] left-1/2 uppercase text-[9px] tracking-wide -translate-x-1/2  ${completed?"text-teal-500 font-bold":"font-semibold"}`}>{title}</span>
  </div>
}
const OrderItemOrderStatusSeperator=({completed})=>{
  return <span className={`border-t-1 w-full ${completed&&"border-teal-500"}`}></span>
}

function rateOrder(rating,id){
  fetch(`${import.meta.env.VITE_BACKEND_API_URL}/pharmacy/rate-order`,{
    method:"POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
      id: id, 
      rating: rating,
     }),
  })
}

const OrderStatus = {
  0:"Placed",
  1:"Verfied",
  2:"Shipped",
  3:"Out for Delivery",
  4:"Delivered",
}

const OrderItem=({num,listImg,value})=>{
  const [open,setOpen] = useState(false)
  const [rating,setrating] = useState(value['rating'])

  return <motion.div 
  key={num}
  initial={{scale:0,opacity:0}}
  animate={{scale:1,opacity:1}}
  className={`border  hover:bg-[var(--bg)] ${open?"border-[var(--button)]":"border-[var(--border)]"} transition-bg duration-300 cursor-pointer realtive px-10 py-5 rounded-xs`}>
      {/* top bar showing before opening */}
      <div onClick={()=>setOpen(prev=>!prev)}>
        {/* top level */}
        <div className='flex gap-10 mb-3 items-center' onClick={()=>console.log(value)}>
          {/* images div */}
          <div className='w-30 h-20'>
            <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardClass='h-20 w-full'
            cardsData={listImg}
          />
          </div>
          {/* title and below date and items count */}
          <div className='w-full'>
            <div className='' onClick={()=>console.log(items)}>
                <Select value={listImg[0]['id']} >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ordered Items</SelectLabel>
                      {listImg.map((val,index)=>(
                        <SelectItem key={index} value={val.id}>{val.id}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
            </div>
            <div className='flex gap-5 items-center mt-3'>
              <p className='text-xs flex items-center gap-2'><ShoppingBasket size={14}/>{listImg.length} Items</p>
              <p>•</p>
              <p className='text-xs flex items-center gap-2'><Calendar size={14}/> {value.date}</p>
            </div>
          </div>
          {/* right most side where price  and order sttaatus */}
          <div className='flex flex-col items-end h-20 justify-evenly'>
            <p className='text-xs justify-self-start px-5 py-1.5 rounded-md text-teal-500 font-semibold border border-dashed border-teal-500'>Delivered</p>
            <p className='text-sm mt-3'>₹ {value.total}</p>
          </div>
        </div>
        {/* status of order */}
        <div className='flex items-center gap-5 flex-shrink-0 mt-10 pb-5 px-10'>
          <OrderItemOrderStatus title="Order Placed" completed={value["status"]>=0} />
          <OrderItemOrderStatusSeperator completed={value["status"]>=0} />
          <OrderItemOrderStatus title="Shipped" completed={value["status"]>=1} />
          <OrderItemOrderStatusSeperator completed={value["status"]>=1} />
          <OrderItemOrderStatus title="Out for delivery" completed={value["status"]>=2} />
          <OrderItemOrderStatusSeperator completed={value["status"]>=2} />
          <OrderItemOrderStatus title="Delivered" completed={value["status"]>=3} />
        </div>
      </div>
      {/* medicine and right side address */}
      <AnimatePresence>
        {open && <motion.div 
            key="box"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={`mt-10 grid grid-cols-[1fr_.5fr] gap-20 `} >
        {/* medicine list &&&& rating button and help button*/}
        <div className='w-full'>
          <h1 className='flex gap-2 items-center mb-2 text-xs font-semibold'><SquareStar size={14}/>Ordered Items</h1>
          {listImg.map((val,index)=>(
            <div className='flex gap-2 items-center'>
              <img src="/noOrders.png" alt="" className='h-10 w-10' />
              <p className='flex flex-col text-xs'>
                <span>{val.quantity} x {val.id}</span> 
                <span>₹{val.quantity*val.price}</span>
              </p>
            </div>
          ))}

          {/* rating button */}
          <div className='flex justify-between w-full'>
            <div className='flex flex-wrap gap-x-3 items-center mt-5'>
              <h1 className='basis-full mb-2 text-xs font-semibold flex gap-2 items-center'><Smile size={14}/>Rate Order</h1>
              {[1,2,3,4,5].map((val)=>(
                <Star key={val} size={18} className={`${rating>=val && "fill-yellow-500 stroke-yellow-500"} hover:scale-110`} onClick={()=>{rateOrder(val,value["_id"]);setrating(val)}} />
              ))}
            </div>
            <button className='flex gap-2 items-center self-end text-sm px-5 py-2 text-white rounded-sm bg-[#e8590c] hover:bg-[#d9480f] cursor-pointer' onClick={()=>toast.error("Can't reach help right now.")}><HelpCircle size={17}/>Help</button>
          </div>
        </div>
        {/* information list and address list */}
        <div className='flex flex-col gap-8'>
          {/* information list */}
          <div>
            <h1 className='text-xs font-semibold mb-2'>Delivery Info</h1>
            <p className='text-xs flex items-center gap-2 mb-1'><Diamond size={14}/><span className='whitespace-nowrap'>Order Id:</span> <span className='hover:underline'>{value._id}</span></p>
            <p className='text-xs flex items-center gap-2'><Clock size={14}/>Order Time: {value.time}</p>
          </div>
          {/* address list */}
          <div>
            <h1 className='text-xs font-semibold mb-2 flex items-center gap-2'><MapPin size={14}/>Delivery Address</h1>
            <p className='text-xs flex items-center gap-2'><User size={14}/>{value["address"]["name"]}</p>
            <p className='text-xs max-w-50 mt-1'>{value["address"]["address"]} <span className='flex gap-2 items-center'><FileDigit size={13}/>{value["address"]["pincode"]}</span></p>
            <p className='text-xs flex items-center gap-2 mt-3'><Phone size={14}/>{value["address"]["mobile"]}</p>
          </div>
        </div>
      </motion.div>}
      </AnimatePresence>
  </motion.div>
}



                                   {/* [
     {
        "_id": "6915e8db66764c2bbb9a1e7d",
        "email": "physicsclasher@gmail.com",
        "date": "13 / 11 / 2025 ",
        "time": "19 : 49",
        "total": 208.95,
        "status": 0,
        "address": {
            "name": "pranay",
            "address": "air force station sohna road",
            "pincode": "123453",
            "mobile": "12341234"
        },
        "payment": {
            "cardNo": "4400052612341234",
            "expiry": "0456",
            "cvv": "754"
        },
        "medicine": {
            "450": {
                "img": "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/3d52d2e7fc0e4ba39cea6b90ce30661f.jpg",
                "name": "Atorva Gold 20 Capsule",
                "price": 173.37,
                "quantity": 1,
                "_id": "6915e8db66764c2bbb9a1e7e"
            },
            "3030": {
                "img": "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/a0f76dfdb04146cfb0ec1f5099800eb6.jpg",
                "name": "Glivec 400mg Tablet",
                "price": 35.58,
                "quantity": 1,
                "_id": "6915e8db66764c2bbb9a1e7f"
            }
        },
        "__v": 0
    }
] */}
const OrdersTab=({orders})=>{
  return <div className='rounded-tl-xs rounded-bl-xs flex flex-col w-full justify-start gap-10'>
    {orders.length == 0 ? <div className='flex flex-col items-center justify-center w-full h-full'>
      <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} src="/noOrders.png" alt="" className='h-40' />
      <motion.h1 initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='text-2xl mt-5'>You haven't placed any order's till now</motion.h1> 
      <motion.p initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='text-sm mt-2'>Start by placing an order</motion.p>
      <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='flex items-center gap-3 text-base mt-8 bg-blue-500 text-white px-15 rounded-sm hover:bg-blue-600 active:scale-90 transition-all duration-100 cursor-pointer py-3'>Shop <ShoppingBasket/></motion.button> 
    </div> : <>
        {orders.map((value,index)=>{
          var listImg = Object.keys(value["medicine"]).map(medicineId=>({id:value["medicine"][medicineId].name,img:value["medicine"][medicineId].img,"price":value["medicine"][medicineId].price,quantity:value["medicine"][medicineId].quantity}))
          return <OrderItem key={index} num={index} listImg={listImg} value={value} />
        })}
    </>}
  </div>
}


// reports item
const ReportItem=({date,department,report})=>{
  const [showReport,setShowReport] = useState(false);
  return <motion.div 
  initial={{scale:0,opacity:0}}
  animate={{scale:1,opacity:1}}
  className='group h-max border rounded-sm border-[var(--border)] cursor-pointer transition-bg duration-300 hover:bg-[var(--bg)] flex flex-col items-center px-10 py-5 gap-5'>
    <img src="/medicalreport.png" alt="" className='h-30 w-max group-hover:scale-110 transition-transform duration-300' />
    <p className='text-xs flex justify-between gap-10'>
      <span className='flex gap-2 items-center capitalize'><Hospital size={14}/>{department}</span>
      <span className='flex gap-2 items-center'><Calendar size={14}/>{date}</span>
    </p>
    <AnimatePresence>
      {showReport && <motion.div initial={{opacity:0,scale:0}} exit={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="fixed w-full h-full top-0 left-0 z-[1000] flex flex-col items-center justify-center">
      <div className="w-full h-full bg-black/20 top-0 left-0 absolute" onClick={()=>setShowReport(false)}></div>
      <img src={`${import.meta.env.VITE_BACKEND_API_URL}/${report}`} alt="" className='h-[80%] w-max relative rounded-sm hover:scale-105 transition-transform duration-300 active:scale-100' />
    </motion.div>}
    </AnimatePresence>
    <div className='flex justify-between w-full'>
      <p className='flex items-center gap-2 text-xs px-5 py-1.5 rounded-sm bg-teal-600 hover:bg-teal-700 transition-transform duration-300 hover:-translate-y-1 text-white'>Text <ScrollText size={14}/></p>
      <p onClick={()=>{setShowReport(true)}} className='flex items-center gap-2 text-xs px-5 py-1.5 rounded-sm bg-[var(--button)] hover:bg-[var(--button-hover)] transition-transform duration-300 hover:-translate-y-1 text-white'>Report <Download size={14}/></p>
    </div>
  </motion.div>
}
// reports here
const ReportsTab=({appointments})=>{
  return <div className='flex gap-10 w-full'>
    {appointments.filter(item => item.status == 2).map((value,index)=>{
                  if(value.status==2)return <ReportItem key={index} date={value.date} department={value.department} report={value.report[0][0]} />
                  // <ReportItem setShowReportImage={setShowReportImage} id={value._id} date={value.date} department={value.department} doctor={value.docName} key={index} val={index} rating={value.rating} report={value.report[0][0]} />
                })}
    {appointments.filter(item => item.status == 2).length==0 && <div className='flex w-full h-full flex-col items-center justify-center'>
        <img src="/nothing.gif" alt="" className='h-50 w-max' />
        <p className='text-2xl'>No Reports till now</p>
    </div>}
  </div>
}

const Manage = ({whichTab,orders,appointments}) => {
  const [currentTab,setCurrentTab] = useState(whichTab)
  return (
    <section className='bg-[var(--bg)] h-full w-full text-[var(--text)] py-10 max-w-screen px-10 overflow-hidden flex justify-center items-center'>
        <section className='w-7xl mx-auto flex justify-center items-center h-full overflow-hidden gap-15'>
            {/* left side */}
            <article className='sticky top-0 h-full bg-[var(--card)] px-10 py-7 rounded-xs flex flex-col'>
              {/* title */}
              <motion.h1 initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className='flex gap-2 text-xl items-center pb-3 text-[var(--button)] border-b-2 border-[var(--button)] mb-5'><FolderKanban size={25}/> Manage</motion.h1>
              {/* <motion.p initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className='flex gap-2 text-xs items-center text-[var(--text)] mb-7'>Easily Manage all your reports and orders here</motion.p> */}
              
              {/* search here */}
              <motion.div initial={{opacity:0,scaleX:0}} animate={{opacity:1,scaleX:1}} className='bg-[var(--bg)] px-5 py-3 gap-5 rounded-sm items-center flex mb-10 mt-5'>
                <Search size={18}/>
                <input type="text" placeholder='Search for here...' className='outline-none text-sm' />
              </motion.div>
              {/* tabs here */}
              <div>
                {/* Orders tab */}
                <motion.div 
                initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}}
                onClick={()=>setCurrentTab(0)} className={`active:scale-90 flex items-center gap-5 text-lg w-full mb-5 py-3 px-5 rounded-sm cursor-pointer group transition-bg duration-300 ${currentTab==0?"text-white bg-[var(--button)] hover:bg-[var(--button-hover)]":"hover:bg-[var(--hover)]"}`}>
                  <CircleStar className='group-hover:scale-110 transition-transform duration-300'/>
                  <span className='whitespace-nowrap text-sm group-hover:scale-110 transition-transform duration-300'>Your Orders</span>
                </motion.div>
                {/* Reports tab */}
                <motion.div 
                initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}}
                onClick={()=>setCurrentTab(1)} className={`active:scale-90 flex items-center gap-5 text-lg w-full mb-5 py-3 px-5 rounded-sm cursor-pointer group transition-bg duration-300 ${currentTab==1?"text-white bg-[var(--button)] hover:bg-[var(--button-hover)]":"hover:bg-[var(--hover)]"}`}>
                  <FileText className='group-hover:scale-110 transition-transform duration-300'/>
                  <span className='whitespace-nowrap text-sm group-hover:scale-110 transition-transform duration-300'>Your Reports</span>
                </motion.div>
              </div>
            </article>
            {/* right side */}
            <article className='bg-[var(--card)] border-b-10 border-[var(--card)] w-full h-full overflow-y-auto patient-scrollbar px-10 py-5 rounded-xs flex'>
              {currentTab==0 && <OrdersTab orders={orders} />}
              {currentTab==1 && <ReportsTab appointments={appointments} />}
            </article>
        </section>
    </section>
  )
}

export default Manage
