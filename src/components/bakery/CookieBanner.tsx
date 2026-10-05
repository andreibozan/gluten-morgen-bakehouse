import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export const CONSENT_KEY = "gm_cookie_consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(!localStorage.getItem(CONSENT_KEY)), []);
  if (!show) return null;
  const choose = (v: "all" | "necessary") => {
    localStorage.setItem(CONSENT_KEY, v);
    setShow(false);
  };
  return (
    <div className="fixed inset-x-3 bottom-20 z-[60] mx-auto max-w-xl rounded-sm border border-border bg-card p-4 text-sm shadow-lg md:bottom-6">
      <p className="text-muted-foreground">
        Folosim stocare locală pentru coș și, cu acordul tău, statistici anonime. <Link to="/cookies" className="underline">Detalii</Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => choose("all")} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground uppercase">Accept</button>
        <button onClick={() => choose("necessary")} className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase">Doar necesare</button>
      </div>
    </div>
  );
}
