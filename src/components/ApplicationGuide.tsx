import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApplicationGuide as Guide } from "@/data/application-guide-types";

export function ApplicationGuide({ guide }: { guide: Guide }) {
  return (
    <section aria-labelledby="application-heading" className="mt-10 border-t pt-8">
      <h2 id="application-heading" className="text-3xl font-bold">How to apply — step by step</h2>
      <p className="mt-3 flex items-start gap-2 font-semibold text-primary">
        <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        {guide.channel}
      </p>
      <p className="mt-3 border-l-4 border-saffron bg-secondary px-4 py-3 text-sm leading-relaxed">
        {guide.notice}
      </p>
      <ol className="mt-6 divide-y">
        {guide.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4 py-5 first:pt-0">
            <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              {index + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-xl font-bold leading-snug">{step.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-sm text-muted-foreground">
        Never share your password or OTP with an agent. Enter OTPs yourself on the official portal. Save your application receipt; submitting a form does not guarantee approval.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-sm font-semibold">Official guidance:</span>
        {guide.sources.map((source) => (
          <Button key={source.url} variant="link" asChild className="h-auto max-w-full justify-start whitespace-normal p-0 text-left">
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.label}<ExternalLink aria-hidden="true" />
            </a>
          </Button>
        ))}
      </div>
    </section>
  );
}