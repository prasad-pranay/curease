import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calculator, RotateCcw } from "lucide-react";

export default function LeanBodyMassCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);

  const calculateLBM = () => {
    if (!weight || !height) {
      setResult({ error: "Please fill all fields." });
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);

    // Formula: Boer Formula (commonly used)
    // Male: LBM = (0.407 × weight) + (0.267 × height) − 19.2
    // Female: LBM = (0.252 × weight) + (0.473 × height) − 48.3
    const lbm =
      gender === "male"
        ? 0.407 * w + 0.267 * h - 19.2
        : 0.252 * w + 0.473 * h - 48.3;

    const fatMass = w - lbm;

    setResult({
      lbm: lbm.toFixed(1),
      fatMass: fatMass.toFixed(1),
      total: w,
    });
  };

  const COLORS = ["#22c55e", "#ef4444"]; // green = lean mass, red = fat mass

  const chartData =
    result && !result.error
      ? [
          { name: "Lean Body Mass", value: parseFloat(result.lbm) },
          { name: "Fat Mass", value: parseFloat(result.fatMass) },
        ]
      : [];

      function reset(){
        setWeight("")
        setHeight("")
        setGender("male")
        setResult(null)
      }
  return (
    <div className="h-full overflow-y-scroll patient-scrollbar text-[var(--text)] bg-[var(--bg)] p-10 ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" w-full bg-white dark:bg-gray-900 shadow-lg rounded-xs p-10 flex gap-10"
      >
        <div className="w-full">
<h1 className="text-4xl font-bold text-center text-green-600 mb-6">
          💪 Lean Body Mass Calculator
        </h1>

        {/* Intro Section */}
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966488.png"
            alt="Lean Body Mass"
            className="mx-auto w-28 mb-4"
          />
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Your <b>Lean Body Mass (LBM)</b> is the weight of everything in your
            body except fat — including muscles, bones, water, and organs. This
            helps understand how much of your body weight is functional tissue.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-green-300 rounded-xs p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border border-green-300 rounded-xs p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-green-300 rounded-xs p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Button */}
        <div className="mt-9 flex gap-10 items-center justify-end">
            <button
              onClick={reset}
              className="bg-red-500 w-full justify-center active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-red-600 text-white px-6 py-2 rounded-xs"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button
              onClick={calculateLBM}
              className="bg-amber-500 hover:bg-amber-600 w-full justify-center active:scale-90 text-white px-6 py-2 rounded-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Calculator size={18} />
              Calculate LBM
            </button>
          </div>
        </div>
        

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-w-[30%] bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-xl p-6 text-center"
          >
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-green-700 mb-2">
                  Lean Body Mass: {result.lbm} kg
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Fat Mass: {result.fatMass} kg
                </p>

                {/* Pie Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%" className="min-w-10 min-h-10">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            cursor="pointer"
                            onMouseOver={(e) =>
                              (e.target.style.fill = "#86efac")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.fill =
                                COLORS[index % COLORS.length])
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </motion.div>
        )}
</motion.div>
        {/* Info Section */}
        <div className="mt-10 bg-[var(--card)] rounded-xs p-10 grid grid-cols-[auto_1fr] gap-x-10 items-center">
          <h3 className="text-4xl font-semibold mb-3 text-green-600 col-span-2 mb-5">
            📘 What is Lean Body Mass?
          </h3>
          <img
            src="/utilities/leanbodymass.png"
            alt="Body balance"
            className="mx-auto h-24 w-max row-span-2"
          />
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            Lean Body Mass (LBM) is the total weight of your body minus all the
            fat. It includes muscles, bones, water, organs, and connective
            tissue. A higher LBM means more muscle and strength.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Understanding LBM helps you set realistic fitness goals and monitor
            progress when building muscle or losing fat. Regular tracking helps
            maintain a strong and balanced physique.
          </p>
        </div>
      
    </div>
  );
}
