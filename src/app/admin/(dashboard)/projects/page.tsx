import { getProjects } from "@/repositories/projects";
import { ProjectsTable } from "@/components/admin/projects-table";

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return <ProjectsTable initial={projects} />;
}
