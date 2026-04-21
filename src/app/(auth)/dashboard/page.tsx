import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileImage from "@/app/components/ProfileImage";

export default async function DashboardPage() {
    // 1. SECURE SERVER INQUIRY
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt_token')?.value;

    if (!token) {
        redirect("/login");
    }

    async function logoutAction() {
        "use server";
        const cookieStore = await cookies();
        cookieStore.delete("jwt_token");
        redirect("/login");
    }

    // MOCK DATA
    const user = {
        fullName: "John Developer",
        location: "New York, USA",
        profile: {
            housingType: "Apartment",
            householdSize: 2,
            dietType: "Vegetarian",
            vehicleType: "Electric (EV)",
            annualMileage: "8,000 km",
            energySource: "100% Renewable",
        },
        footprint: {
            total: "4.2", // Tons CO2e
            avgLocal: "8.5",
        },
        recentActivities: [
            { id: "act_101", title: "Train commute (Round trip)", category: "Transport", impact: "-2.10 kg", date: "2026-04-19 08:30:00" },
            { id: "act_102", title: "Plant-based meal substitution", category: "Food", impact: "-4.50 kg", date: "2026-04-18 19:15:22" },
            { id: "act_103", title: "Installed LED lighting", category: "Housing", impact: "-10.00 kg", date: "2026-04-15 14:00:10" },
            { id: "act_104", title: "Public transit monthly pass", category: "Transport", impact: "-15.20 kg", date: "2026-04-01 09:12:05" }
        ]
    };

    return (
        <div className="min-h-screen bg-[#030304] text-slate-300 font-sans selection:bg-emerald-500/30">
            {/* Minimalist Top Navigation */}
            <nav className="flex items-center justify-between px-6 py-4 bg-[#0B0D0E] border-b border-[#2D3033] sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-emerald-500 rounded-sm"></div>
                        <span className="text-sm font-semibold tracking-wide text-white">EcoTrack</span>
                    </Link>
                    <ProfileImage />
                    <div className="h-4 w-px bg-[#2D3033]"></div>
                    <div className="flex gap-4 text-sm font-medium">
                        <span className="text-white">Overview</span>
                        <span className="text-slate-500 hover:text-slate-400 cursor-not-allowed">Metrics</span>
                        <span className="text-slate-500 hover:text-slate-400 cursor-not-allowed">Integrations</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 hidden md:block">Region: us-east-1</span>
                    <form action={logoutAction}>
                        <button type="submit" className="text-xs font-semibold px-3 py-1.5 border border-[#2D3033] hover:border-slate-500 rounded bg-[#101214] transition-colors">
                            Sign Out
                        </button>
                    </form>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-6 md:p-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#2D3033]">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Project Overview</h1>
                        <p className="text-sm text-slate-400">Monitoring footprint activity for <span className="font-mono text-emerald-400">{user.fullName}</span> in {user.location}.</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-3">
                        <button className="text-xs font-semibold px-4 py-2 border border-[#2D3033] rounded bg-transparent hover:bg-[#101214] transition-colors">
                            Export Data
                        </button>
                        <Link href="/settings" className="text-xs font-semibold px-4 py-2 bg-emerald-500 text-slate-950 rounded hover:bg-emerald-400 transition-colors">
                            Configure Settings
                        </Link>
                    </div>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#0B0D0E] border border-[#2D3033] rounded-lg p-5 flex flex-col justify-between h-32">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total CO2 Impact</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-white">{user.footprint.total}</span>
                            <span className="text-sm text-slate-500 font-mono">Tons</span>
                        </div>
                    </div>
                    <div className="bg-[#0B0D0E] border border-[#2D3033] rounded-lg p-5 flex flex-col justify-between h-32">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Performance vs Average</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-emerald-500">-51%</span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">Local average: {user.footprint.avgLocal} t</span>
                    </div>
                    <div className="bg-[#0B0D0E] border border-[#2D3033] rounded-lg p-5 flex flex-col justify-between h-32">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Storage / Activities</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-white">{user.recentActivities.length}</span>
                            <span className="text-sm text-slate-500 font-mono">Logs</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Activity Table (Takes up 2/3 width) */}
                    <div className="lg:col-span-2">
                        <h2 className="text-sm font-semibold text-white mb-4">Recent Transactions</h2>
                        <div className="bg-[#0B0D0E] border border-[#2D3033] rounded-lg overflow-hidden">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead className="bg-[#101214] border-b border-[#2D3033]">
                                    <tr>
                                        <th className="py-3 px-4 font-semibold text-slate-400 text-xs tracking-wider uppercase">ID</th>
                                        <th className="py-3 px-4 font-semibold text-slate-400 text-xs tracking-wider uppercase">Description</th>
                                        <th className="py-3 px-4 font-semibold text-slate-400 text-xs tracking-wider uppercase">Category</th>
                                        <th className="py-3 px-4 font-semibold text-slate-400 text-xs tracking-wider uppercase">Timestamp</th>
                                        <th className="py-3 px-4 font-semibold text-slate-400 text-xs tracking-wider uppercase text-right">Impact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.recentActivities.map((act, index) => (
                                        <tr key={index} className="border-b border-[#1F2224] hover:bg-[#15181A] transition-colors">
                                            <td className="py-3 px-4 font-mono text-xs text-slate-500">{act.id}</td>
                                            <td className="py-3 px-4 text-slate-300">{act.title}</td>
                                            <td className="py-3 px-4">
                                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono border border-[#2D3033] bg-[#101214] text-slate-400">
                                                    {act.category}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 font-mono text-xs text-slate-500">{act.date}</td>
                                            <td className="py-3 px-4 font-mono text-xs text-emerald-400 text-right">{act.impact}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Settings Panel (Takes up 1/3 width) */}
                    <div className="col-span-1">
                        <h2 className="text-sm font-semibold text-white mb-4">Configuration Profile</h2>
                        <div className="bg-[#0B0D0E] border border-[#2D3033] rounded-lg">
                            <div className="flex flex-col">
                                {[
                                    { label: "Location", val: user.location },
                                    { label: "Housing Setup", val: user.profile.housingType },
                                    { label: "Household Size", val: String(user.profile.householdSize) },
                                    { label: "Diet Type", val: user.profile.dietType },
                                    { label: "Vehicle Type", val: user.profile.vehicleType },
                                    { label: "Annual Mileage", val: user.profile.annualMileage },
                                    { label: "Energy Source", val: user.profile.energySource },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 px-4 border-b border-[#1F2224] last:border-0 hover:bg-[#15181A] transition-colors">
                                        <span className="text-sm text-slate-400">{item.label}</span>
                                        <span className="text-sm font-medium text-slate-200">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations Alert Box */}
                        <div className="mt-6 bg-[#00E599]/10 border border-[#00E599]/20 rounded-lg p-5">
                            <h3 className="text-[#00E599] font-semibold text-sm mb-2 flex items-center gap-2">
                                <span className="block w-2 h-2 bg-[#00E599] rounded-full"></span>
                                Optimization Available
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed font-mono">
                                Action: Decrease grid dependency. Switching to 100% renewable energy will drastically alter baseline footprint constraints.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
