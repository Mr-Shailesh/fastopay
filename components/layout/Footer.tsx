"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { productLinks, socialLinks, supportLinks } from "@/hooks/constant";
import { getErrorMessage } from "@/lib/utils";

export function Footer() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId?: string,
  ) => {
    if (!sectionId) {
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAccountDeletionClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowDeleteModal(true);
  };

  const handleDeleteAccount = () => {
    try {
      localStorage.removeItem("auth_users");
      localStorage.removeItem("auth_tokens");
      localStorage.removeItem("auth_user");

      toast.success("All accounts deleted successfully");

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to delete account"));
    }
    setShowDeleteModal(false);
  };

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div className="max-w-md">
            <Link
              href="/"
              aria-label="FastoPay home"
              className="mb-6 inline-flex items-center rounded-lg bg-white px-3 py-2"
            >
              <Image
                src="/logo/logo-icon.png"
                alt="logo"
                width={37}
                height={36}
                className="h-9 w-auto"
              />
              <Image
                src="/logo/logo.png"
                alt="FastoPay"
                width={174}
                height={36}
                className="h-8 w-auto"
              />
            </Link>

            <div className="space-y-3">
              <p className="font-semibold leading-snug text-white">
                Ferolt India Pvt. Ltd.
                <br />
                Powai, Mumbai, Maharashtra
              </p>
              <p className="max-w-sm text-base leading-relaxed text-slate-400">
                Empowering corporates and Customers with smart payment solutions
                for seamless business operations.
              </p>
            </div>

            <div className="mt-5 flex gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-white transition-colors hover:bg-slate-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Product</h3>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.label === "Account Deletion Request" ? (
                    <a
                      href="#"
                      onClick={handleAccountDeletionClick}
                      className={`text-slate-400 transition-colors ${
                        link.danger ? "hover:text-red-500" : "hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={(event) =>
                        handleSectionNavigation(event, link.sectionId)
                      }
                      className={`text-slate-400 transition-colors ${
                        link.danger ? "hover:text-red-500" : "hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Support</h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(event) =>
                      handleSectionNavigation(event, link.sectionId)
                    }
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-8 text-center">
          <p className="text-sm font-medium text-slate-400">
            &copy; 2026 FastoPay. All rights reserved. Built for new age smart
            businesses.
          </p>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Delete Account
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action will
              remove all your data from local storage and cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
