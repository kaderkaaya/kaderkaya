"use server";

import { redirect } from "next/navigation";
import { login, logout } from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const result = await login(email, password);

  if (!result.success) {
    return { error: result.error ?? "Login failed." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}
