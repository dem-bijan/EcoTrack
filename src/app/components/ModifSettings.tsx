"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Mail, CheckCircle, Loader2, Lock, User, ShieldCheck } from "lucide-react";

export default function ModifSettings({ user }: { user: any }) {
    const router = useRouter();
    const [email, setEmail] = useState(user.email);
    const [fullName, setFullName] = useState(user.fullName);
    const [passwords, setPasswords] = useState({ current: "", new: "" });
    const [loading, setLoading] = useState<string | null>(null);
    const [status, setStatus] = useState({ email: false, password: false, name: false });

    const handleEmailUpdate = async () => {
        setLoading('email');
        try {
            await axios.put("/api/users/email", { newEmail: email });
            setStatus({ ...status, email: true });
            setTimeout(() => window.location.href = "/login", 1500);
        } catch { alert("Email update failed."); }
        setLoading(null);
    };

    const handlePasswordUpdate = async () => {
        setLoading('password');
        try {
            await axios.put("/api/users/password", {
                currentPassword: passwords.current,
                newPassword: passwords.new
            });
            setStatus({ ...status, password: true });
            setPasswords({ current: "", new: "" });
        } catch (err: any) { alert(err.response?.data?.message || "Something went wrong."); }
        setLoading(null);
    };

    const handleNameUpdate = async () => {
        setLoading('name');
        try {
            await axios.put("/api/users/name", { newName: fullName });
            setStatus({ ...status, name: true });
            router.refresh();
        } catch (err: any) { alert(err.response?.data?.message || "Something went wrong."); }
        setLoading(null);
    };

    return (
        <div className="space-y-5">

            {/* ── Display Name ───────────────────────────────── */}
            <section className="panel panel-accent rounded-2xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] mb-1 flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-emerald-500" />
                        Display Name
                    </h2>
                    <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                        How you appear across the EcoTrack community.
                    </p>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="form-input max-w-md"
                    />
                </div>
                <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                    <div>
                        {status.name && (
                            <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Saved
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleNameUpdate}
                        disabled={loading === 'name' || fullName === user.fullName}
                        className="btn-primary rounded-lg text-xs"
                    >
                        {loading === 'name' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Changes"}
                    </button>
                </div>
            </section>

            {/* ── Email ──────────────────────────────────────── */}
            <section className="panel panel-accent rounded-2xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] mb-1 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-emerald-500" />
                        Email Address
                    </h2>
                    <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                        Authorized email for notifications and secure login.
                    </p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input max-w-md"
                    />
                </div>
                <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                    <span className="text-xs text-slate-600 font-medium">Logout required on change</span>
                    <button
                        onClick={handleEmailUpdate}
                        disabled={loading === 'email' || email === user.email}
                        className="btn-primary rounded-lg text-xs"
                    >
                        {loading === 'email' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Update Address"}
                    </button>
                </div>
            </section>

            {/* ── Password ───────────────────────────────────── */}
            <section className="panel panel-accent rounded-2xl overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xs font-bold text-white uppercase tracking-[0.25em] mb-1 flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-emerald-500" />
                        Security Access
                    </h2>
                    <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                        Rotate your credentials to maintain maximum account integrity.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <input
                            type="password"
                            placeholder="Current password"
                            value={passwords.current}
                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                            className="form-input"
                        />
                        <input
                            type="password"
                            placeholder="New password"
                            value={passwords.new}
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            className="form-input"
                        />
                    </div>
                </div>
                <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                    <div>
                        {status.password && (
                            <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Credentials Rotated
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handlePasswordUpdate}
                        disabled={loading === 'password' || !passwords.current || !passwords.new}
                        className="btn-primary rounded-lg text-xs"
                    >
                        {loading === 'password' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Rotate Password"}
                    </button>
                </div>
            </section>
        </div>
    );
}
