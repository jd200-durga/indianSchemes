export type Scheme = {
  slug: string;
  name: string;
  state: string;
  category: "Agriculture" | "Health" | "Women" | "Education" | "Housing" | "Pension" | "Business" | "Energy";
  benefit: string;
  summary: string;
  eligibility: string[];
  documents: string[];
  applyUrl: string;
  informationOnly?: boolean;
  actionLabel?: string;
};