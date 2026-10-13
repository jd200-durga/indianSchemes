import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", label: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", label: "Assamese", native: "অসমীয়া" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "ne", label: "Nepali", native: "नेपाली" },
  { code: "sa", label: "Sanskrit", native: "संस्कृतम्" },
  { code: "kok", label: "Konkani", native: "कोंकणी" },
  { code: "mai", label: "Maithili", native: "मैथिली" },
  { code: "sd", label: "Sindhi", native: "سنڌي" },
];

const KEY = "is_lang";
const ASKED = "is_lang_asked";

function getCurrent(): string {
  const m = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return m ? m[1] : "en";
}

function applyLanguage(code: string) {
  const host = window.location.hostname;
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `googtrans=; ${expire}; path=/`;
  document.cookie = `googtrans=; ${expire}; path=/; domain=${host}`;
  document.cookie = `googtrans=; ${expire}; path=/; domain=.${host}`;
  if (code !== "en") {
    document.cookie = `googtrans=/en/${code}; path=/`;
    document.cookie = `googtrans=/en/${code}; path=/; domain=${host}`;
  }
  localStorage.setItem(KEY, code);
  window.location.reload();
}

function loadGoogleTranslate() {
  if (document.getElementById("gt-script")) return;
  const w = window as unknown as Record<string, unknown>;
  w.googleTranslateElementInit = () => {
    const g = (w.google as { translate: { TranslateElement: new (o: object, id: string) => void } });
    new g.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "gt-element");
  };
  const s = document.createElement("script");
  s.id = "gt-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

export function LanguageSwitcher() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");

  useEffect(() => {
    setCurrent(getCurrent());
    loadGoogleTranslate();
  }, []);

  // Ask once right after a user signs in
  useEffect(() => {
    if (user && !localStorage.getItem(ASKED)) {
      localStorage.setItem(ASKED, "1");
      setOpen(true);
    }
  }, [user]);

  const cur = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  return (
    <>
      <div id="gt-element" className="hidden" />
      <button
        onClick={() => setOpen(true)}
        aria-label="Choose language"
        className="notranslate bg-brand fixed bottom-5 right-5 z-50 flex h-16 w-16 flex-col items-center justify-center rounded-full text-primary-foreground shadow-2xl ring-4 ring-background transition hover:scale-110"
      >
        <span className="text-xl leading-none">अ</span>
        <span className="text-[10px] font-bold uppercase">{cur.code}</span>
      </button>

      {open && (
        <div className="notranslate fixed inset-0 z-[60] flex items-center justify-center bg-foreground/50 p-4" onClick={() => setOpen(false)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-auto rounded-3xl bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-extrabold">Choose your language</h2>
            <p className="mt-1 text-sm text-muted-foreground">The whole website will be shown in the language you pick.</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => applyLanguage(l.code)}
                  className={`rounded-full border-2 px-3 py-2 text-center transition hover:border-primary ${l.code === current ? "border-primary bg-primary text-primary-foreground" : "bg-background"}`}
                >
                  <div className="font-bold">{l.native}</div>
                  <div className="text-xs opacity-80">{l.label}</div>
                </button>
              ))}
            </div>
            <button onClick={() => setOpen(false)} className="mt-5 w-full rounded-full border-2 py-2 font-bold">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
