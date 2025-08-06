"use client";
import React, { useState } from "react";

interface ReferUserTabProps {
  refLink: string;
}

const ReferUserTab: React.FC<ReferUserTabProps> = ({ refLink }) => {
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(refLink);
      setCopyMessage("Link copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch (error) {
      setCopyMessage("Failed to copy");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  const shareMessage = `🚀 Join me on Platinum Assets Advisors and start your investment journey! Sign up using my referral link and let's grow our portfolios together: ${refLink}`;

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: "💬",
      url: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "Email",
      icon: "📧",
      url: `mailto:?subject=${encodeURIComponent("Join Platinum Assets Advisors!")}&body=${encodeURIComponent(shareMessage)}`,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      name: "Facebook",
      icon: "📘",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Join me on Platinum Assets Advisors! 🚀")}&url=${encodeURIComponent(refLink)}`,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(refLink)}`,
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      name: "Telegram",
      icon: "✈️",
      url: `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent("Join me on Platinum Assets Advisors! 🚀")}`,
      color: "bg-blue-400 hover:bg-blue-500"
    }
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Platinum Assets Advisors!',
          text: 'Start your investment journey with me!',
          url: refLink
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#23272f] rounded-xl p-4 md:p-6 border border-[#23272f] flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-bold text-white">Refer Users & Earn</h3>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#181a20] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#3772ff]">0</div>
          <div className="text-sm text-gray-400">Total Referrals</div>
        </div>
        <div className="bg-[#181a20] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#27ae60]">$0</div>
          <div className="text-sm text-gray-400">Earnings</div>
        </div>
        <div className="bg-[#181a20] rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#f2c94c]">5%</div>
          <div className="text-sm text-gray-400">Commission</div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-[#181a20] rounded-xl p-6 flex flex-col gap-4">
        <h4 className="text-lg font-semibold text-white">Your Referral Link</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 px-4 py-3 rounded-lg bg-[#23272f] border border-[#3772ff] text-white font-mono text-sm"
            value={refLink}
            readOnly
            onFocus={(e) => e.target.select()}
          />
          <button
            onClick={handleCopyLink}
            className="px-6 py-3 bg-[#3772ff] hover:bg-[#6c2bd7] text-white rounded-lg font-semibold transition-all duration-200 whitespace-nowrap"
          >
            📋 Copy Link
          </button>
        </div>
        {copyMessage && (
          <div className="text-green-400 text-sm text-center">{copyMessage}</div>
        )}
      </div>

      {/* Share Options */}
      <div className="bg-[#181a20] rounded-xl p-6 flex flex-col gap-4">
        <h4 className="text-lg font-semibold text-white">Share Your Link</h4>
        <p className="text-gray-400 text-sm">Choose your preferred platform to share your referral link and start earning commissions!</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option.url)}
              className={`${option.color} text-white p-4 rounded-lg flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105`}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="text-xs font-medium">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Native Share Button (for mobile devices) */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:from-[#6c2bd7] hover:to-[#3772ff] transition-all duration-200"
          >
            <span className="text-xl">📤</span>
            <span className="font-semibold">More Sharing Options</span>
          </button>
        )}
      </div>

      {/* How it Works */}
      <div className="bg-[#181a20] rounded-xl p-6 flex flex-col gap-4">
        <h4 className="text-lg font-semibold text-white">How Referrals Work</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-[#3772ff] rounded-full flex items-center justify-center text-white font-bold">1</div>
            <div className="text-gray-300">Share your unique referral link with friends</div>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-[#27ae60] rounded-full flex items-center justify-center text-white font-bold">2</div>
            <div className="text-gray-300">Your friends sign up and make their first deposit</div>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-[#f2c94c] rounded-full flex items-center justify-center text-white font-bold">3</div>
            <div className="text-gray-300">Earn 5% commission on their investments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferUserTab;
