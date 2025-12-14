import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Calendar,
  CircleSmall,
  Dna,
  Mars,
  RotateCcw,
  Ruler,
  User,
  Venus,
  Weight,
} from "lucide-react";

export default function BmrCalculator() {
  const [unit, setUnit] = useState("metric");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmr, setBmr] = useState(null);

  const calculateBMR = () => {
    if (!age || !height || !weight) {
      setBmr("Please fill all fields correctly.");
      return;
    }

    let h = parseFloat(height);
    let w = parseFloat(weight);

    if (unit === "imperial") {
      h *= 2.54; // inches to cm
      w *= 0.453592; // lbs to kg
    }

    let result;
    if (gender === "male") {
      result = 88.362 + 13.397 * w + 4.799 * h - 5.677 * age;
    } else {
      result = 447.593 + 9.247 * w + 3.098 * h - 4.33 * age;
    }

    setBmr(result.toFixed(2));
  };

  function reset() {
    setUnit("metric");
    setGender("");
    setAge("");
    setHeight("");
    setWeight("");
    setBmr("");
  }

  return (
    <main className="h-full overflow-y-scroll  patient-scrollbar bg-[var(--bg)] text-[var(--text)] font-light px-10 pt-5">
      {/* Main Section */}
        {/* Calculator */}
        <section className="text-center grid grid-cols-[1fr_1fr] gap-x-10">
          {/* left side */}
          <div className="hover:-translate-y-1 transition-transform duration-300  bg-[var(--card)] px-10 py-10 rounded-sm flex flex-col justify-between">
            <h2 className="text-2xl text-[var(--text)] mb-7 col-span-2 text-left">
              Calculate Your BMR (Basal Metabolic Rate)
            </h2>
            <div className="flex justify-center gap-4 mb-9">
              <button
                onClick={() => setUnit("metric")}
                className={`px-4 py-2 rounded-sm w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-70 ${
                  unit === "metric"
                    ? "bg-[var(--button)] text-white"
                    : "bg-[var(--bg)] text-gray-400"
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-4 py-2 rounded-sm w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-70 ${
                  unit === "imperial"
                    ? "bg-[var(--button)] text-white"
                    : "bg-[var(--bg)] text-gray-400"
                }`}
              >
                Imperial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-[var(--text)]">
              <div className="grid grid-cols-2 gap-x-5">
                <label className="block text-sm mb-2 flex items-center gap-2 col-span-2">
                  <CircleSmall size={18} />
                  Gender
                </label>
                <button
                  className={`flex items-center gap-2 px-5 py-2 border w-full text-sm rounded-xs cursor-pointer active:scale-95 transition-all duration-200 ${
                    gender == "male"
                      ? "text-[var(--card)] bg-[var(--text)]"
                      : ""
                  } `}
                  onClick={() => setGender("male")}
                >
                  <Mars size={20} /> Male
                </button>
                <button
                  className={`flex items-center gap-2 px-5 py-2 border w-full text-sm rounded-xs cursor-pointer active:scale-95 transition-all duration-200 ${
                    gender == "female"
                      ? "text-[var(--card)] bg-[var(--text)]"
                      : ""
                  } `}
                  onClick={() => setGender("female")}
                >
                  <Venus size={20} /> Female
                </button>
              </div>

              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <Calendar size={18} /> Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border p-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <Ruler size={18} /> Height (
                  {unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full border p-2 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <Weight size={18} /> Weight (
                  {unit === "metric" ? "kg" : "lbs"})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border p-2 rounded-xs"
                />
              </div>
            </div>

            <div className="mt-9 flex gap-10 items-center justify-end">
              <button
                onClick={reset}
                className="w-full justify-center bg-red-500 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-red-600 text-white px-6 py-2 rounded-xs"
              >
                <RotateCcw size={18} />
                Reset
              </button>
              <button
                onClick={calculateBMR}
                className="w-full justify-center bg-teal-600 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-teal-700 text-white px-6 py-2 rounded-xs"
              >
                <Calculator size={18} />
                Calculate
              </button>
            </div>
          </div>

          <div className="hover:-translate-y-1 transition-transform duration-300  bg-[var(--card)] px-10 py-10 rounded-sm">
            {/* Illustrative Image */}
            <div
              className={`flex justify-center ${
                bmr ? "mt-10 " : "h-full"
              } gap-10  items-center`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966483.png"
                alt="BMR Illustration"
                className="w-40 h-40"
              />

              {bmr && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2 text-xl text-left ${
                    bmr.includes("Please")
                      ? "text-red-500"
                      : "text-[var(--text)]"
                  }`}
                >
                  {bmr.includes("Please") ? (
                    bmr
                  ) : (
                    <>
                      Your BMR is approximately{" "}
                      <span className="text-teal-600 font-semibold hover:underline">
                        {bmr}
                      </span>{" "}
                      kcal/day
                    </>
                  )}
                </motion.div>
              )}
            </div>
            {/* BMR Scale */}
            {bmr && !bmr.includes("Please") && (
              <div className="mt-10">
                <h3 className="text-lg mb-2">BMR Range Indicator</h3>

                {(() => {
                  // Set range depending on gender
                  const minBmr = gender === "male" ? 1400 : 1200;
                  const maxBmr = gender === "male" ? 2300 : 1900;

                  // Normalize BMR value between 0% and 100%
                  const normalized = Math.min(
                    Math.max(((bmr - minBmr) / (maxBmr - minBmr)) * 100, 0),
                    100
                  );

                  // Determine status color and label
                  let status = "";
                  let color = "";

                  if (bmr < minBmr + (maxBmr - minBmr) * 0.25) {
                    status = "Low";
                    color = "#3b82f6"; // blue
                  } else if (bmr < minBmr + (maxBmr - minBmr) * 0.6) {
                    status = "Normal";
                    color = "#22c55e"; // green
                  } else if (bmr < minBmr + (maxBmr - minBmr) * 0.85) {
                    status = "Slightly High";
                    color = "#facc15"; // yellow
                  } else {
                    status = "High";
                    color = "#ef4444"; // red
                  }

                  return (
                    <>
                      <div className="relative w-full h-5 rounded-full bg-gray-200 overflow-hidden">
                        {/* Gradient Bar */}
                        <div
                          className="absolute top-0 left-0 w-full h-full"
                          style={{
                            background:
                              "linear-gradient(to right, #3b82f6, #22c55e, #facc15, #f97316, #ef4444)",
                          }}
                        ></div>

                        {/* Indicator */}
                        <div
                          className="border-2 hover:scale-120 border-black absolute top-1/2 w-2 h-6 transform -translate-y-1/2 transition-all duration-700"
                          style={{
                            left: `${normalized}%`,
                            backgroundColor: color,
                          }}
                        ></div>
                      </div>

                      {/* Labels */}
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Low</span>
                        <span>Normal</span>
                        <span>High</span>
                      </div>

                      {/* Status Text */}
                      <div className="mt-5 text-center" style={{ color }}>
                        {gender === "male" ? "Male" : "Female"} Range: {minBmr}–
                        {maxBmr} kcal/day ({status})
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </section>

        {/* Ideal Range Chart */}
        <section className="hover:-translate-y-1 transition-transform duration-300 mt-12 bg-[var(--card)] grid grid-cols-[auto_1fr] px-10 py-10 gap-x-10">
          <h2 className="text-3xl mb-10 flex items-center gap-5 col-span-2">
            <Dna size={30} />
            Ideal BMR Range Chart
          </h2>
          <img
            src="/utilities/bmr table.jpg"
            alt=""
            className="h-61 rounded-xs border p-2"
          />
          <div className="overflow-x-auto ">
            <table className="min-w-full border border-gray-300 text-center">
              <thead className="bg-[var(--bg)]">
                <tr>
                  <th className="border p-3">Gender</th>
                  <th className="border p-3">Age Group</th>
                  <th className="border p-3">Average BMR (kcal/day)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Male</td>
                  <td className="border p-3">18–30</td>
                  <td className="border p-3">1700–1900</td>
                </tr>
                <tr>
                  <td className="border p-3">Male</td>
                  <td className="border p-3">31–50</td>
                  <td className="border p-3">1600–1800</td>
                </tr>
                <tr>
                  <td className="border p-3">Female</td>
                  <td className="border p-3">18–30</td>
                  <td className="border p-3">1400–1600</td>
                </tr>
                <tr>
                  <td className="border p-3">Female</td>
                  <td className="border p-3">31–50</td>
                  <td className="border p-3">1300–1500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* About BMR */}
        <section className="mt-16 space-y-6 text-justify leading-relaxed">
          {/* <h2 className="text-2xl font-semibold text-center">About BMR</h2> */}

          <div className="hover:-translate-y-1 transition-transform duration-300  flex flex-col md:flex-row gap-6 items-center bg-[var(--card)] px-10 py-10 rounded-xs">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
              alt="What is BMR"
              className="w-28 h-28"
            />
            <p>
              <strong>What is BMR?</strong>
              <br />
              BMR (Basal Metabolic Rate) is the number of calories your body
              needs to maintain vital functions—like breathing, heartbeat, and
              temperature—while resting.
            </p>
          </div>

          <div className="hover:-translate-y-1 transition-transform duration-300  flex flex-col md:flex-row gap-6 items-center bg-[var(--card)] px-10 py-10 rounded-xs">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2760/2760613.png"
              alt="Why use BMR"
              className="w-28 h-28"
            />
            <p>
              <strong>Why do we use it?</strong>
              <br />
              Knowing your BMR helps estimate daily calorie needs for
              maintaining, losing, or gaining weight. It’s crucial for effective
              fitness and diet planning.
            </p>
          </div>

          <div className="hover:-translate-y-1 transition-transform duration-300  flex flex-col md:flex-row gap-6 items-center bg-[var(--card)] px-10 py-10 rounded-xs">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Formula"
              className="w-28 h-28"
            />
            <p>
              <strong>Formula:</strong>
              <br />
              Harris–Benedict Equation (Revised): <br />
              <span className="font-mono text-sm">
                For Men: 88.362 + (13.397 × weight in kg) + (4.799 × height in
                cm) − (5.677 × age) <br />
                For Women: 447.593 + (9.247 × weight in kg) + (3.098 × height in
                cm) − (4.330 × age)
              </span>
            </p>
          </div>

          <div className="hover:-translate-y-1 transition-transform duration-300  flex flex-col md:flex-row gap-6 items-center bg-[var(--card)] px-10 py-10 rounded-xs">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2913/2913461.png"
              alt="Who founded BMR"
              className="w-28 h-28"
            />
            <p>
              <strong>Who founded it?</strong>
              <br />
              The concept was introduced by scientists{" "}
              <em>James Arthur Harris</em> and <em>Francis Gano Benedict</em> in
              1918. They developed the Harris–Benedict equation to estimate
              daily energy expenditure.
            </p>
          </div>
        </section>
    </main>
  );
}
