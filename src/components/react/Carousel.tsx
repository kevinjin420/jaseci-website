import { useState, useEffect, useCallback } from "react";

interface Slide {
  icon: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

interface CarouselProps {
  slides: Slide[];
  title: string;
  autoPlay?: boolean;
  intervalMs?: number;
}

export default function Carousel({
  slides,
  title,
  autoPlay = true,
  intervalMs = 4000,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = slides.length;

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, intervalMs);
    return () => clearInterval(timer);
  }, [autoPlay, intervalMs, next]);

  const visibleCount = typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;

  const getVisibleSlides = () => {
    const result: Array<{ slide: Slide; index: number }> = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (activeIndex + i) % totalSlides;
      result.push({ slide: slides[idx], index: idx });
    }
    return result;
  };

  return (
    <section className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          {title}
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleSlides().map(({ slide, index }) => (
              <div
                key={`${index}-${slide.title}`}
                className="p-6 rounded-2xl bg-medium-bg/50 border border-light-bg/30 hover:border-primary-orange/40 transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{slide.icon}</span>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {slide.title}
                </h3>
                <p className="text-sm text-[#999] leading-relaxed mb-4">
                  {slide.description}
                </p>
                {slide.link && (
                  <a
                    href={slide.link}
                    className="inline-flex items-center gap-1 text-sm text-primary-orange hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {slide.linkText || "Learn more"}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-medium-bg/50 border border-light-bg/30 text-white hover:bg-medium-bg transition-colors"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === activeIndex
                      ? "bg-primary-orange w-6"
                      : "bg-light-bg/50 hover:bg-light-bg"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full bg-medium-bg/50 border border-light-bg/30 text-white hover:bg-medium-bg transition-colors"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
