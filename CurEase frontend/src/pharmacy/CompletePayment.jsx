import React, { useEffect, useState } from "react";
import { Shield, ShoppingBag, CreditCard, Wallet, FileText, User, Plane, ArrowRightCircle, ShoppingBasket, Trash, Search, Clipboard as ClipboardIcon, Tickets, Check, X, ShoppingCart, Map, Plus, MapPin, Phone, Save, Banknote, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../component/Carousel";
import toast from "react-hot-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CreditCardComponent = () => {
  const [cardData, setCardData] = useState({number: "",name: "",expiry: "",cvc: "",focus: "",});

    const handleInputChange = (e) => {
      setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handleInputFocus = (e) => {
      setCardData({ ...cardData, focus: e.target.name });
    };

    function submit(){
      if(cardData.name==""){
        toast.error("Name cannot be empty")
        return
      }else if(cardData.number==""){
        toast.error("Card Number cannot be empty")
        return
      }else if(cardData.number.length!=16){
        toast.error("Card Number should be exactly 16 digits")
        return
      }else if(cardData.cvc==""){
        toast.error("Cvc cannot be empty")
        return
      }else if(cardData.cvc.length!=3){
        toast.error("Cvc should be of 3 digits")
        return
      }else if(cardData.expiry==""){
        toast.error("Expiry cannot be empty")
        return
      }else{
        toast.success("Card added successfully")
      }
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/patient/add-new-card`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });
      // setCardData({number: "",name: "",expiry: "",cvc: "",focus: "",})
    }

  return (
    <div
      className="flex gap-10 backdrop-blur-xl  p-8 w-full"
      // onClick={() => {
      //   if (cardData.focus == "") {
      //     setCardData({ ...cardData, focus: "cvc" });
      //   } else {
      //     setCardData({ ...cardData, focus: "" });
      //   }
      // }}
    >
      {/* Card Preview */}
      <Cards
        number={cardData.number}
        name={cardData.name}
        expiry={cardData.expiry}
        cvc={cardData.cvc}
        focused={cardData.focus}
      />

      {/* Input Fields */}
      <form className="space-y-4" onSubmit={e=>{e.preventDefault()}}>
          <input
          type="tel"
          name="number"
          placeholder="Card Number"
          value={cardData.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full px-4 py-3 rounded-lg dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
          />
          
          <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={cardData.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full px-4 py-3 rounded-lg dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
          />
          
          <div className="flex gap-4">
          <input
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={cardData.expiry}
          onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-1/2 px-4 py-3 rounded-lg dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
              />
              
              <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={cardData.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-1/2 px-4 py-3 rounded-lg dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 border border-gray-700 focus:border-cyan-400 focus:outline-none transition"
              />
              </div>
              
              <button
              onClick={submit}
              type="button"
              className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-medium tracking-wide transition-all shadow-md"
              >
              Submit Payment
              </button>
              </form>
    </div>
  );
};

const OnlyCard = ({ number, name, expiry, cvc })=>{
  return <div>
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={""}
      />
  </div>
}

const ALLCOUPONS = ["FLAT20","LUCKY","HEALTH15","BUY2GET1","FIRST150"]
function getCouponPrice(coupon,price){
  switch (coupon) {
    case "FLAT20":
      return price * (1-0.2)
    case "HEALTH15":
      return price * (1-0.15)
    case "FIRST150": 
      return price - 150
    default:
      return price;
  }
}
const Page1=({currentAddress,setCurrentAddress,cartItem,setCartItem,coupon,setCoupon,totalCost,address,setWhichPage})=>{
  const [search,setSearch] = useState(coupon)
  const [showAddAddress,setShowAddAddress] = useState(false)
  const [newAddressData,setNewAddressData] = useState({
    "name":"",
    "address":"",
    "pincode":"",
    "mobile":""
  })
  return <div className=" font-['Josefin_Sans'] text-[var(--text)] bg-[var(--bg)] leading-relaxed">

      {/* top section */}
      <section className="grid grid-cols-[1fr_.6fr] px-20 py-20">
        {/* LEFT SIDE  ITEMS  */}
        <article>
          <div className="flex justify-between w-full">
            <p className="flex items-center gap-5 text-3xl mb-10"> <ShoppingBasket size={35}/> Items</p>
            <div className="flex gap-5 bg-[var(--card)] h-max px-10 py-3 rounded-sm">
              <span className="flex items-center gap-2"><ShoppingCart size={18}/> TOTAL :</span>
              <p className="flex items-center">{search && <span className="text-xs mr-5 line-through">₹{totalCost}</span>}₹{getCouponPrice(search,totalCost)}</p>
            </div>
          </div>

          {Object.keys(cartItem || {}).map((value,index)=>(
                  // [id]:[title,image,price,newQuantity]
                  <div key={index} className='grid grid-cols-[auto_1fr_auto] rounded-sm transition-all duration-400 gap-x-5 w-full py-3 px-5 bg-[var(--card)] mb-5 hover:bg-[var(--card)] hover:-translate-y-1'>
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
                    <button className='bg-transparent text-red-500 dark:text-white hover:bg-red-500 hover:text-white transition-bg duration-300 cursor-pointer col-3 row-1 row-span-2 px-5 rounded-sm' onClick={()=>{
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

          {Object.keys(cartItem || {}).length==0 && <div className="">
                <img src="/empty.gif" alt="" className="rounded h-50 w-max" />
                <p className="text-xl mt-5">Empty Cart</p>
                <p className="text-xs mt-2 mb-10">There is nothing in your cart</p>
                <button className="hover:scale-110 active:scale-100 transition-transform duration-100">
                  <Link to="/pharmacy/medicines" className="bg-[var(--button)] px-20 py-3 rounded-sm mt-10 cursor-pointer ">Browse</Link>
                </button>
          </div>}
        </article>
        {/* RIGHT SIDE: ADDRESS THEN COUPONS */}
        <article className={`gap-10 flex-col items-end ${Object.keys(cartItem || {}).length==0 ? "hidden opacity-0":"flex"}`}>
            {/* coupons */}
            <div className="flex flex-col bg-[var(--card)] px-10 py-5 rounded-sm">
                <p className="text-xl flex items-center gap-5 mb-5"><Tickets/>Coupons</p>
                <div className={`flex ${coupon==""?" bg-[var(--bg)]":"bg-teal-300 dark:bg-teal-700"} px-5 py-2 rounded-sm`}>
                  <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Enter Coupon Here" className="uppercase text-sm outline-none w-full"/>
                  {search=="" ? <ClipboardIcon onClick={async ()=>{
                    const clipboardText = await navigator.clipboard.readText();
                    setSearch(clipboardText);
                  }} size={18} className="cursor-pointer hover:scale-120 transition-transform duration-100 active:scale-100"/>:
                  coupon=="" ? <Check onClick={()=>{
                    if(ALLCOUPONS.includes(search.toUpperCase())){
                      toast.success(`Coupon "${search.toUpperCase()}" applied successfully!`)
                      setCoupon(search)
                    }else{
                      toast.error("Coupon does not exist")
                    }
                  }} size={18} className="cursor-pointer hover:scale-120 transition-transform duration-100 active:scale-100" />:
                   <X onClick={()=>{toast.error("Coupon Removed"),setCoupon(""),setSearch("")}} size={18} className="cursor-pointer hover:scale-120 transition-transform duration-100 active:scale-100" />
                  }
                </div>
                {coupon=="" && <p className="text-xs mt-5 text-[var(--button)] z-[1000]">Coupons for you</p>}
                <div className={` h-58 -mt-12 ${coupon!="" && "hidden"}`}>
                  <div className="scale-y-70">
                  <Carousel baseWidth={300} />
                </div>
                </div>
            </div>
            {/* address */}
            <div className="px-10 py-5 bg-[var(--card)] rounded flex flex-col">
              {/* top bar */}
              <div className="flex mb-5">
                <p className="text-xl flex items-center gap-5 mr-20"><Map/>Address</p>
                <button onClick={()=>setShowAddAddress(true)} className=" flex gap-2 px-5 py-1.5 rounded-sm text-xs active:scale-100 transition-all font-bold duration-200 cursor-pointer text-red-400 hover:bg-red-400 hover:text-white">Add <Plus size={18} /></button>
              </div>

              {showAddAddress && <form onSubmit={e=>{
                e.preventDefault()
                if(newAddressData.name==""){
                  toast.error("Name not provided")
                  return
                }else if(newAddressData.mobile==""){
                  toast.error("Mobile Number not provided")
                  return
                }else if(newAddressData.address==""){
                  toast.error("Address not provided")
                  return
                }else if(newAddressData.pincode==""){
                  toast.error("Pincode not provided")
                  return
                }
                toast.success("Address added successfully")
                setShowAddAddress(false)
                setNewAddressData({"name":"","address":"","pincode":"","mobile":""})
                fetch(`${import.meta.env.VITE_BACKEND_API_URL}/patient/add-address?name=${newAddressData.name}&mobile=${newAddressData.mobile}&address=${newAddressData.address}&pincode=${newAddressData.pincode}`,{
                  method: "GET",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
              }} className="" >
                <Label className="mb-2">Enter Reciever Name</Label>
                <Input className="capitalize" placeholder="Reciever Name" value={newAddressData.name} onChange={e=>setNewAddressData({...newAddressData,"name":e.target.value})} />
                <Label className="mt-5 mb-2">Enter Pin Code</Label>
                  <InputOTP maxLength={6} value={newAddressData.pincode} onChange={e=>setNewAddressData({...newAddressData,"pincode":e})} >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <Label className="mt-5 mb-2" htmlFor="add-full-address" >Full Address here</Label>
                  <Textarea className="capitalize" placeholder="Enter Full Address" id="add-full-address" value={newAddressData.address} onChange={e=>setNewAddressData({...newAddressData,"address":e.target.value})} />
                  <Label className="mt-5 mb-2" htmlFor="add-full-address">Reciever Phone Number</Label>
                  <Input className="capitalize" placeholder="Enter Reciever Mobile" value={newAddressData.mobile} onChange={e=>setNewAddressData({...newAddressData,"mobile":e.target.value})} />
                  <button className="bg-[var(--button)] w-full py-2 text-sm mt-4 transition-transform duration-300 hover:scale-110 active:scale-90 rounded-xs cursor-pointer">Add Address</button>
                </form>}

              {!showAddAddress && <article>
                {address.map((value,index)=>{
                  return <div onClick={()=>setCurrentAddress(index)} key={index} className={`${currentAddress==index ? "bg-[var(--bg)] dark:bg-teal-900" : "bg-[var(--bg)] hover:bg-[var(--bg)]/80"}   cursor-pointer px-5 py-3 rounded-sm`}>
                    <p className="text-xl capitalize flex items-center justify-between"><span className="flex items-center gap-2"><User/>{value.name}</span> <span className="text-xs flex items-center gap-1"><MapPin size={12} />{value.pincode}</span></p>
                    <p className="text-sm capitalize mt-2 mb-2">{value.address}</p>
                    <p className="text-sm flex items-center gap-2"><Phone size={15} />{value.mobile}</p>
                  </div>
                })}
              </article>}
                  
            </div>
        </article>
      </section>

      {/* Actions */}
      <div className={`${Object.keys(cartItem || {}).length==0 ? "hidden opacity-0":"flex"} gap-20 items-center justify-center pb-16`}>
        <Link to="/pharmacy" className="text-gray-400  hover:text-gray-600">
          Go Back to Shop
        </Link>
        <button onClick={()=>setWhichPage(1)}
          className="bg-[#246eea] active:scale-90 hover:bg-[#4984ea] text-white uppercase tracking-wide rounded-lg px-16 py-3.5 group text-base flex items-center transition-all"
        >
          Proceed to Payment <ArrowRightCircle className="w-6 h-6 ml-2 group-hover:translate-x-5 transition-transform duration-300" />
        </button>
      </div>
    </div>
}


const Page2 = ({setCartItem,email,cartItem,address,payment,currentCard,setCurrentCard,setWhichPage,totalCost,coupon})=>{
  async function submit(){
    const now = new Date();
    const data = {
        email: email,
      date: `${now.getDate()} / ${now.getMonth()+1} / ${now.getFullYear()} `,
      time: `${now.getHours()} : ${now.getMinutes()}`,
      total: getCouponPrice(coupon,totalCost),
      status: 0,
      rating: 0,
      address: {
          name: address.name,
          address: address.address,
          pincode: address.pincode,
          mobile: address.mobile
        },
      payment: {
          cardNo: payment[currentCard].cardNo,
          expiry: payment[currentCard].expiry,
          cvv: payment[currentCard].cvv,
          name: payment[currentCard].name,
      },
      medicine:{}
    }
// (4) ['Atorva Gold 20 Capsule', 'https://onemg.gumlet.io/l_watermark_346,w_480,h_48…_auto,f_auto/3d52d2e7fc0e4ba39cea6b90ce30661f.jpg', '173.37', 1]
    Object.keys(cartItem).map((value,index)=>{
      data["medicine"][value] = {
        name: cartItem[value][0],
        img: cartItem[value][1],
        price: cartItem[value][2],
        quantity: cartItem[value][3]
      }
    })

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/pharmacy/add-new-order`,{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(data)
    })
    const text = await response.json()
    if(text.success){
      toast.success("Order Placed successfully")
      setCartItem({})
    }else{
      toast.error("Failed to place the order")
    }
    setWhichPage(2)
  }
  
  const [tab,settab] = useState(0)
  return <section className="bg-[var(--card)] mx-10 rounded-sm px-10 py-10 mt-10">
    <button className="text-sm px-10 py-2 mb-5 flex items-center gap-2 bg-red-500 rounded-sm hover:bg-red-600 active:scale-90 text-white" onClick={()=>setWhichPage(0)}><ChevronLeft/>Go Back</button>
    {/* tabs */}
    <div className="bg-[var(--bg)] flex py-1.5 px-5 mb-5">
      <p className={`w-full text-xs py-2 flex items-center gap-2 justify-center rounded-sm active:scale-90 cursor-pointer ${0==tab && "bg-[var(--card)]"}`} onClick={()=>settab(0)}><Save/>Saved Payment Methods</p>
      <p className={`w-full text-xs py-2 flex items-center gap-2 justify-center rounded-sm active:scale-90 cursor-pointer ${1==tab && "bg-[var(--card)]"}`} onClick={()=>settab(1)}><CreditCard/>Add a new Card</p>
      <p className={`w-full text-xs py-2 flex items-center gap-2 justify-center rounded-sm active:scale-90 cursor-pointer ${2==tab && "bg-[var(--card)]"}`} onClick={()=>settab(2)}><Banknote/>Cash On Delivery</p>
    </div>
      {tab==0 && <div className="mt-10">
        {payment.length==0 && <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-2xl">No Saved Payment Methods</h1>
          <img src="/empty.gif" alt="" className="h-30 rounded-sm" />
        </div>}
        {payment.length>0 && <div className="flex flex-wrap gap-10">
          {payment.map((value,index)=>{
            return <div key={index} className={`${index==currentCard ?"bg-teal-500":""} p-2 cursor-pointer active:scale-90 transition-transform duration-100 rounded-lg`} onClick={()=>setCurrentCard(index)}>
                <OnlyCard number={value.cardNo} cvc={value.cvc} name={value.name} expiry={value.expiry} />
            </div>
          })}
          <div className="basis-full flex items-center gap-10 justify-center mt-4">
          <p className="flex items-center">{coupon && <span className="text-xs mr-5 line-through">₹{totalCost}</span>}₹{getCouponPrice(coupon,totalCost)}</p>
            <button
              onClick={submit}
              type="button"
              className="w-max cursor-pointer px-10 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-medium tracking-wide transition-all shadow-md"
              >
              Submit Payment
              </button>
          </div>
        </div>}
      </div>}
      {tab==1 && <CreditCardComponent number="" name="" expiry="" cvc="" />}
      {tab==2 && <div className="flex flex-col gap-10 items-center justify-center">
        <img src="/cod.gif" alt="" className="h-30 rounded-sm" />
        <div className="basis-full flex items-center gap-10 justify-center mt-4">
          <p className="flex items-center">{coupon && <span className="text-xs mr-5 line-through">₹{totalCost}</span>}₹{getCouponPrice(coupon,totalCost)}</p>
          <button
              onClick={submit}
              type="button"
              className="w-max cursor-pointer px-10 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-medium tracking-wide transition-all shadow-md"
              >
              Submit Payment
              </button>
        </div>
      </div>}
  </section>
}

const OrderConfirmPage = ({currAdd,currPay})=>{
  const navigate = useNavigate()

  
  return <section className="flex flex-col items-center justify-center max-w-7xl mx-auto">
    <div className="mb-10 grid grid-cols-[auto_1fr] px-10 py-5 gap-x-10 items-center w-full">
    <img src="/confirm.gif" alt="" className="h-70 w-max row-span-3" />
    <p className="text-5xl">Order Placed!</p>
    <p>Your Order has been placed, You can track this at your manage tab.</p>
    <div className="flex justify-between gap-20">
      <button onClick={()=>navigate("/")} className="flex items-center gap-4 text-sm px-10 py-2.5 rounded-sm text-white hover:scale-110 active:scale-90 transition-transform duration-200 cursor-pointer hover:bg-indigo-600 bg-indigo-500">Home</button>
      <button onClick={()=>navigate("/pharmacy")} className="flex items-center gap-4 text-sm px-10 py-2.5 rounded-sm text-white hover:scale-110 active:scale-90 transition-transform duration-200 cursor-pointer hover:bg-teal-600 bg-teal-500">Continue Shopping</button>
      <button onClick={()=>navigate("/manage")} className="flex items-center gap-4 text-sm px-10 py-2.5 rounded-sm text-white hover:scale-110 active:scale-90 transition-transform duration-200 cursor-pointer hover:bg-orange-600 bg-orange-500">Manage Order's</button>
    </div>
    </div>
    <div className="grid grid-cols-2 w-full gap-x-10">
      <p className="bg-[var(--card)] w-full justify-center flex gap-5 py-2 rounded-sm mb-10">Shipping Address</p>
      <p className="bg-[var(--card)] w-full justify-center flex gap-5 py-2 rounded-sm mb-10">Payment Method</p>
      <div>
        <Label className="mb-2">Enter Reciever Name</Label>
                <Input className="capitalize" placeholder="Reciever Name" value={currAdd.name} disabled />
                <Label className="mt-5 mb-2">Enter Pin Code</Label>
                  <InputOTP maxLength={6} value={currAdd.pincode} disabled >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <Label className="mt-5 mb-2" htmlFor="add-full-address" >Full Address here</Label>
                  <Textarea className="capitalize" placeholder="Enter Full Address" id="add-full-address" value={currAdd.address} disabled />
                  <Label className="mt-5 mb-2" htmlFor="add-full-address">Reciever Phone Number</Label>
                  <Input className="capitalize" placeholder="Enter Reciever Mobile" value={currAdd.mobile} disabled />
      </div>
      
      <OnlyCard name={currPay.name} number={currPay.cardNo} cvc={currPay.cvc} expiry={currPay.expiry} />
    </div>
    
  </section>
}

const CheckoutPage = ({cartItem,setCartItem,address,payment,email}) => {
  const [whichPage,setWhichPage] = useState(0)
  const [coupon,setCoupon] = useState("")
  const [totalCost,setTotalCost] = useState(0)
  const [currentAddress,setCurrentAddress] = useState(0)
  const [currentCard,setCurrentCard] = useState(0)
   function CountTotalCost(){
    let cost = 0;
    Object.keys(cartItem || {}).map((value)=>(cost+=(cartItem[value][2]*cartItem[value][3])))
    return cost.toFixed(2)
  }
  useEffect(() => {
      const total = CountTotalCost()
      setTotalCost(total)
    }, [cartItem])
  return (
    <section>
      {whichPage==0 && <Page1 setTotalCost={setTotalCost} setWhichPage={setWhichPage} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} address={address} cartItem={cartItem} setCartItem={setCartItem} coupon={coupon} setCoupon={setCoupon} totalCost={totalCost} />}
      {whichPage==1 && <Page2 setCartItem={setCartItem} email={email} cartItem={cartItem} address={address[currentAddress]} coupon={coupon} totalCost={totalCost} payment={payment} currentCard={currentCard} setCurrentCard={setCurrentCard} setWhichPage={setWhichPage} />}
      {whichPage==2 && <OrderConfirmPage currAdd={address[currentAddress]} currPay={payment[currentCard]} />}
    </section>
  );
};

export default CheckoutPage;
