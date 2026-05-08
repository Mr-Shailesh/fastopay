"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Star, Zap } from "lucide-react";
import { MouseEvent } from "react";
import { fadeIn, staggerContainer } from "./animation";
import { pricePlans } from "@/hooks/constant";

export function PricingSection() {
  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="pricing" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="text-center mb-14">
          <span className="inline-flex rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">
            Pricing Plans
          </span>
          <h2 className="mt-5 text-4xl font-bold text-slate-950">
            Choose the Right Plan for Your Organization
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. All plans include core
            features with scalable options.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {pricePlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeIn}
              className={`relative flex min-h-[620px] flex-col rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.featured
                  ? "border-blue-500 shadow-[0_18px_45px_rgba(37,99,235,0.16)]"
                  : "border-slate-200"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow-md">
                    <Star className="h-3.5 w-3.5" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-950">
                  {plan.name}
                </h3>
                <p className="mt-8 text-3xl font-bold text-slate-950">
                  {plan.price}
                </p>
                <p className="mt-2 text-xl text-slate-700">+</p>
                <p className="mt-3 text-base italic text-slate-500">
                  {plan.setupFee}
                </p>
                <p className="mt-8 min-h-12 text-base text-slate-600">
                  {plan.desc}
                </p>
              </div>

              <Link
                href={plan.href}
                onClick={
                  plan.href.startsWith("#")
                    ? (event) =>
                        handleSectionNavigation(event, plan.href.slice(1))
                    : undefined
                }
                className={`mt-10 inline-flex items-center justify-center gap-3 rounded-md border px-5 py-3 text-sm font-bold transition-colors ${
                  plan.featured
                    ? "border-blue-700 bg-blue-700 text-white hover:bg-blue-800"
                    : "border-slate-200 bg-white text-slate-950 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {plan.action}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <ul className="mt-8 space-y-5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-4 text-slate-700"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...fadeIn}
          className="mt-16 rounded-xl bg-blue-700 px-6 py-12 text-center text-white shadow-2xl shadow-blue-900/20 md:px-10"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <Zap className="h-7 w-7" />
          </div>
          <h3 className="text-2xl font-bold">
            Ready to Transform Your Payment Process?
          </h3>
          <p className="mt-5 text-lg text-blue-50">
            Join hundreds of Customers already using FastoPay to streamline
            their operations
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-white px-6 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#contact"
              onClick={(event) => handleSectionNavigation(event, "contact")}
              className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Schedule Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
