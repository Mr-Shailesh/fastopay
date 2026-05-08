"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, LayoutDashboard, Smartphone } from "lucide-react";
import { fadeIn, staggerContainer } from "./animation";
import {
  adminCards,
  adminPanels,
  adminShowcases,
  interfaceFeatures,
  mobileScreens,
  months,
  statusOptions,
} from "@/hooks/constant";

function AdminDashboardMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-blue-50" />
          <span className="text-sm font-bold text-blue-700">FASTOPAY</span>
        </div>
        <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
          Owner
        </div>
      </div>

      <div className="grid grid-cols-[44px_1fr]">
        <div className="space-y-4 border-r border-slate-100 bg-slate-50 py-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className={`mx-auto h-4 w-4 rounded ${index === 1 ? "bg-blue-200" : "bg-slate-300"}`}
            />
          ))}
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {adminCards.map((card) => (
              <div
                key={card.title}
                className="rounded-md bg-blue-700 p-4 text-white"
              >
                <p className="text-sm font-bold">{card.title}</p>
                <p className="mt-2 text-2xl font-bold">{card.value}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-blue-50">
                  <span>
                    Domestic
                    <br />
                    {card.domestic}
                  </span>
                  <span>
                    Foreign
                    <br />
                    {card.foreign}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">
            <div className="rounded-md border border-slate-200 p-4">
              <p className="text-sm font-bold text-slate-600">
                Region-Wise Spendings
              </p>
              <div className="mt-5 flex h-48 items-end gap-5 border-b border-l border-slate-200 px-4">
                {months.map((month) => (
                  <div
                    key={month}
                    className="flex flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className={`w-full max-w-5 rounded-t ${month === "Oct" ? "h-36 bg-violet-600" : "h-1 bg-slate-200"}`}
                    />
                    <span className="text-[10px] text-slate-500">{month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {adminPanels.map((panel) => (
                <div
                  key={panel.label}
                  className="rounded-md border border-slate-200 p-3"
                >
                  <p className="text-xs font-bold uppercase text-slate-500">
                    {panel.label}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`rounded-md px-2 py-1 text-sm font-bold ${panel.className}`}
                    >
                      {panel.value}
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      Get Report
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="rounded bg-slate-600 px-3 py-1 text-xs font-bold text-white">
              Analytics Dashboard
            </span>
            <p className="mt-3 text-sm font-bold text-slate-600">
              Real-time transaction monitoring and reporting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminTableMock({ title }: { title: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <span className="text-sm font-bold text-blue-700">FASTOPAY</span>
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
          Owner
        </span>
      </div>
      <div className="p-5">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <div className="mt-4 flex flex-wrap gap-2">
          {statusOptions.map((item) => (
            <span
              key={item}
              className="rounded bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-5 overflow-hidden rounded-md border border-slate-200">
          <div className="grid grid-cols-6 bg-slate-100 px-3 py-3 text-xs font-bold text-slate-700">
            <span>Voucher No.</span>
            <span>Amount</span>
            <span>User</span>
            <span>Vendor</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          <div className="grid grid-cols-6 px-3 py-4 text-xs text-slate-600">
            <span>MB202510ER03</span>
            <span>₹1.50</span>
            <span>Yash</span>
            <span>Test 2</span>
            <span className="font-bold text-yellow-600">Pending</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoSection() {
  return (
    <section id="demo" className="py-20 bg-slate-50 scroll-mt-16">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-slate-950">
            See FastoPay in Action
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Explore our intuitive mobile app and powerful admin dashboard
            designed for seamless payment management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[0.95fr_1.05fr]">
          <motion.div {...fadeIn}>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-950">
                  Mobile Application
                </h3>
                <p className="text-slate-600">
                  Employee-friendly payment interface
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {mobileScreens.map((screen) => (
                <figure key={screen.src} className="text-center">
                  <div className="mx-auto max-w-[260px]">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={screen.width}
                      height={screen.height}
                      className="h-auto w-full drop-shadow-2xl"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <span
                      className={`rounded px-3 py-1 text-xs font-bold text-white ${screen.badgeClass}`}
                    >
                      {screen.badge}
                    </span>
                    <p className={`mt-3 text-sm font-bold ${screen.color}`}>
                      {screen.desc}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn}>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-600 text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-950">
                  Admin Dashboard
                </h3>
                <p className="text-slate-600">
                  Comprehensive management interface
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <AdminDashboardMock />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {adminShowcases.slice(0, 2).map((showcase) => (
                  <div key={showcase.title}>
                    <AdminTableMock
                      title={
                        showcase.title === "Reports"
                          ? "Pre-Approved Transaction Detail"
                          : "User Information"
                      }
                    />
                    <div className="mt-4 text-center">
                      <span
                        className={`rounded px-3 py-1 text-xs font-bold text-white ${showcase.badgeClass}`}
                      >
                        {showcase.title}
                      </span>
                      <p className="mt-3 text-sm font-bold text-slate-600">
                        {showcase.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <AdminTableMock title="Pending Transactions" />
                <div className="mt-4 text-center">
                  <span className="rounded bg-slate-600 px-3 py-1 text-xs font-bold text-white">
                    Transactions
                  </span>
                  <p className="mt-3 text-sm font-bold text-slate-600">
                    Real-time transaction monitoring and management
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 rounded-xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          <h3 className="text-center text-2xl font-bold text-slate-950">
            Key Interface Features
          </h3>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {interfaceFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                className="text-center"
              >
                <div
                  className={`mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg text-white ${feature.className}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-slate-950">{feature.title}</h4>
                <p className="mt-3 text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
