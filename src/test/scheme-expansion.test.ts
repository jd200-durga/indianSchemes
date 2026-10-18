import { describe, expect, it } from "vitest";
import { SCHEMES, STATES } from "@/data/schemes";
import { APPLICATION_GUIDES } from "@/data/application-guides";

describe("Expanded scheme catalog", () => {
  it("has no duplicate scheme slugs", () => {
    expect(new Set(SCHEMES.map((scheme) => scheme.slug)).size).toBe(SCHEMES.length);
  });

  it("includes the uploaded Telangana programmes and separate LPG and bus benefits", () => {
    const slugs = SCHEMES.filter((s) => s.state === "Telangana").map((s) => s.slug);
    for (const slug of ["rythu-bharosa-telangana", "crop-loan-waiver-telangana", "rythu-bima-telangana", "indiramma-indlu-telangana", "double-bedroom-housing-telangana", "mahalakshmi-bus-travel-telangana", "mahalakshmi-lpg-telangana", "kalyana-lakshmi-telangana", "arogya-lakshmi-telangana", "mch-kcr-kit-telangana", "kcr-nutrition-kit-telangana", "aasara-cheyutha-pensions-telangana", "rajiv-aarogyasri-telangana", "new-employees-health-scheme-telangana", "rajiv-yuva-vikasam-telangana", "bc-overseas-vidya-nidhi-telangana", "minority-overseas-scholarship-telangana", "vivekananda-overseas-education-telangana", "indiramma-kuttu-machine-telangana"]) {
      expect(slugs).toContain(slug);
    }
  });

  it("covers every Indian state without claiming an exhaustive list of schemes", () => {
    const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
    expect(STATES.filter((s) => s !== "All India").sort()).toEqual(states.sort());
  });

  it("lists the requested five-lakh Rythu Bima coverage with the officially supported entry age", () => {
    const scheme = SCHEMES.find((s) => s.slug === "rythu-bima-telangana");
    expect(scheme?.benefit).toContain("₹5 lakh");
    expect(scheme?.eligibility.join(" ")).toContain("18–59");
  });

  it("lists the requested five-lakh Indiramma housing assistance as subject to sanction", () => {
    const scheme = SCHEMES.find((s) => s.slug === "indiramma-indlu-telangana");
    expect(scheme?.benefit).toContain("₹5 lakh");
    expect(scheme?.eligibility.join(" ")).toContain("sanctioned");
  });

  it("does not offer an application for the unverified sewing-machine claim", () => {
    expect(SCHEMES.find((s) => s.slug === "indiramma-kuttu-machine-telangana")?.informationOnly).toBe(true);
    expect(APPLICATION_GUIDES["indiramma-kuttu-machine-telangana"]?.channel).toContain("no confirmed");
  });

  it("does not offer current applications based solely on historical maternal-kit descriptions", () => {
    expect(SCHEMES.find((s) => s.slug === "mch-kcr-kit-telangana")?.informationOnly).toBe(true);
    expect(SCHEMES.find((s) => s.slug === "kcr-nutrition-kit-telangana")?.informationOnly).toBe(true);
  });
});