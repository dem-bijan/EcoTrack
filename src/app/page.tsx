"use client";
import Login from "./components/Login";
import Card from "./components/card";
import { TypeAnimation } from 'react-type-animation';
import LeaderBoard from "./components/LeaderBoard";
import { HERO_CONTENT, INFO_CARDS, INITIAL_LEADERBOARD } from "@/lib/constants";
import { Leaf } from "lucide-react";
import { useState, useEffect } from "react";



interface Message {
  role: "user" | "ai";
  content: string;
  impactSummary?: string;
}

export default function Home() {

  const message1 = "Give 4 Live environmental Data, about CO2 consumption, use and metrics, (ppm, danger...) your answer should be 4 sentences split by the , separator, nothing less nothing more"
  const message = "Give me 4 phrases in english, seperated by the separator , nothing else nothing more"
  const [answers, setAnswers] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/ai/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
      });

      if (res.ok) {
        const data = await res.json();
        setAnswers(data.response);
      }
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    sendMessage();
  }, []);




  return (
    <div className="relative min-h-screen text-white selection:bg-emerald-500/20 overflow-x-hidden">

      {/* ── Navigation ──────────────────────────────────────── */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Leaf className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-extrabold tracking-tight font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            EcoTrack
          </span>
        </div>
        <Login />
      </nav>

      {/* ── Hero Section ────────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left: Copy */}
          <div className="space-y-8 fade-up">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tag-emerald text-xs font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              {HERO_CONTENT.ppm}
            </div>

            <h1 className="text-5xl lg:text-[4.5rem] font-black font-outfit leading-[1.05] tracking-tight">
              Protect Our{" "}
              <span className="animated-gradient-text">Future</span>.
              <br />
              <span className="text-slate-500 font-bold">One Step at a Time.</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              <TypeAnimation
                sequence={HERO_CONTENT.sequences}
                wrapper="span"
                speed={50}
                style={{ display: "inline-block", minHeight: '3em' }}
                repeat={Infinity}
              />
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button className="btn-primary px-7 py-3.5 text-sm rounded-xl font-bold tracking-wide">
                Join 10,000+ Others
              </button>
              <button className="btn-secondary px-7 py-3.5 text-sm rounded-xl">
                View Science
              </button>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 pt-2">
              {[
                { value: '10K+', label: 'Active users' },
                { value: '2.3M', label: 'kg CO₂ saved' },
                { value: '97%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Data Card */}
          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute -inset-8 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative glass-card rounded-2xl p-7 card-glow-top">
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="eyebrow mb-1">Live Environmental Data</p>
                  <h3 className="text-base font-bold text-white">Real-time Monitor</h3>
                </div>
                <span className="tag tag-emerald">LIVE</span>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                {answers ? (
                  answers.split(',').map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl transition-all duration-150 group cursor-default"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 group-hover:scale-150 transition-transform" />
                      <p className="text-sm text-slate-300 font-medium">{stat.trim()}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-sm text-slate-400">Loading data...</p>
                  </div>
                )}
              </div>

              {/* Bottom: Timestamp */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-mono">Updated just now</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature Cards ──────────────────────────────────── */}
        <div className="mt-36">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Why EcoTrack</p>
            <h2 className="text-3xl font-black font-outfit text-white">Built for Impact</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {INFO_CARDS.map((card, i) => (
              <div key={i} className="group transition-all duration-300 hover:-translate-y-1.5">
                <Card
                  title={card.title}
                  description={card.description}
                  imageSrc={card.imageSrc}
                  buttonText="Read Full Report"
                  buttonUrl={card.buttonUrl}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Leaderboard Section ────────────────────────────── */}
        <section className="mt-40 mb-20">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">Community</p>
            <h2 className="text-3xl font-black font-outfit text-white mb-3">Community Impact</h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
              See how individuals across the globe are making a real difference.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-2 lg:p-6 max-w-5xl mx-auto">
            <LeaderBoard entries={INITIAL_LEADERBOARD} />
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="relative z-10 border-t py-10 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Leaf className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-bold text-white">EcoTrack</span>
        </div>
        <p className="text-sm text-slate-600">© 2025 EcoTrack. Committed to a sustainable future.</p>
      </footer>
    </div>
  );
}