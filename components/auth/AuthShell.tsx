"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { authSlides } from "@/hooks/constant";

type AuthShellProps = {
  children: ReactNode;
  mode: "login" | "register";
};

const copy = {
  login: {
    eyebrow: "Welcome back",
    title: "Sign in to FastoPay",
  },
  register: {
    eyebrow: "Create organization",
    title: "Create your organization and manage payments with FastoPay",
  },
};

export function AuthShell({ children, mode }: AuthShellProps) {
  const content = copy[mode];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % authSlides.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
        <motion.section
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative hidden items-center justify-center bg-blue-100 px-10 lg:flex"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(37,99,235,0.16),transparent_32%),radial-gradient(circle_at_70%_70%,rgba(14,165,233,0.14),transparent_34%)]" />
          <div className="relative max-w-xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="mx-auto mb-7 inline-flex items-center justify-center"
            >
              <Image
                src="/logo/logo.png"
                alt="FastoPay"
                width={286}
                height={60}
                priority
                className="h-14 w-auto"
              />
            </motion.div>
            <div className="mx-auto flex min-h-[96px] max-w-lg items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeSlide}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="text-xl font-semibold leading-relaxed text-slate-700"
                >
                  {authSlides[activeSlide]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-56 flex justify-center gap-3">
              {authSlides.map((slide, index) => (
                <button
                  type="button"
                  aria-label={`Show auth message ${index + 1}`}
                  key={slide}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === activeSlide ? "bg-blue-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <section className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={`w-full rounded-md bg-white p-6 shadow-2xl shadow-slate-300/60 sm:p-8 ${
              mode === "register" ? "max-w-3xl" : "max-w-xl"
            }`}
          >
            <div className="mb-6 text-center">
              <Image
                src="/logo/logo.png"
                alt="FastoPay"
                width={152}
                height={32}
                priority
                className="mx-auto h-8 w-auto"
              />
              <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-blue-600">
                {content.eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-950">
                {content.title}
              </h1>
            </div>

            {children}
          </motion.div>
        </section>
      </div>
    </main>
  );
}
