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

const MEDALS = [
    { rank: 1, label: '#1', ring: '#F59E0B', bg: 'rgba(234,179,8,0.12)', glow: 'rgba(234,179,8,0.2)', tag: '🥇' },
    { rank: 2, label: '#2', ring: '#94A3B8', bg: 'rgba(148,163,184,0.07)', glow: 'rgba(148,163,184,0.1)', tag: '🥈' },
    { rank: 3, label: '#3', ring: '#CD7F32', bg: 'rgba(205,127,50,0.08)', glow: 'rgba(205,127,50,0.1)', tag: '🥉' },
];

export default function LeaderBoard({ entries = [] }: LeaderBoardProps) {
    const rank1 = entries.find(e => e.rank === 1);
    const rank2 = entries.find(e => e.rank === 2);
    const rank3 = entries.find(e => e.rank === 3);
    const rest  = entries.filter(e => e.rank > 3);

    const podiumOrder = [rank2, rank1, rank3];
    const podiumHeights = ['h-48', 'h-64', 'h-40'];
    const podiumMeta = [MEDALS[1], MEDALS[0], MEDALS[2]];

    return (
        <div className="w-full max-w-4xl mx-auto py-8 flex flex-col items-center gap-10">

            {/* ── Podium ─────────────────────────────────────── */}
            <div className="w-full flex items-end justify-center gap-4">
                {podiumOrder.map((entry, i) => {
                    if (!entry) return <div key={i} className="flex-1" />;
                    const meta = podiumMeta[i];
                    return (
                        <div key={entry.id} className="flex-1 flex flex-col items-center gap-3">
                            {/* Avatar */}
                            <div className="relative">
                                <div
                                    className="w-14 h-14 rounded-full overflow-hidden"
                                    style={{
                                        boxShadow: `0 0 0 2px ${meta.ring}, 0 0 20px ${meta.glow}`,
                                    }}
                                >
                                    <Image
                                        src={entry.avatarUrl || "/johnson.jpg"}
                                        alt={entry.userName}
                                        width={56} height={56}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <span className="absolute -bottom-1 -right-1 text-base">{meta.tag}</span>
                            </div>

                            {/* Name / score */}
                            <div className="text-center">
                                <p className="text-sm font-bold text-white">{entry.userName}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{entry.impact}</p>
                            </div>

                            {/* Podium block */}
                            <div
                                className={`w-full ${podiumHeights[i]} rounded-t-2xl flex flex-col items-center justify-end pb-5 transition-all`}
                                style={{
                                    background: meta.bg,
                                    border: `1px solid ${meta.ring}30`,
                                    borderBottom: 'none',
                                }}
                            >
                                <span className="text-2xl font-black" style={{ color: meta.ring }}>
                                    {entry.score}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">pts</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Leaderboard List ────────────────────────────── */}
            {rest.length > 0 && (
                <div className="w-full max-w-2xl space-y-2">
                    {rest.map((entry, i) => (
                        <div
                            key={entry.id}
                            className="flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group"
                            style={{
                                background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                            }}
                            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)'}
                        >
                            <span className="text-xs font-bold text-slate-600 w-5 text-center">
                                #{entry.rank}
                            </span>
                            <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                    src={entry.avatarUrl || "/johnson.jpg"}
                                    alt={entry.userName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white">{entry.userName}</p>
                                <p className="text-xs text-slate-500">{entry.impact}</p>
                            </div>
                            <span className="text-sm font-bold text-slate-300 font-mono">
                                {entry.score} <span className="text-xs font-normal text-slate-600">pts</span>
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
