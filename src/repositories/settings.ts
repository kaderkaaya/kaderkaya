import type { SiteSettings } from "@/types";
import { mockSettings } from "@/mocks/settings";

export async function getSettings(): Promise<SiteSettings> {
  return mockSettings;
}
