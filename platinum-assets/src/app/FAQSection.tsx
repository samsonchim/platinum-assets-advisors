"use client";
import React, { useState } from "react";

const faqs = [
  {
    q: "How can I invest with Platinum Assets Advisor?",
    a: "To invest, simply sign up, choose your preferred plan, and follow the instructions to fund your account.",
  },
  {
    q: "Who manages the funds?",
    a: "Our team of investment experts at Platinum Assets Advisor manages the funds diligently to ensure optimal performance and security for our members.",
  },
  {
    q: "I wish to invest with Platinum Assets Advisor but I don't have any e-currency account. What should I do?",
    a: "To invest with Platinum Assets Advisor without an e-currency account, consider creating a Trust Wallet, supporting various cryptocurrencies.",
  },
  {
    q: "How can I withdraw funds?",
    a: "Withdrawals can be made easily from your dashboard. Simply request a withdrawal and follow the on-screen instructions.",
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(1); // Open the second item by default

  return (
    <section id="faq" className="w-full max-w-3xl mx-auto mt-24 px-4 py-16 flex flex-col items-center">
      <div className="mb-2 text-sm font-semibold tracking-widest text-[#6c2bd7] uppercase flex items-center gap-2">
        <span className="inline-block w-8 h-1 bg-[#6c2bd7] rounded-full"></span>
        FAQ Questions
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10 text-center">Have any questions? we have answers</h2>
      <div className="flex flex-col gap-4 w-full">
        {faqs.map((faq, idx) => {
          const open = openIdx === idx;
          return (
            <div
              key={faq.q}
              className={`rounded-xl border border-[#23272f] bg-[#181a20] shadow transition-all duration-200 ${open ? "ring-2 ring-[#6c2bd7]" : ""}`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                onClick={() => setOpenIdx(open ? -1 : idx)}
                aria-expanded={open}
              >
                <span className="flex items-center gap-2 text-base sm:text-lg font-semibold text-white">
                  <span className="text-[#6c2bd7] text-xl">?</span>
                  {faq.q}
                </span>
                <span className={`text-2xl font-bold transition-transform duration-200 ${open ? "text-[#6c2bd7] rotate-45" : "text-gray-400"}`}>{open ? "−" : "+"}</span>
              </button>
              {open && (
                <div className="px-6 pb-5 text-gray-300 text-base animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
