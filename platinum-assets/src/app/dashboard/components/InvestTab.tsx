"use client";
import React, { useState } from "react";

interface InvestTabProps {
  userBalance: number;
}

const InvestTab: React.FC<InvestTabProps> = ({ userBalance = 0 }) => {
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investAmount, setInvestAmount] = useState("");
  const [investError, setInvestError] = useState("");

  // Mock investment history (empty for now)
  const investmentHistory: any[] = [];

  const handleInvestClick = () => {
    setInvestError("");
    setInvestAmount("");
    setShowInvestModal(true);
  };

  const handleInvestSubmit = () => {
    setInvestError("");
    
    const amount = Number(investAmount);
    
    if (!investAmount || amount <= 0) {
      setInvestError("Please enter a valid investment amount.");
      return;
    }

    if (amount < 50) {
      setInvestError("Minimum investment amount is $50.");
      return;
    }

    if (amount > userBalance) {
      setInvestError("Insufficient balance. Please deposit funds to continue investing.");
      return;
    }

    // Mock success - in real app this would submit to backend
    alert(`Investment of $${amount.toLocaleString()} submitted successfully!`);
    setShowInvestModal(false);
    setInvestAmount("");
  };

  return (
    <>
      <div className="w-full max-w-5xl bg-[#23272f] rounded-xl p-4 md:p-6 border border-[#23272f] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <h3 className="text-xl font-bold text-white">My Investments</h3>
          <button 
            className="bg-[#3772ff] hover:bg-[#6c2bd7] text-white px-4 py-2 rounded-lg font-semibold w-full sm:w-auto"
            onClick={handleInvestClick}
          >
            New Investment
          </button>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-400">Available Balance: <span className="text-white font-semibold">${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead>
                <tr className="bg-[#181a20]">
                  <th className="px-3 md:px-4 py-2 whitespace-nowrap">Amount</th>
                  <th className="px-3 md:px-4 py-2 whitespace-nowrap">Plan</th>
                  <th className="px-3 md:px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-3 md:px-4 py-2 whitespace-nowrap">Profit</th>
                  <th className="px-3 md:px-4 py-2 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody>
                {investmentHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500 px-4">
                      No investments yet. Start investing to grow your portfolio!
                    </td>
                  </tr>
                )}
                {investmentHistory.map((investment, i) => (
                  <tr key={i} className="border-b border-[#23272f]">
                    <td className="px-3 md:px-4 py-2 whitespace-nowrap">${Number(investment.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    <td className="px-3 md:px-4 py-2 whitespace-nowrap">{investment.plan}</td>
                    <td className="px-3 md:px-4 py-2 capitalize whitespace-nowrap">{investment.status}</td>
                    <td className="px-3 md:px-4 py-2 whitespace-nowrap">${Number(investment.profit || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    <td className="px-3 md:px-4 py-2 whitespace-nowrap text-xs md:text-sm">{new Date(investment.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#23272f] rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-md relative flex flex-col gap-4 md:gap-6 max-h-[90vh] overflow-y-auto">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              onClick={() => setShowInvestModal(false)}
            >
              &times;
            </button>
            
            <h3 className="text-xl font-bold text-white mb-2 pr-8">New Investment</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-gray-300 font-semibold">Available Balance</label>
                <div className="text-xl md:text-2xl font-bold text-[#3772ff]">
                  ${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-semibold">Investment Amount (USD)</label>
                <input
                  type="number"
                  min="50"
                  max={userBalance}
                  className="w-full px-4 py-3 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none mt-1"
                  value={investAmount}
                  onChange={e => setInvestAmount(e.target.value)}
                  placeholder="Enter amount (min $50)"
                />
                <div className="text-xs text-gray-400 mt-1">Minimum investment: $50</div>
              </div>

              {investError && (
                <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                  {investError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white font-bold text-lg shadow-md hover:from-[#6c2bd7] hover:to-[#3772ff] transition-all duration-200"
                  onClick={handleInvestSubmit}
                  disabled={!investAmount}
                >
                  Invest Now
                </button>
                <button
                  className="flex-1 py-3 rounded-lg bg-gray-600 text-white font-bold text-lg shadow-md hover:bg-gray-700 transition-all duration-200"
                  onClick={() => setShowInvestModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestTab;
