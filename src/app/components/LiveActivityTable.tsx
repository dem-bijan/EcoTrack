"use client";
import { Clock, Sparkles, ArrowUpRight } from "lucide-react";
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


interface Activity {
    description: string;
    activityCategory: string;
    activityDate: string;
    co2Impact: number;
}

export default function LiveActivityTable({ token, email }: { token: string | undefined, email: string }) {

    const [activities, setActivities] = useState<Activity[]>([]);


    const fetchActivities = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/activities/me", {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: "no-store"
            })
            if (res.ok) {
                const activities = res.ok ? await res.json() : [];
                setActivities(activities)
            }
        }
        catch (err) {
            console.error("error fetching data", err)
        }
    }
    useEffect(() => {
        if (token) fetchActivities()
    }, [token])

    useEffect(() => {
        if (!email) return;

        const stompClient = new Client({
            webSocketFactory: () => new
                SockJS("http://localhost:8080/websocket"),
            onConnect: () => {
                console.log("connected to websocket")
                stompClient.subscribe(`/topic/updates/${email}`,
                    (message) => {
                        if (message.body === "REFETCH_ACTS") {
                            console.log("AI updated activities! Fetching new data...");
                            fetchActivities()
                        }
                    })
            }
        })
        stompClient.activate();
        return () => {
            stompClient.deactivate()
        }
    }, [email])

    return (
        <div className="panel rounded-3xl overflow-hidden bg-slate-950/20 border border-white/5 backdrop-blur-xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <h2 className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">
                        Environmental Audit Log
                    </h2>
                </div>
                <button className="text-[10px] font-bold text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1 uppercase tracking-widest">
                    Export <ArrowUpRight className="w-3 h-3" />
                </button>
            </div>

            <div className="overflow-x-auto overflow-y-auto max-h-[350px] custom-scrollbar">
                <table className="w-full text-left border-collapse relative">
                    <thead className="sticky top-0 bg-[#0d1117]/95 backdrop-blur-md z-10 shadow-sm shadow-white/5">
                        <tr className="bg-white/[0.01]">
                            <th className="py-4 px-6 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Timestamp</th>
                            <th className="py-4 px-6 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Event Description</th>
                            <th className="py-4 px-6 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Classification</th>
                            <th className="py-4 px-6 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] text-right">Delta (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.length > 0 ? (
                            activities.map((act, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={i}
                                    className="group hover:bg-white/[0.02] transition-colors border-t border-white/[0.02]"
                                >
                                    <td className="py-4 px-6">
                                        <span className="text-[10px] font-mono text-slate-600">
                                            {new Date(act.activityDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors">
                                            {act.description}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5 uppercase tracking-tighter group-hover:border-emerald-500/20 group-hover:text-emerald-500/80 transition-all">
                                            {act.activityCategory}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <span className={`text-[11px] font-mono font-bold ${act.co2Impact > 0 ? 'text-amber-500/80' : 'text-emerald-500/80'}`}>
                                            {act.co2Impact > 0 ? `+${act.co2Impact}` : act.co2Impact}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-20 text-center">
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
                                        Buffer Empty. No events detected.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
