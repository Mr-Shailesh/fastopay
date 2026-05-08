"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { productsApi } from "@/lib/api/products";
import { getErrorMessage } from "@/lib/utils";
import { Product } from "@/types/index";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgePercent,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const productData = await productsApi.detail(id);

      setProduct(productData);
      setSelectedImage(productData.images?.[0] || productData.thumbnail || "");
      setError(null);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load product"));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  const productImages = useMemo(
    () =>
      product
        ? Array.from(
            new Set(
              [...(product.images || []), product.thumbnail].filter(Boolean),
            ),
          )
        : [],
    [product],
  );

  const handleGalleryStep = (direction: "prev" | "next") => {
    if (productImages.length <= 1) {
      return;
    }

    const currentIndex = Math.max(productImages.indexOf(selectedImage), 0);
    const nextIndex =
      direction === "prev"
        ? currentIndex === 0
          ? productImages.length - 1
          : currentIndex - 1
        : (currentIndex + 1) % productImages.length;

    setSelectedImage(productImages[nextIndex]);
  };

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-64px)] bg-gray-50">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/products"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center py-20">
              <p className="text-red-600 font-semibold mb-4">{error}</p>
              <button
                onClick={fetchProductDetail}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && product && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
                >
                  <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {selectedImage ? (
                      <Image
                        src={selectedImage}
                        alt={product.title}
                        fill
                        className="w-full h-full object-contain p-6"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src =
                            "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%23ddd width=%22400%22 height=%22400%22/%3E%3C/svg%3E";
                        }}
                      />
                    ) : (
                      <ShoppingCart className="w-16 h-16 text-gray-300" />
                    )}

                    {productImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Previous product image"
                          onClick={() => handleGalleryStep("prev")}
                          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-colors hover:bg-white"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next product image"
                          onClick={() => handleGalleryStep("next")}
                          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition-colors hover:bg-white"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {productImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-5 gap-3">
                      {productImages.map((image) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setSelectedImage(image)}
                          className={`relative h-20 overflow-hidden rounded-lg border bg-gray-50 transition-all ${
                            selectedImage === image
                              ? "border-blue-600 ring-2 ring-blue-100"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${product.title} preview`}
                            fill
                            className="object-contain p-2"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
                >
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {product.category}
                    </span>
                    {product.brand && (
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                        {product.brand}
                      </span>
                    )}
                    {product.rating !== undefined && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold">
                        <Star className="h-4 w-4 fill-current" />
                        {product.rating}
                      </span>
                    )}
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {product.title}
                  </h1>

                  <div className="mb-6 flex flex-wrap items-end gap-4">
                    <span className="text-4xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.discountPercentage !== undefined && (
                      <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                        <BadgePercent className="h-4 w-4" />
                        {product.discountPercentage}% off
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {product.description}
                  </p>

                  <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-500">Stock</p>
                      <p className="mt-1 flex items-center gap-2 text-lg font-bold text-gray-900">
                        <PackageCheck className="h-5 w-5 text-emerald-600" />
                        {product.stock ?? "N/A"} available
                      </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-500">Brand</p>
                      <p className="mt-1 text-lg font-bold text-gray-900">
                        {product.brand || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      Save for Later
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="bg-gray-50 p-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Product Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-gray-600 text-sm">Product ID</p>
                    <p className="text-gray-900 font-semibold">{product.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Category</p>
                    <p className="text-gray-900 font-semibold">
                      {product.category || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Rating</p>
                    <p className="text-gray-900 font-semibold">
                      {product.rating ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Stock</p>
                    <p className="text-gray-900 font-semibold text-green-600">
                      {product.stock ?? 0} units
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!isLoading && !error && !product && (
            <div className="text-center py-20">
              <p className="text-gray-600 font-semibold text-lg mb-4">
                Product not found
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Back to Products
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
