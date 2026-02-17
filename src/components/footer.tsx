import { getSettings } from "@/repositories/settings";
import { Github, Linkedin, BookOpen } from "lucide-react";

export async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {settings.name}. All rights
          reserved.
        </p>

        <div className="flex items-center gap-4">
          {settings.github_url && (
            <a
              href={settings.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {settings.linkedin_url && (
            <a
              href={settings.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {settings.medium_url && (
            <a
              href={settings.medium_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Medium"
            >
              <BookOpen className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
