import React, { useEffect, useState } from "react";
import { hospitalDepartments } from "../BackendFunctions";
import {
  Check,
  ChevronDownIcon,
  X,
  CalendarArrowUp,
  Stethoscope,
  ChevronLeft,
  Pill,
  Bot,
  Trash,
  User,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { symptompsList } from "../BackendFunctions";
import {AnimatePresence, motion} from "framer-motion";

import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import toast from "react-hot-toast";

function Home({ department, appointments, patientList, setSpecific }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [currentTab, setCurrentTab] = useState(true);
  const currentDepartment = hospitalDepartments.find(
    (value) => value.name.slice(0, 3) == department.slice(0, 3)
  );
  // console.log(patientList)
  const [showCompleted, setShowCompleted] = useState(false);
  return (
    <section className="h-full w-full overflow-hidden flex flex-col px-10 py-10 rounded-sm">
      {/* header */}
      <div className="w-full flex gap-1 items-center pb-1">
        <button
          className={`${
            currentTab
              ? "bg-[var(--button)]"
              : "hover:bg-gray-300 dark:hover:bg-gray-700"
          } transition duration-100 active:scale-90 cursor-pointer px-25 py-2 rounded-xs text-white grid grid-cols-[auto_1fr] gap-x-10 items-center justify-start`}
          onClick={() => setCurrentTab(true)}
        >
          <img src={currentDepartment.image} alt="" className="h-20 " />
          <span className={`text-2xl text-left ${currentTab?"text-white":"text-[var(--text)]"}`}>{currentDepartment.name}</span>
        </button>
        <button
          className={`${
            !currentTab
              ? "bg-[var(--button)]"
              : "hover:bg-gray-300 dark:hover:bg-gray-700"
          } transition duration-100 active:scale-90 cursor-pointer px-25 py-2 rounded-xs text-white grid grid-cols-[auto_1fr] gap-x-10 items-center justify-start`}
          onClick={() => setCurrentTab(false)}
        >
          <img src="/other.png" alt="" className="h-20 " />
          <span className={`text-2xl text-left ${!currentTab?"text-white":"text-[var(--text)]"}`}>Other Department</span>
        </button>
      </div>

      {/* filters */}
      <aside className="flex items-center gap-10">
        <label className="flex gap-3 items-center cursor-pointer relative mt-5 mb-5">
          <input type="checkbox" className="hidden peer" onChange={e=>setShowCompleted(e.target.checked)} />
          <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-blue-600"></span>
          <svg
            className="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2"
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m10.092.952-.005-.006-.006-.005A.45.45 0 0 0 9.43.939L4.162 6.23 1.585 3.636a.45.45 0 0 0-.652 0 .47.47 0 0 0 0 .657l.002.002L3.58 6.958a.8.8 0 0 0 .567.242.78.78 0 0 0 .567-.242l5.333-5.356a.474.474 0 0 0 .044-.65Zm-5.86 5.349V6.3Z"
              fill="#2563EB"
              stroke="#2563EB"
              strokeWidth=".4"
            />
          </svg>
          <span className="text-gray-700 dark:text-gray-300 select-none">
            Show Completed
          </span>
        </label>
        <p className="ml-auto"></p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </aside>
      <AnimatePresence>
        <aside className="h-full overflow-y-auto overflow-x-hidden patient-scrollbar flex flex-wrap gap-5 mt-5">
        {appointments
          .filter((value) => {
            const isPending = showCompleted ? true : value.status == 0;
            const deptMatch =
              !currentTab ||
              currentDepartment.name.toLowerCase() === value.department;

            // return !showCompleted && isPending && deptMatch;
            return  isPending && deptMatch;
          })
          .map((value) => {
            const patient = patientList.find(
              (p) => p.contact.email === value.email
            );

            const img = patient?.imageUrl
              ? `${import.meta.env.VITE_BACKEND_API_URL}${patient.imageUrl}`
              : "/nouser.jpg";

            return (
              <motion.div 
              initial={{opacity:0,scale:0}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:0}}
                key={value._id}
                className="border hover:bg-[var(--card)] active:scale-90 h-max shadow transition duration-200 grid w-max grid-cols-[auto_1fr] gap-x-10 bg-[var(--bg)]/50 hover:bg-[var(--bg)] cursor-pointer rounded-sm px-10 py-4"
              >
                <img
                  src={img}
                  alt=""
                  className={`w-max ${
                    currentTab ? "row-span-2 h-20" : "row-span-3 h-25"
                  } rounded-sm`}
                />

                <p className="text-2xl">{patient?.name ?? "Unknown"}</p>

                {!currentTab && (
                  <p className="text-xs pt-1 pb-2 capitalize flex items-center gap-2">
                    <Stethoscope size={14} />
                    {value.department}
                  </p>
                )}

                {/* actions */}
                {value.status==0 && <div className="flex gap-5">
                  <button
                    onClick={() =>
                      setSpecific({
                        appointmentId: value._id,
                        patientId: patient?._id,
                      })
                    }
                    className="flex items-center text-sm  gap-2 py-2 h-max px-5 cursor-pointer rounded-sm group bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check
                      size={18}
                      className="group-hover:scale-105 transition-transform duration-100"
                    />
                    {!currentTab && "Diagnose"}
                  </button>

                  {currentTab && (
                    <>
                      <button
                        onClick={() => deleteAppointment(value._id)}
                        className="py-2 h-max px-5 cursor-pointer rounded-sm group bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <X
                          size={18}
                          className="group-hover:scale-105 transition-transform duration-100"
                        />
                      </button>

                      <button className="py-2 h-max px-5 cursor-pointer rounded-sm group bg-violet-600 hover:bg-violet-700 text-white">
                        <CalendarArrowUp
                          size={18}
                          className="group-hover:scale-105 transition-transform duration-100"
                        />
                      </button>
                    </>
                  )}
                </div>}

                {value.status!=0 && <div>
                    <p className="flex items-center gap-2 text-xs px-4 py-1"><User size={14}/>{value.docName}</p>  
                    <p className="flex items-center gap-2 text-xs px-4 py-1"><Clock size={14}/>{value.completedTime}/2025</p>  
                  </div>}
                {value.status!=0 && <div className="col-span-2 mt-4 flex flex-col">
                  {value.rating!=-1 && <div className="flex gap-2 items-center mb-2">
                    Rated : {[0,1,2,3,4].map((rate)=>(
              <Star size={17} className={`hover:scale-110 ${rate<=value.rating ? "fill-yellow-500":""} `} />
            ))}
                  </div>}
                  <button className="flex items-center gap-2 text-xs bg-teal-500 w-full justify-center text-white px-4 py-1">Completed <Check size={14}/></button>  
                </div>}
              </motion.div>
            );
          })}

          {appointments
          .filter((value) => {
            const isPending = showCompleted ? true : value.status == 0;
            const deptMatch =
              !currentTab ||
              currentDepartment.name.toLowerCase() === value.department;

            return  isPending && deptMatch;
          }).length==0 && <motion.div 
              initial={{opacity:0,scale:0}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:0}} className="flex flex-col justify-center items-center gap-5 w-full">
              <img src="/null.gif" alt="" className="h-40 w-max" />
              <h1 className="text-2xl">No Appointments today!!!</h1>
            </motion.div>}
      </aside>
      </AnimatePresence>
    </section>
  );
}

function addAppointment(name,age,gender,id,items,docName,docId,notes,appointmentId){
  fetch(`${import.meta.env.VITE_BACKEND_API_URL}/appointments/mark-appointment`,{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        // name,age,gender,id,items,docName,docId
        body: JSON.stringify({
          name:name,
          age:age,
          gender:gender,
          id:id,
          items:items,
          docName:docName,
          docId:docId,
          notes:notes,
          appointmentId:appointmentId
        }),
    }).then(data=>data.json()).then(data=>{
      console.log(data)
    })
}

function Diagnose({ setSpecific, specific, patientList,docName,docId }) {
  const [currentTab, setCurrentTab] = useState(0);
  const currentPatient = patientList.find(
    (value) => value._id == specific.patientId
  );
  const img = currentPatient?.imageUrl
    ? `${import.meta.env.VITE_BACKEND_API_URL}${currentPatient.imageUrl}`
    : "/nouser.jpg";
  const [search, setSearch] = useState("");
  const [medicineSuggestion, setMedicineSuggestion] = useState([]);
  const [qty,setqty] = useState(0)
  const [medicine, setMedicine] = useState([]);
  const [currSelectedMed,setCurrSelectedMed] = useState({})
  async function getMedicine() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/pharmacy/search?q=${search}`
    );
    const result = await res.json();
    setMedicineSuggestion(result.slice(0, 5));
  }
  useEffect(() => {
    if (search == "") {
      setMedicineSuggestion([]);
      return;
    }
    getMedicine();
  }, [search]);
  function addMedicine(){
    if(Object.keys(currSelectedMed).length==0){
      toast.error("Enter a medicine name first")
      return
    }else if(qty==0){
      toast.error("Select the quantity")
      return
    }
    currSelectedMed["qty"] = qty;
    medicine.push(currSelectedMed);
    setCurrSelectedMed({})
    setSearch("")
    setqty(0)
    setMedicineSuggestion([])
  }


  const [predictedDisease,setPredictedDisease] = useState([])
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [sympSearch, setSympSearch] = useState("");
  const [notes,setNotes] = useState("")
    const toggleSymptom = (symptom) => {
      setTimeout(() => {
        setSympSearch("")
      }, 200);
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };
  const filteredSymptoms = symptompsList.filter((s) =>
      s.toLowerCase().includes(sympSearch.toLowerCase())
    );
  useEffect(() => {
      if(selectedSymptoms.length==0){
        setPredictedDisease([])
        return
      }
      predict()
    }, [selectedSymptoms])
  function predict(){
    fetch("http://127.0.0.1:8000/get-symptoms",{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data:selectedSymptoms,count:8}),
    }).then(data=>data.json()).then(data=>{
      console.log(data.data)
      setPredictedDisease(data.data)
    })
  }
  return (
    <section className=" h-[78vh] w-full overflow-hidden flex flex-col px-10 py-10 bg-[var(--card)] rounded-sm">
      {/* header */}
      <div className="flex gap-10 items-center">
        <ChevronLeft
          className="hover:scale-110 active:scale-90 transition-transform duration-100 cursor-pointer"
          onClick={() => setSpecific({ appointmentId: null, patientId: null })}
        />
        <div className="flex gap-5 items-center">
          <img src={img} alt="" className="h-10 rounded" />
          <p>{currentPatient && currentPatient.name}</p>
        </div>
        <Button onClick={()=>{addAppointment(currentPatient.name,"null","unspecified",currentPatient._id,medicine,docName,docId,notes,specific.appointmentId);setSpecific({ appointmentId: null, patientId: null })}} className="bg-teal-600 hover:bg-teal-700 cursor-pointer text-white w-max px-10 flex items-center ml-auto">
          Mark Complete <Check />
        </Button>
      </div>
      {/* tabs */}
      <div className="flex gap-5 items-center px-5 py-2 bg-[var(--bg)] rounded mt-5">
        <button
          className={`w-full py-2 rounded-sm flex items-center gap-5 transition duration-150 active:scale-90 cursor-pointer justify-center ${
            currentTab == 0
              ? "bg-[var(--button)] text-white"
              : "bg-[var(--card)]"
          }`}
          onClick={() => setCurrentTab(0)}
        >
          Medicine
          <Pill />
        </button>
        <button
          className={`w-full py-2 rounded-sm flex items-center gap-5 transition duration-150 active:scale-90 cursor-pointer justify-center ${
            currentTab == 1
              ? "bg-[var(--button)] text-white"
              : "bg-[var(--card)]"
          }`}
          onClick={() => setCurrentTab(1)}
        >
          Symptoms
          <Stethoscope />
        </button>
        <button
          className={`w-full py-2 rounded-sm flex items-center gap-5 transition duration-150 active:scale-90 cursor-pointer justify-center ${
            currentTab == 2
              ? "bg-[var(--button)] text-white"
              : "bg-[var(--card)]"
          }`}
          onClick={() => setCurrentTab(2)}
        >
          Rica Ai
          <Bot />
        </button>
      </div>
      <aside className="h-full flex flex-col overflow-y-auto patient-scrollbar">
        {currentTab == 0 && (
          <>
            <div className="h-full">
              {/* add medicine header */}
              <div className="flex mt-5 items-center gap-5 px-2 py-2 rounded">
                <div className="w-full relative">
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter a Medicine name"
                  />
                  <div className="absolute top-[110%] bg-[var(--bg)]">
                    {medicineSuggestion.map((value, index) => (
                      <div
                        key={index}
                        onClick={()=>{setCurrSelectedMed(value);setMedicineSuggestion([value])}}
                        className="flex gap-3 active:scale-90 transition duration-150 hover:bg-[var(--card)] px-5 py-2 cursor-pointer"
                      >
                        <img
                          src={value["Image URL"]}
                          alt=""
                          className="h-5 w-5"
                        />
                        <p>{value["Medicine Name"]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Select value={qty} onValueChange={setqty}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Quantity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Quantity</SelectLabel>
          {[1,2,3,4,5,6,7,8,9,10].map((value,index)=>(
            <SelectItem key={index} value={value}>{value}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
                <Check
                onClick={addMedicine}
                  className="border px-2 py-2 rounded cursor-pointer hover:text-teal-500 hover:border-teal-500 active:scale-90"
                  size={35}
                />
              </div>

              {search=="" && <div>
              {/* show added medicine */}
              <Label className="mt-5 mb-2">Added Medicines</Label>
              {medicine.map((value, index) => (
                <div
                key={index}
                className="flex gap-3 transition duration-150 hover:bg-[var(--bg)] px-5 py-2 cursor-pointer"
                >
                        <img
                          src={value["Image URL"]}
                          alt=""
                          className="h-5 w-5"
                          />
                        <p>{value["Medicine Name"]}</p>
                        <p className="ml-auto mr-5">₹{value["price"]}</p>
                        <p className="mr-5">QTY: {value['qty']}</p>
                        <Trash className="hover:scale-105 hover:stroke-red-500 transition duration-100 cursor-pointer" onClick={()=>setMedicine(prev => prev.filter((_, i) => i !== index))}/>
                      </div>
                    ))}
                    </div>}

            </div>
            <Label className="mb-2 mt-5">Suggestions?</Label>
            <Textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes for treatment"></Textarea>
          </>
        )}


        {currentTab==1 && <section className="grid mt-5 grid-cols-2 grid-rows-[auto_1fr] max-h-10 gap-x-10">
          <div>
            <Input placeholder="Search for a symptoms" value={sympSearch} onChange={e=>setSympSearch(e.target.value)} />
          </div>
          <div className="row-span-2">
            {predictedDisease.length>0 && <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Disease</TableHead>
              <TableHead>Prediction %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predictedDisease.map((value,index)=>(
              <TableRow key={index}>
              <TableCell className="font-medium">{value[0]}</TableCell>
              <TableCell>{value[1]}</TableCell>
            </TableRow>
            ))
            }
          </TableBody>
        </Table>}
          </div>
            <div className="flex flex-wrap gap-4 justify-center mt-5 h-70 overflow-y-auto patient-scrollbar">
            {filteredSymptoms.map((symptom, idx) => (
              <motion.div
                key={idx}
                onClick={() => toggleSymptom(symptom)}
                whileTap={{ scale: 0.9 }}
                className={`cursor-pointer w-32 h-32 flex items-center justify-center rounded-full border-2 border-purple-300 font-semibold text-center text-sm transition-all ${
                  selectedSymptoms.includes(symptom)
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-white/20 hover:bg-purple-100/40 dark:hover:bg-white/40"
                }`}
              >
                {symptom}
              </motion.div>
            ))}
          </div>
          
        </section>}
      </aside>
    </section>
  );
}

function deleteAppointment(appointmentId) {
  fetch(`${import.meta.env.VITE_BACKEND_API_URL}/appointments/delete`, {
    method: "POST",
    credentials: "include", // sends cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: appointmentId }),
  });
}

const DoctorAppointment = ({ department, appointments,docName,docId }) => {
  const [patientList, setPatientList] = useState([]);
  const [specific, setSpecific] = useState({
    appointmentId: null,
    patientId: null,
  });
  const [homePage, setHomePage] = useState(true);
  useEffect(() => {
    if (specific.appointmentId == null || specific.patientId == null) {
      setHomePage(true);
      return;
    }
    setHomePage(false);
  }, [specific]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/doctor/list-patients`)
      .then((data) => data.json())
      .then((data) => {
        setPatientList(data.data);
      });
  }, []);

  return (
    <main className="flex h-full">
      {homePage ? (
        <Home
          department={department}
          setSpecific={setSpecific}
          patientList={patientList}
          appointments={appointments}
        />
      ) : (
        <Diagnose
          docName={docName}
          docId={docId}
          setSpecific={setSpecific}
          specific={specific}
          patientList={patientList}
        />
      )}
    </main>
  );
};

export default DoctorAppointment;
