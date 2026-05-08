import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse FastoPay product examples with pricing, ratings, galleries, and product details.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products | FastoPay",
    description:
      "Explore product examples with images, pricing, ratings, stock, and detailed product information.",
    url: "/products",
  },
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
