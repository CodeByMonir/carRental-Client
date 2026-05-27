"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// ── Config — edit freely ─────────────────────────────────────────
const MESSAGES = [
  "Initializing precision engineering...",
  "Preparing your elite fleet...",
  "Syncing telemetry data...",
  "Calibrating performance metrics...",
  "Polishing the carbon fiber...",
  "Optimizing driving dynamics...",
];

const BRAND = "CarServer";
const SUBTITLE = "System Calibration Active";

const TICKS = [0, 45, 90, 135, 180, 225, 270, 315];

export default function LoadingSpinner() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center overflow-hidden">

      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/5 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/5 blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.main
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        
        <div className="relative w-40 h-40 mb-12">


          <motion.div
            className="absolute inset-0 rounded-full bg-orange-500/10 blur-2xl"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute inset-0 rounded-full border border-white/5" />

          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-500"
            style={{ boxShadow: "0 0 15px rgba(255,107,43,0.35)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />

          {TICKS.map((deg) => (
            <div
              key={deg}
              className="absolute inset-0 flex items-start justify-center opacity-20"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className="w-px h-3 bg-white mt-1" />
            </div>
          ))}

          <div className="absolute inset-[35%] rounded-full bg-[#1A1A1A]/60 backdrop-blur-xl border border-white/8 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,107,43,0.9)]" />

            <motion.div
              className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-px origin-bottom"
              style={{
                height: "60%",
                background: "linear-gradient(to top, transparent, #ff6b2b)",
              }}
              animate={{ rotate: [-45, -42, -45] }}
              transition={{ duration: 0.12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="text-center space-y-3 h-16 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={msgIndex}
              className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {MESSAGES[msgIndex]}
            </motion.h1>
          </AnimatePresence>

          <p className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500">
            {SUBTITLE}
          </p>
        </div>
      </motion.main>

      <motion.footer
        className="fixed bottom-12 flex flex-col items-center gap-2 opacity-30 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffb59a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 17H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2l1.5-4h13L19 10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/>
            <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>
          </svg>
          <span className="text-2xl font-extrabold tracking-tighter text-neutral-100">
            {BRAND}
          </span>
        </div>
        <div className="h-px w-12 bg-linear-to-r from-transparent via-white/40 to-transparent" />
      </motion.footer>
    </div>
  );
}
