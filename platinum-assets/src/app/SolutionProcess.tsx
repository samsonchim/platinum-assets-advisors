import React from 'react';

const SolutionProcess = () => {
  return (
    <section id="solution-process" className="z-10 w-full max-w-5xl mx-auto mt-20 px-4 py-16 flex flex-col items-center">
      <div className="mb-2 text-sm font-semibold tracking-widest text-[#3772ff] uppercase flex items-center gap-2">
        <span className="inline-block w-8 h-1 bg-[#3772ff] rounded-full"></span>
        Work Process
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12 text-center">Our Solution Process</h2>
      <div className="relative w-full flex items-center justify-center" style={{ aspectRatio: '1/1', maxWidth: '90vw', minHeight: '340px', height: 'clamp(340px,50vw,600px)' }}>
        {/* Responsive SVG for arrows */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          width="100%" height="100%" viewBox="0 0 380 380" fill="none" style={{ zIndex: 0, maxWidth: '100%', maxHeight: '100%' }}
        >
          <circle cx="190" cy="190" r="140" stroke="#23272f" strokeWidth="2" />
          {/* Corrected Paths and Arrows between steps for the new order */}
          {/* Path from Register (top-left) to Invest (top-right) */}
          <path d="M91.01,91.01 A140,140 0 0,1 288.99,91.01" stroke="#6c2bd7" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-violet)" strokeDasharray="6 6"/>
          {/* Path from Invest (top-right) to Earn (bottom-right) */}
          <path d="M288.99,91.01 A140,140 0 0,1 288.99,288.99" stroke="#16a34a" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-green)" strokeDasharray="6 6"/>
          {/* Path from Earn (bottom-right) to Refer (bottom-left) */}
          <path d="M288.99,288.99 A140,140 0 0,1 91.01,288.99" stroke="#eab308" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-yellow)" strokeDasharray="6 6"/>
          {/* Path from Refer (bottom-left) to Register (top-left) */}
          <path d="M91.01,288.99 A140,140 0 0,1 91.01,91.01" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-red)" strokeDasharray="6 6"/>
          <defs>
            <marker id="arrowhead-violet" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#6c2bd7"/></marker>
            <marker id="arrowhead-green" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#16a34a"/></marker>
            <marker id="arrowhead-yellow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#eab308"/></marker>
            <marker id="arrowhead-red" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#ef4444"/></marker>
          </defs>
        </svg>
        {/* Steps positioned outside the circle using trigonometry */}
        <div className="absolute left-1/2 top-1/2 w-full h-full" style={{ transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
          {[
            {
              label: 'Register',
              desc: 'Sign up quickly and easily to start your investment journey with us.',
              color: '#6c2bd7',
              border: 'border-[#6c2bd7]',
              text: 'text-[#6c2bd7]',
              num: '01',
              angle: 315, // Top-left
            },
            {
              label: 'Invest',
              desc: 'Choose your preferred investment options and start growing your wealth.',
              color: '#16a34a',
              border: 'border-[#16a34a]',
              text: 'text-[#16a34a]',
              num: '02',
              angle: 45, // Top-right
            },
            {
              label: 'Earn',
              desc: 'Watch your investments grow and enjoy the returns.',
              color: '#eab308',
              border: 'border-[#eab308]',
              text: 'text-[#eab308]',
              num: '03',
              angle: 135, // Bottom-right
            },
            {
              label: 'Refer',
              desc: 'Invite others to join and earn additional rewards through our referral program.',
              color: '#ef4444',
              border: 'border-[#ef4444]',
              text: 'text-[#ef4444]',
              num: '04',
              angle: 225, // Bottom-left
            },
          ].map((step, i) => {
            // SVG viewBox center and radius
            const cx = 190, cy = 190;
            // Radius for the dashed circle in SVG
            const R_circle = 140;
            // This places the center of the 48px number circle at 140px from center, on the dashed line.
            const R_card_placement = R_circle;
            const rad = (step.angle * Math.PI) / 180;

            // Card size
            const cardW = 140, cardH = 100;
            // Diameter of the inner number circle (w-12 h-12 is 48px)
            const numSize = 48;

            // Calculate the center coordinates of the number circle
            // Angles are clockwise from 12 o'clock (top)
            const numCenterX = cx + R_card_placement * Math.sin(rad);
            const numCenterY = cy - R_card_placement * Math.cos(rad);

            // For steps 1 and 2, always put text above the number
            const textAbove = (step.num === '01' || step.num === '02');

            let finalY;
            if (textAbove) {
                // If text is above, the number div is at the bottom of the card.
                finalY = `calc(${((numCenterY + numSize / 2) / 380) * 100}% - ${cardH}px)`;
            } else {
                // If text is below, the number div is at the top of the card.
                finalY = `calc(${((numCenterY - numSize / 2) / 380) * 100}% - 0px)`;
            }

            // Adjust x to center the card horizontally
            const finalX = `calc(${(numCenterX / 380) * 100}% - ${cardW / 2}px)`;

            return (
              <div
                key={step.num}
                className="flex flex-col items-center w-[140px] absolute"
                style={{ left: finalX, top: finalY, width: cardW, height: cardH, pointerEvents: 'auto' }}
              >
                {textAbove ? (
                  <>
                    <h3 className="font-bold text-base text-white mb-0.5">{step.label}</h3>
                    <p className="text-gray-400 text-center text-xs leading-tight mb-1">{step.desc}</p>
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${step.border} bg-[#23272f] text-xl font-bold ${step.text} mb-1 shadow-lg`}>{step.num}</div>
                  </>
                ) : (
                  <>
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${step.border} bg-[#23272f] text-xl font-bold ${step.text} mb-1 shadow-lg`}>{step.num}</div>
                    <h3 className="font-bold text-base text-white mb-0.5">{step.label}</h3>
                    <p className="text-gray-400 text-center text-xs leading-tight">{step.desc}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionProcess;
