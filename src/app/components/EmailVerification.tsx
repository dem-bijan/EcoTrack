"use client"

import axios from "axios"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, Mail, ShieldAlert, Loader2, ArrowRight } from "lucide-react";

export default function EmailVerification({ isVerified }: { isVerified: boolean }) {
    const [step, setStep] = useState(isVerified ? 'verified' : 'initial')
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const sendCode = async () => {
        setLoading(true)
        try {
            await axios.post("/api/verify/send", { code });
            setStep("pending")
        } catch { console.error("Failed to send code") }
        setLoading(false)
    }

    const confirmCode = async () => {
        setLoading(true)
        setError(false)
        try {
            await axios.post("/api/verify/confirm", { code })
            setStep("verified")
        } catch { setError(true) }
        setLoading(false)
    }

    return (
        <AnimatePresence mode="wait">
            {step === 'verified' ? (
                <motion.div
                    key="verified"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 rounded-xl relative overflow-hidden"
                    style={{
                        background: 'rgba(16,185,129,0.06)',
                        border: '1px solid rgba(16,185,129,0.2)',
                    }}
                >
                    <motion.div
                        animate={{ opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.15), transparent 70%)' }}
                    />
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ background: 'rgba(16,185,129,0.15)' }}
                    >
                        <BadgeCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-sm font-bold text-emerald-400">Identity Verified</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Your email is authenticated. All secure features are unlocked.</p>
                    </div>
                </motion.div>

            ) : step === 'pending' ? (
                <motion.div
                    key="pending"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-2 text-blue-400">
                        <Mail className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Check Your Inbox</span>
                    </div>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="000000"
                            className={`form-input flex-1 text-center tracking-[0.5em] font-mono ${error ? 'border-red-500/50' : ''}`}
                        />
                        <button
                            onClick={confirmCode}
                            disabled={loading || code.length < 6}
                            className="btn-primary rounded-xl px-5 flex-shrink-0 disabled:opacity-40"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                        </button>
                    </div>
                    {error && (
                        <p className="text-xs text-red-400">The code is invalid. Please try again.</p>
                    )}
                </motion.div>

            ) : (
                <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-4 rounded-xl group transition-all cursor-pointer"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-800/80 rounded-xl flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="w-4.5 h-4.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Trust & Safety</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Secure your account by verifying your email.</p>
                        </div>
                    </div>
                    <button
                        onClick={sendCode}
                        disabled={loading}
                        className="btn-primary rounded-lg text-xs flex-shrink-0"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Verify Now <ArrowRight className="w-3.5 h-3.5" /></>}
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}