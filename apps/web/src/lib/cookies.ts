export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentStatus = "pending" | "accepted" | "rejected" | "customized";

export type CookiePreferences = {
  consent: CookieConsent;
  status: ConsentStatus;
  updatedAt?: string;
};

export const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function updateGTMConsent(consent: CookieConsent): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

type ConsentArg = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

declare global {
  interface Window {
    gtag: (command: "consent", action: "update" | "default", params: ConsentArg) => void;
  }
}
