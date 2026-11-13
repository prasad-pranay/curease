import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bomb, Calculator, Calendar, CircleSmall, DraftingCompass, Mars, RotateCcw, Ruler, Speech, Spline, Venus } from "lucide-react";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBodyFat = () => {
    if (!age || !height || !neck || !waist || (gender === "female" && !hip)) {
      setBodyFat("Please fill all fields correctly.");
      return;
    }

    let h = parseFloat(height);
    let n = parseFloat(neck);
    let w = parseFloat(waist);
    let hp = parseFloat(hip);

    if (unit === "imperial") {
      h *= 2.54;
      n *= 2.54;
      w *= 2.54;
      hp *= 2.54;
    }

    let result;
    if (gender === "male") {
      result =
        495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) -
        450;
    } else {
      result =
        495 /
          (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) -
        450;
    }

    setBodyFat(result.toFixed(2));
  };

  const getCategory = (bf) => {
    if (gender === "male") {
      if (bf < 6) return { cat: "Essential Fat", color: "#3b82f6" };
      if (bf < 14) return { cat: "Athlete", color: "#22c55e" };
      if (bf < 18) return { cat: "Fitness", color: "#facc15" };
      if (bf < 25) return { cat: "Average", color: "#f97316" };
      return { cat: "Obese", color: "#ef4444" };
    } else {
      if (bf < 14) return { cat: "Essential Fat", color: "#3b82f6" };
      if (bf < 21) return { cat: "Athlete", color: "#22c55e" };
      if (bf < 25) return { cat: "Fitness", color: "#facc15" };
      if (bf < 32) return { cat: "Average", color: "#f97316" };
      return { cat: "Obese", color: "#ef4444" };
    }
  };

  const getScaleRanges = () => {
    return gender === "male"
      ? [
          { label: "Essential", color: "#3b82f6", range: [2, 6] },
          { label: "Athlete", color: "#22c55e", range: [6, 13] },
          { label: "Fitness", color: "#facc15", range: [14, 17] },
          { label: "Average", color: "#f97316", range: [18, 24] },
          { label: "Obese", color: "#ef4444", range: [25, 35] },
        ]
      : [
          { label: "Essential", color: "#3b82f6", range: [10, 13] },
          { label: "Athlete", color: "#22c55e", range: [14, 20] },
          { label: "Fitness", color: "#facc15", range: [21, 24] },
          { label: "Average", color: "#f97316", range: [25, 31] },
          { label: "Obese", color: "#ef4444", range: [32, 40] },
        ];
  };

  function reset(){
    setGender("male")
    setUnit("metric")
    setAge("")
    setHeight("")
    setNeck("")
    setWaist("")
    setHip("")
    setBodyFat(null)
  }

  return (
    <div className="bg-[var(--bg)] h-full overflow-y-scroll  patient-scrollbar px-10 text-[var(--text)]">
      {/* <header className="bg-indigo-600 text-white py-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold">Body Fat Percentage Calculator</h1>
        <p className="mt-2 opacity-80">
          Estimate your body composition using the U.S. Navy method
        </p>
      </header> */}

        {/* top section */}
        <section className="flex gap-10">
          {/* left side */}
          <article className="hover:-translate-y-1 transition-transform duration-300 bg-[var(--card)] w-full px-10 py-10 rounded-sm">
            {/* Unit Toggle */}
            <div className="flex justify-center gap-4 mb-9">
              <button
                onClick={() => setUnit("metric")}
                className={`px-4 py-2 rounded-sm w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-70 ${
                  unit === "metric" ? "bg-[var(--button)] text-white" : "bg-[var(--bg)] text-gray-400"
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-4 py-2 rounded-sm w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 active:scale-70 ${
                  unit === "imperial" ? "bg-[var(--button)] text-white" : "bg-[var(--bg)] text-gray-400"
                }`}
              >
                Imperial
              </button>
            </div>

            {/* Form */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
                  className="w-full border p-2 rounded-lg"
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
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <Speech size={18} /> Neck (
                  {unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 flex items-center gap-2">
                  <DraftingCompass size={18} /> Waist (
                  {unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              {gender === "female" && (
                <div>
                  <label className="block text-sm mb-2 flex items-center gap-2">
                    <Spline size={18} /> Hip (
                    {unit === "metric" ? "cm" : "inches"})
                  </label>
                  <input
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>
              )}
            </section>

            {/* Button */}
            <div className="mt-9 flex gap-10 items-center justify-end">
              <button onClick={reset} className="bg-red-500 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-red-600 text-white px-6 py-2 rounded-xs">
                <RotateCcw size={18}/>Reset
              </button>
              <button onClick={calculateBodyFat} className="bg-teal-600 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-teal-700 text-white px-6 py-2 rounded-xs">
                <Calculator size={18}/>Calculate
              </button>
            </div>
          </article>
          <article className="hover:-translate-y-1 transition-transform duration-300 bg-[var(--card)] w-full px-10 py-10 flex flex-col justify-center rounded-sm">
            {(!bodyFat || (bodyFat && bodyFat.includes("Please"))) && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <img src="/utilities/bodyfat.png" alt="" className="h-50" />
                <h1 className="text-4xl mb-5">Body Fat Percentage Calculator</h1>
                <p className="text-sm">Estimate your body composition using the U.S. Navy method</p>
                {bodyFat && bodyFat.includes("Please") && (
                  <p className="text-red-500 mt-10">{bodyFat}</p>
                )}
              </div>
            )}
            {/* Result */}
            {bodyFat && !bodyFat.includes("Please") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-2 text-xl text-left`}
              >
                <p className="text-center text-2xl">Your estimated body fat is <span className="text-green-500 hover:underline">{bodyFat}%</span>.</p>
              </motion.div>
            )}

            {/* Dynamic Scale */}
            {bodyFat &&
              !bodyFat.includes("Please") &&
              (() => {
                const { cat, color } = getCategory(bodyFat);
                const scale = getScaleRanges();
                const min = scale[0].range[0];
                const max = scale[scale.length - 1].range[1];
                const normalized = Math.min(
                  Math.max(((bodyFat - min) / (max - min)) * 100, 0),
                  100
                );
                return (
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      Body Fat Range ({gender === "male" ? "Male" : "Female"})
                    </h3>
                    <div className="relative w-full h-5 rounded-full bg-gray-200 overflow-hidden">
                      <div className="flex w-full h-full">
                        {scale.map((s, i) => (
                          <div
                            key={i}
                            className="h-full"
                            style={{
                              width: `${
                                ((s.range[1] - s.range[0]) / (max - min)) * 100
                              }%`,
                              backgroundColor: s.color,
                            }}
                          ></div>
                        ))}
                      </div>
                      <motion.div
                        className="absolute top-1/2 w-2 h-6 rounded-full transform -translate-y-1/2"
                        animate={{
                          left: `${normalized}%`,
                          backgroundColor: color,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 15,
                        }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      {scale.map((s, i) => (
                        <span key={i}>{s.label}</span>
                      ))}
                    </div>
                    <div
                      className="mt-2 text-center font-semibold"
                      style={{ color }}
                    >
                      Category: {cat}
                    </div>
                  </div>
                );
              })()}
          </article>
        </section>

        {/* Ideal Range Chart */}
        <div className="hover:-translate-y-1 transition-transform duration-300 mt-12 bg-[var(--card)] px-10 py-10 rounded-sm">
          <h2 className="text-3xl mb-10 flex items-center gap-5 col-span-2">
            <Bomb size={30} />
            Ideal Body Fat Percentage Ranges
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Male",
                image: "/utilities/male.png",
                data: [
                  { label: "Essential", value: "2–6%" },
                  { label: "Athlete", value: "6–13%" },
                  { label: "Fitness", value: "14–17%" },
                  { label: "Average", value: "18–24%" },
                  { label: "Obese", value: "25%+" },
                ],
              },
              {
                title: "Female",
                image:
                  "/utilities/female.png",
                data: [
                  { label: "Essential", value: "10–13%" },
                  { label: "Athlete", value: "14–20%" },
                  { label: "Fitness", value: "21–24%" },
                  { label: "Average", value: "25–31%" },
                  { label: "Obese", value: "32%+" },
                ],
              },
            ].map((chart, i) => (
              <div
                key={i}
                className="bg-[var(--bg)] rounded-xl p-4 shadow-md text-center grid grid-cols-[auto_1fr] items-center gap-x-10"
              >
                <img
                  src={chart.image}
                  alt={chart.title}
                  className="w-max h-20 mx-auto mb-2"
                />
                <ul className="space-y-1 bg-[var(--card)] rounded-sm px-5 py-5 row-span-2">
                  {chart.data.map((item, j) => (
                    <li
                    key={j}
                    className="flex justify-between px-6 hover:bg-[var(--bg)]"
                    >
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
                  <h3 className="text-xl font-semibold mb-2 px-10">{chart.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        
          <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 mt-15 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm">
            <img src="/utilities/bodyfat.png" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">What is Body Fat Percentage?</strong>
            It represents how much of your body weight is composed of fat mass.
            It’s a better indicator of health and fitness than BMI.
          </div>
          <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm">
            <img src="https://elements-resized.envatousercontent.com/elements-content-platform-public-assets/c2d452e3-bbdd-4e8c-b8b6-bf57cf2952e5/97f19c13-71a6-44a2-ac24-6382ac969f4c/downloaded-file20250825-8-txe3mi.png?w=433&cf_fit=scale-down&q=85&format=auto&s=363e830aba2cf5e509f77150746c72465dc89ec9e709cd3d1fca480c7a52452e" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">Why is it important?</strong>
            Understanding your body fat helps tailor diet, exercise, and
            lifestyle goals to achieve optimal health and performance.
          </div>
          <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm">
            <img src="https://sweezy-cursors.com/wp-content/uploads/cursor/school-calculator-amp-math-formula-animated/school-calculator-math-formula-animated-custom-cursor.gif" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">Formula Used:</strong>
            <p>
            This calculator uses the <em>U.S. Navy Body Fat Formula</em>, based
            on waist, neck, and height measurements.
            </p>
          </div>
          <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm">
            <img src="https://cdn-icons-png.flaticon.com/512/2340/2340038.png" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">Developed by:</strong>
            The method was established by the U.S. Naval Health Research Center
            in 1984.
          </div>
    </div>
  );
}
