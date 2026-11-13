import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bomb, Calculator, CircleSmall, Mars, RotateCcw, Ruler, Venus, Weight } from "lucide-react";

export default function BMICalculator() {
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) {
      setBmi("Please fill all fields correctly.");
      return;
    }

    let h = parseFloat(height);
    let w = parseFloat(weight);

    // Convert imperial to metric
    if (unit === "imperial") {
      h = h * 0.0254; // inches to meters
      w = w * 0.453592; // pounds to kg
    } else {
      h = h / 100; // cm to meters
    }

    const result = w / (h * h);
    setBmi(result.toFixed(1));
  };

  const getCategory = (b) => {
    if (b < 18.5) return { cat: "Underweight", color: "#3b82f6" };
    if (b < 25) return { cat: "Normal Weight", color: "#22c55e" };
    if (b < 30) return { cat: "Overweight", color: "#facc15" };
    return { cat: "Obese", color: "#ef4444" };
  };

  const getScaleRanges = () => [
    { label: "Underweight", color: "#3b82f6", range: [0, 18.5] },
    { label: "Normal", color: "#22c55e", range: [18.5, 24.9] },
    { label: "Overweight", color: "#facc15", range: [25, 29.9] },
    { label: "Obese", color: "#ef4444", range: [30, 40] },
  ];

  function reset(){
    setGender("male")
    setUnit("metric")
    setHeight("")
    setWeight("")
    setBmi(null)

  }
  return (
    <div className="bg-[var(--bg)] h-full overflow-y-scroll patient-scrollbar text-[var(--text)]">
      {/* Header */}
      {/* <header className="bg-indigo-600 text-white py-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold">BMI (Body Mass Index) Calculator</h1>
        <p className="mt-2 opacity-80">
          Calculate your BMI and check if your weight is in a healthy range
        </p>
      </header> */}

      {/* Main Section */}
      <main className="px-10 mx-auto mt-10">
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

            {/* Gender */}
            <div className="grid grid-cols-2 gap-x-5">
                <label className="block text-sm mb-2 flex items-center gap-2 col-span-2">
                  <CircleSmall size={18} />
                  Gender
                </label>
                <button
                  className={`flex items-center gap-2 px-5 py-5 border w-full text-sm rounded-xs cursor-pointer active:scale-95 transition-all duration-200 ${
                    gender == "male"
                      ? "text-[var(--card)] bg-[var(--text)]"
                      : ""
                  } `}
                  onClick={() => setGender("male")}
                >
                  <Mars size={20} /> Male
                </button>
                <button
                  className={`flex items-center gap-2 px-5 py-5 border w-full text-sm rounded-xs cursor-pointer active:scale-95 transition-all duration-200 ${
                    gender == "female"
                      ? "text-[var(--card)] bg-[var(--text)]"
                      : ""
                  } `}
                  onClick={() => setGender("female")}
                >
                  <Venus size={20} /> Female
                </button>
              </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
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

            {/* Calculate Button */}
            <div className="mt-9 flex gap-10 items-center justify-end">
              <button onClick={reset} className="bg-red-500 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-red-600 text-white px-6 py-2 rounded-xs">
                <RotateCcw size={18}/>Reset
              </button>
              <button onClick={calculateBMI} className="bg-teal-600 active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-teal-700 text-white px-6 py-2 rounded-xs">
                <Calculator size={18}/>Calculate
              </button>
            </div>
          </article>
          {/* right side */}
          <article className="hover:-translate-y-1 transition-transform duration-300 bg-[var(--card)] w-full px-10 py-10 rounded-sm">
            {(!bmi || (bmi && bmi.includes("Please"))) && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <img src="/utilities/bmi.png" alt="" className="h-50" />
                <h1 className="text-4xl mb-5">BMI (Body Mass Index) Calculator</h1>
                <p className="text-sm">Calculate your BMI and check if your weight is in a healthy range</p>
                {bmi && bmi.includes("Please") && (
                  <p className="text-red-500 mt-10">{bmi}</p>
                )}
              </div>
            )}
            {/* Result */}
        {bmi && !bmi.includes("Please") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xl text-left flex items-center gap-10">
                <img src="/utilities/bmi.png" alt="" className="h-30" />
                <p className="text-2xl">Your Body Mass Index (BMI) is <span className="text-teal-500 hover:underline">{bmi}</span>.</p>
          </motion.div>
        )}

        {/* Scale */}
        {bmi &&
          !bmi.includes("Please") &&
          (() => {
            const { cat, color } = getCategory(bmi);
            const scale = getScaleRanges();
            const min = scale[0].range[0];
            const max = scale[scale.length - 1].range[1];
            const normalized = Math.min(
              Math.max(((bmi - min) / (max - min)) * 100, 0),
              100
            );

            return (
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  BMI Scale ({gender === "male" ? "Male" : "Female"})
                </h3>
                <div className="relative w-full h-5 rounded-full bg-gray-200 overflow-hidden">
                  <div className="flex w-full h-full">
                    {scale.map((s, i) => (
                      <div
                        key={i}
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
                    className="absolute top-1/2 w-2 h-6 transform border-3 border-black -translate-y-1/2"
                    animate={{ left: `${normalized}%`, backgroundColor: color }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  {scale.map((s, i) => (
                    <span key={i}>{s.label}</span>
                  ))}
                </div>
                <div
                  className="mt-2 text-center text-lg mt-10 text-teal-500"
                >
                  Category: {cat}
                </div>
              </div>
            );
          })()}
          </article>
        </section>

        

        {/* Ideal BMI Chart */}
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
                  { label: "Underweight", value: "<18.5" },
                  { label: "Normal Weight", value: "18.5–24.9" },
                  { label: "Overweight", value: "25–29.9" },
                  { label: "Obese", value: "30+" },
                ],
              },
              {
                title: "Female",
                image:
                  "/utilities/female.png",
                data: [
                  { label: "Underweight", value: "<18.5" },
                  { label: "Normal Weight", value: "18.5–24.9" },
                  { label: "Overweight", value: "25–29.9" },
                  { label: "Obese", value: "30+" },
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
            <img src="/utilities/bmi.png" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">What is BMI?</strong>
            Body Mass Index (BMI) is a simple calculation using a person’s
            height and weight. It helps identify whether someone is underweight,
            normal, overweight, or obese.
          </div>
          <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 mt-15 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm">
            <img src="/utilities/why.webp" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">Why do we use it?</strong>
            It’s widely used to quickly screen for potential health risks
            related to underweight or obesity.
          </div>
          <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 mt-15 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm">
            <img src="https://sweezy-cursors.com/wp-content/uploads/cursor/school-calculator-amp-math-formula-animated/school-calculator-math-formula-animated-custom-cursor.gif" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">Formula:</strong>
            BMI = weight (kg) / [height (m)]² or BMI = 703 × weight (lbs) /
            [height (in)]²
          </div>
          <div className="grid grid-cols-[auto_1fr] px-10 py-10 bg-[var(--card)] mb-10 mt-15 hover:-translate-y-1 transition-transform duration-300 rounded-sm gap-x-10 text-sm">
            <img src="https://cdn-icons-png.flaticon.com/512/2340/2340038.png" alt="" className="row-span-2 h-20" />
            <strong className="text-2xl font-medium text-[var(--button)]">History:</strong>
            <p>
            BMI was developed by the Belgian mathematician
            <em>Adolphe Quetelet</em>
            in 1832 as part of his studies on human growth patterns.
            </p>
          </div>


      </main>

    </div>
  );
}
