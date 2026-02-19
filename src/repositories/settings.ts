import type { SiteSettings } from "@/types";
import { apiGet, mapId } from "@/lib/api";

type ApiSettings = SiteSettings & { _id?: string };

export async function getSettings(): Promise<SiteSettings> {
  const data = await apiGet<{ settings: ApiSettings }>("/setting/list");
  const raw = data?.settings;
  if (!raw) {
    return {
      name: "",
      role: "",
      location: "",
      summary: "",
      avatar_url: null,
      email: "",
      github_url: "",
      linkedin_url: "",
      medium_url: "",
    };
  }
  const mapped = mapId(raw as ApiSettings & { _id: string });
  return mapped as SiteSettings;
}
