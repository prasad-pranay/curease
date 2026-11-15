
import React, { useState } from "react";
import "./initial.css";

import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

import { useGoogleLogin } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion";
import { MakeLogin } from "../BackendFunctions";
import toast, { Toaster } from "react-hot-toast";
import PatientSignup from "./PatientSignup";

const ease = [0.22, 1, 0.36, 1];

/* --------------------------------------------------
   FORGOT PASSWORD
-------------------------------------------------- */

const ForgotPassword = ({ setForgotpassshow }) => {
  const [mail, setMail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function sendforgotmail(e) {
    e.preventDefault();

    if (!mail.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setSending(true);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/login/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: mail.trim() }),
        }
      );

      const result = await res.json();

      if (result.code == 0) {
        toast.success("Password reset email sent.");
        setSent(true);
      } else if (result.code == 1) {
        toast.error("No account found with this email.");
      } else {
        toast.error(result.msg || "Something went wrong.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Unable to connect. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.3, ease }}
      className="absolut w-full inset-0 z-20 flex flex-col bg-[#fafaff] px-4 py-9 "
    >
      <button
        type="button"
        onClick={() => setForgotpassshow(false)}
        className="group flex w-fit items-center gap-2 text-[13px] text-slate-500 transition-colors hover:text-indigo-600"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to sign in
      </button>

      <div className="my-auto w-full max-w-[390px]">
        {/* <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">
          ACCOUNT RECOVERY
        </span> */}

        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.065em] text-slate-950">
          Reset password.
        </h2>

        <p className="mt-3 text-[13px] leading-6 text-slate-500">
          Enter the email address associated with your account.
        </p>

        <form onSubmit={sendforgotmail} className="mt-10">
          <label
            htmlFor="forgot-email"
            className="mb-2 block text-[12px] font-medium text-slate-600"
          >
            Email address
          </label>

          <input
            id="forgot-email"
            type="email"
            placeholder="you@example.com"
            value={mail}
            disabled={sent || sending}
            onChange={(e) => setMail(e.target.value)}
            required
            className="auth-line-input"
          />

          <button
            type={sent ? "button" : "submit"}
            disabled={sending || mail.length<5}
            onClick={sent ? () => setForgotpassshow(false) : undefined}
            className="mt-7 flex h-[49px] w-full items-center justify-between rounded-xs bg-[#4f46e5] px-5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4338ca] hover:shadow-lg hover:shadow-indigo-500/15 active:translate-y-0 disabled:opacity-60"
          >
            {sending ? "Sending..." : sent ? "Done" : "Send recovery email"}
            {!sending && <ArrowRight size={17} />}
          </button>
        </form>

        {sent && (
          <p className="mt-4 text-xs text-emerald-700">
            Check your inbox for the recovery email.
          </p>
        )}
      </div>
    </motion.div>
  );
};

/* --------------------------------------------------
   BRAND SIDE
-------------------------------------------------- */

const BrandPanel = () => {
  return (
    <section className="relative flex h-full min-h-0 flex-col justify-between overflow-hidden bg-[#f2f3f8] px-8 py-8 sm:px-12 sm:py-10 lg:px-[8%] lg:py-12">

      {/* Brand identity */}

      {/* <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#4f46e5] text-[23px] font-semibold tracking-[-0.1em] text-white shadow-[0_5px_15px_rgba(79,70,229,0.16)]">
          C
        </div>

        <span className="text-[21px] font-semibold tracking-[-0.07em] text-[#171923]">
          CurEase
        </span>
      </motion.div> */}

      {/* Typography */}

      <div className="relative z-10 my-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
        >
          {/* <span className="mb-5 block text-[10px] font-semibold tracking-[0.22em] text-slate-400">
            PATIENT PORTAL
          </span> */}

          <h1 className="auth-editorial-heading">
            Cur<span className="text-[#4f46e5]">Ease.</span>
          </h1>

          {/* <div className="mt-7 flex items-center gap-3">
            <div className="h-[1px] w-10 bg-[#4f46e5]" />
            <span className="text-[12px] font-medium tracking-wide text-slate-500">
              Patient access
            </span>
          </div> */}
        </motion.div>
      </div>

      {/* Minimal brand signature */}

      {/* <div className="relative z-10 flex items-center justify-between border-t border-slate-300/70 pt-5">
        <span className="text-[10px] font-semibold tracking-[0.16em] text-slate-400">
          CUREASE
        </span>

        <span className="text-[11px] text-slate-400">
          Patient portal
        </span>
      </div> */}

      {/* Very subtle typographic background detail */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-12 select-none text-[300px] font-semibold leading-none tracking-[-0.13em] text-[#e9eaf2]/70"
      >
        C
      </div>
    </section>
  );
};

/* --------------------------------------------------
   LOGIN
-------------------------------------------------- */

const LoginContainer = ({ whichPage, setWhichPage }) => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [forgotpassShow, setForgotpassshow] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/login/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            token: credentialResponse.access_token,
          }),
        }
      );

      const data = await res.json();

      if (data.code == "0") {
        toast.success("Login successful!");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else if (data.code == "1") {
        toast.error("This email is not registered.");
      } else {
        toast.error(data.msg || "Google login failed.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Unable to connect. Please try again.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => toast.error("Google login failed."),
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!mail.trim() || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const code = await MakeLogin(mail.trim(), password);

      if (code === 1) {
        toast.error("User not found.");
      } else if (code === 2) {
        toast.error("Incorrect password.");
      } else if (code === 0) {
        toast.success("Welcome back!");

        setTimeout(() => {
          window.location.href = "/";
        }, 700);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`absolute inset-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        whichPage === "signup" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-[1.08fr_0.92fr]">

        {/* BRAND */}

        <BrandPanel />

        {/* FORM */}

        <section className="relative flex min-h-0 items-center justify-center overflow-hidden bg-[#fafaff] px-8 py-8 sm:px-12 lg:px-[12%]">

          <AnimatePresence mode="wait">
            {forgotpassShow ? (
              <ForgotPassword
                key="forgot"
                setForgotpassshow={setForgotpassshow}
              />
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="w-full max-w-[390px]"
              >

                {/* Heading */}

                <div className="mb-9">
                  {/* <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">
                    ACCOUNT
                  </span> */}

                  <h2 className="mt-4 text-[39px] font-semibold tracking-[-0.07em] text-[#171923] sm:text-[43px]">
                    Sign in<span className="text-[#4f46e5]">.</span>
                  </h2>

                  {/* <p className="mt-2 text-[13px] text-slate-500">
                    Welcome back to CurEase.
                  </p> */}
                </div>

                {/* Form first */}

                <form onSubmit={handleLogin}>

                  {/* Email */}

                  <div className="mb-7">
                    <label
                      htmlFor="login-email"
                      className="mb-2 block text-[12px] font-medium text-slate-500"
                    >
                      Email address
                    </label>

                    <input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      autoComplete="email"
                      required
                      className="auth-line-input"
                    />
                  </div>

                  {/* Password */}

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="login-password"
                        className="text-[12px] font-medium text-slate-500"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={() => setForgotpassshow(true)}
                        className="text-[11px] font-medium text-[#7772d9] transition-colors hover:text-[#4338ca]"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="auth-line-input pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-slate-400 transition-colors hover:text-slate-800"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember */}

                  {/* <label className="mt-6 flex w-fit cursor-pointer items-center gap-2.5 text-[11px] text-slate-500">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 cursor-pointer accent-[#4f46e5]"
                    />
                    Remember me
                  </label> */}

                  <div className="flex gap-10 mt-8">

                  {/* Main action */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { y: -2 } : {}}
                    whileTap={!loading ? { scale: 0.985 } : {}}
                    className="flex h-[51px] w-full items-center justify-between rounded-xs bg-[#4f46e5] px-5 text-[13px] font-semibold text-white shadow-[0_5px_15px_rgba(79,70,229,0.12)] transition-colors hover:bg-[#4338ca] hover:shadow-[0_9px_24px_rgba(79,70,229,0.19)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Signing in..." : "Sign in"}

                    {!loading && (
                      <ArrowRight size={18} />
                    )}
                  </motion.button>


                  <motion.button
                  type="button"
                  onClick={() => login()}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex h-[51px] w-full items-center justify-center gap-3 rounded-xs duration-200 border border-slate-200 bg-white text-[12px] font-medium text-slate-600 transition-all hover:border-slate-300 hover:shadow-xs cursor-pointer"
                >
                  <img
                    src="/google.png"
                    alt=""
                    className="h-[16px] w-[16px] object-contain"
                  />
                  Google
                </motion.button>
                    </div>
                </form>

                {/* Alternative sign in */}
{/* 
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-[9px] font-semibold tracking-[0.15em] text-slate-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div> */}

                {/* <motion.button
                  type="button"
                  onClick={() => login()}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex h-[47px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[12px] font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                >
                  <img
                    src="/google.png"
                    alt=""
                    className="h-[16px] w-[16px] object-contain"
                  />
                  Continue with Google
                </motion.button> */}

                {/* Signup */}

                <div className="mt-8 flex items-center justify-center gap-1.5 text-[12px]">
                  <span className="text-slate-400">
                    Don't have an account?
                  </span>

                  <button
                    type="button"
                    onClick={() => setWhichPage("signup")}
                    className="font-semibold text-[#4f46e5] transition-colors hover:text-[#3730a3]"
                  >
                    Create one
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </section>
      </div>
    </div>
  );
};

/* --------------------------------------------------
   MAIN
-------------------------------------------------- */

const SignIn = () => {
  const [whichPage, setWhichPage] = useState("login");

  return (
    <main className="relative flex h-[100svh] min-h-0 w-full items-center justify-center overflow-hidden bg-[#f2f3f8] p-3 sm:p-5 lg:p-7">

      <motion.section
        layout
        transition={{ duration: 0.45, ease }}
        className="relative h-full max-h-[780px] min-h-0 w-full max-w-[1240px] overflow-hidden rounded-[20px] border border-white/80 bg-white shadow-[0_25px_80px_-35px_rgba(15,23,42,0.2)]"
      >
        <LoginContainer
          whichPage={whichPage}
          setWhichPage={setWhichPage}
        />

        <PatientSignup
          whichPage={whichPage}
          setWhichPage={setWhichPage}
        />
      </motion.section>

      <Toaster
        position="top-right"
        reverseOrder
        toastOptions={{
          duration: 3000,
          style: {
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            background: "#fff",
            color: "#334155",
            fontSize: "13px",
            boxShadow: "0 8px 30px rgba(15,23,42,0.07)",
          },
        }}
      />
    </main>
  );
};

export default SignIn;


// import React, { useState } from "react";
// import "./initial.css";

// import { useGoogleLogin } from "@react-oauth/google";
// import {
//   ArrowRight,
//   ArrowUpRight,
//   Eye,
//   EyeOff,
//   Info,
//   LockKeyhole,
//   Mail,
//   UserRound,
//   BrushCleaning,
// } from "lucide-react";

// import { AnimatePresence, motion } from "framer-motion";
// import { MakeLogin } from "../BackendFunctions";
// import toast, { Toaster } from "react-hot-toast";
// import PatientSignup from "./PatientSignup";

// const pageTransition = {
//   duration: 0.35,
//   ease: [0.22, 1, 0.36, 1],
// };

// /* --------------------------------------------------
//    FORGOT PASSWORD
// -------------------------------------------------- */

// const ForgotPassword = ({ setForgotpassshow }) => {
//   const [mail, setMail] = useState("");
//   const [sending, setSending] = useState(false);
//   const [sent, setSent] = useState(false);

//   async function sendforgotmail(e) {
//     e.preventDefault();

//     if (!mail.trim()) {
//       toast.error("Please enter your email address.");
//       return;
//     }

//     try {
//       setSending(true);

//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_API_URL}/login/forgotPassword`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email: mail.trim() }),
//         }
//       );

//       const result = await res.json();

//       if (result.code == 0) {
//         toast.success("Password reset email sent.");
//         setSent(true);
//       } else if (result.code == 1) {
//         toast.error("No account found with this email.");
//       } else {
//         toast.error(result.msg || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Forgot password error:", error);
//       toast.error("Unable to connect. Please try again.");
//     } finally {
//       setSending(false);
//     }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 24 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 24 }}
//       transition={pageTransition}
//       className="absolut inset-0 z-20 flex flex-col bg-[#fafaff] p-7 sm:p-10"
//     >
//       <button
//         type="button"
//         onClick={() => setForgotpassshow(false)}
//         className="mb-10 flex w-fit items-center gap-2 text-sm text-slate-500 transition-colors hover:text-indigo-600"
//       >
//         <ArrowRight className="rotate-180" size={16} />
//         Back to sign in
//       </button>

//       <div className="my-auto">

//         <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
//           Reset your password
//         </h2>

//         <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
//           Enter the email address associated with your account. We'll send
//           you the password recovery email.
//         </p>

//         <form onSubmit={sendforgotmail} className="mt-9">
//           <label
//             htmlFor="forgot-email"
//             className="mb-2 block text-xs font-medium text-slate-600"
//           >
//             Email address
//           </label>

//           <div className="relative">
//             <Mail
//               size={17}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               id="forgot-email"
//               type="email"
//               placeholder="you@example.com"
//               value={mail}
//               disabled={sent || sending}
//               onChange={(e) => setMail(e.target.value)}
//               required
//               className="auth-input pl-11"
//             />
//           </div>

//           <button
//             type={sent ? "button" : "submit"}
//             disabled={sending}
//             onClick={sent ? () => setForgotpassshow(false) : undefined}
//             className="auth-primary mt-5"
//           >
//             {sending
//               ? "Sending..."
//               : sent
//               ? "Done"
//               : "Send recovery email"}

//             {!sending && <ArrowRight size={16} />}
//           </button>
//         </form>

//         {sent && (
//           <p className="mt-4 text-xs leading-5 text-emerald-700">
//             Check your inbox for the password recovery email.
//           </p>
//         )}
//       </div>

//     </motion.div>
//   );
// };

// /* --------------------------------------------------
//    LOGIN FORM
// -------------------------------------------------- */

// const LoginContainer = ({ whichPage, setWhichPage }) => {
//   const [password, setPassword] = useState("");
//   const [mail, setMail] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [forgotpassShow, setForgotpassshow] = useState(false);

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_API_URL}/login/google-login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             token: credentialResponse.access_token,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (data.code == "0") {
//         toast.success("Login successful!");

//         setTimeout(() => {
//           window.location.href = "/";
//         }, 1000);
//       } else if (data.code == "1") {
//         toast.error("This email is not registered.");
//       } else {
//         toast.error(data.msg || "Google login failed.");
//       }
//     } catch (error) {
//       console.error("Google login error:", error);
//       toast.error("Unable to connect. Please try again.");
//     }
//   };

//   const login = useGoogleLogin({
//     onSuccess: handleSuccess,
//     onError: () => toast.error("Google login failed."),
//   });

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!mail.trim() || !password) {
//       toast("Please fill in all fields.", {
//         icon: <BrushCleaning size={17} />,
//       });
//       return;
//     }

//     try {
//       setLoading(true);

//       const code = await MakeLogin(mail.trim(), password);

//       if (code === 1) {
//         toast.error("User not found.");
//       } else if (code === 2) {
//         toast("Incorrect password.", {
//           icon: <Info size={17} />,
//         });
//       } else if (code === 0) {
//         toast.success("Welcome back!");

//         setTimeout(() => {
//           window.location.href = "/";
//         }, 700);
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Unable to sign in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`relative w-full overflow-hidden bg-[#fafaff] p-7 sm:p-10 transition-all duration-500 ${
//         whichPage === "signup" ? "-translate-y-full" : "translate-y-0"
//       }`}
//     >
//       <AnimatePresence mode="wait">
//         {forgotpassShow ? (
//           <ForgotPassword
//             key="forgot-password"
//             setForgotpassshow={setForgotpassshow}
//           />
//         ) : (
//           <motion.div
//             key="login-form"
//             initial={{ opacity: 0, x: -16 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -16 }}
//             transition={pageTransition}
//             className="mx-auto flex w-full max-w-sm flex-col"
//           >



//             <div className="mb-8">

//               <h1 className="text-[2rem] font-semibold tracking-tight text-slate-900">
//                 Welcome back.
//               </h1>

//             </div>

//             {/* Google */}

//             <button
//               type="button"
//               onClick={() => login()}
//               className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99]"
//             >
//               <img
//                 src="/google.png"
//                 alt="Google"
//                 className="h-[18px] w-[18px] object-contain"
//               />

//               Continue with Google
//             </button>

//             {/* Divider */}

//             <div className="my-7 flex items-center gap-4">
//               <div className="h-px flex-1 bg-slate-200" />

//               <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
//                 Or use email
//               </span>

//               <div className="h-px flex-1 bg-slate-200" />
//             </div>

//             {/* Login form */}

//             <form onSubmit={handleLogin}>
//               <div className="mb-5">
//                 <label
//                   htmlFor="login-email"
//                   className="mb-2 block text-xs font-medium text-slate-600"
//                 >
//                   Email address
//                 </label>

//                 <div className="relative">
//                   <Mail
//                     size={17}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                   />

//                   <input
//                     id="login-email"
//                     type="email"
//                     placeholder="you@example.com"
//                     value={mail}
//                     onChange={(e) => setMail(e.target.value)}
//                     autoComplete="email"
//                     required
//                     className="auth-input pl-11"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="mb-2 flex items-center justify-between">
//                   <label
//                     htmlFor="login-password"
//                     className="text-xs font-medium text-slate-600"
//                   >
//                     Password
//                   </label>

//                   <button
//                     type="button"
//                     onClick={() => setForgotpassshow(true)}
//                     className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-800"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>

//                 <div className="relative">
//                   <LockKeyhole
//                     size={17}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                   />

//                   <input
//                     id="login-password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="current-password"
//                     required
//                     className="auth-input pl-11 pr-12"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={17} />
//                     ) : (
//                       <Eye size={17} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember me */}

//               <label className="mt-6 flex w-fit cursor-pointer items-center gap-2.5 text-xs text-slate-500">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="h-3.5 w-3.5 accent-indigo-600"
//                 />

//                 Remember me
//               </label>

//               {/* Submit */}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="auth-primary mt-7"
//               >
//                 {loading ? "Signing in..." : "Sign in"}

//                 {!loading && <ArrowRight size={17} />}
//               </button>
//             </form>

//             {/* Signup */}

//             <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
//               Don't have an account?

//               <button
//                 type="button"
//                 onClick={() => setWhichPage("signup")}
//                 className="ml-1.5 font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
//               >
//                 Create one
//               </button>
//             </div>

//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// /* --------------------------------------------------
//    MAIN SIGN IN PAGE
// -------------------------------------------------- */

// const SignIn = () => {
//   const [whichPage, setWhichPage] = useState("login");

//   return (
//     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3f4f8] px-4 py-10 text-slate-900 sm:px-8">

//       {/* Subtle background details */}

//       <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-indigo-100/30 blur-[100px]" />

//       <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-violet-100/30 blur-[100px]" />

//       {/* Main panel */}

//       <motion.section
//         layout
//         transition={pageTransition}
//         className={`relative z-10 w-full overflow-hidden rounded-2xl border border-white/80 bg-[#fafaff] shadow-[0_20px_80px_-35px_rgba(30,41,90,0.18)] ${
//           whichPage === "login" ? "max-w-[460px]" : "max-w-5xl"
//         }`}
//       >
//         <LoginContainer
//           whichPage={whichPage}
//           setWhichPage={setWhichPage}
//         />

//         <PatientSignup
//           whichPage={whichPage}
//           setWhichPage={setWhichPage}
//         />
//       </motion.section>

//       <Toaster
//         position="top-right"
//         reverseOrder={true}
//         toastOptions={{
//           duration: 3000,
//           style: {
//             border: "1px solid #e2e8f0",
//             borderRadius: "10px",
//             background: "#fff",
//             color: "#334155",
//             fontSize: "13px",
//             boxShadow: "0 8px 30px rgba(15, 23, 42, 0.07)",
//           },
//         }}
//       />
//     </main>
//   );
// };

// export default SignIn;



// import React, {  useState } from 'react'
// import "./initial.css"
// import { useGoogleLogin } from "@react-oauth/google";
// import {jwtDecode} from "jwt-decode";
// import { Info, BrushCleaning } from 'lucide-react';
// import {AnimatePresence, motion, useAnimation} from "framer-motion"
// import { MakeLogin } from '../BackendFunctions';
// import toast, { Toaster } from "react-hot-toast";
// import PatientSignup from './PatientSignup';
// import { useEffect } from 'react';


// const ForgotPassword = ({setForgotpassshow})=>{
//   const [mail,setMail] = useState("")
//   const [send,setSend] = useState(false)
//   async function sendforgotmail(){
//     const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/forgotPassword`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({email:mail}),
//       });
//     const result = await res.json()
//     if(result.code==0){
//       toast.success("Your password has been sent to your email!")
//       setSend(true);
//     }else if(result.code==1){
//       toast.error("User does not exist")
//     }else{
//       toast.error(result.msg)
//     }
//   }
//   return <motion.article 
//   initial={{y:"100%",opacity:0}} 
//   animate={{y:0,opacity:1}} 
//   exit={{ y: "100%",opacity:0}} 
//   transition={{duration:.6}} 
//   className='absolute h-full w-full left-0 z-100 top-0 flex flex-col items-center justify-center px-20'>
//       <img src="/forgot.gif" alt="" className='h-65 rounded-sm' />
//       <h2 className="text-3xl text-gray-800 font-medium mt-5">Reset Password</h2>
//       <p className='text-xs text-center mt-5 text-neutral-600'>We will send you a login link to you registered email address.</p>
//       <div className="mb-5 relative w-full mt-10 mb-10">
//         <input disabled={send} type="text" placeholder="Email" value={mail} onChange={e=>setMail(e.target.value)} className="text-black w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#c0cefeff] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300" required/>
//         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
//       </div>
//       <button onClick={()=>{
//         if(send){
//           setForgotpassshow(false)
//         }else{
//           sendforgotmail()
//         }
//       }} type="submit" className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300">
//        {send?"Mail Sent":" Send Login Link"}
//       </button>
//       <div className="text-center mt-6 text-sm text-gray-600">
//         Back to log in?
//         <a onClick={()=>setForgotpassshow(false)} className="cursor-pointer ml-2 border-b-1 border-transparent hover:border-purple-500 px-1 text-indigo-500 font-semibold hover:text-purple-500 transition-colors">Sign In</a>
//       </div>
//   </motion.article>
// }

// const LoginContainer = ({whichPage,setWhichPage})=>{
//   const handleSuccess = (credentialResponse) => {
//     const token = credentialResponse.access_token
//     // You can now send this token to your backend for verification
//     fetch(`${import.meta.env.VITE_BACKEND_API_URL}/login/google-login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ token: token }),
//     })
//       .then(async (res) => {
//         const data = await res.json()
//         if(data.code == "0"){
//           toast.success("Login Successfull")
//           setTimeout(() => {
//             window.location.href = "/"
//           }, 1500);
//         }else if(data.code == "1") {
//           toast.error("This email does not exist")
//         }else{
//           console.log("some problem occured",data)
//         }
//       })
//       .then((data) => console.log("Backend:", data));
//   };
//   const login = useGoogleLogin({
//     onSuccess: handleSuccess,
//     onError: () => toast.error('Login Failed'),
//   });
//   const formControlAnimation = useAnimation();
//   const [password,setPassword] = useState("")
//   const [mail,setMail] = useState("")
//   const [forgotpassShow,setForgotpassshow] = useState(false)
//   useEffect(() => {
//     if(forgotpassShow){
//       formControlAnimation.start({
//       x: [0,"-100%"],
//       opacity:[1,0],
//       transition: { duration: .6 },
//     });
//   }else{
//       formControlAnimation.start({
//       x: ["-100%",0],
//       opacity:[0,1],
//       transition: { duration: .6 },
//     });

//     }
//   }, [forgotpassShow])
  
//   return <div className={`${forgotpassShow?"bg-[#D1DBFC]":"bg-[#F3F1FF]"} w-full px-10 py-10 transition-all duration-400 ${whichPage=="signup"&&"translate-y-[-100%]"}`}>
//     <AnimatePresence>
//       {forgotpassShow && <ForgotPassword setForgotpassshow={setForgotpassshow}/>}
//     </AnimatePresence>
//        <div className="w-full flex flex-col items-center justify-center">
//         <motion.form  animate={formControlAnimation} className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={async (e)=>{
//           e.preventDefault()
//               if(mail.length>0 && password.length>0){
//                 const code = await MakeLogin(mail,password);
//                 if(code==1){
//                   // user not found
//                   toast.error("User Not Found!")
//                 }else if(code==2){
//                   // wrong password
//                   toast("Wrong Password", {icon: <Info size={18}/>,style: {borderRadius: "10px",background: "#fa5252",color: "#fff",}})
//                 }else if(code==0){
//                   // login succesffull
//                   toast.success("User Found Successfully!")
//                   setTimeout(() => {
//                     window.location = "/"
//                   }, 500);
//                 }
//               }else{
//                 toast("Emtpy Filds", {icon: <BrushCleaning size={18}/>,style: {borderRadius: "10px",background: "#fd7e14",color: "#fff",}})
//               }
//             }}  >
//           <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-5xl text-white">
//             👤
//           </div>
//             <h2 className="text-3xl text-gray-800 font-medium">Sign in</h2>
//             {/* <p className="text-xs text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p> */}

//             <button onClick={() => login()} type="button" className="w-full cursor-pointer hover:bg-blue-400/50 transition-bg duration-300 mt-8 bg-blue-400/10 flex gap-5 items-center justify-center h-12 rounded-sm">
//                 <img src="/google.png" alt="googleLogo" className='h-6'/>
//                 <p className='text-base text-gray-800'>Sign In With Google</p>
//             </button>
//             {/* <GoogleLogin onSuccess={handleSuccess} onError={handleError} /> */}

//             <div className="flex items-center gap-4 w-full my-5">
//                 <div className="w-full h-px bg-gray-300/90"></div>
//                 <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
//                 <div className="w-full h-px bg-gray-300/90"></div>
//             </div>

//             {/* <!-- Username --> */}
//             <div className="mb-5 relative w-full">
//               <input type="text" placeholder="Username" value={mail} onChange={e=>setMail(e.target.value)} className="text-black w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300" required/>
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
//             </div>

//             {/* <!-- Password --> */}
//             <div className=" relative w-full">
//               <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}  className="text-black w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300" required/>
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
//             </div>

//             <div className="select-none w-full flex items-center justify-between mt-8 mb-3 text-gray-700">
//                 <div className="container w-max">
//                     <input type="checkbox" id="cbx" className='hidden' checked readOnly/>
//                     <label htmlFor="cbx" className="check grid grid-cols-2 gap-6.5 text-sm">
//                         <svg width="18px" height="18px" viewBox="0 0 18 18">
//                             <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
//                             <polyline points="1 9 7 14 15 4"></polyline>
//                         </svg>
//                         <span className='whitespace-nowrap'>Remember me</span>
//                     </label>
//                 </div>

//                 <p className="transition-transform duration-100 cursor-pointer text-indigo-500 hover:text-purple-500 transition-colors text-sm active:scale-95" onClick={()=>setForgotpassshow(true)}>Forgot Password?</p>
//             </div>

//             <button type="submit" className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300">
//               Login
//             </button>
//             <div className="text-center mt-6 text-sm text-gray-600">
//               Don't have an account?
//               <span onClick={()=>setWhichPage("signup")} className="cursor-pointer active:scale-90 ml-2 border-b-1 border-transparent hover:border-purple-500 px-1 text-indigo-500 font-semibold hover:text-purple-500 transition-colors">Sign up</span>
//             </div>
//         </motion.form>
//     </div>
// </div>
// }


// const SignIn = () => {
//   const [whichPage,setWhichPage] = useState("login")
//   return (
//     <main className="text-black min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 overflow-hidden relative">

//   {/* <!-- Floating shapes background --> */}
//   <div className="absolute inset-0 z-0">
//     <div className="absolute w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm top-[10%] left-[10%] animate-float"></div>
//     <div className="absolute w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm top-[70%] left-[80%] animate-float delay-[2s]"></div>
//     <div className="absolute w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm top-[40%] left-[5%] animate-float delay-[4s]"></div>
//     <div className="absolute w-24 h-24 bg-white/20 rounded-full backdrop-blur-sm top-[20%] left-[85%] animate-float delay-[1s]"></div>
//     <div className="absolute w-24 h-24 bg-white/20 rounded-full backdrop-blur-sm top-[60%] left-[15%] animate-float delay-[3s]"></div>
//   </div>

//   <section className={`overflow-hidden flex justify-center relative transition-all duration-400 rounded-xl z-10 ${whichPage=="login"?"w-xl":"w-5xl"}`}>
//     {/* <!-- Login container --> */}
//     <LoginContainer whichPage={whichPage} setWhichPage={setWhichPage} />
//     <PatientSignup whichPage={whichPage} setWhichPage={setWhichPage} />

//     <Toaster position="top-right" reverseOrder={true} />
//   </section>

// </main>
//   )
// }

// export default SignIn
