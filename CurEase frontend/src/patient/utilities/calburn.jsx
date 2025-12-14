import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, Calculator, CircleSmall, Clock, Flame, Frown, Mars, MousePointer, RotateCcw, Venus, Weight } from "lucide-react";

const ActivitySelector = ({ selectedActivities, setSelectedActivities }) => {
  const [search, setSearch] = useState("");

  // Massive list of activities with MET (Metabolic Equivalent of Task)
  const activities = [
    // 🏃‍♂️ Walking
    { name: "Walking (slow, 2 mph)", met: 2.5 },
    { name: "Walking (moderate, 3 mph)", met: 3.5 },
    { name: "Walking (brisk, 4 mph)", met: 4.3 },
    { name: "Walking uphill", met: 6.5 },
    { name: "Walking downstairs", met: 3.0 },
    { name: "Walking with stroller", met: 3.0 },

    // 🏋️‍♂️ Exercise & Sports
    { name: "Running (slow, 5 mph)", met: 8.0 },
    { name: "Running (6 mph)", met: 9.8 },
    { name: "Running (7 mph)", met: 11.0 },
    { name: "Running (8 mph)", met: 11.8 },
    { name: "Cycling (light, <10 mph)", met: 4.0 },
    { name: "Cycling (moderate, 12–14 mph)", met: 8.0 },
    { name: "Cycling (vigorous, 16–20 mph)", met: 12.0 },
    { name: "Swimming (slow)", met: 6.0 },
    { name: "Swimming (fast freestyle)", met: 9.5 },
    { name: "Jump rope (slow)", met: 8.8 },
    { name: "Jump rope (fast)", met: 12.3 },
    { name: "Dancing (slow)", met: 3.5 },
    { name: "Dancing (aerobic, fast)", met: 7.3 },
    { name: "Yoga", met: 3.0 },
    { name: "Pilates", met: 3.5 },
    { name: "Gym weightlifting (light)", met: 3.5 },
    { name: "Gym weightlifting (heavy)", met: 6.0 },
    { name: "Zumba", met: 7.5 },
    { name: "Boxing (sparring)", met: 9.0 },
    { name: "Martial arts", met: 10.0 },
    { name: "Badminton", met: 5.5 },
    { name: "Tennis (singles)", met: 8.0 },
    { name: "Tennis (doubles)", met: 6.0 },
    { name: "Football", met: 7.0 },
    { name: "Basketball", met: 8.0 },
    { name: "Cricket (batting/bowling)", met: 5.5 },
    { name: "Cricket (fielding)", met: 4.0 },
    { name: "Volleyball", met: 4.5 },
    { name: "Table Tennis", met: 4.0 },

    // 🧹 Household / Daily
    { name: "Cleaning (light)", met: 2.5 },
    { name: "Cooking", met: 2.0 },
    { name: "Washing dishes", met: 2.3 },
    { name: "Laundry", met: 2.0 },
    { name: "Sweeping or mopping", met: 3.3 },
    { name: "Vacuuming", met: 3.5 },
    { name: "Car washing", met: 3.5 },
    { name: "Gardening", met: 4.0 },
    { name: "Carrying groceries", met: 3.0 },
    { name: "Stair climbing", met: 8.0 },
    { name: "Childcare (active)", met: 3.0 },
    { name: "Office work (sitting)", met: 1.5 },
    { name: "Studying", met: 1.8 },
    { name: "Typing", met: 1.3 },

    // 😴 Leisure / Rest
    { name: "Sleeping", met: 0.9 },
    { name: "Sitting quietly", met: 1.0 },
    { name: "Watching Netflix / TV", met: 1.3 },
    { name: "Reading a book", met: 1.3 },
    { name: "Listening to music", met: 1.2 },
    { name: "Meditation", met: 1.0 },
    { name: "Driving a car", met: 2.5 },
  ];

  // Filter activities by search
  const filteredActivities = useMemo(() => {
    return activities.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Toggle selection
  const toggleActivity = (activity) => {
    const exists = selectedActivities.find((a) => a.name === activity.name);
    if (exists) {
      setSelectedActivities(
        selectedActivities.filter((a) => a.name !== activity.name)
      );
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  return (
    <div className="bg-[var(--card)] shadow-md rounded-xs p-6 w-full mx-auto h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
        <div className="flex gap-10">

      <h2 className="text-2xl mb-4 whitespace-nowrap flex items-center gap-5"><Activity/> Select Activities</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search activity..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border border-[var(--border)] rounded-xs focus:ring-2 focus:ring-blue-500 outline-none"
      />
        </div>

      {/* Activities List */}
      <div className="h-full pr-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredActivities.map((activity) => {
          const isSelected = selectedActivities.some(
            (a) => a.name === activity.name
          );
          return (
            <button
              key={activity.name}
              onClick={() => toggleActivity(activity)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? "bg-teal-600 border-teal-900 text-white font-semibold"
                  : "bg-[var(--bg)] hover:bg-[var(--bg)]/20 border-[var(--border)]"
              }`}
            >
              {activity.name}
              <span className={`block text-xs ${isSelected?"text-white font-light":"text-gray-500"}`}>
                MET: {activity.met}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default function CalorieBurnCalculator() {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [results, setResults] = useState([]);
  const [unit, setUnit] = useState("metric");

  const calculateCalories = () => {
    if (!weight || !duration || selectedActivities.length === 0) {
      setResults([{ name: "Error", calories: "Please fill all fields." }]);
      return;
    }

    const w = parseFloat(weight);
    const t = parseFloat(duration) / 60;

    const calculatedResults = selectedActivities.map((activity) => {
      const calories = activity.met * w * t;
      return { name: activity.name, calories: calories.toFixed(1) };
    });

    setResults(calculatedResults);
  };

  const totalCalories = results.reduce(
    (sum, r) => sum + (parseFloat(r.calories) || 0),
    0
  );

  function reset(){
    setGender("male")
    setWeight("")
    setDuration("")
    setResults([])
    setUnit("metric")
    setSelectedActivities([])
  }

  return (
    <div className="bg-[var(--bg)] h-full overflow-y-scroll patient-scrollbar text-[var(--text)] pt-5">

        {/* Results */}
        <div className="hover:-translate-y-1 transition-transform duration-300 mb-10 px-10 bg-[var(--card)] mx-10 rounded-sm py-10">
            {results.length==0 && <div className="grid grid-cols-[auto_1fr] gap-x-10 items-center">
                <img src="/utilities/calorieburned.png" alt="" className="row-span-2 h-25" />
                <p className="text-4xl">Calorie Burn Calculator</p>
                <p className="text-sm"> Select multiple activities to see your total calories burned</p>    
            </div>}
            {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=""
        >
          {results[0].name === "Error" ? (
            <p className="text-red-500 text-center text-lg font-semibold">
              {results[0].calories}
            </p>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-center mb-4 flex items-center gap-5">
                <Flame/>Calories Burned Summary
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-orange-100 dark:bg-indigo-900">
                      <th className="p-3 border">Activity</th>
                      <th className="p-3 border text-center">
                        Calories Burned
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i} className="odd:bg-gray-50 dark:odd:bg-gray-700 dark:even:bg-gray-800 even:bg-white">
                        <td className="p-3 border">{r.name}</td>
                        <td className="p-3 border text-center">{r.calories}</td>
                      </tr>
                    ))}
                    <tr className="bg-orange-200 dark:bg-indigo-900 font-semibold">
                      <td className="p-3 border text-right">Total</td>
                      <td className="p-3 border text-center">
                        {totalCalories.toFixed(1)} kcal
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Animated bar */}
              <div className="mt-6">
                <div className="relative w-full h-5 bg-gray-200 dark:bg-[var(--bg)] rounded-full overflow-hidden">
                  <motion.div
                    className="absolute h-full bg-orange-500 rounded-full"
                    animate={{
                      width: `${Math.min(totalCalories / 10, 100)}%`,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-base text-gray-600 dark:text-gray-400 mt-1">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
        </div>
      
      {/* Form */}
      <section className="px-10 flex gap-10 h-[70vh]">
        <article className="flex flex-col gap-5 h-full w-full">

        
        <div className="grid md:grid-cols-2 grid-rows-[1fr_1fr_auto] gap-6 items-center bg-[var(--card)] w-full rounded-sm px-10 py-10 hover:-translate-y-1 transition-transform duration-300">
          {/* Gender */}
          <div className="grid grid-cols-2 gap-x-5">
            <label className="block text-sm mb-2 flex items-center gap-2 col-span-2">
              <CircleSmall size={18} />
              Gender
            </label>
            <button
              className={`flex items-center gap-2 px-5 py-2 border w-full text-sm rounded-xs cursor-pointer active:scale-95 transition-all duration-200 ${
                gender == "male" ? "text-[var(--card)] bg-[var(--text)]" : ""
              } `}
              onClick={() => setGender("male")}
            >
              <Mars size={20} /> Male
            </button>
            <button
              className={`flex items-center gap-2 px-5 py-2 border w-full text-sm rounded-xs cursor-pointer active:scale-95 transition-all duration-200 ${
                gender == "female" ? "text-[var(--card)] bg-[var(--text)]" : ""
              } `}
              onClick={() => setGender("female")}
            >
              <Venus size={20} /> Female
            </button>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm mb-2 flex items-center gap-2">
              <Weight size={18} /> Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border p-2 rounded-xs"
            />
          </div>

          {/* Duration */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-2 flex items-center gap-2 col-span-2">
              <Clock size={18} />
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border p-2 rounded-xs"
              placeholder="Enter total duration per activity"
            />
          </div>

          {/* Calculate Button */}
          <div className="flex gap-10 items-center justify-end col-span-2">
              <button onClick={reset} className="w-full justify-center bg-red-500 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-red-600 text-white px-6 py-2 rounded-xs">
                <RotateCcw size={18}/>Reset
              </button>
              <button onClick={calculateCalories} className="w-full justify-center bg-teal-600 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-teal-700 text-white px-6 py-2 rounded-xs">
                <Calculator size={18}/>Calculate
              </button>
            </div>
        </div>

        <div className="w-full h-full bg-[var(--card)] rounded-sm p-5 hover:-translate-y-1 transition-transform duration-300">
            {/* Selected Summary */}
            <p className="flex items-center text-xl gap-5"><MousePointer/> Selected Activities:</p>{" "}
      {selectedActivities.length > 0 ? (
        <div className="p-3 rounded-lg text-sm flex flex-wrap gap-x-5 gap-y-2">
          {selectedActivities.map((a) => <p className="flex gap-3 border-b-1 border-transparent hover:border-[var(--button)]"><span>•</span><span className="text-[var(--button)]">{a.name}</span></p>)}
        </div>
      ):<div className="grid grid-cols-[auto_1fr] items-center gap-x-10 mt-5">
            <img src="https://cliply.co/wp-content/uploads/2021/09/142109670_SAD_CAT_400.gif" alt="" className="h-20 row-span-2" />
            <p className="flex items-center gap-3 text-xl"><Frown />None Selected</p>
            <p className="text-sm">Your Selected activities will appear here</p>
        </div>}
        </div>

        </article>

        {/* Activity Selection */}
        <ActivitySelector
          selectedActivities={selectedActivities}
          setSelectedActivities={setSelectedActivities}
        />
      </section>

      

      {/* Info */}
      {/* <section className="mt-16 text-justify space-y-4 leading-relaxed">
        <h2 className="text-2xl font-semibold text-center">
          About Calorie Burn
        </h2> */}
        <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 mt-15 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm mx-10">
            <img src="/utilities/calorieburned.png" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">METs (Metabolic Equivalent of Task)</strong>
          Calorie burn represents the total energy used during physical
          activities. Different activities use different energy levels, measured
          in .
        </div>
        <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 mt-15 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm mx-10">
            <img src="/utilities/calorie.png" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">How to use it?</strong>
          You can select multiple exercises and see how they contribute to your
          overall calorie expenditure.
        </div>
        <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 mt-15 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm mx-10">
          
            <img src="https://sweezy-cursors.com/wp-content/uploads/cursor/school-calculator-amp-math-formula-animated/school-calculator-math-formula-animated-custom-cursor.gif" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">Formula used:</strong>
          
          <strong>Calories = MET × Weight (kg) × Time (hours)</strong>
        </div>
      {/* </section> */}
    </div>
  );
}
