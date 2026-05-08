import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { privacyPolicySections } from "@/hooks/constant";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how FastoPay collects, uses, protects, and shares information for business payment management services.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-600">Legal</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Privacy Policy
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            This policy explains how FastoPay handles information when
            businesses and their users access our payment management platform.
          </p>

          <div className="mt-12 space-y-8">
            {privacyPolicySections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
