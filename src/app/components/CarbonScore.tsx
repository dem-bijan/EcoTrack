"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Zap, ShieldCheck } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";


export default function CarbonScore({ token, email }: { token: string | undefined, email: string }) {
    const [score, setScore] = useState<number>(0);
    const [efficiency, setEfficiency] = useState<string>("0.0");
    const fetchScore = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/CarbonFootprints/me", {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: "no-store"
            });
            if (res.ok) {
                const data = await res.json();
                setScore(data);

                // Correct Mathematical Efficiency Calculation!
                const eff = (((8.5 - data) / 8.5) * 100).toFixed(1);
                setEfficiency(eff);
            }
        } catch (err) {
            console.error("Error fetching score:", err);
        }
    };
    useEffect(() => {
        if (token) fetchScore();
    }, [token]);
    useEffect(() => {
        if (!email) return;
        const stompClient = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/websocket"),
            onConnect: () => {
                stompClient.subscribe(`/topic/updates/${email}`, (message) => {
                    // We can reuse the REFETCH_TRENDS ping since they update at the exact same time!
                    if (message.body === "REFETCH_TRENDS" || message.body === "REFETCH_SCORE") {
                        console.log("Footprint updated! Recalculating gauge...");
                        fetchScore();
                    }
                });
            }
        });
        stompClient.activate();
        return () => { stompClient.deactivate(); };
    }, [email]);


    // Determine color based on score (Lower is better)
    const getColor = (s: number) => {
        if (s < 2.5) return "text-emerald-400";
        if (s < 5.0) return "text-amber-400";
        return "text-red-400";
    };

    const getBg = (s: number) => {
        if (s < 2.5) return "bg-emerald-500/10";
        if (s < 5.0) return "bg-amber-500/10";
        return "bg-red-500/10";
    };


    return (
        <div className="relative group">
            {/* Ambient background glow */}
            <div className={`absolute -inset-1 rounded-[2.5rem] blur-2xl opacity-20 transition-all duration-500 group-hover:opacity-30 ${getBg(score)}`} />

            <div className="relative panel p-10 rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-950/40 backdrop-blur-3xl">
                {/* Decorative grid pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: The Score */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getBg(score)}`}>
                                <ShieldCheck className={`w-5 h-5 ${getColor(score)}`} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                                Environmental Integrity Score
                            </span>
                        </div>

                        <div className="space-y-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-baseline gap-4"
                            >
                                <span className={`text-8xl font-black tracking-tighter ${getColor(score)}`}>
                                    {score.toFixed(2)}
                                </span>
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                                    tCO₂e
                                </span>
                            </motion.div>
                            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                                Your current footprint is <span className="text-white font-bold">12% lower</span> than the regional average.
                            </p>
                        </div>

                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Status</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-bold text-white uppercase">Optimal</span>
                                </div>
                            </div>
                            <div className="h-8 w-[1px] bg-white/5" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Impact Rank</span>
                                <span className="text-xs font-bold text-white uppercase font-mono">#142 Globally</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Visual Progress / Gauge */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative w-64 h-64">
                            {/* Inner Circle Glow */}
                            <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${getBg(score)}`} />

                            {/* Main Gauge Circle */}
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                <circle
                                    className="text-white/5"
                                    strokeWidth="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="42"
                                    cx="50"
                                    cy="50"
                                />
                                <motion.circle
                                    className={getColor(score)}
                                    strokeWidth="8"
                                    strokeDasharray="264"
                                    initial={{ strokeDashoffset: 264 }}
                                    animate={{ strokeDashoffset: 264 - (264 * Math.min(score / 8.5, 1)) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="42"
                                    cx="50"
                                    cy="50"
                                />
                            </svg>

                            {/* Center Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <Zap className={`w-8 h-8 mb-2 ${getColor(score)}`} />
                                <span className="text-xs font-bold text-white uppercase tracking-widest">Efficiency</span>
                                <span className={`text-2xl font-black font-mono ${getColor(score)}`}>{Number(efficiency) > 0 ? "+" : ""}{efficiency}%</span>
                            </div>
                        </div>

                        {/* Floating Labels */}
                        <div className="absolute top-0 right-0 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <TrendingDown className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-bold text-white">-0.4t this month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
