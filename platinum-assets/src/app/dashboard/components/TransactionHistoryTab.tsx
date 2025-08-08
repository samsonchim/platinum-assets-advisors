"use client";
import React from "react";

const TransactionHistoryTab: React.FC = () => {
  // Mock transaction history (empty for now)
  const transactionHistory: any[] = [];

  return (
    <div className="w-full max-w-5xl bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              <path d="m14,2 0,6 6,0"/>
              <path d="M8 12h8M8 16h8M8 8h2"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Transaction History</h3>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 md:px-4 py-2 whitespace-nowrap font-semibold text-gray-700">Date</th>
                <th className="px-3 md:px-4 py-2 whitespace-nowrap font-semibold text-gray-700">Type</th>
                <th className="px-3 md:px-4 py-2 whitespace-nowrap font-semibold text-gray-700">Amount</th>
                <th className="px-3 md:px-4 py-2 whitespace-nowrap font-semibold text-gray-700">Status</th>
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
                <tr key={i} className="border-b border-gray-200">
                  <td className="px-3 md:px-4 py-2 whitespace-nowrap text-xs md:text-sm">{new Date(transaction.created_at).toLocaleString()}</td>
                  <td className="px-3 md:px-4 py-2 capitalize whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'deposit' ? 'bg-green-50 text-green-700' :
                      transaction.type === 'withdrawal' ? 'bg-red-50 text-red-700' :
                      transaction.type === 'investment' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2 whitespace-nowrap font-medium">
                    <span className={transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}${Number(transaction.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2 capitalize whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' ? 'bg-green-50 text-green-700' :
                      transaction.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                      transaction.status === 'failed' ? 'bg-red-50 text-red-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-4 py-2 text-gray-600 max-w-xs truncate">{transaction.description}</td>
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
