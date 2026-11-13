import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { History } from 'lucide-react';
import toast from 'react-hot-toast';

function changePlan(plan){
    toast.success(`Plan Changed to ${plan}`)
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/patient/change-plan`, {
        method: "POST",
        credentials: "include", // sends cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"newPlan":plan}),
      });
}

export default function Pricing({plan}) {
    const [currPlan,setCurrPlan] = useState(plan.toLowerCase())
    return (
        <div className="flex flex-wrap items-center justify-center gap-6 h-screen relative">

      {/* BASIC PLAN */}
      <motion.div
      onClick={()=>{changePlan("Basic");setCurrPlan("basic")}}
        whileHover={{ scale: 1.05, y: -8 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className={`w-72 cursor-pointer ${"basic"==currPlan ? "bg-indigo-500 text-white":"bg-white text-gray-800/80"} text-center  border border-gray-200 p-6 pb-16 rounded-lg shadow-sm`}
      >
        <p className="font-semibold">Basic</p>
        <h1 className="text-3xl font-semibold">
          ₹199 <span className={` ${"basic"==currPlan ?"text-white":"text-gray-500" } text-sm font-normal`}>/month</span>
        </h1>

        <ul className={`list-none ${"basic"==currPlan ?"text-gray-100": "text-gray-500"} text-sm mt-6 space-y-2`}>
          <li className="flex items-center gap-2">
            ✔<p>AI Symptom Checker (5/day)</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Basic Health Insights</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Track up to 10 Medical Reports</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Nutrition Scan (Limited)</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Standard Support</p>
          </li>
        </ul>

        <button className={`${"basic"==currPlan ? "bg-white text-indigo-500 hover:bg-gray-200":"bg-indigo-500 text-white hover:bg-indigo-600" } text-sm w-full py-2 rounded  font-medium mt-7  transition-all`}>
          {"basic"==currPlan ? "Current Plan" : "Get Started"}
        </button>
      </motion.div>

      {/* PRO PLAN */}
      <motion.div
      onClick={()=>{changePlan("Pro");setCurrPlan("pro")}}
        whileHover={{ scale: 1.08, y: -10 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className={`w-72 cursor-pointer ${"pro"==currPlan ? "bg-indigo-500 text-white":"bg-white text-gray-800/80"} relative text-center border border-gray-500/30 p-6 pb-14 rounded-lg shadow-md`}
      >
        <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] text-white rounded-full">
          Most Popular
        </p>

        <p className="font-semibold pt-2">Pro</p>
        <h1 className="text-3xl font-semibold">
          ₹499 <span className="text-sm font-normal">/month</span>
        </h1>

        <ul className={`list-none ${"pro"==currPlan ?"text-gray-100": "text-gray-500"} text-sm mt-6 space-y-2`}>
          <li className="flex items-center gap-2">
            ✔<p>Unlimited Symptom Checks</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Advanced Medical Insights</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Track Unlimited Reports</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Unlimited Nutrition Analysis</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Doctor Chat (Limited)</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Priority Support</p>
          </li>
        </ul>

        <button className={`${"pro"==currPlan ? "bg-white text-indigo-500 hover:bg-gray-200":"bg-indigo-500 text-white hover:bg-indigo-600" } text-sm w-full py-2 roundedfont-medium mt-7 transition-all`}>
          {"pro"==currPlan ? "Current Plan" : "Get Started"}
        </button>
      </motion.div>

      {/* ENTERPRISE PLAN */}
      <motion.div
      onClick={()=>{changePlan("Enterprise");setCurrPlan("enterprise")}}
        whileHover={{ scale: 1.05, y: -8 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className={`w-72 cursor-pointer ${"enterprise"==currPlan ? "bg-indigo-500 text-white":"bg-white text-gray-800/80"} text-center border border-gray-200 p-6 pb-16 rounded-lg shadow-sm`}
      >
        <p className="font-semibold">Enterprise</p>
        <h1 className="text-3xl font-semibold">
          ₹999 <span className={`${"enterprise"==currPlan ?"text-white":"text-gray-500" } text-sm font-normal`}>/month</span>
        </h1>

        <ul className={`list-none ${"enterprise"==currPlan ?"text-gray-100": "text-gray-500"} text-sm mt-6 space-y-2`}>
          <li className="flex items-center gap-2">
            ✔<p>Full Access to All Features</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Dedicated 24×7 Doctor Support</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Organization Report Dashboard</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Team Health Monitoring</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Emergency Assistance Panel</p>
          </li>
          <li className="flex items-center gap-2">
            ✔<p>Personal Health Advisor</p>
          </li>
        </ul>

        <button className={`${"enterprise"==currPlan ? "bg-white text-indigo-500 hover:bg-gray-200":"bg-indigo-500 text-white hover:bg-indigo-600" }  text-sm w-full py-2 rounded font-medium mt-7  transition-all`}>
          {"enterprise"==currPlan ? "Current Plan" : "Get Started"}
        </button>
      </motion.div>

      {/* BOTTOM ACTION */}
      <div className="absolute left-1/2 bottom-7 flex justify-evenly w-full items-center gap-3 -translate-x-1/2">
        {currPlan=="basic" && <p className='text-xl text-gray-700'>You do not want the benefits ?</p>}
        <Link
          to="/ask"
          className="shadow-sm hover:shadow-lg hover:-translate-y-1 px-15 py-3 text-slate-700 font-medium rounded-xs bg-white transition-all duration-300 hover:scale-110 cursor-pointer flex items-center gap-3"
        >
            <History size={18} />
          Go Back
        </Link>
      </div>
    </div>
    );
};
