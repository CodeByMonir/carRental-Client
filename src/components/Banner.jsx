"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCar, FaArrowRight, FaStar } from "react-icons/fa";
import { useTheme } from "@/providers/ThemeProvider";

export default function Banner() {
    const { theme, mounted } = useTheme();
    const isLight = theme === "light";

    if (!mounted) return null;

    return (
        <section className={`relative overflow-hidden transition-colors duration-500 ${isLight
                ? "bg-linear-to-r from-teal-600 to-teal-800"
                : "bg-linear-to-r from-gray-900 to-gray-950"
            }`}>
                
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 w-48 h-48 bg-teal-400 rounded-full -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <div className={`absolute inset-0 ${isLight
                    ? "bg-linear-to-r from-teal-900/20 to-teal-800/20"
                    : "bg-linear-to-r from-black/50 to-gray-950/50"
                }`} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="text-center md:text-left md:flex md:items-center md:justify-between">
                    
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="md:w-1/2"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${isLight
                                    ? "bg-white/20 backdrop-blur-sm"
                                    : "bg-white/10 backdrop-blur-sm"
                                }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                            <span className="text-sm font-medium text-white">Premium Car Rentals</span>
                        </motion.div>

                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isLight ? "text-white" : "text-white"
                            }`}>
                            Find Your Perfect
                            <span className="block text-teal-300">
                                Rental Car
                            </span>
                        </h1>

                        <p className={`text-lg md:text-xl mb-8 ${isLight ? "text-teal-100" : "text-gray-300"
                            }`}>
                            Discover the best deals on premium car rentals. Choose from our
                            wide range of vehicles for any occasion. Book now and drive away
                            with confidence!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/cars"
                                className="group inline-flex items-center justify-center gap-2 bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/25"
                            >
                                <FaCar className="text-xl" />
                                Explore Cars
                                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/contact"
                                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border ${isLight
                                        ? "border-white/30 text-white hover:bg-white/10"
                                        : "border-gray-700 text-gray-200 hover:bg-gray-800"
                                    }`}
                            >
                                Contact Us
                            </Link>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/20"
                        >
                            <div className="text-center md:text-left">
                                <p className="text-2xl font-bold text-white">500+</p>
                                <p className={`text-sm ${isLight ? "text-teal-100" : "text-gray-300"}`}>Luxury Cars</p>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-2xl font-bold text-white">10k+</p>
                                <p className={`text-sm ${isLight ? "text-teal-100" : "text-gray-300"}`}>Happy Customers</p>
                            </div>
                            <div className="text-center md:text-left">
                                <p className="text-2xl font-bold text-white">24/7</p>
                                <p className={`text-sm ${isLight ? "text-teal-100" : "text-gray-300"}`}>Support</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden md:block md:w-1/2 mt-10 md:mt-0"
                    >
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=450&fit=crop"
                                    alt="Luxury Car"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${isLight
                                        ? "from-teal-900/30 to-transparent"
                                        : "from-black/50 to-transparent"
                                    }`} />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 0.6, type: "spring" }}
                                className={`absolute -bottom-5 -left-5 rounded-xl p-4 shadow-xl backdrop-blur-sm ${isLight
                                        ? "bg-white/95 backdrop-blur-sm"
                                        : "bg-gray-900/95 backdrop-blur-sm border border-gray-800"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">⭐</div>
                                    <div>
                                        <p className={`font-bold text-lg ${isLight ? "text-gray-800" : "text-white"}`}>4.9/5</p>
                                        <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-400"}`}>5000+ Reviews</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className={`absolute top-5 -right-5 rounded-xl p-4 shadow-xl backdrop-blur-sm ${isLight
                                        ? "bg-teal-500 text-white"
                                        : "bg-teal-600 text-white"
                                    }`}
                            >
                                <div className="text-center">
                                    <p className="text-xs font-semibold uppercase tracking-wider">Starting From</p>
                                    <p className="text-2xl font-bold">$49<span className="text-sm">/day</span></p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className={`absolute bottom-5 right-5 rounded-xl p-3 shadow-xl backdrop-blur-sm ${isLight
                                        ? "bg-white/95"
                                        : "bg-gray-900/95 border border-gray-800"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">⭐</div>
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border-2 border-white">🚗</div>
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs border-2 border-white">🔧</div>
                                    </div>
                                    <div>
                                        <p className={`text-xs font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>Premium Fleet</p>
                                        <p className={`text-xs ${isLight ? "text-gray-600" : "text-gray-400"}`}>2024 Models</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
                <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        className={`fill-current ${isLight ? "text-gray-50" : "text-gray-950"}`} opacity="1"></path>
                </svg>
            </div>
        </section>
    );
}