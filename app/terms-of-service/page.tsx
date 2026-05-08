import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { termsOfServiceSections } from "@/hooks/constant";

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-600">Legal</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950">
            Terms of Service
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            These terms describe the basic conditions for using FastoPay&apos;s
            business payment management services.
          </p>

          <div className="mt-12 space-y-8">
            {termsOfServiceSections.map((section) => (
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
