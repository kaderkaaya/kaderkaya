import type { Skill } from "@/types";
import { apiGet, mapItems } from "@/lib/api";

type ApiSkill = Skill & { _id?: string };

export async function getSkills(): Promise<Skill[]> {
  const data = await apiGet<{ items: ApiSkill[] }>("/skill/list");
  const items = data?.items ?? [];
  return mapItems(items as (ApiSkill & { _id: string })[]).sort(
    (a, b) => a.order - b.order
  ) as Skill[];
}

export async function getSkillsByCategory(): Promise<Record<string, Skill[]>> {
  const sorted = await getSkills();
  const grouped: Record<string, Skill[]> = {};
  for (const skill of sorted) {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
  }
  return grouped;
}
