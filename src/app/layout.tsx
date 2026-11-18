import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Mirrors the homepage hero text.
const SITE_DESCRIPTION =
  "Hey there! I'm Lucas Wang, a full-stack game designer invested in human-computer interaction and AI. I've deployed projects played by 1M+ people as LWCoding!";

// Social preview image: a 1200x630 screenshot of the homepage.
const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Lucas Wang's portfolio homepage" };

export const metadata: Metadata = {
  metadataBase: new URL("https://lwcoding.com"),
  title: "Lucas Wang",
  description: SITE_DESCRIPTION,
  keywords: ["Lucas Wang", "Game Development", "Stanford", "Unity", "VR Development", "2D Game Development", "LWCoding"],
  authors: [{ name: "Lucas Wang" }],
  creator: "Lucas Wang",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Lucas Wang",
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "Lucas Wang",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Wang",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <ScrollToTopButton />
        <Analytics />
      </body>
    </html>
  );
}
