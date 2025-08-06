"use client";
import React from "react";

const TransactionHistoryTab: React.FC = () => {
  // Mock transaction history (empty for now)
  const transactionHistory: any[] = [];

  return (
    <div className="w-full max-w-5xl bg-[#23272f] rounded-xl p-4 md:p-6 border border-[#23272f] flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <h3 className="text-xl font-bold text-white">Transaction History</h3>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full text-sm text-left text-gray-400">
            <thead>
              <tr className="bg-[#181a20]">
                <th className="px-3 md:px-4 py-2 whitespace-nowrap">Date</th>
                <th className="px-3 md:px-4 py-2 whitespace-nowrap">Type</th>
                <th className="px-3 md:px-4 py-2 whitespace-nowrap">Amount</th>
                <th className="px-3 md:px-4 py-2 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 px-4">
                    No transactions yet. Your transaction history will appear here.
                  </td>
                </tr>
              )}
              {transactionHistory.map((transaction, i) => (
                <tr key={i} className="border-b border-[#23272f]">
                  <td className="px-3 md:px-4 py-2 whitespace-nowrap text-xs md:text-sm">{new Date(transaction.created_at).toLocaleString()}</td>
                  <td className="px-3 md:px-4 py-2 capitalize whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'deposit' ? 'bg-green-400/10 text-green-400' :
                      transaction.type === 'withdrawal' ? 'bg-red-400/10 text-red-400' :
                      transaction.type === 'investment' ? 'bg-blue-400/10 text-blue-400' :
                      'bg-gray-400/10 text-gray-400'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2 whitespace-nowrap font-medium">
                    <span className={transaction.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}${Number(transaction.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2 capitalize whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' ? 'bg-green-400/10 text-green-400' :
                      transaction.status === 'pending' ? 'bg-yellow-400/10 text-yellow-400' :
                      transaction.status === 'failed' ? 'bg-red-400/10 text-red-400' :
                      'bg-gray-400/10 text-gray-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2 text-gray-300 max-w-xs truncate">{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryTab;
