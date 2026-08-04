import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { track } from "@/lib/track";
import { products, contact } from "@/components/bakery/data";

export const Route = createFileRoute("/produs/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Produs indisponibil — Gluten Morgen" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const title = `${p.name} — Gluten Morgen`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/produs/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/produs/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "RON",
              availability:
                p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const related = products.filter((r) => r.slug !== p.slug).slice(0, 3);

  useEffect(() => {
    track("product_view", p.slug);
  }, [p.slug]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link to="/" className="font-display text-xl text-primary">
            Gluten Morgen
          </Link>
          <Link to="/" hash="produse" className="text-sm text-foreground/70 hover:text-primary">
            ← Toate produsele
          </Link>
        </div>
      </header>

      <main className="container-x py-12 md:py-20">
        <nav aria-label="Breadcrumb" className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          <Link to="/" className="hover:text-primary">
            Acasă
          </Link>
          <span className="px-2">/</span>
          <span className="text-primary">{p.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <img
              src={p.image}
              alt={p.name}
              width={900}
              height={900}
              className="aspect-square w-full rounded-sm object-cover shadow-[var(--shadow-lift)]"
            />
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">{p.freshToday ? "Coaptă astăzi" : "Revine în curând"}</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">
              {p.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-foreground/75">{p.long}</p>

            <p className="mt-6 font-display text-4xl text-primary">{p.price} lei</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.stock > 0 ? `În stoc acum: ${p.stock} bucăți` : "Stoc epuizat pentru astăzi"}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/comanda"
                search={{ produs: p.slug }}
                onClick={() => track("order_click", p.slug)}
                className="rounded-full bg-primary px-8 py-4 text-center text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {p.stock > 0 ? "Comandă online" : "Precomandă"}
              </Link>
              <a
                href={contact.whatsapp}
                onClick={() => track("whatsapp_click", p.slug)}
                className="rounded-full border border-border px-8 py-4 text-center text-sm font-bold text-primary transition-colors hover:bg-secondary"
              >
                WhatsApp
              </a>
              <a
                href={contact.phoneHref}
                onClick={() => track("phone_click", p.slug)}
                className="rounded-full border border-border px-8 py-4 text-center text-sm font-bold text-primary transition-colors hover:bg-secondary"
              >
                Sună {contact.phone}
              </a>
            </div>

            <dl className="mt-10 divide-y divide-border border-y border-border text-sm">
              {[
                ["Gramaj", p.weight],
                ["Fermentație", p.fermentation],
                ["Ingrediente", p.ingredients],
                ["Alergeni", p.allergens],
                ["Se potrivește cu", p.pairing],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-4">
                  <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{k}</dt>
                  <dd className="text-foreground/80">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-3xl text-primary">Poate îți place și</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/produs/$slug"
                params={{ slug: r.slug }}
                className="group overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <img
                  src={r.image}
                  alt={r.name}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="flex items-center justify-between gap-3 p-5">
                  <span className="font-display text-xl text-primary">{r.name}</span>
                  <span className="text-sm text-muted-foreground">{r.price} lei</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-foreground py-10 text-sm text-background/75">
        <div className="container-x flex flex-wrap gap-x-8 gap-y-2">
          <a href={contact.phoneHref} className="hover:text-accent">
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="hover:text-accent">
            {contact.email}
          </a>
          <span>{contact.addressFull}</span>
        </div>
      </footer>
    </div>
  );
}
