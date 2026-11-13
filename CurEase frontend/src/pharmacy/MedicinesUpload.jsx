import { AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AirVent, ScrollText } from "lucide-react";

const MedicinesUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textResult, setTextResult] = useState({extractedText:"",aiText:""});
  const [loading, setLoading] = useState(false);
  const [resultTab,setResultTab] = useState(true)
  const inputRef = useRef(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("no file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); // 👈 must match multer's field name

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/tools/img-to-text`,
        {
          method: "POST",
          body: formData, // no need for headers — fetch handles multipart automatically
        }
      );
      const data = await response.json();
      var ai = data.ai;
      ai = ai.replace("json","")
      ai = ai.replaceAll("```","")
      ai = JSON.parse(ai)

      setTextResult({aiText:ai,extractedText:data.text});

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to extract text");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="h-full pt-10 bg-[var(--bg)] max-w-screen overflow-hidden pb-10">
      <section className="w-5xl mx-auto gap-10 grid grid-cols-[auto_1fr]">
        {/* left side */}
        <div className="flex flex-col bg-[var(--card)] px-10 py-5 h-full shadow-md rounded-lg">
          <p className="text-xl">Upload Prescription</p>
          <p className="text-sm mt-2">
            Please attach a prescription to proceed
          </p>
          <div
            onClick={() => {
              if (selectedFile && !textResult.extractedText) {
                handleUpload();
              } else {
                inputRef.current.click();
              }
            }}
            disabled={loading}
            className={`active:scale-90 transition-all duration-200 cursor-pointer mt-10 flex gap-5 items-center rounded-md border-2  overflow-hidden ${
              selectedFile
                ? textResult.extractedText ? "border-red-600 hover:bg-red-500/50" : "border-teal-600 hover:bg-teal-300/50 dark:hover:bg-teal-600"
                : "border-gray-300 hover:bg-[var(--bg)]/50"
            }`}
          >
            <img
              src="https://onemg.gumlet.io/marketing/tw0dco5xexdieshf2lxs.svg"
              alt=""
              className="bg-gray-300 px-4 py-3"
            />
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
            <p className="uppercase text-sm">
              {selectedFile ? (textResult.extractedText ? "Upload Another" : "Start Analyzing") : "Upload New"}
            </p>
          </div>
          <AnimatePresence>
            {!selectedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="mt-5 flex gap-5 items-center rounded-md border-2 border-gray-300 overflow-hidden"
              >
                <img
                  src="https://onemg.gumlet.io/marketing/suctp3js3oqjw7lovs7p.svg"
                  alt=""
                  className="bg-gray-300 px-4 py-3"
                />
                <p className="uppercase text-sm">Saved Prescriptions</p>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-base mt-10 mb-5">Attached Prescriptions</p>
          {!selectedFile && (
            <div className="flex gap-3 items-center">
              <img
                src="https://assets.1mg.com/hkp/2.0.0/static/images/empty.png"
                alt=""
                className="bg-gray-300 px-4 py-3 rounded-sm"
              />
              <p className="text-sm">
                Uploaded Prescriptions will <br /> be shown here
              </p>
            </div>
          )}
          {selectedFile && (
            <div className="bg-[var(--bg)] flex flex-col justify-center items-center gap-3 py-5 px-5 rounded-sm">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt=""
                className="rounded-sm h-20"
              />
              <p className="text-xs max-w-40 mt-2 text-center">
                {selectedFile.name}
              </p>
            </div>
          )}
        </div>
        {/* right side */}
        <div className="flex flex-col bg-[var(--card)] px-10 py-5 h-full overflow-y-scroll max-h-120 patient-scrollbar shadow-md rounded-lg">
          {loading && <div className="flex flex-col items-center justify-center gap-15 w-full h-full">
<div className="flex-col gap-4 w-full flex items-center justify-center">
  <div
    className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>
<p className="text-xl">Loading...</p>
            </div>}
          {textResult.extractedText.length==0 && !loading && (
            <div>
              <p className="text-xl mb-5">Guide for a valid prescription</p>
              <div className="flex gap-10 items-center">
                <img src="/medicine-template.svg" alt="" className="h-[50vh]" />
                <ul className="text-sm">
                  <li className="mb-3 list-disc">
                    Don’t crop out any part of the image
                  </li>
                  <li className="mb-3 list-disc">Avoid blurred image</li>
                  <li className="mb-3 list-disc">
                    Include details of doctor and patient + clinic visit date
                  </li>
                  <li className="mb-3 list-disc">
                    Medicines will be dispensed as per prescription
                  </li>
                  <li className="mb-3 list-disc">
                    Supported files type: jpeg , jpg , png , pdf
                  </li>
                  <li className="list-disc">Maximum allowed file size: 5MB</li>
                </ul>
              </div>
            </div>
          )}
          {textResult.extractedText.length>0 && <div>
            {/* tabs */}
            <div className="flex items-center gap-5 bg-[var(--bg)] px-5 py-2 rounded-sm">
                <p className={`w-full flex items-center justify-center gap-3 text-base cursor-pointer ${resultTab ? "bg-[var(--card)]":""} active:scale-90 py-2 rounded-sm`} onClick={()=>setResultTab(true)} ><ScrollText/>Extracted Text</p>
                <p className={`w-full flex items-center justify-center gap-3 text-base cursor-pointer ${!resultTab ? "bg-[var(--card)]":""} active:scale-90 py-2 rounded-sm`} onClick={()=>setResultTab(false)} ><AirVent/>AI Info</p>
            </div>
            {resultTab && <p className="text-sm mt-5">
            {textResult.extractedText}
            </p>}
            {!resultTab && <p className="text-sm mt-5">
            {Object.keys(textResult.aiText).map((value,index)=>{
              const itsVal = textResult.aiText[value]
              const final = typeof itsVal=="string" ? itsVal : JSON.stringify(itsVal)
              return <div key={index}>
                <p className="text-xl">{value}</p>
                <p className="text-xs">{final}</p>
              </div>
            })}
            </p>}
        </div>}
        </div>
      </section>
    </section>
  );
};

export default MedicinesUpload;
