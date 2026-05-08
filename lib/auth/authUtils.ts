import { User, AuthTokens } from "@/types/index";

const CURRENT_USER_KEY = "auth_user";
const REGISTERED_USERS_KEY = "auth_users";

type StoredUserRecord = User & {
  passwordHash: string;
};

const parseStoredJson = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const generateTokens = (): AuthTokens => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({ iat: Date.now(), exp: Date.now() + 3600000 }),
  );
  const signature = btoa("secret");

  const accessToken = `${header}.${payload}.${signature}`;
  const refreshToken = `${header}.${btoa(JSON.stringify({ iat: Date.now(), exp: Date.now() + 86400000 }))}.${signature}`;

  return { accessToken, refreshToken };
};

export const hashPassword = async (password: string): Promise<string> => {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const getRegisteredUsers = (): StoredUserRecord[] => {
  if (typeof window === "undefined") return [];

  return parseStoredJson<StoredUserRecord[]>(
    localStorage.getItem(REGISTERED_USERS_KEY),
    [],
  );
};

const setRegisteredUsers = (users: StoredUserRecord[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  }
};

export const findRegisteredUserByEmail = (
  email: string,
): StoredUserRecord | null => {
  const normalizedEmail = email.trim().toLowerCase();

  return (
    getRegisteredUsers().find(
      (user) => user.email.toLowerCase() === normalizedEmail,
    ) || null
  );
};

export const storeRegisteredUser = async (
  user: User,
  password: string,
): Promise<void> => {
  const users = getRegisteredUsers();
  const normalizedEmail = user.email.trim().toLowerCase();
  const existingUser = users.find(
    (storedUser) => storedUser.email.toLowerCase() === normalizedEmail,
  );

  if (existingUser) {
    throw new Error("User already exists");
  }

  const userRecord: StoredUserRecord = {
    ...user,
    email: normalizedEmail,
    passwordHash: await hashPassword(password),
  };

  setRegisteredUsers([...users, userRecord]);
};

export const storeUser = (user: User): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  return parseStoredJson<User | null>(
    localStorage.getItem(CURRENT_USER_KEY),
    null,
  );
};

export const updateUser = (user: Partial<User>): User | null => {
  const current = getStoredUser();
  if (!current) return null;

  const updated = { ...current, ...user };
  const users = getRegisteredUsers();
  const updatedUsers = users.map((storedUser) =>
    storedUser.id === current.id ? { ...storedUser, ...updated } : storedUser,
  );

  setRegisteredUsers(updatedUsers);
  storeUser(updated);

  return updated;
};

export const generateUserId = (): string => {
  return "user_" + Math.random().toString(36).substr(2, 9);
};
