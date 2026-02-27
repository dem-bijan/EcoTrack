"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeAnimation } from 'react-type-animation';
import axios from "axios";

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
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/users";

      // Since we don't have a dedicated Spring Security login endpoint yet,
      // we'll fetch users and verify manually for now (Mock Login Flow).
      // In production, NEVER fetch all users to the frontend.
      const response = await axios.get(API_URL);
      const users = response.data;

      const user = users.find((u: any) => u.email === formData.email && u.passwordHash === formData.password);

      if (user) {
        // Mock a token for now since Spring isn't generating one yet
        localStorage.setItem("token", "mock-jwt-token-from-spring");
        router.push("/dashboard");
      } else {
        setError("Invalid email or password combination.");
      }
    } catch (err: any) {
      setError("Unable to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent">
      {/* Hero Section / Navigation Back */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl font-bold text-slate-900">E</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            EcoTrack
          </span>
        </Link>
      </nav>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold font-outfit mb-2">Welcome <span className="animated-gradient-text">Back</span></h1>
          <p className="text-slate-400 font-medium">Continue your journey for a greener earth.</p>
        </div>

        <div className="glass-card rounded-[2.5rem] p-10 border-white/10 shadow-2xl relative">
          {/* Subtle glow effect */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/20 blur-[80px] rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 blur-[80px] rounded-full" />

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-14 bg-slate-900/50 border border-white/10 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 placeholder:text-slate-600"
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-slate-900 text-emerald-500 focus:ring-emerald-500/50" />
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/25 active:scale-95 shadow-lg group"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-slate-400 font-medium">
              Don't have an account?{" "}
              <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                Join the Mission
              </Link>
            </p>
          </div>
        </div>

        {/* Dynamic Typing Message */}
        <div className="mt-8 text-center text-slate-500 font-medium text-sm italic">
          <TypeAnimation
            sequence={[
              'Carbon neutral is the goal.', 2000,
              'Every small action counts.', 2000,
              'Together for a better future.', 2000,
            ]}
            repeat={Infinity}
          />
        </div>
      </div>
    </div>
  );
}
