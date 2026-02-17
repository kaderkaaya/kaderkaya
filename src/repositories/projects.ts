import type { Project } from "@/types";
import { mockProjects } from "@/mocks/projects";

export async function getProjects(): Promise<Project[]> {
  return [...mockProjects].sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return [...mockProjects]
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

export async function getProjectById(id: string): Promise<Project | null> {
  return mockProjects.find((p) => p.id === id) ?? null;
}
