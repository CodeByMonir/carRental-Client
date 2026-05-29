'use client';

import Image from "next/image";
import { PiSeatBold, PiEngine } from "react-icons/pi";
import { IoSpeedometerOutline } from "react-icons/io5";
import FleetSearchBar from './SearchForCars';
import carsData from '@/lib/data';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useTheme } from "@/providers/ThemeProvider";
import { FaStar, FaGasPump } from "react-icons/fa";

const CardSkeleton = ({ isLight }) => (
  <div className={`overflow-hidden rounded-2xl border p-5 shadow-lg transition-colors duration-300 ${isLight ? 'border-gray-200 bg-white' : 'border-zinc-800 bg-[#0a0a0a]'
    }`}>
    <div className={`relative h-60 w-full rounded-xl shimmer mb-6 ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
      }`} />
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className={`h-4 w-16 rounded-md shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
          <div className={`h-7 w-44 rounded-lg shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
        </div>
        <div className="text-right space-y-1">
          <div className={`h-7 w-16 rounded-lg shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
          <div className={`h-4 w-10 rounded-md shimmer ml-auto ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <div className={`h-5 w-16 rounded shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
        <div className={`h-5 w-16 rounded shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
        <div className={`h-5 w-16 rounded shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
      </div>
      <div className={`h-14 w-full rounded-xl shimmer mt-8 ${isLight ? 'bg-gray-200' : 'bg-zinc-800'}`} />
    </div>
  </div>
);

const ExplorePage = ({ search, setSearch }) => {
  const { theme, mounted } = useTheme();
  const isLight = theme === 'light';
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

  if (!mounted) return null;

  return (
    <section className={`relative w-full px-6 py-20 md:px-12 lg:px-20 lg:py-28 overflow-hidden min-h-screen transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#050505]'
      }`}>
      <div className={`absolute top-1/4 left-1/4 w-125 h-125 rounded-full blur-[130px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/5'
        }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <span className={`text-xs font-bold uppercase tracking-[0.35em] block mb-3 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
            }`}>
            Explore Our Collection
          </span>
          <h2 className={`text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
            }`}>
            Our Premium{' '}
            <span className="bg-linear-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
              Vehicles
            </span>
          </h2>
          <div className="h-1 w-20 bg-linear-to-r from-teal-500 to-teal-400 rounded-full my-3" />
          <p className={`text-lg leading-relaxed font-light mt-4 transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
            }`}>
            Experience the absolute zenith of precision automotive engineering. Every single vehicle in our curated
            collection represents the pinnacle of track-bred performance and uncompromising luxury.
          </p>
        </div>

        <FleetSearchBar search={search} setSearch={setSearch} />

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} isLight={isLight} />
            ))}
          </div>
        ) : cars?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-10">
            {cars.map((car, index) => (
              <div
                key={index}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${isLight
                    ? 'border-gray-200 bg-white hover:border-teal-500/30 hover:shadow-teal-500/10'
                    : 'border-zinc-900 bg-[#080808] hover:border-teal-500/30 hover:shadow-teal-500/10'
                  }`}
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden p-3 pb-0">
                    <div className="relative h-full w-full overflow-hidden rounded-xl">
                      <div className={`absolute top-3 left-3 z-10 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${car?.availabilityStatus === "Available"
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                        }`}>
                        {car?.availabilityStatus}
                      </div>

                      <div className="absolute top-3 right-3 z-10 rounded-lg px-2 py-1 text-xs font-bold bg-black/50 backdrop-blur-md text-white flex items-center gap-1">
                        <FaStar className="text-yellow-500 text-xs" />
                        4.9
                      </div>

                      <Image
                        src={car?.imageUrl}
                        alt={car?.carName || "Premium Car"}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      <div className={`absolute inset-0 bg-linear-to-t pointer-events-none ${isLight
                          ? 'from-white/80 via-white/10 to-transparent'
                          : 'from-black/80 via-black/10 to-transparent'
                        }`} />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className={`mb-1 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
                          }`}>
                          {car?.carType}
                        </p>
                        <h3 className={`text-2xl font-bold tracking-tight transition-colors duration-300 line-clamp-1 ${isLight ? 'text-gray-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-400'
                          }`}>
                          {car?.carName}
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className={`text-2xl font-black transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
                          }`}>
                          ${car?.dailyRentPrice}
                        </p>
                        <p className={`text-[10px] uppercase tracking-widest font-semibold mt-0.5 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                          }`}>
                          /day
                        </p>
                      </div>
                    </div>

                    <div className={`mb-6 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider border-t pt-4 ${isLight ? 'border-gray-100 text-gray-500' : 'border-zinc-900/60 text-zinc-400'
                      }`}>
                      <span className="flex items-center gap-1.5">
                        <PiEngine className={`text-sm ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
                        976 HP
                      </span>
                      <span className="flex items-center gap-1.5">
                        <IoSpeedometerOutline className={`text-sm ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
                        200 Nm
                      </span>
                      <span className="flex items-center gap-1.5">
                        <PiSeatBold className={`text-sm ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
                        {car?.seatCapacity} Seats
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaGasPump className={`text-sm ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
                        Petrol
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link href={`/explore-cars/${car._id}`}>
                    <button
                      className={`h-12 w-full rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isLight
                          ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-500/20'
                          : 'bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/20'
                        }`}
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`rounded-2xl border p-16 text-center max-w-xl mx-auto mt-10 shadow-lg transition-colors duration-300 ${isLight
              ? 'border-gray-200 bg-white'
              : 'border-zinc-800 bg-[#090909]'
            }`}>
            <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${isLight
                ? 'border-teal-500/20 bg-teal-500/10'
                : 'border-teal-500/20 bg-teal-500/10'
              }`}>
              <svg className={`h-6 w-6 ${isLight ? 'text-teal-600' : 'text-teal-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className={`text-2xl font-bold mb-2 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
              }`}>
              No vehicles found
            </p>
            <p className={`text-sm max-w-sm mx-auto leading-relaxed transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
              }`}>
              We couldn't find any premium cars matching "{search}". Try searching for categories like SUV, Luxury, Sedan, or another keyword.
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
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
};

export default ExplorePage;