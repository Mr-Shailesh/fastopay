"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { MouseEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { navItems } from "@/hooks/constant";
import { toast } from "sonner";

export function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleLogout = () => {
    logout();
    router.push("/");
    setMobileMenuOpen(false);
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      setMobileMenuOpen(false);
      return;
    }

    event.preventDefault();
    setMobileMenuOpen(false);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            aria-label="FastoPay home"
            className="flex items-center"
            onClick={(event) => handleSectionNavigation(event, "hero")}
          >
            <Image
              src="/logo/logo-icon.png"
              alt="logo-icon"
              width={37}
              height={36}
              priority
              className="h-9 w-auto"
            />
            <Image
              src="/logo/logo.png"
              alt="logo"
              width={174}
              height={36}
              priority
              className="hidden h-9 w-auto sm:block"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => handleSectionNavigation(event, item.id)}
                className={`text-sm font-medium transition-all duration-200 relative pb-1 ${
                  activeSection === item.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <span className="text-gray-600 text-sm">{user?.fullName}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/products"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Products
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 pl-3 border-l-2 ${
                    activeSection === item.id
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-600 hover:text-gray-900 border-transparent"
                  }`}
                  onClick={(event) => handleSectionNavigation(event, item.id)}
                >
                  {item.label}
                </a>
              ))}

              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 pt-4">
                    <Link
                      href="/dashboard"
                      className="block text-gray-600 hover:text-gray-900 font-medium mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/products"
                    className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
