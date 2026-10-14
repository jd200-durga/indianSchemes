export type ApplicationStep = {
  title: string;
  detail: string;
};

export type ApplicationGuide = {
  channel: string;
  notice: string;
  steps: ApplicationStep[];
  sources: { label: string; url: string }[];
};