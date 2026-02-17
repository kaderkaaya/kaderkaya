import type { BlogPost } from "@/types";
import { mockBlogs } from "@/mocks/blogs";

/**
 * Get all blog posts, sorted by order.
 */
export async function getBlogs(): Promise<BlogPost[]> {
  return [...mockBlogs].sort((a, b) => a.order - b.order);
}

/**
 * Get a single blog post by slug.
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  return mockBlogs.find((b) => b.slug === slug) ?? null;
}

/**
 * Get a single blog post by ID.
 */
export async function getBlogById(id: string): Promise<BlogPost | null> {
  return mockBlogs.find((b) => b.id === id) ?? null;
}
