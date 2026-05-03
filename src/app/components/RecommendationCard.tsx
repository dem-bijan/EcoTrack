import { Lightbulb, Car, Leaf, Utensils } from "lucide-react";

const iconMap: Record<string, any> = {
    transport: Car,
    energy: Lightbulb,
    food: Utensils,
    default: Leaf
};

export default function RecommendationCard({ rec }: { rec: any }) {
    const Icon = iconMap[rec.actionType] || iconMap.default;

    return (
        <div className="panel p-5 rounded-2xl group relative overflow-hidden transition-all hover:border-emerald-500/30">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 blur-2xl rounded-full group-hover:bg-emerald-500/10 transition-all" />

            <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                    <Icon className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        {rec.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {rec.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                -{rec.estimatedImpact}t CO2/yr
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${rec.difficultyLevel === 'easy' ? 'text-blue-400 bg-blue-400/10' : 'text-amber-400 bg-amber-400/10'
                                }`}>
                                {rec.difficultyLevel}
                            </span>
                        </div>
                        <button className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
                            START →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
