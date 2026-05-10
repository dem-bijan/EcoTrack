"use client";

import { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function RecommendationsList({ token, email }: { token: string | undefined, email: string }) {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    // 1. Fetch Logic
    const fetchRecommendations = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/recommendations", {
                headers: { 'Authorization': `Bearer ${token}` },
                cache: "no-store"
            });
            if (res.ok) {
                const data = await res.json();
                setRecommendations(data);
            }
        } catch (err) {
            console.error("error fetching recommendations", err);
        }
    };
    // 2. Fetch on Load
    useEffect(() => {
        if (token) fetchRecommendations();
    }, [token]);
    // 3. Listen to WebSockets
    useEffect(() => {
        if (!email) return;
        const stompClient = new Client({
            // Make sure this URL matches what you used in LiveActivityTable!
            webSocketFactory: () => new SockJS("http://localhost:8080/websocket"),
            onConnect: () => {
                stompClient.subscribe(`/topic/updates/${email}`, (message) => {
                    if (message.body === "REFETCH_RECS") {
                        console.log("AI created recommendation! Fetching new data...");
                        fetchRecommendations();
                    }
                });
            }
        });
        stompClient.activate();
        return () => { stompClient.deactivate(); };
    }, [email]);
    // UI Logic
    const visibleRecs = isExpanded ? recommendations : recommendations.slice(0, 2);
    const hasMore = recommendations.length > 2;
    // Empty State Handling
    if (recommendations.length === 0) {
        return (
            <div className="p-6 text-slate-500 text-sm border border-dashed border-white/10 rounded-xl text-center">
                No AI insights yet
            </div>
        );
    }


    return (
        <div className="space-y-4">
            <AnimatePresence initial={false}>
                {visibleRecs.map((rec) => (
                    <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <RecommendationCard rec={rec} />
                    </motion.div>
                ))}
            </AnimatePresence>



            {hasMore && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full py-3 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 hover:text-emerald-400 uppercase tracking-[0.2em] transition-all border border-white/5 rounded-xl hover:bg-white/5"
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp className="w-3 h-3" /></>
                    ) : (
                        <>See All ({recommendations.length}) <ChevronDown className="w-3 h-3" /></>
                    )}
                </button>
            )}
        </div>
    );
}
