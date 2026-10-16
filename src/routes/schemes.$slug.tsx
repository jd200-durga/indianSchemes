import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { SCHEMES } from "@/data/schemes";
import { APPLICATION_GUIDES } from "@/data/application-guides";
import { ApplicationGuide } from "@/components/ApplicationGuide";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/schemes/$slug")({
  loader: ({ params }) => {
    const scheme = SCHEMES.find((s) => s.slug === params.slug);
    if (!scheme) throw notFound();
    return { scheme };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Scheme not found — Indian Schemes" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.scheme;
    const title = `${s.name} (${s.state}) — Eligibility & Apply | Indian Schemes`;
    const desc = `${s.name}: ${s.benefit}. Check eligibility, required documents and step-by-step application guidance for the official service.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/schemes/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/schemes/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GovernmentService",
            name: s.name,
            description: s.summary,
            areaServed: s.state === "All India" ? "India" : `${s.state}, India`,
            url: s.applyUrl,
          }),
        },
      ],
    };
  },
  component: SchemePage,
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Scheme not found</h1>
      <Link to="/" className="mt-4 inline-block font-bold text-primary">← All schemes</Link>
    </div>
  ),
});

function SchemePage() {
  const { scheme: s } = Route.useLoaderData();
  const guide = APPLICATION_GUIDES[s.slug];
  return (
    <div className="min-h-screen">
      <header className="mx-auto max-w-4xl px-4 py-5"><Logo /></header>
      <main className="mx-auto max-w-4xl px-4 pb-16">
        <Link to="/" className="text-sm font-bold text-primary">← All schemes</Link>
        <div className="bg-brand mt-4 rounded-[2rem] p-8 text-primary-foreground sm:p-12">
          <p className="font-semibold opacity-90">{s.state} · {s.category}</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">{s.name}</h1>
          <p className="mt-3 text-xl font-semibold">{s.benefit}</p>
          <p className="mt-3 max-w-2xl opacity-95">{s.summary}</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <section className="rounded-2xl border-2 bg-card p-6">
            <h2 className="text-2xl font-bold">Who is eligible?</h2>
            <ul className="mt-3 space-y-2">
              {s.eligibility.map((e) => <li key={e} className="flex gap-2"><span className="text-leaf">✔</span>{e}</li>)}
            </ul>
          </section>
          <section className="rounded-2xl border-2 bg-card p-6">
            <h2 className="text-2xl font-bold">Documents needed</h2>
            <ul className="mt-3 space-y-2">
              {s.documents.map((d) => <li key={d} className="flex gap-2"><span className="text-saffron">●</span>{d}</li>)}
            </ul>
          </section>
        </div>

        {guide && <ApplicationGuide guide={guide} />}

        <Button asChild className="bg-brand mt-8 h-auto w-full whitespace-normal rounded-full px-6 py-4 text-center text-lg font-extrabold text-primary-foreground shadow-xl">
          <a href={s.applyUrl} target="_blank" rel="noopener noreferrer">
            Apply on official website ↗
          </a>
        </Button>
        <p className="mt-3 text-center text-sm text-muted-foreground">Opens {new URL(s.applyUrl).hostname}. Rules may change — confirm on the official portal.</p>
      </main>
    </div>
  );
}
