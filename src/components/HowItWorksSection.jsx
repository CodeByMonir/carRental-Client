"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FaSearch, FaCalendarCheck, FaCar } from "react-icons/fa";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Discover Your Dream Car",
    description:
      "Explore our curated collection of premium and exotic vehicles. Filter by category, location, and daily price to find your perfect match.",
    icon: FaSearch,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    number: "02",
    title: "Reserve Instantly",
    description:
      "Select your vehicle and submit a booking in under 60 seconds. Real-time availability, instant confirmation — zero paperwork.",
    icon: FaCalendarCheck,
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20"
  },
  {
    number: "03",
    title: "Drive in Luxury",
    description:
      "Pick up your vehicle at the designated location — cleaned, fuelled, and ready. Return it just as effortlessly when your journey ends.",
    icon: FaCar,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  },
];

export default function HowItWorksSection() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";

  if (!mounted) return null;

  return (
    <section className={`relative w-full px-6 py-20 md:px-12 lg:px-20 lg:py-28 overflow-hidden transition-colors duration-300 ${isLight ? "bg-gray-50" : "bg-[#050505]"
      }`}>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block w-[55%] h-px pointer-events-none transition-colors duration-300 ${isLight ? "bg-linear-to-r from-transparent via-teal-500/20 to-transparent" : "bg-linear-to-r from-transparent via-teal-500/15 to-transparent"
        }`} />

      <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? "bg-teal-500/10" : "bg-teal-600/5"
        }`} />
      <div className={`absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none transition-colors duration-300 ${isLight ? "bg-blue-500/10" : "bg-blue-600/5"
        }`} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={`text-xs font-bold uppercase tracking-[0.35em] block mb-3 transition-colors duration-300 ${isLight ? "text-teal-600" : "text-teal-500"
              }`}>
              Simple Process
            </span>
            <h2 className={`text-4xl font-extrabold tracking-tight md:text-5xl transition-colors duration-300 ${isLight ? "text-gray-900" : "text-white"
              }`}>
              How It Works
            </h2>
            <div className={`h-1 w-20 rounded-full mx-auto my-4 transition-colors duration-300 ${isLight ? "bg-linear-to-r from-teal-500 to-teal-400" : "bg-linear-to-r from-teal-500 to-teal-400"
              }`} />
            <p className={`mt-4 max-w-xl mx-auto text-base font-light transition-colors duration-300 ${isLight ? "text-gray-600" : "text-zinc-400"
              }`}>
              From browsing to behind the wheel — our three-step process is designed for speed, transparency, and absolute convenience.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col gap-5 shadow-lg ${isLight
                  ? 'bg-white border border-gray-200 hover:shadow-xl hover:border-teal-500/30'
                  : 'bg-zinc-950/50 border border-zinc-900 hover:border-teal-500/30'
                }`}
            >
              
              <div className="flex items-start justify-between">
                <div className={`relative h-16 w-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${step.bgColor} ${step.borderColor} border`}>
                  <step.icon className={`h-7 w-7 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
                    }`} />
                </div>
                <span className={`text-7xl font-black leading-none select-none transition-colors duration-300 ${isLight ? 'text-gray-200' : 'text-zinc-900'
                  }`}>
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className={`text-xl font-extrabold tracking-tight mb-3 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed font-light transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  {step.description}
                </p>
              </div>

              <div className="mt-4">
                <button className={`group inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${isLight ? 'text-teal-600 hover:text-teal-700' : 'text-teal-500 hover:text-teal-400'
                  }`}>
                  Learn More
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className={`absolute bottom-0 left-8 right-8 h-0.5 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isLight ? 'bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0' : 'bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0'
                }`} />

              {idx < steps.length - 1 && (
                <div className={`hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${isLight
                    ? 'border-teal-500/20 bg-white text-teal-600'
                    : 'border-teal-500/20 bg-[#050505] text-teal-500'
                  }`}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className={`text-sm mb-4 transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
            }`}>
            Ready to experience luxury?
          </p>
          <Link href="/explore-cars">
            <button className={`group inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${isLight
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 hover:bg-teal-600'
                : 'bg-teal-500 text-white shadow-lg shadow-teal-500/25 hover:bg-teal-600'
              }`}>
              Get Started
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}