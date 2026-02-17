import type { Post } from "@/types";
import { mockPosts } from "@/mocks/posts";

export async function getPosts(): Promise<Post[]> {
  return [...mockPosts].sort((a, b) => a.order - b.order);
}

export async function getFeaturedPosts(): Promise<Post[]> {
  return [...mockPosts]
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

export async function getPostById(id: string): Promise<Post | null> {
  return mockPosts.find((p) => p.id === id) ?? null;
}
