"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function ProfilePage() {
  const { isLoading, isAuthenticated } = useProtectedRoute();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProfileForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
