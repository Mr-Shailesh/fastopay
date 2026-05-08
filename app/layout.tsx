import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner-toaster";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fastopay.in";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FastoPay | Smart Business Payment Management",
    template: "%s | FastoPay",
  },
  description:
    "FastoPay helps organizations manage company payments with employee controls, approval workflows, mobile payments, reporting, and transparent spend tracking.",
  applicationName: "FastoPay",
  keywords: [
    "FastoPay",
    "business payments",
    "corporate payment management",
    "employee spend controls",
    "approval workflows",
    "UPI business payments",
  ],
  authors: [{ name: "FastoPay" }],
  creator: "FastoPay",
  publisher: "FastoPay",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "FastoPay",
    title: "FastoPay | Smart Business Payment Management",
    description:
      "Empower employees to make secure company payments while managers track, approve, and control every transaction.",
    images: [
      {
        url: "/logo/logo.png",
        width: 696,
        height: 144,
        alt: "FastoPay logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FastoPay | Smart Business Payment Management",
    description:
      "Secure corporate payments, approval workflows, mobile payments, and transparent spend tracking for modern organizations.",
    images: ["/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo/logo-icon.png",
    apple: "/logo/logo-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white font-sans antialiased`}
      >
        {children}
        <Toaster />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
