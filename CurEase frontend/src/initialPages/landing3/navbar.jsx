
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-5 md:px-12">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between border-b border-black/[0.06] bg-white/85 backdrop-blur-md">
        <a href="#" className="text-[21px] font-semibold tracking-[-1.2px] text-slate-900">
          CurEase<span className="text-blue-600">.</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative py-2 text-[13px] text-slate-500 transition-colors duration-300 hover:text-slate-950"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={() => navigate("/sign-in")}
            className="group flex items-center gap-2 text-[13px] font-medium text-slate-900"
          >
            Get started
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-slate-900 md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-b border-black/[0.06] bg-white px-5 py-6 md:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="block border-b border-black/[0.05] py-4 text-lg text-slate-800"
              >
                {link.label}
              </motion.a>
            ))}
            <button
              onClick={() => navigate("/sign-in")}
              className="mt-5 text-sm font-medium text-blue-700"
            >
              Get started ↗
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
