'use client'

import { featureCar } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

// Shimmering Card Skeleton Component with Theme Support
const CardSkeleton = ({ isLight }) => (
  <div className={`overflow-hidden rounded-[30px] border p-5 shadow-2xl transition-colors duration-300 ${isLight
      ? 'border-gray-200 bg-white'
      : 'border-zinc-800/80 bg-zinc-950/60'
    }`}>
    {/* Image Placeholder */}
    <div className={`relative h-[240px] w-full rounded-[24px] shimmer mb-6 ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
      }`} />

    {/* Content Placeholder */}
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className={`h-7 w-40 rounded-lg shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
          <div className={`h-4 w-20 rounded-md shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
        </div>
        <div className="text-right space-y-1">
          <div className={`h-7 w-16 rounded-lg shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
          <div className={`h-4 w-10 rounded-md shimmer ml-auto ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
        </div>
      </div>

      {/* Specs Pill Placeholder */}
      <div className="flex gap-2 mt-5">
        <div className={`h-6 w-16 rounded-full shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
        <div className={`h-6 w-16 rounded-full shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
        <div className={`h-6 w-16 rounded-full shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
      </div>

      {/* Button Placeholder */}
      <div className={`h-14 w-full rounded-2xl shimmer mt-8 ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
    </div>
  </div>
);

export default function FeaturedFleet() {
  const { theme, mounted } = useTheme();
  const isLight = theme === 'light';
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await featureCar();
        setCars(data);
      } catch (error) {
        console.log(error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setCars]);

  // Framer Motion Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  if (!mounted) return null;

  return (
    <section className={`relative w-full px-4 py-16 sm:px-6 md:px-10 lg:px-20 lg:py-24 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#050505]'
      }`}>
      {/* Background radial glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/5'
        }`} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className={`text-xs font-bold uppercase tracking-[0.35em] block mb-3 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
              }`}>
              Precision & Performance
            </span>
            <h2 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
              }`}>
              Featured Cars
            </h2>
            <p className={`mt-3 text-base sm:text-lg max-w-xl transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
              }`}>
              The pinnacle of modern automotive design and engineering, curated exclusively for you.
            </p>
          </div>

          {/* View All Button */}
          <Link href="/explore-cars" className="group">
            <motion.button
              whileHover={{ x: 3 }}
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all duration-300 ${isLight
                  ? 'border-teal-500/30 bg-teal-500/10 text-teal-600 hover:bg-teal-500 hover:text-white'
                  : 'border-teal-500/20 bg-teal-500/5 text-teal-400 hover:bg-teal-500 hover:text-white'
                }`}
            >
              View All Fleet
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>

        {/* Loading Grid of Skeletons */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} isLight={isLight} />
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className={`rounded-[30px] border p-12 text-center max-w-lg mx-auto transition-colors duration-300 ${isLight
              ? 'border-gray-200 bg-white text-gray-600'
              : 'border-zinc-800/80 bg-zinc-950/60 text-zinc-400'
            }`}>
            <p className="text-xl font-semibold mb-2">No cars available</p>
            <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-zinc-500'}`}>Please check back later or refresh the page.</p>
          </div>
        ) : (
          /* Staggered Animated Grid of Car Cards */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {cars.map((car, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  borderColor: isLight ? "rgba(13, 148, 136, 0.35)" : "rgba(13, 148, 136, 0.35)",
                  boxShadow: isLight
                    ? "0 10px 40px rgba(13, 148, 136, 0.1)"
                    : "0 10px 40px rgba(13, 148, 136, 0.08)"
                }}
                className={`group relative overflow-hidden rounded-[30px] border shadow-2xl transition-all duration-300 flex flex-col justify-between ${isLight
                    ? 'border-gray-200 bg-white'
                    : 'border-zinc-900 bg-[#0b0b0b]'
                  }`}
              >
                <div>
                  {/* Image */}
                  <div className="relative h-[250px] w-full overflow-hidden p-3 pb-0">
                    <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                      <Image
                        src={car.imageUrl}
                        alt={car.carName}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        unoptimized
                      />

                      {/* Overlay gradient */}
                      <div className={`absolute inset-0 ${isLight
                          ? 'bg-gradient-to-t from-white/90 via-white/10 to-transparent'
                          : 'bg-gradient-to-t from-black/90 via-black/10 to-transparent'
                        }`} />

                      {/* Rating Badge */}
                      <div className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold backdrop-blur-md transition-colors duration-300 ${isLight
                          ? 'border-teal-500/20 bg-white/85 text-gray-800'
                          : 'border-teal-500/20 bg-black/85 text-white'
                        }`}>
                        <FaStar className="text-teal-500" />
                        5.0
                      </div>

                      {/* Floating Car Type */}
                      <div className="absolute left-4 bottom-4">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg transition-colors duration-300 ${isLight
                            ? 'bg-teal-500 text-white shadow-teal-500/20'
                            : 'bg-teal-500 text-white shadow-teal-500/20'
                          }`}>
                          {car.carType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pb-2">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`text-2xl font-bold tracking-tight transition-colors line-clamp-1 duration-300 ${isLight
                            ? 'text-gray-900 group-hover:text-teal-600'
                            : 'text-white group-hover:text-teal-400'
                          }`}>
                          {car.carName}
                        </h3>
                        <p className={`mt-1 text-xs uppercase tracking-wider font-semibold transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                          }`}>
                          Luxury Drive
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className={`text-2xl font-black transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-400'
                          }`}>
                          ${car.dailyRentPrice}
                        </p>
                        <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                          }`}>
                          / day
                        </span>
                      </div>
                    </div>

                    {/* Specs List */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {["503 HP", "Auto", "4 Seats"].map((spec, index) => (
                        <span
                          key={index}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${isLight
                              ? 'border-gray-200 bg-gray-100 text-gray-700'
                              : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-300'
                            }`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Button action */}
                <div className="p-6 pt-0">
                  <Link href={`/explore-cars/${car._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-6 h-14 w-full rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md ${isLight
                          ? 'bg-teal-500 text-white shadow-teal-500/20 hover:bg-gray-800 hover:text-white hover:shadow-gray-500/15'
                          : 'bg-teal-500 text-white shadow-teal-500/20 hover:bg-white hover:text-black hover:shadow-white/15'
                        }`}
                    >
                      Book Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Add custom shimmer animation CSS if not present */}
      <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }
                .shimmer {
                    animation: shimmer 2s infinite linear;
                    background: linear-gradient(
                        to right,
                        ${isLight ? '#f0f0f0' : '#1a1a1a'} 4%,
                        ${isLight ? '#e0e0e0' : '#2a2a2a'} 25%,
                        ${isLight ? '#f0f0f0' : '#1a1a1a'} 36%
                    );
                    background-size: 1000px 100%;
                }
            `}</style>
    </section>
  );
}