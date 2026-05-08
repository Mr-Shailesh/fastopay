import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { tokenManager } from "../auth/tokenManager";

const DEFAULT_API_URL = "https://api.freeapi.app/api/v1/public";

export interface ApiClientError {
  message: string;
  status?: number;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenManager.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }

    const responseData = error.response?.data as
      | { message?: string }
      | undefined;
    const normalizedError: ApiClientError = {
      message: responseData?.message || error.message || "Request failed",
      status: error.response?.status,
    };

    return Promise.reject(normalizedError);
  },
);

export default apiClient;
