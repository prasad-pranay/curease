import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export async function AddNewPatient(Phone,Email,Name,Password,ImageUrl=null) {
  const DateTime = new Date()
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const DATA = {
    name: Name,
    password: Password,
    joining_date: `${DateTime.getHours()}:${DateTime.getMinutes()} | ${DateTime.getDate()} ${month[DateTime.getMonth()]}, ${DateTime.getFullYear()}`,
    plan: "basic",
    image: "", // this will be changed in backend
    gender: "",
    info: {
      "dob": "",
      "blood_group": "",
      "occupation": "",
      "age": 0,
      "emergency": "",
    },
    contact: {phone: Phone,email: Email,location: "",},
    cart:{default: {},},
    address: [],
    payment: [],
    chat: {type: Map,default: {},},
    notification: {type: Map,default: {},},
  };

    const formData = new FormData();
    // append text fields
    // Object.keys(DATA).forEach((key) => {
    //   if (key !== "imageUrl") formData.append(key, DATA[key]);
    // });
    // append file
    formData.append("data",JSON.stringify(DATA))
    if (ImageUrl) formData.append("image", ImageUrl);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/patient/addNewPatient`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success:", res.data);
    } catch (err) {
      console.error("Error:", err);
    }


  // DATA FORMAT
  // name
  // password
  // joining_date
  // plan
  // imageUrl
  // info: {dob,blood_group,occupation,age,emergency}
  // cart: {id : {title,image,price,quantity} }
  // chat:{id:{date:date,time:time,chat:[[ques,ans]]}
  // address:[{name:name,address:address,pincode:pincode,mobile:mobileno}]
  // payment:[{cardNo:cardno,cvv:cvv,expiry:expiry}]
  // contact:{phone:phone,email,loctation}
  // notification:{id:{title,content:content,read:bool}}

}


// THIS LOGIN IS VALID FOR ALL______DOCTOR PATIENT OR ADMIN
export async function MakeLogin(email,password) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/makeLogin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"email":email,"password":password}),
  });

  const recievedData = await response.json();
  console.log("Server response:", recievedData);
  return recievedData.code;
}



// const [appTheme,setAppTheme] = useState()
export function ToggleDarkMode(performToggle){
  const old = localStorage.getItem("theme") ?? "0"

  if(performToggle){
    // "0 is light mode"    |    "1 is dark mode"
    if(old=="0"){
      localStorage.setItem("theme","1")
      document.body.classList.add("dark")
    }else{
        localStorage.setItem("theme","0")
        document.body.classList.remove("dark")
    }
  }else{
    if(old=="1"){
      console.log("hey toggled dark theme")
      document.body.classList.add("dark")
    }
  }
}



export async function addNewAppointment(date,time,department,email,name){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/patient/book-new-appointment`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: email,
      date: date,
      time: time,
      department: department,
      docName: "",
      name: name,
      completedTime: "",
      status: 0,
      rating: -1,
      report: {default: {},},
    }),
  });

  const recievedData = await response.json();
  console.log("Server response:", recievedData);
  return recievedData.code;
}

export async function getMyData(setMyData,setCartItem=null) {
  try{
    var returnValue = -1;
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/loginStatus`, {
        method: "GET",
        credentials: "include", 
    });
    const data = await res.json();
    if(data["success"]){
      if(data["type"]=="patient"){
        data["data"]["appointments"].reverse()
        setMyData(data["data"])
        // checking if we got setcart items
        if(setCartItem){
          if(data["data"]["cart"] && data["data"]["cart"].hasOwnProperty("default")){
            delete data["data"]["cart"]["default"]
          }
          setCartItem(data["data"]["cart"])
        }
        returnValue = 1
      }else if(data["type"].toLowerCase()=="doctor" || data["type"].toLowerCase()=="doctors"){
        returnValue = 0
        setMyData(data["data"])
      }else if(data["type"]=="admin"){
        returnValue=2
      }else{
        toast.error("User no longer exist, or the token is invalid")
      }
    }
    return returnValue
  }catch(err){
    console.log(err)
    return -2;
  }
}



export const WeatherSunIcon = ({ width = 64, height = 64 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width={width}
    height={height}
    viewBox="0 0 64 64"
  >
    <defs>
      <filter id="blur" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="4" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.05" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Embedded CSS animation styles */}
      <style>{`
        @keyframes am-weather-sun {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes am-weather-sun-shiny {
          0% { stroke-dasharray: 3px 10px; stroke-dashoffset: 0px; }
          50% { stroke-dasharray: 0.1px 10px; stroke-dashoffset: -1px; }
          100% { stroke-dasharray: 3px 10px; stroke-dashoffset: 0px; }
        }
        .am-weather-sun {
          animation: am-weather-sun 9s linear infinite;
        }
        .am-weather-sun-shiny line {
          animation: am-weather-sun-shiny 2s linear infinite;
        }
      `}</style>
    </defs>

    <g filter="url(#blur)" id="day">
      <g transform="translate(32,32)">
        <g className="am-weather-sun am-weather-sun-shiny">
          <g>
            <line
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,9)"
              x1="0"
              x2="0"
              y1="0"
              y2="3"
            />
          </g>
          <g transform="rotate(45)">
            <line
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,9)"
              x1="0"
              x2="0"
              y1="0"
              y2="3"
            />
          </g>
          <g transform="rotate(90)">
            <line
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,9)"
              x1="0"
              x2="0"
              y1="0"
              y2="3"
            />
          </g>
          <g transform="rotate(135)">
            <line
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,9)"
              x1="0"
              x2="0"
              y1="0"
              y2="3"
            />
          </g>
          <g transform="rotate(180)">
            <line
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,9)"
              x1="0"
              x2="0"
              y1="0"
              y2="3"
            />
          </g>
          <g transform="rotate(225)">
            <line
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,9)"
              x1="0"
              x2="0"
              y1="0"
              y2="3"
            />
          </g>
          <g transform="rotate(270)">
            <line
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,9)"
              x1="0"
              x2="0"
              y1="0"
              y2="3"
            />
          </g>
          <g transform="rotate(315)">
            <line
              fill="none"
              stroke="orange"
              strokeLinecap="round"
              strokeWidth="2"
              transform="translate(0,9)"
              x1="0"
              x2="0"
              y1="0"
              y2="3"
            />
          </g>
        </g>

        <circle
          cx="0"
          cy="0"
          fill="orange"
          r="5"
          stroke="orange"
          strokeWidth="2"
        />
      </g>
    </g>
  </svg>
);


export const hospitalDepartments = [
  {
    image: "https://cdn-icons-png.flaticon.com/512/2966/2966489.png",
    name: "Cardiology",
    description: "Heart and blood vessel diseases, ECG, heart surgeries."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4533/4533873.png",
    name: "Neurology",
    description: "Brain and nervous system disorders and treatments."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221346.png",
    name: "Orthopedics",
    description: "Bone fractures, joint replacements, and muscular issues."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221370.png",
    name: "Pulmonology",
    description: "Respiratory and lung diseases, asthma, COPD, pneumonia."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3468/3468212.png",
    name: "Hematology",
    description: "Blood-related disorders like anemia, leukemia, clotting issues."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3011/3011401.png",
    name: "Pathology",
    description: "Disease diagnosis through lab testing and tissue analysis."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063179.png",
    name: "Genetics",
    description: "Genetic testing and hereditary disease management."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221360.png",
    name: "Ophthalmology",
    description: "Eye and vision care, cataract surgery, and eye diseases."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221378.png",
    name: "ENT (Otolaryngology)",
    description: "Treatment of ear, nose, and throat conditions."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3006/3006876.png",
    name: "Dentistry",
    description: "Dental care, oral surgery, and orthodontics."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221358.png",
    name: "Dermatology",
    description: "Skin, hair, and nail disorders and cosmetic treatments."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
    name: "Gynecology & Obstetrics",
    description: "Women's reproductive health, pregnancy, and childbirth."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4218/4218895.png",
    name: "Pediatrics",
    description: "Medical care for infants, children, and adolescents."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4525/4525995.png",
    name: "Geriatrics",
    description: "Healthcare and wellness for elderly patients."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221332.png",
    name: "Gastroenterology",
    description: "Digestive system and liver disorders."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221340.png",
    name: "Psychiatry",
    description: "Mental health care, counseling, and behavioral therapy."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3006/3006874.png",
    name: "Radiology",
    description: "X-rays, MRI, CT scans, and diagnostic imaging."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221334.png",
    name: "Anesthesiology",
    description: "Pain management and anesthesia during surgery."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221381.png",
    name: "Urology",
    description: "Urinary tract and male reproductive system disorders."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3011/3011365.png",
    name: "Microbiology",
    description: "Study and diagnosis of infections caused by microbes."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3011/3011360.png",
    name: "Biochemistry",
    description: "Chemical processes and laboratory diagnostics."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063171.png",
    name: "Infectious Diseases",
    description: "Diagnosis and treatment of bacterial, viral, and fungal infections."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/2950/2950473.png",
    name: "Pharmacy",
    description: "Dispensing medicines and managing drug therapy."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221349.png",
    name: "General Medicine",
    description: "Primary care and treatment for common diseases."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221368.png",
    name: "Physiotherapy",
    description: "Physical rehabilitation and movement therapy."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221341.png",
    name: "Emergency / Trauma",
    description: "Immediate medical care for critical injuries or illness."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221363.png",
    name: "Plastic & Reconstructive Surgery",
    description: "Cosmetic and reconstructive surgical procedures."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221376.png",
    name: "General Surgery",
    description: "Surgical treatment of general medical conditions."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221352.png",
    name: "Rehabilitation",
    description: "Post-surgery recovery, physical, and occupational therapy."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221338.png",
    name: "Endocrinology",
    description: "Hormone-related disorders like diabetes and thyroid disease."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221345.png",
    name: "Nephrology",
    description: "Kidney-related diseases and dialysis treatment."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/4221/4221350.png",
    name: "Oncology",
    description: "Cancer diagnosis, chemotherapy, and radiation therapy."
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/3011/3011387.png",
    name: "Immunology",
    description: "Immune system diseases and autoimmune disorders."
  }
];



export const symptompsList = ['anxiety and nervousness', 'depression', 'shortness of breath', 'depressive or psychotic symptoms', 'sharp chest pain', 'dizziness', 'insomnia', 'abnormal involuntary movements', 'chest tightness', 'palpitations', 'irregular heartbeat', 'breathing fast', 'hoarse voice', 'sore throat', 'difficulty speaking', 'cough', 'nasal congestion', 'throat swelling', 'diminished hearing', 'lump in throat', 'throat feels tight', 'difficulty in swallowing', 'skin swelling', 'retention of urine', 'groin mass', 'leg pain', 'hip pain', 'suprapubic pain', 'blood in stool', 'lack of growth', 'emotional symptoms', 'elbow weakness', 'back weakness', 'pus in sputum', 'symptoms of the scrotum and testes', 'swelling of scrotum', 'pain in testicles', 'flatulence', 'pus draining from ear', 'jaundice', 'mass in scrotum', 'white discharge from eye', 'irritable infant', 'abusing alcohol', 'fainting', 'hostile behavior', 'drug abuse', 'sharp abdominal pain', 'feeling ill', 'vomiting', 'headache', 'nausea', 'diarrhea', 'vaginal itching', 'vaginal dryness', 'painful urination', 'involuntary urination', 'pain during intercourse', 'frequent urination', 'lower abdominal pain', 'vaginal discharge', 'blood in urine', 'hot flashes', 'intermenstrual bleeding', 'hand or finger pain', 'wrist pain', 'hand or finger swelling', 'arm pain', 'wrist swelling', 'arm stiffness or tightness', 'arm swelling', 'hand or finger stiffness or tightness', 'wrist stiffness or tightness', 'lip swelling', 'toothache', 'abnormal appearing skin', 'skin lesion', 'acne or pimples', 'dry lips', 'facial pain', 'mouth ulcer', 'skin growth', 'eye deviation', 'diminished vision', 'double vision', 'cross-eyed', 'symptoms of eye', 'pain in eye', 'eye moves abnormally', 'abnormal movement of eyelid', 'foreign body sensation in eye', 'irregular appearing scalp', 'swollen lymph nodes', 'back pain', 'neck pain', 'low back pain', 'pain of the anus', 'pain during pregnancy', 'pelvic pain', 'impotence', 'infant spitting up', 'vomiting blood', 'regurgitation', 'burning abdominal pain', 'restlessness', 'symptoms of infants', 'wheezing', 'peripheral edema', 'neck mass', 'ear pain', 'jaw swelling', 'mouth dryness', 'neck swelling', 'knee pain', 'foot or toe pain', 'bowlegged or knock-kneed', 'ankle pain', 'bones are painful', 'knee weakness', 'elbow pain', 'knee swelling', 'skin moles', 'knee lump or mass', 'weight gain', 'problems with movement', 'knee stiffness or tightness', 'leg swelling', 'foot or toe swelling', 'heartburn', 'smoking problems', 'muscle pain', 'infant feeding problem', 'recent weight loss', 'problems with shape or size of breast', 'underweight', 'difficulty eating', 'scanty menstrual flow', 'vaginal pain', 'vaginal redness', 'vulvar irritation', 'weakness', 'decreased heart rate', 'increased heart rate', 'bleeding or discharge from nipple', 'ringing in ear', 'plugged feeling in ear', 'itchy ear(s)', 'frontal headache', 'fluid in ear', 'neck stiffness or tightness', 'spots or clouds in vision', 'eye redness', 'lacrimation', 'itchiness of eye', 'blindness', 'eye burns or stings', 'itchy eyelid', 'feeling cold', 'decreased appetite', 'excessive appetite', 'excessive anger', 'loss of sensation', 'focal weakness', 'slurring words', 'symptoms of the face', 'disturbance of memory', 'paresthesia', 'side pain', 'fever', 'shoulder pain', 'shoulder stiffness or tightness', 'shoulder weakness', 'arm cramps or spasms', 'shoulder swelling', 'tongue lesions', 'leg cramps or spasms', 'abnormal appearing tongue', 'ache all over', 'lower body pain', 'problems during pregnancy', 'spotting or bleeding during pregnancy', 'cramps and spasms', 'upper abdominal pain', 'stomach bloating', 'changes in stool appearance', 'unusual color or odor to urine', 'kidney mass', 'swollen abdomen', 'symptoms of prostate', 'leg stiffness or tightness', 'difficulty breathing', 'rib pain', 'joint pain', 'muscle stiffness or tightness', 'pallor', 'hand or finger lump or mass', 'chills', 'groin pain', 'fatigue', 'abdominal distention', 'regurgitation.1', 'symptoms of the kidneys', 'melena', 'flushing', 'coughing up sputum', 'seizures', 'delusions or hallucinations', 'shoulder cramps or spasms', 'joint stiffness or tightness', 'pain or soreness of breast', 'excessive urination at night', 'bleeding from eye', 'rectal bleeding', 'constipation', 'temper problems', 'coryza', 'wrist weakness', 'eye strain', 'hemoptysis', 'lymphedema', 'skin on leg or foot looks infected', 'allergic reaction', 'congestion in chest', 'muscle swelling', 'pus in urine', 'abnormal size or shape of ear', 'low back weakness', 'sleepiness', 'apnea', 'abnormal breathing sounds', 'excessive growth', 'elbow cramps or spasms', 'feeling hot and cold', 'blood clots during menstrual periods', 'absence of menstruation', 'pulling at ears', 'gum pain', 'redness in ear', 'fluid retention', 'flu-like syndrome', 'sinus congestion', 'painful sinuses', 'fears and phobias', 'recent pregnancy', 'uterine contractions', 'burning chest pain', 'back cramps or spasms', 'stiffness all over', 'muscle cramps, contractures, or spasms', 'low back cramps or spasms', 'back mass or lump', 'nosebleed', 'long menstrual periods', 'heavy menstrual flow', 'unpredictable menstruation', 'painful menstruation', 'infertility', 'frequent menstruation', 'sweating', 'mass on eyelid', 'swollen eye', 'eyelid swelling', 'eyelid lesion or rash', 'unwanted hair', 'symptoms of bladder', 'irregular appearing nails', 'itching of skin', 'hurts to breath', 'nailbiting', 'skin dryness, peeling, scaliness, or roughness', 'skin on arm or hand looks infected', 'skin irritation', 'itchy scalp', 'hip swelling', 'incontinence of stool', 'foot or toe cramps or spasms', 'warts', 'bumps on penis', 'too little hair', 'foot or toe lump or mass', 'skin rash', 'mass or swelling around the anus', 'low back swelling', 'ankle swelling', 'hip lump or mass', 'drainage in throat', 'dry or flaky scalp', 'premenstrual tension or irritability', 'feeling hot', 'feet turned in', 'foot or toe stiffness or tightness', 'pelvic pressure', 'elbow swelling', 'elbow stiffness or tightness', 'early or late onset of menopause', 'mass on ear', 'bleeding from ear', 'hand or finger weakness', 'low self-esteem', 'throat irritation', 'itching of the anus', 'swollen or red tonsils', 'irregular belly button', 'swollen tongue', 'lip sore', 'vulvar sore', 'hip stiffness or tightness', 'mouth pain', 'arm weakness', 'leg lump or mass', 'disturbance of smell or taste', 'discharge in stools', 'penis pain', 'loss of sex drive', 'obsessions and compulsions', 'antisocial behavior', 'neck cramps or spasms', 'pupils unequal', 'poor circulation', 'thirst', 'sleepwalking', 'skin oiliness', 'sneezing', 'bladder mass', 'knee cramps or spasms', 'premature ejaculation', 'leg weakness', 'posture problems', 'bleeding in mouth', 'tongue bleeding', 'change in skin mole size or color', 'penis redness', 'penile discharge', 'shoulder lump or mass', 'polyuria', 'cloudy eye', 'hysterical behavior', 'arm lump or mass', 'nightmares', 'bleeding gums', 'pain in gums', 'bedwetting', 'diaper rash', 'lump or mass of breast', 'vaginal bleeding after menopause', 'infrequent menstruation', 'mass on vulva', 'jaw pain', 'itching of scrotum', 'postpartum problems of the breast', 'eyelid retracted', 'hesitancy', 'elbow lump or mass', 'muscle weakness', 'throat redness', 'joint swelling', 'tongue pain', 'redness in or around nose', 'wrinkles on skin', 'foot or toe weakness', 'hand or finger cramps or spasms', 'back stiffness or tightness', 'wrist lump or mass', 'skin pain', 'low back stiffness or tightness', 'low urine output', 'skin on head or neck looks infected', 'stuttering or stammering', 'problems with orgasm', 'nose deformity', 'lump over jaw', 'sore in nose', 'hip weakness', 'back swelling', 'ankle stiffness or tightness', 'ankle weakness', 'neck weakness'] 