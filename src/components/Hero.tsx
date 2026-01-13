import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-indigo-50 to-purple-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            Private AI Assistant
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in animation-delay-200">
            AI That&apos;s <span className="gradient-text">Invisible</span>
            <br />
            to Screen Sharing
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto animate-fade-in animation-delay-400">
            Use AI assistance during presentations, meetings, and screen sharing
            without anyone knowing. Completely invisible to Zoom, Google Meet,
            MS Teams, and all screen capture tools.
          </p>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in animation-delay-400">
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-medium border border-gray-200">
              🔒 Screen-Share Invisible
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-medium border border-gray-200">
              ⚡ Real-time AI
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-medium border border-gray-200">
              🎨 Beautiful UI
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 font-medium border border-gray-200">
              ⌨️ Global Shortcuts
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in animation-delay-400">
            <Link
              href="/downloads"
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 animate-pulse-glow shadow-lg"
            >
              Download for Free
            </Link>
            <Link
              href="/how-it-works"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              See How It Works
            </Link>
          </div>

          {/* Platform Support */}
          <div className="text-center animate-fade-in animation-delay-400">
            <p className="text-gray-500 mb-4">Available for</p>
            <div className="flex justify-center items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⌘</span>
                </div>
                <span className="text-gray-700 font-medium">macOS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⊞</span>
                </div>
                <span className="text-gray-700 font-medium">Windows</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating App Preview */}
        <div className="mt-20 relative">
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl animate-float"></div>
            <div className="relative glass rounded-3xl p-8 border border-white/50 backdrop-blur-xl">
              <div className="bg-gray-900 rounded-2xl p-6 text-left">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-gray-400 text-sm">
                    Jisus - AI Assistant
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-gray-300">
                    <span className="text-blue-400">You:</span> Summarize the
                    key points for my presentation
                  </div>
                  <div className="text-gray-300">
                    <span className="text-green-400">AI:</span> Here are the 5
                    key points for your presentation:
                    <div className="mt-2 text-gray-400 text-sm">
                      • Market growth: 127% increase in Q4
                      <br />
                      • Customer satisfaction: 94% rating
                      <br />
                      • Revenue targets exceeded by 15%
                      <br />
                      • New product launch in Q2
                      <br />• Team expansion to 50+ members
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
