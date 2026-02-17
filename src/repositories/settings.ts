import type { SiteSettings } from "@/types";
import { mockSettings } from "@/mocks/settings";

/**
 * Get site settings (profile info, links, summary).
 * Phase 1: reads from mock data.
 * Phase 2: will call custom backend API.
 */
export async function getSettings(): Promise<SiteSettings> {
  return mockSettings;
}
