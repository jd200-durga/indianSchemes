import { catalogEntry, type CatalogEntry } from "./catalog-entry";
import type { ApplicationGuide } from "./application-guide-types";
import type { Scheme } from "./scheme-types";

type AndhraPradeshRecord = Scheme & {
  channel: string;
  notice: string;
  actions: [string, string, string, string, string];
  sources?: ApplicationGuide["sources"];
};

const records: AndhraPradeshRecord[] = [
  {
    slug: "stree-shakti-andhra-pradesh",
    name: "Stree Shakti Scheme",
    state: "Andhra Pradesh",
    category: "Women",
    benefit: "Free travel on specified APSRTC bus services within Andhra Pradesh",
    summary: "State bus-travel support for eligible girls, women and transgender residents of Andhra Pradesh.",
    eligibility: [
      "Girl, woman or transgender person domiciled in Andhra Pradesh",
      "Carry valid identity proof when travelling",
      "Valid on Pallevelugu, Ultra Pallevelugu, City Ordinary, Metro Express and Express services",
      "Not valid on non-stop, interstate, contract-carriage, chartered services or package tours",
    ],
    documents: ["Valid identity proof; confirm with APSRTC which documents establish AP domicile"],
    applyUrl: "https://apsrtc.ap.gov.in/coverage.php",
    informationOnly: true,
    actionLabel: "How to use free travel",
    channel: "Use the benefit on eligible APSRTC services; no separate online application is listed by APSRTC.",
    notice: "APSRTC lists covered bus types and exclusions. Carry valid identity proof and confirm which proof is accepted for domicile before travel.",
    actions: [
      "Read the APSRTC Stree Shakti coverage information and confirm that you meet the Andhra Pradesh domicile requirement.",
      "Check that your planned bus is Pallevelugu, Ultra Pallevelugu, City Ordinary, Metro Express or Express; excluded services are not covered.",
      "Carry valid identity proof and ask APSRTC staff which document they accept to establish Andhra Pradesh domicile.",
      "At boarding, show the required proof to the conductor and request the Stree Shakti zero-fare ticket for the covered journey.",
      "If the service or eligibility is unclear, confirm with APSRTC before travelling and keep the ticket or complaint reference for follow-up.",
    ],
  },
  {
    slug: "deepam-2-andhra-pradesh",
    name: "Deepam 2.0",
    state: "Andhra Pradesh",
    category: "Energy",
    benefit: "Up to three free LPG refills per eligible household each year, subject to current rules",
    summary: "Andhra Pradesh LPG refill assistance for eligible rice-card households, with an official beneficiary-status checker.",
    eligibility: [
      "Eligible Andhra Pradesh household with a valid Rice Card and LPG consumer record",
      "Beneficiary identification and current scheme conditions apply",
      "The public portal verifies status; it is not a confirmed open application form",
    ],
    documents: ["Rice Card number for the official status check", "LPG consumer details if requesting help from the secretariat or Civil Supplies office"],
    applyUrl: "https://bm-sgsw.ap.gov.in/BM/DeepamStatus",
    informationOnly: true,
    actionLabel: "Check beneficiary status",
    channel: "Check beneficiary status online; contact the village/ward secretariat or Civil Supplies office for corrections or enrollment questions.",
    notice: "The government status page asks for a Rice Card number. It does not establish that new applications are open; confirm current refill rules with Civil Supplies or your LPG distributor.",
    actions: [
      "Open the official Deepam 2.0 status checker and enter the Rice Card number exactly as printed on your current card.",
      "If the household is listed, check the displayed beneficiary information and follow the current refill instructions from Civil Supplies.",
      "If the status is missing or incorrect, take your Rice Card and LPG consumer details to your village/ward secretariat or District Civil Supplies office.",
      "Ask the official receiving staff to verify the household and explain any current correction or enrollment process; the status page is not an application form.",
      "Keep any acknowledgement and confirm refill timing or booking instructions with your LPG distributor before expecting a benefit.",
    ],
    sources: [
      { label: "Deepam 2.0 status checker", url: "https://bm-sgsw.ap.gov.in/BM/DeepamStatus" },
      { label: "Andhra Pradesh Civil Supplies information", url: "https://westgodavari.ap.gov.in/civil-supplies/" },
    ],
  },
  {
    slug: "thalliki-vandanam-andhra-pradesh",
    name: "Thalliki Vandanam",
    state: "Andhra Pradesh",
    category: "Education",
    benefit: "Education assistance reported at ₹15,000 per eligible student for the stated academic year",
    summary: "Andhra Pradesh education support paid to mothers of eligible school and junior-college students; confirm the current year's rules with the school.",
    eligibility: [
      "Mother or guardian of a student enrolled in an eligible school or junior college",
      "Current academic-year eligibility, exclusions and enrollment rules must be confirmed with the school",
      "The reviewed official pages do not provide a complete current public application checklist",
    ],
    documents: ["Ask the school or junior college which student, guardian and bank records are needed for current-year verification"],
    applyUrl: "https://tirupati.ap.gov.in/departments/education/",
    informationOnly: true,
    actionLabel: "Verify with the school",
    channel: "Ask the student's school or junior college to verify the enrollment and beneficiary record; no open public application form was confirmed.",
    notice: "Official district pages report ₹15,000 assistance and school-based delivery, but a complete current-year eligibility and document checklist was not found. Check with the institution before relying on an amount or intake date.",
    actions: [
      "Ask the school headmaster or junior-college principal whether the student is covered under the current Thalliki Vandanam academic-year rules.",
      "Confirm that the student's enrollment and the mother's or guardian's beneficiary details match the institution's official records.",
      "Request the current document checklist from the school; do not rely on an unofficial list or assume that a public web form is open.",
      "If a record needs correction, follow the school or village/ward secretariat's current verification process and keep any acknowledgement provided.",
      "Ask the institution how to check the decision or payment status and where to report an unresolved record mismatch.",
    ],
    sources: [
      { label: "Tirupati School Education Department", url: "https://tirupati.ap.gov.in/departments/education/" },
      { label: "Markapuram Education Department update", url: "https://markapuram.ap.gov.in/education/" },
      { label: "Tirupati Intermediate Education Department", url: "https://tirupati.ap.gov.in/intermediate-education/" },
    ],
  },
  {
    slug: "annadata-sukhibhava-andhra-pradesh",
    name: "Annadata Sukhibhava",
    state: "Andhra Pradesh",
    category: "Agriculture",
    benefit: "Andhra Pradesh farmer income assistance; check the official portal for current payment details",
    summary: "State farmer support linked with PM-KISAN records, with an official Aadhaar-based eligibility and payment-status check.",
    eligibility: [
      "Farmers whose records meet current Andhra Pradesh programme rules",
      "The state portal checks eligibility and payment status using Aadhaar",
      "Current farmer categories, exclusions and new-enrollment rules should be confirmed with Agriculture officials",
    ],
    documents: ["Aadhaar for the official status check", "Ask the local Agriculture office which land, crop or bank records are currently required"],
    applyUrl: "https://annadathasukhibhava.ap.gov.in/",
    informationOnly: true,
    actionLabel: "Check eligibility and payment",
    channel: "Use the official portal for beneficiary status; contact the local Agriculture Department for record corrections and current enrollment instructions.",
    notice: "The portal combines Annadata Sukhibhava and PM-KISAN status. Do not assume the full payment is an additional state amount or that new self-registration is open.",
    actions: [
      "Open the official Annadata Sukhibhava portal and choose its beneficiary eligibility or payment-status check.",
      "Enter the Aadhaar details requested by the portal and review the status shown for your farmer record.",
      "If the record or payment is missing, contact the local Agriculture Department and ask which current farmer category and correction process apply.",
      "Take the reference shown on the portal and any farmer, land or bank records the Agriculture office specifically requests for verification.",
      "Keep the enquiry reference and follow up with the Agriculture office; confirm current benefit amounts and eligibility from official notices.",
    ],
    sources: [
      { label: "Annadata Sukhibhava official portal", url: "https://annadathasukhibhava.ap.gov.in/" },
      { label: "Andhra Pradesh Agriculture Department information", url: "https://konaseema.ap.gov.in/agriculture-department/" },
    ],
  },
  {
    slug: "vidya-mitra-school-kit-andhra-pradesh",
    name: "Dr. Sarvepalli Radhakrishnan Vidya Mitra",
    state: "Andhra Pradesh",
    category: "Education",
    benefit: "School learning kit, including books, notebooks, uniforms and basic school items",
    summary: "State school-kit distribution through participating schools; students do not use a separate public online application.",
    eligibility: [
      "Students included in the current school-kit distribution programme and school records",
      "The reviewed government updates confirm school distribution but do not establish every class or school-type rule",
      "Ask the school whether the student is included in the current year's distribution list",
    ],
    documents: ["No separate application checklist was found; confirm the student's enrollment details with the school"],
    applyUrl: "https://markapuram.ap.gov.in/education/",
    informationOnly: true,
    actionLabel: "Check with the school",
    channel: "Kit distribution is through schools; ask the class teacher or headmaster about the current distribution list and missing items.",
    notice: "Government district updates describe the kit and report distribution for 2025–26. They do not establish a universal online application or complete class-by-class eligibility rules.",
    actions: [
      "Ask the class teacher or headmaster whether the student appears on the school's current Vidya Mitra kit-distribution list.",
      "Confirm the student's name, class and enrollment details in the school record before the distribution period.",
      "Ask the school for the current list of kit items and whether any class or school eligibility conditions apply.",
      "If the kit or an item was not received, report it to the headmaster and request the official correction or follow-up process.",
      "If the issue remains unresolved, ask the school which Mandal Educational Officer or department contact handles distribution complaints and retain the enquiry details.",
    ],
    sources: [
      { label: "Markapuram Education Department update", url: "https://markapuram.ap.gov.in/education/" },
      { label: "Tirupati School Education Department", url: "https://tirupati.ap.gov.in/departments/education/" },
    ],
  },
];

const stepTitles = ["Check eligibility", "Confirm the route", "Prepare details", "Complete the official process", "Keep the reference and follow up"];

export const ANDHRA_PRADESH_ENTRIES: CatalogEntry[] = records.map(({ channel, notice, actions, sources, ...scheme }) =>
  catalogEntry(
    scheme,
    channel,
    notice,
    actions.map((detail, index) => [stepTitles[index] ?? "Follow official instructions", detail]),
    sources,
  ),
);