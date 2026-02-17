import { getSettings } from "@/repositories/settings";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return <SettingsForm initial={settings} />;
}
