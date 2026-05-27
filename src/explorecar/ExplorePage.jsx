
'use client';

import Image from "next/image";
import { PiSeatBold, PiEngine } from "react-icons/pi";
import { IoSpeedometerOutline } from "react-icons/io5";
import FleetSearchBar from './SearchForCars';
import carsData from '@/lib/data';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

// Shimmering Card Skeleton Component for Listing
const CardSkeleton = () => (
  <div className="overflow-hidden rounded-[28px] border border-zinc-800 bg-[#0a0a0a] p-5 shadow-2xl">
    {/* Image Placeholder */}
    <div className="relative h-60 w-full rounded-[20px] shimmer mb-6" />
    
    {/* Content Placeholder */}
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-4 w-16 rounded-md shimmer" />
          <div className="h-7 w-44 rounded-lg shimmer" />
        </div>
        <div className="text-right space-y-1">
          <div className="h-7 w-16 rounded-lg shimmer" />
          <div className="h-4 w-10 rounded-md shimmer ml-auto" />
        </div>
      </div>
      
      {/* Specs Pill Placeholder */}
      <div className="flex gap-4 mt-6">
        <div className="h-5 w-16 rounded shimmer" />
        <div className="h-5 w-16 rounded shimmer" />
        <div className="h-5 w-16 rounded shimmer" />
      </div>
      
      {/* Button Placeholder */}
      <div className="h-14 w-full rounded-xl shimmer mt-8" />
    </div>
  </div>
);

const ExplorePage = ({ search, setSearch }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await carsData({ search });
          setCars(data);
        } catch (error) {
          console.log(error);
          setCars([]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [search]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } }
    };

    return (
      <section className="relative w-full bg-[#050505] px-6 py-20 text-white md:px-12 lg:px-20 lg:py-28 overflow-hidden min-h-screen">
        {/* Soft glowing ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/5 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-3xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500 block mb-3">
              Explore Our Collection
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white">
              Our Elite Fleet
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full my-3" />
            <p className="text-lg leading-relaxed text-zinc-400 font-light mt-4">
              Experience the absolute zenith of precision automotive engineering. Every single vehicle in our curated 
              collection represents the pinnacle of track-bred performance and uncompromising luxury.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <FleetSearchBar search={search} setSearch={setSearch} />
          </motion.div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              /* Skeleton Grid */
              <motion.div 
                key="skeleton-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-10"
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </motion.div>
            ) : cars?.length > 0 ? (
              /* Real Cards Grid with Stagger Reveal */
              <motion.div 
                key="real-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-10"
              >
                {cars.map((car, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -8, borderColor: "rgba(249, 115, 22, 0.4)", boxShadow: "0 10px 40px rgba(249, 115, 22, 0.06)" }}
                    className="overflow-hidden rounded-[28px] border border-zinc-900 bg-[#080808] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Car Image Area */}
                      <div className="relative h-60 w-full overflow-hidden p-3 pb-0">
                        <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                          {/* Availability Badge */}
                          <div className={`absolute top-3 left-3 z-10 rounded-lg px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                            car?.availabilityStatus === "Available"
                              ? "bg-emerald-500/80 text-white border border-emerald-500/20"
                              : "bg-red-500/80 text-white border border-red-500/20"
                          }`}>
                            {car?.availabilityStatus}
                          </div>

                          <Image
                            src={car?.imageUrl}
                            alt={car?.carName || "Premium Car"}
                            fill
                            className="object-cover transition duration-700 hover:scale-105"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6">
                        {/* Top row info */}
                        <div className="mb-5 flex items-start justify-between gap-4">
                          <div>
                            <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                              {car?.carType}
                            </p>
                            <h3 className="text-2xl font-bold tracking-tight text-white transition-colors hover:text-orange-400 line-clamp-1">
                              {car?.carName}
                            </h3>
                          </div>

                          <div className="text-right">
                            <p className="text-2xl font-black text-orange-500">
                              ${car?.dailyRentPrice}
                            </p>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">/day</p>
                          </div>
                        </div>

                        {/* Specs grid */}
                        <div className="mb-6 flex gap-4 text-xs font-bold uppercase tracking-wider text-zinc-400 border-t border-zinc-900/60 pt-4">
                          <span className="flex items-center gap-1.5"><PiEngine className="text-sm text-orange-500" />976 HP</span>
                          <span className="flex items-center gap-1.5"><IoSpeedometerOutline className="text-sm text-orange-500" />200Nm</span>
                          <span className="flex items-center gap-1.5"><PiSeatBold className="text-sm text-orange-500" />{car?.seatCapacity} Seats</span>
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="p-6 pt-0">
                      <Link href={`/explore-cars/${car._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="h-14 w-full rounded-2xl bg-orange-500 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_15px_rgba(249,115,22,0.2)] hover:bg-white hover:text-black hover:shadow-[0_8px_25px_rgba(255,255,255,0.15)] transition-all duration-300"
                        >
                          View Details
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* No Search Results */
              <motion.div 
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full rounded-[28px] border border-zinc-800 bg-[#090909] p-16 text-center max-w-xl mx-auto mt-10 shadow-2xl"
              >
                <div className="h-16 w-16 rounded-full border border-orange-500/20 bg-orange-500/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold mb-2">No vehicles found</p>
                <p className="text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed">
                  We couldn't find any premium cars matching "{search}". Try searching for categories like SUV, Luxury, Sedan, or another keyword.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
};

export default ExplorePage;