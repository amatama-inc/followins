import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Followins | Privacy-First Instagram Tracker",
  description: "Lacak follower dan unfollower Instagram Anda secara aman (100% Client-Side).",
};

import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/components/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DummyAd from "@/components/DummyAd";
import AdBlockDetector from "@/components/AdBlockDetector";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col transition-colors duration-300 overflow-x-hidden w-full relative">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <AdBlockDetector />
          </LanguageProvider>
          <DummyAd variant="sticky" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
