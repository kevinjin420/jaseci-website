"use client";

import { useMemo } from "react";

const journeyMilestones = [
  {
    description:
      "Prologue: In 2020, the concept of a new way of developing software in the AI era is conceived and later described in a Forbes blog article.",
    link: "https://www.forbes.com/sites/forbesbooksauthors/2021/05/18/whats-in-store-for-the-next-generation-of-ai-the-jaseci-perspective/",
    linkText: "Forbes Article",
  },
  {
    description:
      "In 2022, the idea has evolved and the first intellectual step in the journey of Jaseci and Jac is described.",
    link: "https://arxiv.org/abs/2206.08434",
    linkText: "Jaseci Philosophy Paper",
  },
  {
    description:
      "Then in 2023, the idea survives peer-review at Computer Architecture Letters.",
    link: "https://arxiv.org/abs/2305.09864",
    linkText: "Jaseci Runtime Stack Paper",
  },
  {
    description:
      "In 2024, the idea that AI should be a conventional code construct in the language is conjured and elucidated.",
    link: "https://arxiv.org/abs/2405.08965v1",
    linkText: "Meaning-Typed Code Paper",
  },
  {
    description: "Then in 2025, the idea survives peer-review. (pending)",
    link: "https://arxiv.org/abs/2405.08965v4",
    linkText: "Model-Integrated Applications Paper",
  },
  {
    description:
      'That same year (2025), "data-spatial programming" described in earlier works becomes "object-spatial programming" and is rigorously defined.',
    link: "https://arxiv.org/abs/2503.15812",
    linkText: "Object-Spatial Programming Paper",
  },
  {
    description:
      'In 2025, the notion of "scale-native programming" through language abstraction is rigorously defined though it was first described in the original 2022 paper.',
    link: "https://arxiv.org/abs/2504.03109",
    linkText: "Scale Native Programming Paper",
  },
];

function extractYear(text) {
  const m = text.match(/\b(20\d{2}|25\d{2})\b/);
  return m ? m[1] : null;
}

const Journey = () => {
  const items = useMemo(
    () =>
      journeyMilestones.map((m, i) => ({
        ...m,
        number: String(i + 1).padStart(2, "0"),
        year: extractYear(m.description),
        title:
          m.description.split(":")[0].length < 40
            ? m.description.split(":")[0]
            : undefined,
      })),
    []
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-orange to-primary-yellow rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-primary-yellow to-primary-orange rounded-full blur-lg animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-primary-orange to-primary-yellow bg-clip-text text-transparent">
              Journey of Jaseci
            </h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-primary-orange to-transparent mx-auto w-32"></div>
          </div>
          <p className="text-primary-orange italic mt-3 text-sm sm:text-base font-medium">
            ~ The story of an idea realized ~
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-orange via-primary-yellow to-primary-orange/20 shadow-[0_0_10px_rgba(255,149,0,0.3)]" />

          <div className="space-y-6 sm:space-y-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="relative flex items-start group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                }}
              >
                <div className="absolute left-2 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-orange to-primary-yellow rounded-full flex items-center justify-center z-10 shadow-lg shadow-primary-orange/25 group-hover:shadow-primary-orange/50 transition-all duration-300 group-hover:scale-110">
                  <span className="text-xs sm:text-xs font-bold text-white drop-shadow-sm">
                    {item.number}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-orange to-primary-yellow opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500"></div>
                </div>

                <div className="ml-12 sm:ml-16 flex-1 max-w-3xl">
                  <div className="bg-gradient-to-br from-dark-bg/60 via-dark-bg/40 to-dark-bg/60 backdrop-blur-sm border border-light-bg/20 rounded-xl p-3 sm:p-4 hover:border-primary-orange/40 transition-all duration-300 group-hover:transform group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-xl group-hover:shadow-primary-orange/10">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-3">
                        <span className="relative inline-flex items-center px-2 py-1 text-xs sm:text-sm font-bold text-primary-orange bg-primary-orange/10 border border-primary-orange/30 rounded-md hover:bg-primary-orange/20 hover:border-primary-orange/50 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-primary-orange/5 before:to-transparent before:rounded-md before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
                          {item.year}
                        </span>
                        {item.title && (
                          <span className="text-sm sm:text-base text-primary-orange font-semibold hidden sm:block group-hover:text-primary-yellow transition-colors duration-300">
                            {item.title}
                          </span>
                        )}
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm text-primary-orange hover:text-white bg-primary-orange/10 hover:bg-primary-orange rounded-full transition-all duration-300 hover:transform hover:scale-105 flex-shrink-0"
                      >
                        <span className="font-medium">{item.linkText}</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-45" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>

                    <p className="text-sm sm:text-base text-dark-text leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Journey continues message */}
        <div className="text-center mt-12 pt-8 border-t border-light-bg/10">
          <p className="text-lg sm:text-xl text-primary-orange font-medium italic opacity-80 hover:opacity-100 transition-opacity duration-300">
            And the journey continues...
          </p>
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
        
        .bg-size-200 {
          background-size: 200% 100%;
        }
        
        .bg-pos-0 {
          background-position: 0% 50%;
        }
        
        .bg-pos-100 {
          background-position: 100% 50%;
        }
      `}</style>
    </section>
  );
};

export default Journey;
