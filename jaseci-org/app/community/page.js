"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SeoMeta from "@layouts/partials/SeoMeta";
import { FaDiscord, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// --- Data for Cards ---
const channels = [
  {
    icon: <FaDiscord size={24} />,
    title: "Discord",
    description: "Jump into the conversation and get help from the community.",
    href: "https://discord.gg/6j3QNdtcN6",
    cta: "Visit Discord",
  },
  {
    icon: <FaGithub size={24} />,
    title: "GitHub",
    description: "Have an idea or found a bug? Help us improve Jaseci.",
    href: "https://github.com/jaseci-labs/jaseci",
    cta: "Visit GitHub",
  },
  {
    icon: <FaLinkedin size={24} />,
    title: "LinkedIn",
    description: "Follow our journey and connect with the team professionally.",
    href: "https://www.linkedin.com/company/jaseci-labs/",
    cta: "Visit LinkedIn",
  },
];

// --- Main Page Component ---
const CommunityPage = () => {
  return (
    <div className="bg-community-background text-community-text">
      <SeoMeta
        title="Community Hub - Jaseci"
        description="Build the Future of AI with the Jaseci Community. Connect, learn, and contribute."
      />

      <main className="pt-16 md:pt-20">
        <HeroSection />
        <ChannelsSection />
        <NewsletterSection />
        <ContactSection />
      </main>
    </div>
  );
};

// --- Section Components ---

const HeroSection = () => (
  <section className="relative py-14 text-center overflow-hidden">
    <div className="absolute inset-0 bg-radial-gradient from-about-background/50 via-[rgba(109,40,217,0.1)] to-about-background"></div>
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-orange/10 rounded-full filter blur-3xl animate-blob-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-yellow/5 rounded-full filter blur-3xl animate-blob-pulse animation-delay-2000"></div>
    </div>
    <div className="container relative z-10 max-w-4xl mx-auto px-5">
      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-primary text-transparent bg-clip-text">
        Community
      </h1>
      <div className="my-6 inline-block">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Build the Future of AI with the Jaseci Community
        </h2>
      </div>
      <p className="text-lg leading-relaxed max-w-3xl mx-auto text-community-text">
        Whether you&apos;re a developer building your first program, a
        researcher pushing the boundaries of what&apos;s possible, or an
        enthusiast exploring the future of technology, this is your hub to
        connect, learn, and contribute.
      </p>
      <p className="mt-4 font-semibold text-community-primary">
        Join us in building the next generation of AI applications.
      </p>
    </div>
  </section>
);

const ChannelsSection = () => (
  <section className="py-16">
    <div className="container max-w-5xl mx-auto px-5">
      <h2 className="text-center font-extrabold text-3xl mb-8">
        Connect & Discuss
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {channels.map((card) => (
          <article
            key={card.title}
            className="bg-community-card-bg border border-community-border rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-community-card-bg-hover hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-3 mb-3 text-community-primary">
              {card.icon}
              <h3 className="text-xl font-bold text-white">{card.title}</h3>
            </div>
            <p className="text-community-muted flex-grow mb-6">
              {card.description}
            </p>
            <Link
              href={card.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 font-semibold text-base px-5 py-2.5 rounded-lg border-2 border-community-primary text-community-primary transition-all duration-300 hover:bg-community-primary hover:text-black"
            >
              {card.cta}
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    setIsSubmitDisabled(!isValidEmail(formData.email));
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled || isSubmitting) return;

    setIsSubmitting(true);
    const payload = new FormData();
    payload.append("email", formData.email);
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("timestamp", new Date().toISOString());
    payload.append("userAgent", navigator.userAgent);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbymWiprdqUnicdK3Eq4XYT8RFk9Fz84NnRFBs0VieMlMSzTEBBElWhXMINK1LuYIcQH/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: payload,
        },
      );
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ email: "", firstName: "", lastName: "" });
      }, 3000);
    } catch (error) {
      console.error("Subscription failed:", error);
      setIsSuccess(true); // Still show success due to no-cors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container max-w-3xl mx-auto px-5">
        <div className="border-2 border-primary-orange/20 rounded-2xl shadow-2xl shadow-primary-orange/10 p-6 md:p-8">
          <h2 className="text-center text-3xl font-extrabold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-center text-community-text bg-primary-orange/10 border border-primary-orange/30 rounded-lg p-4 mb-6">
            Get the latest project updates, deep dives into new features, and
            community highlights delivered directly to your inbox.
          </p>

          {isSuccess ? (
            <div
              className="text-center text-green-400 font-semibold p-4 bg-green-500/10 rounded-lg"
              role="status"
            >
              You&apos;re subscribed! 🎉 Check your inbox for a confirmation
              email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
              <div className="grid gap-2">
                <label className="font-semibold" htmlFor="subscribe-email">
                  Email *
                </label>
                <input
                  className="w-full rounded-md border-community-border bg-[#0f0f11] text-white p-3 focus:border-community-primary focus:ring-2 focus:ring-community-primary/50"
                  id="subscribe-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label
                    className="font-semibold"
                    htmlFor="subscribe-first-name"
                  >
                    First name
                  </label>
                  <input
                    className="w-full rounded-md border-community-border bg-[#0f0f11] text-white p-3 focus:border-community-primary focus:ring-2 focus:ring-community-primary/50"
                    id="subscribe-first-name"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="font-semibold"
                    htmlFor="subscribe-last-name"
                  >
                    Last name
                  </label>
                  <input
                    className="w-full rounded-md border-community-border bg-[#0f0f11] text-white p-3 focus:border-community-primary focus:ring-2 focus:ring-community-primary/50"
                    id="subscribe-last-name"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                className="w-full inline-flex items-center justify-center gap-2 font-semibold text-lg px-5 py-3 rounded-lg border-2 border-community-primary bg-community-primary text-black transition-all duration-300 hover:bg-primary-orange/80 hover:border-primary-orange/80 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitDisabled || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Subscribe"}
              </button>
              <p className="text-center text-sm text-community-muted">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section className="py-20 text-center">
    <div className="container max-w-2xl mx-auto px-5">
      <h2 className="font-extrabold text-3xl mb-4">
        Have a Question or Feedback?
      </h2>
      <p className="text-community-muted leading-relaxed mb-6">
        For general inquiries, partnership opportunities, or feedback about the
        community itself, please don&apos;t hesitate to reach out to us
        directly.
      </p>
      <Link
        href="mailto:community@jaseci.org"
        className="inline-flex items-center justify-center gap-3 font-semibold text-lg px-6 py-3 rounded-lg border-2 border-community-primary bg-community-primary text-black transition-all duration-300 hover:bg-primary-orange/80 hover:border-primary-orange/80"
      >
        <FaEnvelope />
        Send Email
      </Link>
    </div>
  </section>
);

export default CommunityPage;
