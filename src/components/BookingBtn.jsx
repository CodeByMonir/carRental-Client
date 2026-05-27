
"use client";
import { toast } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { Button, Input, Modal, Select } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function BookingModal({ car }) {
    const { data, isPending } = useSession();
    const router = useRouter();

    const handleBooking = async (e) => {
        e.preventDefault();
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
            const {data:tokenData} = await authClient.token();
                  const token = tokenData.token;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization : `Bearer ${token}`
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
                })
            }

            setTimeout(() => { router.push("/my-bookings"); }, 1000);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <Modal>

            <Button className="bg-orange-500 text-white font-semibold rounded-full w-full">
                Book Now
            </Button>

            <Modal.Backdrop>

                <Modal.Container>

                    <Modal.Dialog className="sm:max-w-[500px] bg-black text-white border border-zinc-800 rounded-3xl shadow-2xl shadow-orange-500/80">

                        <Modal.CloseTrigger />

                        <Modal.Header>

                            <div>

                                <p className="text-xs uppercase tracking-[4px] text-orange-500">
                                    Booking Form
                                </p>

                                <Modal.Heading className="text-3xl font-bold mt-2 text-white my-4">
                                    {car?.carName}
                                </Modal.Heading>

                            </div>

                        </Modal.Header>

                        <form onSubmit={handleBooking}>

                            <Modal.Body className="space-y-5">

                                <div className="space-y-2">

                                    <label className="text-sm text-zinc-400">
                                        Driver Needed
                                    </label>

                                    <select
                                        name="driverNeeded"
                                        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-orange-500"
                                        defaultValue="No"
                                    >
                                        <option value="No">
                                            No
                                        </option>

                                        <option value="Yes">
                                            Yes
                                        </option>

                                    </select>

                                </div>

                                <div className="space-y-2">

                                    <label className="text-sm text-zinc-400">
                                        Special Note
                                    </label>

                                    <textarea
                                        name="specialNote"
                                        placeholder="Optional trip details..."
                                        rows={4}
                                        className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-orange-500"
                                    />

                                </div>

                            </Modal.Body>

                            <Modal.Footer>

                                <Button
                                    variant="light"
                                    slot="close"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="bg-orange-500 text-white font-semibold"
                                    slot="close"
                                >
                                    Book Now
                                </Button>

                            </Modal.Footer>

                        </form>

                    </Modal.Dialog>

                </Modal.Container>

            </Modal.Backdrop>

        </Modal>
    );
}

