import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CartButton } from "@/components/bakery/CartDrawer";
import { AddToCart, Availability } from "@/components/bakery/AddToCart";
import { Reveal } from "@/components/Reveal";
import { track } from "@/lib/track";
import { Countdown } from "@/components/bakery/Countdown";
import { products, gallery, steps, schedule, faqs, reviews, contact } from "@/components/bakery/data";
import heroImg from "@/assets/hero-sourdough.jpg";
import gAluat from "@/assets/g-aluat.jpg";

const NAV = [
  { href: "#despre", label: "Despre" },
  { href: "#produse", label: "Produse" },
  { href: "#proces", label: "Proces" },
  { href: "#galerie", label: "Galerie" },
  { href: "#program", label: "Program" },
  { href: "#faq", label: "Întrebări" },
];

const WHATSAPP = contact.whatsapp;

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Gluten Morgen",
  description: "Brutărie artizanală cu pâine cu maia naturală, fermentată 24–48 de ore.",
  servesCuisine: "Bakery",
  priceRange: "$$",
  telephone: "+40745987108",
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.addressStreet,
    addressLocality: contact.addressCity,
    addressCountry: "RO",
  },
  openingHours: "Mo-Sa 07:00-19:00",
  makesOffer: products.map((p) => ({
    "@type": "Offer",
    price: p.price,
    priceCurrency: "RON",
    availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    itemOffered: { "@type": "Product", name: p.name, description: p.description },
  })),
};


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Gluten Morgen — Pâine cu maia, coaptă în fiecare dimineață" },
      {
        name: "description",
        content:
          "Brutărie artizanală: pâine cu maia naturală, fermentată 24–48h, coaptă pe piatră. Comandă online, livrare locală sau ridicare din brutărie.",
      },
      { property: "og:title", content: "Gluten Morgen — Pâine cu maia, coaptă în fiecare dimineață" },
      {
        property: "og:description",
        content: "Brutărie artizanală: pâine cu maia naturală, fermentată 24–48h, coaptă pe piatră. Comandă online, livrare locală sau ridicare din brutărie.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(productSchema) }],
  }),
});

function Stars() {
  return (
    <div className="text-accent" aria-label="5 din 5 stele">
      ★★★★★
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    track("page_view");
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="container-x grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <a href="#top" className="min-w-0">
            <span className="block font-display text-xl leading-none tracking-wide text-primary">
              Gluten Morgen
            </span>
            <span className="hidden text-[10px] tracking-[0.22em] text-muted-foreground uppercase sm:block">
              Brutărie cu maia
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-foreground/70 transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            ))}
            <a
              href="/comanda"
              onClick={() => track("order_click")}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[var(--shadow-lift)]"
            >
              Comandă acum
            </a>
          </nav>
          <div className="flex items-center gap-1">
          <CartButton />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Meniu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-foreground transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`h-px w-6 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-6 bg-foreground transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
        {menuOpen && (
          <nav className="animate-fade-in border-t border-border bg-background px-5 pb-6 md:hidden">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border/60 py-4 font-display text-2xl text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Pâine cu maia proaspăt coaptă pe o masă rustică din lemn, în lumina dimineții"
          width={1920}
          height={1280}
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.02_60/0.88)] via-[oklch(0.2_0.02_60/0.45)] to-[oklch(0.2_0.02_60/0.25)]" />
        <div className="container-x relative z-10 pt-28 pb-20 md:pb-28">
          <Reveal>
            <p className="eyebrow text-accent">Diminețile bune încep cu o pâine adevărată</p>
            <h1 className="mt-5 max-w-3xl font-display text-[2.65rem] leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
              Pâine cu maia.
              <br />
              Fermentată natural.
              <br />
              <em className="text-accent not-italic">Coaptă în fiecare dimineață.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85">
              Preparăm zilnic pâine artizanală folosind doar făină premium, apă, sare și maia
              naturală. Fără aditivi, fără conservanți, doar gust autentic.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/comanda"
                onClick={() => track("order_click")}
                className="rounded-full bg-accent px-8 py-4 text-center text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                Comandă acum
              </a>
              <a
                href="#program"
                className="rounded-full border border-primary-foreground/40 px-8 py-4 text-center text-sm font-bold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/10"
              >
                Vezi pâinea săptămânii
              </a>
            </div>
            <div className="mt-10">
              <Countdown />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DESPRE */}
      <section id="despre" className="container-x py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-20">
          <Reveal>
            <img
              src={gAluat}
              alt="Brutar modelând manual aluatul cu maia"
              width={800}
              height={800}
              loading="lazy"
              className="aspect-4/5 w-full rounded-sm object-cover shadow-[var(--shadow-lift)]"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Despre noi</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-primary md:text-5xl">
              De ce Gluten Morgen?
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/75">
              <p>
                La Gluten Morgen credem că pâinea adevărată nu are nevoie decât de timp și
                ingrediente curate.
              </p>
              <p>
                Fiecare pâine este fermentată natural între 24 și 48 de ore pentru un gust intens, o
                textură aerată și o digestie mai ușoară.
              </p>
              <p className="font-display text-2xl leading-snug text-primary">
                Nu folosim amelioratori.
                <br />
                Nu folosim conservanți.
                <br />
                Nu folosim compromisuri.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFICII */}
      <section className="border-y border-border bg-secondary/50 py-20 md:py-28">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🌾", title: "Fermentație naturală", text: "24–48 ore de răbdare" },
            { icon: "🔥", title: "Coaptă pe piatră", text: "Vatră de piatră, abur, 250°C" },
            { icon: "❤️", title: "Preparată manual", text: "Modelată zilnic, una câte una" },
            { icon: "🌱", title: "Ingrediente naturale", text: "Făină, apă, sare, maia" },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <div className="h-full rounded-sm border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="text-3xl">{b.icon}</div>
                <h3 className="mt-5 font-display text-2xl text-primary">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUSE */}
      <section id="produse" className="py-24 md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Produse</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-primary md:text-5xl">
              Pâinea de astăzi, scoasă din cuptor la ora 6 dimineața
            </h2>
          </Reveal>
        </div>

        {/* mobile: swipe carousel · desktop: grid */}
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:hidden">
          {products.map((p) => (
            <article
              key={p.name}
              className="w-[82vw] shrink-0 snap-center overflow-hidden rounded-sm border border-border bg-card"
            >
              <ProductBody p={p} />
            </article>
          ))}
        </div>

        <div className="container-x mt-12 hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 90} as="article">
              <div className="group h-full overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <ProductBody p={p} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCES */}
      <section id="proces" className="border-y border-border bg-primary py-24 text-primary-foreground md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-accent">Procesul</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">De la făină la masa ta</h2>
          </Reveal>
          <ol className="mt-14 space-y-0">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 70} as="li">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-t border-primary-foreground/15 py-7">
                  <span className="font-display text-3xl text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl">{s.title}</h3>
                    <p className="mt-1 text-sm text-primary-foreground/70">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* GALERIE */}
      <section id="galerie" className="py-24 md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Galerie</p>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">@glutenmorgen</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((g, i) => (
              <Reveal key={g.alt} delay={(i % 3) * 80}>
                <img
                  src={g.src}
                  alt={g.alt}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-square w-full rounded-sm object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECENZII */}
      <section className="border-y border-border bg-secondary/50 py-20 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.author} delay={i * 90}>
              <figure className="h-full rounded-sm border border-border bg-card p-8">
                <Stars />
                <blockquote className="mt-4 font-display text-2xl leading-snug text-primary">
                  „{r.text}”
                </blockquote>
                <figcaption className="mt-4 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {r.author} · Google Reviews
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROGRAM COACERE */}
      <section id="program" className="container-x py-24 md:py-36">
        <Reveal>
          <p className="eyebrow">Programul coacerii</p>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Pâinea săptămânii</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {schedule.map((s, i) => (
            <Reveal key={s.day} delay={i * 80}>
              <div className="h-full bg-card p-8">
                <p className="eyebrow text-olive">{s.day}</p>
                <p className="mt-3 font-display text-3xl text-primary">{s.item}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-sm border border-accent/40 bg-accent/10 px-6 py-5">
            <Countdown tone="dark" />
            <span className="text-sm text-muted-foreground">
              Comenzile plasate până la 20:00 intră în coacerea de mâine dimineață.
            </span>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border bg-secondary/50 py-24 md:py-32">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="eyebrow">Întrebări frecvente</p>
            <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">Bine de știut</h2>
          </Reveal>
          <div className="mt-10 border-t border-border">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-2xl text-primary">{f.q}</span>
                  <span className={`text-accent transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                    ＋
                  </span>
                </button>
                {openFaq === i && (
                  <p className="animate-fade-in pb-6 text-sm leading-relaxed text-foreground/70">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-olive py-24 text-olive-foreground md:py-32">
        <div className="container-x max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">Intră în Clubul Gluten Morgen</h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-olive-foreground/85">
              Primești meniul săptămânal, produse în ediție limitată și reduceri exclusive.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim().length > 3) {
                  setSubscribed(true);
                  track("newsletter_signup");
                }
              }}
              className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="nl-email">
                Adresa de email
              </label>
              <input
                id="nl-email"
                type="email"
                required
                maxLength={160}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adresa@email.ro"
                className="w-full rounded-full border border-olive-foreground/30 bg-transparent px-6 py-4 text-sm placeholder:text-olive-foreground/50 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-accent px-8 py-4 text-sm font-bold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                Abonează-te
              </button>
            </form>
            {subscribed && (
              <p className="animate-fade-in mt-4 text-sm text-accent">
                Mulțumim! Ne vedem în inbox, vineri dimineață.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground py-16 text-background/80">
        <div className="container-x grid gap-12 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-background">Gluten Morgen</p>
            <p className="mt-3 text-sm leading-relaxed">
              Diminețile bune încep cu o pâine adevărată.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow text-accent">Contact</p>
            <p>
              <a href={contact.phoneHref} onClick={() => track("phone_click")} className="hover:text-accent">
                {contact.phone}
              </a>
            </p>
            <p>
              <a href={WHATSAPP} onClick={() => track("whatsapp_click")} className="hover:text-accent">
                WhatsApp
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
            </p>
            <p>{contact.addressFull}</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="eyebrow text-accent">Program</p>
            <p>Luni – Vineri: 07:00 – 19:00</p>
            <p>Sâmbătă: 07:00 – 15:00</p>
            <p>Duminică: închis</p>
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" className="hover:text-accent">
                Instagram
              </a>
              <a href="https://facebook.com" className="hover:text-accent">
                Facebook
              </a>
              <a href="https://tiktok.com" className="hover:text-accent">
                TikTok
              </a>
            </div>
          </div>
          <div>
            <p className="eyebrow text-accent">Ne găsești aici</p>
            <iframe
              title="Harta brutăriei Gluten Morgen — Str. Depozitelor 7, Deva"
              src="https://www.openstreetmap.org/export/embed.html?bbox=22.87%2C45.86%2C22.94%2C45.91&layer=mapnik"

              loading="lazy"
              className="mt-3 h-40 w-full rounded-sm border border-background/20 grayscale"
            />
          </div>
        </div>
        <div className="container-x mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-background/15 pt-6 text-xs text-background/60">
          <span>© {new Date().getFullYear()} Gluten Morgen</span>
          <a href="https://anpc.ro" className="hover:text-accent">
            ANPC
          </a>
          <a href="#faq" className="hover:text-accent">
            Politica GDPR
          </a>
          <a href="#faq" className="hover:text-accent">
            Termeni și condiții
          </a>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP}
        aria-label="Scrie-ne pe WhatsApp"
        onClick={() => track("whatsapp_click")}
        className="fixed right-5 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-olive text-olive-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-110 md:bottom-8"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.06l-.3-.18-3.08.89.9-3-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm4.5 10.3c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-3.29-2.87c-.25-.43.25-.4.71-1.32.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64 1.53.66 2.13.72 2.9.6.46-.06 1.44-.58 1.64-1.16.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
        {[
          { href: "#top", label: "Acasă" },
          { href: "#produse", label: "Produse" },
          { href: "#program", label: "Program" },
          { href: "/comanda", label: "Comandă" },
        ].map((i, idx) => (
          <a
            key={i.label}
            href={i.href}
            className={`py-4 text-center text-[10px] tracking-[0.18em] uppercase ${
              idx === 3 ? "font-bold text-primary" : "text-muted-foreground"
            }`}
          >
            {i.label}
          </a>
        ))}
      </nav>

    </div>
  );
}

function ProductBody({ p }: { p: (typeof products)[number] }) {
  return (
    <>
      <Link to="/produs/$slug" params={{ slug: p.slug }} className="relative block overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          width={800}
          height={800}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {p.freshToday ? (
          <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-accent-foreground uppercase">
            Coaptă astăzi
          </span>
        ) : (
          <span className="absolute top-4 left-4 rounded-full bg-foreground/80 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-background uppercase">
            Stoc epuizat
          </span>
        )}
      </Link>
      <div className="flex flex-col p-6">
        <h3 className="font-display text-2xl text-primary">
          <Link to="/produs/$slug" params={{ slug: p.slug }} className="hover:text-accent">
            {p.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">{p.description}</p>
        <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
          <div className="flex gap-2">
            <dt className="font-semibold">Gramaj:</dt>
            <dd>{p.weight}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 font-semibold">Ingrediente:</dt>
            <dd className="min-w-0">{p.ingredients}</dd>
          </div>
        </dl>
        <Link
          to="/produs/$slug"
          params={{ slug: p.slug }}
          className="mt-4 text-xs font-bold tracking-[0.16em] text-olive uppercase hover:text-primary"
        >
          Vezi detalii →
        </Link>
        <div className="mt-5 border-t border-border pt-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="font-display text-2xl text-primary">{p.price} lei</span>
            <Availability slug={p.slug} />
          </div>
          <AddToCart slug={p.slug} name={p.name} />
        </div>
      </div>
    </>
  );
}
