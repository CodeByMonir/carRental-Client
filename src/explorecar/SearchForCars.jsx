"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useState } from "react";

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
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState(search || "");

  if (!mounted) return null;

  const handleSearch = () => {
    setSearch(selectedCategory === "All" && !searchText ? "" : searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setSearch("");
  };

  const clearAllFilters = () => {
    setSearchText("");
    setSearch("");
    setSelectedCategory("All");
  };

  return (
    <section className={`w-full px-6 py-8 md:px-12 lg:px-20 transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-black'
      }`}>
      <div className="mx-auto max-w-7xl">
        {/* Search Container */}
        <div className={`flex flex-col gap-4 rounded-2xl border p-5 shadow-lg transition-all duration-300 lg:flex-row lg:items-center ${isLight
            ? 'border-gray-200 bg-white shadow-gray-200'
            : 'border-zinc-800 bg-[#121212] shadow-[0_0_60px_rgba(13,148,136,0.04)]'
          }`}>

          {/* Search Input with Clear Button */}
          <div className="relative flex-1">
            <FaSearch className={`absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${isLight ? 'text-gray-400' : 'text-zinc-500'
              }`} />

            <input
              type="text"
              placeholder="Search by car name or brand..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`h-14 w-full rounded-xl border pl-12 pr-12 text-sm outline-none transition-all duration-300 focus:ring-2 ${isLight
                  ? 'border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/20'
                  : 'border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus:border-teal-500 focus:ring-teal-500/20'
                }`}
            />

            {/* Clear Text Button - X */}
            {searchText && (
              <button
                onClick={clearSearch}
                className={`absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${isLight
                    ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
                  }`}
                aria-label="Clear search"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>

          {/* Category Select */}
          <div className="relative w-full lg:w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`h-14 w-full appearance-none rounded-xl border px-5 pr-10 text-sm font-medium outline-none transition-all duration-300 focus:ring-2 ${isLight
                  ? 'border-gray-200 bg-gray-50 text-gray-900 focus:border-teal-500 focus:ring-teal-500/20'
                  : 'border-zinc-800 bg-zinc-900 text-white focus:border-teal-500 focus:ring-teal-500/20'
                }`}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className={isLight ? 'bg-white text-gray-900' : 'bg-zinc-800 text-white'}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Dropdown Arrow */}
            <div className={`pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs transition-colors duration-300 ${isLight ? 'text-gray-400' : 'text-zinc-400'
              }`}>
              ▼
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className={`h-14 rounded-xl px-6 text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${isLight
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-500/25'
                : 'bg-teal-500 text-white hover:bg-teal-600 shadow-md shadow-teal-500/25'
              }`}
          >
            Find Cars
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className={`text-xs transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
            }`}>
            Popular:
          </span>
          {["Tesla", "BMW", "Mercedes", "Porsche", "Audi"].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchText(term);
                setSearch(term);
                setSelectedCategory("All");
              }}
              className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 hover:scale-105 ${isLight
                  ? 'bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-600'
                  : 'bg-zinc-900 text-gray-300 hover:bg-teal-500/20 hover:text-teal-400'
                }`}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {(searchText || selectedCategory !== "All") && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={`text-xs transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
              }`}>
              Active filters:
            </span>
            {searchText && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${isLight ? 'bg-teal-50 text-teal-600' : 'bg-teal-500/20 text-teal-400'
                }`}>
                <span>Search: {searchText}</span>
                <button
                  onClick={clearSearch}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Remove search filter"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedCategory !== "All" && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${isLight ? 'bg-teal-50 text-teal-600' : 'bg-teal-500/20 text-teal-400'
                }`}>
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Remove category filter"
                >
                  ✕
                </button>
              </div>
            )}
            <button
              onClick={clearAllFilters}
              className={`text-xs underline transition-colors ${isLight ? 'text-gray-500 hover:text-teal-600' : 'text-gray-500 hover:text-teal-400'
                }`}
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}