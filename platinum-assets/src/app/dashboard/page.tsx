"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import DashboardTab from "./components/DashboardTab";
import FundAccountTab from "./components/FundAccountTab";
import InvestTab from "./components/InvestTab";
import WithdrawTab from "./components/WithdrawTab";
import TransactionHistoryTab from "./components/TransactionHistoryTab";
import ReferUserTab from "./components/ReferUserTab";
import KYCTab from "./components/KYCTab";
import SettingsTab from "./components/SettingsTab";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const defaultStats = [
  { label: "Total Deposit", value: "$0" },
  { label: "Available Balance", value: "$0" },
  { label: "Active Investment", value: "0" },
  { label: "Total Profit", value: "$0" },
  { label: "Ref. Bonus", value: "$0" },
  { label: "Total Withdrawal", value: "$0" },
];

const sidebarTabs = [
  { icon: "\u{1F5C3}", label: "Dashboard" },
  { icon: "\u{1F4B3}", label: "Fund your account" },
  { icon: "\u{1F4B8}", label: "Invest" },
  { icon: "$", label: "Withdraw funds" },
  { icon: "\u{1F4BC}", label: "Transaction history" },
  { icon: "\u{1F464}\u{2795}", label: "Refer user" },
  { icon: "\u{1F6E1}", label: "KYC Verification" },
  { icon: "\u{2699}", label: "Settings" },
  { icon: "\u{1F6AA}", label: "Logout", isLogout: true },
];

type Deposit = {
  amount: number;
  status: string;
  created_at: string;
};

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [refLink, setRefLink] = useState("");
  const [profit, setProfit] = useState(0);
  const [prediction, setPrediction] = useState<{direction: string, startTime: string, entry: number, last: number} | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState(defaultStats);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [investments, setInvestments] = useState<any[]>([]);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investAmount, setInvestAmount] = useState("");
  const [investError, setInvestError] = useState("");
  const [depositHistory, setDepositHistory] = useState<Deposit[]>([]);
  const router = useRouter();

  // Client-side auth protection
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace("/login");
      } else {
        setUser(data.user);
        setRefLink(`${window.location.origin}/signup?ref=${data.user.user_metadata?.username || data.user.id}`);
        // Fetch profile from DB
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
        
        // Load profile image from localStorage with user-specific key
        const savedImage = localStorage.getItem(`profileImage_${data.user.id}`);
        const fullProfile = {
          ...profileData,
          image: savedImage || profileData?.image || null
        };
        
        setProfile(fullProfile);
        // Fetch stats and deposit history from DB
        if (profileData?.id) {
          const [deposits, withdrawals, investments, referralBonuses] = await Promise.all([
            supabase.from('deposits').select('amount, status, created_at').eq('user_id', profileData.id).order('created_at', { ascending: false }),
            supabase.from('withdrawals').select('amount, status').eq('user_id', profileData.id),
            supabase.from('investments').select('amount, status, profit').eq('user_id', profileData.id),
            supabase.from('referral_bonuses').select('amount').eq('user_id', profileData.id),
          ]);
          setDepositHistory(deposits.data || []);
          setInvestments(investments.data || []);
        }
      }
    });
  }, [router]);

  // Listen for localStorage changes to update profile image
  useEffect(() => {
    const handleStorageChange = () => {
      if (user?.id) {
        const savedImage = localStorage.getItem(`profileImage_${user.id}`);
        setProfile((prev: any) => prev ? { ...prev, image: savedImage } : null);
      }
    };

    // Listen for storage events (from other tabs/windows)
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (from same tab)
    window.addEventListener('profileImageUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileImageUpdated', handleStorageChange);
    };
  }, [user?.id]);

  // Helper to get available balance from stats (move out of useEffect)
  const getAvailableBalance = () => {
    const stat = stats.find(s => s.label === "Available Balance");
    if (!stat) return 0;
    return Number(stat.value.replace(/[^\d.]/g, ""));
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Handle tab click
  const handleTabClick = (tab: any) => {
    if (tab.isLogout) {
      handleLogout();
    } else {
      setActiveTab(tab.label);
      setSidebarOpen(false);
    }
  };

  // Fetch XAUUSD candles and simulate prediction
  useEffect(() => {
    async function fetchCandles() {
      // Use a public API for XAUUSD candles (e.g., Twelve Data, Finnhub, or mock)
      // We'll use Finnhub for prototyping (requires free API key)
      // For now, mock data for prototyping
      const now = Date.now();
      const candles = Array.from({ length: 20 }, (_, i) => ({
        t: now - (19 - i) * 130 * 60 * 1000,
        c: 2300 + Math.sin(i / 2) * 10 + i * 2 + Math.random() * 5,
      }));
      // Simulate prediction: "Buy" at candle 10
      const entryIdx = 10;
      setPrediction({
        direction: "Buy",
        startTime: new Date(candles[entryIdx].t).toLocaleString(),
        entry: candles[entryIdx].c,
        last: candles[19].c,
      });
      // Simulate profit climbing
      let base = 10000;
      const profit = ((candles[19].c - candles[entryIdx].c) / candles[entryIdx].c) * base;
      setProfit(profit);
      let p = profit;
      const interval = setInterval(() => {
        p += Math.random() * 2;
        setProfit(Number(p.toFixed(2)));
      }, 1200);
      return () => clearInterval(interval);
    }
    fetchCandles();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white flex relative font-sans">
      {/* Mobile sidebar toggle button */}
      <button
        className="md:hidden fixed top-4 right-4 z-30 bg-white text-gray-700 p-3 rounded-full shadow-lg border border-blue-200 focus:outline-none"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {/* Sidebar */}
      <aside
        className={`z-20 fixed md:static top-0 left-0 h-full w-64 bg-gray-50 border-r border-gray-200 flex flex-col py-10 gap-2 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:w-56 md:min-h-screen shadow-lg`}
        style={{ maxWidth: 260 }}
      >
        {sidebarTabs.map((tab) => (
          <div
            key={tab.label}
            className={`flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-blue-50 rounded-lg cursor-pointer text-base font-medium mx-2 ${
              tab.isLogout 
                ? 'hover:bg-red-50 hover:text-red-600 mt-4 border-t border-gray-200 pt-6' 
                : activeTab === tab.label ? 'bg-blue-100 text-blue-700 shadow-sm' : ''
            }`}
            onClick={() => handleTabClick(tab)}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </div>
        ))}
      </aside>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      {/* Main Content */}
      <main className="flex-1 z-10 flex flex-col items-center px-6 py-10 gap-8 md:ml-56">
        {/* Greeting */}
        {profile && (
          <div className="w-full max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Hello, {profile.name || profile.username || 'User'}!</h2>
              <div 
                className="w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
                onClick={() => setActiveTab('Settings')}
                title="Go to Settings"
              >
                {profile.image ? (
                  <img 
                    src={profile.image} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                    {(profile.name || profile.username || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
           </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
        
        {/* Tab Content */}
        {activeTab === 'Dashboard' && (
          <DashboardTab 
            stats={stats} 
            refLink={refLink} 
            prediction={prediction} 
            profit={profit} 
          />
        )}
        {activeTab === 'Fund your account' && (
          <FundAccountTab 
            depositHistory={depositHistory} 
            profile={profile} 
          />
        )}
        {activeTab === 'Invest' && <InvestTab userBalance={getAvailableBalance()} />}
        {activeTab === 'Withdraw funds' && <WithdrawTab userBalance={getAvailableBalance()} />}
        {activeTab === 'Transaction history' && <TransactionHistoryTab />}
        {activeTab === 'Refer user' && <ReferUserTab refLink={refLink} />}
        {activeTab === 'KYC Verification' && <KYCTab />}
        {activeTab === 'Settings' && (
          <SettingsTab 
            user={user} 
            profile={profile} 
            onProfileUpdate={setProfile}
          />
        )}
      </main>
    </div>
  );
}
export default DashboardPage;
