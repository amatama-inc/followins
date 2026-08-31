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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://followins.vercel.app'),
  title: "Followins | Privacy-First Instagram Tracker",
  description: "Lacak follower dan unfollower Instagram Anda secara aman (100% Client-Side).",
  keywords: [
    "Instagram Tracker",
    "Unfollowers Instagram",
    "Instagram Analytics",
    "Privacy-first tracker",
    "Lacak Follower",
    "Cek Unfoll IG",
    "Client-side tracker",
    "Instagram unfollowers app",
    "Siapa yang unfollow IG",
    "Cek follower IG",
    "Aplikasi cek unfollowers",
    "Instagram mutuals tracker",
    "Instagram fans tracker",
    "Aman 100% tanpa password",
    "Lacak Instagram offline",
    "Cek ghost followers IG",
    "Instagram growth tracker",
    "Cara mengetahui siapa yang unfollow di IG",
    "Who unfollowed me on Instagram",
    "Safe Instagram tracker",
    "Track Instagram followers without login",
    "No password Instagram analytics",
    "Check Instagram unfollowers",
    "Instagram follower tracker app",
    "Instagram non-followers check",
  ],
  authors: [{ name: "Followins Team" }],
  creator: "Followins Team",
  openGraph: {
    title: "Followins | Privacy-First Instagram Tracker",
    description: "Lacak follower dan unfollower Instagram Anda secara aman (100% Client-Side). Temukan siapa yang tidak follback Anda.",
    siteName: "Followins",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Followins | Privacy-First Instagram Tracker",
    description: "Lacak follower dan unfollower Instagram Anda secara aman (100% Client-Side). Temukan siapa yang tidak follback Anda.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/components/ThemeContext";
import { SupportProvider } from "@/contexts/SupportContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DummyAd from "@/components/DummyAd";
import AdBlockDetector from "@/components/AdBlockDetector";
import PwaSetup from "@/components/PwaSetup";
import ContactSupportModal from "@/components/ContactSupportModal";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col transition-colors duration-300 overflow-x-hidden w-full relative">
        <ThemeProvider>
          <LanguageProvider>
            <SupportProvider>
              {children}
              <ContactSupportModal />
            </SupportProvider>
            <AdBlockDetector />
            <PwaSetup />
          </LanguageProvider>
          <DummyAd variant="sticky" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
