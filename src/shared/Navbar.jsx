'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { useTheme } from '@/providers/ThemeProvider';
import { FaCar, FaUser, FaSignOutAlt, FaPlus, FaBook, FaList, FaBars, FaTimes } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const router = useRouter();
  const { data, isPending } = useSession();
  const pathName = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathName]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/explore-cars", label: "Explore Cars" },
    { href: "/add-cars", label: "Add Car" },
    { href: "/my-bookings", label: "My Bookings" },
  ];

  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/explore-cars", label: "Explore Cars" },
    { href: "/add-cars", label: "Add Car" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/profile", label: "My Profile" },
    { href: "/my-added-cars", label: "My Added Cars" },
  ];

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? `py-3 shadow-2xl ${isLight ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100' : 'bg-black/95 backdrop-blur-xl border-b border-gray-800'}`
            : `py-5 ${isLight ? 'bg-white/80 backdrop-blur-md' : 'bg-black/80 backdrop-blur-md'}`
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="group relative flex items-center gap-2">
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity group-hover:opacity-100 opacity-50 ${isLight ? "bg-teal-400" : "bg-teal-500"
                  }`} />
                <div className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isLight ? "bg-teal-600" : "bg-teal-500"
                  }`}>
                  <FaCar className="text-white text-sm" />
                </div>
              </div>
              <span className={`text-xl font-black tracking-tight transition-colors duration-300 ${isLight ? "text-gray-900" : "text-white"
                }`}>
                Rent<span className="text-teal-500">Wheels</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathName === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive
                        ? isLight
                          ? 'text-teal-600 bg-teal-50'
                          : 'text-teal-400 bg-teal-500/10'
                        : isLight
                          ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-100'
                          : 'text-gray-400 hover:text-teal-400 hover:bg-gray-800'
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <div
                        className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${isLight ? 'bg-teal-500' : 'bg-teal-400'
                          }`}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isLight
                    ? 'bg-gray-100 text-gray-600 hover:bg-teal-100 hover:text-teal-600'
                    : 'bg-gray-800 text-gray-400 hover:bg-teal-500/20 hover:text-teal-400'
                  }`}
              >
                {isLight ? <FiMoon size={18} /> : <FiSun size={18} />}
              </button>

              {/* Auth Section */}
              {isPending ? (
                <div className="h-10 w-24 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
              ) : data?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative group"
                  >
                    <div className="relative">
                      <img
                        alt={data?.user.name}
                        src={data?.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(data?.user.name)}&background=0D9488&color=fff`}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-teal-500/30 transition-all duration-300 group-hover:ring-teal-500"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div
                      className={`absolute right-0 mt-3 w-64 rounded-2xl border shadow-2xl overflow-hidden z-50 ${isLight
                          ? 'bg-white border-gray-200 shadow-gray-200'
                          : 'bg-gray-900 border-gray-800 shadow-black'
                        }`}
                    >
                      <div className={`px-4 py-3 border-b ${isLight ? 'border-gray-100' : 'border-gray-800'}`}>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Signed in as</p>
                        <p className={`text-sm font-bold truncate mt-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                          {data?.user.name}
                        </p>
                        <p className={`text-xs truncate mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                          {data?.user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/profile"
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isLight
                              ? 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-teal-400'
                            }`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaUser size={14} />
                          My Profile
                        </Link>
                        <Link
                          href="/add-cars"
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isLight
                              ? 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-teal-400'
                            }`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaPlus size={14} />
                          Add Car
                        </Link>
                        <Link
                          href="/my-bookings"
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isLight
                              ? 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-teal-400'
                            }`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaBook size={14} />
                          My Bookings
                        </Link>
                        <Link
                          href="/my-added-cars"
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${isLight
                              ? 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-teal-400'
                            }`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <FaList size={14} />
                          My Added Cars
                        </Link>
                        <div className={`h-px my-2 ${isLight ? 'bg-gray-100' : 'bg-gray-800'}`} />
                        <button
                          onClick={async () => {
                            await authClient.signOut();
                            router.refresh();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <FaSignOutAlt size={14} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-teal-500 to-teal-400 transition-transform duration-300 ease-out" />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isLight
                    ? 'bg-gray-100 text-gray-600 hover:bg-teal-100 hover:text-teal-600'
                    : 'bg-gray-800 text-gray-400 hover:bg-teal-500/20 hover:text-teal-400'
                  }`}
              >
                {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
          <div
            className={`fixed right-0 top-0 bottom-0 w-80 z-50 shadow-2xl md:hidden ${isLight ? 'bg-white' : 'bg-gray-900'
              }`}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className={`p-6 border-b ${isLight ? 'border-gray-100' : 'border-gray-800'}`}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                    <FaCar className="text-white text-lg" />
                  </div>
                  <span className={`text-xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    Rent<span className="text-teal-500">Wheels</span>
                  </span>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 py-6 px-4 overflow-y-auto">
                {mobileLinks.map((link) => {
                  const isActive = pathName === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-1 ${isActive
                          ? isLight
                            ? 'bg-teal-50 text-teal-600'
                            : 'bg-teal-500/10 text-teal-400'
                          : isLight
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Menu Footer */}
              <div className={`p-6 border-t ${isLight ? 'border-gray-100' : 'border-gray-800'}`}>
                {data?.user && (
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      router.refresh();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <FaSignOutAlt size={14} />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;