"use client";

import { Magnifier } from "@gravity-ui/icons";

const categories = [
  "All",
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Electric",
  "Van",
];

export default function FleetSearchBar({ search, setSearch }) {


  

  return (
    <section className="w-full bg-black px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Search Container */}
        <div className="flex flex-col gap-4 rounded-[36px] border border-zinc-800 bg-[#121212] p-4 shadow-[0_0_60px_rgba(255,140,0,0.04)] lg:flex-row lg:items-center">
          {/* Search Input */}
         
          <div className="relative flex-1">
            <Magnifier className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              placeholder="Search by car name"
             
              onChange={(e) => setSearch(e.target.value)}
              className="h-16 w-full rounded-full border border-zinc-800 bg-zinc-900 pl-14 pr-6 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-500/50"
            />
          </div>

          {/* Select */}
          
          <div className="relative w-full lg:w-[220px]">
            <select
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-16 w-full appearance-none rounded-2xl border border-zinc-800 bg-zinc-900 px-5 text-lg font-medium text-white outline-none transition focus:border-orange-500/50"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-zinc-800 text-white"
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Dropdown Arrow */}
            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400">
              ▼
            </div>
          </div>

          {/* Search Button */}
          <button className="h-16 rounded-2xl bg-orange-500 px-8 text-lg font-medium text-white transition hover:bg-orange-600">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
