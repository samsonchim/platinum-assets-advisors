"use client";
import React, { useEffect, useState } from "react";


type ManualReceiptUploadProps = {
  depositAmount: string;
  depositMethod: keyof typeof DEPOSIT_ADDRESSES;
  profile: any;
  onSuccess: () => void;
  onCancel: () => void;
};


// ManualReceiptUpload component for uploading payment receipt (mocked, no upload to Supabase)
function ManualReceiptUpload({ depositAmount, depositMethod, profile, onSuccess, onCancel }: ManualReceiptUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    setError("");
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setUploading(true);
    // Mock upload delay
    setTimeout(() => {
      setUploading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-xl font-bold text-white mb-2">Manual Confirmation</h3>
      <p className="text-gray-300 text-center">Upload a screenshot or photo of your payment receipt. Our team will verify and update your balance.</p>
      <input
        type="file"
        accept="image/*,application/pdf"
        className="text-white"
        onChange={e => setFile(e.target.files?.[0] || null)}
        disabled={uploading}
      />
      {error && <div className="text-red-400 text-xs">{error}</div>}
      <div className="flex gap-2 w-full">
        <button
          className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white font-bold text-md shadow-md hover:from-[#6c2bd7] hover:to-[#3772ff] transition-all duration-200"
          onClick={handleUpload}
          disabled={uploading || !file}
        >{uploading ? 'Uploading...' : 'Submit Receipt'}</button>
        <button
          className="flex-1 py-2 rounded-lg bg-gray-600 text-white font-bold text-md shadow-md hover:bg-gray-700 transition-all duration-200"
          onClick={onCancel}
          disabled={uploading}
        >Cancel</button>
      </div>
    </div>
  );

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
        setProfile(profileData);
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
  // Helper to get available balance from stats
  const getAvailableBalance = () => {
    const stat = stats.find(s => s.label === "Available Balance");
    if (!stat) return 0;
    return Number(stat.value.replace(/[^\d.]/g, ""));
  };
        {activeTab === 'Invest' && (
          <>
            <div className="w-full max-w-3xl bg-[#23272f] rounded-xl p-6 border border-[#23272f] flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Your Investments</h3>
                <button className="bg-[#3772ff] hover:bg-[#6c2bd7] text-white px-4 py-2 rounded-lg font-semibold" onClick={() => { setShowInvestModal(true); setInvestAmount(""); setInvestError(""); }}>Create Investment</button>
              </div>
              <div className="mb-2 text-gray-300">Available Balance: <span className="text-white font-bold">${getAvailableBalance().toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-400">
                  <thead>
                    <tr className="bg-[#181a20]">
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Profit</th>
                      <th className="px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investments.length === 0 && (
                      <tr><td colSpan={4} className="text-center py-4 text-gray-500">No investments yet.</td></tr>
                    )}
                    {investments.map((inv, i) => (
                      <tr key={i} className="border-b border-[#23272f]">
                        <td className="px-4 py-2">${Number(inv.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        <td className="px-4 py-2 capitalize">{inv.status}</td>
                        <td className="px-4 py-2">${Number(inv.profit || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        <td className="px-4 py-2">{new Date(inv.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Invest Modal */}
            {showInvestModal && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
                <div className="bg-[#23272f] rounded-2xl shadow-lg p-8 w-full max-w-md relative flex flex-col gap-6">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setShowInvestModal(false)}>&times;</button>
                  <h3 className="text-xl font-bold text-white mb-2">Create Investment</h3>
                  <div className="mb-2 text-gray-300">Available Balance: <span className="text-white font-bold">${getAvailableBalance().toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span></div>
                  <label className="text-gray-300 font-semibold">Amount to Invest (USD)</label>
                  <input
                    type="number"
                    min="10"
                    className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none mb-2"
                    value={investAmount}
                    onChange={e => setInvestAmount(e.target.value)}
                    placeholder="Enter amount (min $10)"
                  />
                  {investError && <div className="text-red-400 text-xs mb-2">{investError}</div>}
                  <button
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white font-bold text-lg shadow-md hover:from-[#6c2bd7] hover:to-[#3772ff] transition-all duration-200"
                    onClick={async () => {
                      setInvestError("");
                      const amount = Number(investAmount);
                      const balance = getAvailableBalance();
                      if (!amount || amount < 10) {
                        setInvestError("Minimum investment is $10.");
                        return;
                      }
                      if (amount > balance) {
                        setInvestError("Insufficient balance. Please deposit to invest.");
                        return;
                      }
                      // Insert investment into DB
                      await supabase.from('investments').insert({
                        user_id: profile.id,
                        amount: investAmount,
                        status: 'active',
                        profit: 0,
                      });
                      setShowInvestModal(false);
                      setInvestAmount("");
                      // Optionally, refresh investments and stats
                      const { data: newInvestments } = await supabase.from('investments').select('*').eq('user_id', profile.id).order('created_at', { ascending: false });
                      setInvestments(newInvestments || []);
                    }}
                  >Invest</button>
                </div>
              </div>
            )}
          </>
        )}
          // Calculate stats
          const totalDeposit = deposits.data?.filter(d => d.status === 'completed').reduce((sum, d) => sum + Number(d.amount || 0), 0) || 0;
          const totalWithdrawal = withdrawals.data?.filter(w => w.status === 'completed').reduce((sum, w) => sum + Number(w.amount || 0), 0) || 0;
          const activeInvestments = investments.data?.filter(i => i.status === 'active').length || 0;
          const totalProfit = investments.data?.reduce((sum, i) => sum + Number(i.profit || 0), 0) || 0;
          const refBonus = referralBonuses.data?.reduce((sum, r) => sum + Number(r.amount || 0), 0) || 0;
          // Available balance = deposits - withdrawals + profit
          const availableBalance = totalDeposit - totalWithdrawal + totalProfit;
          setStats([
            { label: "Total Deposit", value: `$${totalDeposit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` },
            { label: "Available Balance", value: `$${availableBalance.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` },
            { label: "Active Investment", value: `${activeInvestments}` },
            { label: "Total Profit", value: `$${totalProfit.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` },
            { label: "Ref. Bonus", value: `$${refBonus.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` },
            { label: "Total Withdrawal", value: `$${totalWithdrawal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}` },
          ]);
        }
        // Get greeting based on country/timezone
        let country = profileData?.country;
        let tz = undefined;
        if (country) {
          // Use worldtimeapi.org to get timezone from country
          try {
            const res = await fetch(`https://worldtimeapi.org/api/timezone`);
            const zones = await res.json();
            // Try to find a timezone that includes the country name
            tz = zones.find((z: string) => z.toLowerCase().includes(country.toLowerCase()));
          } catch {}
        }
        let now = new Date();
        if (tz) {
          try {
            const res = await fetch(`https://worldtimeapi.org/api/timezone/${encodeURIComponent(tz)}`);
            const data = await res.json();
            now = new Date(data.datetime);
          } catch {}
        }
        const hour = now.getHours();
        let greet = "Hello";
        if (hour >= 5 && hour < 12) greet = "Hello,";
        else if (hour >= 12 && hour < 18) greet = "Hey,";
        else greet = "Hi,";
        setGreeting(greet);
      }
    });
  }, [router]);

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
      let profit = ((candles[19].c - candles[entryIdx].c) / candles[entryIdx].c) * base;
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181a20] via-[#23272f] to-[#16181d] flex relative font-sans">
      {/* TradingView grid bg */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_40px)]" />
      </div>
      {/* Mobile sidebar toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-[#23272f] text-white p-3 rounded-full shadow-lg border border-[#3772ff] focus:outline-none"
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
        className={`z-20 fixed md:static top-0 left-0 h-full w-64 bg-[#181a20] border-r border-[#23272f] flex flex-col py-10 gap-2 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:w-56 md:min-h-screen`}
        style={{ maxWidth: 260 }}
      >
        {sidebarTabs.map((tab) => (
          <div
            key={tab.label}
            className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-[#23272f] rounded-lg cursor-pointer text-base font-medium ${activeTab === tab.label ? 'bg-[#23272f] text-[#3772ff]' : ''}`}
            onClick={() => { setActiveTab(tab.label); setSidebarOpen(false); }}
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
            <h2 className="text-lg font-semibold text-white">{greeting}, {profile.name || profile.username || 'User'}!</h2>
           </div>
        )}
        <h2 className="text-2xl font-bold text-white mb-4">Dashboard</h2>
        {/* Tabs */}
        {activeTab === 'Dashboard' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#23272f] rounded-xl p-6 flex flex-col items-center shadow border border-[#23272f]">
                  <span className="text-gray-400 text-sm mb-1">{stat.label}</span>
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
            {/* Referral Link */}
            <div className="w-full max-w-2xl bg-[#23272f] rounded-xl p-6 flex flex-col items-center border border-[#23272f] mt-6">
              <span className="text-gray-400 text-sm mb-2">Refer & Earn</span>
              <input
                className="w-full px-4 py-2 rounded-lg bg-[#181a20] border border-[#3772ff] text-white text-center font-mono mb-2"
                value={refLink}
                readOnly
                onFocus={(e) => e.target.select()}
              />
              <span className="text-xs text-gray-500">Share your referral link to earn bonuses.</span>
            </div>
            {/* TradingView Chart */}
            <div className="w-full max-w-3xl bg-[#23272f] rounded-xl p-4 border border-[#23272f] mt-6">
              <div className="mb-2 text-gray-400 font-semibold">XAUUSD Live Chart</div>
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&amp;symbol=OANDA:XAUUSD&amp;interval=15&amp;hidesidetoolbar=1&amp;symboledit=1&amp;saveimage=1&amp;toolbarbg=F1F3F6&amp;studies=[]&amp;theme=dark&amp;style=1&amp;timezone=Etc/UTC&amp;withdateranges=1&amp;hideideas=1&amp;studies_overrides={}&amp;overrides={}&amp;enabled_features=[]&amp;disabled_features=[]&amp;locale=en"
                style={{ width: "100%", height: 400, border: 0 }}
                allowFullScreen
              ></iframe>
            </div>
            {/* Prediction Section */}
            {prediction && (
              <div className="w-full max-w-2xl bg-[#23272f] rounded-xl p-6 border border-[#23272f] mt-6 flex flex-col items-center gap-2">
                <div className="text-lg text-[#27ae60] font-bold mb-1">System Prediction: {prediction.direction} XAUUSD</div>
                <div className="text-gray-400 text-sm">Market started moving in predicted direction at: <span className="text-white font-semibold">{prediction.startTime}</span></div>
                <div className="text-gray-400 text-sm">Entry Price: <span className="text-white font-semibold">${prediction.entry.toFixed(2)}</span></div>
                <div className="text-gray-400 text-sm">Current Price: <span className="text-white font-semibold">${prediction.last.toFixed(2)}</span></div>
                <div className="text-2xl font-extrabold text-[#f2c94c] mt-2">Profit: ${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-base text-gray-400"></span></div>
              </div>
            )}
          </>
        )}
        {activeTab === 'Fund your account' && (
          <>
            <div className="w-full max-w-3xl bg-[#23272f] rounded-xl p-6 border border-[#23272f] flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Deposit History</h3>
                <button className="bg-[#3772ff] hover:bg-[#6c2bd7] text-white px-4 py-2 rounded-lg font-semibold" onClick={() => { setShowDepositModal(true); setDepositStep(0); }}>New Deposit</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-400">
                  <thead>
                    <tr className="bg-[#181a20]">
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depositHistory.length === 0 && (
                      <tr><td colSpan={3} className="text-center py-4 text-gray-500">No deposits yet.</td></tr>
                    )}
                    {depositHistory.map((d, i) => (
                      <tr key={i} className="border-b border-[#23272f]">
                        <td className="px-4 py-2">${Number(d.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                        <td className="px-4 py-2 capitalize">{d.status}</td>
                        <td className="px-4 py-2">{new Date(d.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Deposit Modal */}
            {showDepositModal && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
                <div className="bg-[#23272f] rounded-2xl shadow-lg p-8 w-full max-w-md relative flex flex-col gap-6">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setShowDepositModal(false)}>&times;</button>
                  {depositStep === 0 && (
                    <>
                      <h3 className="text-xl font-bold text-white mb-2">New Deposit</h3>
                      <label className="text-gray-300 font-semibold">Select Payment Method</label>
                      <div className="flex gap-3 mb-2">
                        {Object.entries(DEPOSIT_ADDRESSES).map(([key, val]) => (
                          <button
                            key={key}
                            className={`px-4 py-2 rounded-lg font-semibold border ${depositMethod === key ? 'bg-[#3772ff] text-white border-[#3772ff]' : 'bg-[#181a20] text-gray-300 border-[#23272f]'}`}
                            onClick={() => setDepositMethod(key as keyof typeof DEPOSIT_ADDRESSES)}
                          >
                            {val.label}
                          </button>
                        ))}
                      </div>
                      <label className="text-gray-300 font-semibold">Amount (USD)</label>
                      <input
                        type="number"
                        min="10"
                        className="px-4 py-2 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none mb-2"
                        value={depositAmount}
                        onChange={e => setDepositAmount(e.target.value)}
                        placeholder="Enter amount (min $10)"
                      />
                      {depositAmount && Number(depositAmount) < 10 && (
                        <div className="text-red-400 text-xs mb-2">Minimum deposit is $10.</div>
                      )}
                      <label className="text-gray-300 font-semibold">{DEPOSIT_ADDRESSES[depositMethod].label} Address</label>
                      <div className="flex flex-col gap-1 mb-2">
                        <span className="text-xs text-gray-400">Tap or copy the address below and send funds from your wallet.</span>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono text-white cursor-pointer select-all break-all max-w-[220px] md:max-w-xs"
                            style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}
                            onClick={async () => {
                              await navigator.clipboard.writeText(DEPOSIT_ADDRESSES[depositMethod].address);
                              setCopyMsg('Copied!');
                              setTimeout(() => setCopyMsg(''), 1200);
                            }}
                          >
                            {DEPOSIT_ADDRESSES[depositMethod].address}
                          </span>
                          <button
                            className="text-[#3772ff] hover:underline text-xs"
                            onClick={async (e) => {
                              e.preventDefault();
                              await navigator.clipboard.writeText(DEPOSIT_ADDRESSES[depositMethod].address);
                              setCopyMsg('Copied!');
                              setTimeout(() => setCopyMsg(''), 1200);
                            }}
                          >Copy</button>
                          {copyMsg && <span className="text-green-400 text-xs ml-1">{copyMsg}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <button
                          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white font-bold text-lg shadow-md hover:from-[#6c2bd7] hover:to-[#3772ff] transition-all duration-200"
                          onClick={async () => {
                            if (!depositAmount || Number(depositAmount) < 10) {
                              setCopyMsg('Minimum deposit is $10');
                              setTimeout(() => setCopyMsg(''), 2000);
                              return;
                            }
                            // Deep link to wallet (works for mobile and desktop extensions)
                            let url = '';
                            const amount = depositAmount || '0';
                            if (depositMethod === 'BTC') {
                              url = `bitcoin:${DEPOSIT_ADDRESSES.BTC.address}?amount=${amount}`;
                            } else if (depositMethod === 'ETH') {
                              url = `ethereum:${DEPOSIT_ADDRESSES.ETH.address}?value=${Number(amount) * 1e18}`;
                            } else if (depositMethod === 'USDT') {
                              url = `ethereum:${DEPOSIT_ADDRESSES.USDT.address}?value=${Number(amount) * 1e6}`;
                            }
                            window.open(url, '_blank', 'noopener,noreferrer');
                            setDepositStep(99); // loading state
                            setTimeout(() => setDepositStep(1), 60 * 1000); // 1 min
                          }}
                          disabled={!depositAmount || Number(depositAmount) < 10}
                        >Pay</button>
                        <button
                          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#f2c94c] to-[#27ae60] text-[#181a20] font-bold text-lg shadow-md hover:from-[#27ae60] hover:to-[#f2c94c] transition-all duration-200"
                          onClick={() => setDepositStep(10)}
                          disabled={!depositAmount || Number(depositAmount) < 10}
                        >Manual Confirmation</button>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">After payment, return here and click confirm.</div>
                    </>
                  )}

                  {/* Manual Confirmation Step: Upload Receipt */}
                  {depositStep === 10 && (
                    <ManualReceiptUpload
                      depositAmount={depositAmount}
                      depositMethod={depositMethod}
                      profile={profile}
                      onSuccess={() => { setDepositStep(2); setShowDepositModal(false); setDepositAmount(''); }}
                      onCancel={() => setDepositStep(0)}
                    />
                  )}
                  {depositStep === 99 && (
                    <div className="flex flex-col items-center gap-4 py-8">
                      <svg className="animate-spin h-8 w-8 text-[#3772ff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      <div className="text-white text-center">Awaiting payment confirmation...<br/>You can return to your wallet to complete the payment.<br/>This will unlock confirmation in about 1 minute.</div>
                    </div>
                  )}
                  {depositStep === 1 && (
                    <>
                      <h3 className="text-xl font-bold text-white mb-2">Confirm Deposit</h3>
                      <p className="text-gray-300 mb-4">After sending your payment, click confirm below. An agent will verify and update your balance soon.</p>
                      <button
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-[#27ae60] to-[#f2c94c] text-[#181a20] font-bold text-lg shadow-md hover:from-[#f2c94c] hover:to-[#27ae60] transition-all duration-200"
                        onClick={async () => {
                          // Insert pending deposit into DB
                          await supabase.from('deposits').insert({
                            user_id: profile.id,
                            amount: depositAmount,
                            status: 'pending',
                          });
                          setDepositStep(2);
                        }}
                      >Confirm</button>
                    </>
                  )}
                  {depositStep === 2 && (
                    <>
                      <h3 className="text-xl font-bold text-white mb-2">Deposit Submitted</h3>
                      <p className="text-green-400 mb-4">Success! An agent will confirm your deposit and update your balance soon.</p>
                      <button
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white font-bold text-lg shadow-md hover:from-[#6c2bd7] hover:to-[#3772ff] transition-all duration-200"
                        onClick={() => { setShowDepositModal(false); setDepositAmount(''); setDepositStep(0); }}
                      >Close</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
