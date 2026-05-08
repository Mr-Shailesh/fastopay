import { AuthTokens } from "@/types/index";

const TOKEN_KEY = "auth_tokens";
const USER_KEY = "auth_user";

const parseTokens = (value: string | null): AuthTokens | null => {
  if (!value) return null;

  try {
    return JSON.parse(value) as AuthTokens;
  } catch {
    return null;
  }
};

export const tokenManager = {
  setTokens: (tokens: AuthTokens) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    }
  },

  getTokens: (): AuthTokens | null => {
    if (typeof window === "undefined") return null;
    return parseTokens(localStorage.getItem(TOKEN_KEY));
  },

  getAccessToken: (): string | null => {
    const tokens = tokenManager.getTokens();
    return tokens?.accessToken || null;
  },

  clearTokens: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  hasTokens: (): boolean => {
    return tokenManager.getAccessToken() !== null;
  },
};
