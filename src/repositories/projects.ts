import type { Project } from "@/types";
import { mockProjects } from "@/mocks/projects";

/**
 * Get all projects, sorted by order.
 */
export async function getProjects(): Promise<Project[]> {
  return [...mockProjects].sort((a, b) => a.order - b.order);
}

/**
 * Get only featured projects, sorted by order.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  return [...mockProjects]
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get a single project by ID.
 */
export async function getProjectById(id: string): Promise<Project | null> {
  return mockProjects.find((p) => p.id === id) ?? null;
}
