'use client';

import Image from "next/image";
import { MapPin, Calendar } from "@gravity-ui/icons";
import { getBookings } from "@/lib/data";
import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Shimmering Row Skeleton Component for bookings
const BookingRowSkeleton = () => (
  <div className="flex flex-col gap-6 rounded-[28px] border border-zinc-900 bg-[#0a0a0a] p-5 shadow-2xl md:flex-row md:items-center md:justify-between">
    <div className="flex flex-col gap-5 md:flex-row md:items-center w-full">
      {/* Car Image Placeholder */}
      <div className="relative h-[120px] w-full rounded-[20px] shimmer md:w-[220px]" />
      
      {/* Details Placeholder */}
      <div className="flex-1 space-y-3">
        <div className="h-7 w-48 rounded-lg shimmer" />
        <div className="space-y-2 mt-2">
          <div className="h-4 w-32 rounded shimmer" />
          <div className="h-4 w-40 rounded shimmer" />
        </div>
      </div>
    </div>
    {/* Price Placeholder */}
    <div className="h-14 w-28 rounded-2xl shimmer md:self-center self-end" />
  </div>
);

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data, useSessionLoading } = useSession();
  const userId = data?.user?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData.token;
        const data = await getBookings({ userId, token });
        setBookings(data || []);
      } catch (error) {
        console.log(error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [userId]);

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-6 py-20 text-white md:px-12 lg:px-20 lg:py-28 overflow-hidden">
      {/* Visual lighting glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500 block mb-3">
            Elite Reservations
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-white">
            My Bookings
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full my-3" />
        </motion.div>

        {/* Booking Cards Stack */}
        <AnimatePresence mode="wait">
          {loading || useSessionLoading ? (
            /* Loading list */
            <motion.div 
              key="loading-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <BookingRowSkeleton key={index} />
              ))}
            </motion.div>
          ) : bookings.length === 0 ? (
            /* Elegant empty state */
            <motion.div 
              key="empty-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-[30px] border border-zinc-900 bg-[#080808] p-16 text-center max-w-xl mx-auto shadow-2xl"
            >
              <div className="h-16 w-16 rounded-full border border-orange-500/20 bg-orange-500/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No active bookings</h2>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed mb-6">
                You haven't reserved any premium vehicles yet. View our outstanding fleet to schedule your first premium ride.
              </p>
            </motion.div>
          ) : (
            /* Staggered animated rows */
            <motion.div 
              key="bookings-list"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {bookings.map((booking, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4, borderColor: "rgba(249, 115, 22, 0.35)", boxShadow: "0 10px 30px rgba(249, 115, 22, 0.05)" }}
                  className="flex flex-col gap-6 rounded-[28px] border border-zinc-900 bg-[#080808] p-5 shadow-2xl transition-all duration-300 md:flex-row md:items-center md:justify-between"
                >
                  {/* Left */}
                  <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    {/* Car Image with zoom */}
                    <div className="relative h-[120px] w-full overflow-hidden rounded-[20px] md:w-[220px]">
                      <Image
                        src={booking.imageUrl}
                        alt={booking.carName}
                        fill
                        className="object-cover transition duration-700 hover:scale-105"
                        unoptimized
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <h2 className="mb-3 text-2xl font-bold tracking-tight text-white line-clamp-1">
                        {booking.carName}
                      </h2>

                      <div className="space-y-2.5">
                        {/* Location */}
                        <div className="flex items-center gap-2 text-zinc-400">
                          <MapPin className="h-4 w-4 text-orange-500/80" />
                          <span className="text-sm font-light">
                            {booking.pickupLocation}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Calendar className="h-4 w-4 text-orange-500/80" />
                          <span className="text-sm font-light">
                            {booking.currentDate} at {booking.currentTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price column with glowing container */}
                  <div className="flex items-center justify-end">
                    <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 px-6 py-4 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
                      <span className="text-3xl font-black tracking-tight text-orange-400">
                        ${booking.dailyPrice}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
