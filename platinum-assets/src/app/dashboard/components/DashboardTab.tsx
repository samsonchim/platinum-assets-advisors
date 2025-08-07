"use client";
import React from "react";

interface DashboardTabProps {
  stats: Array<{ label: string; value: string }>;
  refLink: string;
  prediction: {
    direction: string;
    startTime: string;
    entry: number;
    last: number;
  } | null;
  profit: number;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ stats, refLink, prediction, profit }) => {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {stats.map((stat, index) => {
          const icons = [
            // Total Deposit
            <svg key="deposit" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              <path d="M6 8h8v2H6V8z"/>
            </svg>,
            // Available Balance
            <svg key="balance" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
            </svg>,
            // Active Investment
            <svg key="investment" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 0L10.6 21H3z"/>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>,
            // Total Profit
            <svg key="profit" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 12l9-7 3 3 8-8v6l-8 8-3-3-9 7z"/>
            </svg>,
            // Ref. Bonus
            <svg key="referral" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              <path d="M19 8l-2 2 2 2v-4z"/>
            </svg>,
            // Total Withdrawal
            <svg key="withdrawal" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              <path d="M12 2v10l-3-3M12 12l3-3"/>
            </svg>
          ];
          
          return (
            <div key={stat.label} className="bg-[#23272f] rounded-xl p-6 flex flex-col items-center shadow border border-[#23272f]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#3772ff] rounded-lg flex items-center justify-center text-white">
                  {icons[index]}
                </div>
              </div>
              <span className="text-gray-400 text-sm mb-1 text-center">{stat.label}</span>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
          );
        })}
      </div>
      {/* Referral Link */}
      <div className="w-full max-w-2xl bg-[#23272f] rounded-xl p-6 flex flex-col items-center border border-[#23272f] mt-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-[#f2c94c] rounded-lg flex items-center justify-center text-[#181a20]">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              <path d="M19 8l-2 2 2 2v-4z"/>
            </svg>
          </div>
          <span className="text-gray-400 text-sm">Refer & Earn</span>
        </div>
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
        <div className="mb-2 text-gray-400 font-semibold flex items-center gap-3">
          <div className="w-8 h-8 bg-[#27ae60] rounded-lg flex items-center justify-center text-white">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 0L10.6 21H3z"/>
              <path d="M7 9l4 4 4-7 6 6"/>
            </svg>
          </div>
          XAUUSD Live Chart
        </div>
        <iframe
          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&amp;symbol=OANDA:XAUUSD&amp;interval=15&amp;hidesidetoolbar=1&amp;symboledit=1&amp;saveimage=1&amp;toolbarbg=F1F3F6&amp;studies=[]&amp;theme=dark&amp;style=1&amp;timezone=Etc/UTC&amp;withdateranges=1&amp;hideideas=1&amp;studies_overrides={}&amp;overrides={}&amp;enabled_features=[]&amp;disabled_features=[]&amp;locale=en"
          style={{ width: "100%", height: 400, border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
      {/* Prediction Section */}
      {prediction && (
        <div className="w-full max-w-2xl bg-[#23272f] rounded-xl p-6 border border-[#23272f] mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#27ae60] rounded-lg flex items-center justify-center text-white">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="text-lg text-[#27ae60] font-bold">System Prediction: {prediction.direction} XAUUSD</div>
          </div>
          <div className="text-gray-400 text-sm">Market started moving in predicted direction at: <span className="text-white font-semibold">{prediction.startTime}</span></div>
          <div className="text-gray-400 text-sm">Entry Price: <span className="text-white font-semibold">${prediction.entry.toFixed(2)}</span></div>
          <div className="text-gray-400 text-sm">Current Price: <span className="text-white font-semibold">${prediction.last.toFixed(2)}</span></div>
          <div className="text-2xl font-extrabold text-[#f2c94c] mt-2">Profit: ${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-base text-gray-400"></span></div>
        </div>
      )}
    </>
  );
};

export default DashboardTab;
