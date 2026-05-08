"use client";

import { motion, useInView } from "framer-motion";
import { Heart, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fadeIn, staggerContainer } from "./animation";
import {
  aboutSectionBusinessReasons,
  aboutSectionStats,
  aboutSectionTechnicalReasons,
  aboutSectionValues,
} from "@/hooks/constant";

type CountUpStatProps = {
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  text?: string;
  duration?: number;
};

function CountUpStat({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  text,
  duration = 1800,
}: CountUpStatProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || value === undefined) {
      return;
    }

    setCount(0);

    let frameId = 0;
    const start = performance.now();

    const update = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(progress === 1 ? value : value * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [duration, isInView, value]);

  if (text) {
    return (
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        className="text-4xl font-bold text-blue-700"
      >
        {text}
      </motion.p>
    );
  }

  const formattedCount = count.toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });

  return (
    <p ref={ref} className="text-4xl font-bold text-blue-700">
      {prefix}
      {formattedCount}
      {suffix}
    </p>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-16">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="mb-14 text-center">
          <span className="inline-flex rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">
            About FastoPay
          </span>
          <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-bold leading-tight text-slate-950">
            Empowering Corporates and Customers with Smart Payment Solutions
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            We understand the unique challenges faced by corporates and
            Customers in managing payments done by their employees and key
            stakeholders while maintaining transparency, ease of operations and
            compliance with regulatory requirements.
          </p>
        </motion.div>

        <motion.div
          {...fadeIn}
          className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-12 text-center md:px-14"
        >
          <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Target className="h-7 w-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-950">Our Mission</h3>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            To simplify business payment processes managed by employees and key
            stakeholders for Corporate and social organizations while ensuring
            complete ease of operations and compliance with regulatory
            frameworks. We believe that technology should empower corporates and
            Customers to focus on their core mission rather than administrative
            complexities.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          className="my-14 grid grid-cols-2 gap-8 text-center md:grid-cols-4"
        >
          {aboutSectionStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeIn}>
              <CountUpStat {...stat} />
              <p className="mt-3 font-semibold text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeIn} className="mb-10 text-center">
          <h3 className="text-2xl font-bold text-slate-950">Our Core Values</h3>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {aboutSectionValues.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeIn}
              className="rounded-xl border border-slate-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <value.icon className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-950">{value.title}</h4>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...fadeIn}
          className="mt-16 rounded-xl bg-slate-50 px-6 py-12 md:px-16"
        >
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-white">
              <Heart className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-950">
              Why Choose FastoPay
            </h3>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <h4 className="mb-6 text-lg font-bold text-slate-950">
                Built for Modern Businesses and Social Enterprises
              </h4>
              <ul className="space-y-4">
                {aboutSectionBusinessReasons.map((reason) => (
                  <li key={reason} className="flex gap-3 text-slate-600">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold text-slate-950">
                Technical Excellence
              </h4>
              <ul className="space-y-4">
                {aboutSectionTechnicalReasons.map((reason) => (
                  <li key={reason} className="flex gap-3 text-slate-600">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
