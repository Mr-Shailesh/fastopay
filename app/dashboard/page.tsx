"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { motion } from "framer-motion";
import { stats, transactions } from "@/hooks/constant";
import { CreditCard, TrendingUp, Users, ArrowUpRight } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.1 },
};

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div {...fadeIn} className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, <span className="text-blue-600">{user?.fullName}</span>!
        </h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpRight
                className={`w-4 h-4 ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
              />
              <span
                className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </span>
              <span className="text-gray-600 text-sm">vs last month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div {...fadeIn} className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/products"
            className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">View Products</h3>
            <p className="text-sm text-gray-600">
              Browse all available products
            </p>
          </Link>

          <Link
            href="/profile"
            className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Update Profile</h3>
            <p className="text-sm text-gray-600">
              Manage your account information
            </p>
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200 opacity-60">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">Coming soon</p>
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeIn} className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-900">{tx.date}</td>
                  <td className="py-3 px-4 text-gray-900">{tx.desc}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {tx.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
