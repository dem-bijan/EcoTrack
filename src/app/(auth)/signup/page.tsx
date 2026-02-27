"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from 'react-type-animation';
import axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = React.useState({ fullName: "", email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/users";
            await axios.post(API_URL, {
                fullName: formData.fullName,
                email: formData.email,
                passwordHash: formData.password
            });
            router.push("/signup/success");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent">
            {/* Navigation Back */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-slate-900">E</span>
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        EcoTrack
                    </span>
                </Link>
            </nav>

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold font-outfit mb-2">Join the <span className="animated-gradient-text">Movement</span></h1>
                    <p className="text-slate-400 font-medium">Create an account and start making an impact today.</p>
                </div>

                <div className="glass-card rounded-[2.5rem] p-10 border-white/10 shadow-2xl relative">
                    {/* Subtle glow effect */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/20 blur-[80px] rounded-full" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[80px] rounded-full" />

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full h-12 bg-slate-900/50 border border-white/10 rounded-xl px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 placeholder:text-slate-600"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full h-12 bg-slate-900/50 border border-white/10 rounded-xl px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 placeholder:text-slate-600"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full h-12 bg-slate-900/50 border border-white/10 rounded-xl px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 placeholder:text-slate-600"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-300 ml-1">Confirm Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full h-12 bg-slate-900/50 border border-white/10 rounded-xl px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 placeholder:text-slate-600"
                            />
                        </div>

                        <div className="flex items-start gap-2 px-1 py-2">
                            <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-white/10 bg-slate-900 text-emerald-500 focus:ring-emerald-500/50" required />
                            <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                                I agree to the <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/25 active:scale-95 shadow-lg group mt-4"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                            {!loading && <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <p className="text-slate-400 font-medium">
                            Already have an account?{" "}
                            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Dynamic Typing Message */}
                <div className="mt-8 text-center text-slate-500 font-medium text-sm italic">
                    <TypeAnimation
                        sequence={[
                            'Plant a tree with every sign up.', 2000,
                            'Join a global community.', 2000,
                            'Track your carbon footprint.', 2000,
                        ]}
                        repeat={Infinity}
                    />
                </div>
            </div>
        </div>
    );
}
