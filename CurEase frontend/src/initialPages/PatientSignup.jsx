
import React, { useEffect, useState } from "react";
import { AddNewPatient } from "../BackendFunctions";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  ImagePlus,
  Mail,
  Phone,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";


const transition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
};

const steps = [
  { number: 1, title: "Your details" },
  { number: 2, title: "Contact" },
  { number: 3, title: "Finish" },
];


function checkPasswordConditions(password) {
  return {
    hasMinLength: password.length >= 8,
    hasNumberOrSymbol: /[\d\W]/.test(password),
    hasUpperAndLower:
      /[a-z]/.test(password) && /[A-Z]/.test(password),
  };
}


/* -------------------------------------------------------
   Progress indicator
------------------------------------------------------- */

const SignupProgress = ({ currentTab, setCurrentTab }) => {
  return (
    <div className="mb-9">
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const completed = currentTab > step.number;
          const active = currentTab === step.number;

          return (
            <React.Fragment key={step.number}>
              <button
                type="button"
                onClick={() => {
                  if (completed) setCurrentTab(step.number);
                }}
                disabled={!completed}
                className="group flex items-center gap-2.5 text-left disabled:cursor-default"
              >
                <span
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-full border text-xs font-semibold
                    transition-all duration-200
                    ${
                      active
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : completed
                          ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                          : "border-slate-200 bg-white text-slate-400"
                    }
                  `}
                >
                  {completed ? <Check size={15} /> : step.number}
                </span>

                <span
                  className={`
                    hidden text-xs font-medium sm:block
                    ${
                      active
                        ? "text-indigo-700"
                        : completed
                          ? "text-slate-600"
                          : "text-slate-400"
                    }
                  `}
                >
                  {step.title}
                </span>
              </button>

              {index !== steps.length - 1 && (
                <div className="h-px flex-1 bg-slate-200">
                  <motion.div
                    initial={false}
                    animate={{
                      scaleX: currentTab > step.number ? 1 : 0,
                    }}
                    transition={transition}
                    className="h-full origin-left bg-indigo-500"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};


/* -------------------------------------------------------
   Reusable form field
------------------------------------------------------- */

const SignupInput = ({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  rightElement,
  required = true,
}) => {
  return (
    <div className="w-full">
      <label className="mb-2 block text-xs font-medium text-slate-600">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          strokeWidth={1.7}
          className="
            pointer-events-none absolute left-4 top-1/2
            -translate-y-1/2 text-slate-400
          "
        />

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="
            h-[50px] w-full rounded-lg
            border border-slate-200 bg-white
            pl-11 pr-12 text-sm text-slate-800
            outline-none placeholder:text-slate-400
            transition-all duration-200
            hover:border-slate-300
            focus:border-indigo-400
            focus:ring-4 focus:ring-indigo-500/10
          "
        />

        {rightElement}
      </div>
    </div>
  );
};


/* -------------------------------------------------------
   Password requirements
------------------------------------------------------- */

const PasswordRequirements = ({ conditions }) => {
  const requirements = [
    {
      label: "At least 8 characters",
      valid: conditions.hasMinLength,
    },
    {
      label: "At least one number or symbol",
      valid: conditions.hasNumberOrSymbol,
    },
    {
      label: "Uppercase and lowercase letters",
      valid: conditions.hasUpperAndLower,
    },
  ];

  return (
    <div className="mt-3 space-y-2">
      {requirements.map((item) => (
        <div
          key={item.label}
          className={`
            flex items-center gap-2 text-[11px]
            transition-colors duration-200
            ${item.valid ? "text-emerald-600" : "text-slate-400"}
          `}
        >
          <CheckCircle2
            size={14}
            className={item.valid ? "text-emerald-500" : "text-slate-300"}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
};


/* -------------------------------------------------------
   Step one: Basic details
------------------------------------------------------- */

const StepOne = ({
  data,
  setData,
  onNext,
  setWhichPage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const passwordConditions = checkPasswordConditions(data.password);

  useEffect(() => {
    if (!data.image) {
      setPreviewImage(null);
      return;
    }

    const url = URL.createObjectURL(data.image);
    setPreviewImage(url);

    return () => URL.revokeObjectURL(url);
  }, [data.image]);

  const updateField = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      e.target.value = "";
      return;
    }

    updateField("image", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.fName.trim() || !data.lName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (
      !passwordConditions.hasMinLength ||
      !passwordConditions.hasNumberOrSymbol ||
      !passwordConditions.hasUpperAndLower
    ) {
      toast.error("Please meet all password requirements");
      return;
    }

    if (data.password !== data.repassword) {
      toast.error("Passwords do not match");
      return;
    }

    onNext();
  };

  return (
    <motion.form
      key="step-one"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={transition}
      className="flex flex-col"
    >
      <div className="mb-7">
        <p className="
          mb-2 text-[10px] font-semibold uppercase
          tracking-[0.2em] text-indigo-500
        ">
          Step 01 / Personal information
        </p>

        <h2 className="
          text-3xl font-semibold tracking-tight text-slate-900
        ">
          Create your account
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Let's start with a few details about you.
        </p>
      </div>

      {/* Profile image */}

      <div className="
        mb-7 flex items-center gap-5
        border-b border-slate-100 pb-7
      ">
        <div className="
          relative flex h-[76px] w-[76px] shrink-0
          items-center justify-center overflow-hidden
          rounded-xl border border-slate-200
          bg-slate-100
        ">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound size={32} strokeWidth={1.3} className="text-slate-400" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-800">
            Profile photo
            <span className="ml-2 text-[10px] font-normal text-slate-400">
              Optional
            </span>
          </p>

          <p className="mt-1 text-xs text-slate-400">
            JPG, PNG or WEBP. Maximum 5 MB.
          </p>

          <div className="mt-3 flex items-center gap-3">
            <label
              htmlFor="patient-signup-image"
              className="
                inline-flex cursor-pointer items-center gap-1.5
                text-xs font-semibold text-indigo-600
                transition-colors hover:text-indigo-800
              "
            >
              <ImagePlus size={15} />
              {previewImage ? "Change photo" : "Upload photo"}
            </label>

            {previewImage && (
              <button
                type="button"
                onClick={() => updateField("image", null)}
                className="
                  inline-flex items-center gap-1
                  text-xs text-slate-400
                  transition-colors hover:text-red-500
                "
              >
                <Trash2 size={14} />
                Remove
              </button>
            )}
          </div>

          <input
            type="file"
            id="patient-signup-image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Name */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SignupInput
          icon={UserRound}
          label="First name"
          placeholder="Your first name"
          value={data.fName}
          onChange={(e) => updateField("fName", e.target.value)}
          autoComplete="given-name"
        />

        <SignupInput
          icon={UserRound}
          label="Last name"
          placeholder="Your last name"
          value={data.lName}
          onChange={(e) => updateField("lName", e.target.value)}
          autoComplete="family-name"
        />
      </div>

      {/* Password */}

      <div className="mt-5">
        <SignupInput
          icon={ShieldCheck}
          label="Password"
          placeholder="Create a strong password"
          type={showPassword ? "text" : "password"}
          value={data.password}
          onChange={(e) => updateField("password", e.target.value)}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-slate-400 hover:text-slate-700
              "
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />

        <PasswordRequirements conditions={passwordConditions} />
      </div>

      {/* Confirm password */}

      <div className="mt-5">
        <SignupInput
          icon={ShieldCheck}
          label="Confirm password"
          placeholder="Enter your password again"
          type={showConfirmPassword ? "text" : "password"}
          value={data.repassword}
          onChange={(e) => updateField("repassword", e.target.value)}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-slate-400 hover:text-slate-700
              "
            >
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />

        {data.repassword.length > 0 && (
          <p className={`
            mt-2 text-[11px]
            ${
              data.password === data.repassword
                ? "text-emerald-600"
                : "text-red-500"
            }
          `}>
            {data.password === data.repassword
              ? "Passwords match"
              : "Passwords do not match"}
          </p>
        )}
      </div>

      {/* Actions */}

      <div className="
        mt-8 flex flex-col-reverse items-center
        justify-between gap-4 border-t border-slate-100
        pt-6 sm:flex-row
      ">
        <p className="text-xs text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setWhichPage("login")}
            className="font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Sign in
          </button>
        </p>

        <button
          type="submit"
          className="
            flex h-[48px] w-full items-center justify-center
            gap-3 rounded-lg bg-indigo-600 px-6
            text-sm font-semibold text-white
            transition-all duration-200
            hover:bg-indigo-700 active:scale-[0.99]
            sm:w-auto
          "
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.form>
  );
};


/* -------------------------------------------------------
   Step two: Contact details
------------------------------------------------------- */

const StepTwo = ({ data, setData, onNext, onPrevious }) => {
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !phone.trim()) {
      toast.error("Please complete your contact details");
      return;
    }

    setData((prev) => ({
      ...prev,
      email: email.trim(),
      phone: phone.trim(),
    }));

    onNext();
  };

  return (
    <motion.form
      key="step-two"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={transition}
      className="flex flex-col"
    >
      <div className="mb-8">
        <p className="
          mb-2 text-[10px] font-semibold uppercase
          tracking-[0.2em] text-indigo-500
        ">
          Step 02 / Contact information
        </p>

        <h2 className="
          text-3xl font-semibold tracking-tight text-slate-900
        ">
          How can we reach you?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          These details help us keep you updated about your account.
        </p>
      </div>

      <div className="
        mb-7 border-y border-slate-100
        py-6
      ">
        <div className="mb-6 flex items-center gap-4">
          <div className="
            flex h-12 w-12 items-center justify-center
            rounded-xl bg-indigo-50 text-indigo-600
          ">
            <UserRound size={22} strokeWidth={1.5} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {data.fName} {data.lName}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Your CurEase profile
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <SignupInput
            icon={Mail}
            label="Email address"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <SignupInput
            icon={Phone}
            label="Phone number"
            placeholder="Enter your phone number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="
        flex flex-col-reverse items-center
        justify-between gap-4 pt-2 sm:flex-row
      ">
        <button
          type="button"
          onClick={onPrevious}
          className="
            flex h-[46px] w-full items-center
            justify-center gap-2 rounded-lg
            border border-slate-200 bg-white px-5
            text-sm font-medium text-slate-600
            transition-colors hover:bg-slate-50
            sm:w-auto
          "
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        <button
          type="submit"
          className="
            flex h-[48px] w-full items-center
            justify-center gap-3 rounded-lg
            bg-indigo-600 px-6 text-sm font-semibold
            text-white transition-all duration-200
            hover:bg-indigo-700 active:scale-[0.99]
            sm:w-auto
          "
        >
          Review details
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.form>
  );
};


/* -------------------------------------------------------
   Step three: Review and register
------------------------------------------------------- */

const StepThree = ({
  data,
  onPrevious,
  onRegister,
  loading,
}) => {
  return (
    <motion.div
      key="step-three"
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={transition}
      className="flex flex-col"
    >
      <div className="mb-7">
        <p className="
          mb-2 text-[10px] font-semibold uppercase
          tracking-[0.2em] text-indigo-500
        ">
          Step 03 / Final review
        </p>

        <h2 className="
          text-3xl font-semibold tracking-tight text-slate-900
        ">
          Almost there.
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Take a moment to review your information before creating your account.
        </p>
      </div>

      <div className="
        border-y border-slate-100 py-6
      ">
        <div className="mb-6 flex items-center gap-4">
          <div className="
            flex h-[68px] w-[68px] shrink-0
            items-center justify-center overflow-hidden
            rounded-xl border border-slate-200
            bg-slate-100
          ">
            {data.image ? (
              <img
                src={URL.createObjectURL(data.image)}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={30} className="text-slate-400" />
            )}
          </div>

          <div>
            <p className="text-lg font-semibold text-slate-800">
              {data.fName} {data.lName}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Patient account
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail size={17} className="text-slate-400" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Email
              </p>
              <p className="mt-0.5 break-all text-sm text-slate-700">
                {data.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={17} className="text-slate-400" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Phone
              </p>
              <p className="mt-0.5 text-sm text-slate-700">
                {data.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="
        mt-6 flex items-start gap-3
        rounded-lg bg-indigo-50/70 p-4
      ">
        <ShieldCheck
          size={19}
          className="mt-0.5 shrink-0 text-indigo-600"
        />

        <p className="text-xs leading-5 text-slate-600">
          Your account information will be used to personalize
          your CurEase experience. You can update your profile
          details later.
        </p>
      </div>

      <div className="
        mt-8 flex flex-col-reverse items-center
        justify-between gap-4 sm:flex-row
      ">
        <button
          type="button"
          onClick={onPrevious}
          disabled={loading}
          className="
            flex h-[46px] w-full items-center
            justify-center gap-2 rounded-lg
            border border-slate-200 bg-white px-5
            text-sm font-medium text-slate-600
            transition-colors hover:bg-slate-50
            disabled:opacity-50 sm:w-auto
          "
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        <button
          type="button"
          onClick={onRegister}
          disabled={loading}
          className="
            flex h-[48px] w-full items-center
            justify-center gap-3 rounded-lg
            bg-indigo-600 px-6 text-sm font-semibold
            text-white transition-all duration-200
            hover:bg-indigo-700 active:scale-[0.99]
            disabled:cursor-not-allowed disabled:opacity-60
            sm:w-auto
          "
        >
          {loading ? "Creating account..." : "Create account"}
          {!loading && <ArrowRight size={16} />}
        </button>
      </div>
    </motion.div>
  );
};


/* -------------------------------------------------------
   Main signup component
------------------------------------------------------- */

const PatientSignup = ({ whichPage, setWhichPage }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    image: null,
  });

  const handleRegister = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await AddNewPatient(
        data.phone,
        data.email,
        `${data.fName.trim()} ${data.lName.trim()}`,
        data.password,
        data.image
      );

      toast.success("Your account has been created!");

      setTimeout(() => {
        setWhichPage("login");
      }, 900);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
    data-lenis-prevent
      className={`
        scrollbar-thin 
        absolute inset-0 z-10
        flex h-full w-full flex-col
        overflow-y-auto overflow-x-hidden
        bg-[#fbfbfd] px-6 py-8
        transition-all duration-500
        sm:px-10 sm:py-9
        ${
          whichPage === "signup"
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }
      `}
      aria-hidden={whichPage !== "signup"}
    >
      <div className="mx-auto flex min-h-full w-full flex-col">

        {/* Brand */}

        <div className="mb-8 flex items-center gap-3">
          <div className="
            flex h-9 w-9 items-center justify-center
            rounded-lg text-white
          ">
            <img src="/icon.png" />
          </div>

          <span className="
            text-[15px] font-semibold tracking-tight text-slate-800
          ">
            CurEase
          </span>

          <span className="
            ml-auto text-[10px] font-medium uppercase
            tracking-[0.15em] text-slate-400
          ">
            Patient registration
          </span>
        </div>

        {/* Progress */}

        <SignupProgress
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        {/* Step content */}

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {currentTab === 1 && (
              <StepOne
                data={data}
                setData={setData}
                onNext={() => setCurrentTab(2)}
                setWhichPage={setWhichPage}
              />
            )}

            {currentTab === 2 && (
              <StepTwo
                data={data}
                setData={setData}
                onNext={() => setCurrentTab(3)}
                onPrevious={() => setCurrentTab(1)}
              />
            )}

            {currentTab === 3 && (
              <StepThree
                data={data}
                onPrevious={() => setCurrentTab(2)}
                onRegister={handleRegister}
                loading={loading}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}

        {/* <div className="
          mt-8 border-t border-slate-100
          pt-4 text-center text-[10px]
          tracking-wide text-slate-400
        ">
          CUREASE · YOUR HEALTH, SIMPLIFIED
        </div> */}
      </div>
    </section>
  );
};

export default PatientSignup;

// import React, { useEffect, useState } from 'react'
// import { AddNewPatient } from '../BackendFunctions';
// import { CheckCircle, ChevronRight, Contact, Eye, EyeClosed,Mail, Flag, Key, Keyboard, Pencil, Rocket, Send, User, UserCheck, UserStar, Phone, ChevronLeft, Feather, Trash} from 'lucide-react';
// import {AnimatePresence, motion} from "framer-motion"
// import toast from 'react-hot-toast';



// const SignUpTabs = ({tabNumber,Icon,title,currentTab,setCurrentTab})=>{
//   return <div onClick={()=>setCurrentTab(tabNumber)} className={`flex gap-5 items-center cursor-pointer ${currentTab==tabNumber? "hover:bg-blue-100" : tabNumber<currentTab ? "hover:bg-teal-100 opacity-50" :""} transition-bg duration-300 px-10 py-3 rounded-sm`}>
//     <p className={`w-10 h-10 rounded-full  flex items-center justify-center text-xs ${currentTab==tabNumber?"bg-gradient-to-br from-indigo-500 to-purple-500 text-white":tabNumber<currentTab?"bg-gradient-to-br from-teal-400 to-teal-500":"bg-blue-100 text-gray-600"}`}>{tabNumber}</p>
//     <p className={`text-base flex gap-2 items-center ${currentTab==tabNumber? "text-indigo-600" : tabNumber<currentTab ? "text-teal-500" :"text-gray-800" }`}>{<Icon size={20}/>}{title}</p>
//   </div>
// }
// function checkPasswordConditions(password) {
//   return {
//     hasMinLength: password.length >= 8,
//     hasNumberOrSymbol: /[\d\W]/.test(password), // digit or special character
//     hasUpperAndLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
//   };
// }
// const Page2Input =({value,type,setValue,title,place,id})=>{
//   return <div className="w-full px-5 py-2 rounded-lg"  >
//     <label className="block text-sm mb-2 overflow-hidden" htmlFor={id}>
//       <motion.div initial={{opacity:0,y:"-100px"}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
//         {title}
//       </motion.div>
//     </label>
//     <motion.input initial={{opacity:0,scaleX:0}} animate={{opacity:1,scaleX:1}} transition={{duration:.5}} value={value} onChange={e=>setValue(e.target.value)} className="text-sm custom-input w-full px-10 py-4 border border-gray-300 rounded-lg shadow-xs transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300" placeholder={place} id={id} required="" autoComplete="off" type={type} />
//   </div>
// }
// const PageTwo = ({setCurrentPage,myData,setData})=>{
//     const [email,setemail]=useState(myData["email"])
//     const [contact,setContact] = useState(myData["contactNo"])
//     return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className='w-full h-full flex flex-col justify-center  px-10 py-5 overflow-x-hidden'>
//         {/* your info div */}
//         <div className='grid grid-cols-[auto_1fr] gap-x-10 mb-5'>
//           <motion.p initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='mx-auto rounded-full flex w-25 h-25 items-center justify-center p-2 bg-indigo-100 relative row-span-2'>
//             <User size={50} strokeWidth={1} />
//           </motion.p>
//           <p className='text-3xl self-center'>Welcome {myData["fName"]},</p>
//           <p className='text-sm text-gray-600'>Please provide your contact information so we can assist you better.</p>
//         </div>
//         {/* Phone Number */}
//         <div className='text-[#1F2470] flex items-center w-full'>
//             <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}} src="/contact.png" alt="" className='h-30' />
//             <Page2Input place="Your Phone Number" value={contact} id="signup-patient-phone" setValue={setContact} title={<p className='flex items-center gap-2'><Phone size={17} /> Phone Number</p>} type='number' />
//         </div>
//         {/* Email Address */}
//         <div className='text-[#1F2470] flex items-center w-full'>
//             <Page2Input place="Your Mail id" id="signup-patient-mail" value={email} setValue={setemail} title={<p className='flex items-center gap-2'><Mail size={17} /> Email Address</p>} type='email' />
//             <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.5}} src="/mail.png" alt="" className='h-30' />
//         </div>

//         <div className='flex justify-between mt-10'>
//             <motion.button initial={{opacity:0,x:"-100px"}} animate={{opacity:1,x:0}} transition={{duration:.5}} className='bg-[#fa5252] pl-10 pr-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 rounded-lg flex items-center gap-2 text-white' 
//                 onClick={()=>setCurrentPage(prev=>prev-1)}>
//               <Feather size={18}/>
//               Previous
//               <span className='ml-10 w-10 h-10 flex items-center bg-[#ff8787] rounded-full justify-center'><ChevronLeft/></span>
//             </motion.button>
//             <motion.button initial={{opacity:0,x:"100px"}} animate={{opacity:1,x:0}} transition={{duration:.5}} className='bg-[#4D5EFE] pl-10 pr-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 rounded-lg flex items-center gap-2 text-white' 
//                 onClick={()=>{
//                   setData(prev=>({...prev,"email":email,"phone":contact}))
//                   setCurrentPage(prev=>prev+1)
//                 }}>
//               <Flag size={18}/>
//               Next
//               <span className='ml-10 w-10 h-10 flex items-center bg-[#6E80FE] rounded-full justify-center'><ChevronRight/></span>
//             </motion.button>
//         </div>
//     </motion.div>
// }


// const PatientSignup = ({whichPage,setWhichPage})=>{
//   const [currentTab,setCurrentTab] = useState(1)
//   const [data,setdata] = useState({
//     "fName": "",
//     "lName": "",
//     "email": "",
//     "password": "",
//     "repassword": "",
//     "phone": "",
//     "image":null,
//   })
//   const [hideRePassword,setHideRePassword] = useState(true);
//   const [hidePassword,setHidePassword] = useState(true);
//   const [passCondition,setPassCondition] = useState({
//     "hasMinLength":false,
//     "hasNumberOrSymbol":false,
//     "hasUpperAndLower":false,
//   })

//   useEffect(() => {
//     const result = checkPasswordConditions(data["password"]);
//     setPassCondition({hasMinLength:result.hasMinLength,hasNumberOrSymbol:result.hasNumberOrSymbol,hasUpperAndLower:result.hasUpperAndLower})
//   }, [data["password"]])
//   const [passError,setPassError] = useState("")
//   const [previewImage,setPreviewImage] = useState(null)
//   const handleFileChange = (e) => {
//     setPreviewImage(URL.createObjectURL(e.target.files[0]))
//     setdata({...data,image:e.target.files[0]});
//   };

//   return <section className={`bg-[#F3F1FF] px-10 absolute transition-all h-full top-0 left-0 w-5xl flex flex-col ${whichPage=="signup" ? "translate-x-0 opacity-100 duration-300 delay-300":"opacity-0 translate-x-[100%] duration-300"}`}>
//         {/* stepper tabs */}
//         <div className='flex justify-evenly w-full pt-5 pb-3 relative'>
//           <SignUpTabs tabNumber={1} Icon={Rocket} title="Get Started" currentTab={currentTab} setCurrentTab={setCurrentTab} />
//           <SignUpTabs tabNumber={2} Icon={Contact} title="Contact Details" currentTab={currentTab} setCurrentTab={setCurrentTab} />
//           <SignUpTabs tabNumber={3} Icon={Send} title="Final Touches" currentTab={currentTab} setCurrentTab={setCurrentTab} />
//           {/* progress bar */}
//           <div className='absolute h-[2px] w-full left-0 bottom-0 bg-gray-300'>
//             <p className='bg-indigo-800 h-[2px] transition-w duration-300' style={{width:`${33.3*currentTab}%`}}>
//             </p>
//           </div>
//         </div>
//         {currentTab==1 && <form className='mt-10 pb-10 px-5 flex flex-col h-full' onSubmit={e=>{
//           e.preventDefault();
//           setCurrentTab(prev=>prev+1)
//           if(data["password"]==data['repassword']){
//             if(passCondition.hasMinLength && passCondition.hasNumberOrSymbol && passCondition.hasUpperAndLower){
//               setPassError("")
//             }else{
//               setPassError("Password conditions need to be fulfilled")
//             }
//           }else{
//             setPassError("Password does not match")
//           }
//         }}>
//         {/* top tab here */}
//           <div className='grid grid-cols-[auto_1fr] gap-x-10'>
//           {/* title tab here */}
//             <motion.div initial={{opacity:0,x:"-100%"}} animate={{opacity:1,x:0}} transition={{duration:.5}} className='grid grid-cols-[auto_1fr] gap-x-5 items-center mb-5'>
//               <img src="/icon.png" alt="" className='h-15 w-15 row-span-2' />
//               {/* title here */}
//               <p className='text-4xl text-gray-800'>Sign Up</p>
//               {/* small text below heading here */}
//               <p className='text-xs text-gray-600 '>Join us and experience a healthier, worry-free lifestyle!</p>
//             </motion.div>
//             {/* user image herer */}
//             <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} className='col-2 row-span-2 w-full h-full rounded-full text-gray-600'>
//               <p className='mx-auto rounded-xl flex items-center justify-center w-max p-2 bg-indigo-100 relative'>
//                 <User size={120} strokeWidth={1} />
//                 <AnimatePresence>
//                   {previewImage && <motion.img initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} src={previewImage} alt="" className='absolute w-full h-full top-0 left-0 rounded-sm' />}
//                 </AnimatePresence>
//                 {previewImage && <div  onClick={()=>{setPreviewImage(null);setdata({...data,image:null})}} className='absolute group text-gray-600 hover:text-violet-800 bottom-0 right-0 translate-x-2 translate-y-1 bg-[#F4EDFF] rounded-lg p-2 cursor-pointer'>
//                   <Trash size={20} />
//                   <span className='group-hover:opacity-100 transition-opacity duration-300 opacity-0 text-xs absolute top-[120%] bg-gray-700 text-white px-3 py-1 rounded-sm pointer-events-none whitespace-nowrap right-0 translate-x-1/2'>Delete Image</span>
//                 </div>}
//                 {!previewImage && <label htmlFor='patient-signup-image' className='absolute group text-gray-600 hover:text-violet-800 bottom-0 right-0 translate-x-2 translate-y-1 bg-[#F4EDFF] rounded-lg p-2 cursor-pointer'>
//                   <Pencil size={20} />
//                   <span className='group-hover:opacity-100 transition-opacity duration-300 opacity-0 text-xs absolute top-[120%] bg-gray-700 text-white px-3 py-1 rounded-sm pointer-events-none whitespace-nowrap right-0 translate-x-1/2'>Upload a Image</span>
//                 </label>}
//                 <input type="file" id="patient-signup-image" hidden accept="image/*" onChange={handleFileChange}  />
//               </p>
//             </motion.div>
            
//             {/* get name here */}
//             <div className='flex gap-10 pt-3 overflow-hidden h-full'>
//               {/* fisrt name box  */}
//               <motion.label initial={{opacity:0,y:"-100px"}} animate={{opacity:1,y:0}} transition={{duration:.5}} htmlFor='signup-user-first-name' className='flex py-3 items-center pr-2 pl-10 relative gap-5 '>
//                 <input autoComplete='off' id='signup-user-first-name' value={data["fName"]} onChange={e=>setdata(prev=>({...prev,"fName":e.target.value}))} type="text" className='peer text-base outline-none border-none w-full' required />
//                 <UserStar size={20} className='absolute top-1/2 -translate-y-1/2 left-2  transition-stroke duration-500 stroke-gray-500 peer-focus:stroke-violet-800'/>
//                 <CheckCircle size={18} className={`transition-stroke duration-500  ${data["fName"]==""? "peer-focus:stroke-violet-800 stroke-gray-500":"stroke-teal-500"} `} />
//                 <span className='absolute text-base text-gray-600 left-10 top-1/2 -translate-y-1/2 transition-all duration-300 peer-focus:top-0 peer-focus:text-sm peer-focus:text-indigo-800 peer-valid:top-0 peer-valid:text-sm peer-valid:text-indigo-800 '>First Name</span>
//                 <p className='absolute w-full bottom-0 border-t-1 border-gray-300 peer-focus:border-violet-800 transition-border duration-300 left-0'></p>
//               </motion.label>
//               {/* last name boxx */}
//               <motion.label initial={{opacity:0,y:"100px"}} animate={{opacity:1,y:0}} transition={{duration:.5}} htmlFor='signup-user-last-name' className='flex py-3 items-center pr-2 pl-10 relative gap-5 '>
//                 <input autoComplete='off' id='signup-user-last-name' value={data["lName"]} onChange={e=>setdata(prev=>({...prev,"lName":e.target.value}))} type="text" className='peer text-base outline-none border-none w-full'  required />
//                 <UserCheck size={20} className='absolute top-1/2 -translate-y-1/2 left-2  transition-stroke duration-500 stroke-gray-500 peer-focus:stroke-violet-800'/>
//                 <CheckCircle size={18} className={`transition-stroke duration-500  ${data["lName"]==""? "peer-focus:stroke-violet-800 stroke-gray-500":"stroke-teal-500"} `} />
//                 <span className='absolute text-base text-gray-600 left-10 top-1/2 -translate-y-1/2 transition-all duration-300 peer-focus:top-0 peer-focus:text-sm peer-focus:text-indigo-800 peer-valid:top-0 peer-valid:text-sm peer-valid:text-indigo-800 '>Last Name</span>
//                 <p className='absolute w-full bottom-0 border-t-1 border-gray-300 peer-focus:border-violet-800 transition-border duration-300 left-0'></p>
//               </motion.label>
//             </div>
//           </div>
//           {/* password fild here */}
//           <div className='mt-7'>
//             <motion.label initial={{opacity:0,scaleY:0}} animate={{opacity:1,scaleY:1}} transition={{duration:.5}}  htmlFor='signup-user-password' className='flex py-3 items-center pr-2 pl-10 relative gap-5 '>
//               <input autoComplete='off' id='signup-user-password' value={data["password"]} onChange={e=>setdata(prev=>({...prev,"password":e.target.value}))} type={hidePassword ? "password" : "text"} className='peer text-base outline-none border-none w-full'  required />
//               <Key size={20} className='absolute top-1/2 -translate-y-1/2 left-2  transition-stroke duration-500 stroke-gray-500 peer-focus:stroke-violet-800'/>
//               <p className='cursor-pointer' onClick={()=>setHidePassword(prev=>!prev)}>{hidePassword ? <EyeClosed size={18} /> : <Eye size={18} />}</p>
//               <span className='absolute text-base text-gray-600 left-10 top-1/2 -translate-y-1/2 transition-all duration-300 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-800 peer-valid:top-1 peer-valid:text-sm peer-valid:text-indigo-800 '>Password</span>
//               <p className='absolute w-full bottom-0 border-t-1 border-gray-300 peer-focus:border-violet-800 transition-border duration-300 left-0'></p>
//             </motion.label>
//             <ul className={` pl-5 mt-3 text-xs transition-h duration-300 overflow-hidden ${(passCondition.hasMinLength && passCondition.hasNumberOrSymbol && passCondition.hasUpperAndLower) ? "h-0" : "h-[60px]"}`}>
//               <motion.li initial={{opacity:0,x:"-100px"}} animate={{opacity:1,x:0}} transition={{duration:.5}}  className={`list-disc mb-1 ${passCondition.hasMinLength ? "text-teal-500":"text-gray-600"}`}>Least 8 Characters</motion.li>
//               <motion.li initial={{opacity:0,x:"-200px"}} animate={{opacity:1,x:0}} transition={{duration:.5}}  className={`list-disc mb-1 ${passCondition.hasNumberOrSymbol ? "text-teal-500":"text-gray-600"}`}>Lease one number (0-9) or symbol</motion.li>
//               <motion.li initial={{opacity:0,x:"-300px"}} animate={{opacity:1,x:0}} transition={{duration:.5}}  className={`list-disc ${passCondition.hasUpperAndLower ? "text-teal-500":"text-gray-600"}`}>Lowercase (a-z) and uppercase (A-Z)</motion.li>
//             </ul>
//           </div>
//           {/* re password filed here */}
//           <div className='mt-5'>
//             <motion.label initial={{opacity:0,scaleY:0}} animate={{opacity:1,scaleY:1}} transition={{duration:.5}}  htmlFor='signup-user-repassword' className='flex py-3 items-center pr-2 pl-10 relative gap-5 '>
//               <input autoComplete='off' id='signup-user-repassword' value={data["repassword"]} onChange={e=>setdata(prev=>({...prev,"repassword":e.target.value}))} type={hideRePassword ? "password" : "text"} className={`peer text-base outline-none border-none w-full ${data["repassword"]==data["password"]?"text-green-500":"text-red-500"}`}  required />
//               <Keyboard size={20} className='absolute top-1/2 -translate-y-1/2 left-2  transition-stroke duration-500 stroke-gray-500 peer-focus:stroke-violet-800'/>
//               <p className='cursor-pointer' onClick={()=>setHideRePassword(prev=>!prev)}>{hideRePassword ? <EyeClosed size={18} /> : <Eye size={18} />}</p>
//               <span className='absolute text-base text-gray-600 left-10 top-1/2 -translate-y-1/2 transition-all duration-300 peer-focus:top-1 peer-focus:text-sm peer-focus:text-indigo-800 peer-valid:top-1 peer-valid:text-sm peer-valid:text-indigo-800 '>Retype Password</span>
//               <p className='absolute w-full bottom-0 border-t-1 border-gray-300 peer-focus:border-violet-800 transition-border duration-300 left-0'></p>
//             </motion.label>
//           </div>
//           <p className='text-sm text-red-400 mt-2'>{passError}</p>
//           {/* signup buttons */}
//           <div className='flex items-center gap-15 mt-auto'>
//             <motion.button initial={{opacity:0,x:"-100%"}} animate={{opacity:1,x:0}} transition={{duration:.5}}  className='#6372f8ff bg-[#4D5EFE] pl-10 pr-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 rounded-lg flex items-center gap-2 text-white'>
//               <Flag size={18}/>
//               Next
//               <span className='ml-10 w-10 h-10 flex items-center bg-[#6E80FE] rounded-full justify-center'><ChevronRight/></span>
//             </motion.button>
//             <span className='text-sm text-gray-400'>Or</span>
//             <motion.button initial={{opacity:0,y:"200%"}} animate={{opacity:1,y:0}} transition={{duration:.5}}  className='border-gray-200 border-2 p-2 rounded-lg group'>
//               <img src="/google.png" alt="" className='h-8 w-8 transition-transform duration-300 cursor-pointer group-hover:scale-110' />
//             </motion.button>
//             <div className="ml-auto flex items-center text-sm text-gray-600">
//               Already have an account?
//               <a onClick={()=>setWhichPage("login")} className="ml-2 border-b-1 border-transparent hover:border-purple-500 px-1 text-indigo-500 font-semibold hover:text-purple-500 transition-colors cursor-pointer">Sign In</a>
//             </div>
//           </div>
//         </form>}
//         {currentTab==2 && <PageTwo myData={data} setCurrentPage={setCurrentTab} setData={setdata} />}
//         {currentTab==3 && <div className='flex flex-col w-full h-full items-center justify-center'>
//           <p className='text-5xl text-gray-800 mb-10'>All Set to go!</p>
//           <motion.img initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:.5}} src="/completed.gif" alt="" className='h-40 w-max rounded-xl' />
//           <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className='text-base mt-5'>You can Edit these settings anytime by going into your profile</motion.p>
//           <motion.button initial={{opacity:0,y:"100px"}} animate={{opacity:1,y:0}} transition={{duration:.5}} className='mt-15 bg-[#4D5EFE] pl-10 pr-5 cursor-pointer transition-all duration-300 hover:scale-105 py-2 rounded-lg flex items-center gap-2 text-white' 
//                 onClick={()=>{
//                   AddNewPatient(data.phone,data.email,`${data.fName} ${data.lName}`,data.password,data.image)
//                   toast.success("You have been registered with us successfully!")
//                   setTimeout(() => {
//                     toast.success(`Welcome ${data.fName}...`)
//                   }, 1000);
//                   setWhichPage("login")
//                 }}>
//               <Flag size={18}/>
//               Log In
//               <span className='ml-10 w-10 h-10 flex items-center bg-[#6E80FE] rounded-full justify-center'><ChevronRight/></span>
//             </motion.button>
//         </div>}
//   </section>
// }

// export default PatientSignup
