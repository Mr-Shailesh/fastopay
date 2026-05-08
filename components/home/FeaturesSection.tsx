"use client";

import { motion } from "framer-motion";
import { BadgeCheck, CheckCircle2 } from "lucide-react";
import { fadeIn, staggerContainer } from "./animation";
import { features, steps } from "@/hooks/constant";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white scroll-mt-16">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for{" "}
            <span className="text-blue-600">Modern Enterprises</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to simplify company payments, automate
            approvals, and ensure accountability across your organization.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeIn}
              className={`rounded-lg border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg ${
                feature.highlighted
                  ? "border-blue-200 shadow-[0_14px_35px_rgba(37,99,235,0.14)]"
                  : "border-slate-200"
              }`}
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-5 text-lg font-bold text-slate-950">
                {feature.title}
              </h3>
              <ul className="space-y-3">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...fadeIn}
          className="mt-16 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-10 md:px-10"
        >
          <div className="mb-10 flex items-center justify-center gap-3 text-center">
            <BadgeCheck className="h-6 w-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-950">
              How FastoPay Works
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div
                  className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg ${step.className}`}
                >
                  {step.number}
                </div>
                <h4 className="mb-3 font-bold text-slate-950">{step.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
