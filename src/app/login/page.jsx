"use client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "@heroui/react";
import { Speedometer, ShieldCheck } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash, FaCar } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const { theme, mounted } = useTheme();
    const isLight = theme === "light";
    const [showPassword, setShowPassword] = useState(false);

    const googleAuth = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const loginData = Object.fromEntries(new FormData(e.target));
        const { data, error } = await authClient.signIn.email({
            ...loginData,
            rememberMe: true,
        });

        if (error) {
            toast.warning(`${error.message}`, {
                actionProps: {
                    children: "Error",
                    className: "bg-warning text-warning-foreground",
                },
                description: "Invalid Credentials",
            });
            return;
        }
        if (data) {
            toast.success("You have Successfully signed in", {
                actionProps: {
                    children: "Success",
                    className: "bg-success text-success-foreground",
                },
                description: "Redirecting to your original page",
            });
        }
        data ? router.push("/") : "";
    };

    if (!mounted) return null;

    return (
        <main className={`relative flex min-h-screen overflow-hidden transition-colors duration-300 ${isLight ? 'bg-gray-50' : 'bg-[#0D0D0D]'
            }`}>
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 transition-all duration-1000 ${isLight
                        ? 'bg-gradient-to-br from-gray-100 via-white to-gray-50'
                        : 'bg-gradient-to-br from-gray-950 via-black to-gray-950'
                    }`} />

                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px]"
                    style={{
                        background: isLight
                            ? 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0) 70%)'
                            : 'radial-gradient(circle, rgba(13,148,136,0.3) 0%, rgba(13,148,136,0) 70%)'
                    }}
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px]"
                    style={{
                        background: isLight
                            ? 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%)'
                            : 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)'
                    }}
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -60, 0],
                        scale: [1.2, 1, 1.2]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px]"
                    style={{
                        background: isLight
                            ? 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0) 70%)'
                            : 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)'
                    }}
                    animate={{
                        scale: [0.8, 1.1, 0.8],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Grid Pattern Overlay */}
                <div className={`absolute inset-0 opacity-5 pointer-events-none ${isLight ? 'bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:40px_40px]' : 'bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]'
                    }`} />
            </div>

            {/* Left Side - Brand Section (Desktop Only) */}
            <section className="relative z-10 hidden lg:flex lg:w-1/2 overflow-hidden flex-col justify-center p-12">
                <div className="max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${isLight ? 'bg-teal-100' : 'bg-teal-500/20'
                            }`}
                    >
                        <span className={`w-2 h-2 rounded-full animate-pulse ${isLight ? 'bg-teal-600' : 'bg-teal-400'}`} />
                        <span className={`text-xs font-semibold ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                            Welcome Back
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`text-6xl md:text-7xl font-extrabold tracking-tight mb-6 transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                            }`}
                    >
                        Welcome
                        <br />
                        <span className="text-teal-500 relative inline-block">
                            Back
                            <svg className="absolute -bottom-2 left-0 w-full" height="4" viewBox="0 0 200 4" fill="none">
                                <path d="M0 2 L200 2" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" className="text-teal-500" />
                            </svg>
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-xl leading-relaxed mb-8 transition-colors duration-300 ${isLight ? 'text-gray-700' : 'text-gray-300'
                            }`}
                    >
                        Sign in to access your premium account and continue your journey with excellence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-6"
                    >
                        <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${isLight ? 'bg-white/50 backdrop-blur-sm' : 'bg-white/5 backdrop-blur-sm'
                            }`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLight ? 'bg-teal-100' : 'bg-teal-500/20'
                                }`}>
                                <Speedometer className={`h-6 w-6 ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
                            </div>
                            <div>
                                <p className={`font-bold text-lg ${isLight ? 'text-gray-900' : 'text-white'}`}>500+</p>
                                <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Premium Vehicles</p>
                            </div>
                        </div>
                        <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${isLight ? 'bg-white/50 backdrop-blur-sm' : 'bg-white/5 backdrop-blur-sm'
                            }`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLight ? 'bg-teal-100' : 'bg-teal-500/20'
                                }`}>
                                <ShieldCheck className={`h-6 w-6 ${isLight ? 'text-teal-600' : 'text-teal-500'}`} />
                            </div>
                            <div>
                                <p className={`font-bold text-lg ${isLight ? 'text-gray-900' : 'text-white'}`}>24/7</p>
                                <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Customer Support</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Right Side - Login Form */}
            <section className="relative z-10 flex w-full items-center justify-center px-6 py-16 lg:py-24 lg:w-1/2">
                {/* Form Background Glow */}
                <div className={`absolute h-[500px] w-[500px] rounded-full blur-3xl transition-colors duration-300 ${isLight ? 'bg-teal-500/10' : 'bg-teal-500/5'
                    }`} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`relative z-10 w-full max-w-[520px] rounded-2xl border p-8 shadow-2xl transition-all duration-300 md:p-12 backdrop-blur-xl ${isLight
                            ? 'bg-white/80 border-gray-200 shadow-gray-200'
                            : 'bg-black/40 border-white/10'
                        }`}
                >
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isLight ? 'bg-teal-600' : 'bg-teal-500'
                                }`}
                        >
                            <FaCar className="text-2xl text-white" />
                        </motion.div>
                        <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${isLight ? 'text-gray-900' : 'text-white'
                            }`}>
                            Welcome Back
                        </h2>
                        <p className={`mt-2 text-sm transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                            Sign in to your premium account
                        </p>
                    </div>

                    {/* Login Form */}
                    <Form
                        className="flex w-full flex-col gap-5"
                        onSubmit={onSubmit}
                    >
                        {/* Email */}
                        <TextField
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
                            <Label className={isLight ? 'text-gray-700 font-semibold' : 'text-gray-300 font-semibold'}>
                                Email Address
                            </Label>
                            <Input
                                placeholder="john@example.com"
                                className={`rounded-xl border transition-all duration-300 focus:ring-2 h-12 ${isLight
                                        ? 'border-gray-200 bg-white focus:border-teal-500 focus:ring-teal-500/20'
                                        : 'border-white/10 bg-black/30 focus:border-teal-500 focus:ring-teal-500/20'
                                    }`}
                            />
                            <FieldError />
                        </TextField>

                        {/* Password */}
                        <TextField
                            isRequired
                            name="password"
                            type={showPassword ? "text" : "password"}
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
                            <Label className={isLight ? 'text-gray-700 font-semibold' : 'text-gray-300 font-semibold'}>
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    className={`rounded-xl border transition-all duration-300 focus:ring-2 h-12 pr-10 ${isLight
                                            ? 'border-gray-200 bg-white focus:border-teal-500 focus:ring-teal-500/20'
                                            : 'border-white/10 bg-black/30 focus:border-teal-500 focus:ring-teal-500/20'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isLight ? 'text-gray-500 hover:text-gray-700' : 'text-gray-400 hover:text-gray-200'
                                        }`}
                                >
                                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                            <Description className="text-xs">
                                Must be at least 8 characters with 1 uppercase and 1 number
                            </Description>
                            <FieldError />
                        </TextField>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link
                                href="/forgot-password"
                                className={`text-xs transition-colors ${isLight ? 'text-teal-600 hover:text-teal-700' : 'text-teal-400 hover:text-teal-300'
                                    }`}
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className={`mt-2 w-full rounded-xl py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${isLight
                                    ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-500/25'
                                    : 'bg-teal-500 text-white hover:bg-teal-600 shadow-teal-500/25'
                                }`}
                        >
                            Sign In
                        </motion.button>
                    </Form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className={`h-px flex-1 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
                        <span className={`text-xs uppercase tracking-widest ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                            Or continue with
                        </span>
                        <div className={`h-px flex-1 ${isLight ? 'bg-gray-200' : 'bg-white/10'}`} />
                    </div>

                    {/* Google Sign In Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={googleAuth}
                        type="button"
                        className={`flex w-full items-center justify-center gap-3 rounded-xl border py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${isLight
                                ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                : 'border-white/10 bg-transparent text-white hover:bg-white/5'
                            }`}
                    >
                        <FaGoogle className="h-5 w-5 text-red-500" />
                        Google
                    </motion.button>

                    {/* Sign Up Link */}
                    <p className={`mt-6 text-center text-sm transition-colors duration-300 ${isLight ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                        Don't have an account?{' '}
                        <Link href="/register" className="text-teal-500 hover:text-teal-600 font-semibold transition-colors">
                            Create Account
                        </Link>
                    </p>
                </motion.div>
            </section>
        </main>
    );
}