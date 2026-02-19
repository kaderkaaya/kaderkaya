import type { Project } from "@/types";
import { apiGet, mapItems } from "@/lib/api";

type ApiProject = Project & { _id?: string };

export async function getProjects(): Promise<Project[]> {
  const data = await apiGet<{ items: ApiProject[] }>("/project/list");
  const items = data?.items ?? [];
  return mapItems(items as (ApiProject & { _id: string })[]).sort(
    (a, b) => a.order - b.order
  ) as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const data = await apiGet<{ item: ApiProject | null }>("/project", { id });
  const item = data?.item;
  if (!item) return null;
  const mapped = mapItems([item as ApiProject & { _id: string }])[0];
  return mapped as Project;
}
