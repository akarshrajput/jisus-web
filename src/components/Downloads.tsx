const Downloads = () => {
  return (
    <section
      id="downloads"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Download <span className="gradient-text">Jisus</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with your private AI assistant in minutes. Available for
            macOS and Windows.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* macOS Download */}
          <div className="glass rounded-3xl p-8 border border-white/50 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">⌘</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">macOS</h3>
              <p className="text-gray-600 mb-6">
                Universal binary for Intel & Apple Silicon
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>macOS 11.0 or later</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Intel & Apple Silicon</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>64-bit architecture</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="/downloads/Jisus-1.0.0-universal.dmg"
                  className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 animate-pulse-glow"
                  download
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                  </svg>
                  <span>Download DMG</span>
                </a>
                <p className="text-sm text-gray-500">Version 1.0.0 • 181 MB</p>
              </div>
            </div>
          </div>

          {/* Windows Download */}
          <div className="glass rounded-3xl p-8 border border-white/50 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">⊞</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Windows</h3>
              <p className="text-gray-600 mb-6">Installer for Windows 10/11</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Windows 10 build 19041+</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Windows 11 supported</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>64-bit architecture</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="/downloads/Jisus Setup 1.0.0.exe"
                  className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 animate-pulse-glow"
                  download
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                  </svg>
                  <span>Download EXE</span>
                </a>
                <p className="text-sm text-gray-500">Version 1.0.0 • 80.3 MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Installation Instructions
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">
                  macOS Installation
                </h4>
                <ol className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </span>
                    Download the DMG file
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </span>
                    Double-click to mount the disk image
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </span>
                    Drag Jisus to Applications folder
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      4
                    </span>
                    Launch and grant screen recording permissions
                  </li>
                </ol>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">
                  Windows Installation
                </h4>
                <ol className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </span>
                    Download the EXE installer
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </span>
                    Right-click and "Run as administrator"
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </span>
                    Follow the installation wizard
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      4
                    </span>
                    Launch and configure your API key
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            All downloads are digitally signed and verified. Jisus is completely
            open-source and respects your privacy. No data is collected or
            transmitted without your explicit consent.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Downloads;
