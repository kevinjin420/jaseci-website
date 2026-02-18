import { useState, type FormEvent } from "react";

const GOOGLE_FORM_URL =
  "https://script.google.com/macros/s/AKfycbymWiprdqUnicdK3Eq4XYT8RFk9Fz84NnRFBs0VieMlMSzTEBBElWhXMINK1LuYIcQH/exec";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="text-green-400 font-semibold">Thanks for subscribing!</p>
        <p className="text-sm text-[#999] mt-1">You'll hear from us soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-4 py-3 rounded-lg bg-[#1f1f1f] text-white placeholder-gray-400 border border-[#333]/40 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-1">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
