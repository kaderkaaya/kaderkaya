import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { getPosts } from "@/repositories/posts";

export const metadata: Metadata = {
  title: "Writing — Kader Kaya",
  description:
    "Articles and blog posts on web development and software engineering.",
};

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <FadeIn variant="fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">Writing</h1>
        <p className="mt-2 text-muted-foreground">
          Articles and thoughts on software development.
        </p>
      </FadeIn>

      <div className="mt-12 space-y-6">
        {posts.map((post, i) => (
          <FadeIn key={post.id} variant="fade-in-up" delay={i * 120}>
            <a
              href={post.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-lg border border-border/40 transition-colors hover:border-border sm:flex-row"
            >
              {post.cover_image && (
                <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-56">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                </div>
              )}

              <div className="flex flex-1 items-start justify-between gap-4 p-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold group-hover:text-foreground">
                      {post.title}
                    </h2>
                    {post.featured && (
                      <Badge variant="default" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.published_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <div className="flex gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
