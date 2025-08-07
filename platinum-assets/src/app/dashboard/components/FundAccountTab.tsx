"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const DEPOSIT_ADDRESSES = {
  BTC: {
    address: "bc1q3vrjl9wwmksgtqx5lgxxztpsserjgu49emz8xh",
    label: "Bitcoin (BTC)"
  },
  ETH: {
    address: "0x528d76f59a5b2398f9eeebc01CdaB47A6AD129D6",
    label: "Ethereum (ETH)"
  },
  USDT: {
    address: "0x528d76f59a5b2398f9eeebc01CdaB47A6AD129D6",
    label: "USDT (ERC20)"
  }
};

type Deposit = {
  amount: number;
  status: string;
  created_at: string;
};

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
}

interface FundAccountTabProps {
  depositHistory: Deposit[];
  profile: any;
}

const FundAccountTab: React.FC<FundAccountTabProps> = ({ depositHistory, profile }) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositMethod, setDepositMethod] = useState<keyof typeof DEPOSIT_ADDRESSES>("BTC");
  const [depositAmount, setDepositAmount] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const [depositStep, setDepositStep] = useState(0); // 0: input, 1: confirm, 2: success

  return (
    <>
    <div className="flex flex-col gap-6">
      {/* Active and Inactive Deposits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Active Deposits */}
        <div className="bg-[#23272f] rounded-xl p-6 border border-[#23272f] relative">
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Active Deposits
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                <path d="M6 8h8v2H6V8z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white">
                ${depositHistory
                  .filter(d => d.status === 'completed' || d.status === 'confirmed' || d.status === 'active')
                  .reduce((sum, d) => sum + Number(d.amount), 0)
                  .toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </h3>
              <p className="text-gray-400 text-sm">Available Deposits</p>
            </div>
          </div>
        </div>

        {/* Inactive Deposits */}
        <div className="bg-[#23272f] rounded-xl p-6 border border-[#23272f] relative">
          <div className="absolute top-4 right-4">
            <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Inactive Deposits
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center relative">
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                  <path d="M2 12a10 10 0 1010 10A10 10 0 002 12zm8-1h4v2h-4z"/>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white">
                ${depositHistory
                  .filter(d => d.status === 'pending' || d.status === 'processing' || d.status === 'inactive')
                  .reduce((sum, d) => sum + Number(d.amount), 0)
                  .toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </h3>
              <p className="text-gray-400 text-sm">Pending Deposits</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-[#23272f] rounded-xl p-6 border border-[#23272f] flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#3772ff] rounded-lg flex items-center justify-center text-white">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <path d="m14,2 0,6 6,0"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Deposit History</h3>
          </div>
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
    </div>
    </>
  );
};

export default FundAccountTab;
