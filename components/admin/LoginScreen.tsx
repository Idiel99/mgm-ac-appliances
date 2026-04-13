"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginScreen() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border-[1.5px] border-slate-200 focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-slate-900 bg-sky-50 focus:bg-white outline-none transition-colors w-full";

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-sky-50 px-4 py-24">
      <div className="bg-white rounded-2xl border border-sky-500/10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Logo size={56} className="mb-4" />
          <h1
            className="font-black text-slate-900 text-xl tracking-tight"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            MGM <span className="text-sky-500">A/C</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Quote Generator</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="text-[0.7rem] font-bold text-slate-700 uppercase tracking-wide mb-1.5 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter access password"
            className={inputClass}
            required
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_8px_28px_rgba(14,165,233,0.4)] hover:-translate-y-px transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Access"}
          </button>
        </form>
      </div>
    </div>
  );
}
