import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calculator, Calendar, RotateCcw, Weight } from "lucide-react";

const foodList = [
  { name: "Chapati (1 piece)", protein: 3 },
  { name: "Rice (1 cup cooked)", protein: 4 },
  { name: "Dal (1 bowl)", protein: 9 },
  { name: "Paneer (100g)", protein: 18 },
  { name: "Chicken Breast (100g)", protein: 31 },
  { name: "Egg (1 large)", protein: 6 },
  { name: "Fish (100g)", protein: 22 },
  { name: "Tofu (100g)", protein: 8 },
  { name: "Rajma (1 bowl)", protein: 12 },
  { name: "Chole (1 bowl)", protein: 13 },
  { name: "Mixed Veg Sabzi (1 bowl)", protein: 4 },
  { name: "Bhindi (1 bowl)", protein: 3 },
  { name: "Aloo Sabzi (1 bowl)", protein: 2 },
  { name: "Palak Paneer (1 bowl)", protein: 10 },
  { name: "Butter Naan (1 piece)", protein: 4 },
  { name: "Plain Naan (1 piece)", protein: 3 },
  { name: "Paratha (1 piece)", protein: 4 },
  { name: "Dosa (1 piece)", protein: 2 },
  { name: "Idli (2 pieces)", protein: 3 },
  { name: "Sambar (1 bowl)", protein: 5 },
  { name: "Burger", protein: 15 },
  { name: "Pizza Slice", protein: 10 },
  { name: "Sandwich", protein: 8 },
  { name: "Momos (6 pieces)", protein: 12 },
  { name: "Biryani (1 plate)", protein: 20 },
  { name: "Upma (1 bowl)", protein: 5 },
  { name: "Poha (1 bowl)", protein: 3 },
  { name: "Oats (1 bowl)", protein: 5 },
  { name: "Milk (1 glass)", protein: 8 },
  { name: "Curd (1 bowl)", protein: 6 },
  { name: "Sprouts (1 bowl)", protein: 9 },
  { name: "Peanuts (50g)", protein: 13 },
  { name: "Almonds (10 pcs)", protein: 6 },
  { name: "Protein Shake (1 scoop)", protein: 25 },
  { name: "Cheese Slice", protein: 5 },
  { name: "Pasta (1 cup)", protein: 7 },
  { name: "Maggi (1 pack)", protein: 8 },
  { name: "Fried Rice (1 bowl)", protein: 9 },
  { name: "Veg Pulao (1 bowl)", protein: 8 },
  { name: "Roti with Ghee", protein: 3 },
  { name: "Paneer Butter Masala (1 bowl)", protein: 14 },
  { name: "Dal Makhani (1 bowl)", protein: 12 },
  { name: "Mixed Nuts (50g)", protein: 10 },
  { name: "Soybean (100g)", protein: 36 },
  { name: "Kadhi (1 bowl)", protein: 6 },
  { name: "Mushroom Curry (1 bowl)", protein: 9 },
  { name: "Egg Curry (1 bowl)", protein: 14 },
  { name: "Grilled Chicken (100g)", protein: 28 },
  { name: "Paneer Tikka (100g)", protein: 19 },
  { name: "Omelette (2 eggs)", protein: 12 },
  { name: "Mutton Curry (1 bowl)", protein: 27 },
  { name: "Goat Meat (100g)", protein: 25 },
  { name: "Beef Steak (100g)", protein: 26 },
  { name: "Pork (100g)", protein: 27 },
  { name: "Prawns (100g)", protein: 24 },
  { name: "Crab Curry (1 bowl)", protein: 22 },
  { name: "Egg Bhurji (1 bowl)", protein: 13 },
  { name: "Paneer Bhurji (1 bowl)", protein: 17 },
  { name: "Masala Dosa (1 piece)", protein: 5 },
  { name: "Rava Dosa (1 piece)", protein: 6 },
  { name: "Vada (2 pcs)", protein: 4 },
  { name: "Pav Bhaji (1 plate)", protein: 8 },
  { name: "Misal Pav (1 plate)", protein: 11 },
  { name: "Poha with Peanuts (1 bowl)", protein: 5 },
  { name: "Sabudana Khichdi (1 bowl)", protein: 4 },
  { name: "Kadhi Pakora (1 bowl)", protein: 7 },
  { name: "Aloo Gobi (1 bowl)", protein: 3 },
  { name: "Baingan Bharta (1 bowl)", protein: 4 },
  { name: "Methi Malai Matar (1 bowl)", protein: 7 },
  { name: "Mix Dal (1 bowl)", protein: 10 },
  { name: "Sprouted Moong Salad (1 bowl)", protein: 12 },
  { name: "Green Peas Curry (1 bowl)", protein: 7 },
  { name: "Vegetable Khichdi (1 bowl)", protein: 6 },
  { name: "Kichu (Gujarati Snack)", protein: 4 },
  { name: "Dhokla (4 pieces)", protein: 7 },
  { name: "Thepla (1 piece)", protein: 3 },
  { name: "Handvo (1 slice)", protein: 5 },
  { name: "Khaman (3 pieces)", protein: 6 },
  { name: "Samosa (1 piece)", protein: 4 },
  { name: "Pakora (5 pieces)", protein: 6 },
  { name: "Bread Omelette", protein: 9 },
  { name: "Veg Frankie Roll", protein: 8 },
  { name: "Paneer Roll", protein: 14 },
  { name: "Egg Roll", protein: 11 },
  { name: "Chicken Roll", protein: 18 },
  { name: "Tandoori Chicken (1 piece)", protein: 27 },
  { name: "Butter Chicken (1 bowl)", protein: 25 },
  { name: "Kebab (2 pcs)", protein: 18 },
  { name: "Seekh Kebab (2 pcs)", protein: 20 },
  { name: "Baked Beans (1 bowl)", protein: 10 },
  { name: "Greek Yogurt (1 cup)", protein: 12 },
  { name: "Cottage Cheese (100g)", protein: 18 },
  { name: "Whey Protein Shake (1 scoop)", protein: 24 },
  { name: "Soy Milk (1 glass)", protein: 7 },
  { name: "Peanut Butter (2 tbsp)", protein: 8 },
  { name: "Avocado Toast", protein: 6 },
  { name: "Hummus (3 tbsp)", protein: 3 },
  { name: "Falafel (3 pcs)", protein: 6 },
  { name: "Quinoa (1 cup cooked)", protein: 8 },
  { name: "Brown Rice (1 cup)", protein: 5 },
  { name: "Omelette Sandwich", protein: 14 },
  { name: "Veg Burger", protein: 9 },
  { name: "Chicken Burger", protein: 22 },
  { name: "Paneer Burger", protein: 16 },
  { name: "Sub Sandwich (6 inch)", protein: 18 },
  { name: "French Fries (1 medium)", protein: 4 },
  { name: "Veg Wrap", protein: 9 },
  { name: "Caesar Salad (with chicken)", protein: 21 },
  { name: "Greek Salad", protein: 6 },
  { name: "Protein Bar", protein: 20 },
  { name: "Energy Drink (250ml)", protein: 2 },
  { name: "Banana (1 medium)", protein: 1 },
  { name: "Apple (1 medium)", protein: 0.5 },
  { name: "Mango (1 medium)", protein: 1 },
  { name: "Orange (1 medium)", protein: 1 },
  { name: "Papaya (1 cup)", protein: 1 },
  { name: "Guava (1 medium)", protein: 2 },
  { name: "Watermelon (1 cup)", protein: 1 },
  { name: "Pomegranate (1 cup)", protein: 2 },
  { name: "Cucumber (1 cup)", protein: 1 },
  { name: "Carrot (1 medium)", protein: 1 },
  { name: "Sweet Corn (1 cup)", protein: 5 },
  { name: "Cornflakes with Milk", protein: 7 },
  { name: "Bhel Puri", protein: 5 },
  { name: "Sev Puri", protein: 6 },
  { name: "Pani Puri (6 pcs)", protein: 4 },
  { name: "Vada Pav", protein: 7 },
  { name: "Kachori", protein: 5 },
  { name: "Jalebi (2 pcs)", protein: 2 },
  { name: "Rasgulla (1 piece)", protein: 3 },
  { name: "Gulab Jamun (1 piece)", protein: 2 },
  { name: "Halwa (1 bowl)", protein: 4 },
  { name: "Khichdi (1 bowl)", protein: 6 },
  { name: "Lassi (1 glass)", protein: 8 },
  { name: "Buttermilk (1 glass)", protein: 3 },
  { name: "Chaas (1 glass)", protein: 2 },
  { name: "Raita (1 bowl)", protein: 4 },
  { name: "Soup (1 bowl)", protein: 3 },
  { name: "Tomato Soup", protein: 2 },
  { name: "Sweet Corn Soup", protein: 3 },
  { name: "Chicken Soup", protein: 9 },
  { name: "Vegetable Soup", protein: 2 },
  { name: "Mushroom Soup", protein: 5 },
];

const ProteinIntakeCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [results, setResults] = useState(null);
  const [idealProtein, setIdealProtein] = useState(null);

  const filteredFoods = foodList.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFood = (foodName) => {
    setSelectedFoods((prev) =>
      prev.includes(foodName)
        ? prev.filter((item) => item !== foodName)
        : [...prev, foodName]
    );
  };

  const calculateProtein = () => {
    if (!gender || !age || !weight) {
      setResults("Please fill gender, age, and weight.");
      return;
    }
    if (selectedFoods.length === 0) {
      setResults("Please select at least one food item.");
      return;
    }

    // Calculate actual intake
    const totalProtein = selectedFoods.reduce((sum, name) => {
      const food = foodList.find((f) => f.name === name);
      return sum + (food?.protein || 0);
    }, 0);

    // Ideal intake formula (based on body weight)
    // General: 0.8–1.0 g/kg for normal, 1.2–1.6 for active people
    const multiplier =
      gender === "male"
        ? 1.2 // slightly higher for men
        : 1.0;
    const ideal = (weight * multiplier).toFixed(1);

    setResults(totalProtein);
    setIdealProtein(ideal);
  };

  // Prepare data for bar chart
  const chartData = [
    {
      name: "Protein (g)",
      "Your Intake": Number(results) || 0,
      "Ideal Intake": Number(idealProtein) || 0,
    },
  ];

  function reset(){
    setGender("male")
    setAge("")
    setWeight("")
    setSearch("")
    setSelectedFoods([])
    setResults(null)
    setIdealProtein(null)
  }

  return (
    <div className="h-full overflow-y-scroll patient-scrollbar bg-[var(--bg)] p-10">
      <div className="">
        <section className="flex h-[70vh]">
            {/* left side */}
        <div className="w-full bg-[var(--card)] px-10 py-10 rounded-xs flex flex-col">
            <div className="flex gap-10 items-center">

            <h1 className="text-2xl text-center text-amber-700 mb-4 whitespace-nowrap">
          🍳 Protein Intake & Requirement Calculator
        </h1>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded-xs focus:ring-2 focus:ring-amber-500"
        />
            </div>

        {/* User Details */}
        <div className="flex gap-5 mb-6 items-end">
          <div className="flex justify-center gap-6 ">
            <button
              className={`hover:-translate-y-1 px-6 py-2 rounded-xs border text-xs px-10 cursor-pointer active:scale-90 transition-all ${
                gender === "male"
                  ? "bg-blue-500 text-white"
                  : "bg-[var(--card)]"
              }`}
              onClick={() => setGender("male")}
            >
              <img src="/utilities/male.png" alt="" className="h-10 mb-2" />
              Male
            </button>
            <button
              className={`hover:-translate-y-1 px-6 py-2 rounded-xs border text-xs px-10 cursor-pointer active:scale-90 transition-all ${
                gender === "female"
                  ? "bg-pink-500 text-white"
                  : "bg-[var(--card)]"
              }`}
              onClick={() => setGender("female")}
            >
              <img src="/utilities/female.png" alt="" className="h-10 mb-2" />
              Female
            </button>
          </div>
          <div className="w-full">
                <label className="block text-sm mb-3 flex items-center gap-2">
                  <Calendar size={18} /> Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border p-2.5 rounded-xs"
                />
              </div>
          <div className="w-full">
                <label className="block text-sm mb-3 flex items-center gap-2">
                  <Weight size={18} /> Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border p-2.5 rounded-xs"
                />
              </div>
        </div>

        {/* Food List */}
        <div className="h-full overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 pr-2">
          {filteredFoods.map((food, index) => (
            <motion.div
              key={index}
              onClick={() => toggleFood(food.name)}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer border rounded-xs p-2 text-center text-sm font-medium transition h-max ${
                selectedFoods.includes(food.name)
                  ? "bg-amber-500 text-white"
                  : "bg-amber-50 hover:bg-amber-100 dark:bg-indigo-700"
              }`}
            >
              {food.name} ({food.protein}g)
            </motion.div>
          ))}
        </div>


        <div className="mt-9 flex gap-10 items-center justify-end">
            <button
              onClick={reset}
              className="bg-red-500 w-full justify-center active:scale-90 flex items-center cursor-pointer gap-2 hover:bg-red-600 text-white px-6 py-2 rounded-xs"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button
              onClick={calculateProtein}
              className="bg-amber-500 w-full justify-center active:scale-90 hover:bg-amber-600 text-white px-6 py-2 rounded-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Calculator size={18} />
              Calculate Protein
            </button>
          </div>


        </div>
          {/* results here */}
        <div className={results && "ml-10 px-10 py-10 bg-[var(--card)]"}>
            {/* Results */}
        {results && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {typeof results === "string" ? (
              <div className="flex flex-col items-center gap-10 h-full justify-center">
                <img src="/utilities/why.webp" alt="" className="h-30" />
                <p className="text-red-500 font-medium text-xl">{results}</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-amber-700">
                  Total Protein Intake: {results}g
                </h2>
                <h3 className="text-lg font-semibold mt-1 text-gray-700 dark:text-gray-300">
                  Ideal Intake: {idealProtein}g/day
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {results > idealProtein
                    ? "💪 You’ve consumed more than your ideal intake — good for muscle growth!"
                    : "🍲 You’re below your ideal intake — try adding more protein-rich foods!"}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Bar Graph */}
        {results && typeof results !== "string" && (
          <div className="mt-8">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Your Intake" fill="#f97316" />
                <Bar dataKey="Ideal Intake" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        </div>

        </section>

        {/* Info */}
        <div className="bg-[var(--card)] mt-10 p-10 rounded-xs text-sm text-gray-700 leading-relaxed">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Protein Info"
            className="w-24 mx-auto mb-4"
          />
          <h3 className="text-3xl font-semibold text-center text-amber-700 mb-2">
            🥩 What Is Protein & Why Track It?
          </h3>
          <p className="text-center text-white mt-10">
            Protein helps build and repair body tissues, enzymes, and hormones.
            Your daily requirement depends on your weight, gender, and activity
            level. This calculator helps you track how much protein you’re
            consuming vs. what your body ideally needs.
          </p>
        </div>
      </div>
    </div>
  );
};


export default ProteinIntakeCalculator;
