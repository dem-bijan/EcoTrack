import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import ProfileImageUploader from "@/app/components/ProfileImageUploader";
import EmailVerification from "@/app/components/EmailVerification";
import ModifSettings from "@/app/components/ModifSettings";
import { Settings, Shield, User as UserIcon, Bell } from "lucide-react";

export default async function SettingsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt_token')?.value;

    if (!token) { redirect("/login"); }

    const springResponse = await fetch("http://localhost:8080/api/users/me", {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store"
    });

    if (!springResponse.ok) { redirect("/login"); }

    const userData = await springResponse.json();

    async function logoutAction() {
        "use server";
        const cookieStore = await cookies();
        cookieStore.delete("jwt_token");
        redirect("/login");
    }

    const sidebarItems = [
        { icon: UserIcon, label: 'Account', active: true },
        { icon: Shield, label: 'Security', active: false },
        { icon: Bell, label: 'Alerts', active: false, disabled: true },
    ];

    return (
        <div className="min-h-screen w-full font-sans selection:bg-emerald-500/20 pb-24">
            <div className="w-[90vw] m-auto"><Navbar logoutAction={logoutAction} /></div>

            <main className="max-w-7xl mx-auto px-6 md:px-8 pt-10">

                {/* ── Page Header ─────────────────────────────────── */}
                <div className="grid mb-8 pt-6 border-b border-white/5 pb-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
                        <Settings className="w-3 h-3 text-emerald-400" />
                        System Preferences
                    </p>

                    <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
                        Configuration
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ── Sidebar ─────────────────────────────────── */}
                    <div className="lg:col-span-3">
                        <div className="panel rounded-2xl p-2 space-y-1">
                            {sidebarItems.map((item) => {
                                const Icon = item.icon;
                                if (item.disabled) {
                                    return (
                                        <div key={item.label}
                                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-not-allowed opacity-30"
                                        >
                                            <Icon className="w-3.5 h-3.5 text-slate-500" />
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</span>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={item.label}
                                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${item.active
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Main Content ─────────────────────────────── */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* Profile Picture */}
                        <section className="panel panel-accent rounded-2xl p-7 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.025] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
                                <UserIcon className="w-48 h-48 text-emerald-500" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] mb-1 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Identity Profile
                                </h2>
                                <p className="text-xs text-slate-500 mb-7 max-w-sm leading-relaxed">
                                    Your visual identifier in the EcoTrack network. Processed via MongoDB Cloud.
                                </p>
                                <ProfileImageUploader />
                            </div>
                        </section>

                        {/* Email Verification */}
                        <section className="panel rounded-2xl p-6">
                            <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] mb-5">
                                Verification Status
                            </h2>
                            <EmailVerification isVerified={userData.emailVerified} />
                        </section>

                        {/* Account Data */}
                        <ModifSettings user={userData} />

                    </div>
                </div>
            </main>
        </div>
    );
}
