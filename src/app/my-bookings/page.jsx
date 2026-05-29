'use client';

import Image from "next/image";
import { MapPin, Calendar } from "@gravity-ui/icons";
import { getBookings } from "@/lib/data";
import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { FaCar, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const BookingRowSkeleton = ({ isLight }) => (
  <div className={`flex flex-col gap-6 rounded-2xl border p-5 shadow-lg md:flex-row md:items-center md:justify-between transition-colors duration-300 ${isLight ? 'border-gray-200 bg-white' : 'border-zinc-900 bg-[#0a0a0a]'
    }`}>
    <div className="flex flex-col gap-5 md:flex-row md:items-center w-full">
      <div className={`relative h-30 w-full rounded-xl shimmer md:w-55 ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
        }`} />
      <div className="flex-1 space-y-3">
        <div className={`h-7 w-48 rounded-lg shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
          }`} />
        <div className="space-y-2 mt-2">
          <div className={`h-4 w-32 rounded shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
            }`} />
          <div className={`h-4 w-40 rounded shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
            }`} />
        </div>
      </div>
    </div>
    <div className={`h-14 w-28 rounded-xl shimmer md:self-center self-end ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
      }`} />
  </div>
);

export default function MyBookingsPage() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";
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

  if (!mounted) return null;

  return (
    <section className={`relative min-h-screen w-full px-6 py-20 md:px-12 lg:px-20 lg:py-28 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#050505]'
      }`}>

      <div className={`absolute top-1/4 left-1/4 w-100 h-100 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/5'
        }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`} />

      <div className="relative z-10 mx-auto max-w-6xl">
        
        <div className="mb-12">
          <span className={`text-xs font-bold uppercase tracking-[0.35em] block mb-3 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
            }`}>
            My Reservations
          </span>
          <h1 className={`text-4xl font-extrabold tracking-tight md:text-5xl transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
            }`}>
            My Bookings
          </h1>
          <div className="h-1 w-20 bg-linear-to-r from-teal-500 to-teal-400 rounded-full my-3" />
          <p className={`text-base mt-2 transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-gray-400'
            }`}>
            Manage and track your premium vehicle reservations
          </p>
        </div>

        {loading || useSessionLoading ? (
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <BookingRowSkeleton key={index} isLight={isLight} />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          
          <div className={`rounded-2xl border p-12 text-center max-w-lg mx-auto transition-colors duration-300 ${isLight
              ? 'border-gray-200 bg-white'
              : 'border-zinc-900 bg-[#080808]'
            }`}>
            <div className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-5 transition-colors duration-300 ${isLight
                ? 'border-teal-500/20 bg-teal-500/10'
                : 'border-teal-500/20 bg-teal-500/10'
              }`}>
              <FaCar className={`h-6 w-6 ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
            </div>
            <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
              }`}>
              No Active Bookings
            </h2>
            <p className={`text-sm max-w-sm mx-auto leading-relaxed mb-6 transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-gray-500'
              }`}>
              You haven't reserved any premium vehicles yet. Browse our exclusive fleet to schedule your first ride.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className={`flex flex-col gap-5 rounded-2xl border p-5 shadow-md transition-all duration-300 hover:shadow-lg md:flex-row md:items-center md:justify-between ${isLight
                    ? 'border-gray-200 bg-white hover:shadow-gray-300'
                    : 'border-zinc-900 bg-[#080808] hover:shadow-zinc-800'
                  }`}
              >
                
                <div className="flex flex-col gap-4 md:flex-row md:items-center flex-1">
                  <div className="relative h-25 w-full overflow-hidden rounded-xl md:w-45">
                    <Image
                      src={booking.imageUrl}
                      alt={booking.carName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-xl font-bold tracking-tight mb-2 line-clamp-1 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                      }`}>
                      {booking.carName}
                    </h3>

                    <div className="space-y-1.5">
                      
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className={`h-3.5 w-3.5 ${isLight ? 'text-teal-600' : 'text-teal-500'
                          }`} />
                        <span className={`text-sm transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                          {booking.pickupLocation}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaClock className={`h-3.5 w-3.5 ${isLight ? 'text-teal-600' : 'text-teal-500'
                          }`} />
                        <span className={`text-sm transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                          {booking.currentDate} at {booking.currentTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end">
                  <div className={`rounded-xl border px-5 py-3 transition-colors duration-300 ${isLight
                      ? 'border-teal-500/20 bg-teal-500/5'
                      : 'border-teal-500/20 bg-teal-500/5'
                    }`}>
                    <div className="flex items-baseline gap-0.5">
                      <span className={`text-2xl font-black tracking-tight ${isLight ? 'text-teal-600' : 'text-teal-400'
                        }`}>
                        ${booking.dailyPrice}
                      </span>
                      <span className={`text-xs transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                        /day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
}