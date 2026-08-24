export const GA_MEASUREMENT_ID = "G-LHZ3WVPKE3";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, parameters);
}

