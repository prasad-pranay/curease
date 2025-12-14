import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { symptompsList } from "../../BackendFunctions";
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

const DiseasePredictionPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [search, setSearch] = useState("");
  const [predictedDisease,setPredictedDisease] = useState([])
  const [predictCount,setPredictCount] = useState(5)
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    predict()
  };

  function predict(){
    fetch("http://127.0.0.1:8000/get-symptoms",{
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data:selectedSymptoms,count:predictCount}),
    }).then(data=>data.json()).then(data=>{
      console.log(data.data)
      setPredictedDisease(data.data)
    })
  }

  useEffect(() => {
    if(selectedSymptoms.length==0){
      setPredictedDisease([])
      return
    }
    predict()
  }, [selectedSymptoms])
  

  const filteredSymptoms = symptompsList.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // <div className="h-full overflow-y-scroll bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 text-white p-6 font-sans">
    <div className="h-full overflow-y-scroll patient-scrollbar bg-[var(--bg)] text-[var(--text)] p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <aside className="grid grid-cols-2 items-center bg-[var(--card)] mb-5 rounded-sm py-10">

        <div className="text-center">
          <h1 className="text-5xl mb-3 font-ligth">
            🩺 Disease Predictor
          </h1>
          <p className="text-lg text-[var(--button)] ">
            Select your symptoms and get a preliminary prediction
          </p>
        </div>
        <div className="max-h-80 overflow-y-auto pr-10 patient-scrollbar">
          {predictedDisease && <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Disease</TableHead>
              <TableHead>Prediction %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predictedDisease.map((value,index)=>(
              <TableRow>
              <TableCell className="font-medium">{value[0]}</TableCell>
              <TableCell>{value[1]}</TableCell>
            </TableRow>
            ))
            }
          </TableBody>
        </Table>}
        </div>
        </aside>


        

        {/* Symptom Selection */}
        <div className="bg-[var(--card)] backdrop-blur-md rounded-sm p-8 shadow-xl mb-8">
          <div className="flex items-center gap-10 mb-6 ">

          <input
            type="text"
            placeholder="Search symptoms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-sm border text-black font-medium placeholder-black/50 dark:placeholder-white/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <div>
              <p className="whitespace-nowrap text-[9px] uppercase mb-1 w-60">Prediction Counts</p>
              <Select value={predictCount} onValueChange={val=>setPredictCount(val)} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Department</SelectLabel>
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((val,index)=>(
                    <SelectItem key={index} value={val}>{val}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>

            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-2.5 whitespace-nowrap bg-[var(--button)] hover:bg-[var(--button)]/80 rounded-sm cursor-pointer active:scale-90 text-white text-lg transition"
            >
              Predict Disease
            </motion.button>
            <motion.button
              onClick={()=>{setPredictedDisease([]);setSelectedSymptoms([])}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-2.5 whitespace-nowrap bg-red-600 hover:bg-red-700 rounded-sm cursor-pointer active:scale-90 text-white text-lg transition"
            >
              Reset Symptoms
            </motion.button>
            </div>

          <div className="flex flex-wrap gap-4 justify-center mt-5">
            {filteredSymptoms.map((symptom, idx) => (
              <motion.div
                key={idx}
                onClick={() => toggleSymptom(symptom)}
                whileTap={{ scale: 0.9 }}
                className={`cursor-pointer px-10 py-3 capitalize flex items-center justify-center rounded-sm border-2 border-purple-300 text-center text-xs transition-all ${
                  selectedSymptoms.includes(symptom)
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-white/20 hover:bg-[var(--button)] hover:text-white dark:hover:bg-white/40"
                }`}
              >
                {symptom}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <section className="mb-12 mt-10 bg-[var(--card)] backdrop-blur-md p-10 rounded-sm shadow-lg text-center">
          <h2 className="text-4xl font-bold text-black dark:text-purple-200 mb-4">
            ℹ️ Why Use This Tool?
          </h2>
          <p className="dark:text-purple-100 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Early detection of potential diseases based on symptoms can help you
            consult professionals in time. This tool gives a preliminary
            prediction to guide you, but should not replace medical advice.
          </p>
        </section>

        {/* Sample Symptoms */}
        <section className="mb-12 text-center bg-[var(--card)] p-10 rounded-sm shadow-lg">
          <h2 className="text-4xl font-bold text-black dark:text-purple-200 mb-10">
            📝 Sample Symptoms
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Fever", "Cough", "Fatigue", "Headache"].map((s, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full bg-purple-500 text-white font-semibold shadow-md"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default DiseasePredictionPage;
