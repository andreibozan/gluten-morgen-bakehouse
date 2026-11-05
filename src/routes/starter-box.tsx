import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { products } from "@/components/bakery/data";
import { cart } from "@/lib/cart";
import { track } from "@/lib/track";
import { BOX_MAX, BOX_PREFIX, boxDiscount, boxPrice, formatLei } from "@/lib/pricing";

export const Route = createFileRoute("/starter-box")({
  head: () => ({
    meta: [
      { title: "Starter Box — alege 3 pâini cu maia | Gluten Morgen Deva" },
      { name: "description", content: "Alcătuiește-ți Starter Box-ul: 2 produse cu 10% reducere sau 3 produse cu 15% reducere. Pâine cu maia din Deva, livrare gratuită." },
      { property: "og:title", content: "Starter Box Gluten Morgen — până la 15% reducere" },
      { property: "og:description", content: "Alege 2 sau 3 produse din catalog: −10% la 2, −15% la 3. Livrare gratuită." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const catalog = products.filter((p) => !p.preorderOnly);
  const [picks, setPicks] = useState<string[]>([]);
  useEffect(() => track("page_view"), []);
  const chosen = picks.map((s) => catalog.find((p) => p.slug === s)!);
  const full = chosen.reduce((s, p) => s + p.price, 0);
  const price = boxPrice(chosen.map((p) => p.price));
  const toggle = (slug: string) =>
    setPicks((x) => (x.includes(slug) ? x.filter((s) => s !== slug) : x.length < BOX_MAX ? [...x, slug] : x));

  return (
    <main className="min-h-screen bg-background pb-40">
      <div className="container-x py-6"><Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Gluten Morgen</Link></div>
      <section className="container-x max-w-5xl">
        <p className="eyebrow">Starter Box</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Alege-ți cutia de început</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Alege până la 3 produse diferite din catalog. <strong>2 produse: −10%</strong>, <strong>3 produse: −15%</strong>. Livrarea este gratuită.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((p) => {
            const on = picks.includes(p.slug);
            const disabled = !on && picks.length >= BOX_MAX;
            return (
              <button key={p.slug} type="button" disabled={disabled} onClick={() => toggle(p.slug)} aria-pressed={on}
                className={`overflow-hidden rounded-sm border bg-card text-left transition-all disabled:opacity-40 ${on ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary"}`}>
                <img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="flex items-center justify-between gap-3 p-4">
                  <div><p className="font-display text-xl">{p.name}</p><p className="text-sm text-muted-foreground">{p.price} lei · {p.weight}</p></div>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{on ? picks.indexOf(p.slug) + 1 : ""}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="container-x flex max-w-5xl flex-wrap items-center justify-between gap-3 py-4">
          <div className="text-sm">
            <p>{picks.length}/{BOX_MAX} produse alese{picks.length >= 2 && <> · <strong className="text-accent">−{boxDiscount(picks.length)}%</strong></>}</p>
            {picks.length > 0 && <p className="font-display text-2xl text-primary">{picks.length >= 2 && <s className="mr-2 text-base text-muted-foreground">{formatLei(full)}</s>}{formatLei(price)}</p>}
            {picks.length === 1 && <p className="text-xs text-muted-foreground">Mai alege unul pentru −10%.</p>}
          </div>
          <button type="button" disabled={picks.length < 2}
            onClick={() => { cart.add(BOX_PREFIX + [...picks].sort().join(","), 1); track("add_to_cart", "starter-box"); setPicks([]); }}
            className="rounded-full bg-primary px-6 py-3 text-xs font-bold tracking-wide text-primary-foreground uppercase disabled:opacity-50">
            Adaugă cutia în coș
          </button>
        </div>
      </div>
    </main>
  );
}
