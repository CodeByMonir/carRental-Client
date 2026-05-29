'use client';

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import Link from "next/link";
import { FaStar, FaQuoteLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Chief Medical Officer",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400&auto=format&fit=crop",
    review: "As someone who travels frequently for medical conferences, reliability is crucial. RentWheels has never disappointed. Their vehicles are always pristine and ready on time.",
  },
  {
    name: "Jonathan Lee",
    role: "Startup CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    review: "The electric vehicle selection is impressive. Rented a Lucid Air for investor meetings and made a fantastic impression. The booking process was smooth and hassle-free.",
  },
  {
    name: "Natalie Kumar",
    role: "Architect",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    review: "Perfect for site visits and client meetings. The SUV was spacious, clean, and handled beautifully. Customer service was responsive and helpful throughout.",
    featured: true,
  },
  {
    name: "Robert Davidson",
    role: "Pro Athlete",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop",
    review: "Traveling between cities for games requires reliable transportation. RentWheels delivers every time. The vehicles are top-notch and the service is professional.",
  },
  {
    name: "Emma Watson",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    review: "Rented a luxury SUV for a company retreat and everything was perfect. The booking team was accommodating and the vehicle exceeded our expectations.",
  },
  {
    name: "Daniel Park",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    review: "First time using RentWheels and I'm impressed. The app is user-friendly, prices are fair, and the car was in excellent condition. Will definitely use again.",
  },
  {
    name: "Rachel Green",
    role: "Event Planner",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=400&auto=format&fit=crop",
    review: "Planning events requires reliable transportation for VIPs. RentWheels has been our trusted partner for months. Professional, punctual, and always high-quality vehicles.",
  },
  {
    name: "Marcus Williams",
    role: "Music Producer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    review: "The premium audio systems in their vehicles are incredible. Rented a Range Rover for studio sessions and the experience was flawless. Highly recommended for creatives.",
  },
];

export default function TestimonialsSection() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } }
  };

  return (
    <section className={`relative w-full px-6 py-20 md:px-12 lg:px-20 lg:py-28 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#050505]'
      }`}>
      <div className={`absolute top-1/2 left-0 w-100 h-100 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-600/5'
        }`} />
      <div className={`absolute bottom-0 right-0 w-100 h-100 rounded-full blur-[140px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-purple-500/10' : 'bg-purple-600/5'
        }`} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={`text-xs font-bold uppercase tracking-[0.35em] block mb-3 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
              }`}>
              Client Experiences
            </span>

            <h2 className={`text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
              }`}>
              Trust of{' '}
              <span className="bg-linear-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                Discerning Drivers
              </span>
            </h2>
            <div className="h-1 w-20 bg-linear-to-r from-teal-500 to-teal-400 rounded-full my-4" />

            <p className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
              }`}>
              Hear from our global community of corporate leaders, technology founders, and
              automotive enthusiasts.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden py-4"
        >
          <div className={`pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r z-10 transition-colors duration-300 ${isLight
              ? 'from-gray-50 via-gray-50/80 to-transparent'
              : 'from-[#050505] via-[#050505]/80 to-transparent'
            }`} />
          <div className={`pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l z-10 transition-colors duration-300 ${isLight
              ? 'from-gray-50 via-gray-50/80 to-transparent'
              : 'from-[#050505] via-[#050505]/80 to-transparent'
            }`} />

          <div className="flex min-w-full animate-marquee gap-6 py-4">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`shrink-0 rounded-2xl p-8 shadow-lg transition-all duration-300 flex min-w-87.5 max-w-87.5 flex-col justify-between ${isLight
                    ? testimonial.featured
                      ? 'bg-linear-to-b from-white to-gray-50 border-2 border-teal-500/30 shadow-xl'
                      : 'bg-white border border-gray-200'
                    : testimonial.featured
                      ? 'bg-linear-to-b from-[#111] to-black border border-teal-500/30 shadow-[0_0_30px_rgba(13,148,136,0.08)]'
                      : 'bg-zinc-950/40 border border-zinc-900'
                  }`}
              >
                <div>
                  <FaQuoteLeft className={`text-2xl mb-4 ${isLight ? 'text-teal-400' : 'text-teal-500'}`} />

                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={`text-sm ${isLight ? 'text-teal-500' : 'text-teal-500'}`} />
                    ))}
                  </div>

                  <p className={`mb-6 text-[15px] leading-relaxed transition-colors duration-300 ${isLight ? 'text-gray-700' : 'text-zinc-300'
                    }`}>
                    "{testimonial.review}"
                  </p>
                </div>

                <div className={`flex items-center gap-4 pt-6 transition-colors duration-300 ${isLight ? 'border-t border-gray-100' : 'border-t border-zinc-900'
                  }`}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-teal-500/30"
                  />

                  <div>
                    <h4 className={`font-bold text-base transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                      }`}>
                      {testimonial.name}
                    </h4>

                    <p className={`text-xs font-semibold uppercase tracking-wider mt-0.5 transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-zinc-500'
                      }`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative mx-auto mt-28 max-w-5xl rounded-3xl p-8 shadow-2xl overflow-hidden px-8 py-20 text-center transition-colors duration-300 ${isLight
              ? 'bg-linear-to-b from-white to-gray-50 border border-gray-200'
              : 'bg-linear-to-b from-zinc-950 to-black border border-zinc-800'
            }`}
        >
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full blur-[130px] pointer-events-none transition-colors duration-300 ${isLight ? 'bg-teal-500/20' : 'bg-teal-600/10'
            }`} />

          <div className={`absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-size-[3rem_3rem] pointer-events-none ${isLight ? 'opacity-30' : 'opacity-100'
            }`} />

          <span className={`relative z-10 text-xs font-bold uppercase tracking-[0.35em] block mb-4 transition-colors duration-300 ${isLight ? 'text-teal-600' : 'text-teal-500'
            }`}>
            Elite Luxury Awaits
          </span>

          <h2 className={`relative z-10 mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
            }`}>
            Ready for the Elite Experience?
          </h2>

          <p className={`relative z-10 mx-auto mb-10 max-w-2xl text-lg leading-relaxed transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-zinc-400'
            }`}>
            Join an elite circle of driving enthusiasts who demand uncompromising performance, cutting-edge technology, and automotive excellence.
          </p>

          <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/explore-cars">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative overflow-hidden rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${isLight
                    ? 'bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-teal-500/25'
                    : 'bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-teal-500/25'
                  }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-linear-to-r from-teal-500 to-teal-400 transition-transform duration-300 ease-out" />
              </motion.button>
            </Link>

            <Link href="/explore-cars">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isLight
                    ? 'border border-gray-300 bg-white/80 text-gray-700 hover:bg-gray-100'
                    : 'border border-zinc-800 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm'
                  }`}
              >
                View Full Fleet
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}