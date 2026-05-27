'use client'
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { deleteCar } from "@/lib/data";
import { useRouter } from "next/navigation";
import UpdateCarModal from "@/components/UpdateBtn";
import { useTheme } from "@/providers/ThemeProvider";
import { FaCar, FaEdit, FaTrash, FaPlus, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

// Shimmering Row Skeleton Component for Listings
const ListingRowSkeleton = ({ isLight }) => (
  <div className={`flex flex-col gap-6 rounded-2xl border p-5 shadow-md transition-colors duration-300 md:flex-row md:items-center md:justify-between ${isLight ? 'border-gray-200 bg-white' : 'border-zinc-900 bg-[#0a0a0a]'
    }`}>
    <div className="flex flex-col gap-5 md:flex-row md:items-center w-full">
      <div className={`relative h-[130px] w-full rounded-xl shimmer md:w-[220px] ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
        }`} />
      <div className="flex-1 space-y-3">
        <div className={`h-7 w-48 rounded-lg shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
          }`} />
        <div className="space-y-2 mt-2">
          <div className={`h-4 w-56 rounded shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
            }`} />
          <div className={`h-4 w-24 rounded shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
            }`} />
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3 self-end md:self-center">
      <div className={`h-10 w-20 rounded-xl shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
        }`} />
      <div className={`h-10 w-20 rounded-xl shimmer ${isLight ? 'bg-gray-200' : 'bg-zinc-800'
        }`} />
    </div>
  </div>
);

export default function MyListingsPage() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data, isPending } = useSession();
  const userId = data?.user?.id;

  useEffect(() => {
    const fetchAddedListings = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData.token;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/added-cars/${userId}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        const cars = await res.json();
        setListings(cars || []);
      } catch (error) {
        console.log(error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAddedListings();
  }, [userId]);

  const handleDelete = async (_id) => {
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData.token;
      const res = await deleteCar({ _id, token });
      if (res) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!mounted) return null;

  return (
    <section className={`relative min-h-screen w-full px-4 py-16 sm:px-6 md:px-10 lg:px-20 lg:py-24 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#050505]'
      }`}>
      {/* Soft ambient backlights */}
      <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/5'
        }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className={`text-xs font-bold uppercase tracking-[0.35em] block mb-3 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
              }`}>
              Showroom Control
            </span>
            <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
              }`}>
              My Listings
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full my-3" />
            <p className={`mt-4 max-w-2xl text-base leading-relaxed font-light transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
              }`}>
              Manage your premium car fleet, update pricing, customize specifications, and control vehicle availability from one unified cockpit dashboard.
            </p>
          </div>

          {/* Add Car Button */}
          <Link href="/add-cars">
            <button className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isLight
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-500/25'
                : 'bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/25'
              }`}>
              <FaPlus size={14} />
              Add Car
            </button>
          </Link>
        </div>

        {/* Listings Stack */}
        {loading || isPending ? (
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <ListingRowSkeleton key={index} isLight={isLight} />
            ))}
          </div>
        ) : listings.length === 0 ? (
          /* Empty state */
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
              No Listings Found
            </h2>
            <p className={`text-sm max-w-sm mx-auto leading-relaxed mb-6 transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
              }`}>
              You haven't listed any of your luxury vehicles for renting yet. Tap "Add Car" to expand the collection.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {listings.map((car, index) => (
              <div
                key={index}
                className={`flex flex-col gap-5 rounded-2xl border p-5 shadow-md transition-all duration-300 hover:shadow-lg md:flex-row md:items-center md:justify-between ${isLight
                    ? 'border-gray-200 bg-white hover:shadow-gray-300'
                    : 'border-zinc-900 bg-[#080808] hover:shadow-zinc-800'
                  }`}
              >
                {/* Left content */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center flex-1">
                  {/* Image */}
                  <div className="relative h-[110px] w-full overflow-hidden rounded-xl md:w-[180px]">
                    <Image
                      src={car.imageUrl}
                      alt={car.carName}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Info text */}
                  <div className="flex-1">
                    <h2 className={`text-xl font-bold tracking-tight mb-2 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                      }`}>
                      {car.carName}
                    </h2>

                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-300 ${isLight ? 'bg-gray-100 text-gray-700' : 'bg-zinc-900 text-zinc-300'
                        }`}>
                        {car.carType}
                      </span>
                      <span className={isLight ? 'text-gray-400' : 'text-zinc-600'}>•</span>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className={`text-xs ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
                        <span className={isLight ? 'text-gray-600' : 'text-zinc-400'}>
                          {car.pickupLocation}
                        </span>
                      </div>
                      <span className={isLight ? 'text-gray-400' : 'text-zinc-600'}>•</span>
                      <div className="flex items-center gap-1">
                        <FaDollarSign className={`text-xs ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
                        <span className={`font-bold ${isLight ? 'text-teal-600' : 'text-teal-400'}`}>
                          ${car.dailyRentPrice}
                        </span>
                        <span className={isLight ? 'text-gray-500' : 'text-zinc-500'}>/day</span>
                      </div>
                    </div>

                    {/* Availability Status */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${car.availabilityStatus === "Available" ? "bg-teal-500" : "bg-rose-500"
                        }`} />
                      <span className={`text-xs font-semibold uppercase tracking-wider ${car.availabilityStatus === "Available"
                          ? (isLight ? 'text-teal-600' : 'text-teal-400')
                          : (isLight ? 'text-rose-600' : 'text-rose-400')
                        }`}>
                        {car.availabilityStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons group */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  {/* Edit Modal Button */}
                  <UpdateCarModal car={car} />

                  {/* Delete Alert Dialog */}
                  <AlertDialog>
                    <Button className={`rounded-xl font-semibold text-xs px-4 py-2.5 h-10 transition-all duration-300 ${isLight
                        ? 'bg-red-100 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white'
                        : 'bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white'
                      }`}>
                      <FaTrash className="mr-1.5 text-xs" />
                      Delete
                    </Button>
                    <AlertDialog.Backdrop>
                      <AlertDialog.Container>
                        <AlertDialog.Dialog className={`sm:max-w-[400px] rounded-2xl p-6 shadow-2xl transition-colors duration-300 ${isLight ? 'bg-white border border-gray-200' : 'bg-zinc-950 border border-zinc-900'
                          }`}>
                          <AlertDialog.CloseTrigger />
                          <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading className={`text-xl font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-white'
                              }`}>
                              Delete Vehicle Listing?
                            </AlertDialog.Heading>
                          </AlertDialog.Header>
                          <AlertDialog.Body className="mt-3">
                            <p className={`text-sm leading-relaxed transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                              }`}>
                              This will permanently remove <strong className={isLight ? 'text-gray-900' : 'text-white'}>{car.carName}</strong> from our active showroom inventory. This action is irreversible.
                            </p>
                          </AlertDialog.Body>
                          <AlertDialog.Footer className="mt-6 flex justify-end gap-3">
                            <Button slot="close" variant="tertiary" className={`rounded-lg font-semibold px-4 py-2 text-xs transition-colors ${isLight
                                ? 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                : 'border border-zinc-800 bg-white/5 text-white hover:bg-white/10'
                              }`}>
                              Cancel
                            </Button>
                            <Button slot="close" variant="danger" onClick={() => handleDelete(car._id)} className={`rounded-lg font-bold px-4 py-2 text-xs transition-colors ${isLight
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-red-600 text-white hover:bg-red-700'
                              }`}>
                              Delete Listing
                            </Button>
                          </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                      </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add shimmer animation styles */}
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