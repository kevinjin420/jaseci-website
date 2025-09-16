"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import Hero from "@layouts/components/landing/Hero";
import Carousel from "@layouts/components/landing/Carousel";
import {
  featuresSlides,
  gettingStartedSlides,
} from "@lib/landing-page-content";
import Journey from "@layouts/components/landing/Journey";
import About from "@layouts/components/landing/About";
import VerticalTabs from "@layouts/components/landing/VerticalTabs";

const LandingPage = () => {
  return (
    <>
      <SeoMeta
        title="Jac & Jaseci: The AI-First Programming Language"
        meta_title="Jac & Jaseci: The AI-First Programming Language and Stack"
        description="The Jac programming language and Jaseci runtime stack supersets Python with AI-first constructs, making it easy to build and scale sophisticated AI products."
        image="/images/logo.png"
      />
      <div className="bg-dark-bg pt-16 md:pt-20">
        <main className="max-w-none mx-auto px-5">
          <Hero />
        </main>
        <VerticalTabs />
        <Carousel
          slides={gettingStartedSlides}
          title="Get Started with Jac"
          sectionId="learn"
        />
        <div className="bg-[#222222]">
          <Carousel slides={featuresSlides} title="Why Choose Jac?" />
        </div>
        <About />
        <Journey />
      </div>
    </>
  );
};

export default LandingPage;
