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
  title: "Platinum Asset Advisors | Professional Investment Solutions",
  description: "Unlock your financial future with trusted expertise in crypto, forex, stocks, and more. Experience tailored investment strategies for sustainable growth with Platinum Asset Advisors.",
  keywords: [
    "investment advisor",
    "crypto trading",
    "forex trading",
    "stock trading",
    "copy trading",
    "financial advisor",
    "asset management",
    "investment strategies",
    "portfolio management",
    "wealth building"
  ],
  authors: [{ name: "Platinum Asset Advisors" }],
  creator: "Platinum Asset Advisors",
  publisher: "Platinum Asset Advisors",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://platinumassetadvisors.com",
    title: "Platinum Asset Advisors | Professional Investment Solutions",
    description: "Unlock your financial future with trusted expertise in crypto, forex, stocks, and more. Experience tailored investment strategies for sustainable growth.",
    siteName: "Platinum Asset Advisors",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Platinum Asset Advisors Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Platinum Asset Advisors | Professional Investment Solutions",
    description: "Unlock your financial future with trusted expertise in crypto, forex, stocks, and more. Experience tailored investment strategies for sustainable growth.",
    images: ["/logo.png"],
    creator: "@platinumassetadvisors",
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Platinum Asset Advisors",
    "description": "Professional investment solutions for crypto, forex, stocks, and copy trading",
    "url": "https://platinumassetadvisors.com",
    "logo": "https://platinumassetadvisors.com/logo.png",
    "sameAs": [
      "https://twitter.com/platinumassetadvisors",
      "https://linkedin.com/company/platinum-asset-advisors"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "serviceType": [
      "Investment Advisory",
      "Cryptocurrency Trading",
      "Forex Trading", 
      "Stock Trading",
      "Copy Trading",
      "Asset Management"
    ],
    "areaServed": "Worldwide"
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3772ff" />
        <meta name="msapplication-TileColor" content="#3772ff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href="https://platinumassetadvisors.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
