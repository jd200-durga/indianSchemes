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

  it("includes Andhra Pradesh state programmes with clear non-application actions and official guides", () => {
    const apSchemes = SCHEMES.filter((scheme) => scheme.state === "Andhra Pradesh");
    for (const slug of [
      "ntr-bharosa-pension-ap",
      "stree-shakti-andhra-pradesh",
      "deepam-2-andhra-pradesh",
      "thalliki-vandanam-andhra-pradesh",
      "annadata-sukhibhava-andhra-pradesh",
      "vidya-mitra-school-kit-andhra-pradesh",
    ]) {
      const scheme = apSchemes.find((entry) => entry.slug === slug);
      expect(scheme, slug).toBeDefined();
      expect(APPLICATION_GUIDES[slug]?.steps.length).toBeGreaterThanOrEqual(5);
    }
    for (const slug of [
      "stree-shakti-andhra-pradesh",
      "deepam-2-andhra-pradesh",
      "thalliki-vandanam-andhra-pradesh",
      "annadata-sukhibhava-andhra-pradesh",
      "vidya-mitra-school-kit-andhra-pradesh",
    ]) {
      const scheme = apSchemes.find((entry) => entry.slug === slug);
      expect(scheme?.informationOnly).toBe(true);
      expect(scheme?.actionLabel).toBeTruthy();
    }
  });

  it("includes additional Tamil Nadu state schemes with their official application guidance", () => {
    const tamilNaduSchemes = SCHEMES.filter((scheme) => scheme.state === "Tamil Nadu");
    const slugs = [
      "kalaignar-magalir-urimai-tn",
      "pudhumai-penn-tamil-nadu",
      "tamil-pudhalvan-tamil-nadu",
      "tamil-nadu-girl-child-protection",
      "tamil-nadu-social-security-pensions",
      "chief-minister-uzhavar-pathukappu-tamil-nadu",
      "vidiyal-payanam-tamil-nadu",
    ];
    for (const slug of slugs) {
      expect(tamilNaduSchemes.find((scheme) => scheme.slug === slug), slug).toBeDefined();
      expect(APPLICATION_GUIDES[slug]?.steps.length).toBeGreaterThanOrEqual(5);
    }
    expect(tamilNaduSchemes.find((scheme) => scheme.slug === "pudhumai-penn-tamil-nadu")?.benefit).toContain("₹1,000 per month");
    expect(tamilNaduSchemes.find((scheme) => scheme.slug === "tamil-pudhalvan-tamil-nadu")?.benefit).toContain("₹1,000 per month");
    for (const slug of ["tamil-nadu-girl-child-protection", "tamil-nadu-social-security-pensions", "chief-minister-uzhavar-pathukappu-tamil-nadu", "vidiyal-payanam-tamil-nadu"]) {
      expect(tamilNaduSchemes.find((scheme) => scheme.slug === slug)?.informationOnly).toBe(true);
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