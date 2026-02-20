import type { MetadataRoute } from "next";
import { getBlogs } from "@/repositories/blogs";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.published_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/skills`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  return [...staticPages, ...blogEntries];
}
