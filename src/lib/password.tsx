export const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "First letter must be a capital (A–Z)", test: (p: string) => /^[A-Z]/.test(p) },
  { label: "At least 1 number (0–9)", test: (p: string) => /\d/.test(p) },
  { label: "At least 2 special characters like @ _ . # $ !", test: (p: string) => (p.match(/[^A-Za-z0-9]/g) || []).length >= 2 },
];

export const passwordValid = (p: string) => PASSWORD_RULES.every((r) => r.test(p));

export function PasswordChecklist({ password }: { password: string }) {
  return (
    <ul className="mt-2 space-y-1 text-xs font-normal">
      {PASSWORD_RULES.map((r) => {
        const ok = r.test(password);
        return (
          <li key={r.label} className={ok ? "text-leaf font-semibold" : "text-muted-foreground"}>
            {ok ? "✔" : "○"} {r.label}
          </li>
        );
      })}
    </ul>
  );
}
