import type { Experience } from "@/types";
import { mockExperiences } from "@/mocks/experiences";

/**
 * Get all experiences, sorted by order.
 */
export async function getExperiences(): Promise<Experience[]> {
  return [...mockExperiences].sort((a, b) => a.order - b.order);
}

/**
 * Get a single experience by ID.
 */
export async function getExperienceById(
  id: string
): Promise<Experience | null> {
  return mockExperiences.find((e) => e.id === id) ?? null;
}
