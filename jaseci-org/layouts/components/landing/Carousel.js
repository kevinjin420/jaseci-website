"use client";

import { useState, useEffect, useRef } from "react";

const Carousel = ({ slides, title, sectionId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const autoplayInterval = useRef(null);

  const updateCarousel = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
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
  }, [totalSlides]);

  return (
    <section className="py-16" id={sectionId}>
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center text-4xl font-semibold mb-12">{title}</h2>
        <div
          className="relative overflow-hidden rounded-2xl pt-3.5"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col md:flex-row gap-8 px-2.5"
              >
                {slide.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="flex-1 min-w-[280px] bg-medium-bg rounded-2xl p-8 md:p-10 text-center transition-all duration-300 border border-light-bg relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-orange to-primary-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="text-5xl mb-5">{card.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4">
                      {card.title}
                    </h3>
                    <p className="text-dark-text mb-6 text-sm">
                      {card.description}
                    </p>
                    {card.link && (
                      <a
                        href={card.link}
                        className="card-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {card.linkText}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-5 mt-8">
            <button
              onClick={prevSlide}
              className="bg-gradient-to-r from-primary-orange to-primary-yellow text-white w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 text-lg font-bold hover:scale-110 disabled:bg-gray-600 disabled:scale-100 disabled:shadow-none"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => updateCarousel(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === index ? "bg-gradient-to-r from-primary-orange to-primary-yellow scale-125" : "bg-gray-600"}`}
                ></div>
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="bg-gradient-to-r from-primary-orange to-primary-yellow text-white w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 text-lg font-bold hover:scale-110 disabled:bg-gray-600 disabled:scale-100 disabled:shadow-none"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
