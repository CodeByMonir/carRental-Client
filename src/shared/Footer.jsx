"use client";

import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import { FaCar, FaHeart } from "react-icons/fa";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

const footerLinks = {
  fleet: [
    { label: "Explore Fleet", href: "/explore-cars" },
    { label: "Locations", href: "/locations" },
    { label: "New Arrivals", href: "/explore-cars" },
    { label: "Electric Vehicles", href: "/explore-cars?type=electric" },
    { label: "Luxury Collection", href: "/explore-cars?type=luxury" },
  ],

  support: [
    { label: "Help Center", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cancellation Policy", href: "/cancellation" },
  ],

  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: <FaXTwitter />, href: "https://x.com", label: "Twitter" },
  { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
  { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube" },
  { icon: <FaTiktok />, href: "https://tiktok.com", label: "TikTok" },
];

export default function Footer() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";
  const currentYear = new Date().getFullYear();

  if (!mounted) return null;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full transition-colors duration-300 overflow-hidden ${isLight
          ? "bg-gradient-to-b from-gray-50 to-white"
          : "bg-gradient-to-b from-gray-950 to-black"
        }`}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

      <div className={`absolute inset-0 opacity-5 pointer-events-none ${isLight ? "bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:20px_20px]" : "bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"
        }`} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-20">
        <div className={`grid gap-12 lg:grid-cols-5 mb-12 pb-12 border-b transition-colors duration-300 ${isLight ? "border-gray-200" : "border-gray-800"
          }`}>
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full blur-md transition-opacity group-hover:opacity-100 opacity-50 ${isLight ? "bg-teal-400" : "bg-teal-500"
                    }`} />
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isLight ? "bg-teal-600" : "bg-teal-500"
                    }`}>
                    <FaCar className="text-white text-lg" />
                  </div>
                </div>
                <h2 className={`text-2xl font-black tracking-tight transition-colors duration-300 ${isLight ? "text-gray-900" : "text-white"
                  }`}>
                  Rent<span className="text-teal-500">Cars</span>
                </h2>
              </div>
            </Link>

            <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${isLight ? "text-gray-600" : "text-gray-400"
              }`}>
              Experience the pinnacle of automotive luxury. Our curated fleet of premium vehicles delivers unparalleled performance, style, and comfort for discerning drivers worldwide.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
                }`}>
                <span className="text-teal-500">✓</span> 500+ Vehicles
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
                }`}>
                <span className="text-teal-500">✓</span> 10k+ Customers
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
                }`}>
                <span className="text-teal-500">✓</span> 24/7 Support
              </div>
            </div>

            <div>
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isLight ? "text-gray-500" : "text-gray-500"
                }`}>
                Follow Us
              </h3>
              <div className="flex items-center gap-2">
                {socials.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${isLight
                        ? "bg-gray-100 text-gray-600 hover:bg-teal-500 hover:text-white"
                        : "bg-gray-900 text-gray-400 hover:bg-teal-500 hover:text-white"
                      }`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-5 transition-colors duration-300 ${isLight ? "text-gray-800" : "text-white"
              }`}>
              Fleet
            </h3>
            <ul className="space-y-3">
              {footerLinks.fleet.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-all duration-200 hover:text-teal-500 hover:pl-1 ${isLight ? "text-gray-600" : "text-gray-400"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-5 transition-colors duration-300 ${isLight ? "text-gray-800" : "text-white"
              }`}>
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-all duration-200 hover:text-teal-500 hover:pl-1 ${isLight ? "text-gray-600" : "text-gray-400"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-5 transition-colors duration-300 ${isLight ? "text-gray-800" : "text-white"
              }`}>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-all duration-200 hover:text-teal-500 hover:pl-1 ${isLight ? "text-gray-600" : "text-gray-400"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`py-8 mb-8 border-b transition-colors duration-300 ${isLight ? "border-gray-200" : "border-gray-800"
          }`}>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className={`text-lg font-bold mb-1 transition-colors duration-300 ${isLight ? "text-gray-800" : "text-white"
                }`}>
                Subscribe to Our Newsletter
              </h3>
              <p className={`text-sm transition-colors duration-300 ${isLight ? "text-gray-600" : "text-gray-400"
                }`}>
                Get exclusive offers, new arrivals, and driving tips straight to your inbox.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isLight
                    ? "bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-400"
                    : "bg-gray-900 border border-gray-800 text-white placeholder-gray-500"
                  }`}
              />
              <button
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 ${isLight
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-teal-500 text-white hover:bg-teal-600"
                  }`}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs">
            <p className={`transition-colors duration-300 ${isLight ? "text-gray-500" : "text-gray-500"
              }`}>
              © {currentYear} RentWheels. All rights reserved.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/privacy" className={`transition-colors hover:text-teal-500 ${isLight ? "text-gray-500" : "text-gray-500"
                }`}>
                Privacy
              </Link>
              <Link href="/terms" className={`transition-colors hover:text-teal-500 ${isLight ? "text-gray-500" : "text-gray-500"
                }`}>
                Terms
              </Link>
              <Link href="/sitemap" className={`transition-colors hover:text-teal-500 ${isLight ? "text-gray-500" : "text-gray-500"
                }`}>
                Sitemap
              </Link>
              <Link href="/cookies" className={`transition-colors hover:text-teal-500 ${isLight ? "text-gray-500" : "text-gray-500"
                }`}>
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-1 text-xs">
            <span className={`${isLight ? "text-gray-500" : "text-gray-500"}`}>
              Crafted with
            </span>
            <FaHeart className="text-red-500 text-xs animate-pulse" />
            <span className={`${isLight ? "text-gray-500" : "text-gray-500"}`}>
              for luxury driving enthusiasts
            </span>
          </div>
        </div>

        <div className={`mt-8 pt-6 text-center border-t transition-colors duration-300 ${isLight ? "border-gray-200" : "border-gray-800"
          }`}>
          <p className={`text-xs mb-3 transition-colors duration-300 ${isLight ? "text-gray-500" : "text-gray-500"
            }`}>
            Secure Payment Methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className={`px-3 py-1.5 rounded text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
              }`}>VISA</span>
            <span className={`px-3 py-1.5 rounded text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
              }`}>MasterCard</span>
            <span className={`px-3 py-1.5 rounded text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
              }`}>Amex</span>
            <span className={`px-3 py-1.5 rounded text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
              }`}>PayPal</span>
            <span className={`px-3 py-1.5 rounded text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
              }`}>Apple Pay</span>
            <span className={`px-3 py-1.5 rounded text-xs font-semibold ${isLight ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-gray-300"
              }`}>Google Pay</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}