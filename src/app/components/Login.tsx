import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => router.push("/login")}
        className="px-8 py-3 glass hover:bg-white/10 text-white font-bold rounded-2xl transition-all duration-300 active:scale-95 shadow-lg border border-white/10"
      >
        Login
      </button>
      <button
        onClick={() => router.push("/signup")}
        className="px-8 py-3 bg-emerald-500 text-slate-950 font-bold rounded-2xl hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-emerald-500/20 active:scale-95"
      >
        Sign Up
      </button>
    </div>
  )
}
