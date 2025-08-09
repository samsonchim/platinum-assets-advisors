"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Login attempt:", credentials); // Debug log

    try {
      // Hardcoded admin credentials
      if (credentials.username === "admin" && credentials.password === "adminaccount") {
        // Store admin session in localStorage
        localStorage.setItem("adminSession", "true");
        localStorage.setItem("adminLoginTime", new Date().toISOString());
        console.log("Admin login successful, redirecting..."); // Debug log
        router.push("/admin/support");
      } else {
        setError("Invalid admin credentials");
        console.log("Invalid credentials provided"); // Debug log
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-200"
        autoComplete="off"
      >
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="text-gray-600 mt-2">Access the support dashboard</p>
        </div>

        {error && (
          <div className="text-red-600 text-center text-sm bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm">Username</label>
          <input
            name="username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
            placeholder="Enter admin username"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold text-sm">Password</label>
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
            placeholder="Enter admin password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg shadow-md hover:from-red-700 hover:to-red-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login as Admin"}
        </button>

        <div className="text-center">
          <a href="/" className="text-gray-600 hover:text-gray-800 text-sm">
            ← Back to Home
          </a>
        </div>
      </form>

    
    </div>
  );
};

export default AdminLoginPage;
