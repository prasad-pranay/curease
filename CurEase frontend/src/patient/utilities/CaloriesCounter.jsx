import { Calendar, CircleSmall, Mars, Venus, Weight } from "lucide-react";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const foodList = [
  { name: "Chapati (1 piece)", calories: 120 },
  { name: "Rice (1 cup)", calories: 200 },
  { name: "Dal (1 bowl)", calories: 150 },
  { name: "Paneer (100g)", calories: 260 },
  { name: "Chicken Curry (1 bowl)", calories: 300 },
  { name: "Fish Curry (1 bowl)", calories: 280 },
  { name: "Egg (1)", calories: 80 },
  { name: "Burger", calories: 350 },
  { name: "Pizza (1 slice)", calories: 285 },
  { name: "Naan (1 piece)", calories: 150 },
  { name: "Aloo Sabzi (1 bowl)", calories: 180 },
  { name: "Chole (1 bowl)", calories: 220 },
  { name: "Rajma (1 bowl)", calories: 230 },
  { name: "Fried Rice (1 cup)", calories: 250 },
  { name: "Idli (1 piece)", calories: 70 },
  { name: "Dosa (1)", calories: 160 },
  { name: "Maggi (1 plate)", calories: 320 },
  { name: "Paratha (1)", calories: 210 },
  { name: "Biryani (1 cup)", calories: 290 },
  { name: "Samosa (1)", calories: 150 },
  { name: "Pav Bhaji", calories: 400 },
  { name: "Sandwich", calories: 250 },
  { name: "Salad (1 bowl)", calories: 90 },
  { name: "Coke (1 glass)", calories: 140 },
  { name: "Milk (1 glass)", calories: 120 },
  { name: "Curd (1 bowl)", calories: 100 },
  { name: "Gulab Jamun (1 piece)", calories: 180 },
  { name: "Ice Cream (1 scoop)", calories: 130 },
  { name: "Pasta (1 cup)", calories: 220 },
  { name: "French Fries (medium)", calories: 310 },
];

const CalorieCounter = () => {
  const [search, setSearch] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [caloriesRequired, setCaloriesRequired] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleSelectFood = (food) => {
    if (!selectedFoods.includes(food)) {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const handleRemoveFood = (food) => {
    setSelectedFoods(selectedFoods.filter((f) => f.name !== food.name));
  };

  const calculateCaloriesRequired = () => {
    if (!age || !weight) return;

    // Simple BMR estimate (approx)
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * 170 - 5 * age + 5
        : 10 * weight + 6.25 * 160 - 5 * age - 161;

    setCaloriesRequired(Math.round(bmr));
  };

  const calculateTotalCalories = () => {
    const total = selectedFoods.reduce((sum, f) => sum + f.calories, 0);
    setTotalCalories(total);
  };

  const filteredFoods = foodList.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const progressData = [
    { name: "Calories Consumed", value: totalCalories },
    { name: "Ideal Daily Need", value: caloriesRequired || 0 },
  ];

  function reset() {
    setSearch("");
    setSelectedFoods([]);
    setAge("");
    setGender("male");
    setWeight("")
    setCaloriesRequired(null);
    setTotalCalories(0);
  }

  return (
    <div className="h-full overflow-y-scroll patient-scrollbar bg-[var(--bg)] text-[var(--text)] font-light px-10 pt-5">
      <section className="flex gap-10">
        <div className="grid grid-cols-[1fr_1fr] w-full bg-[var(--card)] px-10 py-10 rounded gap-y-5 gap-x-10">
          <h1 className="text-3xl font-bold text-amber-700 mb-4 col-span-2">
            🍱 Daily Calorie Counter
          </h1>

          {/* Inputs */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"> */}
          <div className="col-span-2 flex gap-10">
            <div className="grid grid-cols-2 gap-x-5 w-full">
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
                  gender == "female"
                    ? "text-[var(--card)] bg-[var(--text)]"
                    : ""
                } `}
                onClick={() => setGender("female")}
              >
                <Venus size={20} /> Female
              </button>
            </div>
            <div className="w-full">
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
            <div className="w-full">
              <label className="block text-sm mb-2 flex items-center gap-2">
                <Weight size={18} /> Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border p-2 rounded-xs"
              />
            </div>
          </div>

          <button
            onClick={reset}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reset
          </button>
          <button
            onClick={calculateCaloriesRequired}
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            Calculate Daily Calorie Need
          </button>
        </div>

        {caloriesRequired && (
          <p className="text-center  text-xl text-gray-700 dark:text-gray-300 font-medium bg-[var(--card)] flex flex-col px-10 py-10 justify-center items-center ">
            Your estimated daily calorie need:{" "}
            <span className="text-amber-700 font-bold text-2xl mt-5">
              {caloriesRequired} kcal
            </span>
          </p>
        )}
      </section>

      {totalCalories==0&&<section className="flex gap-10 px-10 py-10 bg-[var(--card)] mt-10">
        {/* Search and Food List */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border w-full rounded"
        />

        <div className="max-h-48 overflow-y-auto mt-2 border p-2 rounded">
          {filteredFoods.map((food) => (
            <div
              key={food.name}
              className="flex justify-between items-center p-2 hover:bg-[var(--bg)] cursor-pointer rounded"
              onClick={() => handleSelectFood(food)}
            >
              <span>{food.name}</span>
              <span className="text-sm text-gray-600">
                {food.calories} kcal
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Foods */}
      {selectedFoods.length > 0 && (
        <div className="w-full">
          <h2 className="font-bold text-lg text-amber-700 mb-2">
            Selected Foods
          </h2>
          {selectedFoods.map((food) => (
            <div
              key={food.name}
              className="flex justify-between bg-[var(--bg)] p-2 mb-1 rounded"
            >
              <span>{food.name}</span>
              <span>
                {food.calories} kcal{" "}
                <button
                  onClick={() => handleRemoveFood(food)}
                  className="text-red-500 text-sm ml-2"
                >
                  ✕
                </button>
              </span>
            </div>
          ))}
          <button
            onClick={calculateTotalCalories}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Calculate Total
          </button>
        </div>
      )}
      </section>}

      {/* Results */}
      {totalCalories > 0 && (
        <div className="mt-6 bg-[var(--card)] p-10 rounded-xs text-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300">
            Total Calories Consumed:{" "}
            <span className="text-amber-700">{totalCalories} kcal</span>
          </h3>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData} className="text-black">
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[10, 10, 0, 0]} />
                <ReferenceLine
                  y={caloriesRequired}
                  label={{
                    value: "Your Limit",
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

          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {totalCalories < caloriesRequired
              ? "You’re under your daily limit. Great job!"
              : totalCalories === caloriesRequired
              ? "Perfect! You’ve met your calorie goal!"
              : "You’ve exceeded your daily calorie limit. Try adjusting your intake."}
          </p>
        </div>
      )}

      <div className="mt-10 ">
        {/* Ideal Calorie Chart */}
        <section className="mb-8 bg-[var(--card)] p-10 rounded-xs">
          <h3 className="text-2xl font-semibold text-amber-600 mb-3">
            📊 Ideal Daily Calorie Intake Chart
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-amber-200 text-gray-700 dark:text-gray-300">
              <thead className="bg-amber-100 dark:bg-amber-900">
                <tr>
                  <th className="border border-amber-200 p-2">Category</th>
                  <th className="border border-amber-200 p-2">
                    Male (kcal/day)
                  </th>
                  <th className="border border-amber-200 p-2">
                    Female (kcal/day)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-amber-200 p-2">Sedentary</td>
                  <td className="border border-amber-200 p-2">2000–2400</td>
                  <td className="border border-amber-200 p-2">1600–2000</td>
                </tr>
                <tr>
                  <td className="border border-amber-200 p-2">
                    Moderately Active
                  </td>
                  <td className="border border-amber-200 p-2">2400–2800</td>
                  <td className="border border-amber-200 p-2">2000–2200</td>
                </tr>
                <tr>
                  <td className="border border-amber-200 p-2">Active</td>
                  <td className="border border-amber-200 p-2">2800–3200</td>
                  <td className="border border-amber-200 p-2">2200–2400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-8 bg-[var(--card)] p-10 rounded-xs">
          <h3 className="text-2xl font-semibold text-amber-600 mb-2">
            🔍 What is a Calorie Counter?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A calorie counter helps you track how much energy you consume from
            food throughout the day. Every food item provides a certain amount
            of energy measured in kilocalories (kcal), which your body uses for
            daily activities like walking, working, and even sleeping. Tracking
            your calorie intake helps you stay aware of your diet and maintain
            your desired body weight.
          </p>
        </section>

        {/* Calculation Section */}
        <section className="mb-8 bg-[var(--card)] p-10 rounded-xs">
          <h3 className="text-2xl font-semibold text-amber-600 mb-2">
            ⚙️ How Do We Calculate It?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            We calculate your estimated daily calorie requirement using the{" "}
            <strong>Mifflin-St Jeor Equation</strong>, which considers your{" "}
            <strong>gender, age, and body weight</strong>. This gives an
            estimate of your <strong>Basal Metabolic Rate (BMR)</strong> — the
            calories your body needs at rest.
          </p>

          <div className="bg-[var(--bg)] p-4 rounded-lg border-l-4 border-amber-500 shadow-sm text-gray-700 dark:text-gray-300">
            <p className="font-semibold">🧮 Mifflin-St Jeor Formula:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>
                <strong>Men:</strong> BMR = 10 × weight (kg) + 6.25 × height
                (cm) − 5 × age + 5
              </li>
              <li>
                <strong>Women:</strong> BMR = 10 × weight (kg) + 6.25 × height
                (cm) − 5 × age − 161
              </li>
            </ul>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-3">
            We then compare your total calorie intake (from selected foods) with
            your daily requirement to show whether you are under, meeting, or
            exceeding your calorie goal.
          </p>
        </section>

        {/* Why Track Calories */}
        <section className="mb-8 bg-[var(--card)] p-10 rounded-xs">
          <h3 className="text-2xl font-semibold text-amber-600 mb-2">
            🍽️ Why Should You Track Calories?
          </h3>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-1">
            <li>Helps maintain or achieve a healthy weight.</li>
            <li>Provides better understanding of food nutrition.</li>
            <li>Supports muscle gain or fat loss goals.</li>
            <li>Encourages mindful eating and portion control.</li>
            <li>Improves overall dietary awareness.</li>
          </ul>
        </section>

        

        {/* Images Section */}
        <section className="text-center mt-8 bg-[var(--card)] p-10 rounded-xs mb-8">
          <h3 className="text-2xl font-semibold text-amber-600 mb-3">
            🥗 Balanced Nutrition Matters
          </h3>
          <p className="text-gray-700 mb-4 dark:text-gray-300">
            A balanced diet with proper calorie intake ensures optimal energy,
            focus, and health. Remember: It’s not just about how much you eat,
            but what you eat!
          </p>
          <div className="flex justify-evenly flex-wrap gap-4">
            <img
              src="https://static.vecteezy.com/system/resources/previews/010/438/223/non_2x/healthy-food-in-circle-vector.jpg"
              alt="Healthy Food"
              className="w-64 h-40 object-cover rounded-lg shadow-md"
            />
            <img
              src="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg"
              alt="Meal Prep"
              className="w-64 h-40 object-cover rounded-lg shadow-md"
            />
            <img
              src="https://media.gettyimages.com/id/1325245585/vector/cartoon-5-food-groups-nutrition-picture-for-children-this-is-a-vector-illustration-for.jpg?s=612x612&w=gi&k=20&c=JwvVTOxuRNuREgqVOK1Q5zt9F_NcRHEfPo4KnupRDgQ="
              alt="Nutrition"
              className="w-64 h-40 object-cover rounded-lg shadow-md"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CalorieCounter;
