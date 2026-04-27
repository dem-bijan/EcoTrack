"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileImage from "./ProfileImage";
import { LogOut, LayoutDashboard, Settings, Leaf } from "lucide-react";

export default function Navbar({ logoutAction }: { logoutAction: () => void }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 border-b border-white/10
                bg-emerald-900/30 backdrop-blur-md">

            {/* Left: Logo + Nav Links */}
            <div className="flex items-center gap-5">
                <Link href="/dashboard" className="flex items-center gap-2.5 group">
                    <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.5)] group-hover:scale-110">
                        <Leaf className="w-4 h-4 text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold tracking-tight text-white hidden sm:block">
                        EcoTrack
                    </span>
                </Link>

                {/* Separator */}
                <div className="w-px h-4 bg-white/8 hidden sm:block" />

                {/* Nav Items */}
                <div className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.toLowerCase() === item.href.toLowerCase();
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 ${isActive
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Right: Profile + Logout */}
            <div className="flex items-center gap-2">
                <ProfileImage />
                <button
                    onClick={() => logoutAction()}
                    className="p-2 rounded-md text-slate-600 hover:text-red-400 hover:bg-red-500/8 transition-all duration-150 outline-none"
                    title="Sign Out"
                >
                    <LogOut className="w-3.5 h-3.5" />
                </button>
            </div>
        </nav>
    );
}
