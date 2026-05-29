'use client';
import LoadingSpinner from "@/components/Loading";
import { carDetails } from "@/lib/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

import {
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaUserCircle,
  FaStar,
  FaGasPump,
  FaCrown,
} from "react-icons/fa";
import { Button } from "@heroui/react";
import BookingModal from "@/components/BookingBtn";
import { authClient } from "@/lib/auth-client";

export default function CarDetailsPage() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";
  const [isLoading, setIsLoading] = useState(true);
  const [car, setCarDetails] = useState([]);
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData.token;
        console.log(token);
        const data = await carDetails({ id: Id, token });
        setCarDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [Id]);

  if (!mounted) return null;

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className={`relative min-h-screen w-full px-4 py-12 sm:px-6 md:px-10 lg:px-20 lg:py-24 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#050505]'
          }`}>

          <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/5'
            }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-purple-500/10' : 'bg-purple-500/5'
            }`} />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`overflow-hidden rounded-2xl border p-4 shadow-xl transition-colors duration-300 ${isLight
                  ? 'border-gray-200 bg-white'
                  : 'border-zinc-900 bg-zinc-950/60'
                }`}
            >
              <div className="relative h-80 overflow-hidden rounded-xl sm:h-120 lg:h-162.5">
                <Image
                  src={car?.imageUrl || '/images/placeholder.jpg'}
                  alt={car?.carName || 'Car Image'}
                  fill
                  priority
                  className="object-cover transition duration-1000 hover:scale-105"
                  unoptimized
                />
                
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-white">
                  <FaStar className="text-yellow-500 text-xs" />
                  4.9
                </div>
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-t pointer-events-none ${isLight
                    ? 'from-white/60 via-transparent to-transparent'
                    : 'from-black/60 via-transparent to-transparent'
                  }`} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className={`flex flex-col justify-between rounded-2xl border p-6 shadow-xl transition-colors duration-300 sm:p-8 lg:p-10 ${isLight
                  ? 'border-gray-200 bg-white'
                  : 'border-zinc-900 bg-[#080808]/90'
                }`}
            >
              <div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={`rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isLight
                      ? 'bg-teal-100 border-teal-200 text-teal-700'
                      : 'bg-teal-500/10 border-teal-500/20 text-teal-400'
                    }`}>
                    {car.carType}
                  </span>
                  {car.bookingCount > 50 && (
                    <span className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${isLight
                        ? 'bg-amber-100 border-amber-200 text-amber-700'
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}>
                      <FaCrown className="text-xs" />
                      Popular
                    </span>
                  )}
                </div>

                <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl line-clamp-2 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                  {car.carName || 'Car Name'}
                </h1>

                <div className={`mt-6 flex items-baseline gap-2 pb-6 border-b transition-colors duration-300 ${isLight ? 'border-gray-200' : 'border-zinc-900'
                  }`}>
                  <span className={`text-4xl font-black sm:text-5xl transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-400'
                    }`}>
                    ${car.dailyRentPrice}
                  </span>
                  <span className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                    }`}>
                    / day
                  </span>
                </div>

                <p className={`mt-6 text-base leading-relaxed font-light transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  {car.description}
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className={`flex items-center gap-4 rounded-xl border p-4 hover:scale-[1.02] transition-colors duration-300 ${isLight
                      ? 'border-gray-200 bg-gray-50 hover:border-teal-500/30'
                      : 'border-zinc-900 bg-zinc-950/80 hover:border-teal-500/20'
                    }`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${isLight ? 'bg-teal-100 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                      }`}>
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <p className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                        }`}>
                        Popularity
                      </p>
                      <p className={`text-sm font-bold mt-0.5 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                        }`}>
                        Booked by {car.bookedUserCount || 128}+ users
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 rounded-xl border p-4 hover:scale-[1.02] transition-colors duration-300 ${isLight
                      ? 'border-gray-200 bg-gray-50 hover:border-teal-500/30'
                      : 'border-zinc-900 bg-zinc-950/80 hover:border-teal-500/20'
                    }`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${isLight ? 'bg-teal-100 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                      }`}>
                      <FaUsers />
                    </div>
                    <div>
                      <p className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                        }`}>
                        Capacity
                      </p>
                      <p className={`text-sm font-bold mt-0.5 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                        }`}>
                        {car.seatCapacity} Seats
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 rounded-xl border p-4 hover:scale-[1.02] transition-colors duration-300 ${isLight
                      ? 'border-gray-200 bg-gray-50 hover:border-teal-500/30'
                      : 'border-zinc-900 bg-zinc-950/80 hover:border-teal-500/20'
                    }`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${isLight ? 'bg-teal-100 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                      }`}>
                      <FaGasPump />
                    </div>
                    <div>
                      <p className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                        }`}>
                        Fuel Type
                      </p>
                      <p className={`text-sm font-bold mt-0.5 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                        }`}>
                        {car.fuelType || "Premium Petrol"}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-4 rounded-xl border p-4 hover:scale-[1.02] transition-colors duration-300 ${isLight
                      ? 'border-gray-200 bg-gray-50 hover:border-teal-500/30'
                      : 'border-zinc-900 bg-zinc-950/80 hover:border-teal-500/20'
                    }`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${isLight ? 'bg-teal-100 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                      }`}>
                      <FaCrown />
                    </div>
                    <div>
                      <p className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                        }`}>
                        Transmission
                      </p>
                      <p className={`text-sm font-bold mt-0.5 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                        }`}>
                        {car.transmission || "Automatic"}
                      </p>
                    </div>
                  </div>

                  <div className={`sm:col-span-2 flex items-center gap-4 rounded-xl border p-4 hover:scale-[1.02] transition-colors duration-300 ${isLight
                      ? 'border-gray-200 bg-gray-50 hover:border-teal-500/30'
                      : 'border-zinc-900 bg-zinc-950/80 hover:border-teal-500/20'
                    }`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${isLight ? 'bg-teal-100 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                      }`}>
                      <FaMapMarkerAlt />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                        }`}>
                        Pickup Location
                      </p>
                      <p className={`text-sm font-bold mt-0.5 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                        }`}>
                        {car.pickupLocation}
                      </p>
                    </div>
                  </div>

                  <div className={`sm:col-span-2 flex items-center gap-4 rounded-xl border p-4 hover:scale-[1.02] transition-colors duration-300 ${isLight
                      ? 'border-gray-200 bg-gray-50 hover:border-teal-500/30'
                      : 'border-zinc-900 bg-zinc-950/80 hover:border-teal-500/20'
                    }`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${isLight ? 'bg-teal-100 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                      }`}>
                      <FaUserCircle />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                        }`}>
                        Fleet Owner
                      </p>
                      <p className={`text-sm font-bold mt-0.5 truncate transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                        }`} title={`${car.userName} (${car.userEmail})`}>
                        {car.userName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`mt-8 rounded-xl border p-6 flex justify-between items-center transition-colors duration-300 ${isLight
                    ? 'border-gray-200 bg-linear-to-r from-gray-50 to-white'
                    : 'border-zinc-900 bg-linear-to-r from-[#0d0d0d] to-[#040404]'
                  }`}>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.35em] transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                      }`}>
                      Availability
                    </span>
                    <h3 className={`text-2xl font-black mt-1 ${car.availabilityStatus === "Available"
                        ? "text-teal-500"
                        : "text-rose-500"
                      }`}>
                      {car.availabilityStatus}
                    </h3>
                  </div>
                  <div className={`h-3 w-3 rounded-full animate-pulse ${car.availabilityStatus === "Available"
                      ? "bg-teal-500 shadow-[0_0_12px_rgba(13,148,136,0.8)]"
                      : "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
                    }`} />
                </div>
              </div>

              <div className="mt-8">
                {car.availabilityStatus === "Available" ? (
                  <BookingModal car={car} />
                ) : (
                  <Button disabled className={`w-full rounded-xl py-4 text-sm font-bold uppercase tracking-wider cursor-not-allowed transition-colors duration-300 ${isLight
                      ? 'bg-rose-100 text-rose-600 border border-rose-200'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                    Sorry, This Car Is Not Available
                  </Button>
                )}
              </div>
            </motion.div>

          </div>
        </section>
      )}
    </>
  );
}