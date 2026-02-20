import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";
import { getSkillsByCategory } from "@/repositories/skills";
import { SITE_URL } from "@/lib/site";
import {
  FileCode2,
  FileJson,
  Server,
  Route,
  Plug,
  Boxes,
  Layers,
  Database,
  Zap,
  Container,
  GitBranch,
  Cloud,
  RefreshCw,
  FileText,
  CheckCircle,
  Kanban,
  type LucideIcon,
} from "lucide-react";

const PAGE_URL = `${SITE_URL}/skills`;

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills and competencies of Kader Kaya. Technologies and tools.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: "Skills",
    description: "Technical skills and competencies of Kader Kaya. Technologies and tools.",
    url: PAGE_URL,
  },
  twitter: {
    card: "summary",
    title: "Skills",
    description: "Technical skills and competencies of Kader Kaya. Technologies and tools.",
  },
};

const iconMap: Record<string, LucideIcon> = {
  "file-code-2": FileCode2,
  "file-json": FileJson,
  server: Server,
  route: Route,
  plug: Plug,
  boxes: Boxes,
  layers: Layers,
  database: Database,
  zap: Zap,
  container: Container,
  "git-branch": GitBranch,
  cloud: Cloud,
  "refresh-cw": RefreshCw,
  "file-text": FileText,
  "check-circle": CheckCircle,
  kanban: Kanban,
};

export default async function SkillsPage() {
  const skillsByCategory = await getSkillsByCategory();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <FadeIn variant="fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
        <p className="mt-2 text-muted-foreground">
          Technologies and tools I work with.
        </p>
      </FadeIn>

      <div className="mt-12 space-y-12">
        {Object.entries(skillsByCategory).map(([category, skills], catIdx) => (
          <FadeIn key={category} variant="fade-in-up" delay={catIdx * 100}>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {category}
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {skills.map((skill, i) => {
                  const Icon = iconMap[skill.icon];
                  return (
                    <FadeIn
                      key={skill.id}
                      variant="scale-in"
                      delay={catIdx * 100 + i * 60}
                    >
                      <div className="flex items-center gap-3 rounded-lg border border-border/40 px-4 py-3 transition-colors hover:border-border hover:bg-accent/50">
                        {Icon && (
                          <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
