"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { FaCar, FaCog, FaTachometerAlt } from "react-icons/fa";

// ── Config — edit freely ─────────────────────────────────────────
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

// ── Speed tick marks around the rim ─────────────────────────────
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
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#0D0D0D]'
      }`}>

      {/* Background glow blobs */}
      <motion.div
        className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-300 ${isLight ? 'bg-teal-500/20' : 'bg-teal-500/5'
          }`}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-300 ${isLight ? 'bg-purple-500/20' : 'bg-purple-500/5'
          }`}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[150px] transition-colors duration-300 ${isLight ? 'bg-blue-500/10' : 'bg-blue-500/3'
          }`}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <motion.main
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Spinner */}
        <div className="relative w-48 h-48 mb-12">

          {/* Outer glow pulse */}
          <motion.div
            className={`absolute inset-0 rounded-full blur-2xl transition-colors duration-300 ${isLight ? 'bg-teal-500/20' : 'bg-teal-500/10'
              }`}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Static rim */}
          <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${isLight ? 'border border-gray-300' : 'border border-white/5'
            }`} />

          {/* Spinning arc - Outer */}
          <motion.div
            className={`absolute inset-0 rounded-full border-4 border-transparent transition-colors duration-300 ${isLight ? 'border-t-teal-500 border-r-teal-500' : 'border-t-teal-500 border-r-teal-500'
              }`}
            style={{ boxShadow: isLight ? "0 0 15px rgba(13,148,136,0.25)" : "0 0 15px rgba(13,148,136,0.35)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />

          {/* Spinning arc - Inner (reverse) */}
          <motion.div
            className={`absolute inset-[10%] rounded-full border-2 border-transparent transition-colors duration-300 ${isLight ? 'border-b-teal-400 border-l-teal-400' : 'border-b-teal-400 border-l-teal-400'
              }`}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />

          {/* Tick marks */}
          {TICKS.map((deg) => (
            <div
              key={deg}
              className="absolute inset-0 flex items-start justify-center"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className={`w-px h-3 mt-1 transition-colors duration-300 ${isLight ? 'bg-gray-400' : 'bg-white/20'
                }`} />
            </div>
          ))}

          {/* Center hub */}
          <div className={`absolute inset-[30%] rounded-full backdrop-blur-xl border transition-colors duration-300 flex items-center justify-center ${isLight
              ? 'bg-white/60 border-gray-200'
              : 'bg-[#1A1A1A]/60 border-white/8'
            }`}>
            {/* Center dot */}
            <div className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_12px_rgba(13,148,136,0.6)]" />

            {/* Needle */}
            <motion.div
              className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-0.5 origin-bottom"
              style={{
                height: "55%",
                background: isLight
                  ? "linear-gradient(to top, transparent, #0D9488)"
                  : "linear-gradient(to top, transparent, #14b8a6)",
              }}
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Rotating text */}
        <div className="text-center space-y-4 h-20 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={msgIndex}
              className={`text-2xl md:text-3xl font-semibold tracking-wide transition-colors duration-300 ${isLight
                  ? 'text-gray-800'
                  : 'bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 bg-[length:200%_auto] bg-clip-text text-transparent'
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {MESSAGES[msgIndex]}
            </motion.h1>
          </AnimatePresence>

          <p className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-neutral-500'
            }`}>
            {SUBTITLE}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mt-8">
          <div className={`h-1 rounded-full overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-200' : 'bg-white/10'
            }`}>
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </motion.main>

      {/* Brand footer */}
      <motion.footer
        className="fixed bottom-12 flex flex-col items-center gap-2 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          {/* Animated Car Icon */}
          <motion.div
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaCar className={`text-xl transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
              }`} />
          </motion.div>

          <span className={`text-2xl font-extrabold tracking-tighter transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-neutral-100'
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

        <div className={`h-px w-16 transition-all duration-300 ${isLight
            ? 'bg-gradient-to-r from-transparent via-teal-500/50 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
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