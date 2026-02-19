"use server";

import { redirect } from "next/navigation";
import { login, logout, getToken } from "@/lib/auth";
import { apiGet, apiPost, mapItems } from "@/lib/api";
import type { Experience, Project, Post, BlogPost, Skill, SiteSettings } from "@/types";

type WithId = { _id: string; order: number };

function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

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

async function withToken<T>(fn: (token: string) => Promise<T>): Promise<{ error?: string; data?: T }> {
  const token = await getToken();
  if (!token) return { error: "Unauthorized. Please log in again." };
  try {
    const data = await fn(token);
    return { data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed.";
    return { error: message };
  }
}

// ——— Settings ———
export async function updateSettingsAction(settings: Partial<SiteSettings>) {
  return withToken((token) =>
    apiPost<{ settings: SiteSettings }>("/setting/update", settings, token)
  );
}

// ——— Experience ———
export async function createExperienceAction(payload: Omit<Experience, "id">) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/experience/create", payload, token)
  );
}

export async function updateExperienceAction(payload: Experience) {
  const { id, ...rest } = payload;
  return withToken((token) =>
    apiPost<{ item: unknown }>("/experience/update", { id, ...rest }, token)
  );
}

export async function deleteExperienceAction(id: string) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/experience/delete", { id }, token)
  );
}

export async function reorderExperiencesAction(
  items: { id: string; order: number }[]
) {
  return withToken((token) =>
    apiPost<{ success: boolean }>("/experience/reorder", { items }, token)
  );
}

export async function listExperiencesAction(): Promise<{ error?: string; data?: Experience[] }> {
  const out = await withToken((token) =>
    apiGet<{ items: (Experience & WithId)[] }>("/experience/list", undefined, token)
  );
  if (out.error) return { error: out.error };
  if (!out.data?.items) return { error: "No data" };
  const items = mapItems(out.data.items) as Experience[];
  return { data: sortByOrder(items) };
}

// ——— Project ———
export async function createProjectAction(payload: Omit<Project, "id">) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/project/create", payload, token)
  );
}

export async function updateProjectAction(payload: Project) {
  const { id, ...rest } = payload;
  return withToken((token) =>
    apiPost<{ item: unknown }>("/project/update", { id, ...rest }, token)
  );
}

export async function deleteProjectAction(id: string) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/project/delete", { id }, token)
  );
}

export async function reorderProjectsAction(
  items: { id: string; order: number }[]
) {
  return withToken((token) =>
    apiPost<{ success: boolean }>("/project/reorder", { items }, token)
  );
}

export async function listProjectsAction(): Promise<{ error?: string; data?: Project[] }> {
  const out = await withToken((token) =>
    apiGet<{ items: (Project & WithId)[] }>("/project/list", undefined, token)
  );
  if (out.error) return { error: out.error };
  if (!out.data?.items) return { error: "No data" };
  const items = mapItems(out.data.items) as Project[];
  return { data: sortByOrder(items) };
}

// ——— Post (Writing) ———
export async function createPostAction(payload: Omit<Post, "id">) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/post/create", payload, token)
  );
}

export async function updatePostAction(payload: Post) {
  const { id, ...rest } = payload;
  return withToken((token) =>
    apiPost<{ item: unknown }>("/post/update", { id, ...rest }, token)
  );
}

export async function deletePostAction(id: string) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/post/delete", { id }, token)
  );
}

export async function reorderPostsAction(items: { id: string; order: number }[]) {
  return withToken((token) =>
    apiPost<{ success: boolean }>("/post/reorder", { items }, token)
  );
}

export async function listPostsAction(): Promise<{ error?: string; data?: Post[] }> {
  const out = await withToken((token) =>
    apiGet<{ items: (Post & WithId)[] }>("/post/list", undefined, token)
  );
  if (out.error) return { error: out.error };
  if (!out.data?.items) return { error: "No data" };
  const items = mapItems(out.data.items) as Post[];
  return { data: sortByOrder(items) };
}

// ——— Blog ———
export async function createBlogAction(payload: Omit<BlogPost, "id">) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/blog/create", payload, token)
  );
}

export async function updateBlogAction(payload: BlogPost) {
  const { id, ...rest } = payload;
  return withToken((token) =>
    apiPost<{ item: unknown }>("/blog/update", { id, ...rest }, token)
  );
}

export async function deleteBlogAction(id: string) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/blog/delete", { id }, token)
  );
}

export async function reorderBlogsAction(items: { id: string; order: number }[]) {
  return withToken((token) =>
    apiPost<{ success: boolean }>("/blog/reorder", { items }, token)
  );
}

export async function listBlogsAction(): Promise<{ error?: string; data?: BlogPost[] }> {
  const out = await withToken((token) =>
    apiGet<{ items: (BlogPost & WithId)[] }>("/blog/list", undefined, token)
  );
  if (out.error) return { error: out.error };
  if (!out.data?.items) return { error: "No data" };
  const items = mapItems(out.data.items) as BlogPost[];
  return { data: sortByOrder(items) };
}

// ——— Skill ———
export async function createSkillAction(payload: Omit<Skill, "id">) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/skill/create", payload, token)
  );
}

export async function updateSkillAction(payload: Skill) {
  const { id, ...rest } = payload;
  return withToken((token) =>
    apiPost<{ item: unknown }>("/skill/update", { id, ...rest }, token)
  );
}

export async function deleteSkillAction(id: string) {
  return withToken((token) =>
    apiPost<{ item: unknown }>("/skill/delete", { id }, token)
  );
}

export async function reorderSkillsAction(items: { id: string; order: number }[]) {
  return withToken((token) =>
    apiPost<{ success: boolean }>("/skill/reorder", { items }, token)
  );
}

export async function listSkillsAction(): Promise<{ error?: string; data?: Skill[] }> {
  const out = await withToken((token) =>
    apiGet<{ items: (Skill & WithId)[] }>("/skill/list", undefined, token)
  );
  if (out.error) return { error: out.error };
  if (!out.data?.items) return { error: "No data" };
  const items = mapItems(out.data.items) as Skill[];
  return { data: sortByOrder(items) };
}

// ——— Visit stats ———
export type VisitStats = {
  totalVisits: number;
  uniqueVisitors: number;
  visitsByDay: { date: string; visits: number; unique: number }[];
};

export async function getVisitStatsAction(
  days: number = 7
): Promise<{ error?: string; data?: VisitStats }> {
  return withToken((token) =>
    apiGet<VisitStats>("/visit/stats", { days: String(days) }, token)
  );
}
