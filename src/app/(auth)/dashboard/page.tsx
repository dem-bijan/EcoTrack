import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import AmbientChat from "@/app/components/AmbientChat";
import { TrendingDown, Zap, BarChart3, Clock, AlertCircle, Sparkles, ArrowUpRight } from "lucide-react";
import RecommendationsList from "@/app/components/RecommendationsList";
import { cache } from "react";
import AchievementsList from "@/app/components/AchievementsList";


type JwtPayload = {
    sub: string;
    filled_form: boolean;
    exp: number;
};

export default async function DashboardPage() {
    // 1. SECURE SERVER INQUIRY
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt_token')?.value;

    if (!token) { redirect("/login"); }



    //new Recommendations fetching
    const recsResponse = await fetch("http://localhost:8080/api/recommendations", {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store"
    })
    const recommendations = recsResponse.ok ? await recsResponse.json() : [];

    // 2. LIVE FETCH FROM BACKEND
    const springResponse = await fetch("http://localhost:8080/api/users/me", {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store"
    });

    if (!springResponse.ok) { redirect("/login"); }

    const userData = await springResponse.json();

    // 3. LOGOUT ACTION
    async function logoutAction() {
        "use server";
        const cookieStore = await cookies();
        cookieStore.delete("jwt_token");
        redirect("/login");
    }

    //Fetch Real Activities

    const ActivitiesRes = await fetch("http://localhost:8080/api/activities/me", {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store"
    })
    const activities = ActivitiesRes.ok ? await ActivitiesRes.json() : [];

    const totalImpact = activities.reduce((sum: number, act: any) => sum + act.co2Impact, 0).toFixed(2);
    const activeLogs = activities.length

    const efficiency = (((8.5 - (parseFloat(totalImpact) / 1000)) / 8.5) * 100).toFixed(0)

    const metrics = [
        {
            label: "Total Footprint",
            value: (parseFloat(totalImpact) / 1000).toFixed(2),
            unit: "Tons / CO2",
            icon: BarChart3,
            iconColor: "text-slate-500",
            valueColor: "text-white",
        },
        {
            label: "Efficiency Index",
            value: `${efficiency}%`,
            sub: `vs 8.5t local threshold`,
            icon: TrendingDown,
            iconColor: "text-emerald-500",
            valueColor: "text-emerald-400",
        },
        {
            label: "Active Logs",
            value: String(activeLogs),
            unit: "Events",
            icon: Zap,
            iconColor: "text-amber-500",
            valueColor: "text-white",
        },
    ];

    //Fetch Achievements
    const achievementsRes = await fetch("http://localhost:8080/api/achievements/me", {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store"
    })
    const achievements = achievementsRes.ok ? await achievementsRes.json() : []

    return (
        <div className="min-h-screen w-full font-sans selection:bg-emerald-500/20 pb-24">
            <div className="w-[90vw] m-auto"><Navbar logoutAction={logoutAction} /></div>

            <main className="max-w-7xl mx-auto px-6 md:px-8 pt-10">

                {/* ── Page Header ─────────────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">
                    <div>
                        <p className="eyebrow mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                            Active · us-east-1
                        </p>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Welcome back,{" "}
                            <span className="text-emerald-400">{userData.fullName.split(' ')[0]}</span>.
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="eyebrow mb-0.5">Verification</span>
                            <span className={`text-xs font-bold font-mono ${userData.emailVerified ? 'text-emerald-500' : 'text-amber-400'}`}>
                                {userData.emailVerified ? '✓ AUTHENTICATED' : '⚠ ACTION REQUIRED'}
                            </span>
                        </div>
                        <button className="btn-secondary text-xs font-semibold rounded-lg px-4 py-2">
                            Log Activity
                        </button>
                    </div>
                </div>

                {/* ── Metric Cards ─────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    {metrics.map((m, i) => {
                        const Icon = m.icon;
                        return (
                            <div
                                key={i}
                                className="panel panel-accent relative overflow-hidden p-6 rounded-2xl group"
                            >
                                {/* Watermark icon */}
                                <div className={`absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity ${m.iconColor}`}>
                                    <Icon className="w-14 h-14" />
                                </div>
                                <p className="eyebrow mb-4">{m.label}</p>
                                <div className={`text-4xl font-black leading-none mb-1 ${m.valueColor}`}>
                                    {m.value}
                                </div>
                                {m.unit && (
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{m.unit}</p>
                                )}
                                {m.sub && (
                                    <p className="text-xs text-slate-600 mt-1 font-medium">{m.sub}</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <AchievementsList achievements={achievements}></AchievementsList>

                {/* ── Main Content Grid ────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Activity Feed */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                Recent Activity
                            </h2>
                            <button className="eyebrow text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                                Archive <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="panel rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                            <th className="py-4 px-5 eyebrow">Event</th>
                                            <th className="py-4 px-5 eyebrow">Category</th>
                                            <th className="py-4 px-5 eyebrow">Date</th>
                                            <th className="py-4 px-5 eyebrow text-right">Impact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activities.length > 0 ? (
                                            activities.map((act: any, i: number) => (
                                                <tr
                                                    key={i}
                                                    className="group transition-colors hover:bg-white/[0.02] border-b last:border-0"
                                                    style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                                                >
                                                    <td className="py-4 px-5">
                                                        <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                                                            {act.description}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        <span className="tag uppercase">{act.activityCategory}</span>
                                                    </td>
                                                    <td className="py-4 px-5">
                                                        <span className="text-xs text-slate-600 font-mono">
                                                            {new Date(act.activityDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-5 text-right">
                                                        <span className={`text-sm font-bold font-mono ${act.co2Impact > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                                            {act.co2Impact > 0 ? `+${act.co2Impact}` : act.co2Impact} kg
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-20 text-center">
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest opacity-40">
                                                        No activities recorded yet.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Insights */}
                    <div className="space-y-5">
                        <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] flex items-center gap-2 mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                            AI Recommendations
                        </h2>

                        {recommendations.length > 0 ? (
                            <RecommendationsList recommendations={recommendations} />
                        ) : (
                            <div className="panel p-8 text-center rounded-2xl opacity-50">
                                <p className="text-xs text-slate-500 font-medium">
                                    No insights yet. Chat with the AI to discover improvements!
                                </p>
                            </div>
                        )}

                        {/* Efficiency Alert */}
                        <div className="relative overflow-hidden rounded-2xl p-5 group transition-all cursor-pointer"
                            style={{
                                background: 'rgba(16,185,129,0.04)',
                                border: '1px solid rgba(16,185,129,0.15)',
                            }}
                        >
                            {/* Ambient blob */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all" />

                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-emerald-500/15 rounded-lg flex-shrink-0">
                                    <AlertCircle className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1">Efficiency Alert</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Switching to 100% renewable energy will drastically alter your baseline footprint.
                                    </p>
                                </div>
                            </div>
                            <button className="btn-primary w-full py-2 text-xs rounded-lg">
                                REVIEW OPTIMIZATION
                            </button>
                        </div>

                        {/* Upcoming Challenges */}
                        <div className="panel rounded-2xl p-5">
                            <h3 className="eyebrow mb-4">Upcoming Challenges</h3>
                            <div
                                className="flex items-center justify-between p-3 rounded-xl opacity-60"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <div>
                                    <p className="text-xs font-bold text-white uppercase tracking-wide">No-Meat Week</p>
                                    <p className="text-xs text-slate-600 mt-0.5">Starts in 3 days</p>
                                </div>
                                <button className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                                    JOIN ↗
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AmbientChat token={token} />
        </div>
    );
}
