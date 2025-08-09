"use client";

import { useState } from "react";

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <header className="w-full z-20 relative">
      {/* TradingView Ticker Tape Widget */}
      <div className="w-full bg-gray-100 border-b border-gray-200 shadow">
        <div className="overflow-x-auto">
          <div className="tradingview-widget-container" style={{ minHeight: 40 }}>
            <iframe
              title="TradingView Ticker"
              src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22Ethereum%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ASOLUSDT%22%2C%22title%22%3A%22SOL%22%7D%2C%7B%22proName%22%3A%22BINANCE%3AXRPUSDT%22%2C%22title%22%3A%22XRP%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ALTCUSDT%22%2C%22title%22%3A%22Litecoin%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ABNBUSDT%22%2C%22title%22%3A%22BNB%22%7D%5D%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22locale%22%3A%22en%22%7D"
              style={{ width: "100%", height: 40, border: 0 }}
              allowFullScreen={false}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
      {/* Main Navigation */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow relative">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-auto" />
        </div>
        <ul className="hidden md:flex gap-8 text-lg font-semibold items-center">
          <li><a href="#" className="hover:text-blue-600 transition-colors text-gray-900">HOME</a></li>
          <li><a href="#about" className="hover:text-green-600 transition-colors text-gray-900">ABOUT</a></li>
          <li className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              className="hover:text-red-600 transition-colors text-gray-900 flex items-center gap-1 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              tabIndex={0}
            >
              SERVICES
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {/* Dropdown */}
            <ul className={`absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg py-2 z-50 transition-all duration-150 ${servicesOpen ? 'block' : 'hidden'}`} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <li><a href="#crypto" className="block px-4 py-2 hover:bg-gray-50 text-gray-900">Crypto Trading</a></li>
              <li><a href="#forex" className="block px-4 py-2 hover:bg-gray-50 text-gray-900">Forex Trading</a></li>
              <li><a href="#stocks" className="block px-4 py-2 hover:bg-gray-50 text-gray-900">Stock Trading</a></li>
              <li><a href="#options" className="block px-4 py-2 hover:bg-gray-50 text-gray-900">Option Copy Trading</a></li>
            </ul>
          </li>
          <li><a href="#faq" className="hover:text-yellow-600 transition-colors text-gray-900">FAQ</a></li>
          <li><a href="#contact" className="hover:text-blue-600 transition-colors text-gray-900">CONTACT</a></li>
        </ul>
        {/* Mobile menu button and dropdown */}
        <div className="md:hidden flex items-center">
          <details className="relative">
            <summary className="list-none cursor-pointer text-gray-900 text-lg font-semibold px-2 py-1 rounded hover:bg-gray-100">MENU</summary>
            <ul className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 min-w-max">
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-50 text-gray-900 text-sm">HOME</a></li>
              <li><a href="#about" className="block px-4 py-2 hover:bg-gray-50 text-gray-900 text-sm">ABOUT</a></li>
              <li className="relative group">
                <details>
                  <summary className="block px-4 py-2 hover:bg-gray-50 text-gray-900 cursor-pointer text-sm">SERVICES</summary>
                  <ul className="ml-4 mt-1 border-l border-gray-200 pl-2">
                    <li><a href="#crypto" className="block px-3 py-1 hover:bg-gray-50 text-gray-900 text-xs">Crypto Trading</a></li>
                    <li><a href="#forex" className="block px-3 py-1 hover:bg-gray-50 text-gray-900 text-xs">Forex Trading</a></li>
                    <li><a href="#stocks" className="block px-3 py-1 hover:bg-gray-50 text-gray-900 text-xs">Stock Trading</a></li>
                    <li><a href="#options" className="block px-3 py-1 hover:bg-gray-50 text-gray-900 text-xs">Option Copy Trading</a></li>
                  </ul>
                </details>
              </li>
              <li><a href="#faq" className="block px-4 py-2 hover:bg-gray-50 text-gray-900 text-sm">FAQ</a></li>
              <li><a href="#contact" className="block px-4 py-2 hover:bg-gray-50 text-gray-900 text-sm">CONTACT</a></li>
            </ul>
          </details>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/admin/login"
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Admin
          </a>
          <a
            href="/login"
            className="px-4 sm:px-7 py-2 sm:py-2.5 bg-blue-600 text-white font-medium text-sm sm:text-lg shadow border border-blue-600 rounded-[18px_18px_18px_6px] hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            style={{ borderRadius: '18px 18px 18px 6px' }}
          >
            Login
          </a>
        </div>
      </nav>
    </header>
  );
}
