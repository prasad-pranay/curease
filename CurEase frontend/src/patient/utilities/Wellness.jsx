import { ChevronRight, CircleQuestionMark, History, Send } from "lucide-react";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {AnimatePresence, motion} from "framer-motion"
import toast from "react-hot-toast";

// Define health categories
const categories = [
  { category: "Excellent", min: 80, max: 100, color: "green" },
  { category: "Good", min: 60, max: 79, color: "lime" },
  { category: "Average", min: 40, max: 59, color: "yellow" },
  { category: "Poor", min: 20, max: 39, color: "orange" },
  { category: "Very Poor", min: 0, max: 19, color: "red" },
];

const HealthCategoryGraph = ({ wellnessScore }) => {
  // Build data for bar chart
  const data = categories.map((c) => ({
    category: c.category,
    score: c.min + (c.max - c.min) / 2, // middle value for display
    color: c.color,
  }));

  // Determine which bar is active based on wellnessScore
  const activeIndex = categories.findIndex(
    (c) => wellnessScore >= c.min && wellnessScore <= c.max
  );

  return (
    <div className="h-64 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis dataKey="category" />
          <YAxis />
          {/* <Tooltip
            formatter={(value, name, props) => [`Score Range: ${categories[props.index].min}-${categories[props.index].max}`, name]}
          /> */}
          <Bar dataKey="score">
            {data.map((entry, index) => (
              <cell
                key={`cell-${index}`}
                fill={index === activeIndex ? entry.color : "#ddd"} // highlight active category
              />
            ))}
            <LabelList dataKey="score" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


const questions = [
  {
    question: "How many days per week do you exercise?",
    options: [
      { label: "0-1 days", value: 5 },
      { label: "2-3 days", value: 3 },
      { label: "4-5 days", value: 1 },
      { label: "Everyday", value: 0 },
    ],
  },
  {
    question: "How many hours of sleep do you get on average?",
    options: [
      { label: "<5 hours", value: 5 },
      { label: "5-6 hours", value: 3 },
      { label: "7-8 hours", value: 0 },
      { label: ">8 hours", value: 2 },
    ],
  },
  {
    question: "How would you describe your daily diet?",
    options: [
      { label: "Mostly junk food", value: 5 },
      { label: "Average, some healthy meals", value: 3 },
      { label: "Mostly healthy and balanced", value: 1 },
      { label: "Strictly healthy", value: 0 },
    ],
  },
  {
    question: "How often do you consume alcohol or smoke?",
    options: [
      { label: "Daily", value: 5 },
      { label: "Occasionally", value: 3 },
      { label: "Rarely", value: 1 },
      { label: "Never", value: 0 },
    ],
  },
  {
    question: "How stressed do you feel daily?",
    options: [
      { label: "Very stressed", value: 5 },
      { label: "Somewhat stressed", value: 3 },
      { label: "Occasionally stressed", value: 1 },
      { label: "Rarely stressed", value: 0 },
    ],
  },
  {
    question: "Do you take breaks from screens and work?",
    options: [
      { label: "Never", value: 5 },
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 1 },
      { label: "Regularly", value: 0 },
    ],
  },
  {
    question: "Do you have regular health check-ups?",
    options: [
      { label: "Never", value: 5 },
      { label: "Occasionally", value: 2 },
      { label: "Yes, yearly", value: 1 },
      { label: "Yes, regularly", value: 0 },
    ],
  },
  {
    question: "How often do you consume sugary snacks or drinks?",
    options: [
      { label: "Multiple times a day", value: 5 },
      { label: "Once a day", value: 3 },
      { label: "Few times a week", value: 1 },
      { label: "Rarely", value: 0 },
    ],
  },
  {
    question: "How much water do you drink daily?",
    options: [
      { label: "Rarely", value: 5 },
      { label: "1-2 liters", value: 3 },
      { label: "2-3 liters", value: 1 },
      { label: "3+ liters", value: 0 },
    ],
  },
  {
    question: "Do you practice mindfulness or relaxation?",
    options: [
      { label: "Never", value: 5 },
      { label: "Occasionally", value: 3 },
      { label: "Sometimes", value: 1 },
      { label: "Regularly", value: 0 },
    ],
  },
  {
    question: "How often do you spend time outdoors?",
    options: [
      { label: "Never", value: 5 },
      { label: "Rarely", value: 3 },
      { label: "Sometimes", value: 1 },
      { label: "Daily", value: 0 },
    ],
  },
  {
    question: "How would you rate your posture and mobility?",
    options: [
      { label: "Poor", value: 5 },
      { label: "Average", value: 3 },
      { label: "Good", value: 1 },
      { label: "Excellent", value: 0 },
    ],
  },
];

// Health category based on wellness score
const getHealthCategory = (score) => {
  if (score >= 80) return { category: "Excellent", color: "green" };
  if (score >= 60) return { category: "Good", color: "lime" };
  if (score >= 40) return { category: "Average", color: "yellow" };
  if (score >= 20) return { category: "Poor", color: "orange" };
  return { category: "Very Poor", color: "red" };
};

const WellnessAgeCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [answers, setAnswers] = useState({});
  const [wellnessScore, setWellnessScore] = useState(null);
  const [wellnessAge, setWellnessAge] = useState(null);
  const [currentQuestion,setCurrentQuestion] = useState(0)

  const handleAnswer = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const calculateWellnessAge = () => {
    if (!age) {
      toast.error("Please Enter Your age")
      return
    };
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 5;
    const score = Math.round(((maxScore - totalScore) / maxScore) * 100);
    const wAge = Number(age) + Math.round((100 - score) / 10);

    setWellnessScore(score);
    setWellnessAge(wAge);
  };

  const chartData = [
    { name: "Actual Age", Age: Number(age) || 0 },
    { name: "Wellness Age", Age: wellnessAge || 0 },
  ];

  const category = wellnessScore !== null ? getHealthCategory(wellnessScore) : null;

  return (
    <div className="h-full overflow-y-scroll patient-scrollbar bg-[var(--bg)] p-6">
      <div className="max-w-7xl mx-auto">
        <section className="bg-[var(--card)] px-10 py-10 rounded-sm">

        <div className="flex justify-between">

        <h1 className="text-3xl font-bold text-amber-700 text-center mb-6">
          🧬 Wellness Age Calculator
        </h1>
        {!wellnessAge && <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>}
        {wellnessAge && <div>
          <button className="bg-teal-500 text-white px-10 py-2 rounded-sm active:scale-90 flex items-center gap-3 hover:bg-teal-600 cursor-pointer transition duration-200" onClick={()=>{
            setWellnessAge(null)
            setAnswers({})
            setCurrentQuestion(0)
          }}><History/>Restart</button>
        </div>}
        </div>


        {/* Questions */}
        {!wellnessAge && <div className="px-10 py-10 bg-[var(--bg)] rounded-sm">
          <div className="grid grid-cols-[auto_1fr] gap-10 items-center">
            <p className="flex gap-2 bg-[var(--card)] px-5 py-3 rounded-sm"><CircleQuestionMark/> <span>{currentQuestion+1}</span> of <span>{questions.length}</span></p>
            <h1 className="text-2xl">{questions[currentQuestion]["question"]}</h1>
            <div className="col-span-2 flex justify-between px-10">
              {questions[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(currentQuestion, opt.value)}
                    className={`px-10 py-3 rounded transition duration-200 cursor-pointer active:scale-90 ${
                      answers[currentQuestion] === opt.value
                        ? "bg-[var(--button)] text-white"
                        : "bg-[var(--card)] hover:bg-[var(--button)]/10"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
            </div>
            <div className="col-span-2 flex justify-between border-[var(--card)] pt-5 border-t-2">
              <AnimatePresence>
                {currentQuestion!=0 && <motion.button intial={{opacity:0,scale:0}} exit={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} onClick={()=>setCurrentQuestion(prev=>prev-1)} className="bg-orange-500 text-white px-10 py-3 text-sm rounded-xs flex items-cetner gap-3 active:scale-90 cursor-pointer hover:bg-orange-600 transition duration-200"><History size={18} />Previous</motion.button>}
              </AnimatePresence>
              <AnimatePresence>
                {currentQuestion<questions.length-1 &&  <motion.button intial={{opacity:0,scale:0}} exit={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} onClick={()=>{currentQuestion in answers ? setCurrentQuestion(prev=>prev+1) : toast.error("Please choose a option.")}} className="bg-teal-500 text-white pl-10 pr-8 py-3 text-sm rounded-xs flex items-cetner gap-3 active:scale-90 cursor-pointer hover:bg-teal-600 transition duration-200"> Next <ChevronRight size={18}/></motion.button>}
              </AnimatePresence>
              <AnimatePresence>
                {currentQuestion==questions.length-1 &&  <motion.button intial={{opacity:0,scale:0}} exit={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} onClick={()=>{currentQuestion in answers ?calculateWellnessAge() :toast.error("Please choose a option.")}} className="bg-teal-500 text-white pl-10 pr-8 py-3 text-sm rounded-xs flex items-cetner gap-3 active:scale-90 cursor-pointer hover:bg-teal-600 transition duration-200"> Calculate Result <Send size={18}/></motion.button>}
              </AnimatePresence>
            </div>
          </div>

        </div>}


        {/* Result */}
        {wellnessAge && (
          <div className="mt-6 text-center bg-[var(--bg)] py-5 px-10">
            <h2 className="text-2xl font-bold text-amber-700 mb-2">
              Wellness Age: {wellnessAge} years
            </h2>
            <p className="text-gray-700 mb-2">
              Actual Age: {age} years
            </p>
            <p className={`font-semibold text-${category.color}-600`}>
              Health Category: {category.category}
            </p>
            {/* <HealthCategoryGraph wellnessScore={wellnessScore} /> */}

            {/* Chart */}
            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Age" fill={category.color}>
                    <LabelList dataKey="Age" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        </section>

        {/* Info Section */}
        <div className="mt-10 border-t pt-6 text-gray-700 dark:text-gray-400 space-y-8">
          <div className="bg-[var(--card)] px-10 py-5 rounded-sm">

          <h3 className="text-xl font-semibold text-amber-700 mb-2">
            📝 What is Wellness Age?
          </h3>
          <p>
            Wellness Age is an estimate of your body’s health and vitality based on lifestyle choices and habits. It may differ from your chronological age.
          </p>
          </div>

          <div className="bg-[var(--card)] px-10 py-5 rounded-sm">

          <h3 className="text-xl font-semibold text-amber-700 mb-2">
            ⚙️ How It’s Calculated
          </h3>
          <p>
            Each answer to lifestyle questions contributes to a score. A higher score indicates healthier habits, which results in a wellness age closer to or lower than your actual age.
          </p>
          </div>
          <div className="bg-[var(--card)] px-10 py-5 rounded-sm">

          <h3 className="text-xl font-semibold text-amber-700 mb-2">
            🌱 Why It Matters
          </h3>
          <p>
            Knowing your wellness age helps you understand how your lifestyle affects your body and what areas you can improve for better health and longevity.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessAgeCalculator;
