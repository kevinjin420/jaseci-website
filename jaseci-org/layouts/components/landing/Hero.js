"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const phrases = [
  "# Write once, scale everywhere",
  "# AI-first programming language",
  "# Object-Spatial Programming",
  "# Cloud-native by design",
];

const affiliations = [
  {
    logo: "/images/assets/org1_logo.png",
    text: "Part of Nvidia Inception Program, supporting cutting edge AI innovation and scalability",
  },
  {
    logo: "/images/assets/org2_logo.png",
    text: "Research led by faculty and researchers at University of Michigan, United States",
  },
  {
    logo: "/images/assets/org3_logo.png",
    text: "Sponsored by NSF, advancing community driven open source ecosystem",
  },
];

const TypingAnimation = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return <span className="h-9">{text}</span>;
};

const Hero = () => {
  return (
    <section className="text-center py-16">
      <h1 className="text-6xl font-bold mb-5 bg-gradient-to-r from-primary-orange to-primary-yellow text-transparent bg-clip-text">
        <Image
          src="/images/logo.png"
          alt="Jaseci Logo"
          width={64}
          height={64}
          className="inline-block align-middle mr-3.5 rounded-xl"
        />
        Jac and Jaseci
      </h1>
      <p className="text-xl text-dark-text mb-10 max-w-2xl mx-auto">
        The Jac programming language and Jaseci runtime stack supersets Python
        with
        <a
          href="https://arxiv.org/abs/2405.08965"
          target="_blank"
          className="fancy-link mx-1"
        >
          AI-first constructs
        </a>
        ,
        <a
          href="https://arxiv.org/abs/2503.15812"
          target="_blank"
          className="fancy-link mx-1"
        >
          object spatial programming
        </a>
        , and
        <a
          href="https://arxiv.org/abs/2504.03109"
          target="_blank"
          className="fancy-link mx-1"
        >
          scale-native constructs
        </a>
        .
      </p>
      <div className="h-9 text-2xl mb-10">
        <TypingAnimation />
      </div>
      <div className="flex gap-5 justify-center mb-5">
        <a
          href="#learn"
          className="bg-gradient-to-r from-primary-orange to-primary-yellow text-white px-8 py-3.5 rounded-lg text-base font-semibold no-underline transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,107,53,0.3)]"
        >
          Get Started
        </a>
      </div>

      <div className="text-center py-10 px-5 bg-dark-bg rounded-lg">
        <h3 className="text-sm text-white mb-8 font-semibold">
          Our journey is strengthened by our sponsors and partners
        </h3>
        <div className="flex justify-center items-center gap-16 flex-wrap">
          {affiliations.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 max-w-[330px]"
            >
              <Image
                src={item.logo}
                alt={`Affiliation ${index + 1}`}
                width={150}
                height={100}
                className="h-24 w-auto"
              />
              <p className="text-xs text-[#888] font-medium text-center max-w-[330px] leading-tight">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
