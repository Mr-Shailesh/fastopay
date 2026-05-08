export interface User {
  id: string;
  email: string;
  fullName: string;
  mobile: string;
  projects?: string[];
  budgets?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Product {
  id: number | string;
  title: string;
  price: number;
  description: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResult {
  products: Product[];
  hasMore: boolean;
  page: number;
  totalPages: number;
  nextPage?: number | null | false;
}

export interface RegisterPayload {
  email: string;
  fullName: string;
  mobile: string;
  password: string;
  securePin: string;
  projects: string[];
  budgets: string[];
}

export interface ContactSelectConfig {
  name: keyof Pick<
    ContactFormValues,
    "organizationType" | "employeeCount" | "requestType"
  >;
  label: string;
  options: string[];
}

export interface ContactFormValues {
  fullName: string;
  organizationName: string;
  email: string;
  phone: string;
  organizationType: string;
  employeeCount: string;
  requestType: string;
  message: string;
}
