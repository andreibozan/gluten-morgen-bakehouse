import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LegalLinks } from "./LegalLinks";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background pb-28">
      <div className="container-x py-6"><Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Gluten Morgen</Link></div>
      <article className="container-x max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground">
        <h1 className="font-display text-5xl text-foreground">{title}</h1>
        {children}
      </article>
      <div className="container-x mt-16 max-w-3xl border-t border-border pt-6 text-muted-foreground"><LegalLinks /></div>
    </main>
  );
}
