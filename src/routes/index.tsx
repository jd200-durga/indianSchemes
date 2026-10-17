import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Logo } from "@/components/Logo";
import { SCHEMES, STATES, CATEGORIES } from "@/data/schemes";
import { useAuth } from "@/hooks/useAuth";

const TITLE = "Indian Schemes — State & Central Government Schemes, Eligibility & Apply Links";
const DESC =
  "Find government schemes from every Indian state for farmers, women, students, health and housing. Check eligibility and apply on the official government website.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "government schemes India, state schemes, PM Kisan, Ladki Bahin, Ayushman Bharat, scheme eligibility, apply online" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Indian Government Schemes",
          itemListElement: SCHEMES.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `/schemes/${s.slug}` })),
        }),
      },
    ],
  }),
  component: Index,
});

const CAT_COLOR: Record<string, string> = {
  Agriculture: "bg-leaf", Health: "bg-teal", Women: "bg-magenta", Education: "bg-saffron",
  Housing: "bg-teal", Pension: "bg-saffron", Business: "bg-magenta", Energy: "bg-leaf",
};

function Index() {
  const { user, profile, signOut } = useAuth();
  const [q, setQ] = useState("");
  const [state, setState] = useState("All");
  const [cat, setCat] = useState("All");

  const list = useMemo(() => {
    const t = q.toLowerCase().trim();
    return SCHEMES.filter(
      (s) =>
        (state === "All" || s.state === state || s.state === "All India") &&
        (cat === "All" || s.category === cat) &&
        (!t || `${s.name} ${s.summary} ${s.state} ${s.category}`.toLowerCase().includes(t)),
    );
  }, [q, state, cat]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Logo />
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden max-w-40 truncate text-sm font-semibold sm:block">
                Namaste, {profile?.full_name || user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="rounded-full border-2 border-foreground px-4 py-1.5 text-sm font-bold hover:bg-foreground hover:text-background"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/auth" className="bg-brand-live rounded-full px-5 py-2 text-sm font-bold text-primary-foreground">
              Sign in
            </Link>
          )}
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-6">
          <div className="bg-brand rounded-[2rem] px-6 py-12 text-primary-foreground sm:px-12 sm:py-16">
            <p className="font-semibold uppercase tracking-widest opacity-90">For every citizen</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
              Government schemes made for you — find, check & apply.
            </h1>
            <p className="mt-4 max-w-2xl text-lg opacity-95">
              Browse state and central schemes, see who's eligible, and go straight to the official portal to apply.
            </p>
            <label className="mt-8 block max-w-xl">
              <span className="sr-only">Search schemes</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search: farmer, women, scholarship, health…"
                className="w-full rounded-full bg-card px-6 py-4 text-lg text-foreground shadow-xl outline-none ring-4 ring-transparent focus:ring-sun"
              />
            </label>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4" aria-label="Filters">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 font-semibold">
              State
              <select value={state} onChange={(e) => setState(e.target.value)} className="rounded-full border-2 bg-card px-4 py-2 font-normal">
                <option value="All">All states</option>
                {STATES.filter((s) => s !== "All India").map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <div className="flex flex-wrap gap-2">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{list.length} schemes found {state !== "All" && `for ${state} (incl. all-India schemes)`}</p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <article key={s.slug} className="flex flex-col rounded-2xl border-2 bg-card p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className={`${CAT_COLOR[s.category]} rounded-full px-3 py-1 text-primary-foreground`}>{s.category}</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{s.state}</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold leading-tight">{s.name}</h2>
              <p className="mt-1 font-semibold text-primary">{s.benefit}</p>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.summary}</p>
              <div className="mt-4 flex gap-2">
                <Link to="/schemes/$slug" params={{ slug: s.slug }} className="flex-1 rounded-full border-2 border-foreground px-4 py-2 text-center text-sm font-bold hover:bg-foreground hover:text-background">
                  Eligibility
                </Link>
                <a href={s.applyUrl} target="_blank" rel="noopener noreferrer" className="bg-brand flex-1 rounded-full px-4 py-2 text-center text-sm font-bold text-primary-foreground">
                  {s.informationOnly ? "Official info ↗" : "Apply ↗"}
                </a>
              </div>
            </article>
          ))}
          {list.length === 0 && <p className="col-span-full py-12 text-center text-muted-foreground">No schemes match. Try another search.</p>}
        </section>
      </main>

      <footer className="mt-10 border-t py-8 text-center text-sm text-muted-foreground">
        Information is for guidance. Always confirm eligibility on the official government portal.
      </footer>
    </div>
  );
}
