import type { BlogPost } from "@/types";
import { apiGet, mapItems } from "@/lib/api";

type ApiBlogPost = BlogPost & { _id?: string };

export async function getBlogs(): Promise<BlogPost[]> {
  const data = await apiGet<{ items: ApiBlogPost[] }>("/blog/list");
  const items = data?.items ?? [];
  return mapItems(items as (ApiBlogPost & { _id: string })[]).sort(
    (a, b) => a.order - b.order
  ) as BlogPost[];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const data = await apiGet<{ item: ApiBlogPost | null }>("/blog", { slug });
  const item = data?.item;
  if (!item) return null;
  const mapped = mapItems([item as ApiBlogPost & { _id: string }])[0];
  return mapped as BlogPost;
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  const all = await getBlogs();
  return all.find((b) => b.id === id) ?? null;
}
