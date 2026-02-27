"use client";
import Login from "./components/Login";
import Card from "./components/card";
import { TypeAnimation } from 'react-type-animation';
import LeaderBoard from "./components/LeaderBoard";
import { HERO_CONTENT, INFO_CARDS, INITIAL_LEADERBOARD } from "@/lib/constants";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans">

      {/* Navigation / Header Area */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl font-bold">E</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight font-outfit bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            EcoTrack
          </span>
        </div>
        <Login />
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-emerald-400 font-medium text-sm animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {HERO_CONTENT.ppm}
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold font-outfit leading-[1.1] tracking-tight">
              Protect Our <span className="animated-gradient-text">Future</span>.
              <br />
              <span className="text-slate-400">One Step at a Time.</span>
            </h1>

            <div className="text-xl text-slate-300 max-w-xl leading-relaxed font-medium">
              <TypeAnimation
                sequence={HERO_CONTENT.sequences}
                wrapper="span"
                speed={50}
                style={{ display: "inline-block", minHeight: '3em' }}
                repeat={Infinity}
              />
            </div>

            <div className="flex items-center gap-6 pt-4">
              <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 active:scale-95">
                Join 10,000+ Others
              </button>
              <button className="px-8 py-4 glass hover:bg-white/5 text-white font-bold rounded-2xl transition-all duration-300 active:scale-95">
                View Science
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full" />
            <div className="relative glass-card rounded-[2.5rem] p-8 border-white/10">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-outfit">Live Environmental Data</h3>
                <div className="space-y-4">
                  {HERO_CONTENT.stats.map((stat, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 group-hover:scale-150 transition-transform" />
                      <p className="text-slate-300 font-medium">{stat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {INFO_CARDS.map((card, i) => (
            <div key={i} className="group transition-all duration-500 hover:-translate-y-2">
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

        {/* Leaderboard Section */}
        <section className="mt-40 mb-20 text-center">
          <h2 className="text-4xl font-extrabold font-outfit mb-4">Community Impact</h2>
          <p className="text-slate-400 mb-12 text-lg max-w-2xl mx-auto">See how individuals across the globe are making a real difference in the fight against climate change.</p>
          <div className="glass-card rounded-[2.5rem] p-4 lg:p-8 max-w-5xl mx-auto">
            <LeaderBoard entries={INITIAL_LEADERBOARD} />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 text-center text-slate-500 font-medium">
        <p>© 2024 EcoTrack. Committed to a sustainable future.</p>
      </footer>
    </div>
  );
}

