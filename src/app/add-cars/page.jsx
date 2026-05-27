
"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const carTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Electric",
  "Van",
];

const availabilityOptions = [
  "Available",
  "Unavailable",
];

export default function AddCarForm() {
  const { data, isLoading } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const userId = data?.user.id;
    const userName = data?.user.name;
    const userEmail = data?.user.email;
    const bookedUserCount = 0;
    const carLocation = formData.pickupLocation;
    
    const fullData = {
      ...formData,
      userId,
      userName,
      userEmail,
      bookedUserCount,
      carLocation,
    }
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData.token;
     
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(fullData),
      });

      const data = await res.json();

      if (data) {
        toast.success("Congratulations! You have Successfully Added Your Car", {
          actionProps: {
            children: "Success",
            className: "bg-success text-success-foreground",
          },
          description: "Checking your car in your Explore Section",
        })
      }

      setTimeout(() => { router.push("/explore-cars"); }, 1000);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#050505] px-6 py-20 md:px-12 lg:px-20 overflow-hidden">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-4xl relative z-10"
      >
        {/* Form Container Card */}
        <div className="rounded-[36px] border border-zinc-900 bg-gradient-to-b from-zinc-950 to-black p-8 shadow-3xl md:p-12">
          {/* Header */}
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500 block mb-2">
              Fleet Expansion
            </span>

            <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Add a New Vehicle
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full my-3" />

            <p className="mt-4 text-base leading-relaxed text-zinc-400 font-light">
              Expand our elite luxury fleet inventory. Fill in the technical specifications, category details, pricing metrics, and location criteria below.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Grid for compact fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Car Name */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Car Name
                </label>
                <input
                  required
                  type="text"
                  name="carName"
                  placeholder="e.g. Porsche 911 GT3 RS"
                  className="h-14 w-full rounded-xl border border-zinc-900 bg-[#0d0d0d] px-5 text-white outline-none transition duration-200 placeholder:text-zinc-600 focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                />
              </div>

              {/* Daily Rent Price */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Daily Rent Price ($)
                </label>
                <input
                  required
                  type="number"
                  name="dailyRentPrice"
                  placeholder="e.g. 450"
                  className="h-14 w-full rounded-xl border border-zinc-900 bg-[#0d0d0d] px-5 text-white outline-none transition duration-200 placeholder:text-zinc-600 focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Car Type */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Car Type / Category
                </label>
                <div className="relative">
                  <select
                    name="carType"
                    className="h-14 w-full appearance-none rounded-xl border border-zinc-900 bg-[#0d0d0d] px-5 text-white outline-none transition duration-200 focus:border-orange-500/50"
                  >
                    {carTypes.map((type) => (
                      <option key={type} value={type} className="bg-zinc-950 text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">▼</div>
                </div>
              </div>

              {/* Seat Capacity */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Seat Capacity
                </label>
                <input
                  required
                  type="number"
                  name="seatCapacity"
                  placeholder="e.g. 2"
                  className="h-14 w-full rounded-xl border border-zinc-900 bg-[#0d0d0d] px-5 text-white outline-none transition duration-200 placeholder:text-zinc-600 focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Vehicle Image URL
              </label>
              <input
                required
                type="text"
                name="imageUrl"
                placeholder="Paste high-resolution image link"
                className="h-14 w-full rounded-xl border border-zinc-900 bg-[#0d0d0d] px-5 text-white outline-none transition duration-200 placeholder:text-zinc-600 focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Location */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Pickup Location / City
                </label>
                <input
                  required
                  type="text"
                  name="pickupLocation"
                  placeholder="e.g. Beverly Hills, CA"
                  className="h-14 w-full rounded-xl border border-zinc-900 bg-[#0d0d0d] px-5 text-white outline-none transition duration-200 placeholder:text-zinc-600 focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                />
              </div>

              {/* Availability Status */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Initial Availability Status
                </label>
                <div className="relative">
                  <select
                    name="availabilityStatus"
                    className="h-14 w-full appearance-none rounded-xl border border-zinc-900 bg-[#0d0d0d] px-5 text-white outline-none transition duration-200 focus:border-orange-500/50"
                  >
                    {availabilityOptions.map((status) => (
                      <option key={status} value={status} className="bg-zinc-950 text-white">
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">▼</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Detailed Vehicle Description
              </label>
              <textarea
                required
                rows={4}
                name="description"
                placeholder="Describe performance parameters, key technical specifications, and general conditions..."
                className="w-full rounded-xl border border-zinc-900 bg-[#0d0d0d] px-5 py-4 text-white outline-none transition duration-200 placeholder:text-zinc-600 focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="mt-6 h-15 w-full rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_15px_rgba(249,115,22,0.25)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.4)] transition-all duration-300 cursor-pointer"
            >
              Add Car to Showroom
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
