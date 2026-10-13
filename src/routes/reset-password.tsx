import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { PasswordChecklist, passwordValid } from "@/lib/password";

const TITLE = "Set a new password — Indian Schemes";
const DESC = "Choose a new password for your Indian Schemes account.";

export const Route = createFileRoute("/reset-password")({
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
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!passwordValid(password)) return setError("Password does not meet all the rules.");
    if (password !== confirm) return setError("Passwords do not match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) setError(error.message);
    else {
      setDone(true);
      setTimeout(() => navigate({ to: "/" }), 1500);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <Logo />
        <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-primary">← Back to schemes</Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md rounded-3xl border-2 bg-card p-8 shadow-xl">
          <h1 className="text-3xl font-extrabold">Set a new password</h1>
          {done ? (
            <p className="mt-4 font-semibold text-leaf">Password updated! Taking you home…</p>
          ) : (
            <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
              <label className="text-sm font-semibold">
                New password
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 bg-background px-4 py-3 font-normal outline-none focus:border-primary" />
                <PasswordChecklist password={password} />
              </label>
              <label className="text-sm font-semibold">
                Confirm password
                <input required type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 bg-background px-4 py-3 font-normal outline-none focus:border-primary" />
              </label>
              {error && <p className="rounded-xl bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive">{error}</p>}
              <button type="submit" disabled={busy} className="bg-brand rounded-full px-4 py-3 font-bold text-primary-foreground disabled:opacity-60">
                {busy ? "Please wait…" : "Save new password"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
