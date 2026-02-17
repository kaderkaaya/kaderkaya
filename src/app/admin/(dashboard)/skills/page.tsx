import { getSkills } from "@/repositories/skills";
import { SkillsManager } from "@/components/admin/skills-manager";

export default async function AdminSkillsPage() {
  const skills = await getSkills();
  return <SkillsManager initial={skills} />;
}
