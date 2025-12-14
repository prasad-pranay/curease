import React, { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Star, Edit3, Save } from "lucide-react";


const DoctorProfile = ({MyData}) => {
  const [editMode, setEditMode] = useState(false);
  const img = MyData.imageUrl && MyData.imageUrl.includes("ProfileImage") ? `${import.meta.env.VITE_BACKEND_API_URL}${MyData.imageUrl}` : MyData.imageUrl;

  const [doctor, setDoctor] = useState({
    name: MyData.name,
    specialization: MyData.department,
    experience: "12 Years",
    location: MyData.location,
    email: MyData.email,
    phone: MyData.phone,
    rating: 4.9,
    patients: 2400,
    img: img
  });

  const handleChange = (field, value) => {
    setDoctor({ ...doctor, [field]: value });
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <section className="h-full flex items-center justify-center bg-[var(--bg)] px-8 py-16">
      <div className="flex flex-col md:flex-row text-[var(--text)] items-center bg-[var(--card)] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-6xl overflow-hidden">
        {/* Left Section - Image */}
        <div className="relative w-full md:w-1/2 group overflow-hidden">
          <img
            src={doctor.img}
            alt={doctor.name}
            className="h-110 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md cursor-pointer hover:scale-110 transition"
               onClick={toggleEdit}>
            {editMode ? <Save size={20} className="text-green-600" /> : <Edit3 size={20} className="text-blue-600" />}
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="w-full md:w-1/2 p-8 space-y-4">
          {editMode ? (
            <>
              <input
                type="text"
                value={doctor.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="text-2xl font-semibold w-full border-b focus:outline-none border-gray-300 focus:border-blue-500"
              />
              <input
                type="text"
                value={doctor.specialization}
                onChange={(e) => handleChange("specialization", e.target.value)}
                className=" w-full border-b focus:outline-none border-gray-300 focus:border-blue-500"
              />
            </>
          ) : (
            <>
              <h2 className="text-5xl font-light ">{doctor.name}</h2>
              <p className="text-xl mb-10">{doctor.specialization}</p>
            </>
          )}

          <div className="grid grid-cols-2 gap-4 text-lg ">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {editMode ? (
                <input
                  type="text"
                  value={doctor.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  className="border-b w-full focus:outline-none border-gray-300 focus:border-blue-500"
                />
              ) : (
                <span>{doctor.experience}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={16} />
              <span>{doctor.rating}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <MapPin size={16} />
              {editMode ? (
                <input
                  type="text"
                  value={doctor.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="border-b w-full focus:outline-none border-gray-300 focus:border-blue-500"
                />
              ) : (
                <span>{doctor.location}</span>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200 flex flex-col gap-3  text-lg">
            <div className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer">
              <Mail size={16} />
              {editMode ? (
                <input
                  type="text"
                  value={doctor.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-b w-full focus:outline-none border-gray-300 focus:border-blue-500"
                />
              ) : (
                <span>{doctor.email}</span>
              )}
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer">
              <Phone size={16} />
              {editMode ? (
                <input
                  type="text"
                  value={doctor.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border-b w-full focus:outline-none border-gray-300 focus:border-blue-500"
                />
              ) : (
                <span>{doctor.phone}</span>
              )}
            </div>
          </div>

          <button onClick={toggleEdit} className="active:scale-90 hover:scale-105 mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all">
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile
