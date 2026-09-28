// import from packages
import { create } from "zustand";
import { persist } from "zustand/middleware";

// import from libraries
import { CookieConsent, defaultConsent, ConsentStatus } from "@/lib/cookies";
import { logConsentAction } from "@/lib/consent-actions";
import { updateGTMConsent } from "@/lib/cookies";

interface CookieState {
  consent: CookieConsent;
  status: ConsentStatus;
  isModalOpen: boolean;
  
  // Actions
  setConsent: (consent: CookieConsent, status: ConsentStatus) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  setModalOpen: (isOpen: boolean) => void;
}

export const useCookieStore = create<CookieState>()(
  persist(
    (set, get) => ({
      consent: defaultConsent,
      status: "pending",
      isModalOpen: false,

      setConsent: (consent, status) => {
        // Update state
        set({ consent, status });
        
        // Side effects (keeping these here ensures they happen on every update)
        updateGTMConsent(consent);
        logConsentAction(consent, status);
      },

      acceptAll: () => {
        const allAccepted: CookieConsent = {
          necessary: true,
          analytics: true,
          marketing: true,
        };
        get().setConsent(allAccepted, "accepted");
      },

      rejectAll: () => {
        const allRejected: CookieConsent = {
          necessary: true,
          analytics: false,
          marketing: false,
        };
        get().setConsent(allRejected, "rejected");
      },

      setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
    }),
    {
      name: "cookie-consent", // name of the item in the storage (must be unique)
      partialize: (state) => ({ 
        consent: state.consent, 
        status: state.status 
        // We do NOT persist isModalOpen
      }),
    },
  ),
);
