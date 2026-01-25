"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import Hero from "@layouts/components/landing/Hero";
import JacSuperset from "@layouts/components/landing/JacSuperset";
import JacClient from "@layouts/components/landing/JacClient";
import JacScale from "@layouts/components/landing/JacScale";
import Carousel from "@layouts/components/landing/Carousel";
import {
  gettingStartedSlides,
} from "@lib/landing-page-content";
import VerticalTabs from "@layouts/components/landing/VerticalTabs";
import WhyWeBuilt from '@layouts/components/landing/WhyWeBuilt';

const LandingPage = () => {
  return (
    <>
      <SeoMeta
        title="Jac & Jaseci: One Language for AI-Native Full-Stack Development"
        meta_title="Jac & Jaseci: One Language for AI-Native Full-Stack Development"
        description="Build complete applications with backend, frontend, and AI in one unified language. Access PyPI and npm ecosystems, deploy from laptop to cloud with zero code changes."
        image="/images/logo.png"
      />
      <div className="bg-dark-bg pt-16 md:pt-20">
        <main className="max-w-none mx-auto px-5">
          <Hero />
        </main>
        <JacSuperset />
        <JacClient />
        <JacScale />
        <VerticalTabs />
        <Carousel
          slides={gettingStartedSlides}
          title="The Jaseci Stack"
          sectionId="learn"
        />
        <WhyWeBuilt />
      </div>
    </>
  );
};

export default LandingPage;
