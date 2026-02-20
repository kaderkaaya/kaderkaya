import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { getBlogs, getBlogBySlug } from "@/repositories/blogs";
import { SITE_URL } from "@/lib/site";
import type { BlogPost } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Not Found" };

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const ogImages = blog.cover_image
    ? [{ url: blog.cover_image, width: 1200, height: 630, alt: blog.title }]
    : [];

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      url: canonicalUrl,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

function buildArticleJsonLd(blog: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    datePublished: blog.published_at,
    dateModified: blog.published_at,
    author: { "@type": "Person", name: "Kader Kaya" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const articleJsonLd = buildArticleJsonLd(blog);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn variant="fade-in-left">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </FadeIn>

      <FadeIn variant="fade-in-up" delay={80}>
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {blog.title}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
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
        </header>
      </FadeIn>

      {blog.cover_image && (
        <FadeIn variant="scale-in" delay={160}>
          <div className="relative mb-10 h-64 w-full overflow-hidden rounded-lg sm:h-80">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </FadeIn>
      )}

      <FadeIn variant="fade-in-up" delay={240}>
        <article className="prose prose-neutral max-w-none dark:prose-invert">
          {blog.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 mb-4 text-xl font-semibold">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("```")) {
              const lines = paragraph.split("\n");
              const code = lines.slice(1, -1).join("\n");
              return (
                <pre
                  key={i}
                  className="my-4 overflow-x-auto rounded-lg bg-muted p-4"
                >
                  <code className="text-sm">{code}</code>
                </pre>
              );
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph
                .split("\n")
                .filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="my-4 list-disc space-y-1 pl-6">
                  {items.map((item, j) => (
                    <li key={j} className="text-muted-foreground">
                      {item.replace("- ", "")}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="my-4 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            );
          })}
        </article>
      </FadeIn>
    </div>
    </>
  );
}
