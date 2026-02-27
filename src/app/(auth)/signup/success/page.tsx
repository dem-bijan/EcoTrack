"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from 'react-type-animation';

export default function SignupSuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent">
            {/* Top Navigation Back */}
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

                <div className="glass-card rounded-[2.5rem] p-10 border-white/10 shadow-2xl relative flex flex-col items-center text-center">
                    {/* Subtle glow effect */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/20 blur-[80px] rounded-full" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[80px] rounded-full" />


                    {/* Animated Checkmark Icon */}
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 relative z-10 animate-[bounce_1s_ease-in-out_1]">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-950 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold font-outfit mb-4 text-white relative z-10">
                        Welcome to the <span className="animated-gradient-text">Movement</span>
                    </h1>

                    <p className="text-slate-400 font-medium mb-8 leading-relaxed relative z-10">
                        Your account has been created successfully. A verification link has been sent to your email address.
                    </p>

                    <button
                        onClick={() => router.push('/login')}
                        className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/25 active:scale-95 shadow-lg group relative z-10"
                    >
                        Proceed to Login
                        <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                    </button>

                    <div className="mt-6 text-sm">
                        <Link href="/" className="text-slate-400 hover:text-emerald-400 font-medium transition-colors relative z-10">
                            Return to Homepage
                        </Link>
                    </div>

                </div>

                {/* Dynamic Typing Message */}
                <div className="mt-8 text-center text-slate-500 font-medium text-sm italic">
                    <TypeAnimation
                        sequence={[
                            'Your journey for a greener earth begins now.', 3000,
                            'Check your inbox to verify your account.', 3000,
                        ]}
                        repeat={Infinity}
                    />
                </div>
            </div>
        </div>
    );
}
