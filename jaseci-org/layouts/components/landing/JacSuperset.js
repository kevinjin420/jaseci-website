"use client";

import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "../CodeBlock";

const JacSuperset = () => {
  const [isVisible, setIsVisible] = useState(false); // State to track visibility
  const sectionRef = useRef(null); // Ref for the intersection observer

  const PythonInJacCode = `
import math; #import python libraries
import from random { uniform } #import specific functions

with entry{
  value =  math.pi * uniform(0, 10);
  print(value);
}
`;

  const NpmInJacCode = `
cl import from react { useState, useEffect }
cl import from '@mui/material' { Button, TextField }

cl {
  def App() -> any {
    has count: int = 0;  # Auto becomes useState!
    return <div>
      <TextField label="Count" value={count} />
      <Button onClick={lambda: None { count += 1; }}>
        Increment
      </Button>
    </div>;
  }
}
`;

  // --- Animation Logic ---
  const ANIMATION_DURATION = '0.9s';
  const TRANSLATION_Y = '30px';

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Helper function for staggered entry animation
  const getChildAnimationStyle = (delayMultiplier) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${TRANSLATION_Y})`,
    transition: `opacity ${ANIMATION_DURATION} ease-out ${delayMultiplier}s, transform ${ANIMATION_DURATION} ease-out ${delayMultiplier}s`,
  });

  const getHeaderAnimationStyle = isVisible
    ? { animation: `fadeInUp ${ANIMATION_DURATION} ease-out both` }
    : { opacity: 0, transform: `translateY(${TRANSLATION_Y})` };

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-medium-bg via-dark-bg to-dark-bg relative overflow-hidden"
      ref={sectionRef} // Attach ref here
    >
      <div className="absolute inset-0 opacity-[0.06] overflow-hidden">
        <div className="absolute top-20 right-32 w-96 h-96 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-24 w-80 h-80 bg-gradient-to-br from-primary-orange via-primary-yellow to-amber-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full blur-2xl animate-blob-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Stagger 0s */}
        <div
          className="text-center mb-12 sm:mb-14 lg:mb-16"
          style={getHeaderAnimationStyle}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-primary-orange to-primary-yellow bg-clip-text text-transparent">
            Jac Supersets Python & JavaScript
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-primary-orange to-transparent mx-auto w-32 mb-5"></div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            One language with full access to both <span className="text-blue-400 font-medium">PyPI</span> and <span className="text-yellow-400 font-medium">npm</span> ecosystems
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {/* Mobile Image Block - Stagger 0.2s */}
          <div
            className="lg:hidden"
            style={getChildAnimationStyle(0.2)}
          >
            <div className="bg-gradient-to-br from-dark-bg/90 via-medium-bg/80 to-dark-bg/90 backdrop-blur-md rounded-2xl border border-light-bg/30 p-6 sm:p-8 shadow-card hover:shadow-card-hover hover:border-primary-orange/40 transition-all duration-300 hover:scale-[1.01] mx-2 sm:mx-0">
              <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-blue-500/5 rounded-xl blur-xl opacity-50"></div>
                <img
                  src="/images/assets/jacsuperset.png"
                  alt="Jac Supersets Python Diagram"
                  className="relative w-full h-auto max-w-xs sm:max-w-sm mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
          
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Desktop Left Column (Image/Diagram) - Stagger 0.2s */}
            <div
              className="relative"
              style={getChildAnimationStyle(0.2)}
            >
              <div className="group bg-gradient-to-br from-dark-bg/90 via-medium-bg/80 to-dark-bg/90 backdrop-blur-md rounded-2xl border border-light-bg/30 p-10 shadow-card hover:shadow-card-hover hover:border-primary-orange/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="relative flex justify-center items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-blue-500/5 rounded-xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img
                    src="/images/assets/jacsuperset.png"
                    alt="Jac Supersets Python Diagram"
                    className="relative w-full h-auto max-w-md mx-auto drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-orange/15 to-primary-yellow/15 backdrop-blur-md rounded-2xl border border-primary-orange/30 p-6 shadow-glow-sm hover:shadow-glow-md transition-all duration-300 mt-6">
                <div className="text-center">
                  <h3 className="text-primary-orange font-bold text-xl mb-3">
                    Full-Stack in One Language: Backend + Frontend + AI
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Use any Python library for backend logic and any npm package for UI components. Build complete applications with AI capabilities, automatic scaling, and zero context switching.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Right Column (Code Examples) - Stagger 0.4s */}
            <div
              className="space-y-6"
              style={getChildAnimationStyle(0.4)}
            >
              <div className="space-y-4">
                <div className="group bg-gradient-to-br from-dark-bg/90 via-medium-bg/70 to-dark-bg/90 backdrop-blur-md rounded-2xl border border-blue-500/20 p-6 shadow-card hover:shadow-card-hover hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:shadow-glow-sm group-hover:shadow-blue-500/50 transition-all duration-300"></div>
                    <div className="w-full min-w-0">
                      <h3 className="text-blue-400 font-bold text-xl mb-3 group-hover:text-blue-300 transition-colors duration-300">Use Any Python Library (PyPI)</h3>
                      <div className="overflow-x-auto overflow-y-auto max-h-64 rounded-xl border border-gray-700/50 bg-black/20">
                        <div className="min-w-max p-4">
                          <CodeBlock
                            code={PythonInJacCode}
                            language="jac"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="group bg-gradient-to-br from-dark-bg/90 via-medium-bg/70 to-dark-bg/90 backdrop-blur-md rounded-2xl border border-yellow-500/20 p-6 shadow-card hover:shadow-card-hover hover:border-yellow-400/40 transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mt-2 flex-shrink-0 group-hover:shadow-glow-sm group-hover:shadow-yellow-500/50 transition-all duration-300"></div>
                    <div className="w-full min-w-0">
                      <h3 className="text-yellow-400 font-bold text-xl mb-3 group-hover:text-yellow-300 transition-colors duration-300">Use Any npm Package (React, MUI, etc.)</h3>
                      <div className="overflow-x-auto overflow-y-auto max-h-64 rounded-xl border border-gray-700/50 bg-black/20">
                        <div className="min-w-max p-4">
                          <CodeBlock
                            code={NpmInJacCode}
                            language="jac"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Code Examples Block - Stagger 0.4s */}
          <div
            className="lg:hidden space-y-5 sm:space-y-6"
            style={getChildAnimationStyle(0.4)}
          >
            <div className="space-y-4">
              <div className="group bg-gradient-to-br from-dark-bg/90 via-medium-bg/70 to-dark-bg/90 backdrop-blur-md rounded-2xl border border-blue-500/20 p-4 sm:p-6 shadow-card hover:shadow-card-hover hover:border-blue-400/40 transition-all duration-300 hover:scale-[1.01] mx-2 sm:mx-0">
                <div className="flex flex-col items-start gap-3">
                  <div className="flex items-start gap-3 w-full">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:shadow-glow-sm group-hover:shadow-blue-500/50 transition-all duration-300"></div>
                    <h3 className="text-blue-400 font-bold text-base sm:text-xl mb-2 group-hover:text-blue-300 transition-colors duration-300">Use Any Python Library (PyPI)</h3>
                  </div>
                  <div className="w-full overflow-x-auto rounded-xl border border-gray-700/50 bg-black/20">
                    <div className="min-w-max p-4 sm:p-5">
                      <CodeBlock
                        code={PythonInJacCode}
                        language="jac"
                        className="text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-dark-bg/90 via-medium-bg/70 to-dark-bg/90 backdrop-blur-md rounded-2xl border border-yellow-500/20 p-4 sm:p-6 shadow-card hover:shadow-card-hover hover:border-yellow-400/40 transition-all duration-300 hover:scale-[1.01] mx-2 sm:mx-0">
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-start gap-3 w-full">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mt-2 flex-shrink-0 group-hover:shadow-glow-sm group-hover:shadow-yellow-500/50 transition-all duration-300"></div>
                  <h3 className="text-yellow-400 font-bold text-base sm:text-xl mb-2 group-hover:text-yellow-300 transition-colors duration-300">Use Any npm Package (React, MUI, etc.)</h3>
                </div>
                <div className="w-full overflow-x-auto rounded-xl border border-gray-700/50 bg-black/20">
                  <div className="min-w-max p-4 sm:p-5">
                    <CodeBlock
                      code={NpmInJacCode}
                      language="jac"
                      className="text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          
          {/* Mobile Bottom Text Block - Stagger 0.6s */}
          <div
            className="lg:hidden"
            style={getChildAnimationStyle(0.6)}
          >
            <div className="bg-gradient-to-r from-primary-orange/15 to-primary-yellow/15 backdrop-blur-md rounded-2xl border border-primary-orange/30 p-5 sm:p-6 shadow-glow-sm hover:shadow-glow-md transition-all duration-300 mx-2 sm:mx-0">
              <div className="text-center">
                <h3 className="text-primary-orange font-bold text-lg sm:text-xl mb-3">
                  Full-Stack in One Language: Backend + Frontend + AI
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Use any Python library for backend logic and any npm package for UI components. Build complete applications with AI capabilities, automatic scaling, and zero context switching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(${TRANSLATION_Y});
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

export default JacSuperset;
