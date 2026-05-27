'use client'
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { deleteCar } from "@/lib/data";
import { useRouter } from "next/navigation";
import UpdateCarModal from "@/components/UpdateBtn";
import { motion, AnimatePresence } from "framer-motion";

// Shimmering Row Skeleton Component for Listings
const ListingRowSkeleton = () => (
  <div className="flex flex-col gap-6 rounded-[28px] border border-zinc-900 bg-[#0a0a0a] p-5 shadow-2xl md:flex-row md:items-center md:justify-between">
    <div className="flex flex-col gap-5 md:flex-row md:items-center w-full">
      {/* Car Image Placeholder */}
      <div className="relative h-[130px] w-full rounded-[20px] shimmer md:w-[220px]" />
      
      {/* Details Placeholder */}
      <div className="flex-1 space-y-3">
        <div className="h-7 w-48 rounded-lg shimmer" />
        <div className="space-y-2 mt-2">
          <div className="h-4 w-56 rounded shimmer" />
          <div className="h-4 w-24 rounded shimmer" />
        </div>
      </div>
    </div>
    {/* Buttons Placeholder */}
    <div className="flex items-center gap-3 self-end md:self-center">
      <div className="h-12 w-24 rounded-xl shimmer" />
      <div className="h-12 w-24 rounded-xl shimmer" />
    </div>
  </div>
);

export default function MyListingsPage() {
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
    <section className="relative min-h-screen w-full bg-[#050505] px-4 py-16 text-white sm:px-6 md:px-10 lg:px-20 lg:py-24 overflow-hidden">
      {/* Soft ambient backlights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500 block mb-3">
              Showroom Control
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              My Listings
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full my-3" />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 font-light">
              Manage your premium car fleet, update pricing, customize specifications, and control vehicle availability from one unified cockpit dashboard.
            </p>
          </motion.div>

          {/* Add Car Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/add-cars">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="h-14 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-8 text-base font-bold uppercase tracking-wider text-white shadow-[0_5px_15px_rgba(249,115,22,0.25)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.4)] transition-all duration-300"
              >
                Add Car
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Listings Stack */}
        <AnimatePresence mode="wait">
          {loading || isPending ? (
            /* Loading list */
            <motion.div 
              key="loading-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <ListingRowSkeleton key={index} />
              ))}
            </motion.div>
          ) : listings.length === 0 ? (
            /* Elegant empty state */
            <motion.div 
              key="empty-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-[30px] border border-zinc-900 bg-[#080808] p-16 text-center max-w-xl mx-auto shadow-2xl"
            >
              <div className="h-16 w-16 rounded-full border border-orange-500/20 bg-orange-500/10 flex items-center justify-center mx-auto mb-6">
                <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">No listings found</h2>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed mb-6">
                You haven't listed any of your luxury vehicles for renting yet. Tap "Add Car" to expand the collection.
              </p>
            </motion.div>
          ) : (
            /* Staggered animated rows */
            <motion.div 
              key="listings-list"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {listings.map((car, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4, borderColor: "rgba(249, 115, 22, 0.35)", boxShadow: "0 10px 30px rgba(249, 115, 22, 0.05)" }}
                  className="flex flex-col gap-6 rounded-[28px] border border-zinc-900 bg-[#080808] p-5 shadow-2xl transition-all duration-300 md:flex-row md:items-center md:justify-between"
                >
                  {/* Left content */}
                  <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    {/* Image with hover scale */}
                    <div className="relative h-[130px] w-full overflow-hidden rounded-[20px] md:w-[220px]">
                      <Image
                        src={car.imageUrl}
                        alt={car.carName}
                        fill
                        className="object-cover transition duration-700 hover:scale-105"
                        unoptimized
                      />
                    </div>

                    {/* Info text */}
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
                        {car.carName}
                      </h2>

                      <p className="text-sm font-light text-zinc-400 flex flex-wrap gap-2 items-center">
                        <span className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-300 border border-zinc-800/80">{car.carType}</span>
                        <span>•</span>
                        <span>{car.pickupLocation}</span>
                        <span>•</span>
                        <span className="text-orange-400 font-bold">${car.dailyRentPrice} / day</span>
                      </p>

                      <div className="mt-3 flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${
                          car.availabilityStatus === "Available" ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                        }`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          car.availabilityStatus === "Available" ? "text-emerald-400" : "text-rose-400"
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

                    {/* Premium Styled Delete Alert Dialog */}
                    <AlertDialog>
                      <Button variant="danger" className="rounded-xl font-bold uppercase tracking-wider text-xs px-5 py-3 h-12 bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors duration-200">
                        Delete
                      </Button>
                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="sm:max-w-[400px] rounded-3xl bg-zinc-950 border border-zinc-900 text-white p-6 shadow-3xl">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />
                              <AlertDialog.Heading className="text-xl font-extrabold tracking-tight">Delete Vehicle listing?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body className="mt-3">
                              <p className="text-zinc-400 text-sm leading-relaxed">
                                This will permanently remove <strong>{car.carName}</strong> from our active showrooms inventory database. This action is absolute and cannot be undone.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer className="mt-6 flex justify-end gap-3">
                              <Button slot="close" variant="tertiary" className="rounded-xl font-semibold border border-zinc-800 bg-white/5 hover:bg-white/10 text-white px-5 py-2 text-xs">
                                Cancel
                              </Button>
                              <Button slot="close" variant="danger" onClick={() => handleDelete(car._id)} className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white px-5 py-2 text-xs">
                                Delete listing
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
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
