import type { Scheme } from "./scheme-types";
import type { ApplicationGuide } from "./application-guide-types";

export type CatalogEntry = { scheme: Scheme; guide: ApplicationGuide };

export function catalogEntry(
  scheme: Scheme,
  channel: string,
  notice: string,
  steps: [string, string][],
  sources: ApplicationGuide["sources"] = [{ label: "Official scheme information", url: scheme.applyUrl }],
): CatalogEntry {
  return { scheme, guide: { channel, notice, steps: steps.map(([title, detail]) => ({ title, detail })), sources } };
}