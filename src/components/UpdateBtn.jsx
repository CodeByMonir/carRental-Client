
"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export default function UpdateCarModal({ car }) {
  const [open, setOpen] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    try {
      const {data:tokenData} = await authClient.token();
            const token = tokenData.token;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update/${car._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization : `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
       if (data) {
                          toast.success("Congratulations! You have Successfully Updated Your Car Information", {
                              actionProps: {
                                  children: "Success",
                                  className: "bg-success text-success-foreground",
                              },
                              description: "Checking your car in your Explore Section",
                          })
                      }
          
                     
       setTimeout(() => { setOpen(false); }, 2000);
    } catch (error) {

      console.log(error);
      alert(error);
    }


  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-orange-500/20 bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-orange-600"
      >
        Update
      </button>

      {open && (
        <div className="fixed inset-0 mx-auto z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          {/* Modal Box */}
          <div className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-orange-500/10 bg-[#0b0b0b] p-6 text-white shadow-[0_0_80px_rgba(249,115,22,0.15)] md:p-10 mb-20">
          
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-orange-500 hover:text-orange-400"
            >
              <IoClose className="text-xl" />
            </button>


            <div className="mb-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-orange-400">
                Update Listing
              </p>

              <h2 className="text-4xl font-black tracking-tight md:text-6xl">
                Update Car
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                Owners can edit price, description, availability, image,
                category, and pickup location.
              </p>
            </div>


            <form onSubmit={handleUpdate} className="space-y-6">
              
                <div>
              <label className="mb-3 block text-sm font-semibold text-white">
                Car Name
              </label>

              <input
                defaultValue={car?.carName}
                type="text"
                name="carName"
          
                placeholder="Enter car name"
                className="h-16 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-500/50"
              />
            </div>
            
              <div>
                <label className="mb-3 block text-sm font-semibold text-white">
                  Daily Rent Price
                </label>

                <input
                  type="number"
                  name="dailyRentPrice"
                  defaultValue={car?.dailyRentPrice}
                  placeholder="Enter daily price"
                  className="h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 text-white outline-none transition focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-white">
                  Car Type
                </label>

                <select
                  name="carType"
                  defaultValue={car?.carType}
                  className="h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 text-white outline-none transition focus:border-orange-500"
                >
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Electric">Electric</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-white">
                  Image URL
                </label>

                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={car?.imageUrl}
                  placeholder="Image URL"
                  className="h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 text-white outline-none transition focus:border-orange-500"
                />
              </div>
            <div>
              <label className="mb-3 block text-sm font-semibold text-white">
                Seat Capacity
              </label>

              <input
                defaultValue={car?.seatCapacity}
                type="number"
                name="seatCapacity"
            
                placeholder="Enter seat capacity"
                className="h-16 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-500/50"
              />
            </div>
              

              <div>
                <label className="mb-3 block text-sm font-semibold text-white">
                  Pickup Location
                </label>

                <input
                  type="text"
                  name="pickupLocation"
                  defaultValue={car?.pickupLocation}
                  placeholder="Pickup Location"
                  className="h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 text-white outline-none transition focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-white">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  defaultValue={car?.description}
                  placeholder="Write something about the car..."
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white outline-none transition focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-white">
                  Availability Status
                </label>

                <select
                  name="availabilityStatus"
                  defaultValue={car?.availabilityStatus}
                  className="h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 text-white outline-none transition focus:border-orange-500"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <button
                type="submit"
                className="h-14 w-full rounded-2xl bg-orange-500 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-600"
              >
                Update Car
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

