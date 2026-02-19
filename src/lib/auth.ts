import { cookies } from "next/headers";
import { apiPost } from "@/lib/api";

const COOKIE_NAME = "admin_token";

type LoginData = { token: string; user: { id: string; email: string } };

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const data = await apiPost<LoginData>("/auth/login", { email, password });
    if (!data?.token) {
      return { success: false, error: "Invalid response from server." };
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed.";
    return { success: false, error: message };
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token?.value ?? null;
}

export async function verifyAuth(): Promise<boolean> {
  const token = await getToken();
  return !!token;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
