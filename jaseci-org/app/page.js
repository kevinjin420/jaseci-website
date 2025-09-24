"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import Hero from "@layouts/components/landing/Hero";
import JacSuperset from "@layouts/components/landing/JacSuperset";
import Carousel from "@layouts/components/landing/Carousel";
import {
  featuresSlides,
  gettingStartedSlides,
} from "@lib/landing-page-content";
import Journey from "@layouts/components/landing/Journey";
import About from "@layouts/components/landing/About";
import VerticalTabs from "@layouts/components/landing/VerticalTabs";
import WhyWeBuilt from '@layouts/components/landing/WhyWeBuilt';

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
        <JacSuperset />
        <VerticalTabs />
        <Carousel
          slides={gettingStartedSlides}
          title="Get Started with Jaseci Stack"
          sectionId="learn"
        />
        <div className="bg-[#222222]">
          <Carousel slides={featuresSlides} title="Why Choose Jac?" />
        </div>
        <WhyWeBuilt />
        <About />
        <Journey />
      </div>
    </>
  );
};

export default LandingPage;
