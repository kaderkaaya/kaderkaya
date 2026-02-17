import { getExperiences } from "@/repositories/experiences";
import { ExperienceTable } from "@/components/admin/experience-table";

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();
  return <ExperienceTable initial={experiences} />;
}
