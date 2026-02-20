import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { getExperiences } from "@/repositories/experiences";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/experience`;

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional work experience and career history of Kader Kaya.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: "Experience",
    description: "Professional work experience and career history of Kader Kaya.",
    url: PAGE_URL,
  },
  twitter: {
    card: "summary",
    title: "Experience",
    description: "Professional work experience and career history of Kader Kaya.",
  },
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <FadeIn variant="fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        <p className="mt-2 text-muted-foreground">
          My professional journey so far.
        </p>
      </FadeIn>

      <div className="mt-12 space-y-12">
        {experiences.map((exp, i) => (
          <FadeIn key={exp.id} variant="fade-in-left" delay={i * 120}>
            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-foreground after:absolute after:left-[3px] after:top-4 after:h-full after:w-px after:bg-border last:after:hidden">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                <h2 className="text-lg font-semibold">{exp.title}</h2>
                <span className="text-muted-foreground">
                  at {exp.company}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>
                  {exp.start_date} —{" "}
                  {exp.is_current ? "Present" : exp.end_date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {exp.location}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-sm leading-relaxed text-muted-foreground before:mr-2 before:content-['–']"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
