import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { Calculator, RotateCcw } from "lucide-react";

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState(null);

  const calculateIdealWeight = () => {
    if (!height || !weight) {
      setResult({ error: "Please fill all fields." });
      return;
    }

    const h = parseFloat(height);

    // Devine Formula for Ideal Body Weight (IBW)
    const base = gender === "male" ? 50 : 45.5;
    const idealWeight = base + 2.3 * ((h / 2.54 - 60) > 0 ? (h / 2.54 - 60) : 0);

    const lowerRange = idealWeight * 0.9;
    const upperRange = idealWeight * 1.1;

    setResult({
      idealWeight: idealWeight.toFixed(1),
      lowerRange: lowerRange.toFixed(1),
      upperRange: upperRange.toFixed(1),
      userWeight: parseFloat(weight),
    });
  };

  const chartData = result
    ? [
        { range: "Underweight", weight: result.lowerRange - 5 },
        { range: "Ideal Range", weight: result.idealWeight },
        { range: "Overweight", weight: result.upperRange + 5 },
      ]
    : [];

    const colors = ["#60a5fa", "#22c55e", "#f97316"]; // blue, green, orange
  const hoverColors = ["#3b82f6", "#16a34a", "#ea580c"];
      function reset(){
        setHeight("")
        setWeight("")
        setGender("male")
        setResult(null)

      }
  return (
    <div className="h-full overflow-y-scroll patient-scrollbar text-[var(--text)] bg-[var(--bg)] px-10 ">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" w-full bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-10 flex gap-10"
      >
        <div>
            <h1 className="text-4xl font-bold text-center text-amber-600 mb-6">
          🏋️‍♀️ Ideal Weight Calculator
        </h1>

        {/* Info Section */}
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3011/3011270.png"
            alt="Ideal Weight Illustration"
            className="mx-auto w-28 mb-4"
          />
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This calculator estimates your <b>ideal body weight</b> range based on
            your height and gender. It helps determine a healthy range where your
            body can function optimally — not too underweight or overweight.
          </p>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-medium">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border border-amber-300 rounded-xs p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-amber-300 rounded-xs p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-amber-300 rounded-xs p-2 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-[var(--card)]"
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
              className="w-full justify-center bg-red-500 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-red-600 text-white px-6 py-2 rounded-xs"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button
              onClick={calculateIdealWeight}
              className="w-full justify-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Calculator size={18} />
              Calculate Ideal Weight
            </button>
          </div>
        </div>

        {/* Result Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col justify-center items-center bg-[var(--bg)] dark:bg-gray-800 rounded-xs p-6 text-center"
          >
            {result.error ? (
              <div className="flex flex-col items-center gap-10">
                <img src="/utilities/why.webp" alt="" className="h-30 w-max" />
                <p className="text-red-500  text-2xl">{result.error}</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-amber-700 mb-2">
                  Your Ideal Weight: {result.idealWeight} kg
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Ideal Range: {result.lowerRange} kg – {result.upperRange} kg
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Your current weight: {result.userWeight} kg
                </p>

                {/* Chart Section */}
                <div className="h-64 w-full mt-10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #ddd",
              color:"black"
            }}
          />
          <Bar dataKey="weight" radius={[10, 10, 0, 0]} isAnimationActive={false} activeDot={{r: 8,  fill: '#ff7300', }}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                cursor="pointer"
                className="hello"
                onMouseOver={(e) => (e.target.style.fill = hoverColors[index % hoverColors.length])}
                onMouseOut={(e) => (e.target.style.fill = colors[index % colors.length])}
              />
            ))}
          </Bar>
          <ReferenceLine
            y={result.userWeight}
            label={{
              value: "You",
              position: "top",
              fill: "#ef4444",
              fontSize: 12,
            }}
            stroke="#ef4444"
            strokeDasharray="4 4"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
              </>
            )}
          </motion.div>
        )}

        
      </motion.div>

      {/* Info Section 2 */}
        <div className="mt-10 bg-[var(--card)] rounded-xs p-10 grid grid-cols-[auto_1fr] gap-x-10 items-center">
          <h3 className="text-4xl font-semibold mb-3 text-amber-600 col-span-2 mb-5">
            📘 What is the Ideal Weight?
          </h3>
          <img
            src="/utilities/weight.png"
            alt="Body balance"
            className="mx-auto h-24 w-max row-span-2"
          />
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            The <b>Ideal Body Weight (IBW)</b> is an estimated weight that is
            believed to be optimal for health and performance. It’s not about
            appearance, but about maintaining the best balance between muscle,
            fat, and overall health.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Factors like muscle mass, bone structure, and body composition also
            play a big role. This range gives you a **reference point** to track
            and adjust your fitness goals effectively.
          </p>
        </div>
    </div>
  );
}
