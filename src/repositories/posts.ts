import type { Post } from "@/types";
import { apiGet, mapItems } from "@/lib/api";

type ApiPost = Post & { _id?: string };

export async function getPosts(): Promise<Post[]> {
  const data = await apiGet<{ items: ApiPost[] }>("/post/list");
  const items = data?.items ?? [];
  return mapItems(items as (ApiPost & { _id: string })[]).sort(
    (a, b) => a.order - b.order
  ) as Post[];
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const all = await getPosts();
  return all.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export async function getPostById(id: string): Promise<Post | null> {
  const data = await apiGet<{ item: ApiPost | null }>("/post", { id });
  const item = data?.item;
  if (!item) return null;
  const mapped = mapItems([item as ApiPost & { _id: string }])[0];
  return mapped as Post;
}
