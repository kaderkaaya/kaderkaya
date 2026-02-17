import type { BlogPost } from "@/types";
import { mockBlogs } from "@/mocks/blogs";

export async function getBlogs(): Promise<BlogPost[]> {
  return [...mockBlogs].sort((a, b) => a.order - b.order);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  return mockBlogs.find((b) => b.slug === slug) ?? null;
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  return mockBlogs.find((b) => b.id === id) ?? null;
}
