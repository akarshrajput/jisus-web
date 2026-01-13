const Features = () => {
  const features = [
    {
      icon: "🔒",
      title: "Screen-Share Invisible",
      description:
        "Completely hidden from screen sharing, screenshots, and recordings. Uses native OS content protection APIs.",
      highlight: true,
    },
    {
      icon: "🤖",
      title: "Powerful AI Chat",
      description:
        "Powered by Groq's fast Llama 3.3 70B model. Get instant responses for any question or task.",
    },
    {
      icon: "⌨️",
      title: "Global Shortcuts",
      description:
        "Quick access with keyboard shortcuts. Toggle visibility instantly during presentations.",
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description:
        "Native glassmorphism UI that blends perfectly with your desktop. Customizable opacity and themes.",
    },
    {
      icon: "🎤",
      title: "Voice Input",
      description:
        "Speech recognition powered by Groq Whisper API. Talk naturally to your AI assistant.",
    },
    {
      icon: "📍",
      title: "Smart Positioning",
      description:
        "Snap to corners or center. Remember your preferred position and size automatically.",
    },
    {
      icon: "📋",
      title: "Quick Prompts",
      description:
        "Pre-built prompts for common tasks: Summarize, Explain, Rewrite, Create bullet points.",
    },
    {
      icon: "🔄",
      title: "Real-time Streaming",
      description:
        "See AI responses as they're generated. No waiting for complete responses.",
    },
    {
      icon: "📜",
      title: "Encrypted History",
      description:
        "Optional local chat history with end-to-end encryption. Your conversations stay private.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="gradient-text"> Private AI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for seamless AI assistance during presentations
            and meetings
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card p-8 rounded-2xl border-2 ${
                feature.highlight
                  ? "border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50"
                  : "border-gray-100 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              {feature.highlight && (
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Core Feature
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
            <a
              href="#downloads"
              className="px-8 py-3 bg-white rounded-full font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Try All Features Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
