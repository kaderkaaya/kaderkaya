import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { VisitRecorder } from "@/components/visit-recorder";
import { getSettings } from "@/repositories/settings";
import { SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kader Kaya — Backend Developer",
    template: "%s | Kader Kaya",
  },
  description:
    "Personal portfolio and CV of Kader Kaya. Backend Developer specializing in Node.js, React, and modern web technologies.",
  keywords: [
    "Kader Kaya",
    "Backend Developer",
    "Full Stack Developer",
    "Node.js",
    "React",
    "Next.js",
    "portfolio",
    "CV",
  ],
  authors: [{ name: "Kader Kaya", url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Kader Kaya",
    title: "Kader Kaya — Backend Developer",
    description:
      "Personal portfolio and CV of Kader Kaya. Backend Developer specializing in Node.js, React, and modern web technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kader Kaya — Backend Developer",
    description:
      "Personal portfolio and CV of Kader Kaya. Backend Developer specializing in Node.js, React, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function buildPersonJsonLd(sameAs: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kader Kaya",
    jobTitle: "Backend Developer",
    url: SITE_URL,
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const sameAs = [settings.github_url, settings.linkedin_url].filter(Boolean);
  const personJsonLd = buildPersonJsonLd(sameAs);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <VisitRecorder />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
