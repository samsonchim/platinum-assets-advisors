"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  referral: "",
  country: "",
};

const SignupPage = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  React.useEffect(() => {
    // Get country from IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setForm((f) => ({ ...f, country: data.country_name || "" })))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields except referral code are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Sign up with Supabase
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          username: form.username,
          referral: form.referral,
          country: form.country,
        },
        emailRedirectTo: undefined,
      },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess("Signup successful! You can now log in.");
      setForm(initialState);
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
        <h2 className="text-3xl font-extrabold text-white text-center mb-2">Sign Up</h2>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        {success && <div className="text-green-500 text-center text-sm">{success}</div>}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Confirm Password</label>
          <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Referral Code <span className="text-gray-500">(optional)</span></label>
          <input name="referral" value={form.referral} onChange={handleChange} className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-semibold">Country</label>
          <input name="country" value={form.country} readOnly className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none" />
        </div>
        <button
          type="submit"
          className="mt-2 py-3 rounded-lg bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white font-bold text-lg shadow-md hover:from-[#6c2bd7] hover:to-[#3772ff] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3772ff]"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
