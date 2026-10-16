import { describe, expect, it } from "vitest";
import { SCHEMES } from "@/data/schemes";
import { APPLICATION_GUIDES } from "@/data/application-guides";

describe("Scheme application guidance", () => {
  it("provides detailed steps and official sources for every listed scheme", () => {
    expect(Object.keys(APPLICATION_GUIDES).sort()).toEqual(SCHEMES.map((scheme) => scheme.slug).sort());
    for (const scheme of SCHEMES) {
      const guide = APPLICATION_GUIDES[scheme.slug];
      expect(guide, scheme.name).toBeDefined();
      if (!guide) throw new Error(`Missing guide for ${scheme.name}`);
      expect(guide.steps.length).toBeGreaterThanOrEqual(5);
      expect(guide.channel.length).toBeGreaterThan(20);
      expect(guide.notice.length).toBeGreaterThan(40);
      expect(guide.sources.length).toBeGreaterThan(0);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(5);
        expect(step.detail.length).toBeGreaterThan(80);
      }
      for (const source of guide.sources) {
        expect(new URL(source.url).protocol).toBe("https:");
      }
    }
  });

  it("identifies assisted registration rather than suggesting self-service for institutional schemes", () => {
    expect(APPLICATION_GUIDES["pm-vishwakarma"]?.channel).toContain("CSC");
    expect(APPLICATION_GUIDES["kanyashree-west-bengal"]?.channel).toContain("institution");
    expect(APPLICATION_GUIDES["ntr-bharosa-pension-ap"]?.channel).toContain("secretariat");
    expect(APPLICATION_GUIDES["pm-mudra-yojana"]?.notice).toContain("not a direct loan");
  });
});