import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { getBlogs, getBlogBySlug } from "@/repositories/blogs";
import { SITE_URL } from "@/lib/site";
import { getReadingTimeMinutes } from "@/lib/reading-time";
import type { BlogPost } from "@/types";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-10 text-2xl font-bold tracking-tight first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-8 border-b border-border pb-2 text-xl font-semibold tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-6 text-lg font-semibold">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-1.5 pl-6 text-foreground/90">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 text-foreground/90">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-5 overflow-x-auto rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm">
      {children}
    </pre>
  ),
  code: ({ className, children }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="rounded bg-muted/70 px-1.5 py-0.5 font-mono text-sm">
          {children}
        </code>
      );
    }
    return <code className="font-mono text-sm">{children}</code>;
  },
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  table: ({ children }) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[400px] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border bg-muted/50">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-foreground">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-foreground/90">{children}</td>
  ),
};

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
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {new Date(blog.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-sm text-muted-foreground">
              {getReadingTimeMinutes(blog.content)} min
            </span>
          </div>
          <div className="flex gap-1.5 mt-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
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
        <article className="blog-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {blog.content}
          </ReactMarkdown>
        </article>
      </FadeIn>
    </div>
    </>
  );
}
