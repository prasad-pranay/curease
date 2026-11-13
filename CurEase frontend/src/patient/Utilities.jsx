import React from 'react'
import BmrCalculator from "./utilities/Bmr";
import BodyFatCalculator from "./utilities/Bfc";
import BMICalculator from "./utilities/bmi";
import CalorieBurnCalculator from "./utilities/calburn";
import CalorieIntakeCalculator from "./utilities/calorie";
import IdealWeightCalculator from "./utilities/Idealweight";
import LeanBodyMassCalculator from "./utilities/Leanbody";
import ProteinIntakeCalculator from "./utilities/Protien";
import { Link, useNavigate } from 'react-router-dom';
import CalorieCounter from './utilities/CaloriesCounter';
import {motion} from "framer-motion"
import WellnessAgeCalculator from './utilities/Wellness';
import EnhancedDietPage from './utilities/Diet';
import FoodNutritionPage from './utilities/FoodAnalyze';


const Tabs = ({title,image,link})=>{
    const navigate = useNavigate()
    return <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} onClick={()=>navigate(link)} className='active:scale-80 px-10 py-5 rounded-sm bg-[var(--card)] group flex flex-col items-center justify-center gap-5 text-base transition-transform duration-500 cursor-pointer hover:-translate-y-1'> 
        <img src={`/utilities/${image}`} alt="" className='h-20 w-max group-hover:scale-105 transition-transform duration-500' />
        <p className='font-light text-base '>{title}</p>
    </motion.div>
}

const BreadCrumb = ({tabNumber})=>{
    const List = ["basal-metabolic-rate","body-fat-calculator","body-mass-index","calories-burned","calories-intake","calories-counter","ideal-weight-calculator","lean-body-mass-calculator","protien-counter","Wellness Age","Diet Calculator","Food Nutrition"]
    return <div className="flex flex-wrap px-10 py-5 items-center space-x-2 text-sm text-gray-500 font-medium">
    <Link to="/" type="button" aria-label="Home">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7.609c.352 0 .69.122.96.343l.111.1 6.25 6.25v.001a1.5 1.5 0 0 1 .445 1.071v7.5a.89.89 0 0 1-.891.891H9.125a.89.89 0 0 1-.89-.89v-7.5l.006-.149a1.5 1.5 0 0 1 .337-.813l.1-.11 6.25-6.25c.285-.285.67-.444 1.072-.444Zm5.984 7.876L16 9.5l-5.984 5.985v6.499h11.968z" fill="#475569" stroke="#475569" strokeWidth=".094"/>
        </svg>
    </Link>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <Link to="/utilities" className='hover:pb-1 transition-all duration-300 active:scale-80'>Utilities</Link>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328" fill="#CBD5E1"/>
    </svg>
    <p className="text-indigo-500 capitalize">{List[tabNumber].replaceAll("-"," ")}</p>
</div>
}
const Utilities = ({tabNumber}) => {


  return (
    <main className='h-full overflow-y-auto patient-scrollbar'>

        {tabNumber==-1 && <section className='bg-[var(--bg)] pt-5'>
        <motion.div initial={{scale:0,opacity:0,y:"-100px"}} animate={{scale:1,opacity:1,y:0}} transition={{duration:.5}} className='flex items-center justify-center border-b-1 w-max pr-10 pl-5 mx-auto'>
            <img src="/utilities/utilities.png" alt="" className='h-20' />
            <h1 className='text-[var(--text)] text-4xl font-light'>Utilities & Tools</h1>
        </motion.div>

        <div className='grid grid-cols-4 gap-10 px-15 py-15'>
            <Tabs link="/utilities/basal-metabolic-rate" title="BMR Calculator" image="bmr.png" />
            <Tabs link="/utilities/body-fat-calculator" title="Body Fat Calculator" image="bodyfat.png" />
            <Tabs link="/utilities/body-mass-index" title="Body Mass Index (BMI)" image="bmi.png" />
            <Tabs link="/utilities/calories-burned" title="Calories Burned Counter" image="calorieburned.png" />
            <Tabs link="/utilities/calories-intake" title="Calorie Need Counter" image="calorie.png" />
            <Tabs link="/utilities/calories-counter" title="Calorie Counter" image="calorie.png" />
            <Tabs link="/utilities/ideal-weight-calculator" title="Ideal Weight Calculator" image="weight.png" />
            <Tabs link="/utilities/lean-body-mass-calculator" title="Lean Body Mass Calculator" image="leanbodymass.png" />
            <Tabs link="/utilities/protien-counter" title="Protein Counter" image="protien.png" />
            <Tabs link="/utilities/wellness" title="Wellness Age" image="wellness.png" />
            <Tabs link="/utilities/diet" title="Your Diet" image="diet.png" />
            <Tabs link="/utilities/food-analyze" title="Food Nutrition Analyze" image="food.png" />
        </div>
        </section>}
        
        {tabNumber!=-1 && <main className='h-full flex flex-col relative'>
            <div className='bg-[var(--bg)]'>
                <BreadCrumb tabNumber={tabNumber} />
            </div>
        {tabNumber==0 && <BmrCalculator />}
        {tabNumber==1 && <BodyFatCalculator />}
        {tabNumber==2 && <BMICalculator />}
        {tabNumber==3 && <CalorieBurnCalculator />}
        {tabNumber==4 && <CalorieIntakeCalculator />}
        {tabNumber==5 && <CalorieCounter />}
        {tabNumber==6 && <IdealWeightCalculator />}
        {tabNumber==7 && <LeanBodyMassCalculator />}
        {tabNumber==8 && <ProteinIntakeCalculator />}
        {tabNumber==9 && <WellnessAgeCalculator />}
        {tabNumber==10 && <EnhancedDietPage />}
        {tabNumber==11 && <FoodNutritionPage />}
        </main>}
    </main>
  )
}

export default Utilities
