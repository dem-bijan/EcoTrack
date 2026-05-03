"use client"

import { Award, Star } from "lucide-react"
import { motion } from "framer-motion"

interface Achievement {
    id: string;
    code: string;
    title: string;
    description: string;
    points: number;
}

export default function AchievementsList({ achievements }: { achievements: Achievement[] }) {
    if (achievements.length === 0) return null;
    return (
        <div className="mb-10">
            <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] flex items-center gap-2 mb-4">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Earned Milestones
            </h2>
            <div className="flex flex-wrap gap-4">
                {achievements.map((ach, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
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
            </div>
        </div>
    );
}