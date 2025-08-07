"use client";
import React, { useState, useEffect } from "react";

interface WithdrawTabProps {
  userBalance?: number;
}

interface WithdrawalNotification {
  id: string;
  name: string;
  amount: number;
  timestamp: number;
}

const WithdrawTab: React.FC<WithdrawTabProps> = ({ userBalance = 0 }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [notifications, setNotifications] = useState<WithdrawalNotification[]>([]);

  // Mock withdrawal history (empty for now)
  const withdrawalHistory: any[] = [];

  // Random names for withdrawal notifications
  const randomNames = [
    "SaintMaya", "CryptoKing", "InvestorJoe", "TradeMaster", "WealthBuilder",
    "MoneyMaker", "ProfitGuru", "GoldRush", "DiamondHands", "BullRun",
    "CashFlow", "RichMind", "WinnerCircle", "SuccessPath", "EliteTrader",
    "FortuneTeller", "MoneyTree", "GoldenEagle", "SilverBullet", "PlatinumStar",
    "MillionDream", "WealthWave", "ProfitPilot", "CashCowboy", "RichRider"
  ];

  // Generate random withdrawal notification
  const generateNotification = (): WithdrawalNotification => {
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomAmount = Math.floor(Math.random() * 50000) + 1000; // $1,000 - $51,000
    
    return {
      id: `${Date.now()}_${Math.random()}`,
      name: randomName,
      amount: randomAmount,
      timestamp: Date.now()
    };
  };

  // Add new notification every 2 minutes
  useEffect(() => {
    // Add initial notification
    const initialNotification = generateNotification();
    setNotifications([initialNotification]);

    const interval = setInterval(() => {
      const newNotification = generateNotification();
      setNotifications(prev => [...prev, newNotification]);
    }, 120000); // 2 minutes = 120,000ms

    return () => clearInterval(interval);
  }, []);

  // Remove notifications after animation
  useEffect(() => {
    notifications.forEach(notification => {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 8000); // Remove after 8 seconds (animation duration)
    });
  }, [notifications]);

  const handleWithdrawClick = () => {
    setWithdrawError("");
    setWithdrawAmount("");
    setShowWithdrawModal(true);
  };

  const handleWithdrawSubmit = () => {
    setWithdrawError("");
    
    const amount = Number(withdrawAmount);
    
    if (!withdrawAmount || amount <= 0) {
      setWithdrawError("Please enter a valid withdrawal amount.");
      return;
    }

    if (amount < 50) {
      setWithdrawError("Minimum withdrawal amount is $50.");
      return;
    }

    // Always show insufficient balance error (as requested)
    setWithdrawError("Insufficient balance. Please ensure you have enough funds to withdraw.");
  };

  return (
    <div className="relative">
      <div className="w-full max-w-5xl bg-[#23272f] rounded-xl p-3 sm:p-4 md:p-6 border border-[#23272f] flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#27ae60] rounded-lg flex items-center justify-center text-white">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                <path d="M12 2v10l-3-3M12 12l3-3"/>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Withdraw Funds</h3>
          </div>
          <button 
            className="bg-[#27ae60] hover:bg-[#219a52] text-white px-4 py-3 sm:py-2 rounded-lg font-semibold w-full sm:w-auto text-sm sm:text-base"
            onClick={handleWithdrawClick}
          >
            Withdraw Funds
          </button>
        </div>
        
        <div className="mb-2 sm:mb-4">
          <div className="text-xs sm:text-sm text-gray-400">Available Balance: <span className="text-white font-semibold">${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
        </div>

        <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead>
                <tr className="bg-[#181a20]">
                  <th className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap text-xs sm:text-sm">Date</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap text-xs sm:text-sm">Amount</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap text-xs sm:text-sm hidden sm:table-cell">Method</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap text-xs sm:text-sm">Status</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap text-xs sm:text-sm hidden md:table-cell">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 sm:py-8 text-gray-500 px-2 sm:px-4 text-sm">
                      No withdrawals yet. Your withdrawal history will appear here.
                    </td>
                  </tr>
                )}
                {withdrawalHistory.map((withdrawal, i) => (
                  <tr key={i} className="border-b border-[#23272f]">
                    <td className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap text-xs">
                      <div className="sm:hidden">{new Date(withdrawal.created_at).toLocaleDateString()}</div>
                      <div className="hidden sm:block">{new Date(withdrawal.created_at).toLocaleString()}</div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap font-medium text-red-400 text-xs sm:text-sm">
                      -${Number(withdrawal.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap capitalize text-xs sm:text-sm hidden sm:table-cell">{withdrawal.method}</td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 capitalize whitespace-nowrap">
                      <span className={`px-1 sm:px-2 py-1 rounded-full text-xs font-medium ${
                        withdrawal.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                        withdrawal.status === 'pending' ? 'bg-yellow-400/10 text-yellow-400' :
                        withdrawal.status === 'failed' ? 'bg-red-400/10 text-red-400' :
                        'bg-gray-400/10 text-gray-400'
                      }`}>
                        {withdrawal.status}
                      </span>
                      <div className="sm:hidden text-xs text-gray-400 mt-1 capitalize">{withdrawal.method}</div>
                    </td>
                    <td className="px-2 sm:px-3 md:px-4 py-2 whitespace-nowrap font-mono text-xs hidden md:table-cell">{withdrawal.txid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-3 sm:p-4">
          <div className="bg-[#23272f] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md relative flex flex-col gap-3 sm:gap-4 md:gap-6 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <button 
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-white text-2xl sm:text-2xl w-8 h-8 flex items-center justify-center"
              onClick={() => setShowWithdrawModal(false)}
            >
              &times;
            </button>
            
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 pr-10 sm:pr-8">Withdraw Funds</h3>
            
            <div className="flex flex-col gap-3 sm:gap-4">
              <div>
                <label className="text-sm sm:text-base text-gray-300 font-semibold">Available Balance</label>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#27ae60]">
                  ${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
              </div>

              <div>
                <label className="text-sm sm:text-base text-gray-300 font-semibold">Withdrawal Amount (USD)</label>
                <input
                  type="number"
                  min="50"
                  max={userBalance}
                  className="w-full px-3 sm:px-4 py-3 rounded-lg bg-[#181a20] border border-[#23272f] text-white focus:ring-2 focus:ring-[#27ae60] outline-none mt-1 text-sm sm:text-base"
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount (min $50)"
                />
                <div className="text-xs text-gray-400 mt-1">Minimum withdrawal: $50</div>
              </div>

              {withdrawError && (
                <div className="text-red-400 text-xs sm:text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-2 sm:p-3">
                  {withdrawError}
                </div>
              )}

              <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
                <button
                  className="w-full py-3 sm:py-3 rounded-lg bg-gradient-to-r from-[#27ae60] to-[#2ecc71] text-white font-bold text-sm sm:text-lg shadow-md hover:from-[#219a52] hover:to-[#27ae60] transition-all duration-200 disabled:opacity-50"
                  onClick={handleWithdrawSubmit}
                  disabled={!withdrawAmount}
                >
                  Next
                </button>
                <button
                  className="w-full py-3 sm:py-3 rounded-lg bg-gray-600 text-white font-bold text-sm sm:text-lg shadow-md hover:bg-gray-700 transition-all duration-200"
                  onClick={() => setShowWithdrawModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Notifications */}
      <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 pointer-events-none">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="mb-1 sm:mb-2 bg-gradient-to-r from-[#27ae60] to-[#2ecc71] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg animate-[slideInFadeOut_8s_ease-in-out_forwards] max-w-[280px] sm:max-w-xs"
            style={{
              animation: `slideInFadeOut 8s ease-in-out forwards`
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">💰</span>
              <div className="text-xs sm:text-sm">
                <div className="font-semibold">{notification.name}</div>
                <div className="text-green-100">withdrew ${notification.amount.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slideInFadeOut {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          10% {
            transform: translateX(0);
            opacity: 1;
          }
          90% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WithdrawTab;
