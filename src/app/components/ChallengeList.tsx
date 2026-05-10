"use client"

import { useEffect, useState } from "react";
import { Target, Trophy, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface UserChallenge {
    id: string;
    currentValue: number;
    status: string;
    challenge: {
        title: string;
        description: string;
        targetValue: number;
        difficulty: string;
        category: string;
    }
}


export default function ChallengeList({ token, email }: { token: string | undefined, email: string }) {

    const [challenges, setChallenges] = useState<UserChallenge[]>([]);

    const fetchChallenges = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/challenges/me", {
                headers: { Authorization: `Bearer ${token}` },
                cache: "no-store",
            });
            if (res.ok) {
                const data = await res.json();
                setChallenges(data);
            }
        } catch (error) {
            console.log("Error fetching challenges:" + error);
        }
    };

    useEffect(() => {
        if (token) fetchChallenges();
    }, [token])

    useEffect(() => {
        if (!email) return;

        const stompClient = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/websocket"),
            onConnect: () => {
                stompClient.subscribe(`/topic/updates/${email}`, (message) => {
                    if (message.body === "REFETCH_CHALLENGES") {
                        fetchChallenges();
                    }
                });
            }
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [email]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    Active Quests
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence>
                    {challenges.map((quest) => (
                        <ChallengeCard key={quest.id} quest={quest} token={token} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ChallengeCard({ quest, token }: { quest: UserChallenge, token: string | undefined }) {
    const isProposed = quest.status === "PROPOSED";
    const progress = (quest.currentValue / quest.challenge.targetValue) * 100;
    const acceptChallenge = async () => {
        await fetch(`http://localhost:8080/api/challenges/accept/${quest.challenge.code}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        });
    };
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="panel p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1">{quest.challenge.title}</h3>
                    <p className="text-[10px] text-slate-400 max-w-[80%]">{quest.challenge.description}</p>
                </div>

                {/* Status Badge */}
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${isProposed ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                    {quest.status}
                </span>
            </div>
            {isProposed ? (
                // THE ACCEPT BUTTON
                <button
                    onClick={acceptChallenge}
                    className="w-full mt-2 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest transition-all border border-emerald-500/20"
                >
                    Accept Quest →
                </button>
            ) : (
                // THE PROGRESS BAR
                <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-[9px] font-bold uppercase text-slate-500">
                        <span>Progress</span>
                        <span>{quest.currentValue} / {quest.challenge.targetValue}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );

}