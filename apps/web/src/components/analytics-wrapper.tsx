"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { useCookieStore } from "@/lib/stores/cookie-store";

export function AnalyticsWrapper() {
  const { consent } = useCookieStore();

  if (!consent.analytics) return null;

  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
