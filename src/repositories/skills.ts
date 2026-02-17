import type { Skill } from "@/types";
import { mockSkills } from "@/mocks/skills";

/**
 * Get all skills, sorted by order.
 */
export async function getSkills(): Promise<Skill[]> {
  return [...mockSkills].sort((a, b) => a.order - b.order);
}

/**
 * Get skills grouped by category.
 */
export async function getSkillsByCategory(): Promise<
  Record<string, Skill[]>
> {
  const sorted = [...mockSkills].sort((a, b) => a.order - b.order);
  const grouped: Record<string, Skill[]> = {};

  for (const skill of sorted) {
    if (!grouped[skill.category]) {
      grouped[skill.category] = [];
    }
    grouped[skill.category].push(skill);
  }

  return grouped;
}
