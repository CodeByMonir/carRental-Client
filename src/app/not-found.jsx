
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import {
  FaCar,
  FaHome,
  FaArrowLeft,
  FaSearch,
  FaExclamationTriangle,
  FaRoad,
  FaCompass,
} from "react-icons/fa";

export default function NotFound() {
  const router = useRouter();
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-500 flex items-center justify-center px-4 py-20 ${isLight
        ? "bg-gradient-to-br from-gray-50 to-gray-100"
        : "bg-gradient-to-br from-gray-900 to-gray-950"
      }`}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Car Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full animate-ping opacity-75 transition-colors duration-300 ${isLight ? "bg-teal-200" : "bg-teal-500/20"
              }`}></div>
          </div>
          <div className="relative inline-block animate-bounce">
            <div className={`rounded-full p-8 inline-block shadow-2xl transition-colors duration-300 ${isLight ? "bg-teal-600" : "bg-teal-500"
              }`}>
              <FaCar className="text-6xl text-white" />
            </div>
          </div>
        </div>

        <h1 className={`text-8xl md:text-9xl font-bold mb-4 animate-fadeInUp transition-colors duration-300 ${isLight ? "text-teal-600" : "text-teal-500"
          }`}>
          404
        </h1>

        <div className="mb-8 animate-fadeInUp animation-delay-200">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${isLight ? "text-gray-800" : "text-white"
            }`}>
            Oops! Car Not Found
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaExclamationTriangle className="text-yellow-500" />
            <p className={`text-lg transition-colors duration-300 ${isLight ? "text-gray-600" : "text-gray-400"
              }`}>
              The page you're looking for has driven off somewhere else
            </p>
          </div>
          <p className={`max-w-md mx-auto transition-colors duration-300 ${isLight ? "text-gray-600" : "text-gray-400"
            }`}>
            It seems like the page you requested doesn't exist or has been
            moved. Don't worry, we'll help you find your way back!
          </p>
        </div>

        <div className={`rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto animate-fadeInUp animation-delay-400 transition-colors duration-300 ${isLight
            ? "bg-white shadow-gray-200"
            : "bg-gray-900/50 shadow-gray-950 border border-gray-800"
          }`}>
          <div className={`flex items-center gap-2 mb-3 transition-colors duration-300 ${isLight ? "text-gray-700" : "text-gray-300"
            }`}>
            <FaSearch className="text-teal-500" />
            <h3 className="font-semibold">You might be looking for:</h3>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/cars"
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 ${isLight
                  ? "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-600"
                  : "bg-gray-800 text-gray-300 hover:bg-teal-500/20 hover:text-teal-400"
                }`}
            >
              Browse Cars
            </Link>
            <Link
              href="/my-bookings"
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 ${isLight
                  ? "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-600"
                  : "bg-gray-800 text-gray-300 hover:bg-teal-500/20 hover:text-teal-400"
                }`}
            >
              My Bookings
            </Link>
            <Link
              href="/add-car"
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 ${isLight
                  ? "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-600"
                  : "bg-gray-800 text-gray-300 hover:bg-teal-500/20 hover:text-teal-400"
                }`}
            >
              Add a Car
            </Link>
            <Link
              href="/login"
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 ${isLight
                  ? "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-600"
                  : "bg-gray-800 text-gray-300 hover:bg-teal-500/20 hover:text-teal-400"
                }`}
            >
              Login/Register
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-600">
          
          <Link
            href="/"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isLight
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            href="/explore-cars"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isLight
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}
          >
            <FaCar />
            Explore Cars
          </Link>
        </div>

        <div className="mt-12 text-center animate-fadeInUp animation-delay-800">
          <div className={`inline-flex items-center gap-3 text-sm transition-colors duration-300 ${isLight ? "text-gray-500" : "text-gray-500"
            }`}>
            <FaRoad className="text-teal-500" />
            <span>Lost? Let us guide you back to the road!</span>
            <FaCompass className="text-teal-500" />
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse animation-delay-200" />
            <div className="w-2 h-2 rounded-full bg-teal-300 animate-pulse animation-delay-400" />
          </div>
        </div>
      </div>

      <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.4;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.2);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                .animate-pulse-custom {
                    animation: pulse 1.5s ease-in-out infinite;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                .animation-delay-600 {
                    animation-delay: 0.6s;
                }
                .animation-delay-800 {
                    animation-delay: 0.8s;
                }
            `}</style>
    </div>
  );
}