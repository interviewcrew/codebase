import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { monaspaceNeon } from "@/app/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    title: "My App",
    description: "A modern full-stack application boilerplate",
    siteName: "My App",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <div className={cn(monaspaceNeon.variable, "background-color font-sans")}>
        {children}
      </div>
    </ThemeProvider>
  );
}
