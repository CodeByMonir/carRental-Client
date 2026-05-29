"use client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { getBookings } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";
import { useTheme } from "@/providers/ThemeProvider";
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
  FaCalendarCheck,
  FaStar,
} from "react-icons/fa";

export default function ProfilePage() {
  const { theme, mounted } = useTheme();
  const isLight = theme === "light";
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
      toast.success("Profile updated successfully.", {
        actionProps: {
          children: "Success",
          className: "bg-success text-success-foreground",
        },
        description: "Updating your profile",
      });
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  }

  const user = {
    name: dataUser?.name || 'Loading User',
    email: dataUser?.email || 'loading',
    image: dataUser?.image || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=256&auto=format&fit=crop',
    joined: dataUser?.createdAt ? new Date(dataUser.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) : 'Loading',
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
  const totalPriceForBookings = bookings?.reduce((total, booking) => {
    return total + (Number(booking?.dailyPrice) || 0);
  }, 0);

  const stats = [
    {
      title: "Active Bookings",
      value: bookings?.length || 0,
      icon: <FaCalendarCheck />,
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
      icon: <FaCalendarCheck />,
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

  if (!mounted) return null;

  return (
    <section className={`min-h-screen transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-black'
      }`}>
        
      <div className={`relative overflow-hidden border-b transition-colors duration-300 ${isLight
        ? 'border-teal-500/20 bg-linear-to-b from-gray-100 via-gray-50 to-white'
        : 'border-teal-500/10 bg-linear-to-b from-[#141414] via-black to-black'
        }`}>
          
        <div className={`absolute left-0 top-0 h-80 w-80 rounded-full blur-3xl transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/10'
          }`} />
        <div className={`absolute right-0 top-0 h-80 w-80 rounded-full blur-3xl transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/10'
          }`} />

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:py-24 md:px-10 lg:px-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              
              <div className={`relative h-28 w-28 lg:h-32 lg:w-32 overflow-hidden rounded-full border-4 transition-colors duration-300 ${isLight ? 'border-teal-500/30' : 'border-teal-500/30'
                }`}>
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>


              <div>
                

                <h1 className={`text-3xl lg:text-5xl font-black tracking-tight transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                  {user.name}
                </h1>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className={`text-sm ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
                    <span className={`text-sm transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className={`text-sm ${isLight ? 'text-teal-600' : 'text-teal-400'}`} />
                    <span className={`text-sm transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                      {user.location}
                    </span>
                  </div>
                  <p className={`text-xs transition-colors duration-300 ${isLight ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                    Member since {user.joined}
                  </p>
                </div>
              </div>
            </div>


            <div className="flex flex-wrap gap-3 items-baseline">
              
              <Modal>
                <Button className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${isLight
                    ? 'border-gray-300 bg-white text-gray-700 hover:border-teal-500 hover:text-teal-600'
                    : 'border-zinc-800 bg-zinc-900 text-white hover:border-teal-500 hover:text-teal-400'
                  }`}>
                  <FaEdit /> Edit Profile
                </Button>
                <Modal.Backdrop>
                  <Modal.Container placement="auto">
                    <Modal.Dialog className={`sm:max-w-md rounded-2xl ${isLight ? 'bg-white' : 'bg-gray-900'}`}>
                      <Modal.CloseTrigger />
                      <Modal.Header className="p-6 pb-0">
                        <div className="flex items-center gap-4">
                          <img
                            src={user?.image}
                            alt={user?.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
                          />
                          <div>
                            <Modal.Heading className={`text-xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                              {user?.name || 'John Doe'}
                            </Modal.Heading>
                            <p className={`text-sm mt-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                              Edit your profile information
                            </p>
                          </div>
                        </div>
                      </Modal.Header>
                      <Modal.Body className="p-6">
                        <Surface variant="default">
                          <form onSubmit={onsubmit} className={`flex flex-col gap-4 ${isLight ? 'bg-gray-50' : 'bg-gray-900'}`}>
                            <TextField isRequired className="w-full" name="name" type="text">
                              <Label className={isLight ? 'text-gray-700' : 'text-gray-300'}>Full Name</Label>
                              <Input placeholder="Enter your name" className={`${isLight ? 'bg-gray-50' : 'bg-gray-800'}`} />
                            </TextField>
                            <TextField isRequired className="w-full" name="image" type="text">
                              <Label className={isLight ? 'text-gray-700' : 'text-gray-300'}>Image URL</Label>
                              <Input placeholder="Enter the URL of your profile image" className={`${isLight ? 'bg-gray-50' : 'bg-gray-800'}`} />
                            </TextField>
                            <Modal.Footer className="px-0 pb-0 pt-4">
                              <Button slot="close" variant='light' className={isLight ? 'text-gray-600' : 'text-gray-400'}>
                                Cancel
                              </Button>
                              <Button type="submit" slot="close" className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${isLight ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-teal-500 text-white hover:bg-teal-600'
                                }`}>
                                Update Profile
                              </Button>
                            </Modal.Footer>
                          </form>
                        </Surface>
                      </Modal.Body>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>


              <button
                onClick={async () => {
                  await authClient.signOut();
                  router.refresh();
                }}
                className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${isLight
                    ? 'border-red-500/20 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white'
                    : 'border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white'
                  }`}
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 md:px-10 lg:px-16">
        
        <div className="grid gap-6 md:gap-5 md:grid-cols-3">
          {dataLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonStat key={idx} />
            ))
            : stats.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg ${isLight
                    ? 'border-gray-200 bg-white hover:shadow-gray-200'
                    : 'border-teal-500/10 bg-zinc-950 hover:border-teal-500/30 hover:bg-zinc-900'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-3xl lg:text-4xl font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {item.isPrice && "$"}
                      <CountUp end={item.value} duration={2.5} decimals={item.isPrice ? 0 : 0} />
                    </h2>
                    <p className={`mt-1 text-xs uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-zinc-500'
                      }`}>
                      {item.title}
                    </p>
                  </div>
                  <div className={`flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl text-lg lg:text-xl ${isLight ? 'bg-teal-500/10 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                    }`}>
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
        </div>


        <div className="mt-14 lg:mt-16">
          <div className="mb-8">
            <h2 className={`text-2xl lg:text-3xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
              Quick Actions
            </h2>
            <p className={`text-sm mt-1 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
              Jump into bookings, vehicles, and hosting tools
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {dataLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonAction key={idx} />
              ))
              : quickActions.map((action, index) => (
                <Link
                  href={action.href}
                  key={index}
                  className={`group flex items-center justify-between rounded-xl border p-5 transition-all duration-300 hover:shadow-md ${isLight
                      ? 'border-gray-200 bg-white hover:border-teal-500/30'
                      : 'border-teal-500/10 bg-zinc-950 hover:border-teal-500/30 hover:bg-zinc-900'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg text-base lg:text-lg ${isLight ? 'bg-teal-500/10 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                      }`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className={`text-sm lg:text-base font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                        {action.title}
                      </h3>
                      <p className={`text-xs mt-0.5 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <FaArrowRight className={`text-xs transition group-hover:translate-x-0.5 ${isLight ? 'text-gray-400 group-hover:text-teal-600' : 'text-gray-500 group-hover:text-teal-400'
                    }`} />
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-14 lg:mt-16 grid gap-6 lg:grid-cols-2">
          
          <div className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${isLight ? 'border-gray-200 bg-white' : 'border-teal-500/10 bg-zinc-950'
            }`}>
            <div className={`flex items-center justify-between border-b p-6 ${isLight ? 'border-gray-200' : 'border-zinc-800'
              }`}>
              <div>
                <h2 className={`text-lg lg:text-xl font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                  Recent Bookings
                </h2>
                <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                  Latest rentals from your account
                </p>
              </div>
              <Link href="/my-bookings" className={`text-xs font-semibold transition ${isLight ? 'text-teal-600 hover:text-teal-700' : 'text-teal-400 hover:text-teal-300'
                }`}>
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
                    <div key={index} className={`flex flex-col gap-4 border-b p-6 last:border-none sm:flex-row sm:items-center sm:justify-between ${isLight ? 'border-gray-100' : 'border-zinc-800'
                      }`}>
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-20 lg:h-20 lg:w-24 overflow-hidden rounded-lg">
                          <Image
                            src={booking?.imageUrl}
                            alt={booking?.carName}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <h3 className={`text-base lg:text-lg font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                            {booking?.carName}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-xs mt-1">
                            <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>
                              {booking?.currentDate}
                            </span>
                            <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>
                              {booking?.currentTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h3 className={`text-xl lg:text-2xl font-bold ${isLight ? 'text-teal-600' : 'text-teal-400'}`}>
                        ${booking?.dailyPrice}
                      </h3>
                    </div>
                  ))
                  : (
                    <div className={`p-8 text-center text-sm ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                      No bookings yet
                    </div>
                  )}
            </div>
          </div>

          <div className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${isLight ? 'border-gray-200 bg-white' : 'border-teal-500/10 bg-zinc-950'
            }`}>
            <div className={`flex items-center justify-between border-b p-6 ${isLight ? 'border-gray-200' : 'border-zinc-800'
              }`}>
              <div>
                <h2 className={`text-lg lg:text-xl font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'
                  }`}>
                  Account Details
                </h2>
                <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
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
                  { icon: <FaUser />, label: "Full Name", value: user.name },
                  { icon: <FaEnvelope />, label: "Email", value: user.email },
                  { icon: <FaMapMarkerAlt />, label: "Location", value: user.location },
                ].map((item, index) => (
                  <div key={index} className={`flex items-start gap-4 border-b p-6 last:border-none ${isLight ? 'border-gray-100' : 'border-zinc-800'
                    }`}>
                    <div className={`flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg text-base lg:text-lg ${isLight ? 'bg-teal-500/10 text-teal-600' : 'bg-teal-500/10 text-teal-400'
                      }`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-zinc-500'
                        }`}>
                        {item.label}
                      </p>
                      <h3 className={`text-sm lg:text-base font-bold mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
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