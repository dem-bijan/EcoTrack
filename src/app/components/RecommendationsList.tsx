"use client";

import { useState } from "react";
import RecommendationCard from "./RecommendationCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecommendationsList({ recommendations }: { recommendations: any[] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Logic: If collapsed, only show 2. If expanded, show all.
    const visibleRecs = isExpanded ? recommendations : recommendations.slice(0, 2);
    const hasMore = recommendations.length > 2;

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
