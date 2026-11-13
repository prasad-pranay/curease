import React, { useState } from "react";

const emergencies = [
  {
    organ: "Head Injury",
    image: "https://cdn-icons-png.flaticon.com/512/4329/4329861.png",
    steps: [
      "Keep the person still and calm — do not move their head or neck.",
      "Apply gentle pressure with a clean cloth to stop bleeding.",
      "If vomiting, roll them onto their side carefully.",
      "Do not remove any objects stuck in the head.",
      "Seek emergency medical help immediately.",
    ],
  },
  {
    organ: "Heart Attack / Chest Pain",
    image: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
    steps: [
      "Have the person sit down and stay calm.",
      "Loosen clothing around chest and neck.",
      "Give prescribed nitroglycerin if available.",
      "Call emergency services immediately.",
      "Start CPR if the person becomes unresponsive.",
    ],
  },
  {
    organ: "Eye Injury",
    image: "https://cdn-icons-png.flaticon.com/512/4329/4329889.png",
    steps: [
      "Do not rub or apply pressure to the eye.",
      "Flush with clean water if a chemical entered the eye.",
      "If an object is stuck, do not remove it — cover both eyes.",
      "Seek immediate medical attention.",
    ],
  },
  {
    organ: "Fracture / Broken Bone",
    image: "https://cdn-icons-png.flaticon.com/512/4240/4240923.png",
    steps: [
      "Keep the injured area still and supported.",
      "Apply a splint or sling without straightening the bone.",
      "Apply ice wrapped in cloth to reduce swelling.",
      "Seek medical help immediately.",
    ],
  },
  {
    organ: "Severe Bleeding",
    image: "https://cdn-icons-png.flaticon.com/512/3003/3003655.png",
    steps: [
      "Apply firm pressure with a clean cloth or bandage.",
      "Do not remove soaked cloth — add another layer.",
      "Elevate the injured part if possible.",
      "Seek immediate medical assistance.",
    ],
  },
  {
    organ: "Burns",
    image: "https://cdn-icons-png.flaticon.com/512/2870/2870144.png",
    steps: [
      "Cool the burn with running cool (not cold) water for 10–20 minutes.",
      "Do not pop blisters or apply butter/ointments.",
      "Cover lightly with a sterile gauze.",
      "Get help for deep or large burns.",
    ],
  },
  {
    organ: "Snake Bite",
    image: "https://cdn-icons-png.flaticon.com/512/2809/2809396.png",
    steps: [
      "Keep the person calm and still.",
      "Do not cut the wound or suck the venom.",
      "Keep the bite below heart level.",
      "Get immediate medical help.",
    ],
  },
  {
    organ: "Allergic Reaction (Anaphylaxis)",
    image: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
    steps: [
      "Use epinephrine auto-injector (EpiPen) immediately if available.",
      "Keep the person lying down with legs raised.",
      "Loosen tight clothing and stay calm.",
      "Call emergency services immediately.",
    ],
  },
  {
    organ: "Heat Stroke",
    image: "https://cdn-icons-png.flaticon.com/512/4329/4329830.png",
    steps: [
      "Move the person to a cool place.",
      "Remove excess clothing and cool with wet cloths or fan.",
      "Do not give fluids if the person is unconscious.",
      "Seek medical help immediately.",
    ],
  },
  {
    organ: "Fainting / Unconsciousness",
    image: "https://cdn-icons-png.flaticon.com/512/3953/3953365.png",
    steps: [
      "Lay the person flat and elevate legs slightly.",
      "Loosen tight clothing.",
      "If unresponsive for more than a minute, call for help.",
      "Check for breathing and start CPR if needed.",
    ],
  },
  {
    organ: "Electric Shock",
    image: "https://cdn-icons-png.flaticon.com/512/3373/3373373.png",
    steps: [
      "Do not touch the person until power is off.",
      "Check breathing and pulse — start CPR if necessary.",
      "Cover burns with sterile gauze.",
      "Call emergency services immediately.",
    ],
  },
  {
    organ: "Poisoning",
    image: "https://cdn-icons-png.flaticon.com/512/4329/4329898.png",
    steps: [
      "Do not induce vomiting unless told by medical professionals.",
      "If inhaled poison — move to fresh air immediately.",
      "If swallowed — rinse mouth with water.",
      "Call poison control or emergency help right away.",
    ],
  },
  {
    organ: "Asthma Attack",
    image: "https://cdn-icons-png.flaticon.com/512/4333/4333612.png",
    steps: [
      "Help the person sit upright and stay calm.",
      "Assist with their prescribed inhaler.",
      "If no relief after 10 minutes, call emergency services.",
      "Do not leave the person alone.",
    ],
  },
  {
    organ: "Seizure / Epilepsy",
    image: "https://cdn-icons-png.flaticon.com/512/4333/4333637.png",
    steps: [
      "Keep the person safe — move objects away.",
      "Do not hold them down or put anything in their mouth.",
      "Turn them on their side once seizure stops.",
      "Call for help if it lasts more than 5 minutes.",
    ],
  },
  {
    organ: "Hypothermia",
    image: "https://cdn-icons-png.flaticon.com/512/4329/4329843.png",
    steps: [
      "Move the person indoors or to a warm area.",
      "Remove wet clothing and cover with blankets.",
      "Provide warm (not hot) drinks if conscious.",
      "Seek medical attention immediately.",
    ],
  },
];

const EmergencyPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredEmergencies = emergencies.filter((item) =>
    item.organ.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full bg-[var(--bg)] w-screen overflow-x-hidden px-10 py-5">
      <div className="mx-auto bg-[var(--card)] shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl mt-5 font-bold text-center text-red-600 mb-4">
          🚑 Emergency First Aid Help
        </h1>
        <p className="text-center text-sm text-gray-400 mb-10">
          Tap on any condition to learn what to do until medical help arrives.
        </p>

        {/* Search bar */}
        <div className="flex justify-center mb-15">
          <input
            type="text"
            placeholder="Search by organ or condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-[var(--text)] w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-4 grid grid-cols-3 gap-10">
          {filteredEmergencies.map((item, index) => (
            <div
              key={index}
              className="h-max border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <button
                className="w-full cursor-pointer  flex justify-between items-center p-4 text-left bg-gray-100 hover:bg-red-50 transition"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.organ}
                    className="w-10 h-10"
                  />
                  <span className="font-semibold text-gray-800">
                    {item.organ}
                  </span>
                </div>
                <span className="text-red-500 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="p-4 bg-white text-gray-700 space-y-2">
                  {item.steps.map((step, i) => (
                    <p key={i} className="text-sm leading-relaxed">
                      ✅ {step}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredEmergencies.length === 0 && (
            <p className="text-center text-gray-500">
              No emergency information found for “{search}”
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
