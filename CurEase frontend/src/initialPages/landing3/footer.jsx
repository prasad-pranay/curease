
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="overflow-hidden bg-[#f7f8fa] px-6 pt-16 md:px-16 md:pt-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-12 border-b border-slate-200 pb-14 md:flex-row">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-400">
              A healthier way forward
            </p>
            <p className="max-w-sm text-2xl font-medium leading-snug tracking-tight text-slate-800">
              Making health information feel a little more human.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8 text-sm">
            <div className="space-y-4">
              <p className="text-xs text-slate-400">Explore</p>
              <a href="#features" className="block text-slate-700 hover:text-blue-600">Features</a>
              <a href="#about" className="block text-slate-700 hover:text-blue-600">About</a>
              <a href="#faq" className="block text-slate-700 hover:text-blue-600">FAQs</a>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-400">Account</p>
              <a href="/sign-in" className="group flex items-center gap-1 text-slate-700 hover:text-blue-600">
                Sign in
                <ArrowUpRight size={13} />
              </a>
              <a href="/about" className="block text-slate-700 hover:text-blue-600">Project</a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative pt-10"
        >
          <h2 className="select-none text-center text-[17vw] font-semibold leading-[0.8] tracking-[-0.09em] text-slate-900 md:text-[16vw]">
            CurEase<span className="text-blue-600">.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col justify-between gap-3 py-7 text-[11px] text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} CurEase. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-5">
            <span>Delhi, India</span>
            <span className="flex items-center gap-2 tabular-nums text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {time || "Loading time"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
