import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Access",
  description:
    "Sign in or create a FastoPay account to manage business payment workflows.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
