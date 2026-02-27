import Image from "next/image";

interface LeaderboardEntry {
    id: string;
    userName: string;
    avatarUrl: string | null;
    score: number;
    impact: string;
    rank: number;
}

interface LeaderBoardProps {
    entries?: LeaderboardEntry[];
}

export default function LeaderBoard({ entries = [] }: LeaderBoardProps) {
    const rank1 = entries.find(e => e.rank === 1);
    const rank2 = entries.find(e => e.rank === 2);
    const rank3 = entries.find(e => e.rank === 3);
    const rest = entries.filter(e => e.rank > 3);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col items-center gap-12">
            <h2 className="text-4xl font-bold text-white mb-4 text-shadow-lg">Impact Leaderboard</h2>

            {/* Podium Section */}
            <div className="flex flex-col md:flex-row items-end justify-center gap-4 w-full h-[500px] md:h-[400px]">
                {/* 2nd Place - Silver */}
                {rank2 && (
                    <div className="flex-1 flex flex-col items-center w-full md:w-auto order-2 md:order-1 h-3/4">
                        <div className="relative w-20 h-20 mb-4 ring-4 ring-gray-300 rounded-full overflow-hidden shadow-xl">
                            <Image src={rank2.avatarUrl || "/johnson.jpg"} alt={rank2.userName} fill className="object-cover" />
                        </div>
                        <div className="w-full bg-gradient-to-t from-gray-500/80 to-gray-300/40 backdrop-blur-md rounded-t-2xl p-6 flex flex-col items-center justify-between flex-1 shadow-2xl border-x border-t border-white/20">
                            <div className="text-center">
                                <p className="text-white font-bold text-xl">{rank2.userName}</p>
                                <p className="text-gray-200 text-sm">{rank2.impact}</p>
                            </div>
                            <div className="text-3xl font-black text-gray-100 mt-4">{rank2.score} pts</div>
                        </div>
                    </div>
                )}

                {/* 1st Place - Gold */}
                {rank1 && (
                    <div className="flex-1 flex flex-col items-center w-full md:w-auto order-1 md:order-2 h-full z-10 scale-105 md:scale-110">
                        <div className="relative w-24 h-24 mb-4 ring-4 ring-yellow-400 rounded-full overflow-hidden shadow-2xl">
                            <Image src={rank1.avatarUrl || "/george.jpg"} alt={rank1.userName} fill className="object-cover" />
                        </div>
                        <div className="w-full bg-gradient-to-t from-yellow-600/80 to-yellow-400/40 backdrop-blur-md rounded-t-2xl p-8 flex flex-col items-center justify-between flex-1 shadow-[0_-20px_50px_rgba(234,179,8,0.3)] border-x border-t border-yellow-200/30">
                            <div className="text-center">
                                <p className="text-white font-bold text-2xl">{rank1.userName}</p>
                                <p className="text-yellow-100 text-sm">{rank1.impact}</p>
                            </div>
                            <div className="text-4xl font-black text-white mt-4">{rank1.score} pts</div>
                        </div>
                    </div>
                )}

                {/* 3rd Place - Bronze */}
                {rank3 && (
                    <div className="flex-1 flex flex-col items-center w-full md:w-auto order-3 md:order-3 h-2/3">
                        <div className="relative w-20 h-20 mb-4 ring-4 ring-orange-400 rounded-full overflow-hidden shadow-xl">
                            <Image src={rank3.avatarUrl || "/allan.jpg"} alt={rank3.userName} fill className="object-cover" />
                        </div>
                        <div className="w-full bg-gradient-to-t from-orange-700/80 to-orange-500/40 backdrop-blur-md rounded-t-2xl p-6 flex flex-col items-center justify-between flex-1 shadow-2xl border-x border-t border-white/20">
                            <div className="text-center">
                                <p className="text-white font-bold text-xl">{rank3.userName}</p>
                                <p className="text-orange-100 text-sm">{rank3.impact}</p>
                            </div>
                            <div className="text-3xl font-black text-orange-50 mt-4">{rank3.score} pts</div>
                        </div>
                    </div>
                )}
            </div>

            {/* List Section */}
            {rest.length > 0 && (
                <div className="w-full max-w-2xl flex flex-col gap-4 mt-8">
                    {rest.map((entry) => (
                        <div key={entry.id} className="bg-cyan-950/40 backdrop-blur-xl rounded-full border border-cyan-500/30 p-2 flex flex-row items-center hover:bg-cyan-900/60 transition-all cursor-pointer group shadow-lg">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden ml-2 group-hover:scale-110 transition-transform">
                                <Image src={entry.avatarUrl || "/johnson.jpg"} alt={entry.userName} fill className="object-cover" />
                            </div>
                            <div className="flex-1 px-6">
                                <p className="text-cyan-50 font-bold text-lg">{entry.userName}</p>
                                <p className="text-cyan-300/80 text-sm">{entry.impact}</p>
                            </div>
                            <div className="pr-8 text-cyan-200 font-black text-xl">
                                {entry.score} <span className="text-xs font-normal">pts</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
