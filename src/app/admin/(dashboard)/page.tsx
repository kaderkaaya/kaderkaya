import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FolderKanban, PenLine, BookOpen, Sparkles } from "lucide-react";
import { getExperiences } from "@/repositories/experiences";
import { getProjects } from "@/repositories/projects";
import { getPosts } from "@/repositories/posts";
import { getBlogs } from "@/repositories/blogs";
import { getSkills } from "@/repositories/skills";

export default async function AdminDashboard() {
  const [experiences, projects, posts, blogs, skills] = await Promise.all([
    getExperiences(),
    getProjects(),
    getPosts(),
    getBlogs(),
    getSkills(),
  ]);

  const stats = [
    {
      label: "Experience",
      value: experiences.length,
      icon: Briefcase,
    },
    {
      label: "Projects",
      value: projects.length,
      icon: FolderKanban,
    },
    {
      label: "Writing",
      value: posts.length,
      icon: PenLine,
    },
    {
      label: "Blog Posts",
      value: blogs.length,
      icon: BookOpen,
    },
    {
      label: "Skills",
      value: skills.length,
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your portfolio content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
