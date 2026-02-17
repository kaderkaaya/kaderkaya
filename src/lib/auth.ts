import { cookies } from "next/headers";

const MOCK_ADMIN_EMAIL = "admin@kaderkaya.com";
const MOCK_ADMIN_PASSWORD = "admin123";
const MOCK_TOKEN = "mock-jwt-token-kaderkaya-2025";
const COOKIE_NAME = "admin_token";

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (email !== MOCK_ADMIN_EMAIL || password !== MOCK_ADMIN_PASSWORD) {
    return { success: false, error: "Invalid email or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, MOCK_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token?.value === MOCK_TOKEN;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
export const AUTH_MOCK_TOKEN = MOCK_TOKEN;
