export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#23272f] to-[#16181d] text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#3772ff]">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-white">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#3772ff] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                    <circle cx="8" cy="6" r="2"/>
                  </svg>
                </div>
          
              </div>
           
             
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-white">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-[#23272f] border border-[#3772ff]/20 rounded-lg text-white focus:outline-none focus:border-[#3772ff] transition-colors"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-[#23272f] border border-[#3772ff]/20 rounded-lg text-white focus:outline-none focus:border-[#3772ff] transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-[#23272f] border border-[#3772ff]/20 rounded-lg text-white focus:outline-none focus:border-[#3772ff] transition-colors"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 bg-[#23272f] border border-[#3772ff]/20 rounded-lg text-white focus:outline-none focus:border-[#3772ff] transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-[#3772ff] text-white font-semibold rounded-lg hover:bg-[#4581ff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3772ff] focus:ring-offset-2 focus:ring-offset-[#181a20]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
