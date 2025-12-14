import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './initialPages/SignIn'
import LandingPage from './initialPages/Landing'
import Patient from './patient/Patient'
import Dashboard from './patient/Dashboard'
import Appointments from './patient/Appointments'
import Pharmacy from './pharmacy/Pharmacy'
import Home from './pharmacy/Home'
import Medicines from './pharmacy/Medicines'
import ConsultDoctor from './pharmacy/ConsultDoctor'
import MedicinesUpload from './pharmacy/MedicinesUpload'
import Doctor from './doctor/Doctor'
import EventsPage from './patient/Event'
import CommunityPage from './patient/Community'
import Explore from './patient/Explore'
import Splash from './Splash'
import EmergencyPage from './patient/Emergency'
import Manage from './patient/Manage'
import CheckoutPage from './pharmacy/CompletePayment'
import AboutPage from './initialPages/About'
import AI from './aiPage/AI'
import Pricing from './aiPage/Pricing'
import Profiles from './patient/Profiles'
import MakeLogout from './component/MakeLogout'
import { getMyData, ToggleDarkMode } from "./BackendFunctions";
import Utilities from "./patient/Utilities";
import DiseasePredictionPage from "./patient/utilities/Symptoms";
import DoctorHome from "./doctor/Home";
import DoctorAppointment from "./doctor/Appointment";
import DoctorRecord from "./doctor/Records";
import PageNotFound404 from "./component/pagenotfound";
import DoctorProfile from "./doctor/Profile";
import AdminHome from "./admin/Home";
import toast from "react-hot-toast";
import { CheckCircle, CircleAlert, Info } from "lucide-react";


function App() {
  // LOGIN STATES : -1 (not login) | 0 {Doctor Login} | 1 {Patient Login} | 2 {Admin Login} | -2 {Splash Screen}
  const [login,setLogin] = useState(-2)

   // contains five things {id : [title,image,price,quantity]}
  const [cartItem,setCartItem] = useState({})

  const [MyData,setMyData] = useState({})

  const [weatherData,setWeatherData] = useState({
    title:"",
    temp:"0",
    description:"",
    feelsLike:"",
    seaLevel:"",
    pressure:"",
    humidity:"",
    windSpeed:"",
    visibility:""
  })


  const UpdateCart = () => {
    try {
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/pharmacy/updateMyCart`, {
        method: "POST",
        credentials: "include", // sends cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
    } catch (err) {
      console.error("⚠️ Error updating cart:", err);
    }
  };
  async function getWeatherData() {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=28.4374&lon=77.0345&appid=e85764cbe7283aee72231f16c1ed2600")
    const data = await response.json();
    

    setWeatherData({
      title: data["name"] ,
      temp: (data["main"]["temp"] - 273.15).toFixed(0) + "°C" ,
      description: data["weather"][0]["description"] ,
      feelsLike: (data["main"]["feels_like"] - 273.15).toFixed(2) + " °C" ,
      seaLevel: data["main"]["sea_level"] ,
      pressure: data["main"]["pressure"] + "hPa" ,
      humidity: data["main"]["humidity"] +"%" ,
      windSpeed:  data["wind"]["speed"] + " m/s" ,
      visibility: data["visibility"]+" m" 
    })

    // wea_field[9].textContent = unixToReadableDate(data["sys"]["sunrise"])
    // wea_field[10].textContent = unixToReadableDate(data["sys"]["sunset"])

    // icon_choose(data["weather"][0]["icon"])
  }
  useEffect(() => {
    // if user not logged in then do not update card
    if(![0,1].includes(login) ){
      return
    }
    // prevent running when cart is undefined or empty
    if (!cartItem || Object.keys(cartItem).length === 0) return;
  UpdateCart();
}, [cartItem]);
  
  async function CheckLogin(waitTime){
      const loginValue = await getMyData(setMyData,setCartItem)
      if(loginValue!=-2){
        setTimeout(() => {
          setLogin(loginValue)
        }, waitTime);
      }
        return loginValue;
    }

  useEffect(() => {
    
    CheckLogin(4000)
    
    // getWeatherData()
    ToggleDarkMode(false)
  }, [])

  function markReadNotification(userId,notiIndexList){
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/notification/mark-noti-read`,{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: userId,
        type: login==0?"doctor":"patient",
        index: notiIndexList
      })
    })
  }
  useEffect(() => {
    const IndexData = [];
    (MyData.notification ?? []).reverse().map((value,index)=>{
      if(value[0]==false){
        IndexData.push(MyData.notification.length - index - 1)
        setTimeout(() => {
          toast.custom((t) => (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-lg border">
            {value[1] == 0 && <CheckCircle className="text-green-600" />}
            {value[1] == 1 && <Info className="text-blue-600" />}
            {value[1] == 2 && <CircleAlert className="text-red-600" />}
            <div>
              <p className="text-xs text-gray-700">You Have a new notification</p>
              <p className="font-semibold text-gray-900 text-base capitalize">{value[2]}</p>
              <p className="text-sm text-gray-600">{value[3]}</p>
            </div>
          </div>
        ))
        }, 500*index);
      }
    })
    if(IndexData.length>0){
      markReadNotification(MyData._id,IndexData)
    }
  }, [MyData])
  


  return ( 
    <Routes>
      {login === -1 && <>
        <Route path="/">
          {/* Routes for when the user is not logged in */}
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/sign-in" element={
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <SignIn/>
            </GoogleOAuthProvider>} />
      </>}

      {login == -2 && <Route path="*" element={<Splash CheckLogin={CheckLogin} />}/>
      }
      
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/makeLogout" element={<MakeLogout/>} />

      {/* ai page */}
      <Route path="/ask" >
        <Route index element={<AI image={MyData.imageUrl ?? ""} plan={MyData.plan ?? "Basic"} chatPages={true} />} />
        <Route path='pricing' element={<AI image={MyData.imageUrl ?? ""} plan={MyData.plan ?? "Basic"} chatPages={false} />}>
          <Route index element={<Pricing plan={MyData.plan ?? "Basic"} />} />
        </Route>

      </Route>

      {login === 0 && (
        <Route path="/" element={<Doctor id={MyData._id} image={MyData.imageUrl} name={MyData.name} />}>
          {/* Content for Doctor login */}
        <Route index element={<DoctorHome MyData={MyData} temp={weatherData} />} />
        <Route path="appointments" element={<DoctorAppointment docName={MyData.name} docId={MyData._id} department={MyData.department} appointments={MyData.appointments}  />} />
        <Route path="records" element={<DoctorRecord  />} />
        <Route path="profile" element={<DoctorProfile MyData={MyData}  />} />

        </Route>
      )}

      {login === 1 && (
        <Route path="/" element={<Patient id={MyData._id} image={MyData.imageUrl} name={MyData.name} temp={weatherData} notification={MyData.notification ?? []} />}>
          {/* Content for Patient login */}
          <Route index element={<Dashboard imageUrl={MyData.imageUrl} name={MyData["name"]} cartCount={Object.keys(cartItem || {}).length} orders={MyData["orders"]}  appointments={MyData["appointments"] }  />} />
          <Route path="appointments">
            <Route index element={<Appointments data={MyData} currentIndex={0} />} />
            <Route path='expired' element={<Appointments data={MyData} currentIndex={1} />} />
            <Route path='new' element={<Appointments data={MyData} setMyData={setMyData} currentIndex={2} />} />
            <Route path='id' element={<Appointments data={MyData} currentIndex={3} />} />
          </Route>
          <Route path="manage">
            <Route index element={<Manage orders={MyData["orders"]} appointments={MyData["appointments"]} whichTab={0} />} />
            <Route path="orders" element={<Manage orders={MyData["orders"]} appointments={MyData["appointments"]} whichTab={0} />} />
            <Route path="reports" element={<Manage orders={MyData["orders"]} appointments={MyData["appointments"]} whichTab={1} />} />
          </Route>
          <Route path="profiles">
            <Route index element={<Profiles MyData={MyData} currentTab={0} />} />
            <Route path="info" element={<Profiles MyData={MyData} currentTab={0} />} />
            <Route path="contact" element={<Profiles MyData={MyData} currentTab={1} />} />
            <Route path="address" element={<Profiles MyData={MyData} currentTab={2} />} />
            <Route path="payment-modes" element={<Profiles MyData={MyData} currentTab={3} />} />
          </Route>
          <Route path="explore">
            <Route index element={<Explore />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>
          <Route path="symptoms-predictor" element={<DiseasePredictionPage />} />
          <Route path="emergency" element={<EmergencyPage />} />
          <Route path="utilities">
            <Route index element={<Utilities tabNumber={-1} />} />
            <Route path="/utilities/basal-metabolic-rate" element={<Utilities tabNumber={0} />} />
            <Route path="/utilities/body-fat-calculator" element={<Utilities tabNumber={1} />} />
            <Route path="/utilities/body-mass-index" element={<Utilities tabNumber={2} />} />
            <Route path="/utilities/calories-burned" element={<Utilities tabNumber={3} />} />
            <Route path="/utilities/calories-intake" element={<Utilities tabNumber={4} />} />
            <Route path="/utilities/calories-counter" element={<Utilities tabNumber={5} />} />
            <Route path="/utilities/ideal-weight-calculator" element={<Utilities tabNumber={6} />} />
            <Route path="/utilities/lean-body-mass-calculator" element={<Utilities tabNumber={7} />} />
            <Route path="/utilities/protien-counter" element={<Utilities tabNumber={8} />} />
            <Route path="/utilities/wellness" element={<Utilities tabNumber={9} />} />
            <Route path="/utilities/diet" element={<Utilities tabNumber={10} />} />
            <Route path="/utilities/food-analyze" element={<Utilities tabNumber={11} />} />
          </Route>
        </Route>
      )}

      <Route path="/pharmacy" element={<Pharmacy cartItem={cartItem} setCartItem={setCartItem} />}>
          <Route index element={<Home />} />
          <Route path='medicines'>
            <Route index element={<Medicines cartItem={cartItem} setCartItem={setCartItem} />} />
            <Route path='upload' element={<MedicinesUpload />} />
          </Route>
          <Route path='complete-payment' element={<CheckoutPage email={login==1 ? MyData["contact"]["email"] : ""} payment={MyData["payment"] ?? []} cartItem={cartItem} setCartItem={setCartItem} address={MyData["address"]??[]} />} />
          <Route path='consult-doctors' element={<ConsultDoctor />} />
          <Route path='lab-tests' element={<Home />} />
        </Route>

      {login === 2 && (
        <Route path="/" element={<AdminHome/>}>
          {/* Content for Admin login */}
        </Route>
      )}

      <Route path="*" element={<PageNotFound404 islogin={login} />} />
    </Routes>
  )
}

export default App
