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
  );
};

export default DashboardTab;
