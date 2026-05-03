"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
export default function OnBoardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        location: { city: "New York", country: "USA" },
        housingType: "Apartment",
        householdSize: 1,
        dietType: "Omnivore",
        vehicleType: "Gas",
        annualMileage: 10000,
        energySource: "Grid",
        preferences: { theme: "dark" } // Translates flawlessly to Postgres JSONB!
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/profile", formData);
            if (response.status === 200) {
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to save profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent">
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-slate-900">E</span>
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight font-outfit text-white">EcoTrack</span>
                </Link>
            </nav>
            <div className="relative z-10 w-full max-w-md mt-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold font-outfit mb-2 text-white">Let's calculate your <span className="text-emerald-400">Impact</span></h1>
                    <p className="text-slate-400 font-medium">Step {step} of 2 - Personalize your tracking.</p>
                </div>
                <div className="glass-card rounded-[2.5rem] p-10 border-white/10 shadow-2xl relative">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/20 blur-[80px] rounded-full" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[80px] rounded-full" />
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-bold">
                            {error}
                        </div>
                    )}
                    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>

                        {/* STEP 1 CONDITIONAL RENDERING */}
                        {step === 1 && (
                            <div className="space-y-5 animate-[fadeIn_0.5s_ease-out]">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">What best describes your housing?</label>
                                    <select
                                        value={formData.housingType}
                                        onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
                                        className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 text-slate-300 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                    >
                                        <option value="Apartment">Apartment</option>
                                        <option value="House">House</option>
                                        <option value="Condo">Condo / Townhouse</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">City</label>
                                    <input type="text" placeholder="London" value={formData.location.city} onChange={(e) => setFormData(
                                        { ...formData, location: { ...formData.location, city: e.target.value } }
                                    )} className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 text-slate-300 focus:ring-2 focus:ring-emerald-500/50 transition-all">
                                    </input>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Household Size</label>
                                    <input
                                        type="number" min="1" max="20"
                                        value={formData.householdSize}
                                        onChange={(e) => setFormData({ ...formData, householdSize: parseInt(e.target.value) })}
                                        className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 text-slate-300 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Diet Type</label>
                                    <select
                                        value={formData.dietType}
                                        onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
                                        className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 text-slate-300 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                    >
                                        <option value="Omnivore">Omnivore (Meat & Plants)</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                    </select>
                                </div>
                                <button type="button" onClick={() => setStep(2)} className="w-full h-14 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold rounded-2xl transition-all">
                                    Next Step →
                                </button>
                            </div>
                        )}
                        {/* STEP 2 CONDITIONAL RENDERING */}
                        {step === 2 && (
                            <div className="space-y-5 animate-[fadeIn_0.5s_ease-out]">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Primary Vehicle Type</label>
                                    <select
                                        value={formData.vehicleType}
                                        onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                                        className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 text-slate-300 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                    >
                                        <option value="Gas">Gasoline / Diesel</option>
                                        <option value="Electric">Fully Electric (EV)</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="None">I don't drive (Public Transit / Bike)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Annual Mileage Tracking (km)</label>
                                    <input
                                        type="number" min="0" step="1000"
                                        value={formData.annualMileage}
                                        onChange={(e) => setFormData({ ...formData, annualMileage: parseInt(e.target.value) })}
                                        className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 text-slate-300 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Home Energy Source</label>
                                    <select
                                        value={formData.energySource}
                                        onChange={(e) => setFormData({ ...formData, energySource: e.target.value })}
                                        className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 text-slate-300 focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                    >
                                        <option value="Grid">Standard Grid Power</option>
                                        <option value="Mixed">Mixed (Some Solar/Wind)</option>
                                        <option value="Renewable">100% Renewable</option>
                                    </select>
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <button type="button" onClick={() => setStep(1)} className="w-1/3 h-14 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all">
                                        ← Back
                                    </button>
                                    <button type="submit" disabled={loading} className="w-2/3 h-14 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95">
                                        {loading ? "Generating Profile..." : "Complete Profile ✓"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );



}