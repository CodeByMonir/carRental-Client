"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import CountUp from "./CountUp";
import { FaShieldAlt, FaStar, FaHeadset, FaUsers, FaCar, FaClock } from "react-icons/fa";

const stats = [
  {
    icon: FaCar,
    end: 1.2,
    suffix: "M+",
    decimals: 1,
    label: "Miles Driven Safely",
    description: "Every journey monitored with top-tier telematics and safety protocols.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    icon: FaStar,
    end: 99.8,
    suffix: "%",
    decimals: 1,
    label: "Satisfaction Score",
    description: "Elite service quality verified by thousands of luxury car enthusiasts.",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  {
    icon: FaClock,
    end: 24,
    suffix: "/7",
    decimals: 0,
    label: "Active Roadside Guard",
    description: "Instant response networks globally to guarantee your absolute security.",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  {
    icon: FaUsers,
    end: 12000,
    suffix: "+",
    decimals: 0,
    label: "Happy Drivers",
    description: "A growing community of satisfied renters across cities and continents.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  },
];

export default function StatsTrustSection() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";

  if (!mounted) return null;

  return (
    <section className={`relative w-full py-20 px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-300 ${isLight
        ? 'bg-linear-to-b from-gray-50 to-white border-t border-gray-200'
        : 'bg-[#050505] border-t border-zinc-900/60'
      }`}>
        
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-[150px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-600/5'
        }`} />

      <div className={`absolute top-0 right-0 w-75 h-75 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-blue-500/10' : 'bg-blue-600/5'
        }`} />

      <div className={`absolute bottom-0 left-0 w-75 h-75 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-purple-500/10' : 'bg-purple-600/5'
        }`} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={`text-xs font-bold uppercase tracking-[0.35em] block mb-3 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
              }`}>
              Elite Reliability Metrics
            </span>
            <h2 className={`text-4xl font-extrabold tracking-tight md:text-5xl transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
              }`}>
              Why Clients Choose{' '}
              <span className="bg-linear-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                RentWheels
              </span>
            </h2>
            <div className="h-1 w-20 bg-linear-to-r from-teal-500 to-teal-400 rounded-full mx-auto my-4" />
            <p className={`mt-4 max-w-2xl mx-auto text-base font-light transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
              }`}>
              We blend meticulous engineering maintenance protocols with unmatched customer care
              to define a new gold standard in luxury rentals.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className={`rounded-2xl p-7 transition-all duration-300 flex flex-col items-center text-center shadow-lg ${isLight
                  ? 'bg-white border border-gray-200 hover:shadow-xl hover:border-teal-500/30'
                  : 'bg-zinc-950/40 border border-zinc-900 hover:border-teal-500/30 backdrop-blur-sm'
                }`}
            >
              
              <div className={`relative h-16 w-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${stat.bgColor} ${stat.borderColor} border`}>
                <stat.icon className={`h-7 w-7 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
                  }`} />
              </div>

              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-black tracking-tight transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2.2}
                  />
                </span>
              </div>

              <span className={`text-sm font-bold mt-3 mb-2 transition-colors duration-300 ${isLight ? 'text-gray-800' : 'text-zinc-200'
                }`}>
                {stat.label}
              </span>

              <p className={`text-xs font-light leading-relaxed transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                }`}>
                {stat.description}
              </p>

              <div className={`absolute bottom-0 left-8 right-8 h-0.5 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isLight ? 'bg-linear-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0' : 'bg-linear-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0'
                }`} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t transition-colors duration-300 flex flex-wrap justify-center gap-8 ${
            isLight ? 'border-gray-200' : 'border-zinc-900'
          }"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLight ? 'bg-green-100' : 'bg-green-500/10'
              }`}>
              <FaShieldAlt className={`text-sm ${isLight ? 'text-green-600' : 'text-green-500'}`} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isLight ? 'text-gray-800' : 'text-white'}`}>Fully Insured</p>
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>Comprehensive Coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLight ? 'bg-blue-100' : 'bg-blue-500/10'
              }`}>
              <FaHeadset className={`text-sm ${isLight ? 'text-blue-600' : 'text-blue-500'}`} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isLight ? 'text-gray-800' : 'text-white'}`}>24/7 Support</p>
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>Real-time Assistance</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLight ? 'bg-purple-100' : 'bg-purple-500/10'
              }`}>
              <FaStar className={`text-sm ${isLight ? 'text-purple-600' : 'text-purple-500'}`} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isLight ? 'text-gray-800' : 'text-white'}`}>5-Star Service</p>
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>Premium Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}