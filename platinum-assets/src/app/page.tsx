



import "./globals-animations.css";

import Header from "./Header";
import SolutionProcess from "./SolutionProcess";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";
import TradingViewMarquee from "./components/TradingViewMarquee";

export default function Home() {

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <Header />

      <main className="z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 py-16 sm:py-20 md:py-24 px-4 sm:px-8 relative">
        {/* Hero Background Image Slider */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <img 
              src="/hero.png" 
              alt="Financial Investment Solutions" 
              className="absolute w-full h-full object-cover animate-[heroSlide_15s_infinite_0s]"
            />
            <img 
              src="/hero2.png" 
              alt="Investment Strategy" 
              className="absolute w-full h-full object-cover animate-[heroSlide_15s_infinite_5s]"
            />
            <img 
              src="/hero3.png" 
              alt="Financial Growth" 
              className="absolute w-full h-full object-cover animate-[heroSlide_15s_infinite_10s]"
            />
          </div>
        </div>
        
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4 animate-fade-in">Welcome to Platinum Asset Advisors</h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center leading-tight mb-4 sm:mb-6 animate-fade-in-up">
            Building Lasting Value<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Through Innovative Investment Solutions
          </h1>
          <p className="max-w-2xl mx-auto text-center text-sm sm:text-base md:text-lg text-white font-normal mb-6 sm:mb-8 leading-relaxed animate-fade-in-up-delay">
            Unlock your financial future with trusted expertise in crypto, forex, stocks, and more. Experience tailored strategies for sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up-delay-2">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-2.5 bg-blue-600 text-white font-medium text-base sm:text-lg shadow-lg border border-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 gap-2 w-full sm:w-auto"
              style={{ borderRadius: '18px 18px 18px 6px' }}
            >
              <span>Get Started</span>
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18" className="flex-shrink-0">
                <path d="M3.75 9h10.5M10.5 5.25L14.25 9l-3.75 3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#trading-services"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-2.5 bg-transparent text-white font-medium text-base sm:text-lg border-2 border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 gap-2 w-full sm:w-auto rounded-lg"
            >
              <span>Learn More</span>
            </a>
          </div>
        </div>
        <div className="mt-4 sm:mt-6 text-center animate-fade-in-up-delay-3">
          <span className="text-sm sm:text-base md:text-lg text-white">Go further than you&apos;ve ever gone before</span>
        </div>
      </main>

      {/* TradingView Marquee Widget - Client Component */}
      <TradingViewMarquee />

      {/* Professional 3-column feature section with modern color theme */}
      <section className="z-10 w-full max-w-6xl mx-auto mt-12 sm:mt-16 flex flex-col items-center px-3 sm:px-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 bg-transparent rounded-2xl overflow-hidden shadow-lg">
          {/* Security */}
          <div className="bg-white border border-gray-200 px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-center relative hover:bg-gray-50 transition-colors duration-300">
            <div className="absolute top-0 right-0 -mt-6 sm:-mt-8 mr-0 hidden md:block">
              <div className="w-20 sm:w-28 h-20 sm:h-28 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl text-blue-600">&rarr;</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4 md:mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center md:hidden">
                <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 012 2v4H6V3a2 2 0 012-2zM3 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Security</h3>
            </div>
            <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">We provide secure investments backed by comprehensive coverage from Friz Insurance, ensuring peace of mind for your assets.</p>
          </div>
          {/* Simple Pricing */}
          <div className="bg-blue-600 px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-center relative hover:bg-blue-700 transition-colors duration-300">
            <div className="absolute top-0 left-0 -mt-6 sm:-mt-8 ml-0 hidden md:block">
              <div className="w-20 sm:w-28 h-20 sm:h-28 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl text-white">&rarr;</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4 md:mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center md:hidden">
                <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                  <path d="M4 10a1 1 0 011-1h6a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-1zM4 4a1 1 0 011-1h6a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Simple Pricing</h3>
            </div>
            <p className="text-white text-sm sm:text-base font-medium leading-relaxed">Transparent pricing with no hidden charges, additional fees, or pool fees—what you see is what you get.</p>
          </div>
          {/* Always in Profits */}
          <div className="bg-white border border-gray-200 px-6 sm:px-8 py-8 sm:py-10 flex flex-col justify-center relative hover:bg-gray-50 transition-colors duration-300">
            <div className="absolute top-0 left-0 -mt-6 sm:-mt-8 ml-0 hidden md:block">
              <div className="w-20 sm:w-28 h-20 sm:h-28 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl text-blue-600">&rarr;</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4 md:mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center md:hidden">
                <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM6.5 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm4.5 2a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Always in Profits</h3>
            </div>
            <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed">Our systems and operations are designed to consistently generate profits for both our company and our investors.</p>
          </div>
        </div>
      </section>


      {/* About Platinum Asset Advisors Section */}
      <section id="about-platinum" className="z-10 w-full max-w-6xl mx-auto mt-20 px-4 py-16 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-10 relative overflow-hidden border border-gray-200">
        {/* Left: Illustration or Icon */}
        <div className="flex-1 flex justify-center items-center h-full">
          <div className="bg-blue-50 rounded-2xl p-2 flex items-center justify-center w-full max-w-xs h-[420px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <video
              src="/about.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl h-full w-auto object-cover shadow-lg border border-blue-200"
              style={{ aspectRatio: '9/16', minHeight: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">About Platinum Asset Advisors</h2>
          <p className="text-lg text-gray-700 font-medium leading-relaxed">Platinum Asset Advisors is a pioneer in the financial trading space, dedicated to making trading both accessible and rewarding for investors of all skill levels. Our mission is to break down the barriers of the financial markets by equipping our clients with powerful tools, expert insights, and effective strategies to help them succeed.</p>
          <div className="flex flex-col sm:flex-row gap-6 mt-2">
            <div className="flex-1 bg-gray-50 rounded-xl p-6 shadow flex flex-col gap-2 border border-gray-200">
              <h3 className="text-xl font-bold text-green-600 mb-1">Options Copy Trading</h3>
              <p className="text-gray-700">Automatically follow and replicate the trades of experienced, high-performing traders. Even beginners can benefit from expert-level strategies—no manual management required.</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-6 shadow flex flex-col gap-2 border border-gray-200">
              <h3 className="text-xl font-bold text-blue-600 mb-1">Inclusive Community</h3>
              <p className="text-gray-700">We foster a community that thrives on shared knowledge and collective success, helping our clients reach their financial ambitions together.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-base"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" stroke="#3b82f6" strokeWidth="2"/><path d="M6 9l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Expert Insights</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 font-semibold text-base"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" stroke="#10b981" strokeWidth="2"/><path d="M6 9l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Powerful Tools</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-600 font-semibold text-base"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" stroke="#eab308" strokeWidth="2"/><path d="M6 9l2 2 4-4" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Effective Strategies</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-semibold text-base"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" stroke="#dc2626" strokeWidth="2"/><path d="M6 9l2 2 4-4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Shared Success</span>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="z-10 max-w-3xl mt-20 px-4 py-12 rounded-xl bg-white border border-gray-200 shadow-lg text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Why Platinum Asset Advisor?</h2>
        <p className="text-gray-700 text-lg mb-4">Experience a marketplace like no other. Lightning-fast, ultra-secure, and built for traders and collectors.</p>
        <ul className="flex flex-wrap justify-center gap-6 mt-6 text-left text-gray-600">
          <li className="flex items-center gap-2"><span className="text-green-600">●</span> Instant transactions</li>
          <li className="flex items-center gap-2"><span className="text-red-600">●</span> Pro trading tools</li>
          <li className="flex items-center gap-2"><span className="text-blue-600">●</span> Secure & private</li>
          <li className="flex items-center gap-2"><span className="text-yellow-600">●</span> 24/7 support</li>
        </ul>
      </section>

      {/* Trading Services Section */}
      <section id="trading-services" className="z-10 w-full max-w-6xl mx-auto mt-16 sm:mt-20 px-3 sm:px-4 py-12 sm:py-16 flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">Our Trading Services</h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Discover our comprehensive trading solutions designed to maximize your investment potential across multiple markets.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
          {/* Crypto Trading */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:border-red-300 transition-all duration-300 group">
            <div className="mb-4 flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-red-50 group-hover:bg-red-100 transition-colors">
              <svg width="24" height="24" className="sm:w-9 sm:h-9" fill="none" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="16" rx="2" stroke="#dc2626" strokeWidth="2"/><path d="M8 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#dc2626" strokeWidth="2"/><path d="M12 16l4 4 6-8" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">Crypto Trading</h3>
            <p className="text-gray-600 text-center mb-4 text-sm sm:text-base leading-relaxed">Secure and innovative crypto trading solutions designed to optimize your investments.</p>
            <a href="#" className="text-red-600 font-semibold flex items-center gap-1 group-hover:underline transition text-sm sm:text-base"><span>Read More</span><span className="text-lg">&raquo;</span></a>
          </div>
          {/* Forex Trading */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:border-yellow-300 transition-all duration-300 group">
            <div className="mb-4 flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-yellow-50 group-hover:bg-yellow-100 transition-colors">
              <svg width="24" height="24" className="sm:w-9 sm:h-9" fill="none" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="16" rx="2" stroke="#eab308" strokeWidth="2"/><path d="M8 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#eab308" strokeWidth="2"/><path d="M12 16l4 4 6-8" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">Forex Trading</h3>
            <p className="text-gray-600 text-center mb-4 text-sm sm:text-base leading-relaxed">Expert forex trading strategies to navigate the global currency markets effectively.</p>
            <a href="#" className="text-yellow-600 font-semibold flex items-center gap-1 group-hover:underline transition text-sm sm:text-base"><span>Read More</span><span className="text-lg">&raquo;</span></a>
          </div>
          {/* Stock Trading */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
            <div className="mb-4 flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <svg width="24" height="24" className="sm:w-9 sm:h-9" fill="none" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="16" rx="2" stroke="#3b82f6" strokeWidth="2"/><path d="M8 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#3b82f6" strokeWidth="2"/><path d="M12 16l4 4 6-8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">Stock Trading</h3>
            <p className="text-gray-600 text-center mb-4 text-sm sm:text-base leading-relaxed">Robust stock trading opportunities with comprehensive tools to enhance your portfolio.</p>
            <a href="#" className="text-blue-600 font-semibold flex items-center gap-1 group-hover:underline transition text-sm sm:text-base"><span>Read More</span><span className="text-lg">&raquo;</span></a>
          </div>
          {/* Copy Trading */}
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:border-green-300 transition-all duration-300 group">
            <div className="mb-4 flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
              <svg width="24" height="24" className="sm:w-9 sm:h-9" fill="none" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="16" rx="2" stroke="#10b981" strokeWidth="2"/><path d="M8 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#10b981" strokeWidth="2"/><path d="M12 16l4 4 6-8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">Copy Trading</h3>
            <p className="text-gray-600 text-center mb-4 text-sm sm:text-base leading-relaxed">Follow and replicate the strategies of top traders to maximize your investment returns.</p>
            <a href="#" className="text-green-600 font-semibold flex items-center gap-1 group-hover:underline transition text-sm sm:text-base"><span>Read More</span><span className="text-lg">&raquo;</span></a>
          </div>
        </div>
      </section>



      {/* Solution Process Section - Circular Design */}
      <SolutionProcess />


      {/* Pricing Packages Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer decoration */}
      <div className="z-10 w-full max-w-4xl mx-auto mt-16 mb-8">
        <img 
          src="/footer-decoration.svg" 
          alt="Decorative Footer Element" 
          className="w-full h-auto opacity-60"
        />
      </div>

      {/* Footer */}
      <footer className="z-10 mb-8 flex flex-col items-center gap-2 text-gray-500">
        <div className="flex gap-4">
          <a href="/terms" className="hover:text-blue-600 transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-green-600 transition-colors">Privacy</a>
          <a href="/contact" className="hover:text-red-600 transition-colors">Contact</a>
        </div>
       <span className="text-xs">© {new Date().getFullYear()} Platinum Asset Advisors. All rights reserved.</span>
      </footer>

    </div>
  );
}
