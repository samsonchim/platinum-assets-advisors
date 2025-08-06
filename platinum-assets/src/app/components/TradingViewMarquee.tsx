"use client";

import { useEffect, useRef } from 'react';

const TradingViewMarquee = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up any existing scripts
    if (container.current) {
      container.current.innerHTML = '';
    }

    // Create and append the TradingView script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "FX_IDC:GBPUSD", title: "GBP/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "COINBASE:SOLUSD", title: "Solana" },
        { proName: "COINBASE:ADAUSD", title: "Cardano" }
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en"
    });

    if (container.current) {
      container.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      {/* CSS Styles for TradingView widget */}
      <style jsx global>{`
        .tradingview-widget-container {
          height: 64px !important;
          min-height: 64px !important;
        }
        
        .tradingview-widget-container iframe {
          height: 64px !important;
          min-height: 64px !important;
          border: none !important;
        }
        
        .tradingview-widget-container__widget {
          height: 64px !important;
          min-height: 64px !important;
          overflow: hidden;
        }
        
        @media (max-width: 480px) {
          .tradingview-widget-container {
            font-size: 12px;
          }
        }
        
        @media (min-width: 768px) {
          .tradingview-widget-container {
            height: 72px !important;
            min-height: 72px !important;
          }
          
          .tradingview-widget-container iframe,
          .tradingview-widget-container__widget {
            height: 72px !important;
            min-height: 72px !important;
          }
        }
        
        .blue-text {
          color: #3772ff !important;
        }
      `}</style>

      <section className="z-10 w-full max-w-7xl mx-auto mt-6 sm:mt-8 mb-6 sm:mb-8 px-3 sm:px-4">
        <div className="bg-[#23272f] rounded-xl border border-[#3772ff]/20 overflow-hidden shadow-lg">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-[#181a20] to-[#23272f] border-b border-[#3772ff]/20">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-[#27ae60] rounded-full animate-pulse"></div>
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white text-center">Live Market Data</h3>
              <div className="w-2 h-2 bg-[#27ae60] rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="relative bg-[#181a20]">
            {/* TradingView Widget Container */}
            <div 
              className="tradingview-widget-container overflow-hidden"
              style={{ height: '64px' }}
              ref={container}
            >
              <div className="tradingview-widget-container__widget h-full w-full"></div>
            </div>
            
            {/* Mobile optimization overlay */}
            <div className="absolute inset-0 pointer-events-none sm:hidden">
              <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-[#181a20] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-[#181a20] to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TradingViewMarquee;
