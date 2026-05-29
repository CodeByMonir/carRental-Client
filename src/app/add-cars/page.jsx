"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { FaCar, FaDollarSign, FaUsers, FaMapMarkerAlt, FaImage, FaInfoCircle } from "react-icons/fa";

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

const transmissionOptions = [
  "Automatic",
  "Manual",
];

const fuelOptions = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
];

export default function AddCarForm() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";
  const { data, isLoading } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        });
        setTimeout(() => { router.push("/explore-cars"); }, 1000);
      }
    } catch (error) {
      toast.error("Failed to add car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <section className={`relative min-h-screen w-full px-6 py-20 md:px-12 lg:px-20 lg:py-32 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#050505]'
      }`}>
      <div className={`absolute top-1/4 left-1/4 w-125 h-125 rounded-full blur-[150px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/5'
        }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-125 h-125 rounded-full blur-[150px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-purple-500/10' : 'bg-purple-500/5'
        }`} />

      <div className="mx-auto max-w-5xl relative z-10">
        
        <div className={`rounded-2xl border p-6 shadow-xl transition-colors duration-300 md:p-10 lg:p-12 ${isLight
            ? 'border-gray-200 bg-white'
            : 'border-zinc-900 bg-gradient-to-b from-zinc-950 to-black'
          }`}>
            
          <div className="mb-10">
            <span className={`text-xs font-bold uppercase tracking-[0.35em] block mb-2 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
              }`}>
              Fleet Expansion
            </span>

            <h2 className={`text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
              }`}>
              Add a New Vehicle
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full my-3" />

            <p className={`mt-4 text-base leading-relaxed font-light transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
              }`}>
              Expand our elite luxury fleet inventory. Fill in the technical specifications,
              category details, pricing metrics, and location criteria below.
            </p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div>
                <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  <FaCar className="inline mr-1.5 text-teal-500" size={12} />
                  Car Name
                </label>
                <input
                  required
                  type="text"
                  name="carName"
                  placeholder="e.g. Porsche 911 GT3 RS"
                  className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                      ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20'
                      : 'border-zinc-800 bg-[#0d0d0d] text-white placeholder:text-zinc-600 focus:border-teal-500 focus:ring-teal-500/20'
                    }`}
                />
              </div>

              <div>
                <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  <FaDollarSign className="inline mr-1.5 text-teal-500" size={12} />
                  Daily Rent Price ($)
                </label>
                <input
                  required
                  type="number"
                  name="dailyRentPrice"
                  placeholder="e.g. 450"
                  className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                      ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20'
                      : 'border-zinc-800 bg-[#0d0d0d] text-white placeholder:text-zinc-600 focus:border-teal-500 focus:ring-teal-500/20'
                    }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div>
                <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  Car Type / Category
                </label>
                <div className="relative">
                  <select
                    name="carType"
                    className={`h-12 w-full appearance-none rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                        ? 'border-gray-300 bg-gray-50 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'
                        : 'border-zinc-800 bg-[#0d0d0d] text-white focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                  >
                    {carTypes.map((type) => (
                      <option key={type} value={type} className={isLight ? 'bg-white' : 'bg-zinc-950'}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">▼</div>
                </div>
              </div>

              <div>
                <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  <FaUsers className="inline mr-1.5 text-teal-500" size={12} />
                  Seat Capacity
                </label>
                <input
                  required
                  type="number"
                  name="seatCapacity"
                  placeholder="e.g. 2"
                  className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                      ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20'
                      : 'border-zinc-800 bg-[#0d0d0d] text-white placeholder:text-zinc-600 focus:border-teal-500 focus:ring-teal-500/20'
                    }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div>
                <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  Transmission
                </label>
                <div className="relative">
                  <select
                    name="transmission"
                    className={`h-12 w-full appearance-none rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                        ? 'border-gray-300 bg-gray-50 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'
                        : 'border-zinc-800 bg-[#0d0d0d] text-white focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                    defaultValue="Automatic"
                  >
                    {transmissionOptions.map((type) => (
                      <option key={type} value={type} className={isLight ? 'bg-white' : 'bg-zinc-950'}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">▼</div>
                </div>
              </div>

              <div>
                <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  Fuel Type
                </label>
                <div className="relative">
                  <select
                    name="fuelType"
                    className={`h-12 w-full appearance-none rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                        ? 'border-gray-300 bg-gray-50 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'
                        : 'border-zinc-800 bg-[#0d0d0d] text-white focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                    defaultValue="Petrol"
                  >
                    {fuelOptions.map((type) => (
                      <option key={type} value={type} className={isLight ? 'bg-white' : 'bg-zinc-950'}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">▼</div>
                </div>
              </div>
            </div>

            <div>
              <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                }`}>
                <FaImage className="inline mr-1.5 text-teal-500" size={12} />
                Vehicle Image URL
              </label>
              <input
                required
                type="text"
                name="imageUrl"
                placeholder="Paste high-resolution image link"
                className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                    ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20'
                    : 'border-zinc-800 bg-[#0d0d0d] text-white placeholder:text-zinc-600 focus:border-teal-500 focus:ring-teal-500/20'
                  }`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  <FaMapMarkerAlt className="inline mr-1.5 text-teal-500" size={12} />
                  Pickup Location / City
                </label>
                <input
                  required
                  type="text"
                  name="pickupLocation"
                  placeholder="e.g. Beverly Hills, CA"
                  className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                      ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20'
                      : 'border-zinc-800 bg-[#0d0d0d] text-white placeholder:text-zinc-600 focus:border-teal-500 focus:ring-teal-500/20'
                    }`}
                />
              </div>

              <div>
                <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                  }`}>
                  Initial Availability Status
                </label>
                <div className="relative">
                  <select
                    name="availabilityStatus"
                    className={`h-12 w-full appearance-none rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                        ? 'border-gray-300 bg-gray-50 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'
                        : 'border-zinc-800 bg-[#0d0d0d] text-white focus:border-teal-500 focus:ring-teal-500/20'
                      }`}
                  >
                    {availabilityOptions.map((status) => (
                      <option key={status} value={status} className={isLight ? 'bg-white' : 'bg-zinc-950'}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">▼</div>
                </div>
              </div>
            </div>

            <div>
              <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                }`}>
                Brand
              </label>
              <input
                required
                type="text"
                name="brand"
                placeholder="e.g. Porsche, BMW, Tesla"
                className={`h-12 w-full rounded-lg border px-4 text-sm outline-none transition-all duration-200 focus:ring-2 ${isLight
                    ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20'
                    : 'border-zinc-800 bg-[#0d0d0d] text-white placeholder:text-zinc-600 focus:border-teal-500 focus:ring-teal-500/20'
                  }`}
              />
            </div>

            <div>
              <label className={`mb-2 block text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
                }`}>
                <FaInfoCircle className="inline mr-1.5 text-teal-500" size={12} />
                Detailed Vehicle Description
              </label>
              <textarea
                required
                rows={4}
                name="description"
                placeholder="Describe performance parameters, key technical specifications, and general conditions..."
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 resize-none ${isLight
                    ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20'
                    : 'border-zinc-800 bg-[#0d0d0d] text-white placeholder:text-zinc-600 focus:border-teal-500 focus:ring-teal-500/20'
                  }`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-8 w-full rounded-lg py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isLight
                  ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-500/25'
                  : 'bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/25'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'Adding Vehicle...' : 'Add Car to Showroom'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}