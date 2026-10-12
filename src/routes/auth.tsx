import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { STATES } from "@/data/schemes";

const TITLE = "Sign in — Indian Schemes";
const DESC = "Sign in or create your Indian Schemes account with your email and password to save your details.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, state },
          emailRedirectTo: window.location.origin,
        },
      });
      setBusy(false);
      if (error) {
        setError(error.message);
      } else if (!data.session) {
        setCheckEmail(true);
      } else {
        navigate({ to: "/" });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) setError(error.message);
      else navigate({ to: "/" });
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <Logo />
        <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">
          ← Back to schemes
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md rounded-3xl border-2 bg-card p-8 shadow-xl">
          {checkEmail ? (
            <div className="text-center">
              <div className="bg-brand mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl text-primary-foreground">✉</div>
              <h1 className="mt-4 text-2xl font-bold">Check your email</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then sign in.
              </p>
              <button
                onClick={() => {
                  setCheckEmail(false);
                  setMode("signin");
                }}
                className="bg-brand mt-6 w-full rounded-full px-4 py-3 font-bold text-primary-foreground"
              >
                Go to sign in
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === "signin"
                  ? "Sign in with your email and password."
                  : "Sign up once — your details are saved for next time."}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-secondary p-1">
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setError(null);
                    }}
                    className={`rounded-full py-2 text-sm font-bold transition ${
                      mode === m ? "bg-card shadow" : "text-muted-foreground"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                {mode === "signup" && (
                  <>
                    <label className="text-sm font-semibold">
                      Full name
                      <input
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1 w-full rounded-xl border-2 bg-background px-4 py-3 font-normal outline-none focus:border-primary"
                      />
                    </label>
                    <label className="text-sm font-semibold">
                      Your state
                      <select
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="mt-1 w-full rounded-xl border-2 bg-background px-4 py-3 font-normal outline-none focus:border-primary"
                      >
                        <option value="" disabled>
                          Select state
                        </option>
                        {STATES.filter((s) => s !== "All India").map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                  </>
                )}
                <label className="text-sm font-semibold">
                  Email
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border-2 bg-background px-4 py-3 font-normal outline-none focus:border-primary"
                  />
                </label>
                <label className="text-sm font-semibold">
                  Password
                  <input
                    required
                    type="password"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="mt-1 w-full rounded-xl border-2 bg-background px-4 py-3 font-normal outline-none focus:border-primary"
                  />
                </label>

                {error && <p className="rounded-xl bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={busy}
                  className="bg-brand rounded-full px-4 py-3 font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
                >
                  {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
