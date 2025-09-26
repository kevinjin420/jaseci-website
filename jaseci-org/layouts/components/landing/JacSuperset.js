"use client";

import React from "react";
import { CodeBlock } from "../CodeBlock";

const JacSuperset = () => {
  const JacInPythonCode = `
  import jaclang #enable .jac imports

# Importing Jac module /app/logic.jac from the package "app/"
import app.logic

# Use exported classes and fucntions from the logic.jac
print(app.logic.some_function())`;
const PythonInJacCode = `
import math; #import python libraries
import from random { uniform } #import specific functions

with entry{
  value =  math.pi * uniform(0, 10);
  print(value);
}
`;

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-dark-bg to-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="absolute top-16 sm:top-32 right-8 sm:right-20 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-16 sm:bottom-32 left-6 sm:left-16 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-br from-primary-orange to-primary-yellow rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
        <div
          className="text-center mb-8 sm:mb-10"
          style={{ animation: 'fadeInUp 0.6s ease-out both' }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-blue-400 to-primary-orange bg-clip-text text-transparent">
            Jac Supersets Python
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto w-24 mb-3"></div>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-normal">
            Like TypeScript for JavaScript, Jac extends Python with its own features
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div
            className="lg:hidden"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}
          >
            <div className="bg-gradient-to-br from-dark-bg/80 via-dark-bg/60 to-dark-bg/80 backdrop-blur-sm rounded-xl border border-light-bg/20 p-4 sm:p-6 shadow-2xl hover:border-primary-orange/30 transition-all duration-500 mx-2 sm:mx-0">
              <div className="relative flex justify-center items-center">
                <img 
                  src="/images/assets/jacsuperset.png" 
                  alt="Jac Supersets Python Diagram"
                  className="w-full h-auto max-w-xs sm:max-w-sm mx-auto"
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            
            <div
              className="relative"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}
            >
              <div className="bg-gradient-to-br from-dark-bg/80 via-dark-bg/60 to-dark-bg/80 backdrop-blur-sm rounded-xl border border-light-bg/20 p-8 shadow-2xl hover:border-primary-orange/30 transition-all duration-500">
                <div className="relative flex justify-center items-center">
                  <img 
                    src="/images/assets/jacsuperset.png" 
                    alt="Jac Supersets Python Diagram"
                    className="w-full h-auto max-w-sm mx-auto"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-orange/10 to-primary-yellow/10 backdrop-blur-sm rounded-xl border border-primary-orange/20 p-4 shadow-xl mt-6">
                <div className="text-center">
                  <h3 className="text-primary-orange font-bold text-xl mb-3">
                    Everything Python: OOP+ with Native AI & Infinite Scale
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Start with familiar Python syntax, then unlock AI capabilities, scale native programming and object spatial programming. Use Jac as a library in Python or write full Jac programs.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="space-y-6"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}
            >
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-dark-bg/60 via-dark-bg/40 to-dark-bg/60 backdrop-blur-sm rounded-xl border border-light-bg/20 p-4 shadow-xl hover:border-primary-orange/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="w-full min-w-0">
                      <h3 className="text-primary-orange font-bold text-lg mb-2">Import Jac into Python</h3>
                      <div className="overflow-x-auto overflow-y-auto max-h-64 rounded-lg border border-gray-700/50">
                        <div className="min-w-max p-4">
                          <CodeBlock 
                            code={JacInPythonCode} 
                            language="python"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-dark-bg/60 via-dark-bg/40 to-dark-bg/60 backdrop-blur-sm rounded-xl border border-light-bg/20 p-4 shadow-xl hover:border-blue-400/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="w-full min-w-0">
                      <h3 className="text-blue-400 font-bold text-lg mb-2">100% Python Compatible, use all Python libraries in Jac</h3>
                      <div className="overflow-x-auto overflow-y-auto max-h-64 rounded-lg border border-gray-700/50">
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
            </div>
          </div>

          <div
            className="lg:hidden space-y-4 sm:space-y-6"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}
          >
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-dark-bg/60 via-dark-bg/40 to-dark-bg/60 backdrop-blur-sm rounded-xl border border-light-bg/20 p-2 sm:p-4 shadow-xl hover:border-primary-orange/30 transition-all duration-300 mx-2 sm:mx-0">
                <div className="flex flex-col items-start gap-3">
                  <div className="flex items-start gap-3 w-full">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full mt-2 flex-shrink-0"></div>
                    <h3 className="text-primary-orange font-bold text-base sm:text-lg mb-2">Use Jac in Python as a library</h3>
                  </div>
                  <div className="w-full overflow-x-auto rounded-lg border border-gray-700/50">
                    <div className="min-w-max p-5 sm:p-4">
                      <CodeBlock 
                        code={JacInPythonCode} 
                        language="python"
                        className="text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-dark-bg/60 via-dark-bg/40 to-dark-bg/60 backdrop-blur-sm rounded-xl border border-light-bg/20 p-2 sm:p-4 shadow-xl hover:border-blue-400/30 transition-all duration-300 mx-2 sm:mx-0">
                <div className="flex flex-col items-start gap-3">
                  <div className="flex items-start gap-3 w-full">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full mt-2 flex-shrink-0"></div>
                    <h3 className="text-blue-400 font-bold text-base sm:text-lg mb-2">100% Python Compatible, use all Python libraries in Jac</h3>
                  </div>
                  <div className="w-full overflow-x-auto rounded-lg border border-gray-700/50">
                    <div className="min-w-max p-5 sm:p-4">
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
          </div>

          <div
            className="lg:hidden"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.7s both' }}
          >
            <div className="bg-gradient-to-r from-primary-orange/10 to-primary-yellow/10 backdrop-blur-sm rounded-xl border border-primary-orange/20 p-3 sm:p-4 shadow-xl mx-2 sm:mx-0">
              <div className="text-center">
                <h3 className="text-primary-orange font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">
                  Everything Python: OOP+ with Native AI & Infinite Scale
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                  Start with familiar Python syntax, then unlock AI capabilities, scale native programming and object spatial programming. Use Jac as a library in Python or write full Jac programs.
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

export default JacSuperset;