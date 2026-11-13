
import { motion } from "framer-motion";
import {
  Activity,
  Apple,
  ChartNoAxesCombined,
  HeartPulse,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Symptom Checker",
    description: "Understand possible causes of your symptoms through guided analysis.",
    icon: Activity,
  },
  {
    number: "02",
    title: "Nutrition Analyzer",
    description: "Explore the nutritional value of your meals and make informed choices.",
    icon: Apple,
  },
  {
    number: "03",
    title: "Health Dashboard",
    description: "Keep your health information and progress together in one place.",
    icon: ChartNoAxesCombined,
  },
  {
    number: "04",
    title: "Emergency Aid",
    description: "Find useful first-response guidance when every moment matters.",
    icon: HeartPulse,
  },
];

export const OurFeatures = () => {
  return (
    <section id="features" className="bg-white px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-xl md:mb-24"
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
            What you can do
          </p>
          <h2 className="text-4xl font-medium leading-[1.12] tracking-[-0.05em] text-slate-900 md:text-6xl">
            Healthcare, made a little simpler.
          </h2>
        </motion.div>

        <div className="border-t border-slate-200">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.a
                key={feature.number}
                href="/sign-in"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-slate-200 py-7 transition-colors duration-300 hover:bg-slate-50/70 md:grid-cols-[70px_1fr_1fr_40px] md:gap-8 md:py-10"
              >
                <span className="text-xs tabular-nums text-slate-400">
                  {feature.number}
                </span>

                <div className="flex items-center gap-4">
                  <Icon
                    size={19}
                    strokeWidth={1.5}
                    className="text-slate-400 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-blue-600"
                  />
                  <h3 className="text-lg font-medium tracking-tight text-slate-900 transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                    {feature.title}
                  </h3>
                </div>

                <p className="hidden max-w-sm text-sm leading-6 text-slate-500 md:block">
                  {feature.description}
                </p>

                <ArrowUpRight
                  size={19}
                  className="text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
