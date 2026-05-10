import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import AmbientChat from "@/app/components/AmbientChat";
import { TrendingDown, Zap, BarChart3, AlertCircle } from "lucide-react";
import RecommendationsList from "@/app/components/RecommendationsList";
import AchievementsList from "@/app/components/AchievementsList";
import CarbonScore from "@/app/components/CarbonScore";
import LiveActivityTable from "@/app/components/LiveActivityTable";
import TrendChart from "@/app/components/TrendChart";
import ChallengeList from "@/app/components/ChallengeList";
type JwtPayload = {
    sub: string;
    filled_form: boolean;
    exp: number;
};

export default async function DashboardPage() {
    // AUTH
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt_token")?.value;
    if (!token) redirect("/login");

    // FETCH ALL DATA ONCE
    const userRes = await fetch("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    if (!userRes.ok) redirect("/login");

    const userData = await userRes.json();

    // LOGOUT
    async function logoutAction() {
        "use server";
        const cookieStore = await cookies();
        cookieStore.delete("jwt_token");
        redirect("/login");
    }


    return (
        <div className="min-h-screen w-full pb-24 overflow-x-hidden">
            <div className="w-[90vw] mx-auto">
                <Navbar logoutAction={logoutAction} />
            </div>

            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-10">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-white">
                            Welcome back, <span className="text-emerald-400">
                                {userData.fullName?.split(" ")[0]}
                            </span>
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Monitoring carbon output system
                        </p>
                    </div>
                </div>

                {/* CARBON SCORE */}
                <div className="mb-10">
                    <CarbonScore token={token} email={userData.email} />
                </div>

                <div className="mb-10">
                    <TrendChart token={token} email={userData.email} />
                </div>
                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <LiveActivityTable token={token} email={userData.email} />

                        <AchievementsList token={token} email={userData.email} />

                        <ChallengeList token={token} email={userData.email} />
                    </div>

                    <div className="space-y-6">
                        <RecommendationsList token={token} email={userData.email} />

                        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-4 h-4 text-emerald-400" />
                                <p className="text-xs font-bold text-white">
                                    Efficiency Alert
                                </p>
                            </div>
                            <p className="text-xs text-slate-400">
                                Switching to renewable energy reduces footprint significantly.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <AmbientChat token={token} />
        </div>
    );
}
