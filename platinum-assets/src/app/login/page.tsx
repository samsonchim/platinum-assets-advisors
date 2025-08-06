"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (loginError) {
      setError(loginError.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181a20] via-[#23272f] to-[#16181d] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* TradingView grid bg */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_40px)]" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="z-10 w-full max-w-md bg-[#23272f] rounded-2xl shadow-lg p-8 flex flex-col gap-6 mt-24"
        autoComplete="off"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">Login</h2>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" required />
        </div>
        <button
          type="submit"
          className="mt-2 py-3 rounded-lg bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white font-bold text-lg shadow-md hover:from-[#6c2bd7] hover:to-[#3772ff] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3772ff]"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        <div className="text-gray-400 text-center text-sm mt-2">
          Don't have an account? <a href="/signup" className="text-[#3772ff] hover:underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
