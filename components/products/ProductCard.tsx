"use client";

import { Product } from "@/types/index";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { MouseEvent, useEffect, useMemo, useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const productImages = useMemo(
    () =>
      Array.from(
        new Set([...(product.images || []), product.thumbnail].filter(Boolean)),
      ),
    [product.images, product.thumbnail],
  );
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % productImages.length);
  };

  useEffect(() => {
    if (!isHovered || productImages.length <= 1) {
      return;
    }

    showNextImage();

    const interval = window.setInterval(() => {
      showNextImage();
    }, 3500);

    return () => window.clearInterval(interval);
  }, [isHovered, productImages.length]);

  const handleSlideChange = (
    event: MouseEvent<HTMLButtonElement>,
    direction: "prev" | "next",
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setActiveImage((current) => {
      if (direction === "prev") {
        return current === 0 ? productImages.length - 1 : current - 1;
      }

      return (current + 1) % productImages.length;
    });
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {productImages.length > 0 ? (
          <>
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeImage * 100}%)` }}
            >
              {productImages.map((image) => (
                <div key={image} className="relative h-full w-full shrink-0">
                  <Image
                    src={image}
                    alt={product.title}
                    fill
                    className="h-full w-full object-contain p-4"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src =
                        "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              ))}
            </div>

            {productImages.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous product image"
                  onClick={(event) => handleSlideChange(event, "prev")}
                  className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition-colors hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next product image"
                  onClick={(event) => handleSlideChange(event, "next")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition-colors hover:bg-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {productImages.map((image, index) => (
                    <span
                      key={image}
                      className={`h-1.5 rounded-full transition-all ${
                        activeImage === index
                          ? "w-5 bg-blue-600"
                          : "w-1.5 bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {product.category}
          </span>
          {product.rating !== undefined && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
              <Star className="h-4 w-4 fill-current" />
              {product.rating}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        {product.brand && (
          <p className="mb-2 text-sm font-medium text-gray-500">
            {product.brand}
          </p>
        )}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage !== undefined && (
              <p className="text-xs font-semibold text-emerald-600">
                {product.discountPercentage}% off
              </p>
            )}
          </div>
          <Link
            href={`/products/${product.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
