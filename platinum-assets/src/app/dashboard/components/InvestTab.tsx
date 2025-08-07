"use client";
import React, { useState } from "react";

interface InvestTabProps {
  userBalance: number;
}

const InvestTab: React.FC<InvestTabProps> = ({ userBalance = 0 }) => {
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investAmount, setInvestAmount] = useState("");
  const [investError, setInvestError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Investment amount options with plan details
  const investmentOptions = [
    { 
      value: "500", 
      label: "$500 - $1,000", 
      plan: "Starter Plan",
      duration: "7 days",
      roi: "10%",
      dailyReturn: "0.71%",
      totalReturn: "$1,000"
    },
    { 
      value: "1000", 
      label: "$1,000 - $3,000", 
      plan: "Basic Plan",
      duration: "14 days",
      roi: "12%",
      dailyReturn: "0.86%",
      totalReturn: "$3,360"
    },
    { 
      value: "5000", 
      label: "$5,000 - $10,000", 
      plan: "Gold Plan",
      duration: "14 days",
      roi: "18%",
      dailyReturn: "1.29%",
      totalReturn: "$11,800"
    },
    { 
      value: "20000", 
      label: "$20,000 - $30,000", 
      plan: "Platinum Plan",
      duration: "14 days",
      roi: "22%",
      dailyReturn: "1.57%",
      totalReturn: "$36,600"
    },
    { 
      value: "50000", 
      label: "$50,000 - $100,000", 
      plan: "Elite Plan",
      duration: "14 days",
      roi: "28%",
      dailyReturn: "2.00%",
      totalReturn: " $128,000"
    },
  ];

  // Mock investment history (empty for now)
  const investmentHistory: any[] = [];

  const handleInvestClick = () => {
    setInvestError("");
    setInvestAmount("");
    setSelectedPlan(null);
    setShowInvestModal(true);
  };

  const handleInvestSubmit = () => {
    setInvestError("");
    
    const amount = Number(investAmount);
    
    if (!investAmount || amount <= 0) {
      setInvestError("Please select an investment amount.");
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#27ae60] rounded-lg flex items-center justify-center text-white">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 0L10.6 21H3z"/>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">My Investments</h3>
          </div>
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

        {/* Investment Plans Overview */}
        <div className="bg-[#181a20] rounded-lg p-4 mb-4">
          <h4 className="text-lg font-semibold text-white mb-3">Available Investment Plans</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {investmentOptions.map((plan) => (
              <div 
                key={plan.value} 
                className={`p-3 rounded-lg border ${Number(plan.value) > userBalance ? 'border-gray-600 opacity-50' : 'border-[#3772ff]/30 hover:border-[#3772ff] cursor-pointer'} transition-colors`}
                onClick={() => Number(plan.value) <= userBalance ? handleInvestClick() : null}
              >
                <div className="font-semibold text-[#3772ff]">{plan.plan}</div>
                <div className="text-white font-bold">{plan.label}</div>
                <div className="text-gray-400 mt-1">
                  <div>Duration: {plan.duration}</div>
                  <div>ROI: <span className="text-[#27ae60]">{plan.roi}</span></div>
                  <div>Returns: <span className="text-[#f2c94c]">{plan.totalReturn}</span></div>
                </div>
                {Number(plan.value) > userBalance && (
                  <div className="text-red-400 text-xs mt-1">Insufficient Balance</div>
                )}
              </div>
            ))}
          </div>
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
                <label className="text-gray-300 font-semibold">Investment Amount</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#3772ff] outline-none mt-1"
                  value={investAmount}
                  onChange={e => {
                    setInvestAmount(e.target.value);
                    const plan = investmentOptions.find(opt => opt.value === e.target.value);
                    setSelectedPlan(plan || null);
                  }}
                >
                  <option value="">Select investment amount</option>
                  {investmentOptions.map((option) => (
                    <option 
                      key={option.value} 
                      value={option.value}
                      disabled={Number(option.value) > userBalance}
                      className={Number(option.value) > userBalance ? "text-gray-500" : ""}
                    >
                      {option.label} - {option.plan}
                      {Number(option.value) > userBalance ? " (Insufficient Balance)" : ""}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-gray-400 mt-1">Choose from available investment packages</div>
              </div>

              {/* Plan Details */}
              {selectedPlan && (
                <div className="bg-[#181a20] rounded-lg p-4 border border-[#3772ff]/20">
                  <h4 className="text-lg font-bold text-[#3772ff] mb-3">{selectedPlan.plan}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Investment:</span>
                      <div className="text-white font-semibold">{selectedPlan.label}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Duration:</span>
                      <div className="text-white font-semibold">{selectedPlan.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Total ROI:</span>
                      <div className="text-[#27ae60] font-semibold">{selectedPlan.roi}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Daily Return:</span>
                      <div className="text-[#27ae60] font-semibold">{selectedPlan.dailyReturn}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#23272f]">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Expected Total Return:</span>
                      <div className="text-xl font-bold text-[#f2c94c]">{selectedPlan.totalReturn}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Profit: {selectedPlan.totalReturn.replace('$', '').replace(',', '') - Number(selectedPlan.value) > 0 ? 
                        `$${(Number(selectedPlan.totalReturn.replace('$', '').replace(',', '')) - Number(selectedPlan.value)).toLocaleString()}` : 
                        '$0'}
                    </div>
                  </div>
                </div>
              )}

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
