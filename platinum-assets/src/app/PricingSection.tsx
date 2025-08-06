import React from "react";

const plans = [
  {
    name: "Regular Plan",
    price: "$3,000 - $9,999",
    interest: "3.2% Interest per day",
    referral: "5% upon referrals",
    support: "24/7 Customer Support",
    guide: "Investment Guide",
    button: "Purchase Plan",
    highlight: false,
  },
  {
    name: "Standard Plan",
    price: "$10,000 - $49,999",
    interest: "7.1% Interest per day",
    referral: "5% upon referrals",
    support: "24/7 Customer Support",
    guide: "Investment Guide",
    button: "Purchase Plan",
    highlight: true,
  },
  {
    name: "Premium Plan",
    price: "$50,000 - unlimited",
    interest: "8.2% Interest per day",
    referral: "5% upon referrals",
    support: "24/7 Customer Support",
    guide: "Investment Guide",
    button: "Purchase Plan",
    highlight: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="w-full max-w-6xl mx-auto mt-24 px-4 py-16 flex flex-col items-center">
    <div className="mb-2 text-sm font-semibold tracking-widest text-[#3772ff] uppercase flex items-center gap-2">
      <span className="inline-block w-8 h-1 bg-[#3772ff] rounded-full"></span>
      Pricing Packages
    </div>
    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12 text-center">Choose Your Best Plan</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {plans.map((plan, idx) => (
        <div
          key={plan.name}
          className={`flex flex-col items-center rounded-2xl shadow-lg border border-[#23272f] bg-[#181a20] px-8 py-10 relative transition-all duration-200 ${
            plan.highlight ? "border-2 border-[#6c2bd7] bg-[#23272f] scale-105 z-10" : ""
          }`}
        >
          <div className="mb-4 w-full text-left">
            <span className="text-base font-semibold text-[#6c2bd7]">{plan.name}</span>
            <div className="text-2xl font-bold text-white mt-2 mb-4">{plan.price}</div>
            <div className="h-1 w-12 bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] rounded-full mb-4"></div>
          </div>
          <ul className="flex flex-col gap-3 w-full mb-8">
            <li className="flex items-center gap-2 text-gray-200 text-base"><span className="text-[#6c2bd7]">✔</span> {plan.interest}</li>
            <li className="flex items-center gap-2 text-gray-200 text-base"><span className="text-[#27ae60]">✔</span> {plan.referral}</li>
            <li className="flex items-center gap-2 text-gray-200 text-base"><span className="text-[#f2c94c]">✔</span> {plan.support}</li>
            <li className="flex items-center gap-2 text-gray-200 text-base"><span className="text-[#e74c3c]">✔</span> {plan.guide}</li>
          </ul>
          <a
            href="/signup"
            className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center text-center ${
              plan.highlight
                ? "bg-gradient-to-r from-[#3772ff] to-[#6c2bd7] text-white hover:from-[#6c2bd7] hover:to-[#3772ff]"
                : "bg-white text-[#181a20] hover:bg-gray-100"
            }`}
          >
            {plan.button}
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default PricingSection;
