import type { Metadata } from "next";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { productsApi } from "@/lib/api/products";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await productsApi.detail(id);
    const description =
      product.description ||
      `View ${product.title} details, pricing, rating, stock, and images.`;

    return {
      title: product.title,
      description,
      alternates: {
        canonical: `/products/${id}`,
      },
      openGraph: {
        title: `${product.title} | FastoPay`,
        description,
        url: `/products/${id}`,
        images: product.thumbnail
          ? [
              {
                url: product.thumbnail,
                alt: product.title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.title} | FastoPay`,
        description,
        images: product.thumbnail ? [product.thumbnail] : undefined,
      },
    };
  } catch {
    return {
      title: "Product Details",
      description:
        "View product details, pricing, rating, stock, and image gallery.",
      alternates: {
        canonical: `/products/${id}`,
      },
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  return <ProductDetailClient productId={id} />;
}
