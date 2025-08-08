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
    <div className="w-full max-w-4xl bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              <path d="M19 8l-2 2 2 2v-4z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Refer Users & Earn</h3>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">0</div>
          <div className="text-sm text-gray-600">Total Referrals</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-600">$0</div>
          <div className="text-sm text-gray-600">Earnings</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">5%</div>
          <div className="text-sm text-gray-600">Commission</div>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900">Your Referral Link</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 px-4 py-3 rounded-lg bg-white border border-blue-300 text-gray-900 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={refLink}
            readOnly
            onFocus={(e) => e.target.select()}
          />
          <button
            onClick={handleCopyLink}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 whitespace-nowrap"
          >
            📋 Copy Link
          </button>
        </div>
        {copyMessage && (
          <div className="text-green-600 text-sm text-center">{copyMessage}</div>
        )}
      </div>

      {/* Share Options */}
      <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900">Share Your Link</h4>
        <p className="text-gray-600 text-sm">Choose your preferred platform to share your referral link and start earning commissions!</p>
        
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
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            <span className="text-xl">📤</span>
            <span className="font-semibold">More Sharing Options</span>
          </button>
        )}
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900">How Referrals Work</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
            <div className="text-gray-700">Share your unique referral link with friends</div>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
            <div className="text-gray-700">Your friends sign up and make their first deposit</div>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
            <div className="text-gray-700">Earn 5% commission on their investments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferUserTab;
