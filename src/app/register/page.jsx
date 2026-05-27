"use client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

import Image from "next/image";
import { toast } from "@heroui/react";

import {
    Speedometer,
    ShieldCheck,
} from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

      const googleAuth =  async () => {
      await authClient.signIn.social({
      provider: "google",
   
    })

  }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = Object.fromEntries(new FormData(e.currentTarget));
        const {data,error} = await authClient.signUp.email({
            ...formDataObj,
          
        });
        if(error){
            toast.warning(`${error.message}`, {
              actionProps: {
                children: "Error",
                className: "bg-warning text-warning-foreground",
                
              },
              description: "Go to login page",
            })
        }
        if(data){
            toast.success("You have Successfully signed up", {
              actionProps: {
                children: "Success",
                className: "bg-success text-success-foreground",
              },
              description: "No Go to login page",
            })
              
        }

        data?router.push("/login"):"";

    };
    return (
        <main className="relative flex min-h-screen bg-[#0D0D0D] text-white overflow-hidden">
            {/* FULL PAGE BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-M614nqSrsVEWH7cWF284U5H-JApKQ_FJfG0SNHT7KQ0gu0HVi8ZJYCgil6V--MP1-A6kkN6q_X8LLnHx4J7ZOXYKmF0j4pdjUnU57vd9nQpRuAFEnpyLmcCSYjI2sSYUg2RMKSFRzP32HTgSlMFZNqeyoEaTbJgDiuWofUlpG7va5_WVX-KIDrstq4Tkw0Jit9SlaVkRPN9q_tq6jXr08v0SzyL1kR8w7nvweLhZtegDozSMWaIPFBpPzq_H8U5qshf2rIR2cPc"
                    alt="Luxury Car"
                    fill
                    priority
                    className="object-cover opacity-50"
                    unoptimized
                />
                <div className="absolute inset-0 bg-black/60 lg:bg-gradient-to-r lg:from-black/80 lg:to-black/30" />
            </div>
            {/* LEFT SIDE */}
            <section className="relative z-10 hidden lg:flex lg:w-1/2 overflow-hidden flex-col">

                {/* Top Content */}
                <div className="absolute top-100 left-50 z-10">
                    <h1 className="text-5xl font-extrabold tracking-tight">
                        DriveEase
                    </h1>

                    <p className="mt-5 max-w-sm text-lg leading-relaxed text-gray-300">
                        Precision in every mile. Experience the future
                        of elite car rentals.
                    </p>
                </div>

                {/* Bottom Tags */}
                <div className="absolute bottom-12 left-12 z-10 flex gap-8">
                    <div className="flex items-center gap-2">
                        <Speedometer className="h-5 w-5 text-orange-500" />
                        <span className="text-sm font-bold uppercase tracking-widest">
                            Velocity
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-orange-500" />
                        <span className="text-sm font-bold uppercase tracking-widest">
                            Precision
                        </span>
                    </div>
                </div>
            </section>

            {/* RIGHT SIDE */}
            <section className="relative z-10 flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
                {/* Glow */}
                <div className="absolute h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

                {/* Card */}
                <div className="relative z-10 w-full max-w-[440px] rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl md:p-10 shadow-2xl">
                    {/* Header */}
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-4xl font-bold tracking-tight">
                            Create Account
                        </h2>

                        <p className="mt-3 text-gray-400">
                            Join the elite world of DriveEase.
                        </p>
                    </div>

                    {/* Form */}
                    <Form
                        className="flex w-full flex-col gap-4"
                        render={(props) => <form {...props} data-custom="foo" />}
                        onSubmit={onSubmit}
                    >
                        <TextField
                            className='rounded-xl border border-white/10 bg-black/40 text-white pb-4 p-2 placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                            isRequired
                            name="name"
                            type="text"

                        >
                            <Label>Write Your Name</Label>
                            <Input placeholder="Wazed Md Abdul" />
                            <FieldError />
                        </TextField>
                        <TextField
                            className='rounded-xl border border-white/10 bg-black/40 text-white pb-4 p-2 placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>
                        <TextField
                            className='rounded-xl border border-white/10 bg-black/40 text-white pb-4 p-2 placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                            isRequired
                            name="image"
                            type="text"

                        >
                            <Label>Enter Your Image url</Label>
                            <Input placeholder="https://example.com/image.jpg" />
                            <FieldError />
                        </TextField>

                        <TextField
                            className="rounded-xl border border-white/10 bg-black/40 text-white pb-4 p-2 placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label>Password</Label>
                            <Input placeholder="Enter your password" />
                            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                            <FieldError />
                        </TextField>
                        <div className="flex w-full items-center justify-center">
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-orange-500 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-500/20 transition hover:scale-[1.02] hover:bg-orange-600 active:scale-[0.98]"
                            >
                                Sign In
                            </button>

                        </div>
                    </Form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-2">
                        <div className="h-px flex-1 bg-white/10" />

                        <span className="text-xs uppercase tracking-widest text-gray-500">
                            Or continue with
                        </span>

                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Google Button */}
                    <button
                        onClick={googleAuth}
                        type="button"
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-transparent py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/5 active:scale-[0.98]"
                    >
                        {/* Google SVG */}
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="currentColor"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="currentColor"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z"
                                fill="currentColor"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="currentColor"
                            />
                        </svg>

                        Google
                    </button>
                </div>
            </section>
        </main>
    );
}