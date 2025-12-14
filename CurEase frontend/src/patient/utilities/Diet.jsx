import { Trash } from "lucide-react";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

// Food database with macros and images
const foodItems = [
  { name: "Chapati", calories: 71, protein: 3, carbs: 15, fat: 1, image: "https://picsum.photos/seed/chapati/200/200" },
  { name: "Roti", calories: 71, protein: 3, carbs: 15, fat: 1, image: "https://picsum.photos/seed/roti/200/200" },
  { name: "Paratha", calories: 260, protein: 5, carbs: 38, fat: 10, image: "https://picsum.photos/seed/paratha/200/200" },
  { name: "Puri (1 pc)", calories: 75, protein: 1.5, carbs: 6, fat: 5, image: "https://picsum.photos/seed/puri/200/200" },
  { name: "Dosa", calories: 168, protein: 3.9, carbs: 33, fat: 2.7, image: "https://picsum.photos/seed/dosa/200/200" },
  { name: "Masala Dosa", calories: 312, protein: 7, carbs: 50, fat: 10, image: "https://picsum.photos/seed/masaladosa/200/200" },
  { name: "Idli", calories: 58, protein: 2, carbs: 12, fat: 0.4, image: "https://picsum.photos/seed/idli/200/200" },
  { name: "Idli with Sambar", calories: 150, protein: 4, carbs: 25, fat: 3, image: "https://picsum.photos/seed/idli-sambar/200/200" },
  { name: "Poha (100g)", calories: 110, protein: 2.3, carbs: 24, fat: 1, image: "https://picsum.photos/seed/poha/200/200" },
  { name: "Upma (100g)", calories: 155, protein: 4, carbs: 27, fat: 3, image: "https://picsum.photos/seed/upma/200/200" },
  { name: "Khichdi", calories: 198, protein: 7, carbs: 30, fat: 4, image: "https://picsum.photos/seed/khichdi/200/200" },
  { name: "Biryani (1 plate)", calories: 292, protein: 10, carbs: 44, fat: 7, image: "https://picsum.photos/seed/biryani/200/200" },
  { name: "Jeera Rice", calories: 220, protein: 4, carbs: 36, fat: 5, image: "https://picsum.photos/seed/jeerarice/200/200" },
  { name: "Rajma (1 cup)", calories: 210, protein: 13, carbs: 36, fat: 2, image: "https://picsum.photos/seed/rajma/200/200" },
  { name: "Chole (1 cup)", calories: 280, protein: 14, carbs: 35, fat: 8, image: "https://picsum.photos/seed/chole/200/200" },
  { name: "Paneer Butter Masala", calories: 335, protein: 12, carbs: 14, fat: 28, image: "https://picsum.photos/seed/pbm/200/200" },
  { name: "Paneer (100g)", calories: 265, protein: 18, carbs: 6, fat: 20, image: "https://picsum.photos/seed/paneer/200/200" },
  { name: "Sambar (1 cup)", calories: 120, protein: 4, carbs: 18, fat: 3, image: "https://picsum.photos/seed/sambar/200/200" },
  { name: "Pav Bhaji", calories: 400, protein: 7, carbs: 45, fat: 20, image: "https://picsum.photos/seed/pavbhaji/200/200" },
  { name: "Vada Pav", calories: 290, protein: 5, carbs: 44, fat: 10, image: "https://picsum.photos/seed/vadapav/200/200" },
  { name: "Misal Pav", calories: 350, protein: 12, carbs: 48, fat: 14, image: "https://picsum.photos/seed/misal/200/200" },
  { name: "Samosa", calories: 252, protein: 3, carbs: 24, fat: 17, image: "https://picsum.photos/seed/samosa/200/200" },
  { name: "Medu Vada", calories: 97, protein: 2, carbs: 12, fat: 4, image: "https://picsum.photos/seed/meduvada/200/200" },
  { name: "Gulab Jamun", calories: 150, protein: 2, carbs: 25, fat: 5, image: "https://picsum.photos/seed/gulabjamun/200/200" },
  { name: "Rasgulla", calories: 106, protein: 4, carbs: 22, fat: 0.5, image: "https://picsum.photos/seed/rasgulla/200/200" },
  { name: "Aloo Gobi", calories: 150, protein: 3, carbs: 18, fat: 7, image: "https://picsum.photos/seed/aloogobi/200/200" },
  { name: "Aloo Paratha", calories: 300, protein: 6, carbs: 36, fat: 12, image: "https://picsum.photos/seed/alooparatha/200/200" },
  { name: "Dhokla", calories: 110, protein: 5, carbs: 18, fat: 3, image: "https://picsum.photos/seed/dhokla/200/200" },
  { name: "Kachori", calories: 210, protein: 4, carbs: 22, fat: 11, image: "https://picsum.photos/seed/kachori/200/200" },
  { name: "Lassi", calories: 250, protein: 8, carbs: 25, fat: 12, image: "https://picsum.photos/seed/lassi/200/200" },
];
const EnhancedDietPage = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState(1.375);
  const [goal, setGoal] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [search, setSearch] = useState("");

  // Food selection
  const addFood = (food) => setSelectedFoods([...selectedFoods, food]);
  const removeFood = (i) => setSelectedFoods(selectedFoods.filter((_, idx) => idx !== i));

  const filteredFoods = foodItems.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  // Totals
  const total = selectedFoods.reduce((sum, f) => ({
    calories: sum.calories + f.calories,
    protein: sum.protein + f.protein,
    carbs: sum.carbs + f.carbs,
    fat: sum.fat + f.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Calculate suggested intake (BMR + TDEE)
  const calculateTDEE = () => {
    if (!weight || !height || !age) return null;
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    let bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    return Math.round(bmr * activity + goal);
  };

  const tdee = calculateTDEE();
  const idealProtein = weight ? Math.round(weight * 1.5) : 50; // grams

  // Chart data
  const chartData = [
    { name: "Calories", actual: total.calories, ideal: tdee || 0 },
    { name: "Protein (g)", actual: total.protein, ideal: idealProtein },
    { name: "Carbs (g)", actual: total.carbs, ideal: Math.round((tdee || 0) * 0.5 / 4) },
    { name: "Fat (g)", actual: total.fat, ideal: Math.round((tdee || 0) * 0.25 / 9) },
  ];

  return (
    <div className="h-full overflow-y-scroll patient-scrollbar bg-[var(--bg)] patient-scrollbar">
      <div className="max-w-7xl mx-auto shadow-xl rounded-2xl">

        <main className="bg-[var(--card)] px-10 py-10">

        
        <div className="flex justify-between gap-20">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center whitespace-nowrap">🥗 Nutrition Dashboard</h1>
        <input type="text" placeholder="Search Food..." value={search} onChange={e => setSearch(e.target.value)} className="h-max p-2 border rounded w-full"/>
        </div>


        <section className="grid grid-cols-[.5fr_1fr] gap-5">

        
        {/* User Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4 w-full">
          <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} className="p-2 border rounded"/>
          <select value={gender} onChange={e => setGender(e.target.value)} className="p-2 border rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} className="p-2 border rounded"/>
          <input type="number" placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} className="p-2 border rounded"/>
          <select value={activity} onChange={e => setActivity(parseFloat(e.target.value))} className="p-2 border rounded col-span-2">
            <option value={1.2}>Sedentary</option>
            <option value={1.375}>Lightly Active</option>
            <option value={1.55}>Moderately Active</option>
            <option value={1.725}>Very Active</option>
            <option value={1.9}>Extra Active</option>
          </select>
          <select value={goal} onChange={e => setGoal(parseInt(e.target.value))} className="p-2 border rounded col-span-2">
            <option value={-500}>Lose Weight</option>
            <option value={0}>Maintain Weight</option>
            <option value={500}>Gain Weight</option>
          </select>
        </div>

        {/* Nutrition Chart */}
        <div className="h-80 w-full row-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} className="text-black" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ideal" fill="#FBBF24" name="Ideal">
                <LabelList dataKey="ideal" position="top" />
              </Bar>
              <Bar dataKey="actual" name="Actual" fill="#10B981">
                <LabelList dataKey="actual" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      {/* Suggested Values */}
        {tdee && (
          <div className="text-center">
            <p className="font-semibold">Suggested Daily Calories: {tdee} kcal</p>
            <p className="font-semibold">Suggested Protein: {idealProtein} g</p>
          </div>
        )}
        </section>

</main>


        <section className="grid grid-cols-2 gap-x-10 bg-[var(--card)] px-10 pt-10 mt-10 rounded-sm mb-10">

        {/* Food Grid */}
        <div className="grid sm:grid-cols-3 row-span-2 md:grid-cols-4 gap-4 mb-6 max-h-100 overflow-y-auto patient-scrollbar">
          {filteredFoods.map((food, i) => (
            <div key={i} className="border p-2 active:scale-90 hover:bg-[var(--bg)] rounded cursor-pointer hover:shadow-lg transition" onClick={() => addFood(food)}>
              <img src={food.image} alt={food.name} className="h-20 w-full object-cover rounded mb-2"/>
              <p className="font-semibold text-center">{food.name}</p>
              <p className="text-sm text-gray-600 text-center">{food.calories} kcal | {food.protein}g protein</p>
            </div>
          ))}
        </div>

        {/* Selected Foods */}
        <h2 className="text-xl font-semibold mb-2">Selected Foods:</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-h-90 overflow-y-auto patient-scrollbar">
          {selectedFoods.map((food, i) => (
            <div key={i} className="border h-max px-5 py-3 rounded flex items-center justify-between">
              <span>{food.name} ({food.calories} kcal)</span>
              <button onClick={() => removeFood(i)} className="bg-red-500 text-white px-2 py-2 cursor-pointer active:scale-95 rounded hover:bg-red-600"><Trash size={18}/></button>
            </div>
          ))}
        </div>
          </section>

        

        

      </div>
    </div>
  );
};

export default EnhancedDietPage;
