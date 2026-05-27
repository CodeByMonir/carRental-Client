"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { FaCar, FaCog, FaTachometerAlt, FaSpinner } from "react-icons/fa";

const MESSAGES = [
  "Finding your perfect ride...",
  "Checking vehicle availability...",
  "Preparing premium fleet...",
  "Calculating best deals...",
  "Loading luxury vehicles...",
  "Almost ready to go...",
];

const BRAND = "RentWheels";
const SUBTITLE = "Premium Car Rental Service";

const TICKS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

export default function LoadingSpinner() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${isLight ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-[#0D0D0D] to-black'
      }`}>
      {/* Animated Background Grid */}
      <div className={`absolute inset-0 opacity-5 pointer-events-none ${isLight ? 'bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:40px_40px]' : 'bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]'
        }`} />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${isLight ? 'bg-teal-400' : 'bg-teal-500'}`}
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Glow Effects */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[150px] transition-colors duration-300 ${isLight ? 'bg-teal-500/15' : 'bg-teal-500/8'
          }`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[150px] transition-colors duration-300 ${isLight ? 'bg-purple-500/15' : 'bg-purple-500/8'
          }`}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.main
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main Spinner */}
        <div className="relative w-52 h-52 mb-12">
          {/* Outer Ring Pulse */}
          <motion.div
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/5'
              }`}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Outer Ring Border */}
          <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${isLight ? 'border-2 border-teal-500/20' : 'border-2 border-teal-500/10'
            }`} />

          {/* Spinning Arc 1 */}
          <motion.div
            className={`absolute inset-0 rounded-full border-4 border-transparent transition-colors duration-300 ${isLight ? 'border-t-teal-500 border-r-teal-500' : 'border-t-teal-400 border-r-teal-400'
              }`}
            style={{ boxShadow: isLight ? "0 0 20px rgba(13,148,136,0.3)" : "0 0 20px rgba(13,148,136,0.2)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Spinning Arc 2 (Reverse) */}
          <motion.div
            className={`absolute inset-[8%] rounded-full border-3 border-transparent transition-colors duration-300 ${isLight ? 'border-b-teal-400 border-l-teal-400' : 'border-b-teal-500 border-l-teal-500'
              }`}
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Spinning Arc 3 (Inner) */}
          <motion.div
            className={`absolute inset-[16%] rounded-full border-2 border-transparent transition-colors duration-300 ${isLight ? 'border-t-teal-300 border-r-teal-300' : 'border-t-teal-500/60 border-r-teal-500/60'
              }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Tick Marks */}
          {TICKS.map((deg) => (
            <div
              key={deg}
              className="absolute inset-0 flex items-start justify-center"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className={`w-px h-4 mt-2 transition-colors duration-300 ${isLight ? 'bg-teal-400/40' : 'bg-white/15'
                }`} />
            </div>
          ))}

          {/* Center Hub */}
          <div className={`absolute inset-[28%] rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center ${isLight
              ? 'bg-white/70 border-teal-500/30 shadow-lg'
              : 'bg-[#1A1A1A]/70 border-teal-500/30'
            }`}>
            {/* Center Dot */}
            <div className="relative">
              <motion.div
                className="w-4 h-4 rounded-full bg-teal-500 shadow-[0_0_15px_rgba(13,148,136,0.8)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 w-4 h-4 rounded-full bg-teal-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Needle */}
            <motion.div
              className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-0.5 origin-bottom"
              style={{
                height: "50%",
                background: isLight
                  ? "linear-gradient(to top, transparent, #0D9488)"
                  : "linear-gradient(to top, transparent, #14b8a6)",
              }}
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Rotating Text */}
        <div className="text-center space-y-4 h-24 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={msgIndex}
              className={`text-xl md:text-2xl font-semibold tracking-wide text-center max-w-md px-4 transition-colors duration-300 ${isLight ? 'text-gray-800' : 'text-white'
                }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {MESSAGES[msgIndex]}
            </motion.h1>
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FaSpinner className={`text-xs ${isLight ? 'text-teal-500' : 'text-teal-400'}`} />
            </motion.div>
            <p className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-neutral-500'
              }`}>
              {SUBTITLE}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mt-10">
          <div className={`h-1.5 rounded-full overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-200' : 'bg-white/10'
            }`}>
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className={`text-[10px] transition-colors duration-300 ${isLight ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Loading...
            </span>
            <span className={`text-[10px] transition-colors duration-300 ${isLight ? 'text-gray-400' : 'text-gray-600'
              }`}>
              Please wait
            </span>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer
        className="fixed bottom-8 flex flex-col items-center gap-2 select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300 ${isLight ? 'bg-teal-500' : 'bg-teal-600'
              }`}>
              <FaCar className={`text-sm ${isLight ? 'text-white' : 'text-white'}`} />
            </div>
          </motion.div>

          <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
            }`}>
            {BRAND}
          </span>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FaCog className={`text-sm transition-colors duration-300 ${isLight ? 'text-gray-400' : 'text-white/40'
              }`} />
          </motion.div>
        </div>

        <div className={`h-px w-20 transition-all duration-300 ${isLight
            ? 'bg-gradient-to-r from-transparent via-teal-500/50 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
          }`} />

        <div className="flex gap-4 mt-2">
          <FaTachometerAlt className={`text-xs transition-colors duration-300 ${isLight ? 'text-gray-400' : 'text-white/30'
            }`} />
          <span className={`text-[10px] tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-400' : 'text-white/30'
            }`}>
            SYSTEM READY
          </span>
        </div>
      </motion.footer>
    </div>
  );
}