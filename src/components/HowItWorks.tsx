const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Download & Install",
      description:
        "Download Jisus for your platform and complete the simple installation process.",
      icon: "💾",
      details: ["One-click installer", "No complex setup", "Digitally signed"],
    },
    {
      number: 2,
      title: "Configure API Key",
      description:
        "Add your Groq API key for AI functionality. Your key stays local and secure.",
      icon: "🔑",
      details: [
        "Free Groq account",
        "Local storage only",
        "No data transmission",
      ],
    },
    {
      number: 3,
      title: "Grant Permissions",
      description:
        "Allow necessary permissions for screen protection and global shortcuts.",
      icon: "🛡️",
      details: [
        "Screen recording (macOS)",
        "Accessibility access",
        "One-time setup",
      ],
    },
    {
      number: 4,
      title: "Start Using",
      description:
        "Use the global shortcut to toggle Jisus during your presentations and meetings.",
      icon: "🚀",
      details: [
        "Cmd+Shift+Space (Mac)",
        "Ctrl+Shift+Space (Win)",
        "Instant access",
      ],
    },
  ];

  const shortcuts = [
    {
      key: "Cmd + Shift + Space",
      action: "Toggle Jisus visibility",
      platform: "macOS",
    },
    {
      key: "Ctrl + Shift + Space",
      action: "Toggle Jisus visibility",
      platform: "Windows",
    },
    {
      key: "Esc",
      action: "Hide Jisus window",
      platform: "Both",
    },
    {
      key: "Tab",
      action: "Switch between input modes",
      platform: "Both",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How <span className="gradient-text">Jisus</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get up and running with your private AI assistant in just a few
            simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300 z-0"></div>
                )}

                {/* Step Card */}
                <div className="glass rounded-3xl p-8 text-center border border-white/50 backdrop-blur-xl relative z-10 hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">
                      {step.number}
                    </span>
                  </div>

                  <div className="text-4xl mb-4">{step.icon}</div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mb-6">{step.description}</p>

                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center justify-center space-x-2 text-sm text-gray-500"
                      >
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ⌨️ Keyboard Shortcuts
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 border border-white/50 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/70 rounded-xl"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <kbd className="px-3 py-1 bg-gray-200 rounded font-mono text-sm">
                          {shortcut.key}
                        </kbd>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {shortcut.platform}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{shortcut.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            💡 Perfect Use Cases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Business Presentations
              </h4>
              <p className="text-gray-600">
                Get AI assistance for data analysis, fact-checking, and
                generating talking points during client presentations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Online Teaching
              </h4>
              <p className="text-gray-600">
                Access lesson plans, answer student questions, and get teaching
                assistance without students seeing your AI helper.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">💼</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Job Interviews
              </h4>
              <p className="text-gray-600">
                Get help with technical questions, company research, and
                confident responses during virtual interviews.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#downloads"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
          >
            Start Using Jisus Today
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
