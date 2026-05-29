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
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${isLight ? 'bg-linear-to-br from-gray-50 to-gray-100' : 'bg-linear-to-br from-[#0D0D0D] to-black'
      }`}>

      <div className={`absolute inset-0 opacity-5 pointer-events-none ${isLight ? 'bg-[radial-gradient(#0D9488_1px,transparent_1px)] bg-size-[40px_40px]' : 'bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[40px_40px]'
        }`} />

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

      <motion.main
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        
        <div className="relative w-52 h-52 mb-12">

          <motion.div
            className={`absolute inset-0 rounded-full blur-2xl transition-colors duration-300 ${isLight ? 'bg-teal-500/20' : 'bg-teal-500/10'
              }`}
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${isLight ? 'border border-gray-300' : 'border border-white/5'
            }`} />

          <motion.div
            className={`absolute inset-0 rounded-full border-4 border-transparent transition-colors duration-300 ${isLight ? 'border-t-teal-500 border-r-teal-500' : 'border-t-teal-500 border-r-teal-500'
              }`}
            style={{ boxShadow: isLight ? "0 0 15px rgba(13,148,136,0.25)" : "0 0 15px rgba(13,148,136,0.35)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className={`absolute inset-[10%] rounded-full border-2 border-transparent transition-colors duration-300 ${isLight ? 'border-b-teal-400 border-l-teal-400' : 'border-b-teal-400 border-l-teal-400'
              }`}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />

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

          <div className={`absolute inset-[30%] rounded-full backdrop-blur-xl border transition-colors duration-300 flex items-center justify-center ${isLight
              ? 'bg-white/60 border-gray-200'
              : 'bg-[#1A1A1A]/60 border-white/8'
            }`}>
              
            <div className="relative">
              <motion.div
                className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_12px_rgba(13,148,136,0.6)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 w-3 h-3 rounded-full bg-teal-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

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

        <div className="text-center space-y-4 h-20 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={msgIndex}
              className={`text-xl md:text-2xl font-semibold tracking-wide text-center max-w-md px-4 transition-colors duration-300 ${isLight ? 'text-gray-800' : 'text-white'
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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

        <div className="w-80 mt-10">
          <div className={`h-1.5 rounded-full overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-200' : 'bg-white/10'
            }`}>
            <motion.div
              className="h-full bg-linear-to-r from-teal-500 to-teal-400 rounded-full"
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
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300 ${isLight ? 'bg-teal-600' : 'bg-teal-500'
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
            ? 'bg-linear-to-r from-transparent via-teal-500/50 to-transparent'
            : 'bg-linear-to-r from-transparent via-white/30 to-transparent'
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