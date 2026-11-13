import {
  Briefcase,
  Check,
  CreditCard,
  FrownIcon,
  Mail,
  MapPin,
  Mars,
  Phone,
  Podcast,
  Search,
  Send,
  SquareActivity,
  ChevronDown,
  User,
  Venus,
  Transgender,
  Popcorn,
  Save,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComp } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"



const DateOfBirth=()=> {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(undefined)
  return (
    <div className="flex flex-col gap-3">
      <p className="block text-gray-500 dark:text-gray-400 text-xs font-semibold">Date Of Birth</p>
      {/* <Label onClick={()=>setOpen(true)} htmlFor="date" className="px-1 text-xs text-gray-500">
        Date of birth
      </Label> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            variant="outline"
            id="date"
            className="w-max gap-5 rounded-sm justify-between font-normal flex items-center bg-[var(--card)] px-10 py-2 text-sm"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDown />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <input type="date" name="" id="" />
          {/* <CalendarComp
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          /> */}
        </PopoverContent>
      </Popover>
    </div>
  )
}

const GenderSelect = () => {
  const [selected, setSelected] = useState("Motorbike");

  const options = [
    {
      label: "Male",
      icon: <Mars size={16} />
    },
    {
      label: "Female",
      icon: <Venus size={16} />,
    },
    {
      label: "Kfc",
      icon: <Popcorn size={16} />,
    },
    {
      label: "Others",
      icon: <Transgender size={16} />,
    },
  ];

  return (
    <div className="flex justify-center items-center gap-5 w-full select-none w-full ">
      {options.map((opt) => (
        <motion.label
          initial={{opacity:0,scale:0}}
          animate={{opacity:1,scale:1}}
          key={opt.label}
          className={`relative hover:scale-105 active:scale-90 flex flex-col items-center bg-[var(--card)] justify-center group w-full h-max gap-2 px-5 py-2 rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer ${
            selected === opt.label
              ? "border-blue-600 text-blue-600 shadow-blue-200 shadow-sm"
              : "border-transparent hover:border-blue-500"
          }`}
        >
          {/* Radio circle indicator */}
          <span
            className={`absolute top-1 left-1 w-3 h-3 rounded-full border-2 transition-all duration-200 ${
              selected === opt.label
                ? "bg-blue-600 border-blue-600 scale-100 opacity-100"
                : "bg-white border-gray-300 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100"
            }`}
          ></span>

          {/* Hidden Radio Input */}
          <input
            type="radio"
            name="vehicle"
            value={opt.label}
            checked={selected === opt.label}
            onChange={() => setSelected(opt.label)}
            className="absolute opacity-0 w-0 h-0"
          />

          {/* Icon */}
          <span
            className={`mb-1 transition-all ${
              selected === opt.label ? "text-blue-600 fill-blue-600" : "text-gray-600"
            }`}
          >
            {opt.icon}
          </span>

          {/* Label */}
          <span
            className={`text-xs font-medium transition-all ${
              selected === opt.label ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {opt.label}
          </span>
        </motion.label>
      ))}
    </div>
  );
};


const YourInfo = ({profileData,setProfileData}) => {
  return (
    <article className="bg-[var(--bg)] px-10 py-5 rounded-lg h-full flex flex-col justify-between">
      {/* name first andd last */}
      <div className="flex gap-5 items-center">
        <div className="w-full">
          <motion.label
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-2"
          >
            First Name
          </motion.label>
          <div className="relative">
            <motion.input
              value={profileData.fname}
              onChange={e=>setProfileData({...profileData,"fname":e.target.value})}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              placeholder="Enter your first name"
              className="capitalize text-sm w-full px-4 py-3 bg-[var(--card)] peer border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
              type="text"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 h-max top-1/2 -translate-y-1/2"
            >
              <User />
            </motion.span>
          </div>
        </div>
        <div className="w-full">
          <motion.label
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-2"
          >
            Last Name
          </motion.label>
          <div className="relative">
            <motion.input
              value={profileData.lname}
              onChange={e=>setProfileData({...profileData,"lname":e.target.value})}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              placeholder="Enter your Last name"
              className="capitalize text-sm w-full px-4 py-3 bg-[var(--card)] peer border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500 "
              type="text"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 h-max top-1/2 -translate-y-1/2"
            >
              <User />
            </motion.span>
          </div>
        </div>
      </div>
      {/* gender and blood group */}
      <div className="grid grid-cols-2 items-center gap-10">
        <div className="flex flex-col w-full ">
            <p className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-1">Gender</p>
            <GenderSelect/>
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full h-full rounded-lg flex flex-col justify-center"
        >
            <p className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-2">Blood Group</p>
            <NativeSelect className="px-10 py-3 bg-[var(--card)]">
              {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((value,index)=>(
                <NativeSelectOption key={index} className="bg-[var(--card)] border-none outline-none" value="">{value}</NativeSelectOption>
              ))}
            </NativeSelect>
        </motion.div>
      </div>
      {/* age with dob and occupation here */}
      <div className="flex items-center gap-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex w-full gap-x-10 rounded-lg"
        >
          <p className="bg-[var(--card)] px-10 py-5 rounded-sm">0</p>
          <DateOfBirth/>
        </motion.div>
        <div className="w-full">
          <motion.label
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-2"
          >
            Your Occupation
          </motion.label>
          <div className="relative">
            <motion.input
              value={profileData.occupation}
              onChange={e=>setProfileData({...profileData,"occupation":e.target.value})}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              placeholder="Enter Your Occupation"
              className="capitalize text-sm w-full px-4 py-3 bg-[var(--card)] peer border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
              type="text"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 h-max top-1/2 -translate-y-1/2"
            >
              <Briefcase />
            </motion.span>
          </div>
        </div>
      </div>
    </article>
  );
};

const Contacts = ({profileData,setProfileData}) => {
  const [cityList, setCityList] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    async function cityDataFetch() {
      const citySearchData = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/patient/profile-city?city=${search}`
      );
      const data = await citySearchData.json();
      setCityList(data["data"]);
    }
    cityDataFetch();
  }, [search]);

  return (
    <article className="bg-[var(--bg)] px-10 py-5 rounded-lg h-full grid grid-cols-[.5fr_1fr] gap-x-10 items-center grid-rows-[1fr_1fr] justify-between">
      {/* search city tab here */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="row-span-2 bg-[var(--card)] px-10 rounded-lg py-5 flex flex-col"
      >
        {/* top bar city and current city */}
        <div className="flex justify-between bg-[var(--bg)] rounded-sm items-center py-1.5 px-5">
          <p className="flex text-sm  py-2.5 items-center gap-2">
            <MapPin size={18} /> Location
          </p>
          <p className="bg-teal-500 text-[var(--bg)] h-max py-1.5 px-5 text-sm rounded-sm">
            {profileData.location}
          </p>
        </div>
        {/* search bar */}
        <div className="bg-[var(--bg)] flex items-center gap-2 rounded-sm px-5 py-2.5 mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a city"
            className="outline-none text-sm w-full"
          />
          <Check
            className="bg-teal-500 stroke-white hover:scale-105 px-2 w-10 rounded-xs active:scale-90 hover:bg-teal-600 transition-all duration-100 cursor-pointer"
            onClick={() => setProfileData({...profileData,location:cityList[0]})}
          />
        </div>
        {/* some suggestions */}
        <div className="flex flex-wrap mt-5 gap-5 max-h-[80px] overflow-hidden">
          {(search == ""
            ? ["Delhi", "Mumbai", "Kolkata", "Banglore", "Mysore"]
            : cityList
          ).map((value, index) => (
            <motion.p
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              key={index}
              className="text-xs border rounded-sm border-dashed border-[var(--border)] px-3 py-1 max-w-25 h-max truncate cursor-pointer active:scale-90 hover:text-[var(--button)] hover:border-[var(--button)]"
              onClick={() => setSearch(value)}
            >
              {value}
            </motion.p>
          ))}
        </div>
      </motion.div>
      {/* right top tab for email and occupation */}
      <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-x-10">
        <motion.p
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-max w-max col-span-2 mb-5 text-xs font-semibold text-[var(--button)]"
        >
          *Required
        </motion.p>
        {/* email */}
        <div className="w-full">
          <motion.label
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-2"
          >
            Your Email
          </motion.label>
          <div className="relative">
            <motion.input
              value={profileData.email}
              onChange={e=>setProfileData({...profileData,"email":e.target.value})}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              placeholder="Enter your email"
              className="text-sm w-full px-4 py-3 bg-[var(--card)] peer border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
              type="email"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 h-max top-1/2 -translate-y-1/2"
            >
              <Mail />
            </motion.span>
          </div>
        </div>
        <div className="w-full">
          <motion.label
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-2"
          >
            Your Contact Number
          </motion.label>
          <div className="relative">
            <motion.input
              value={profileData.contact}
              onChange={e=>setProfileData({...profileData,"contact":e.target.value})}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              aria-label="Business contact input"
              placeholder="Enter your contact number"
              className="capitalize text-sm w-full px-4 py-3 bg-[var(--card)] peer border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
              type="number"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 h-max top-1/2 -translate-y-1/2"
            >
              <Phone />
            </motion.span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-x-10">
        <motion.p
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="col-span-2 mb-5 h-max w-max text-xs font-semibold text-[var(--button)]"
        >
          (OPTIONAL)
        </motion.p>
        {/* emergency contact number */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full"
        >
          <motion.label
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-2"
          >
            Emergency Contact Number
          </motion.label>
          <div className="relative">
            <motion.input
              value={profileData.emergency}
              onChange={e=>setProfileData({...profileData,"emergency":e.target.value})}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              placeholder="Enter emergency contact number"
              className="capitalize text-sm w-full px-4 py-3 bg-[var(--card)] peer border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
              type="number"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 h-max top-1/2 -translate-y-1/2"
            >
              <SquareActivity />
            </motion.span>
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full"
        >
          <motion.label
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-gray-500 dark:text-gray-400 text-xs font-semibold mb-2"
          >
            Your Occupation
          </motion.label>
          <div className="relative">
            <motion.input
              value={profileData.occupation}
              onChange={e=>setProfileData({...profileData,"occupation":e.target.value})}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              placeholder="Enter your occupation"
              className="capitalize text-sm w-full px-4 py-3 bg-[var(--card)] peer border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
              type="text"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 h-max top-1/2 -translate-y-1/2"
            >
              <Briefcase />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </article>
  );
};

const Address = ({address}) => {

  const [active, setActive] = useState(1);

  return (
    <article className="bg-[var(--bg)] px-10 py-5 rounded-lg h-full flex flex-col">
      <motion.p
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-max text-xs font-semibold text-[var(--button)]"
      >
        Here are your saved address
      </motion.p>
      {address.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-between">
          {address.map((value, index) => (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setActive(value.id)}
              key={index}
              className="px-10 py-5 rounded-sm bg-[var(--card)] mt-5 w-max hover:scale-105 transition-transform duration-300 active:scale-90"
            >
              <div className="flex justify-between items-center">
                <p className="flex items-center gap-2 text-base capitalize">
                  <User />
                  {value.name}
                </p>
                {active == value.id && (
                  <span className="text-xs px-3 py-1 rounded border border-dashed border-teal-500 text-teal-500 cursor-default">
                    Default
                  </span>
                )}
              </div>
              <p className="flex items-center gap-2 text-sm mt-3 capitalize">
                {value.address}
              </p>
              <div className="flex gap-10 mt-5">
                <p className="flex items-center gap-2 text-sm">
                  <MapPin size={16} />
                  {value.pincode}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={16} />
                  {value.mobile}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[auto_1fr] gap-x-10 grid-rows-[auto_auto_1fr] my-auto">
          <img
            src="/nosavedaddress.gif"
            alt=""
            className="h-40 rounde-sm row-span-3"
          />
          <p className="text-2xl flex items-center gap-5">
            <FrownIcon />
            No saved Address
          </p>
          <p className="text-sm mt-5">
            You can save a address when you go to place order in pharmacy
          </p>
          <Link
            to="/pharmacy"
            className="h-max text-white w-max px-10 py-3 mt-10 rounded-sm bg-[var(--button)] hover:bg-[var(--button-hover)] flex items-center gap-5 active:scale-90"
          >
            Try it <Send />
          </Link>
        </div>
      )}
    </article>
  );
};

const Payment = ({payment}) => {
  return (
    <article className="bg-[var(--bg)] px-10 py-5 rounded-lg h-full flex flex-col">
      <motion.p
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-max text-xs font-semibold text-[var(--button)]"
      >
        Here are your saved payment methods
      </motion.p>
      {payment.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-10">
          {payment.map((value, index) => (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={index}
              className="w-max hover:scale-105 transition-transform duration-300 active:scale-90"
            >
              <Cards
                number={value.cardNo}
                name={value.name}
                expiry={value.expiry}
                cvc={value.cvc}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[auto_1fr] gap-x-10 grid-rows-[auto_auto_1fr] my-auto">
          <img
            src="/payment.gif"
            alt=""
            className="h-40 rounde-sm row-span-3"
          />
          <p className="text-2xl flex items-center gap-5">
            <FrownIcon />
            No saved Payment Methods
          </p>
          <p className="text-sm mt-5">
            You can save a payment when you go to place order in pharmacy
          </p>
          <Link
            to="/pharmacy"
            className="h-max w-max px-10 py-3 mt-10 rounded-sm bg-[var(--button)] hover:bg-[var(--button-hover)] flex items-center gap-5 active:scale-90"
          >
            Try it <Send />
          </Link>
        </div>
      )}
    </article>
  );
};

const TabItem = ({ Icon, Title, link, isCurrent }) => {
  return (
    <motion.p
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full"
    >
      <Link
        to={link}
        replace={true}
        className={`flex items-center gap-2 py-2 h-full transition-all duration-100 active:scale-90 rounded-sm justify-center text-sm text-[var(--text)] ${
          isCurrent
            ? "text-white bg-[var(--button)] hover:bg-[var(--button-hover)]"
            : "hover:bg-[var(--card)]"
        }`}
      >
        <Icon size={18} />
        {Title}
      </Link>
    </motion.p>
  );
};


const Profiles = ({ currentTab, MyData }) => {
  const [profileData,setProfileData] = useState({
    "fname": MyData["name"].split(" ")[0],
    "lname": MyData["name"].split(" ")[1],
    "gender":'',
    "bloodgrp":'',
    "dob":'',
    "occupation":'',
    "location":"",
    "email": MyData["contact"]["email"],
    "contact":"",
    "emergency":"",
  });
  const img = MyData["imageUrl"] ? `${import.meta.env.VITE_BACKEND_API_URL}${MyData["imageUrl"]}` : "/nouser.jpg"
  return (
    <section className="w-full h-full bg-[var(--bg)] py-15">
      <section className="h-full w-7xl bg-[var(--card)] text-[var(--text)] rounded-lg mx-auto px-10 py-5 flex flex-col">
        {/* top bar with profile and name */}
        <div className="flex items-center w-full gap-10">
          <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="grid grid-cols-[auto_1fr] items-center gap-x-10 bg-[var(--bg)] w-max mr-auto px-10 py-3 rounded-sm">
            <img
              src={img}
              alt=""
              className="row-span-2 h-15 w-15 rounded-full justify-self-end"
            />
            <h1 className="text-xl capitalize">{MyData["name"]}</h1>
            <p className="text-xs font-medium uppercase">Patient</p>
          </motion.div>
          {/* membership detials */}
          <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className="bg-[var(--bg)] grid grid-cols-[auto_1fr] gap-2 items-center px-10 py-4 rounded-sm">
            <Podcast />
            <p className="text-lg">Membership</p>
            <p className="text-sm col-span-2 text-center capitalize">{MyData["plan"]}</p>
          </motion.div>
          {/* save chagne button */}
          <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} className={`bg-gradient-to-r text-white bg-[var(--button)] hover:bg-[var(--button)]/80 transition-all duration-300 active:scale-90 h-full cursor-pointer flex justify-center items-center px-10 rounded-sm`}>
            <p className="flex flex-col gap-2 text-sm whitespace-nowrap items-center"><Save/>Save</p>
          </motion.div>
        </div>
        {/* tab list  */}
        <div className="flex gap-4 bg-[var(--bg)] mt-5 px-5 py-2 mb-5">
          <TabItem
            Icon={User}
            Title="Your Info"
            link="/profiles/info"
            isCurrent={currentTab == 0}
          />
          <TabItem
            Icon={Phone}
            Title="Contact"
            link="/profiles/contact"
            isCurrent={currentTab == 1}
          />
          <TabItem
            Icon={MapPin}
            Title="Address"
            link="/profiles/address"
            isCurrent={currentTab == 2}
          />
          <TabItem
            Icon={CreditCard}
            Title="Payment Methods"
            link="/profiles/payment-modes"
            isCurrent={currentTab == 3}
          />
        </div>
        {currentTab == 0 && <YourInfo profileData={profileData} setProfileData={setProfileData} />}
        {currentTab == 1 && <Contacts profileData={profileData} setProfileData={setProfileData} />}
        {currentTab == 2 && <Address address={MyData["address"]} />}
        {currentTab == 3 && <Payment payment={MyData["payment"]}  />}
      </section>
    </section>
  );
};

export default Profiles;
