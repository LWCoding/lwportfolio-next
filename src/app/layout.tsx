import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Lucas Wang",
  description: "A passionate game designer, educator, and learner at Stanford University",
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
    description: "A passionate game designer, educator, and learner at Stanford University",
    type: "website",
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
      </body>
    </html>
  );
}
