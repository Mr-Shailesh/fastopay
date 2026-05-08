import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { refundAndCancellationSections } from "@/hooks/constant";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy",
  description:
    "Understand how FastoPay handles subscription cancellations, refund eligibility, setup fees, and refund processing timelines.",
  alternates: {
    canonical: "/refund-and-cancellation-policy",
  },
};

export default function RefundAndCancellationPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-600">Legal</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Refund and Cancellation Policy
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            This policy explains how FastoPay handles cancellation and refund
            requests for business services.
          </p>

          <div className="mt-12 space-y-8">
            {refundAndCancellationSections.map((section) => (
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
