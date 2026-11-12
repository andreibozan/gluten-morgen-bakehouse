import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { products } from "@/components/bakery/data";
import { pairings } from "@/components/bakery/recipes";
import { LegalLinks } from "@/components/bakery/LegalLinks";
import { track } from "@/lib/track";

export const Route = createFileRoute("/retete")({
  head: () => ({
    meta: [
      { title: "Rețete și asocieri cu pâine cu maia | Gluten Morgen Deva" },
      { name: "description", content: "Cu ce se potrivește fiecare pâine Gluten Morgen: 3 rețete simple pentru fiecare sortiment, de la bruschete la burgeri." },
      { property: "og:title", content: "Rețete cu pâine cu maia — Gluten Morgen" },
      { property: "og:description", content: "3 rețete simple pentru fiecare pâine Gluten Morgen și ce să servești alături." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  useEffect(() => track("page_view"), []);
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <Link to="/" className="text-sm text-muted-foreground underline">← Acasă</Link>
        <p className="eyebrow mt-6">Rețete & asocieri</p>
        <h1 className="font-display text-5xl text-primary">Cu ce o mănânci</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Trei idei simple pentru fiecare pâine de la noi și ce merge bine alături.</p>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Sortimente">
          {pairings.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className="rounded-full border border-border px-3 py-1 text-xs text-primary">
              {products.find((x) => x.slug === p.slug)?.name}
            </a>
          ))}
        </nav>
        <div className="mt-10 space-y-14">
          {pairings.map((p) => {
            const prod = products.find((x) => x.slug === p.slug);
            if (!prod) return null;
            return (
              <section key={p.slug} id={p.slug} className="scroll-mt-20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img src={prod.image} alt={prod.name} loading="lazy" className="h-28 w-28 shrink-0 rounded-md object-cover" />
                  <div>
                    <h2 className="font-display text-3xl text-primary">{prod.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground"><strong>Se potrivește cu:</strong> {p.pairing}</p>
                    <Link to="/produs/$slug" params={{ slug: prod.slug }} className="mt-2 inline-block text-sm text-accent underline">Vezi pâinea →</Link>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {p.recipes.map((r) => (
                    <article key={r.title} className="rounded-xl border border-border bg-card p-5">
                      <h3 className="font-display text-xl text-primary">{r.title}</h3>
                      <p className="text-xs text-muted-foreground">{r.time}</p>
                      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm">
                        {r.ingredients.map((i) => <li key={i}>{i}</li>)}
                      </ul>
                      <p className="mt-3 text-sm text-muted-foreground">{r.steps}</p>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <LegalLinks />
    </main>
  );
}
