import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Mars, Pen, Plus, Rabbit, Venus } from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { hospitalDepartments } from "../BackendFunctions";
import axios from "axios";

const FemaleDoctorIcon = (
  <svg
    className="h-30 dark:stroke-white stroke-black"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M154.43 82.5312C173.459 117.556 205.218 122.311 243.126 118.117"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M150.09 86.5879C140.296 98.5304 134.136 110.444 129.975 126.872"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M130.429 131.586C117.525 139.947 135.196 152.018 135.196 152.739C135.196 229.349 250.087 260.198 250.087 161.051"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M118.367 215.001C87.2977 146.373 97.9899 60.6461 164.799 33.3594"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M187.835 33C307.054 33.0003 275.092 138.363 282.29 203.481"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M186.274 144.558C186.274 141.486 186.274 138.409 186.274 135.336"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M212.424 144.452C212.424 139.561 213.503 138.736 212.424 135.019"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M144.154 218.021C130.491 255.064 179.516 277.407 185.35 311.852C185.489 312.657 186.432 356.683 188.884 356.683C197.622 356.683 188.825 310.119 192.414 304.557C218.528 264.074 247.734 267.575 247.734 213.848"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M45 364.747C60.1863 306.064 60.1863 250.394 141.759 217.304"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M250.039 217.304C306.492 219.949 354.861 302.323 354.861 356.683"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M247.454 214.385C252.064 225.679 270.412 261.433 272.454 273.673"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M264.979 274.103C308.843 245.731 308.11 334.174 263.765 302.154C252.367 293.926 265.752 280.95 271.052 272.934"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M144.572 219.081C125.029 233.198 104.685 262.672 102.722 285.53"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M69.0321 364.747C41.0835 350.369 78.0741 270.547 109.175 286.469C133.814 299.08 128.247 362.011 101.532 364.747"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M285.611 332.155C275.829 331.226 266.341 333.888 256.665 335.278"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);
const MaleDoctorIcon = (
  <svg
    className="h-30 dark:stroke-white stroke-black"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M222 76C210.988 106.84 171.627 128.31 147 132"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M236 44.053C123.346 20.1218 96.7679 144.026 136.104 167"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M256 54C302.745 75.4047 288.975 108.654 272.736 144"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M260.902 122C295.577 228.082 142 250.963 142 156.601"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M218.892 153C219.298 150.031 218.46 147.754 218 145"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M191 154C191 151.332 191 148.668 191 146"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M60 345.501C60 309.522 83.3747 224.325 163.582 228.248C185.925 229.341 191.24 351.835 206.062 345.501C232 334.416 223.446 254.231 243.571 224.158C340.019 219.027 341 340.572 341 359"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M296 271C288.365 253.665 267.103 230.409 247 228"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M163 232C139.27 246.396 128.966 267.837 120 292"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M93.0228 347.996C90.4525 330.039 91.6852 307.132 109.075 296.665C157.969 267.237 151.718 362.878 128.138 345.983"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M293.07 271.039C321.891 269.785 283.781 299.392 290.907 273.038"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M304 324.289C291.859 322.728 282.476 327.953 271 329"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);


const SampleData  = [
  {
    name: "Dr. Aarav Mehta",
    password: "aarav123",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    gender: "male",
    department: "Cardiology",
    phone: "+91 9876543210",
    email: "aarav.mehta@curease.com",
    location: "New Delhi, India",
  },
  {
    name: "Dr. Priya Sharma",
    password: "priya456",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    gender: "female",
    department: "Neurology",
    phone: "+91 9988776655",
    email: "priya.sharma@curease.com",
    location: "Mumbai, India",
  },
  {
    name: "Dr. Rohan Gupta",
    password: "rohan789",
    imageUrl: "https://randomuser.me/api/portraits/men/46.jpg",
    gender: "male",
    department: "Orthopedics",
    phone: "+91 9123456789",
    email: "rohan.gupta@curease.com",
    location: "Pune, India",
  },
  {
    name: "Dr. Kavya Nair",
    password: "kavya2025",
    imageUrl: "https://randomuser.me/api/portraits/women/36.jpg",
    gender: "female",
    department: "Dermatology",
    phone: "+91 9812345678",
    email: "kavya.nair@curease.com",
    location: "Bangalore, India",
  },
  {
    name: "Dr. Aditya Verma",
    password: "aditya999",
    imageUrl: "https://randomuser.me/api/portraits/men/50.jpg",
    gender: "male",
    department: "Pediatrics",
    phone: "+91 9090909090",
    email: "aditya.verma@curease.com",
    location: "Chennai, India",
  },
  {
    name: "Dr. Neha Patel",
    password: "neha@321",
    imageUrl: "https://randomuser.me/api/portraits/women/55.jpg",
    gender: "female",
    department: "Psychiatry",
    phone: "+91 9955443322",
    email: "neha.patel@curease.com",
    location: "Ahmedabad, India",
  },
  {
    name: "Dr. Arjun Singh",
    password: "arjun007",
    imageUrl: "https://randomuser.me/api/portraits/men/60.jpg",
    gender: "male",
    department: "Radiology",
    phone: "+91 9823456789",
    email: "arjun.singh@curease.com",
    location: "Lucknow, India",
  },
  {
    name: "Dr. Ishita Bose",
    password: "ishita123",
    imageUrl: "https://randomuser.me/api/portraits/women/48.jpg",
    gender: "female",
    department: "Microbiology",
    phone: "+91 9876501234",
    email: "ishita.bose@curease.com",
    location: "Kolkata, India",
  },
]

const AddDoctor = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
    image: "",
    gender: "male",
    department: "",
    phone: "",
    email: "",
    location: "",
    joining_date: "",
    today: {
      today: "0",
      patientsSeen: "0",
      status: "Available",
    },
    carts: {
      default: {},
    },
    notification: {},
  });
  const [previewImage,setPreviewImage] = useState(null)
  const handleFileChange = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setData({...data,image:e.target.files[0]});
  };
  async function addDoctor() {
    var pass = true;
    ["name","password","department","phone","email","location"].map(value=>{
        if(data[value]==""){
            toast.error(`${value.toUpperCase()} Field cannot be empty...`)
            pass = false;
        }
    })
    if(!pass)return
    const img = data.image
    if(typeof img != "string"){delete data.image}
    const formData = new FormData();
    formData.append("data",JSON.stringify(data))
    if (img && typeof img!="string") {
        formData.append("image", img)
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/addNewDoctor`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        Credential:"include",
      });
      toast.success("Doctor Has been added Successfully")
      console.log("Success:", res.data);
    } catch (err) {
        toast.error("Got an error adding doctor check the console")
      console.error("Error:", err);
    }


    setPreviewImage(null)
    setData({
    name: "",
    password: "",
    image: "",
    gender: "male",
    department: "",
    phone: "",
    email: "",
    location: "",
    joining_date: "",
    today: {
      today: "0",
      patientsSeen: "0",
      status: "Available",
    },
    carts: {
      default: {},
    },
    notification: {},
  })

  }
  const [randomCount,setRandomCount] = useState(0)
  function generateRandom(){
    setPreviewImage(SampleData[randomCount].imageUrl)
    setData({...data,
        "name": SampleData[randomCount].name,
        "password": SampleData[randomCount].password,
        "image": SampleData[randomCount].imageUrl,
        "gender": SampleData[randomCount].gender,
        "department": SampleData[randomCount].department,
        "phone": SampleData[randomCount].phone,
        "email": SampleData[randomCount].email,
        "location": SampleData[randomCount].location,
    })
    setRandomCount(prev=>{
        if(prev+1==SampleData.length){
            return 0
        }else{
            return prev+1
        }
    })
  }
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="bg-white/80 dark:bg-blue-900/20 p-10 rounded-sm h-[70vh] w-6xl flex flex-col justify-center"
    >
      <div className="grid grid-cols-[auto_1fr] gap-x-10">
        <motion.label initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} htmlFor="doctor-profile-image" className="row-span-4 relative group">
            <input type="file" id="doctor-profile-image" hidden onChange={handleFileChange} />
            <span className="absolute bottom-5 backdrop-blur-xs right-0 hover:scale-110 active:scale-90 cursor-pointer text-blue-800 border-2 border-blue-800 rounded-full p-1 group-hover:text-white group-hover:bg-blue-800 dark:bg-gray-200 dark:group-hover:bg-blue-800 transition-all duration-200"><Pen size={15}/></span>
          {data.image ? <img src={previewImage} className="h-30 w-30 rounded-full" /> :  data.gender == "male" ? MaleDoctorIcon : FemaleDoctorIcon}
        </motion.label>
        <Label className="mb-2">Doctor's Name</Label>
        <Input value={data.name} onChange={e=>setData({...data,"name":e.target.value})} placeholder="Enter Doctors Name" required/>
        <Label className="mb-2 mt-5">Password</Label>
        <Input value={data.password} onChange={e=>setData({...data,"password":e.target.value})} placeholder="Enter Password" required/>
      </div>
      <div className="flex w-full gap-10 items-center  mt-5">
        {/* gender */}
      <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="w-full grid grid-cols-2 gap-x-10">
      <Label className="col-span-2 mb-3">Gender</Label>
        <button className={`flex flex-col items-center justify-center px-8 active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer py-2 gap-2 text-sm ${data.gender=="male"?"shadow-lg bg-gray-600 dark:bg-blue-300/20 rounded-xs text-white":"shadow-sm"}`} onClick={() => setData({ ...data, gender: "male" })}>
          <Mars />
          Male
        </button>
        <button className={`flex flex-col items-center justify-center px-8 active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer py-2 gap-2 text-sm ${data.gender=="female"?"shadow-lg bg-gray-600 dark:bg-blue-300/20 rounded-xs text-white":"shadow-sm"}`} onClick={() => setData({ ...data, gender: "female" })}>
          <Venus />
          Female
        </button>
      </motion.div>
      {/* Phone number */}
      <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className="w-full">

      <Label className="mb-3">Phone No.</Label>
      <Input value={data.phone} onChange={e=>setData({...data,"phone":e.target.value})} placeholder="Enter Phone No." required/>
      </motion.div>
      {/* department */}
      <div className="w-full">
        <Label className="mb-2">Department</Label>
        <Select value={data.department} onValueChange={val=>setData({...data,"department":val})} >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Department</SelectLabel>
          {hospitalDepartments.map((val,index)=>(
            <SelectItem key={index} value={val.name}>{val.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-2 mt-5">

      <Label>Email Id</Label>
      <Label>Location</Label>
      <Input value={data.email} onChange={e=>setData({...data,"email":e.target.value})} placeholder="Enter Email Id." required/>
      <Input value={data.location} onChange={e=>setData({...data,"location":e.target.value})} placeholder="Enter Location" required/>
      </div>
          <div className="flex justify-between items-center">

      <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} onClick={generateRandom} className="outline-none w-max self-end flex bg-red-400 hover:bg-red-500 dark:bg-red-400/20 backdrop-blur-sm dark:hover:bg-red-300/20 cursor-pointer active:scale-90 transition-all duration-150 rounded-xs mt-7 px-10 text-white py-2.5 gap-5">Generate Random <Rabbit/></motion.button>
      <motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} onClick={addDoctor} className="outline-none w-max self-end flex bg-indigo-400 hover:bg-indigo-500 dark:hover:bg-teal-300/20 dark:bg-teal-400/20 backdrop-blur-sm cursor-pointer active:scale-90 transition-all duration-150 rounded-xs mt-7 px-10 text-white py-2.5 gap-5">Add Doctor <Plus/></motion.button>
          </div>
    </motion.section>
  );
};

export default AddDoctor;
