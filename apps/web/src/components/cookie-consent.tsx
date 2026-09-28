"use client";

// import from the framework
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// import from packages
import { Cookie, Settings2, Shield, BarChart3, Megaphone } from "lucide-react";

// import from components
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// import from libraries
import { type CookieConsent as CookieConsentType } from "@/lib/cookies";
import { useCookieStore } from "@/lib/stores/cookie-store";
import { cn } from "@/lib/utils";

type CookieCategory = {
  id: keyof CookieConsentType;
  name: string;
  description: string;
  icon: React.ReactNode;
  required?: boolean;
};

const cookieCategories: CookieCategory[] = [
  {
    id: "necessary",
    name: "Necessary",
    description:
      "Essential cookies that enable core functionality. These cannot be disabled.",
    icon: <Shield className="size-4" />,
    required: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Help us understand how visitors interact with our website to improve user experience.",
    icon: <BarChart3 className="size-4" />,
  },
  {
    id: "marketing",
    name: "Marketing",
    description:
      "Used to deliver personalized ads and measure the effectiveness of ad campaigns.",
    icon: <Megaphone className="size-4" />,
  },
];

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use Zustand store
  const { 
    consent, 
    status, 
    isModalOpen,
    setConsent, 
    acceptAll, 
    rejectAll,
    setModalOpen 
  } = useCookieStore();
  
  // Local state for editing preferences in the dialog
  const [tempConsent, setTempConsent] = useState<CookieConsentType>(consent);

  useEffect(() => {
    // Show banner if status is pending
    if (status === "pending") {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [status]);

  // Sync local temp state when store changes or modal opens
  useEffect(() => {
    if (isModalOpen) {
      setTempConsent(consent);
    }
  }, [isModalOpen, consent]);

  const closeBanner = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  }, []);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    closeBanner();
  }, [acceptAll, closeBanner]);

  const handleRejectAll = useCallback(() => {
    rejectAll();
    closeBanner();
  }, [rejectAll, closeBanner]);

  const handleSavePreferences = useCallback(() => {
    setConsent(tempConsent, "customized");
    setModalOpen(false);
    closeBanner();
  }, [tempConsent, setConsent, setModalOpen, closeBanner]);

  const handleToggleCategory = useCallback(
    (categoryId: keyof CookieConsentType) => {
      setTempConsent((prev) => ({
        ...prev,
        [categoryId]: !prev[categoryId],
      }));
    },
    []
  );

  // If banner is not visible AND modal is not open, render nothing.
  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {/* Banner */}
      {isVisible && (
        <div
          className={cn(
            "fixed bottom-4 right-4 z-50 max-w-sm transition-all duration-300 ease-out",
            isAnimating
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          )}
        >
          <div className="bg-card border-border rounded-xl border p-4 shadow-lg backdrop-blur-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cookie className="size-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-foreground text-sm font-semibold">
                  Cookie Settings
                </h3>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                We use cookies to enhance your experience.{" "}
                <Link href="/privacy" className="text-cyan-600 hover:underline dark:text-cyan-400">
                  Learn more
                </Link>
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="bg-cyan-800 text-white hover:bg-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-600"
                >
                  Accept All
                </Button>
                <Button onClick={handleRejectAll} variant="outline" size="sm">
                  Reject
                </Button>
                <Button
                  onClick={() => setModalOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <Settings2 className="mr-1 size-3.5" />
                  Customize
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="size-5 text-cyan-600 dark:text-cyan-400" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable
              different types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {cookieCategories.map((category) => (
              <div
                key={category.id}
                className="bg-muted/50 flex items-start justify-between gap-4 rounded-lg p-4"
              >
                <div className="flex gap-3">
                  <div className="text-muted-foreground mt-0.5">
                    {category.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground text-sm font-medium">
                        {category.name}
                      </span>
                      {category.required && (
                        <span className="rounded bg-cyan-100 px-1.5 py-0.5 text-xs text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={tempConsent[category.id]}
                  onCheckedChange={() => handleToggleCategory(category.id)}
                  disabled={category.required}
                  aria-label={`Toggle ${category.name} cookies`}
                />
              </div>
            ))}
          </div>

          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="flex-1 sm:flex-none sm:min-w-[120px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="flex-1 bg-cyan-800 text-white hover:bg-cyan-600 dark:bg-cyan-700 dark:hover:bg-cyan-600 sm:flex-none sm:min-w-[120px]"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  const { setModalOpen } = useCookieStore();

  return (
    <button
      onClick={() => setModalOpen(true)}
      className={cn(
        "text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors",
        className
      )}
    >
      <Cookie className="size-3.5" />
      Cookie Settings
    </button>
  );
}
