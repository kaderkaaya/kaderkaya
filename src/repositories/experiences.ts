import type { Experience } from "@/types";
import { apiGet, mapItems } from "@/lib/api";

type ApiExperience = Experience & { _id?: string };

export async function getExperiences(): Promise<Experience[]> {
  const data = await apiGet<{ items: ApiExperience[] }>("/experience/list");
  const items = data?.items ?? [];
  return mapItems(items as (ApiExperience & { _id: string })[]).sort(
    (a, b) => a.order - b.order
  ) as Experience[];
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  const data = await apiGet<{ item: ApiExperience | null }>("/experience", {
    id,
  });
  const item = data?.item;
  if (!item) return null;
  const mapped = mapItems([item as ApiExperience & { _id: string }])[0];
  return mapped as Experience;
}
