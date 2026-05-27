"use client";
import { toast } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { FaMapMarkerAlt, FaCalendar, FaClock, FaShieldAlt } from "react-icons/fa";

export default function BookingModal({ car }) {
    const { data } = useSession();
    const router = useRouter();
    const { theme, mounted } = useTheme();
    const isLight = theme === "light";
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const today = new Date();
        const currentDate = today.toLocaleDateString();
        const todayTime = new Date();
        const currentTime = todayTime.toLocaleTimeString();
        const userId = data?.user.id

        const formData = Object.fromEntries(new FormData(e.target));
        const bookingData = {
            carName: car.carName,
            dailyPrice: car.dailyRentPrice,
            imageUrl: car.imageUrl,
            pickupLocation: car.pickupLocation,
            currentDate,
            currentTime,
            userId,
            ...formData,
        }

        try {
            const { data: tokenData } = await authClient.token();
            const token = tokenData.token;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(bookingData),
            });

            const data = await res.json();

            if (data) {
                toast.success("Congratulations! You have Successfully Booked", {
                    actionProps: {
                        children: "Success",
                        className: "bg-success text-success-foreground",
                    },
                    description: "Checking your Bookings At Booking Page",
                });
                setIsOpen(false);
                setTimeout(() => { router.push("/my-bookings"); }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error("Booking failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    return (
        <>
            {/* Book Now Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`w-full rounded-xl py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${isLight
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-teal-500 text-white hover:bg-teal-600'
                    }`}
            >
                Book Now
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Container */}
                    <div className={`relative w-full max-w-md rounded-2xl shadow-xl ${isLight ? 'bg-white' : 'bg-gray-900'
                        }`}>
                        {/* Header */}
                        <div className={`p-5 border-b ${isLight ? 'border-gray-200' : 'border-gray-800'
                            }`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-teal-600' : 'text-teal-400'
                                        }`}>
                                        Booking Form
                                    </p>
                                    <h3 className={`text-xl font-bold mt-1 ${isLight ? 'text-gray-900' : 'text-white'
                                        }`}>
                                        {car?.carName}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={`w-7 h-7 rounded-full flex items-center justify-center ${isLight
                                            ? 'hover:bg-gray-100 text-gray-500'
                                            : 'hover:bg-gray-800 text-gray-400'
                                        }`}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Car Details Summary */}
                        <div className={`p-5 border-b ${isLight ? 'border-gray-200' : 'border-gray-800'
                            }`}>
                            <div className="flex gap-3">
                                <img
                                    src={car?.imageUrl}
                                    alt={car?.carName}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <FaMapMarkerAlt className={`text-xs ${isLight ? 'text-teal-600' : 'text-teal-400'
                                            }`} />
                                        <span className={`text-xs ${isLight ? 'text-gray-600' : 'text-gray-400'
                                            }`}>
                                            {car?.pickupLocation}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-xl font-bold ${isLight ? 'text-teal-600' : 'text-teal-400'
                                            }`}>
                                            ${car?.dailyRentPrice}
                                        </span>
                                        <span className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                            / day
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleBooking}>
                            <div className="p-5 space-y-4">
                                {/* Driver Needed */}
                                <div>
                                    <label className={`block text-sm font-medium mb-1.5 ${isLight ? 'text-gray-700' : 'text-gray-300'
                                        }`}>
                                        Driver Needed
                                    </label>
                                    <select
                                        name="driverNeeded"
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none ${isLight
                                                ? 'border-gray-300 bg-gray-50 text-gray-900 focus:border-teal-500'
                                                : 'border-gray-700 bg-gray-800 text-white focus:border-teal-500'
                                            }`}
                                        defaultValue="No"
                                    >
                                        <option value="No">No, I'll drive myself</option>
                                        <option value="Yes">Yes, I need a driver (+$30/day)</option>
                                    </select>
                                </div>

                                {/* Special Note */}
                                <div>
                                    <label className={`block text-sm font-medium mb-1.5 ${isLight ? 'text-gray-700' : 'text-gray-300'
                                        }`}>
                                        Special Note
                                    </label>
                                    <textarea
                                        name="specialNote"
                                        placeholder="Optional: Add any special requests..."
                                        rows={3}
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none resize-none ${isLight
                                                ? 'border-gray-300 bg-gray-50 text-gray-900 focus:border-teal-500 placeholder:text-gray-400'
                                                : 'border-gray-700 bg-gray-800 text-white focus:border-teal-500 placeholder:text-gray-500'
                                            }`}
                                    />
                                </div>

                                {/* Booking Summary */}
                                
                            </div>

                            {/* Footer */}
                            <div className={`p-5 border-t flex gap-3 ${isLight ? 'border-gray-200' : 'border-gray-800'
                                }`}>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isLight
                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isLight
                                            ? 'bg-teal-600 text-white hover:bg-teal-700'
                                            : 'bg-teal-500 text-white hover:bg-teal-600'
                                        }`}
                                >
                                    {isSubmitting ? 'Booking...' : 'Confirm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}