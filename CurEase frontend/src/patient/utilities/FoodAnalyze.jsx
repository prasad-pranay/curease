import React, { useState } from "react";
import { motion } from "framer-motion";
import PixelTransition from "../../component/PixelTransition"
import { File } from "lucide-react";

const HeroImage = ({src,value})=>{
    return <PixelTransition
  firstContent={
    <img
      src={src}
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111"
      }}
    >
      <p className="text-2xl px-5">{value ? 'To begin analyzing the nutrients in this food image, click the "Start Analyzing" button.':"Upload an image of your food plate, and a preview of the image will be displayed here."}</p>
    </div>
  }
  gridSize={12}
  pixelColor='#ffffff'
  once={false}
  animationStepDuration={0.4}
  className="custom-pixel-card"
/>
}

const SampleCard = ({img,category,calories,protein,fat,carbohydrates,fiber,sugar})=>{
    return <div className="flex items-center justify-evenly bg-[var(--bg)] rounded-xs p-5 transition-transform duration-300 hover:-translate-y-1 group">
            <img src={typeof img === "string" ? `/utilities/${img}` : URL.createObjectURL(img)} alt="" className="h-60 rounded-sm group-hover:scale-105 transition-transform duration-300" />
            <div className="text-md">
                {/* "fried_rice": {"calories": 400, "protein": 10, "fat": 15, "carbohydrates": 60, "fiber": 3, "sugar": 3}, */}
                <p>"Category" <i className="text-blue-600 px-1">:</i> "<span className="text-teal-500 ">{category}</span>"</p>
                <p>"Nutrient Info" <i className="text-blue-600 px-1">:</i>  <span className="text-yellow-500">&#123;</span> </p>
                <div className="pl-10">
                    <p>"calories" <i className="text-blue-600 px-1">:</i> "<span className="text-teal-500 ">{calories}</span>"</p>
                    <p>"protein" <i className="text-blue-600 px-1">:</i> "<span className="text-teal-500 ">{protein}</span>"</p>
                    <p>"fat" <i className="text-blue-600 px-1">:</i> "<span className="text-teal-500 ">{fat}</span>"</p>
                    <p>"carbohydrates" <i className="text-blue-600 px-1">:</i> "<span className="text-teal-500 ">{carbohydrates}</span>"</p>
                    <p>"fiber" <i className="text-blue-600 px-1">:</i> "<span className="text-teal-500 ">{fiber}</span>"</p>
                    <p>"sugar" <i className="text-blue-600 px-1">:</i> "<span className="text-teal-500 ">{sugar}</span>"</p>
                </div>
                <p><span className="text-yellow-500">&#125;</span></p>
            </div>
          </div>
}

const FoodNutritionPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    // Sending file to backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/food-image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data.data); // Assume backend returns { calories: ..., protein: ..., fat: ..., carbs: ... }
    } catch (error) {
      setResult({ error: "Something went wrong!" });
    }
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll patient-scrollbar bg-[var(--bg)] p-10">
        {/* Title */}
        <section className="transition-transform duration-300 hover:-translate-y-1 p-10 rounded-xs bg-[var(--card)]">

        
        {/* Image Upload Section */}
        <div className={`text-center mb-6 grid ${result ? "grid-cols-[1fr_1fr]":"grid-cols-[.5fr_1fr]"}`}>
            <div className="flex justify-center">
                {!result && <HeroImage src={file ? URL.createObjectURL(file) : "/utilities/diet.png"} value={file ? true : false} />}
                {result && <SampleCard img={file} category={result.category} calories={result.calories} protein={result.protein} fat={result.fat} carbohydrates={result.carbohydrates} fiber={result.fiber} sugar={result.sugar} />}
            </div>
            <section className="bg-[var(--card)] px-10 py-10 rounded-xs flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center text-amber-700  mb-6">
              🥗 Food Nutrition Analyzer
            </h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                Understanding the nutritional content of the food you eat helps you
                make healthier choices, balance your diet, manage weight, and meet
                your fitness goals. This tool provides a quick analysis using your
                food images so you can track nutrients easily.
            </p>

            <input
            type="file"
            id="food-analyze-file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
            hidden
          />
          
            <div  className="flex gap-x-30 items-center mt-10">
                {file && <p className="flex items-center gap-3"><File/>{file.name}</p>}
                {(!file || result) && <label htmlFor="food-analyze-file"
                  className="bg-amber-600 hover:scale-105 cursor-pointer active:scale-100 transition-transform duration-200 text-white px-13 py-2.5 rounded-xs hover:bg-amber-700 transition w-max"
                  >
                  Upload  {result && "Another"} Food Image
                </label>}
                {(file && !result) && <div onClick={handleUpload} className="bg-amber-600 hover:scale-105 cursor-pointer active:scale-100 transition-transform duration-200 text-white px-13 py-2.5 rounded-xs hover:bg-amber-700 transition w-max">
                  {loading ? "Analyzing..." : "Start Analyzing"}
                </div>}
              </div>
            </section>
        </div>
        </section>

        {/* Sample Data Section */}
        <section className="transition-transform duration-300 hover:-translate-y-1 mb-8 bg-[var(--card)] mt-15 p-10 rounded-xs">
          <h2 className="text-3xl font-bold text-amber-700 mb-3 text-center">
            📝 Sample Data
          </h2>
          {/* <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-amber-200 text-gray-700">
              <thead className="bg-amber-100">
                <tr>
                  <th className="border border-amber-200 p-2">Food</th>
                  <th className="border border-amber-200 p-2">Calories (kcal)</th>
                  <th className="border border-amber-200 p-2">Protein (g)</th>
                  <th className="border border-amber-200 p-2">Fat (g)</th>
                  <th className="border border-amber-200 p-2">Carbs (g)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-amber-200 p-2">Apple</td>
                  <td className="border border-amber-200 p-2">52</td>
                  <td className="border border-amber-200 p-2">0.3</td>
                  <td className="border border-amber-200 p-2">0.2</td>
                  <td className="border border-amber-200 p-2">14</td>
                </tr>
                <tr>
                  <td className="border border-amber-200 p-2">Chicken Breast (100g)</td>
                  <td className="border border-amber-200 p-2">165</td>
                  <td className="border border-amber-200 p-2">31</td>
                  <td className="border border-amber-200 p-2">3.6</td>
                  <td className="border border-amber-200 p-2">0</td>
                </tr>
                <tr>
                  <td className="border border-amber-200 p-2">Rice (1 cup)</td>
                  <td className="border border-amber-200 p-2">200</td>
                  <td className="border border-amber-200 p-2">4</td>
                  <td className="border border-amber-200 p-2">0.4</td>
                  <td className="border border-amber-200 p-2">44</td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <div className="grid grid-cols-2 gap-5 mt-10">
                <SampleCard img="food-friedrice.jpg" category="Fried Rice" calories="400" protein="10" fat="15" carbohydrates="60" fiber="3" sugar="3" />
                <SampleCard img="food-samosa.jpg" category="Samosa" calories=" 250" protein=" 5" fat=" 15" carbohydrates=" 25" fiber=" 2" sugar=" 2"/>
                <SampleCard img="food-sandwich.jpg" category="Sandwich" calories= "450" protein= "25" fat= "20" carbohydrates= "40" fiber= "4" sugar= "4" />
                <SampleCard img="food-pizza.jpg" category="Pizza" calories= "400" protein= "18" fat= "15" carbohydrates= "50" fiber= "3" sugar= "5" />
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="text-center text-gray-600 dark:text-gray-300 mt-15">
          <p className="mb-2">
            ⚠️ Disclaimer: We do <strong>not save</strong> any of your uploaded
            images or personal data. All analysis is done temporarily and
            securely.
          </p>
          <p className="text-sm">
            This tool is for informational purposes only and should not replace
            professional medical advice.
          </p>
        </section>
    </div>
  );
};

export default FoodNutritionPage;
