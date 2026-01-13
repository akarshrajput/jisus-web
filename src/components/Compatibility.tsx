const Compatibility = () => {
  const platforms = [
    {
      name: "Google Meet",
      icon: "📹",
      status: "Protected",
      color: "green",
    },
    {
      name: "Zoom",
      icon: "🎥",
      status: "Protected",
      color: "green",
    },
    {
      name: "Microsoft Teams",
      icon: "💼",
      status: "Protected",
      color: "green",
    },
    {
      name: "Discord",
      icon: "🎮",
      status: "Protected",
      color: "green",
    },
    {
      name: "Slack",
      icon: "💬",
      status: "Protected",
      color: "green",
    },
    {
      name: "Skype",
      icon: "📞",
      status: "Protected",
      color: "green",
    },
    {
      name: "OBS Studio",
      icon: "📺",
      status: "Protected",
      color: "green",
    },
    {
      name: "QuickTime",
      icon: "🎬",
      status: "Protected",
      color: "green",
    },
  ];

  const limitations = [
    {
      method: "Hardware Capture Cards",
      status: "Not Protected",
      reason: "Physical video signal capture bypasses software protection",
    },
    {
      method: "HDMI Recorders",
      status: "Not Protected",
      reason: "Hardware-level recording cannot be blocked by software",
    },
    {
      method: "AirPlay Mirroring",
      status: "Not Protected",
      reason: "Display mirroring works at hardware level",
    },
    {
      method: "Virtual Camera Software",
      status: "Varies",
      reason: "Depends on implementation and OS integration",
    },
  ];

  return (
    <section id="compatibility" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Universal <span className="gradient-text">Compatibility</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jisus works with all major screen sharing and recording platforms
            using native OS protection APIs
          </p>
        </div>

        {/* Protected Platforms */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ✅ Fully Protected Platforms
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-3">{platform.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {platform.name}
                </h4>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✅ Protected
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* How Protection Works */}
        <div className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🔒 How Screen Protection Works
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">macOS Protection</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Content Protection API
                    </p>
                    <p className="text-gray-600 text-sm">
                      Uses Electron&apos;s setContentProtection(true)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Window Server Flag
                    </p>
                    <p className="text-gray-600 text-sm">
                      Sets CGWindowSharingNone flag
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      System-Level Block
                    </p>
                    <p className="text-gray-600 text-sm">
                      All screen capture APIs respect the flag
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">
                Windows Protection
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Display Affinity API
                    </p>
                    <p className="text-gray-600 text-sm">
                      SetWindowDisplayAffinity function
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Exclude from Capture
                    </p>
                    <p className="text-gray-600 text-sm">
                      WDA_EXCLUDEFROMCAPTURE flag
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">DWM Integration</p>
                    <p className="text-gray-600 text-sm">
                      Desktop Window Manager enforces exclusion
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Known Limitations */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ⚠️ Known Limitations
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <p className="text-yellow-800 mb-6 text-center">
              These capture methods bypass software-level protection and may
              still record Jisus:
            </p>
            <div className="space-y-4">
              {limitations.map((limitation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        limitation.status === "Not Protected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {limitation.status === "Not Protected" ? "❌" : "⚠️"}{" "}
                      {limitation.status}
                    </span>
                    <span className="font-medium text-gray-900">
                      {limitation.method}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 max-w-md text-right">
                    {limitation.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compatibility;
