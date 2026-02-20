import type { Metadata } from "next";
import { Mail, Github, Linkedin, BookOpen, MapPin } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { getSettings } from "@/repositories/settings";
import { SITE_URL } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/contact`;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kader Kaya. Email, GitHub, LinkedIn, and Medium.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: "Contact",
    description: "Get in touch with Kader Kaya. Email, GitHub, LinkedIn, and Medium.",
    url: PAGE_URL,
  },
  twitter: {
    card: "summary",
    title: "Contact",
    description: "Get in touch with Kader Kaya. Email, GitHub, LinkedIn, and Medium.",
  },
};

export default async function ContactPage() {
  const settings = await getSettings();

  const links = [
    {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: Github,
      label: "GitHub",
      value: settings.github_url.replace("https://github.com/", ""),
      href: settings.github_url,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: settings.linkedin_url.replace("https://linkedin.com/in/", ""),
      href: settings.linkedin_url,
    },
    {
      icon: BookOpen,
      label: "Medium",
      value: settings.medium_url.replace("https://medium.com/", ""),
      href: settings.medium_url,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <FadeIn variant="fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Feel free to reach out. I&apos;d love to hear from you.
        </p>
      </FadeIn>

      <div className="mt-12 space-y-6">
        <FadeIn variant="fade-in-left" delay={100}>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>{settings.location}</span>
          </div>
        </FadeIn>

        {links.map((link, i) => (
          <FadeIn key={link.label} variant="fade-in-left" delay={180 + i * 80}>
            <a
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel={link.label === "Email" ? undefined : "noopener noreferrer"}
              className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <link.icon className="h-5 w-5" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
                  {link.label}
                </p>
                <p className="text-sm">{link.value}</p>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
