import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fastopay.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/products",
    "/privacy-policy",
    "/terms-of-service",
    "/refund-and-cancellation-policy",
  ];

  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
