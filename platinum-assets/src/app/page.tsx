



import Image from "next/image";
import Header from "./Header";

export default function Home() {

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#181a20] via-[#23272f] to-[#16181d] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <Header />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_40px),repeating-linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_40px)]" />
      </div>

      <main className="z-10 flex flex-col items-center justify-center gap-8 py-24 px-4 sm:px-8">
        <h2 className="text-lg sm:text-xl font-semibold text-[#3772ff] mb-2">Welcome to Platinum Asset Advisors</h2>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white text-center leading-tight mb-4">
          Building Lasting Value<br />Through Innovative Investment Solutions
        </h1>
        <p className="max-w-2xl text-center text-base sm:text-lg text-gray-300 font-normal mb-6">
          Unlock your financial future with trusted expertise in crypto, forex, stocks, and more. Experience tailored strategies for sustainable growth.
        </p>
        <a
          href="#get-started"
          className="inline-block px-7 py-2.5 bg-white text-[#181a20] font-medium text-lg shadow border border-gray-200 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3772ff] focus:ring-offset-2 flex items-center gap-2"
          style={{ borderRadius: '18px 18px 18px 6px' }}
        >
          Get Started
        </a>
        <div className="mt-3 text-center">
          <span className="text-base sm:text-lg text-gray-200">Go further than you've ever gone before</span>
        </div>
      </main>


      {/* Professional 3-column feature section with TradingView color theme */}
      <section className="z-10 w-full max-w-6xl mx-auto mt-16 flex flex-col items-center px-2">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 bg-transparent rounded-2xl overflow-hidden shadow-lg">
          {/* Security */}
          <div className="bg-[#23272f] px-8 py-10 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 -mt-8 mr-0 hidden md:block">
              <div className="w-28 h-28 bg-[#3772ff]/10 rounded-full flex items-center justify-center">
                <span className="text-3xl text-[#3772ff]">&rarr;</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Security</h3>
            <p className="text-gray-200 text-base font-medium leading-relaxed">We provide secure investments backed by comprehensive coverage from Friz Insurance, ensuring peace of mind for your assets.</p>
          </div>
          {/* Simple Pricing */}
          <div className="bg-[#3772ff] px-8 py-10 flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 -mt-8 ml-0 hidden md:block">
              <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-3xl text-white">&rarr;</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Simple Pricing</h3>
            <p className="text-white text-base font-medium leading-relaxed">Transparent pricing with no hidden charges, additional fees, or pool fees—what you see is what you get.</p>
          </div>
          {/* Always in Profits */}
          <div className="bg-[#23272f] px-8 py-10 flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 -mt-8 ml-0 hidden md:block">
              <div className="w-28 h-28 bg-[#3772ff]/10 rounded-full flex items-center justify-center">
                <span className="text-3xl text-[#3772ff]">&rarr;</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Always in Profits</h3>
            <p className="text-gray-200 text-base font-medium leading-relaxed">Our systems and operations are designed to consistently generate profits for both our company and our investors.</p>
          </div>
        </div>
      </section>


      {/* About Platinum Asset Advisors Section */}
      <section id="about-platinum" className="z-10 w-full max-w-6xl mx-auto mt-20 px-4 py-16 bg-[#23272f] rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        {/* Left: Illustration or Icon */}
        <div className="flex-1 flex justify-center items-center h-full">
          <div className="bg-[#3772ff]/10 rounded-2xl p-2 flex items-center justify-center w-full max-w-xs h-[420px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <video
              src="/about.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl h-full w-auto object-cover shadow-lg border border-[#3772ff]/20"
              style={{ aspectRatio: '9/16', minHeight: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">About Platinum Asset Advisors</h2>
          <p className="text-lg text-gray-200 font-medium leading-relaxed">Platinum Asset Advisors is a pioneer in the financial trading space, dedicated to making trading both accessible and rewarding for investors of all skill levels. Our mission is to break down the barriers of the financial markets by equipping our clients with powerful tools, expert insights, and effective strategies to help them succeed.</p>
          <div className="flex flex-col sm:flex-row gap-6 mt-2">
            <div className="flex-1 bg-[#181a20] rounded-xl p-6 shadow flex flex-col gap-2 border border-[#23272f]">
              <h3 className="text-xl font-bold text-[#27ae60] mb-1">Options Copy Trading</h3>
              <p className="text-gray-300">Automatically follow and replicate the trades of experienced, high-performing traders. Even beginners can benefit from expert-level strategies—no manual management required.</p>
            </div>
            <div className="flex-1 bg-[#181a20] rounded-xl p-6 shadow flex flex-col gap-2 border border-[#23272f]">
              <h3 className="text-xl font-bold text-[#3772ff] mb-1">Inclusive Community</h3>
              <p className="text-gray-300">We foster a community that thrives on shared knowledge and collective success, helping our clients reach their financial ambitions together.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3772ff]/10 text-[#3772ff] font-semibold text-base"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" stroke="#3772ff" strokeWidth="2"/><path d="M6 9l2 2 4-4" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Expert Insights</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#27ae60]/10 text-[#27ae60] font-semibold text-base"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" stroke="#27ae60" strokeWidth="2"/><path d="M6 9l2 2 4-4" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Powerful Tools</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f2c94c]/10 text-[#f2c94c] font-semibold text-base"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" stroke="#f2c94c" strokeWidth="2"/><path d="M6 9l2 2 4-4" stroke="#f2c94c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Effective Strategies</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e74c3c]/10 text-[#e74c3c] font-semibold text-base"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="8" stroke="#e74c3c" strokeWidth="2"/><path d="M6 9l2 2 4-4" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Shared Success</span>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="z-10 max-w-3xl mt-20 px-4 py-12 rounded-xl bg-[#23272f] border border-[#23272f] shadow text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#3772ff] mb-4">Why Metro Market Pro?</h2>
        <p className="text-gray-200 text-lg mb-4">Experience a marketplace like no other. Lightning-fast, ultra-secure, and built for traders and collectors.</p>
        <ul className="flex flex-wrap justify-center gap-6 mt-6 text-left text-gray-400">
          <li className="flex items-center gap-2"><span className="text-[#27ae60]">●</span> Instant transactions</li>
          <li className="flex items-center gap-2"><span className="text-[#e74c3c]">●</span> Pro trading tools</li>
          <li className="flex items-center gap-2"><span className="text-[#3772ff]">●</span> Secure & private</li>
          <li className="flex items-center gap-2"><span className="text-[#f2c94c]">●</span> 24/7 support</li>
        </ul>
      </section>

      {/* Trading Services Section */}
      <section id="trading-services" className="z-10 w-full max-w-6xl mx-auto mt-20 px-4 py-16 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10 text-center">Our Trading Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {/* Crypto Trading */}
          <div className="flex flex-col items-center bg-[#181a20] rounded-2xl shadow-lg border border-[#23272f] p-8 hover:shadow-xl transition-shadow group">
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#e74c3c]/10">
              {/* Icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="16" rx="2" stroke="#e74c3c" strokeWidth="2"/><path d="M8 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#e74c3c" strokeWidth="2"/><path d="M12 16l4 4 6-8" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Crypto Trading</h3>
            <p className="text-gray-300 text-center mb-4">Secure and innovative crypto trading solutions designed to optimize your investments.</p>
            <a href="#" className="text-[#e74c3c] font-semibold flex items-center gap-1 group-hover:underline transition"><span>Read More</span><span className="text-lg">&raquo;</span></a>
          </div>
          {/* Forex Trading */}
          <div className="flex flex-col items-center bg-[#181a20] rounded-2xl shadow-lg border border-[#23272f] p-8 hover:shadow-xl transition-shadow group">
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#f2c94c]/10">
              <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="16" rx="2" stroke="#f2c94c" strokeWidth="2"/><path d="M8 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#f2c94c" strokeWidth="2"/><path d="M12 16l4 4 6-8" stroke="#f2c94c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Forex Trading</h3>
            <p className="text-gray-300 text-center mb-4">Expert forex trading strategies to navigate the global currency markets effectively.</p>
            <a href="#" className="text-[#f2c94c] font-semibold flex items-center gap-1 group-hover:underline transition"><span>Read More</span><span className="text-lg">&raquo;</span></a>
          </div>
          {/* Stock Trading */}
          <div className="flex flex-col items-center bg-[#181a20] rounded-2xl shadow-lg border border-[#23272f] p-8 hover:shadow-xl transition-shadow group">
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#3772ff]/10">
              <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="16" rx="2" stroke="#3772ff" strokeWidth="2"/><path d="M8 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#3772ff" strokeWidth="2"/><path d="M12 16l4 4 6-8" stroke="#3772ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Stock Trading</h3>
            <p className="text-gray-300 text-center mb-4">Robust stock trading opportunities with comprehensive tools to enhance your portfolio.</p>
            <a href="#" className="text-[#3772ff] font-semibold flex items-center gap-1 group-hover:underline transition"><span>Read More</span><span className="text-lg">&raquo;</span></a>
          </div>
          {/* Copy Trading */}
          <div className="flex flex-col items-center bg-[#181a20] rounded-2xl shadow-lg border border-[#23272f] p-8 hover:shadow-xl transition-shadow group">
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-[#27ae60]/10">
              <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="16" rx="2" stroke="#27ae60" strokeWidth="2"/><path d="M8 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke="#27ae60" strokeWidth="2"/><path d="M12 16l4 4 6-8" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Copy Trading</h3>
            <p className="text-gray-300 text-center mb-4">Follow and replicate the strategies of top traders to maximize your investment returns.</p>
            <a href="#" className="text-[#27ae60] font-semibold flex items-center gap-1 group-hover:underline transition"><span>Read More</span><span className="text-lg">&raquo;</span></a>
          </div>
        </div>
      </section>


      {/* Solution Process Section - Circular Design */}
      <section id="solution-process" className="z-10 w-full max-w-4xl mx-auto mt-20 px-4 py-16 flex flex-col items-center">
        <div className="mb-2 text-sm font-semibold tracking-widest text-[#3772ff] uppercase flex items-center gap-2">
          <span className="inline-block w-8 h-1 bg-[#3772ff] rounded-full"></span>
          Work Process
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12 text-center">Our Solution Process</h2>
        <div className="relative w-full flex items-center justify-center" style={{ minHeight: '420px' }}>
          {/* SVG for arrows */}
          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" width="380" height="380" viewBox="0 0 380 380" fill="none" style={{ zIndex: 0 }}>
            <circle cx="190" cy="190" r="140" stroke="#23272f" strokeWidth="2" />
            {/* Arrows between steps */}
            <path d="M190 50 A140 140 0 0 1 320 190" stroke="#3772ff" strokeWidth="2" fill="none" markerEnd="url(#arrowhead1)" strokeDasharray="6 6"/>
            <path d="M320 190 A140 140 0 0 1 190 330" stroke="#27ae60" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" strokeDasharray="6 6"/>
            <path d="M190 330 A140 140 0 0 1 60 190" stroke="#f2c94c" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)" strokeDasharray="6 6"/>
            <path d="M60 190 A140 140 0 0 1 190 50" stroke="#e74c3c" strokeWidth="2" fill="none" markerEnd="url(#arrowhead4)" strokeDasharray="6 6"/>
            <defs>
              <marker id="arrowhead1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#3772ff"/></marker>
              <marker id="arrowhead2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#27ae60"/></marker>
              <marker id="arrowhead3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#f2c94c"/></marker>
              <marker id="arrowhead4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#e74c3c"/></marker>
            </defs>
          </svg>
          {/* Steps positioned in a circle using trigonometry */}
          <div className="absolute left-1/2 top-1/2 w-full h-full" style={{ transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
            {[
              {
                label: 'Register',
                desc: 'Sign up quickly and easily to start your investment journey with us.',
                color: '#6c2bd7',
                border: 'border-[#6c2bd7]',
                text: 'text-[#6c2bd7]',
                num: '01',
                angle: -90,
              },
              {
                label: 'Invest',
                desc: 'Choose your preferred investment options and start growing your wealth.',
                color: '#16a34a',
                border: 'border-[#16a34a]',
                text: 'text-[#16a34a]',
                num: '02',
                angle: 0,
              },
              {
                label: 'Earn',
                desc: 'Watch your investments grow and enjoy the returns.',
                color: '#eab308',
                border: 'border-[#eab308]',
                text: 'text-[#eab308]',
                num: '03',
                angle: 90,
              },
              {
                label: 'Refer',
                desc: 'Invite others to join and earn additional rewards through our referral program.',
                color: '#ef4444',
                border: 'border-[#ef4444]',
                text: 'text-[#ef4444]',
                num: '04',
                angle: 180,
              },
            ].map((step, i) => {
              // Circle center (cx, cy) and radius
              const cx = 190, cy = 190, r = 110;
              const rad = (step.angle * Math.PI) / 180;
              // Offset to center the card
              const cardW = 120, cardH = 90;
              const x = cx + r * Math.cos(rad) - cardW / 2;
              const y = cy + r * Math.sin(rad) - cardH / 2;
              return (
                <div
                  key={step.num}
                  className={`flex flex-col items-center w-32 absolute`}
                  style={{ left: x, top: y, width: cardW, height: cardH, pointerEvents: 'auto' }}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${step.border} bg-[#23272f] text-xl font-bold ${step.text} mb-1 shadow-lg`}>{step.num}</div>
                  <h3 className="font-bold text-base text-white mb-0.5">{step.label}</h3>
                  <p className="text-gray-400 text-center text-xs leading-tight">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="z-10 mt-24 mb-8 flex flex-col items-center gap-2 text-gray-500">
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#3772ff] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#27ae60] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#e74c3c] transition-colors">Contact</a>
        </div>
        <span className="text-xs">© {new Date().getFullYear()} Metro Market Pro. All rights reserved.</span>
        <span className="text-xs">© {new Date().getFullYear()} Platinum Asset Advisors. All rights reserved.</span>
      </footer>

    </div>
  );
}
