"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, Bot, ChevronDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Message {
    role: "user" | "ai";
    content: string;
    impactSummary?: string;
}

export default function AmbientChat({ token }: { token: string | undefined }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<Message[]>([
        { role: "ai", content: "Hello! Tell me what you did today and I'll help you quantify your carbon impact." }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {

                const res = await fetch("http://localhost:8080/api/ai/history", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setChatHistory(data)
                    }
                }
            }
            catch (err) {
                console.error("Failed to fetch chat history", err);
            }
        };
        if (token) {
            fetchHistory();
        }
    }, [token]);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isOpen]);

    const quickActions = [
        { label: "Morning routine", icon: "🌅" },
        { label: "Vegan meal", icon: "🥗" },
        { label: "Walked to work", icon: "🚶" },
    ];

    const sendMessage = async (content: string) => {
        const textToSend = content || message;
        if (!textToSend.trim() || loading) return;

        const userMsg: Message = { role: "user", content: textToSend };
        const updatedHistory = [...chatHistory, userMsg]

        setChatHistory(updatedHistory)
        setMessage("");
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:8080/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    messages: updatedHistory.map(m => ({
                        role: m.role === 'ai' ? 'assistant' : 'user',
                        content: m.content
                    }))
                }),
            });


            if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);
            const data = await res.json();
            if (data.summary) {
                router.refresh()
            }

            setChatHistory(prev => [...prev, {
                role: "ai",
                content: data.text,
                impactSummary: data.summary
            }]);
        } catch (err: any) {
            setError(err.message || "Failed to get response. Please try again.");
            setChatHistory(prev => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[360px] rounded-2xl overflow-hidden shadow-[0_24px_64px_-8px_rgba(0,0,0,0.7)]"
                        style={{
                            background: 'rgba(13,17,23,0.95)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(24px)',
                        }}
                    >
                        {/* Top shimmer line */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="relative flex-shrink-0">
                                    <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_16px_rgba(16,185,129,0.4)]">
                                        <Bot className="w-4 h-4 text-black" strokeWidth={2.5} />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0d1117] rounded-full" />
                                </div>
                                <div>
                                    <p className="eyebrow text-emerald-500">V-AI Intelligence</p>
                                    <p className="text-sm font-semibold text-white leading-tight">Activity Engine</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-white/5 transition-all"
                            >
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-white/5" />

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="px-5 py-4 h-[320px] overflow-y-auto scrollbar-hide space-y-5"
                        >
                            {chatHistory.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    {msg.role === 'ai' && (
                                        <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">System Response</span>
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[90%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 rounded-tr-sm'
                                            : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-sm'
                                            }`}
                                        style={{
                                            boxShadow: msg.role === 'user' ? '0 8px 20px -8px rgba(16,185,129,0.2)' : 'none'
                                        }}
                                    >
                                        {msg.content}
                                    </div>

                                    {/* Impact Summary Tag */}
                                    {msg.role === 'ai' && msg.impactSummary && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.1)]"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                                                🌿 {msg.impactSummary}
                                            </span>
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                            {loading && (
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Analyzing Activity</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl rounded-tl-sm flex items-center gap-3">
                                        <div className="flex gap-1">
                                            <span className="w-1 h-1 bg-emerald-500/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1 h-1 bg-emerald-500/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1 h-1 bg-emerald-500/50 rounded-full animate-bounce" />
                                        </div>
                                        <span className="text-[10px] font-medium text-slate-500">Quantifying carbon impact...</span>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 text-center font-medium">
                                    <span className="opacity-70 mr-1.5">⚠️</span> {error}
                                </div>
                            )}
                        </div>

                        {/* Quick Actions Container (Hidden when loading or too many messages) */}
                        {chatHistory.length < 4 && !loading && (
                            <div className="px-5 pb-2 flex flex-wrap gap-2">
                                {quickActions.map(action => (
                                    <button
                                        key={action.label}
                                        onClick={() => sendMessage(action.label)}
                                        className="px-3 py-1.5 rounded-lg text-[10px] font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                        }}
                                    >
                                        <span>{action.icon}</span>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="px-4 pb-4 pt-2">
                            <div
                                className="flex items-center gap-2 rounded-xl overflow-hidden transition-all"
                                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage("")}
                                    placeholder="Describe your activity…"
                                    className="flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-700"
                                />
                                <button
                                    onClick={() => sendMessage("")}
                                    disabled={loading || !message.trim()}
                                    className="m-1.5 w-8 h-8 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg flex items-center justify-center transition-all hover:shadow-[0_0_12px_rgba(16,185,129,0.4)] active:scale-95 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-13 h-13 outline-none"
                style={{ width: '3.25rem', height: '3.25rem' }}
            >
                <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-xl group-hover:bg-emerald-500/35 transition-all" />
                <div
                    className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden transition-all group-hover:scale-105 active:scale-95"
                    style={{
                        background: 'rgba(13,17,23,0.9)',
                        border: '1px solid rgba(16,185,129,0.3)',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isOpen
                        ? <X className="w-5 h-5 text-white relative z-10" />
                        : <Sparkles className="w-5 h-5 text-emerald-400 relative z-10" />
                    }
                </div>
            </button>
        </div>
    );
}
