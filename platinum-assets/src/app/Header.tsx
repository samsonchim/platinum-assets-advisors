"use client";

import { useState } from "react";

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <header className="w-full z-20 relative">
      {/* TradingView Ticker Tape Widget */}
      <div className="w-full bg-[#181a20] border-b border-[#23272f] shadow">
        <div className="overflow-x-auto">
          <div className="tradingview-widget-container" style={{ minHeight: 40 }}>
            <iframe
              title="TradingView Ticker"
              src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22Ethereum%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ASOLUSDT%22%2C%22title%22%3A%22SOL%22%7D%2C%7B%22proName%22%3A%22BINANCE%3AXRPUSDT%22%2C%22title%22%3A%22XRP%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ALTCUSDT%22%2C%22title%22%3A%22Litecoin%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ABNBUSDT%22%2C%22title%22%3A%22BNB%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22locale%22%3A%22en%22%7D"
              style={{ width: "100%", height: 40, border: 0 }}
              allowFullScreen={false}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
      {/* Main Navigation */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#23272f] border-b border-[#23272f] shadow relative">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-auto" />
        </div>
        <ul className="hidden md:flex gap-8 text-lg font-semibold items-center">
          <li><a href="#" className="hover:text-[#3772ff] transition-colors text-white">HOME</a></li>
          <li><a href="#about" className="hover:text-[#27ae60] transition-colors text-white">ABOUT</a></li>
          <li className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              className="hover:text-[#e74c3c] transition-colors text-white flex items-center gap-1 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              tabIndex={0}
            >
              SERVICES
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {/* Dropdown */}
            <ul className={`absolute left-0 top-full mt-2 w-56 bg-[#23272f] border border-[#23272f] rounded shadow-lg py-2 z-50 transition-all duration-150 ${servicesOpen ? 'block' : 'hidden'}`} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <li><a href="#crypto" className="block px-4 py-2 hover:bg-[#181a20] text-white">Crypto Trading</a></li>
              <li><a href="#forex" className="block px-4 py-2 hover:bg-[#181a20] text-white">Forex Trading</a></li>
              <li><a href="#stocks" className="block px-4 py-2 hover:bg-[#181a20] text-white">Stock Trading</a></li>
              <li><a href="#options" className="block px-4 py-2 hover:bg-[#181a20] text-white">Option Copy Trading</a></li>
            </ul>
          </li>
          <li><a href="#faq" className="hover:text-[#f2c94c] transition-colors text-white">FAQ</a></li>
          <li><a href="#contact" className="hover:text-[#3772ff] transition-colors text-white">CONTACT</a></li>
        </ul>
        {/* Mobile menu button and dropdown */}
        <div className="md:hidden flex items-center">
          <details className="relative">
            <summary className="list-none cursor-pointer text-white text-lg font-semibold px-2 py-1 rounded hover:bg-[#23272f]">MENU</summary>
            <ul className="absolute right-0 mt-2 w-48 bg-[#23272f] border border-[#23272f] rounded shadow-lg py-2 z-50">
              <li><a href="#" className="block px-4 py-2 hover:bg-[#181a20] text-white">HOME</a></li>
              <li><a href="#about" className="block px-4 py-2 hover:bg-[#181a20] text-white">ABOUT</a></li>
              <li className="relative group">
                <details>
                  <summary className="block px-4 py-2 hover:bg-[#181a20] text-white cursor-pointer">SERVICES</summary>
                  <ul className="ml-4 mt-1">
                    <li><a href="#crypto" className="block px-4 py-2 hover:bg-[#181a20] text-white">Crypto Trading</a></li>
                    <li><a href="#forex" className="block px-4 py-2 hover:bg-[#181a20] text-white">Forex Trading</a></li>
                    <li><a href="#stocks" className="block px-4 py-2 hover:bg-[#181a20] text-white">Stock Trading</a></li>
                    <li><a href="#options" className="block px-4 py-2 hover:bg-[#181a20] text-white">Option Copy Trading</a></li>
                  </ul>
                </details>
              </li>
              <li><a href="#faq" className="block px-4 py-2 hover:bg-[#181a20] text-white">FAQ</a></li>
              <li><a href="#contact" className="block px-4 py-2 hover:bg-[#181a20] text-white">CONTACT</a></li>
            </ul>
          </details>
        </div>
        <a
          href="#get-started"
          className="ml-4 px-7 py-2.5 bg-white text-[#181a20] font-medium text-lg shadow border border-gray-200 rounded-[18px_18px_18px_6px] hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3772ff] focus:ring-offset-2 flex items-center gap-2"
          style={{ borderRadius: '18px 18px 18px 6px' }}
        >
          Login
        </a>
      </nav>
    </header>
  );
}
