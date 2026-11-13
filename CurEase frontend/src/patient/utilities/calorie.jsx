import React, { useState } from "react";
import { motion } from "framer-motion";
import { BicepsFlexed, Calculator, Calendar, RotateCcw, Ruler, Weight } from "lucide-react";

const CalorieIntakeCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [calories, setCalories] = useState(null);

  const activityLevels = [
    { label: "Sedentary (little or no exercise)", factor: 1.2 },
    { label: "Lightly Active (1-3 days/week)", factor: 1.375 },
    { label: "Moderately Active (3-5 days/week)", factor: 1.55 },
    { label: "Very Active (6-7 days/week)", factor: 1.725 },
    { label: "Super Active (physical job + exercise)", factor: 1.9 },
  ];

  const calculateCalories = () => {
    if (!age || !weight || !height) {
      setCalories("Please fill all fields!");
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = activityLevels.find((x) => x.label === activity);

    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * (act ? act.factor : 1.2);
    setCalories(tdee.toFixed(0));
  };

  function reset() {
    setGender("");
    setAge("");
    setWeight("");
    setHeight("");
    setActivity("sedentary");
    setCalories(null);
  }
  return (
    <div className="h-full overflow-y-scroll patient-scrollbar bg-[var(--bg)] p-10 flex flex-col items-center">
      <section className="flex gap-10 bg-[var(--card)] px-10 py-10 rounded-xs">
        {/* left side */}
        <div className="flex flex-col h-full items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Food"
            className="w-64 mx-auto"
          />
          <h1 className="text-3xl font-bold mb-4 text-center">
            Calorie Intake Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8 max-w-xl">
            Calculate how many calories your body needs per day to maintain,
            lose, or gain weight.
          </p>
        </div>
        <div className="bg-[var(--bg)] shadow-lg rounded-xs p-10 w-full">
          {/* Gender */}
          <div className="flex justify-center gap-6 mb-4">
            <button
              className={`hover:-translate-y-1 px-6 py-2 rounded-xs border px-10 cursor-pointer active:scale-90 transition-all ${
                gender === "male"
                  ? "bg-blue-500 text-white"
                  : "bg-[var(--card)]"
              }`}
              onClick={() => setGender("male")}
            >
              <img src="/utilities/male.png" alt="" className="h-20 mb-2" />
              Male
            </button>
            <button
              className={`hover:-translate-y-1 px-6 py-2 rounded-xs border px-10 cursor-pointer active:scale-90 transition-all ${
                gender === "female"
                  ? "bg-pink-500 text-white"
                  : "bg-[var(--card)]"
              }`}
              onClick={() => setGender("female")}
            >
              <img src="/utilities/female.png" alt="" className="h-20 mb-2" />
              Female
            </button>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <label className="block text-sm mb-2 flex flex-col">
                  <span className="text-center flex gap-3 mb-2"><Calendar size={18} /> Age (years)</span>
            <input
              type="number"
              placeholder="Age (years)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border px-5 py-3 w-full rounded-xs focus:ring-2 focus:ring-amber-400 outline-none"
            />
                </label>

                <label className="block text-sm mb-2 flex flex-col">
                  <span className="text-center flex gap-3 mb-2"><Weight size={18} /> Weight (Kg)</span>
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border px-5 py-3 rounded-xs focus:ring-2 focus:ring-amber-400 outline-none"
            />
                  </label>

                  <label className="block text-sm mb-2 flex flex-col">
                  <span className="text-center flex gap-3 mb-2"><Ruler size={18} /> Height (cm)</span>
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border px-5 py-3 rounded-xs focus:ring-2 focus:ring-amber-400 outline-none"
            />
            </label>
            <label className="block text-sm mb-2 flex flex-col">
                  <span className="text-center flex gap-3 mb-2"><BicepsFlexed size={18} /> Excercise activity</span>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="border px-5 py-3 rounded-xs focus:ring-2 focus:ring-amber-400 outline-none bg-[var(--bg)]"
            >
              {activityLevels.map((lvl) => (
                <option key={lvl.label} value={lvl.label}>
                  {lvl.label}
                </option>
              ))}
            </select>
            </label>
          </div>

          <div className="mt-9 flex gap-10 items-center justify-end">
            <button
              onClick={reset}
              className="bg-red-500 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-red-600 text-white px-6 py-2 rounded-xs"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button
              onClick={calculateCalories}
              className="bg-teal-600 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-teal-700 text-white px-6 py-2 rounded-xs"
            >
              <Calculator size={18} />
              Calculate
            </button>
          </div>

          {/* Result */}
          {calories && (
            <motion.div
              className="mt-6 p-4 bg-amber-50 dark:bg-indigo-700 rounded-lg text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {calories.includes("Please") ? (
                <p className="text-red-500 dark:text-white">{calories}</p>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-amber-700 dark:text-white mb-1">
                    Daily Calorie Need: <span className="text-teal-500 underline">{calories} </span>kcal/day
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    To maintain your current weight. Adjust +500 kcal for gain
                    or −500 kcal for loss.
                  </p>
                </>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <div className="bg-[var(--card)] mt-10 w-full px-10 py-10 rounded-xs hover:-translate-y-1 transition-transform duration-300 grid grid-cols-[auto_1fr] gap-x-10">
        <img src="/utilities/calorie.png" alt="" className="h-20 row-span-2" />

        <h2 className="text-2xl font-bold mb-2 text-[var(--button)] ">
          What is Calorie Intake?
        </h2>
        <p className="mb-4">
          Calorie intake is the total number of calories you consume in a day.
          Your daily calorie requirement depends on your age, gender, weight,
          height, and physical activity level.
        </p>
      </div>
      <div className="bg-[var(--card)] mt-10 w-full px-10 py-10 rounded-xs grid grid-cols-[auto_1fr] gap-x-10 hover:-translate-y-1 transition-transform duration-300 ">
        <img src="/utilities/why.webp" alt="" className="h-20 row-span-2" />
        <h3 className="text-2xl font-semibold mb-2 text-[var(--button)] ">
          Why Calculate It?
        </h3>
        <p className="mb-4">
          Knowing your calorie needs helps you plan a balanced diet — whether
          your goal is weight loss, maintenance, or muscle gain.
        </p>
      </div>
      <div className="hover:-translate-y-1 transition-transform duration-300  bg-[var(--card)] mt-10 w-full px-10 py-10 rounded-xs grid grid-cols-[auto_1fr] gap-x-10">
        <img
          src="https://sweezy-cursors.com/wp-content/uploads/cursor/school-calculator-amp-math-formula-animated/school-calculator-math-formula-animated-custom-cursor.gif"
          alt=""
          className="h-20 row-span-3"
        />
        <h3 className="text-3xl font-semibold mb-2 text-[var(--button)] ">
          Formula Used:
        </h3>
        <p className="mb-4 font-mono p-2 rounded">
          <span className="text-base text-[var(--button)]">
            Mifflin-St Jeor Equation:{" "}
          </span>
          <br />
          <span className=" text-[var(--button)]">For Men:</span> (10 × weight)
          + (6.25 × height) − (5 × age) + 5
          <br />
          <span className=" text-[var(--button)]">For Women:</span> (10 ×
          weight) + (6.25 × height) − (5 × age) − 161
        </p>
      </div>
    </div>
  );
};

export default CalorieIntakeCalculator;
