import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { DemoSection } from "@/components/home/DemoSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PricingSection } from "@/components/home/PricingSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Smart Business Payment Management",
  description:
    "FastoPay lets authorized employees make verified company payments while managers set limits, approve workflows, and track every transaction in real time.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FastoPay",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://fastopay.in",
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://fastopay.in"
    }/logo/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@fastopay.in",
      telephone: "+91 97693 23616",
      contactType: "customer support",
      areaServed: "IN",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
