"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { productsApi } from "@/lib/api/products";
import { getErrorMessage } from "@/lib/utils";
import { Product } from "@/types/index";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const pendingPageRef = useRef<number | null>(null);

  const fetchProducts = useCallback(async (pageToLoad = 1, reset = true) => {
    if (!reset && pendingPageRef.current === pageToLoad) {
      return;
    }

    pendingPageRef.current = pageToLoad;

    try {
      if (reset) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const result = await productsApi.list(pageToLoad);
      const productList = result.products;

      let appendedCount = productList.length;

      setProducts((currentProducts) => {
        if (reset) {
          return productList;
        }

        const existingIds = new Set(
          currentProducts.map((product) => String(product.id)),
        );
        const newProducts = productList.filter(
          (product) => !existingIds.has(String(product.id)),
        );
        appendedCount = newProducts.length;

        return [...currentProducts, ...newProducts];
      });
      setPage(result.page);
      setHasMore(result.hasMore && (reset || appendedCount > 0));
      setError(null);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load products"));
      if (reset) {
        setProducts([]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      pendingPageRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchProducts(1, true);
  }, [fetchProducts]);

  useEffect(() => {
    const loadMoreTarget = loadMoreRef.current;

    if (!loadMoreTarget || isLoading || isLoadingMore || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchProducts(page + 1, false);
        }
      },
      { rootMargin: "360px" },
    );

    observer.observe(loadMoreTarget);

    return () => observer.disconnect();
  }, [fetchProducts, hasMore, isLoading, isLoadingMore, page]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (normalizedSearch) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedSearch) ||
          p.description.toLowerCase().includes(normalizedSearch) ||
          p.brand?.toLowerCase().includes(normalizedSearch),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    return filtered;
  }, [products, searchTerm, selectedCategory]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.category).filter(Boolean)),
      ) as string[],
    [products],
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3 mb-4"
            >
              <Link href="/" className="text-white hover:text-blue-100">
                Home
              </Link>
              <span className="text-white">/</span>
              <span className="text-white font-semibold">Products</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Explore Our Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-blue-100 text-lg max-w-2xl"
            >
              Browse our comprehensive collection of products designed to meet
              your business needs
            </motion.p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === ""
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center py-20">
              <p className="text-red-600 font-semibold mb-4">{error}</p>
              <button
                onClick={() => fetchProducts(1, true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 font-semibold text-lg mb-4">
                No products found
              </p>
              <button
                onClick={() => {
                  handleSearch("");
                  handleCategoryChange("");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}

          {!isLoading && !error && hasMore && (
            <div ref={loadMoreRef} className="flex justify-center py-10">
              {isLoadingMore ? (
                <div className="flex items-center gap-3 text-blue-600">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                  <span className="font-semibold">
                    Loading more products...
                  </span>
                </div>
              ) : (
                <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-500 shadow-sm">
                  Scroll to load more products
                </span>
              )}
            </div>
          )}

          {!isLoading && !error && !hasMore && products.length > 0 && (
            <p className="py-10 text-center text-sm font-semibold text-gray-500">
              You have reached the end of the product list.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
