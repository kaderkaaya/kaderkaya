import type { Post } from "@/types";
import { mockPosts } from "@/mocks/posts";

/**
 * Get all posts, sorted by order.
 */
export async function getPosts(): Promise<Post[]> {
  return [...mockPosts].sort((a, b) => a.order - b.order);
}

/**
 * Get only featured posts, sorted by order.
 */
export async function getFeaturedPosts(): Promise<Post[]> {
  return [...mockPosts]
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get a single post by ID.
 */
export async function getPostById(id: string): Promise<Post | null> {
  return mockPosts.find((p) => p.id === id) ?? null;
}
