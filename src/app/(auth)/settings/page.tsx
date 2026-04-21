import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileImageUploader from "../../components/ProfileImageUploader";
import EmailVerification from "@/app/components/EmailVerification";

export default async function SettingsPage() {
    // 1. SECURE SERVER INQUIRY
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt_token')?.value;

    if (!token) {
        redirect("/login");
    }

    // LIVE POSTGRES FETCH: This runs completely hidden on your Node Server!
    const springResponse = await fetch("http://localhost:8080/api/users/me", {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store" // Never cache this; always get the freshest database data!
    });

    // If the token is corrupt or the user was deleted in Postgres, kick them out!
    if (!springResponse.ok) {
        redirect("/login");
    }

    // Now 'user' holds the exact JSON properties exactly as Jackson serialized them in Java!
    const user = await springResponse.json();

    return (
        <div className="min-h-screen bg-[#030304] text-slate-300 font-sans selection:bg-emerald-500/30 pb-20">
            {/* Minimalist Top Navigation */}
            <nav className="flex items-center justify-between px-6 py-4 bg-[#0B0D0E] border-b border-[#2D3033] sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-emerald-500 rounded-sm"></div>
                        <span className="text-sm font-semibold tracking-wide text-white">EcoTrack</span>
                    </Link>
                    <div className="h-4 w-px bg-[#2D3033]"></div>
                    <div className="flex gap-4 text-sm font-medium">
                        <Link href="/dashboard" className="text-slate-500 hover:text-slate-300 transition-colors">Overview</Link>
                        <span className="text-white">Settings</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto p-6 md:p-10">
                <div className="mb-8 pb-6 border-b border-[#2D3033]">
                    <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Account Configuration</h1>
                    <p className="text-sm text-slate-400">Manage your profile, security, and application preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                    {/* Settings Sidebar */}
                    <div className="md:col-span-3 flex flex-col gap-2">
                        <span className="px-3 py-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-lg cursor-pointer">General Info</span>
                        <span className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 cursor-pointer">Security</span>
                        <span className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 cursor-pointer">Tracking Profile</span>
                        <span className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 cursor-pointer">Notifications</span>
                    </div>

                    {/* Settings Content Area */}
                    <div className="md:col-span-9 space-y-8">

                        {/* Avatar Section */}
                        <section className="bg-[#0B0D0E] border border-[#2D3033] rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-white mb-1">Avatar</h2>
                            <p className="text-sm text-slate-400 mb-6">This is your avatar from MongoDB Atlas. Click to upload a new one.</p>

                            <div className="flex items-center gap-6">
                                {/* The Component we just built! */}
                                <ProfileImageUploader />
                                <div className="text-xs text-slate-500 max-w-xs">
                                    <p>An avatar is optional but strongly recommended. Two factor authentication must be enabled to change avatars.</p>
                                </div>
                            </div>
                        </section>

                        {/* Name Section */}
                        <section className="bg-[#0B0D0E] border border-[#2D3033] rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-white mb-1">Display Name</h2>
                                <p className="text-sm text-slate-400 mb-4">Please enter your full name, or a display name you are comfortable with.</p>

                                <input
                                    type="text"
                                    defaultValue={user.fullName}
                                    className="w-full max-w-md bg-[#101214] border border-[#2D3033] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <div className="bg-[#15181A] px-6 py-3 border-t border-[#2D3033] flex justify-between items-center">
                                <span className="text-xs text-slate-500">Please use 32 characters at maximum.</span>
                                <button className="text-xs font-semibold px-4 py-2 bg-white text-black rounded hover:bg-slate-200 transition-colors">
                                    Save
                                </button>
                            </div>
                        </section>

                        {/* Email Section */}
                        <section className="bg-[#0B0D0E] border border-[#2D3033] rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-white mb-1">Email Address</h2>
                                <p className="text-sm text-slate-400 mb-4">We will email you to verify your new email address before applying the change.</p>

                                <div className="flex gap-3 max-w-md">
                                    <input
                                        type="email"
                                        defaultValue={user.email}
                                        className="w-full bg-[#101214] border border-[#2D3033] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="bg-[#15181A] px-6 py-3 border-t border-[#2D3033] flex justify-between items-center">
                                <span className="text-xs text-slate-500">You will be logged out upon email change.</span>
                                <button className="text-xs font-semibold px-4 py-2 bg-white text-black rounded hover:bg-slate-200 transition-colors">
                                    Save
                                </button>
                            </div>

                            <EmailVerification isVerified={user.emailVerified}></EmailVerification>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
}
