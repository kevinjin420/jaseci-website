// gtag.js utility for Google Analytics event tracking
// Usage: import { pageview, event } from './gtag';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track pageviews
export const pageview = (url) => {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
