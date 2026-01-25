"use client";

import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// --- Custom Hook for Intersection Observer ---
const useIntersectionObserver = (ref, options) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
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

// Continuous carousel - shows 3 cards, scrolls one at a time, loops infinitely
const Carousel = ({ slides, title, sectionId }) => {
  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const navRef = useRef(null);

  const titleInView = useIntersectionObserver(titleRef, { threshold: 0.1 });
  const carouselInView = useIntersectionObserver(carouselRef, { threshold: 0.2 });
  const navInView = useIntersectionObserver(navRef, { threshold: 0.1 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('next');
  const autoplayInterval = useRef(null);
  const totalSlides = slides.length;

  // Get visible cards (3 cards starting from currentIndex, wrapping around)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalSlides;
      cards.push({ ...slides[index], originalIndex: index });
    }
    return cards;
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setAnimationDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setAnimationDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setAnimationDirection(index > currentIndex ? 'next' : 'prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoplayInterval.current = setInterval(nextSlide, 4000);
  };

  const stopAutoPlay = () => {
    clearInterval(autoplayInterval.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const visibleCards = getVisibleCards();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-dark-bg via-medium-bg to-dark-bg relative overflow-hidden" id={sectionId}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.06] overflow-hidden">
        <div className="absolute top-20 left-32 w-96 h-96 bg-gradient-to-br from-primary-orange via-orange-500 to-amber-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-24 w-80 h-80 bg-gradient-to-br from-amber-500 via-primary-yellow to-orange-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-red-500/40 to-orange-500/40 rounded-full blur-2xl animate-blob-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {title && (
          <div
            ref={titleRef}
            className={`
              text-center mb-12 sm:mb-14 lg:mb-16 transition-all duration-700 ease-out
              ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white via-primary-orange to-amber-500 bg-clip-text text-transparent">
              {title}
            </h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-primary-orange to-transparent mx-auto w-32 mb-5"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build AI-native full-stack applications
            </p>
          </div>
        )}

        <div
          ref={carouselRef}
          className={`
            relative transition-all duration-700 ease-out delay-200
            ${carouselInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          {/* Cards Container */}
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-300 ${isAnimating ? (animationDirection === 'next' ? 'opacity-0 -translate-x-4' : 'opacity-0 translate-x-4') : 'opacity-100 translate-x-0'}`}>
            {visibleCards.map((card, idx) => (
              <div
                key={`${card.originalIndex}-${currentIndex}-${idx}`}
                className="bg-gradient-to-br from-dark-bg/90 via-medium-bg/80 to-dark-bg/90 backdrop-blur-md rounded-2xl border border-light-bg/30 p-8 sm:p-10 shadow-card hover:shadow-card-hover transition-all duration-300 hover:border-primary-orange/50 hover:scale-[1.03] hover:-translate-y-2 group"
              >
                {/* Card Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-primary-orange/25 to-primary-yellow/25 backdrop-blur-md rounded-2xl border border-primary-orange/40 flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-300 shadow-lg">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl sm:text-2xl group-hover:text-primary-orange transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                  {card.description}
                </p>

                {/* Card Action */}
                {card.link && (
                  <div className="flex justify-start">
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-orange/20 to-primary-yellow/20 text-primary-orange font-semibold rounded-xl border border-primary-orange/40 hover:bg-gradient-to-r hover:from-primary-orange hover:to-primary-yellow hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-orange/20 text-base"
                    >
                      {card.linkText}
                      <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div
            ref={navRef}
            className={`
              flex justify-center items-center gap-6 mt-12 transition-all duration-700 ease-out delay-300
              ${navInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            <button
              onClick={prevSlide}
              className="bg-gradient-to-r from-primary-orange to-primary-yellow text-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 text-2xl font-bold hover:scale-110 hover:shadow-xl hover:shadow-primary-orange/30 hover:-translate-y-0.5"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full cursor-pointer transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-gradient-to-r from-primary-orange to-primary-yellow scale-125 shadow-lg shadow-primary-orange/50"
                      : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="bg-gradient-to-r from-primary-orange to-primary-yellow text-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 text-2xl font-bold hover:scale-110 hover:shadow-xl hover:shadow-primary-orange/30 hover:-translate-y-0.5"
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string,
      linkText: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string,
  sectionId: PropTypes.string,
};

export default Carousel;
