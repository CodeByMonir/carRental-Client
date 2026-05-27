'use client';
import LoadingSpinner from "@/components/Loading";
import { carDetails } from "@/lib/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Envelope } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import BookingModal from "@/components/BookingBtn";
import { authClient } from "@/lib/auth-client";

export default function CarDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [car, setCarDetails] = useState([]);
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const {data:tokenData} = await authClient.token();
        const token = tokenData.token;
        const data = await carDetails({ id: Id, token });
        setCarDetails(data);
        console.log("Fetched Car Details:", data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [Id]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="relative min-h-screen w-full bg-[#050505] px-4 py-12 text-white sm:px-6 md:px-10 lg:px-20 lg:py-24 overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/5 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            
            {/* Left Side: Stunning Large Image Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="overflow-hidden rounded-[36px] border border-zinc-900 bg-zinc-950/60 p-4 shadow-[0_0_80px_rgba(255,115,0,0.04)]"
            >
              <div className="relative h-[320px] overflow-hidden rounded-[28px] sm:h-[480px] lg:h-[650px]">
                <Image
                  src={car.imageUrl}
                  alt={car.carName}
                  fill
                  priority
                  className="object-cover transition duration-1000 hover:scale-105"
                  unoptimized
                />
                {/* Visual Glassmorphic Border Highlight inside image */}
                <div className="absolute inset-0 rounded-[28px] border border-white/5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Side: Premium Showroom Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="flex flex-col justify-between rounded-[36px] border border-zinc-900 bg-[#080808]/90 p-6 shadow-2xl sm:p-8 lg:p-10"
            >
              <div>
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-orange-400">
                    {car.carType}
                  </span>
                </div>

                {/* Name */}
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl line-clamp-2">
                  {car.carName}
                </h1>

                {/* Pricing Block */}
                <div className="mt-6 flex items-baseline gap-2 border-b border-zinc-900 pb-6">
                  <span className="text-4xl font-black text-orange-400 sm:text-5xl">
                    ${car.dailyRentPrice}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                    / day
                  </span>
                </div>

                {/* Description */}
                <p className="mt-6 text-base leading-relaxed text-zinc-400 font-light">
                  {car.description}
                </p>

                {/* High-Tech Spec Instruments Panel */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Booked user count */}
                  <div className="flex items-center gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/80 px-4 py-4.5 transition-all hover:border-orange-500/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Popularity</p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        Booked by {car.bookedUserCount} users
                      </p>
                    </div>
                  </div>

                  {/* Seat count */}
                  <div className="flex items-center gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/80 px-4 py-4.5 transition-all hover:border-orange-500/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <FaUsers />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Capacity</p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {car.seatCapacity} Seats Included
                      </p>
                    </div>
                  </div>

                  {/* Location spec */}
                  <div className="flex items-center gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/80 px-4 py-4.5 transition-all hover:border-orange-500/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Pickup Location</p>
                      <p className="text-sm font-bold text-white mt-0.5 truncate max-w-[200px]">
                        {car.pickupLocation}
                      </p>
                    </div>
                  </div>

                  {/* Owner details */}
                  <div className="flex items-center gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/80 px-4 py-4.5 transition-all hover:border-orange-500/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <FaUserCircle />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Fleet Owner</p>
                      <p className="text-sm font-bold text-white mt-0.5 truncate max-w-[200px]" title={`${car.userName} (${car.userEmail})`}>
                        {car.userName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operational Status Display */}
                <div className="mt-8 rounded-3xl border border-zinc-900 bg-gradient-to-r from-[#0d0d0d] to-[#040404] p-6 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">Availability</span>
                    <h3 className={`text-2xl font-black mt-1 ${
                      car.availabilityStatus === "Available" ? "text-emerald-400" : "text-rose-400"
                    }`}>
                      {car.availabilityStatus}
                    </h3>
                  </div>
                  <div className={`h-3 w-3 rounded-full animate-pulse ${
                    car.availabilityStatus === "Available" ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" : "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.8)]"
                  }`} />
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="mt-8">
                {car.availabilityStatus === "Available" ? (
                  <BookingModal car={car} />
                ) : (
                  <Button disabled className="bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold rounded-full w-full py-4.5 uppercase tracking-wider text-sm cursor-not-allowed">
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

