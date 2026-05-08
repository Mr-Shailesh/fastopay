import apiClient from "@/lib/api/client";
import { Product, ProductsResult } from "@/types/index";

interface FreeApiListEnvelope {
  data?: {
    data?: Product[];
    products?: Product[];
    page?: number;
    totalPages?: number;
    nextPage?: number | null | false;
  };
  products?: Product[];
}

interface FreeApiDetailEnvelope {
  data?:
    | {
        data?: Product;
      }
    | Product;
  product?: Product;
}

const PAGE_SIZE = 10;

const getProductList = (payload: FreeApiListEnvelope): Product[] => {
  return payload.data?.data || payload.data?.products || payload.products || [];
};

const getProductDetail = (payload: FreeApiDetailEnvelope): Product => {
  const nestedData =
    payload.data && "data" in payload.data ? payload.data.data : payload.data;
  const product = payload.product || nestedData;

  if (!product || !("id" in product)) {
    throw new Error("Product not found");
  }

  return product;
};

export const productsApi = {
  async list(page = 1, limit = PAGE_SIZE): Promise<ProductsResult> {
    const { data } = await apiClient.get<FreeApiListEnvelope>(
      "/randomproducts",
      {
        params: { page, limit },
      },
    );
    const responseData = data.data || {};
    const products = getProductList(data);
    const currentPage = Number(responseData.page || page);
    const totalPages = Number(responseData.totalPages || 0);
    const nextPage = responseData.nextPage;
    const hasMore =
      typeof nextPage === "number"
        ? nextPage > currentPage
        : totalPages > 0
          ? currentPage < totalPages
          : products.length === limit;

    return {
      products,
      page: currentPage,
      totalPages,
      nextPage,
      hasMore,
    };
  },

  async detail(id: string): Promise<Product> {
    const { data } = await apiClient.get<FreeApiDetailEnvelope>(
      `/randomproducts/${id}`,
    );
    return getProductDetail(data);
  },
};
