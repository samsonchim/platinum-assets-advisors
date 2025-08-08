"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  React.useEffect(() => {
    // Get country from IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setForm((f) => ({ ...f, country: data.country_name || "" })))
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
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
    if (!signUpError && signUpData.user) {
      // Create profile row in DB
      await supabase.from('profiles').insert({
        id: signUpData.user.id,
        name: form.name,
        username: form.username,
        referral: form.referral,
        country: form.country,
      });
    }
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.01),rgba(0,0,0,0.01)_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,rgba(0,0,0,0.01),rgba(0,0,0,0.01)_1px,transparent_1px,transparent_40px)]" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 mt-24 border border-gray-200"
        autoComplete="off"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Sign Up</h2>
        {error && <div className="text-red-600 text-center text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}
        {success && <div className="text-green-600 text-center text-sm bg-green-50 border border-green-200 rounded-lg p-3">{success}</div>}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm w-fit">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm w-fit">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm w-fit">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm w-fit">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm w-fit">Confirm Password</label>
          <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm w-fit">Referral Code <span className="text-gray-500">(optional)</span></label>
          <input name="referral" value={form.referral} onChange={handleChange} className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm w-fit">Country</label>
          <input name="country" value={form.country} readOnly className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <button
          type="submit"
          className="mt-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="text-gray-600 text-center text-sm mt-2">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
