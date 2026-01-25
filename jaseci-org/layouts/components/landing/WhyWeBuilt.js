"use client";

import React, { useState, useEffect, useRef } from "react";

// --- Custom Hook for Intersection Observer ---
const useIntersectionObserver = (ref, options) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // We only care when it starts intersecting. Once it's in view, we stop observing.
      if (entry.isIntersecting) {
        setInView(true);
        // Optional: stop observing once it has been revealed
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return inView;
};
// ------------------------------------------

const WhyWeBuilt = () => {
  const cards = [
    {
      title: "One Language, Full Stack",
      subtext: "Write backend APIs, React frontends, and AI integrations in a single language. No more context switching between Python, JavaScript, and prompt engineering.",
      gradient: "from-orange-400 to-orange-500",
      borderColor: "border-orange-400/30",
      hoverBorder: "hover:border-orange-400/50",
      titleColor: "text-orange-400",
      iconBg: "bg-gradient-to-r from-orange-500 to-orange-400",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      title: "PyPI + npm in One Language",
      subtext: "Access the entire Python ecosystem for backend logic and the full npm ecosystem for UI components. Use numpy, pandas, React, MUI - all in Jac.",
      gradient: "from-orange-500 to-orange-600",
      borderColor: "border-orange-500/30",
      hoverBorder: "hover:border-orange-500/50",
      titleColor: "text-orange-500",
      iconBg: "bg-gradient-to-r from-orange-600 to-orange-500",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      )
    },
    {
      title: "AI Without Prompt Engineering",
      subtext: "Replace function bodies with AI using Meaning Typed Programming. The function signature IS the specification - no complex prompts needed.",
      gradient: "from-orange-600 to-orange-700",
      borderColor: "border-orange-600/30",
      hoverBorder: "hover:border-orange-600/50",
      titleColor: "text-orange-600",
      iconBg: "bg-gradient-to-r from-orange-700 to-orange-600",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    {
      title: "Zero to Infinite Scale",
      subtext: "Deploy locally with one command, scale to Kubernetes production with the same code. Auto-provisioned databases, authentication, and API documentation.",
      gradient: "from-orange-700 to-orange-800",
      borderColor: "border-orange-700/30",
      hoverBorder: "hover:border-orange-700/50",
      titleColor: "text-orange-700",
      iconBg: "bg-gradient-to-r from-orange-800 to-orange-700",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      )
    }
  ];

  // Create a ref for the header element
  const headerRef = useRef(null);
  const headerInView = useIntersectionObserver(headerRef, { threshold: 0.1 });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-medium-bg via-dark-bg to-dark-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.06] overflow-hidden">
        <div className="absolute top-20 left-32 w-96 h-96 bg-gradient-to-br from-primary-orange via-orange-500 to-amber-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-24 w-80 h-80 bg-gradient-to-br from-amber-500 via-primary-yellow to-orange-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-orange-600/40 to-red-600/40 rounded-full blur-2xl animate-blob-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
    <div
          ref={headerRef} // Attach ref for observation
          className={`text-center mb-12 sm:mb-14 lg:mb-16 transition-all duration-700 ease-out ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-primary-orange to-amber-500 bg-clip-text text-transparent">
            Why Jaseci
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-primary-orange to-transparent mx-auto w-32 mb-5"></div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Modern software needs <span className="text-primary-orange font-medium">AI</span>, <span className="text-amber-500 font-medium">full-stack capabilities</span>, and <span className="text-orange-500 font-medium">seamless scaling</span>. Jaseci delivers all three in one unified stack.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {cards.map((card, index) => {
            // Use a separate ref for each card
            const cardRef = useRef(null);
            const cardInView = useIntersectionObserver(cardRef, { threshold: 0.1 });

            return (
              <div
                key={index}
                ref={cardRef} // Attach ref for observation
                className={`
                  bg-gradient-to-br from-dark-bg/90 via-medium-bg/80 to-dark-bg/90 backdrop-blur-md rounded-2xl border ${card.borderColor} ${card.hoverBorder} p-7 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-700 ease-out group mx-2 sm:mx-0
                  // Scroll animation classes
                  ${cardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  // Hover effects
                  hover:transform hover:scale-[1.02]
                `}
                style={{
                  transitionDelay: cardInView ? `${index * 0.15}s` : '0s' // Staggered delay only on reveal
                }}
              >
                {/* Card Icon Badge */}
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${card.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-300 shadow-lg`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`${card.titleColor} font-bold text-xl sm:text-2xl group-hover:brightness-110 transition-all duration-300`}>
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pl-0 mt-5">
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {card.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default WhyWeBuilt;