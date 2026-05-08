"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Play,
  Shield,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { fadeIn, staggerContainer } from "./animation";
import { heroCards, heroSlides } from "@/hooks/constant";

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

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

  const currentSlide = heroSlides[activeSlide];

  return (
    <section
      id="hero"
      className="scroll-mt-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-16"
    >
      <div className="mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Smart Business Payment Solution
          </span>

          <div className="mx-auto mt-12 flex min-h-[280px] max-w-5xl items-start justify-center md:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.title}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <h1 className="text-5xl font-bold leading-tight text-slate-950 md:text-7xl">
                  {currentSlide.title}{" "}
                  <span className="text-blue-600">
                    {currentSlide.highlight}
                  </span>
                </h1>

                <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-slate-600">
                  {currentSlide.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex justify-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                aria-label={`Show ${slide.title}`}
                key={slide.title}
                onClick={() => setActiveSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeSlide ? "bg-blue-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-blue-800 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-900"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#demo"
              onClick={(event) => handleSectionNavigation(event, "contact")}
              className="inline-flex items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-6 py-3 text-base font-bold text-slate-950 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50"
            >
              <Play className="h-4 w-4" />
              Schedule Demo
            </Link>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-5 text-sm text-slate-500 sm:flex-row">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              No credit card required
            </span>
            <span className="inline-flex items-center gap-2">
              <Zap className="h-4 w-4 text-violet-500" />
              Setup in minutes
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {heroCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeIn}
              whileHover={{ y: -8 }}
              className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-xl shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className={`mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg text-white ${card.className}`}
              >
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-950">{card.title}</h3>
              <p className="mt-4 leading-relaxed text-slate-600">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...fadeIn}
          className="mt-20 overflow-hidden rounded-xl bg-white p-6 shadow-2xl shadow-slate-200/70"
        >
          <div className="rounded-xl bg-slate-100 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <div className="ml-3 h-3 flex-1 rounded bg-slate-200" />
            </div>

            <div className="flex min-h-[420px] items-center justify-center rounded-b-lg bg-slate-200 px-4 py-20 md:min-h-[560px]">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-700 text-white shadow-xl shadow-blue-900/20">
                  <Play className="h-10 w-10 fill-current" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">
                  Interactive Demo
                </h3>
                <p className="mt-3 text-slate-500">
                  Experience FastoPay&apos;s powerful features firsthand
                </p>
                <Link
                  href="#demo"
                  onClick={(event) => handleSectionNavigation(event, "demo")}
                  className="mt-5 inline-flex rounded-md bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition-colors hover:bg-blue-50"
                >
                  View Screenshots
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          className="mt-16 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-12 text-center"
        >
          <h2 className="text-4xl font-bold text-blue-600">Download Our App</h2>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Manage spending, approvals, payments, and more, right from your
            phone.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-14 min-w-44 items-center justify-center gap-3 rounded-md bg-black px-5 text-left text-white"
            >
              <Smartphone className="h-7 w-7" />
              <span>
                <span className="block text-[10px] leading-none">
                  Download on the
                </span>
                <span className="block text-xl font-bold leading-tight">
                  App Store
                </span>
              </span>
            </button>
            <button
              type="button"
              className="inline-flex h-14 min-w-44 items-center justify-center gap-3 rounded-md bg-black px-5 text-left text-white"
            >
              <Play className="h-7 w-7 fill-current" />
              <span>
                <span className="block text-[10px] leading-none">
                  GET IT ON
                </span>
                <span className="block text-xl font-bold leading-tight">
                  Google Play
                </span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
