const GA_MEASUREMENT_ID = "G-Z1KWE11J4N";

type Gtag = (
  command: "js" | "config" | "event" | "set",
  targetIdOrEventName: string | Date,
  params?: Record<string, any>
) => void;

function getGtag(): Gtag | null {
  // @ts-ignore - gtag injected by GA script in index.html
  return typeof window !== "undefined" &&
    typeof (window as any).gtag === "function"
    ? (window as any).gtag
    : null;
}

export function trackPageview(path: string) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("config", GA_MEASUREMENT_ID, { page_path: path });
}

export function trackEvent(action: string, params?: Record<string, any>) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", action, params || {});
}

export { GA_MEASUREMENT_ID };
