"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from 'react-type-animation';
import axios from "axios";
import { Leaf, ArrowRight, Loader2 } from "lucide-react";

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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/auth/signup";
            await axios.post(API_URL, {
                fullname: formData.fullName,
                email: formData.email,
                passwordhash: formData.password
            });
            router.push("/signup/success");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5">
                <Link href="/" className="inline-flex items-center gap-2 group">
                    <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-emerald-500/20">
                        <Leaf className="w-4 h-4 text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 font-outfit">
                        EcoTrack
                    </span>
                </Link>
            </nav>

            <div className="relative z-10 w-full max-w-sm">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black font-outfit mb-2">
                        Join the <span className="animated-gradient-text">Movement</span>
                    </h1>
                    <p className="text-sm text-slate-500">Create an account and start making an impact.</p>
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-500/15 blur-[60px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-blue-500/15 blur-[60px] rounded-full pointer-events-none" />

                    {error && (
                        <div className="mb-5 p-3.5 rounded-xl text-sm font-medium text-red-400"
                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                        >
                            {error}
                        </div>
                    )}

                    <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                        {[
                            { label: 'Full Name', type: 'text', key: 'fullName', placeholder: 'John Doe' },
                            { label: 'Email', type: 'email', key: 'email', placeholder: 'john@example.com' },
                            { label: 'Password', type: 'password', key: 'password', placeholder: '••••••••' },
                            { label: 'Confirm Password', type: 'password', key: 'confirmPassword', placeholder: '••••••••' },
                        ].map(field => (
                            <div key={field.key} className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-0.5">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    required
                                    placeholder={field.placeholder}
                                    value={formData[field.key as keyof typeof formData]}
                                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                    className="form-input h-12"
                                />
                            </div>
                        ))}

                        <div className="flex items-start gap-2.5 py-1">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-0.5 w-4 h-4 rounded-md border-white/10 bg-slate-900 accent-emerald-500 flex-shrink-0"
                            />
                            <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
                                I agree to the{" "}
                                <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a>{" "}
                                and{" "}
                                <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 btn-primary rounded-xl text-sm font-bold shadow-lg mt-1"
                        >
                            {loading
                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
                                : <>Create Account <ArrowRight className="w-4 h-4" /></>
                            }
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                        <p className="text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Tagline */}
                <p className="mt-7 text-center text-xs text-slate-600 italic">
                    <TypeAnimation
                        sequence={[
                            'Plant a tree with every sign up.', 2500,
                            'Join a global community.', 2500,
                            'Track your carbon footprint.', 2500,
                        ]}
                        repeat={Infinity}
                    />
                </p>
            </div>
        </div>
    );
}
