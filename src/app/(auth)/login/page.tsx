"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from 'react-type-animation';
import axios from "axios";
import { Leaf, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.password
      });
      if (response.status === 200) { router.push("/dashboard"); }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password combination.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-emerald-500/20">
            <Leaf className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 font-outfit">
            EcoTrack
          </span>
        </Link>
      </nav>

      <div className="relative z-10 w-full max-w-sm">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black font-outfit mb-2">
            Welcome <span className="animated-gradient-text">Back</span>
          </h1>
          <p className="text-sm text-slate-500">Continue your journey for a greener earth.</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
          {/* Corner glows */}
          <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-500/15 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-blue-500/15 blur-[60px] rounded-full pointer-events-none" />

          {error && (
            <div className="mb-5 p-3.5 rounded-xl text-sm font-medium text-red-400"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              {error}
            </div>
          )}

          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-0.5">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input h-12"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-0.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-emerald-500 hover:text-emerald-400 font-semibold transition-colors">Forgot?</a>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="form-input h-12"
              />
            </div>

            <div className="flex items-center gap-2.5 px-0.5">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded-md border-white/10 bg-slate-900 accent-emerald-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-500 cursor-pointer hover:text-slate-400 transition-colors">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 btn-primary rounded-xl text-sm font-bold shadow-lg"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                : <>Sign In <ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                Join the Mission
              </Link>
            </p>
          </div>
        </div>

        {/* Typing tagline */}
        <p className="mt-7 text-center text-xs text-slate-600 italic">
          <TypeAnimation
            sequence={[
              'Carbon neutral is the goal.', 2500,
              'Every small action counts.', 2500,
              'Together for a better future.', 2500,
            ]}
            repeat={Infinity}
          />
        </p>
      </div>
    </div>
  );
}
