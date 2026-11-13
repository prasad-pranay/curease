import React from "react";
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
const MainFooter = () => {
    const navigation = useNavigate()
  return (
    <div className="text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <h1 className="flex gap-2 text-xl mb-3 font-semibold text-[var(--button)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 "
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C21.4816 7.82475 21.7706 8.69989 21.8985 10M22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22878 22 4.34314 22 3.17157 20.8284C2.51839 20.1752 2.22937 19.3001 2.10149 18"
                  className="stroke-[var(--button)]"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M16 6C16 4.11438 16 3.17157 15.4142 2.58579C14.8284 2 13.8856 2 12 2C10.1144 2 9.17157 2 8.58579 2.58579C8 3.17157 8 4.11438 8 6"
                  className="stroke-[var(--button)]"
                  strokeWidth="2.2"
                ></path>
                <path
                  d="M13.5 14H10.5M12 12.5V15.5"
                  className="stroke-[var(--button)]"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                ></path>
                <circle
                  cx="12"
                  cy="14"
                  r="4"
                  className="stroke-[var(--button)]"
                  strokeWidth="2.2"
                ></circle>
              </g>
            </svg>
            CurEase
          </h1>
          <p className="text-sm">
            Our expert medical team provides personalized, compassionate care using cutting-edge technology and a patient-first approach.
          </p>
          <div className="flex items-center gap-5 mt-4">
            {/* Instagram */}
            <FiInstagram  className="cursor-pointer hover:scale-110 text-md" onClick={()=>window.open("https://www.instagram.com/pranayy.c3/")}/>
            {/* Facebook */}
            <FiGithub className="cursor-pointer hover:scale-110 text-md" onClick={()=>window.open("https://github.com/pranayvips")}/>
            {/* Twitter */}
            <FiTwitter className="cursor-pointer hover:scale-110 text-md" onClick={()=>window.open("")}/>
            {/* LinkedIn */}
            <FiLinkedin className="cursor-pointer hover:scale-110 text-md" onClick={()=>window.open("")}/>
          </div>
        </div>

        <div>
          <p className="text-lg text-gray-400">Patient</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/appointments">Appointment</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg text-gray-400">Pharmacy</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link to="/pharmacy/">Home</Link>
            </li>
            <li>
              <Link to="/pharmacy/medicines">Medicine</Link>
            </li>
            <li>
              <Link to="/pharmacy/medicines/upload">Quick Buy</Link>
            </li>
            <li>
              <Link to="/pharmacy/consult-doctors">Consult Doctor</Link>
            </li>
            <li>
              <Link to="/pharmacy/lab-tests">Lab Tests</Link>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="text-lg text-gray-400">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r">
              {/* Arrow icon */}
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 text-xs items-center justify-between py-5">
        <p>
          © {new Date().getFullYear()}
          <Link to="/" className="ml-2 hover:underline">CurEase</Link>. All rights reserved.
        </p>
      </div>
    </div>
  );
};
const Footer = () => {
  return (
    <footer className="mt-10">
      {/* indias largest banner */}
      <div className="shadow-sm bg-[var(--card)] py-10">
        <p className="text-3xl text-center">
          INDIA’S SMALLEST HEALTHCARE PLATFORM
        </p>
        {/* stats */}
        <div className="flex justify-evenly mt-10">
          <p className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold">12+</span>{" "}
            <span className="text-sm">Visitors</span>
          </p>
          <p className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold">17+</span>{" "}
            <span className="text-sm">Order Delivered</span>
          </p>
          <p className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold">50+</span>{" "}
            <span className="text-sm">Cities</span>
          </p>
        </div>
      </div>
      {/* other reliable wla stat */}
      <div className="flex py-10 px-10 gap-10 border-b-1 border-gray-400">
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] items-center">
          <img
            src="https://onemg.gumlet.io/secure-rebrand_x6f8yq.svg"
            alt=""
            className="col-1 row-span-2"
          />
          <p className="text-xl font-bold">Reliable</p>
          <p className="text-xs">
            All products displayed on Tata 1mg are procured from verified and
            licensed pharmacies. All labs listed on the platform are accredited
          </p>
        </div>
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] items-center">
          <img
            src="https://onemg.gumlet.io/secure-rebrand_x6f8yq.svg"
            alt=""
            className="col-1 row-span-2"
          />
          <p className="text-xl font-bold">Secure</p>
          <p className="text-xs">
            Tata 1mg uses Secure Sockets Layer (SSL) 128-bit encryption and is
            Payment Card Industry Data Security Standard (PCI DSS) compliant
          </p>
        </div>
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] items-center">
          <img
            src="https://onemg.gumlet.io/secure-rebrand_x6f8yq.svg"
            alt=""
            className="col-1 row-span-2"
          />
          <p className="text-xl font-bold">Affordable</p>
          <p className="text-xs">
            Find affordable medicine substitutes, save up to 50% on health
            products, up to 80% off on lab tests and free doctor consultations.
          </p>
        </div>
      </div>
      <MainFooter />
    </footer>
  );
};

export default Footer;
