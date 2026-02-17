import type { Metadata } from "next";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { getProjects } from "@/repositories/projects";

export const metadata: Metadata = {
  title: "Projects — Kader Kaya",
  description: "A showcase of personal and professional projects.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <FadeIn variant="fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Things I&apos;ve built and worked on.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <FadeIn key={project.id} variant="scale-in" delay={i * 100}>
            <div className="group flex h-full flex-col rounded-lg border border-border/40 p-6 transition-colors hover:border-border">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold">{project.name}</h2>
                {project.featured && (
                  <Badge variant="default" className="shrink-0 text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-4">
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="h-4 w-4" />
                    Source
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
