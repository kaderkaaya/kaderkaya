import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { getBlogs } from "@/repositories/blogs";

export const metadata: Metadata = {
  title: "Blog — Kader Kaya",
  description:
    "Personal blog posts about backend development, career, and tech.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <FadeIn variant="fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Personal thoughts and technical articles.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {blogs.map((blog, i) => (
          <FadeIn key={blog.id} variant="fade-in-up" delay={i * 120}>
            <Link
              href={`/blog/${blog.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/40 transition-colors hover:border-border"
            >
              {blog.cover_image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={blog.cover_image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-semibold leading-snug group-hover:text-foreground">
                  {blog.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {blog.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(blog.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <div className="flex gap-1.5">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
