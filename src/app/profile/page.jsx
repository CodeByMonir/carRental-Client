
"use client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import {PencilToSquare} from '@gravity-ui/icons';
import { authClient, useSession } from "@/lib/auth-client";
import { getBookings } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";
import {
  SkeletonStat,
  SkeletonAction,
  SkeletonBooking,
  SkeletonAccountDetail,
} from "@/components/Skeleton";

import {
  FaCar,
  FaCalendarAlt,
  FaDollarSign,
  FaPlus,
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function ProfilePage() {
const [bookings, setBookings] = useState([]); 
 const [listings, setListings] = useState([]);
const [dataLoading, setDataLoading] = useState(true);
const router = useRouter();  
const { data, isLoading } = useSession();
const dataUser = data?.user;
const userId = data?.user?.id;

const onsubmit = async (e) => {
    e.preventDefault();
    const userData = Object.fromEntries(new FormData(e.target));
    
    try {
        await authClient.updateUser(userData);
        alert("Profile updated successfully.");
    } catch (error) {
        alert("Failed to update profile. Please try again.");
    }
  }



  const user = {
    name: dataUser?.name || 'Loading User',
    email: dataUser?.email || 'loading' ,
    image: dataUser?.image || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=256&auto=format&fit=crop',
    role: "Premium Driver",
    joined: dataUser?.createdAt ? new Date(dataUser.createdAt).toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric" }) : 'Loading',
    location: "Bangladesh",
  };


  useEffect(() => {
      const fetchBookings = async () => {
        if (!userId) return;
   
        try {
          const { data: tokenData } = await authClient.token();
          const token = tokenData.token;
          const data = await getBookings({ userId, token });
          setBookings(data || []);
        } catch (error) {
          console.log(error);
          setBookings([]);
        } finally {
          setDataLoading(false);
        }
      }
      fetchBookings();
    }, [userId]);
      useEffect(() => {
    const fetchAddedListings = async () => {
      if (!userId) return;

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
        setDataLoading(false);
      }
    }
    fetchAddedListings();
  }, [userId]);
    const slicedBookings = bookings?.slice(0, 2); 

    console.log(listings);
    
    const totalPriceForBookings = bookings?.reduce((total, booking) => {
      return total + (Number(booking?.dailyPrice) || 0);
    }, 0);
  const stats = [
    {
      title: "Active Bookings",
      value: bookings?.length || 0,
      icon: <FaCalendarAlt />,
    },

    {
      title: "Cars Listed",
      value: listings?.length || 0,
      icon: <FaCar />,
    },

    {
      title: "Total Spent",
      value: totalPriceForBookings || 0,
      icon: <FaDollarSign />,
      isPrice: true,
    },
  ];

  const quickActions = [
    {
      title: "My Bookings",
      description: "Manage and track your rentals",
      icon: <FaCalendarAlt />,
      href: "/my-bookings",
    },

    {
      title: "Browse Cars",
      description: "Explore premium luxury vehicles",
      icon: <FaCar />,
      href: "/explore-cars",
    },

    {
      title: "My Listings",
      description: "Manage your listed vehicles",
      icon: <FaCar />,
      href: "/my-added-cars",
    },

    {
      title: "Add Car",
      description: "List a new luxury vehicle",
      icon: <FaPlus />,
      href: "/add-cars",
    },
  ];


  return (
    <section className="min-h-screen bg-black text-white">
      <style>{`
        @keyframes liftUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .lift-up {
          animation: liftUp 0.6s ease-out forwards;
        }
        .lift-up-delayed-1 {
          animation: liftUp 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }
        .lift-up-delayed-2 {
          animation: liftUp 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        .lift-up-delayed-3 {
          animation: liftUp 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
      {/* HERO */}
      <div className="relative overflow-hidden border-b border-orange-500/10 bg-linear-to-b from-[#141414] via-black to-black lift-up">
        {/* glow */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* avatar */}
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-orange-500/30">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* info */}
              <div>
                <div className="mb-4 inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                  Role: {user.role}
                </div>

                <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                  {user.name}
                </h1>

                <div className="mt-4 flex flex-col gap-3 text-zinc-400">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-orange-400" />
                    <span>{user.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-orange-400" />
                    <span>{user.location}</span>
                  </div>

                  <p className="text-sm text-zinc-500">
                    Member since {user.joined}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4 items-center">
              
              <Modal>
                      <Button className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-6 py-6 font-semibold text-white transition hover:border-orange-500 hover:text-orange-400">
                        <PencilToSquare /> Edit Profile
                      </Button>
                      <Modal.Backdrop>
                        <Modal.Container placement="auto">
                          <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <img src={user?.image}
                                  alt={user?.name}
                                  className="w-12 h-12 rounded-full object-cover relative z-10 border-4 border-white shadow-sm"
                                />
                              </Modal.Icon>
                              <Modal.Heading>{user?.name || 'John Doe'}</Modal.Heading>
                              <p className="mt-1.5 text-sm leading-5 text-muted">
                                Edit your profile information and preferences here.
                              </p>
                            </Modal.Header>
                            <Modal.Body className="p-6">
                              <Surface variant="default">
                                <form onSubmit={onsubmit} className="flex flex-col gap-4">
                                  <TextField isRequired className="w-full" name="name" type="text">
                                    <Label>Name</Label>
                                    <Input  placeholder="Enter your name" />
                                  </TextField>
                                  <TextField isRequired className="w-full" name="image" type="text">
                                    <Label>Image URL</Label>
                                    <Input  placeholder="Enter the URL of your profile image" />
                                  </TextField>
                                  <Modal.Footer>
                                    <Button slot="close" variant='danger'>
                                      Cancel
                                    </Button>
                                    <Button  type="submit" slot="close" className="bg-on-surface text-tertiary-fixed font-headline px-8 py-4 rounded-full font-bold text-sm shadow-[0px_20px_40px_rgba(25,28,29,0.15)] hover:shadow-none transition-all duration-500 flex items-center gap-3 active:scale-95 cursor-pointer">Update Profile</Button>
                                  </Modal.Footer>
                                </form>
                              </Surface>
                            </Modal.Body>
                          </Modal.Dialog>
                        </Modal.Container>
                      </Modal.Backdrop>
                    </Modal>

              <button onClick={async () => { await authClient.signOut(); router.refresh(); }} className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white">
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        {/* STATS */}
        <div className="grid gap-5 md:grid-cols-3">
          {dataLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="lift-up-delayed-1">
                  <SkeletonStat />
                </div>
              ))
            : stats.map((item, index) => (
                <div
                  key={index}
                  className={`group rounded-[2rem] border border-orange-500/10 bg-zinc-950 p-6 transition hover:border-orange-500/30 hover:bg-zinc-900 ${
                    index === 0
                      ? "lift-up"
                      : index === 1
                        ? "lift-up-delayed-1"
                        : "lift-up-delayed-2"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-4xl font-black text-white">
                        {item.isPrice ? "$" : ""}
                        <CountUp
                          end={item.value}
                          duration={2.5}
                          decimals={item.isPrice ? 0 : 0}
                        />
                      </h2>

                      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-zinc-500">
                        {item.title}
                      </p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-xl text-orange-400">
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-14 lift-up-delayed-3">
          <div className="mb-8">
            <h2 className="text-3xl font-black">Quick Actions</h2>

            <p className="mt-2 text-zinc-400">
              Jump into bookings, vehicles, and hosting tools.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {dataLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <SkeletonAction key={idx} />
                ))
              : quickActions.map((action, index) => (
                  <Link
                    href={action.href}
                    key={index}
                    className="group flex items-center justify-between rounded-[2rem] border border-orange-500/10 bg-zinc-950 p-6 transition hover:border-orange-500/30 hover:bg-zinc-900 lift-up"
                  >
                    <div className="flex items-center gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-xl text-orange-400">
                        {action.icon}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold">{action.title}</h3>

                        <p className="mt-1 text-sm text-zinc-400">
                          {action.description}
                        </p>
                      </div>
                    </div>

                    <FaArrowRight className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-orange-400" />
                  </Link>
                ))}
          </div>
        </div>

        {/* LOWER GRID */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_.9fr]">
          {/* BOOKINGS */}
          <div className="overflow-hidden rounded-[2rem] border border-orange-500/10 bg-zinc-950 lift-up">
            <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">
              <div>
                <h2 className="text-xl font-black uppercase tracking-[0.2em]">
                  Recent Bookings
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Latest rentals from your account
                </p>
              </div>

              <Link
                href="/my-bookings"
                className="text-sm font-semibold text-orange-400 transition hover:text-orange-300"
              >
                View all →
              </Link>
            </div>

            <div>
              {dataLoading
                ? Array.from({ length: 2 }).map((_, idx) => (
                    <SkeletonBooking key={idx} />
                  ))
                : slicedBookings.length > 0
                  ? slicedBookings.map((booking, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-5 border-b border-zinc-800 p-6 last:border-none sm:flex-row sm:items-center sm:justify-between lift-up"
                      >
                        <div className="flex items-center gap-5">
                          <div className="relative h-24 w-28 overflow-hidden rounded-2xl">
                            <Image
                              src={booking?.imageUrl}
                              alt={booking?.carName}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>

                          <div>
                            <h3 className="text-xl font-bold">
                              {booking?.carName}
                            </h3>

                            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-400">
                              <span>{booking?.currentDate}</span>
                              <span>{booking?.currentTime}</span>
                            </div>
                          </div>
                        </div>

                        <h2 className="text-2xl font-black text-orange-400">
                          ${booking?.dailyPrice}
                        </h2>
                      </div>
                    ))
                  : (
                      <div className="px-8 py-12 text-center text-zinc-400">
                        No bookings yet
                      </div>
                    )}
            </div>
          </div>

          {/* ACCOUNT DETAILS */}
          <div className="overflow-hidden rounded-[2rem] border border-orange-500/10 bg-zinc-950 lift-up">
            <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">
              <div>
                <h2 className="text-xl font-black uppercase tracking-[0.2em]">
                  Account Details
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Information connected to your account
                </p>
              </div>

              
            </div>

            <div>
              {dataLoading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <SkeletonAccountDetail key={idx} />
                  ))
                : [
                    {
                      icon: <FaUser />,
                      label: "Full Name",
                      value: user.name,
                    },

                    {
                      icon: <FaEnvelope />,
                      label: "Email",
                      value: user.email,
                    },

                    {
                      icon: <FaMapMarkerAlt />,
                      label: "Location",
                      value: user.location,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 border-b border-zinc-800 p-6 last:border-none lift-up"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                        {item.icon}
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                          {item.label}
                        </p>

                        <h3 className="mt-2 text-lg font-bold text-white">
                          {item.value}
                        </h3>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
