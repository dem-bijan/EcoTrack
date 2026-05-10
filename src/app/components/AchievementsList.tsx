"use client"

import { useState, useEffect } from "react"
import { Award, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"

interface Achievement {
    id: string;
    code: string;
    title: string;
    description: string;
    points: number;
}

export default function AchievementsList({ token, email }: { token: string | undefined, email: string }) {
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    const fetchAchievements = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/achievements/me", {
                headers: { Authorization: `Bearer ${token}` },
                cache: "no-store",
            });
            if (res.ok) {
                const data = await res.json();
                setAchievements(data);
            }
        } catch (error) {
            console.log("Error fetching achievements:" + error);
        }
    };

    useEffect(() => {
        if (token) fetchAchievements();
    }, [token])


    useEffect(() => {
        if (!email) return;

        const stompClient = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/websocket"),
            onConnect: () => {
                stompClient.subscribe(`/topic/updates/${email}`, (message) => {
                    if (message.body === "REFETCH_ACHS") {
                        console.log("Achievement unlocked! Refreshing list...");
                        fetchAchievements();
                    }
                });
            }
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [email]);

    if (achievements.length === 0) return null

    return (
        <div className="mb-10">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] flex items-center gap-2 mb-4">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Earned Milestones
            </h2>
            <div className="flex flex-wrap gap-4">
                <AnimatePresence>
                    {achievements.map((ach, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                delay: i * 0.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                            }}
                            key={ach.id}
                            className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default transition-all"
                            style={{
                                background: 'rgba(255,191,0,0.03)',
                                border: '1px solid rgba(255,191,0,0.1)',
                            }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                                <Star className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white leading-tight">{ach.title}</p>
                                <p className="text-[10px] text-amber-500/60 font-medium">{ach.points} pts</p>
                            </div>
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-slate-900 border border-white/10 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-2xl">
                                {ach.description}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}