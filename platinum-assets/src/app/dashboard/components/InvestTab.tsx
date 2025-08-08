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
      <div className="w-full max-w-5xl bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-lg flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 0L10.6 21H3z"/>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">My Investments</h3>
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full sm:w-auto shadow-md transition-colors"
            onClick={handleInvestClick}
          >
            New Investment
          </button>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600">Available Balance: <span className="text-gray-900 font-semibold">${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
        </div>

        {/* Investment Plans Overview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Available Investment Plans</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {investmentOptions.map((plan) => (
              <div 
                key={plan.value} 
                className={`p-3 rounded-lg border-2 transition-all ${Number(plan.value) > userBalance ? 'border-gray-300 opacity-50 bg-gray-100' : 'border-blue-200 hover:border-blue-400 cursor-pointer bg-white hover:shadow-md'}`}
                onClick={() => Number(plan.value) <= userBalance ? handleInvestClick() : null}
              >
                <div className="font-semibold text-blue-600">{plan.plan}</div>
                <div className="text-gray-900 font-bold">{plan.label}</div>
                <div className="text-gray-600 mt-1">
                  <div>Duration: {plan.duration}</div>
                  <div>ROI: <span className="text-green-600 font-semibold">{plan.roi}</span></div>
                  <div>Returns: <span className="text-orange-600 font-semibold">{plan.totalReturn}</span></div>
                </div>
                {Number(plan.value) > userBalance && (
                  <div className="text-red-500 text-xs mt-1">Insufficient Balance</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full text-sm text-left text-gray-600 bg-white rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-3 md:px-4 py-3 whitespace-nowrap font-semibold text-gray-900">Amount</th>
                  <th className="px-3 md:px-4 py-3 whitespace-nowrap font-semibold text-gray-900">Plan</th>
                  <th className="px-3 md:px-4 py-3 whitespace-nowrap font-semibold text-gray-900">Status</th>
                  <th className="px-3 md:px-4 py-3 whitespace-nowrap font-semibold text-gray-900">Profit</th>
                  <th className="px-3 md:px-4 py-3 whitespace-nowrap font-semibold text-gray-900">Date</th>
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
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap text-gray-900">${Number(investment.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap text-gray-900">{investment.plan}</td>
                    <td className="px-3 md:px-4 py-3 capitalize whitespace-nowrap text-gray-900">{investment.status}</td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap text-gray-900">${Number(investment.profit || 0).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                    <td className="px-3 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm text-gray-600">{new Date(investment.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md relative flex flex-col gap-4 md:gap-6 max-h-[90vh] overflow-y-auto border border-gray-200">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowInvestModal(false)}
            >
              &times;
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 pr-8">New Investment</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-gray-700 font-semibold">Available Balance</label>
                <div className="text-xl md:text-2xl font-bold text-blue-600">
                  ${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-semibold">Investment Amount</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
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
                      className={Number(option.value) > userBalance ? "text-gray-400" : ""}
                    >
                      {option.label} - {option.plan}
                      {Number(option.value) > userBalance ? " (Insufficient Balance)" : ""}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">Choose from available investment packages</div>
              </div>

              {/* Plan Details */}
              {selectedPlan && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-700 mb-3">{selectedPlan.plan}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Investment:</span>
                      <div className="text-gray-900 font-semibold">{selectedPlan.label}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <div className="text-gray-900 font-semibold">{selectedPlan.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Total ROI:</span>
                      <div className="text-green-600 font-semibold">{selectedPlan.roi}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Daily Return:</span>
                      <div className="text-green-600 font-semibold">{selectedPlan.dailyReturn}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expected Total Return:</span>
                      <div className="text-xl font-bold text-orange-600">{selectedPlan.totalReturn}</div>
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
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {investError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
                  onClick={handleInvestSubmit}
                  disabled={!investAmount}
                >
                  Invest Now
                </button>
                <button
                  className="flex-1 py-3 rounded-lg bg-gray-500 text-white font-bold text-lg shadow-md hover:bg-gray-600 transition-all duration-200"
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
