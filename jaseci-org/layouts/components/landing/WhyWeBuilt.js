"use client";

import React from "react";

const WhyWeBuilt = () => {
  const cards = [
    {
      title: "Built for the Era of Scale",
      subtext: "Old abstractions from the 80s and 90s can't keep up with today's cloud, AI, and distributed software. Jaseci introduces modern tools built for this era.",
      gradient: "from-orange-400 to-orange-500",
      borderColor: "border-orange-400/30",
      hoverBorder: "hover:border-orange-400/50",
      titleColor: "text-orange-400",
      iconBg: "bg-gradient-to-r from-orange-500 to-orange-400",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      title: "An Extension, Not a Replacement",
      subtext: "Jaseci extends Python with new language features and runtimes, letting you stay in the ecosystem you already know.",
      gradient: "from-orange-500 to-orange-600",
      borderColor: "border-orange-500/30",
      hoverBorder: "hover:border-orange-500/50",
      titleColor: "text-orange-500",
      iconBg: "bg-gradient-to-r from-orange-600 to-orange-500",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: "Innovation Across the Stack",
      subtext: "From compiler to runtime to system integrations - Jaseci rethinks how every layer of software development works together.",
      gradient: "from-orange-600 to-orange-700",
      borderColor: "border-orange-600/30",
      hoverBorder: "hover:border-orange-600/50",
      titleColor: "text-orange-600",
      iconBg: "bg-gradient-to-r from-orange-700 to-orange-600",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "The Jaseci Stack & Extensibility",
      subtext: "With Jac Cloud for scaling, ByLLM for AI-native workflows, and an open plugin system, Jaseci makes it easy to build and extend modern apps.",
      gradient: "from-orange-700 to-orange-800",
      borderColor: "border-orange-700/30",
      hoverBorder: "hover:border-orange-700/50",
      titleColor: "text-orange-700",
      iconBg: "bg-gradient-to-r from-orange-800 to-orange-700",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-dark-bg to-[#1a1a1a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="absolute top-16 sm:top-32 left-8 sm:left-20 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute bottom-16 sm:bottom-32 right-6 sm:right-16 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-36 lg:w-48 h-24 sm:h-36 lg:h-48 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-8 sm:mb-12"
          style={{ animation: 'fadeInUp 0.6s ease-out both' }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-blue-400 to-primary-orange bg-clip-text text-transparent">
            Why We Built Jaseci
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto w-24 mb-3"></div>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-normal">
            The world of software development has evolved dramatically. Here's why we created Jaseci to meet modern challenges.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-dark-bg/80 via-dark-bg/60 to-dark-bg/80 backdrop-blur-sm rounded-xl border ${card.borderColor} ${card.hoverBorder} p-4 sm:p-6 shadow-2xl transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl mx-2 sm:mx-0 group`}
              style={{ 
                animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both` 
              }}
            >
              {/* Card Icon Badge */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.iconBg} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`${card.titleColor} font-bold text-lg sm:text-xl group-hover:text-opacity-90 transition-colors duration-300`}>
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="pl-14 sm:pl-16">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {card.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default WhyWeBuilt;