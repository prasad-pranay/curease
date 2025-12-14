import React, { useEffect, useState } from 'react'
import {motion, AnimatePresence} from "framer-motion"
import { Calendar, ShoppingBasket, Smile, SquareStar, Star, HelpCircle,Diamond,Clock,MapPin,Map,User,FileDigit,Phone } from 'lucide-react'
import Stack from "../component/Stack"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function statusOrders(status,id,setOrders){
  fetch(`${import.meta.env.VITE_BACKEND_API_URL}/pharmacy/status-orders`,{
    method:"POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
      id: id,
      status: status,
     })
  }).then(data=>data.json()).then(data=>{
    setOrders(data)
  })
}

const OrderStatusValue = {
  0: "Order Placed",
  1: "Shipped",
  2:"Out for Delivery",
  3:"Delivered"
}

const OrderItemOrderStatus=({title,completed})=>{
  return <div className='flex flex-col items-center text-xs whitespace-nowrap gap-3 relative group'>
    <span className={`h-5 w-5 border-2 group-hover:scale-110 transition-transform duration-200 ${completed?"border-teal-500 bg-teal-500":"border-[var(--text)]"} rounded-full`}></span>
    <span className={`absolute top-[130%] left-1/2 uppercase text-[9px] tracking-wide -translate-x-1/2  ${completed?"text-teal-500 font-bold":"font-semibold"}`}>{title}</span>
  </div>
}
const OrderItemOrderStatusSeperator=({completed})=>{
  return <span className={`border-t-1 w-full ${completed&&"border-teal-500"}`}></span>
}

const OrderItem=({num,listImg,value,setOrders,orderId})=>{
  const [rating,setrating] = useState(value['rating'])

  return <motion.div 
  key={num}
  initial={{scale:0,opacity:0}}
  animate={{scale:1,opacity:1}}
  className={`border  hover:bg-[var(--bg)] border-[var(--button)] dark:border-blue-800/10 dark:backdrop-blur-sm dark:bg-blue-900/10 transition-bg duration-300 cursor-pointer realtive px-10 py-5 rounded-xs`}>
      {/* top bar showing before opening */}
      <div>
        {/* top level */}
        <div className='flex gap-10 mb-3 items-center' >
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
            <p className='text-xs justify-self-start px-5 py-1.5 rounded-md text-teal-500 font-semibold border border-dashed border-teal-500'>{OrderStatusValue[value["status"]]}</p>
            <p className='text-sm mt-3'>₹ {value.total}</p>
          </div>
        </div>
        {/* status of order */}
        <div className='flex items-center gap-5 flex-shrink-0 mt-10 pb-5 px-10'>
          <div onClick={()=>statusOrders(0,orderId,setOrders)}><OrderItemOrderStatus title="Order Placed" completed={value["status"]>=0} /></div>
          <OrderItemOrderStatusSeperator completed={value["status"]>=0} />
          <div onClick={()=>statusOrders(1,orderId,setOrders)}><OrderItemOrderStatus title="Shipped" completed={value["status"]>=1} /></div>
          <OrderItemOrderStatusSeperator completed={value["status"]>=1} />
          <div onClick={()=>statusOrders(2,orderId,setOrders)}><OrderItemOrderStatus title="Out for delivery" completed={value["status"]>=2} /></div>
          <OrderItemOrderStatusSeperator completed={value["status"]>=2} />
          <div onClick={()=>statusOrders(3,orderId,setOrders)}><OrderItemOrderStatus title="Delivered" completed={value["status"]>=3} /></div>
        </div>
      </div>
      {/* medicine and right side address */}
      <motion.div 
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
            <div key={index} className='flex gap-2 items-center'>
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
              <h1 className='basis-full mb-2 text-xs font-semibold flex gap-2 items-center'><Smile size={14}/>Order Rating by User</h1>
              {[1,2,3,4,5].map((val)=>(
                <Star key={val} size={18} className={`${rating>=val && "fill-yellow-500 stroke-yellow-500"} hover:scale-110`} />
              ))}
            </div>
           
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
      </motion.div>
  </motion.div>
}




const Orders = () => {
  const [orders,setOrders] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/pharmacy/get-orders`).then(data=>data.json()).then(data=>{
      setOrders(data)
    })
  }, [])
  
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="bg-white/80 dark:bg-indigo-800/10 p-10 pr-5 rounded-sm h-[70vh] w-6xl flex flex-col justify-center"
    >

      <div className='rounded-tl-xs rounded-bl-xs pr-5 flex flex-col w-full overflow-y-auto patient-scrollbar justify-start gap-10'>
    {orders.length == 0 ? <div className='flex flex-col items-center justify-center w-full h-full'>
      <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} src="/noOrders.png" alt="" className='h-40' />
      <motion.h1 initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className='text-2xl mt-5'>There are no Orders placed till now</motion.h1>  
    </div> : <>
        {orders.reverse().map((value,index)=>{
          var listImg = Object.keys(value["medicine"]).map(medicineId=>({id:value["medicine"][medicineId].name,img:value["medicine"][medicineId].img,"price":value["medicine"][medicineId].price,quantity:value["medicine"][medicineId].quantity}))
          return <OrderItem setOrders={setOrders} orderId={value._id} key={index} num={index} listImg={listImg} value={value} />
        })}
    </>}
  </div>
        
    </motion.section>
  )
}

export default Orders
