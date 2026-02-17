import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { getSettings } from "@/repositories/settings";
import { getExperiences } from "@/repositories/experiences";
import { getFeaturedProjects } from "@/repositories/projects";
import { getFeaturedPosts } from "@/repositories/posts";

export default async function HomePage() {
  const [settings, experiences, featuredProjects, featuredPosts] =
    await Promise.all([
      getSettings(),
      getExperiences(),
      getFeaturedProjects(),
      getFeaturedPosts(),
    ]);

  const latestExperience = experiences[0];

  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="py-20 sm:py-28">
        <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="flex-1">
            <FadeIn variant="fade-in-up" delay={0}>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                {settings.location}
              </p>
            </FadeIn>
            <FadeIn variant="fade-in-up" delay={80}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {settings.name}
              </h1>
            </FadeIn>
            <FadeIn variant="fade-in-up" delay={160}>
              <p className="mt-2 text-xl text-muted-foreground">
                {settings.role}
              </p>
            </FadeIn>
            <FadeIn variant="fade-in-up" delay={240}>
              <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
                {settings.summary}
              </p>
            </FadeIn>
            <FadeIn variant="fade-in-up" delay={320}>
              <div className="mt-8 flex gap-3">
                <Button asChild>
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/projects">View Projects</Link>
                </Button>
              </div>
            </FadeIn>
          </div>

          {settings.avatar_url && (
            <FadeIn variant="scale-in" delay={200}>
              <div className="shrink-0">
                <Image
                  src={settings.avatar_url}
                  alt={settings.name}
                  width={160}
                  height={160}
                  className="rounded-full border-2 border-border/40 object-cover shadow-md"
                  priority
                />
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {latestExperience && (
        <FadeIn variant="fade-in-up">
          <section className="border-t border-border/40 py-16">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Latest Experience
              </h2>
              <Link
                href="/experience"
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                All Experience
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">
                {latestExperience.title}
              </h3>
              <p className="text-muted-foreground">
                {latestExperience.company}{" "}
                <span className="text-muted-foreground/60">
                  · {latestExperience.start_date} —{" "}
                  {latestExperience.is_current
                    ? "Present"
                    : latestExperience.end_date}
                </span>
              </p>
            </div>
          </section>
        </FadeIn>
      )}

      {featuredProjects.length > 0 && (
        <FadeIn variant="fade-in-up">
          <section className="border-t border-border/40 py-16">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Featured Projects
              </h2>
              <Link
                href="/projects"
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                All Projects
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {featuredProjects.map((project, i) => (
                <FadeIn key={project.id} variant="fade-in-up" delay={i * 100}>
                  <div className="group rounded-lg border border-border/40 p-6 transition-colors hover:border-border">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
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
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {featuredPosts.length > 0 && (
        <FadeIn variant="fade-in-up">
          <section className="border-t border-border/40 py-16">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Writing
              </h2>
              <Link
                href="/writing"
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                All Articles
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-8 space-y-4">
              {featuredPosts.map((post, i) => (
                <FadeIn key={post.id} variant="fade-in-up" delay={i * 100}>
                  <a
                    href={post.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 rounded-lg border border-border/40 p-5 transition-colors hover:border-border"
                  >
                    <div>
                      <h3 className="font-medium group-hover:text-foreground">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>
      )}
    </div>
  );
}
