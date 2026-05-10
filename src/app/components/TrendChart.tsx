"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Client } from "@stomp/stompjs"
import SockJS from "sockjs-client"
import { useEffect, useState } from "react";
import { TrendingDown, Activity } from "lucide-react";

export default function TrendChart({ token, email }: { token: string | undefined, email: string }) {
    const [data, setData] = useState([]);


    const fetchTrends = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/CarbonFootprints/trends", {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const rawData = await res.json()
                const formattedData = rawData.map((item: any) => {
                    const dateObj = new Date(item.date);
                    return {
                        ...item,
                        timestamp: dateObj.getTime(),
                        displayDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    };
                });
                // 2. Mathematically fill in the missing days!
                let filledData = [];
                if (formattedData.length > 0) {
                    for (let i = 0; i < formattedData.length - 1; i++) {
                        const current = formattedData[i];
                        const next = formattedData[i + 1];

                        filledData.push(current);

                        // Calculate how many days are missing between these two logs
                        const daysBetween = Math.round((next.timestamp - current.timestamp) / (1000 * 60 * 60 * 24));

                        if (daysBetween > 1) {
                            // Calculate the slope (how much the score changes per day)
                            const dailyIncrement = (next.score - current.score) / daysBetween;

                            // Inject a new fake data point for every missing day
                            for (let j = 1; j < daysBetween; j++) {
                                const interpolatedTime = current.timestamp + (j * 1000 * 60 * 60 * 24);
                                filledData.push({
                                    timestamp: interpolatedTime,
                                    displayDate: new Date(interpolatedTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                    score: current.score + (dailyIncrement * j),
                                    isInterpolated: true // We can flag it just in case
                                });
                            }
                        }
                    }
                    // Don't forget to push the very last known data point!
                    filledData.push(formattedData[formattedData.length - 1]);
                }
                setData(filledData.length > 0 ? filledData : formattedData);
            }
        }
        catch (err) {
            console.error("error fetching data", err)
        }
    }
    useEffect(() => {
        if (token) fetchTrends()
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
                        if (message.body === "REFETCH_TRENDS") {
                            console.log("AI updated footprint! Fetching new data...");
                            fetchTrends()
                        }
                    })
            }
        })
        stompClient.activate();
        return () => {
            stompClient.deactivate()
        }
    }, [email])

    // Sleek Loading State
    if (data.length === 0) {
        return (
            <div className="w-full h-[320px] p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-4">
                <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Aggregating Trend Data</p>
            </div>
        );
    }

    // Custom Tooltip for hover effect
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0d1117]/95 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">{label}</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">{payload[0].value.toFixed(3)}</span>
                        <span className="text-xs font-medium text-slate-400">Tons CO₂</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[320px] p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-md relative group transition-all hover:bg-white/[0.05]">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Activity className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white tracking-wide">Emission Trajectory</h3>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Cumulative Footprint</p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <TrendingDown className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="w-full h-[200px] -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                            </linearGradient>
                            {/* SVG Glow Filter */}
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />

                        <XAxis
                            dataKey="timestamp"
                            type="number"
                            scale="time"
                            domain={['dataMin', 'dataMax']}
                            stroke="rgba(255,255,255,0.2)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                            tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.2)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => val.toFixed(1)}
                            dx={-10}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: 'rgba(16,185,129,0.3)', strokeWidth: 2, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#10b981"
                            strokeWidth={3}
                            fill="url(#emeraldGradient)"
                            activeDot={{ r: 6, fill: "#10b981", stroke: "#0d1117", strokeWidth: 3, style: { filter: 'url(#glow)' } }}
                            style={{ filter: 'url(#glow)' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
