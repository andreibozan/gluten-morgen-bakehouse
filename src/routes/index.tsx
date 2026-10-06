import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LegalLinks, ConsentCheckbox } from "@/components/bakery/LegalLinks";
import { CartButton } from "@/components/bakery/CartDrawer";
import { AddToCart, Availability } from "@/components/bakery/AddToCart";
import { RequestForm } from "@/components/bakery/RequestForm";
import { Reveal } from "@/components/Reveal";
import { Countdown } from "@/components/bakery/Countdown";
import { track } from "@/lib/track";
import { useStock } from "@/lib/cart";
import { subscriptionPlans, formatLei } from "@/lib/pricing";
import { supabase } from "@/integrations/supabase/client";
import {
  products, gallery, steps, schedule, faqs, contact, reviews, googleReviewsUrl, mapsUrl,
} from "@/components/bakery/data";
import heroImg from "@/assets/hero-sourdough.jpg";
import gAluat from "@/assets/g-aluat.jpg";

const TITLE = "Gluten Morgen | Pâine cu Maia & Brutărie Artizanală în Deva";
const DESC =
  "Pâine cu maia fermentată lent, modelată manual și coaptă proaspăt în Deva. Descoperă produsele Gluten Morgen, programul coacerilor și comandă online.";
const SITE = "https://gluten-morgen-bakehouse.lovable.app";

const NAV = [
  { href: "#top", label: "Acasă" },
  { href: "#meniu", label: "Meniu" },
  { href: "#proces", label: "Proces" },
  { href: "#poveste", label: "Povestea noastră" },
  { href: "/abonamente", label: "Abonament" },
  { href: "#b2b", label: "B2B" },
  { href: "#contact", label: "Contact" },
];

const waLink = (text: string) => `${contact.whatsapp}?text=${encodeURIComponent(text)}`;
const WA_GENERAL = waLink("Salut! Vreau să comand pâine de la Gluten Morgen.");

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${SITE}/#bakery`,
    name: "Gluten Morgen",
    url: SITE,
    description: "Brutărie artizanală din Deva specializată în pâine cu maia, fermentată lent și coaptă în loturi mici.",
    telephone: "+40745987108",
    email: contact.email,
    sameAs: [contact.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressStreet,
      addressLocality: contact.addressCity,
      addressRegion: "Hunedoara",
      addressCountry: "RO",
    },
    makesOffer: products.map((p) => ({
      "@type": "Offer",
      price: p.price,
      priceCurrency: "RON",
      itemOffered: { "@type": "Product", name: p.name, description: p.description, url: `${SITE}/produs/${p.slug}` },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gluten Morgen",
    url: SITE,
    email: contact.email,
    telephone: "+40745987108",
    sameAs: [contact.instagram],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE + "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: SITE + "/" }],
    scripts: schemas.map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  }),
});

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const btnPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const btnGhost =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-current px-7 py-3.5 text-xs font-bold tracking-[0.14em] uppercase transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function SectionHead({ eyebrow, title, sub, light }: { eyebrow?: string; title: string; sub?: string; light?: boolean }) {
  return (
    <Reveal>
      {eyebrow && <p className={`eyebrow ${light ? "text-accent" : ""}`}>{eyebrow}</p>}
      <h2 className={`mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl ${light ? "" : "text-primary"}`}>{title}</h2>
      {sub && <p className={`mt-4 max-w-2xl ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{sub}</p>}
    </Reveal>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    track("page_view");
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-20 md:pb-0">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <a href="#top" className="min-w-0">
            <span className="block font-display text-xl leading-none tracking-wide text-primary">Gluten Morgen</span>
            <span className="hidden text-[10px] tracking-[0.22em] text-muted-foreground uppercase sm:block">Artisan sourdough · Deva</span>
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-foreground/70 transition-colors hover:text-primary">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" onClick={() => track("instagram_click")} aria-label="Instagram @glutenmorgen.bake" className="hidden h-10 w-10 items-center justify-center text-foreground/70 hover:text-primary sm:flex">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <CartButton />
            <Link to="/comanda" onClick={() => track("order_click")} className="ml-1 rounded-full bg-primary px-4 py-2.5 text-xs font-bold tracking-[0.12em] text-primary-foreground uppercase hover:bg-primary/90">
              Comandă
            </Link>
            <button onClick={() => setMenuOpen((v) => !v)} aria-label="Meniu" aria-expanded={menuOpen} className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden">
              <span className={`h-px w-6 bg-foreground transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-px w-6 bg-foreground transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobil" className="container-x border-t border-border/60 pb-6 lg:hidden">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block border-b border-border/60 py-4 font-display text-2xl text-primary">{n.label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        {/* 01 HERO */}
        <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
          <img src={heroImg} alt="Pâine cu maia proaspăt coaptă la Gluten Morgen, brutărie artizanală din Deva" width={1920} height={1280} fetchPriority="high" decoding="async" className="animate-slow-zoom absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/45 to-foreground/20" />
          <div className="container-x relative z-10 pt-28 pb-16 text-primary-foreground md:pb-24">
            <Reveal>
              <p className="eyebrow text-accent">Artisan sourdough bakery · Deva</p>
              <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
                Diminețile bune încep cu o pâine adevărată.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
                Pâine cu maia, fermentată lent, modelată manual și coaptă proaspăt în Deva.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/comanda" onClick={() => track("order_click")} className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 py-4 text-xs font-bold tracking-[0.14em] text-accent-foreground uppercase transition-transform hover:scale-[1.02]">
                  Comandă pâinea de azi
                </Link>
                <a href="#meniu" className={btnGhost}>Vezi meniul</a>
              </div>
              <div className="mt-10"><Countdown /></div>
            </Reveal>
          </div>
        </section>

        {/* 02 BRAND STATEMENT */}
        <section className="container-x py-24 text-center md:py-36">
          <Reveal>
            <h2 className="font-display text-5xl text-primary md:text-7xl">Pâine care are timp.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75">
              Într-o lume în care totul se întâmplă repede, noi alegem să lăsăm pâinea să-și urmeze ritmul.
            </p>
            <p className="mx-auto mt-10 max-w-md font-display text-2xl leading-relaxed text-primary md:text-3xl">
              24–48h de fermentație.<br />Ingrediente simple.<br />Modelare manuală.<br />Coacere la temperatură ridicată.
            </p>
          </Reveal>
        </section>

        {/* 03 WHY */}
        <section className="border-y border-border bg-secondary/50 py-20 md:py-28">
          <div className="container-x">
            <h2 className="sr-only">De ce Gluten Morgen</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "01", k: "Timp", t: "24–48h de fermentație", d: "Pentru dezvoltarea aromelor, texturii și caracterului pâinii." },
                { n: "02", k: "Mâini", t: "Modelată manual", d: "Fiecare pâine trece prin mâini înainte să ajungă în cuptor." },
                { n: "03", k: "Foc", t: "Coaptă pe piatră", d: "Coaptă la temperatură ridicată pentru o crustă bine caramelizată și un miez aerat." },
                { n: "04", k: "Simplitate", t: "Făină. Apă. Sare. Maia.", d: "Ingrediente simple, alese cu grijă." },
              ].map((b, i) => (
                <Reveal key={b.n} delay={i * 80}>
                  <p className="font-display text-4xl text-accent tabular-nums">{b.n}</p>
                  <p className="eyebrow mt-3">{b.k}</p>
                  <h3 className="mt-2 font-display text-2xl text-primary">{b.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 04 TODAY'S BAKE */}
        <TodaysBake />

        {/* 05 PRODUCTS */}
        <section id="meniu" className="scroll-mt-20 py-24 md:py-32">
          <div className="container-x">
            <SectionHead eyebrow="Meniu" title="Alege pâinea ta." sub="Coaptă în loturi mici. Disponibilă în funcție de programul săptămânii." />
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80} as="article">
                  <ProductCard p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 06 WEEKLY DROP */}
        <WeeklyDrop />

        {/* 07 SCHEDULE */}
        <section id="program" className="container-x scroll-mt-20 py-24 md:py-32">
          <SectionHead eyebrow="Program" title="Programul coacerilor." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {schedule.map((s) => (
              <div key={s.day} className="bg-card p-8">
                <p className="eyebrow text-olive">{s.day}</p>
                <p className="mt-3 font-display text-3xl text-primary">{s.item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-2xl text-primary">Vrei să fii sigur că prinzi pâinea ta?</p>
            <Link to="/comanda" onClick={() => track("order_click")} className={btnPrimary}>Rezervă pâinea</Link>
          </div>
        </section>

        {/* 08 PROCESS */}
        <section id="proces" className="scroll-mt-16 bg-primary py-24 text-primary-foreground md:py-32">
          <div className="container-x">
            <SectionHead eyebrow="Proces" title="72 de ore pentru o pâine." sub="De la maia la prima felie." light />
            <ol className="mt-14 grid gap-px overflow-hidden rounded-sm bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-7">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 60} as="li">
                  <div className="h-full bg-primary p-6">
                    <span className="font-display text-3xl text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-xs font-bold tracking-[0.18em] uppercase">{s.title}</h3>
                    <p className="mt-2 text-sm text-primary-foreground/70">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* 09 STORY + TRUST */}
        <section id="poveste" className="container-x scroll-mt-20 py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-20">
            <Reveal>
              <img src={gAluat} alt="Mâini modelând aluatul cu maia în brutăria Gluten Morgen din Deva" width={800} height={1000} loading="lazy" decoding="async" className="aspect-4/5 w-full rounded-sm object-cover" />
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow">Povestea noastră</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-primary md:text-5xl">De ce Gluten Morgen?</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-foreground/75">
                <p>Gluten Morgen este o brutărie artizanală din Deva specializată în pâine cu maia, fermentată lent și coaptă în loturi mici.</p>
                <p>Ne place pâinea adevărată — cea care are nevoie de timp, nu de grabă. De aceea lucrăm puțin, cu mâna, și coacem doar cât putem face bine.</p>
                <p>Totul pornește dintr-un borcan de maia și ajunge, dimineața, pe masa ta.</p>
              </div>
              <ul className="mt-8 grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                {["Produse în loturi mici", "Modelate manual", "Maia naturală", "Coapte proaspăt", "Deva, România"].map((t) => (
                  <li key={t} className="flex gap-2"><span className="text-olive" aria-hidden="true">✓</span>{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* 10 REVIEWS */}
        <section className="border-y border-border bg-secondary/50 py-24 md:py-28">
          <div className="container-x">
            <SectionHead eyebrow="Recenzii" title="Spus de cei care au gustat." />
            {reviews.length > 0 ? (
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {reviews.map((r) => (
                  <figure key={r.name + r.text.slice(0, 12)} className="border-t border-border pt-6">
                    <p className="text-accent" aria-label={`${r.rating} din 5 stele`}>{"★".repeat(r.rating)}</p>
                    <blockquote className="mt-3 font-display text-2xl leading-snug text-primary">„{r.text}”</blockquote>
                    <figcaption className="mt-4 text-sm text-muted-foreground">{r.name}{r.source && ` · ${r.source}`}{r.date && ` · ${r.date}`}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <p className="mt-8 max-w-xl text-muted-foreground">Ai gustat pâinea noastră? Ne bucurăm să aflăm cum ți s-a părut — recenziile clienților vor apărea aici.</p>
            )}
            {googleReviewsUrl && (
              <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={`${btnGhost} mt-10 text-primary`}>Vezi toate recenziile</a>
            )}
          </div>
        </section>

        {/* 11 INSTAGRAM */}
        <section className="py-24 md:py-32">
          <div className="container-x">
            <SectionHead eyebrow="Instagram" title="Din brutărie, azi." sub="Aluat, foc, pâine și puțin haos frumos." />
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {gallery.map((g) => (
                <a key={g.alt} href={contact.instagram} target="_blank" rel="noopener noreferrer" onClick={() => track("instagram_click")} className="group block overflow-hidden rounded-sm">
                  <img src={g.src} alt={g.alt} width={800} height={800} loading="lazy" decoding="async" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </a>
              ))}
            </div>
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" onClick={() => track("instagram_click")} className={`${btnGhost} mt-10 text-primary`}>
              Urmărește @glutenmorgen.bake
            </a>
          </div>
        </section>

        {/* 12 SUBSCRIPTION */}
        <section className="bg-olive py-24 text-olive-foreground md:py-32">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow text-accent">Gluten Morgen Club</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">Pâinea ta. În fiecare săptămână.</h2>
              <p className="mt-4 max-w-2xl text-olive-foreground/80">Pentru cei care nu vor să rămână niciodată fără pâinea lor preferată.</p>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-olive-foreground/20 md:grid-cols-3">
              {subscriptionPlans.map((p) => (
                <div key={p.name} className="bg-olive p-8">
                  <p className="eyebrow text-olive-foreground/70">{p.name}</p>
                  <p className="mt-3 font-display text-5xl">−{p.discount}%</p>
                  <p className="mt-3 text-sm text-olive-foreground/80">{p.text}</p>
                </div>
              ))}
            </div>
            <Link to="/abonamente" onClick={() => track("subscription_interest")} className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 py-4 text-xs font-bold tracking-[0.14em] text-accent-foreground uppercase">
              Vreau abonament
            </Link>
          </div>
        </section>

        {/* 13 B2B */}
        <section id="b2b" className="container-x scroll-mt-20 py-24 md:py-32">
          <SectionHead eyebrow="Gluten Morgen for business" title="Pâine artizanală pentru restaurante, cafenele, hoteluri și evenimente." />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              { t: "Restaurante", d: "Pâine artizanală pentru meniuri care pun ingredientele în valoare." },
              { t: "Cafenele", d: "Baghete, chifle și produse pentru breakfast." },
              { t: "Evenimente", d: "Comenzi pentru nunți, botezuri, evenimente corporate și private." },
            ].map((c) => (
              <div key={c.t} className="border-t border-border pt-6">
                <h3 className="font-display text-3xl text-primary">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <h3 className="mb-6 font-display text-3xl text-primary">Cere oferta B2B</h3>
              <RequestForm
                kind="b2b"
                submitLabel="Cere oferta B2B"
                fields={[
                  { name: "companie", label: "Companie" },
                  { name: "tip", label: "Tip business", options: ["Restaurant", "Cafenea", "Hotel", "Eveniment", "Altceva"] },
                ]}
              />
            </div>
            <div className="rounded-sm border border-border bg-card p-8">
              <p className="eyebrow">Preferi să vorbim direct?</p>
              <p className="mt-3 text-sm text-muted-foreground">Scrie-ne pe WhatsApp sau sună-ne și stabilim împreună cantitățile.</p>
              <a href={waLink("Salut! Aș vrea o ofertă B2B de la Gluten Morgen.")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click")} className={`${btnPrimary} mt-6 w-full`}>WhatsApp</a>
              <a href={contact.phoneHref} onClick={() => track("phone_click")} className={`${btnGhost} mt-3 w-full text-primary`}>{contact.phone}</a>
            </div>
          </div>
        </section>

        {/* 14 FAQ */}
        <section id="faq" className="scroll-mt-16 border-t border-border bg-secondary/50 py-24 md:py-32">
          <div className="container-x max-w-3xl">
            <SectionHead eyebrow="Întrebări frecvente" title="Bine de știut." />
            <div className="mt-10 border-t border-border">
              {faqs.map((f, i) => (
                <div key={f.q} className="border-b border-border">
                  <h3>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                      <span className="font-display text-xl text-primary md:text-2xl">{f.q}</span>
                      <span className={`text-accent transition-transform ${openFaq === i ? "rotate-45" : ""}`} aria-hidden="true">＋</span>
                    </button>
                  </h3>
                  <p id={`faq-${i}`} hidden={openFaq !== i} className="pb-6 text-sm leading-relaxed text-foreground/70">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 15 ABOUT SOURDOUGH (SEO) */}
        <section className="container-x max-w-3xl py-20 md:py-28">
          <p className="eyebrow">Despre pâinea cu maia</p>
          <h2 className="mt-3 font-display text-3xl text-primary md:text-4xl">Ce înseamnă o pâine cu maia?</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/75">
            <p>Maiaua este un amestec viu de făină și apă, în care drojdiile și bacteriile naturale cresc lent. Ea înlocuiește drojdia comercială și dă pâinii gustul ușor acrișor și coaja caracteristică.</p>
            <p>Fermentația lentă — 24–48 de ore la Gluten Morgen — lasă timp aromelor să se dezvolte și miezului să devină elastic și aerat.</p>
            <p>Lucrăm în loturi mici: amestecăm, lăsăm aluatul să crească, îl modelăm manual, îl dospim la rece și îl coacem pe piatră. Așa facem pâine cu maia în Deva, pentru clienții din tot județul Hunedoara.</p>
          </div>
        </section>

        {/* 16 NEWSLETTER */}
        <Newsletter />

        {/* 17 CONTACT */}
        <section id="contact" className="container-x scroll-mt-20 py-24 md:py-28">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">Cum ajungi la noi</h2>
              <address className="mt-6 space-y-2 not-italic text-foreground/80">
                <p>{contact.addressFull}</p>
                <p><a href={contact.phoneHref} onClick={() => track("phone_click")} className="hover:text-primary">{contact.phone}</a></p>
                <p><a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a></p>
              </address>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("google_maps_click")} className={`${btnPrimary} mt-8`}>Deschide în Google Maps</a>
            </div>
            <iframe
              title="Harta Gluten Morgen — Str. Depozitelor 7, Deva"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.addressFull)}&output=embed`}
              loading="lazy"
              className="h-72 w-full rounded-sm border border-border grayscale md:h-full"
            />
          </div>
        </section>

        {/* 18 FINAL CTA */}
        <section className="bg-primary py-24 text-center text-primary-foreground md:py-32">
          <div className="container-x">
            <h2 className="font-display text-4xl md:text-6xl">Mai bună dimineața începe aici.</h2>
            <Link to="/comanda" onClick={() => track("order_click")} className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-10 py-4 text-xs font-bold tracking-[0.14em] text-accent-foreground uppercase">
              Comandă acum
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-foreground py-16 text-background/80">
        <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-background">Gluten Morgen</p>
            <p className="mt-2 text-sm">Artisan Sourdough Bakery<br />Deva, România</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow text-accent">Contact</p>
            <p><a href={contact.phoneHref} onClick={() => track("phone_click")} className="hover:text-accent">{contact.phone}</a></p>
            <p><a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click")} className="hover:text-accent">WhatsApp</a></p>
            <p><a href={`mailto:${contact.email}`} className="hover:text-accent">{contact.email}</a></p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow text-accent">Program</p>
            <p>Comenzi online non-stop</p>
            <p>Comenzi până la 20:00 pentru coacerea următoare</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="eyebrow text-accent">Ne găsești</p>
            <p><a href={contact.instagram} target="_blank" rel="noopener noreferrer" onClick={() => track("instagram_click")} className="hover:text-accent">Instagram @glutenmorgen.bake</a></p>
            <p><a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("google_maps_click")} className="hover:text-accent">Google Maps</a></p>
            <p>{contact.addressFull}</p>
          </div>
        </div>
        <div className="container-x mt-12 border-t border-background/15 pt-6 text-background/60">
          <LegalLinks />
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <nav aria-label="Acțiuni rapide" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
        <Link to="/comanda" onClick={() => track("order_click")} className="py-4 text-center text-[11px] font-bold tracking-[0.18em] text-primary uppercase">Comandă</Link>
        <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click")} className="border-x border-border py-4 text-center text-[11px] tracking-[0.18em] text-muted-foreground uppercase">WhatsApp</a>
        <a href="#meniu" className="py-4 text-center text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Meniu</a>
      </nav>
    </div>
  );
}

function ProductCard({ p }: { p: (typeof products)[number] }) {
  return (
    <div className="group flex h-full flex-col">
      <Link to="/produs/$slug" params={{ slug: p.slug }} className="relative block overflow-hidden rounded-sm">
        <img src={p.image} alt={`${p.name} cu maia — Gluten Morgen Deva`} width={800} height={800} loading="lazy" decoding="async" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        {p.badge && (
          <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-primary uppercase">{p.badge}</span>
        )}
      </Link>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl text-primary">
          <Link to="/produs/$slug" params={{ slug: p.slug }} className="hover:text-accent">{p.name}</Link>
        </h3>
        <span className="shrink-0 font-display text-2xl text-primary">{formatLei(p.price)}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{p.description}</p>
      {p.slug === "chifle-artizanale" && <p className="mt-1 text-xs font-semibold text-olive">4 chifle — 17 lei</p>}
      <div className="mt-3"><Availability slug={p.slug} /></div>
      <div className="mt-auto pt-5">
        {p.preorderOnly ? (
          <a href={waLink(`Salut! Vreau să precomand ${p.name}.`)} target="_blank" rel="noopener noreferrer" onClick={() => { track("weekly_drop_click", p.slug); track("whatsapp_click", p.slug); }} className={`${btnPrimary} w-full`}>
            Precomandă
          </a>
        ) : (
          <AddToCart slug={p.slug} name={p.name} />
        )}
      </div>
    </div>
  );
}

function TodaysBake() {
  const { data } = useStock();
  const today = products.filter((p) => !p.preorderOnly && (data?.[p.slug] ?? 0) > 0);
  return (
    <section className="container-x py-24 md:py-32">
      <SectionHead eyebrow="Coaptă azi" title="Ce iese azi din cuptor." />
      {data === undefined ? (
        <div className="mt-10 h-24" aria-hidden="true" />
      ) : today.length > 0 ? (
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {today.map((p) => (
            <li key={p.slug} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src={p.image} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-sm object-cover" />
                <div>
                  <p className="font-display text-2xl text-primary">{p.name}</p>
                  <Availability slug={p.slug} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-display text-xl text-primary">{formatLei(p.price)}</span>
                <Link to="/comanda" search={{ produs: p.slug }} onClick={() => track("order_click", p.slug)} className={btnPrimary}>Comandă</Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-sm border border-border bg-card p-8">
          <p className="font-display text-2xl text-primary">Pâinea de azi s-a terminat.</p>
          <div className="mt-4"><Countdown tone="dark" /></div>
          <p className="mt-4 text-sm text-muted-foreground">Precomandă acum pentru coacerea următoare.</p>
        </div>
      )}
      <p className="mt-6 text-sm text-muted-foreground">Ridicare din {contact.addressFull} sau livrare în județul Hunedoara.</p>
    </section>
  );
}

function WeeklyDrop() {
  const p = products.find((x) => x.preorderOnly);
  if (!p) return null;
  return (
    <section className="border-y border-border bg-secondary/50 py-24 md:py-32">
      <div className="container-x grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <img src={p.image} alt={`${p.name} — ediție limitată Gluten Morgen`} width={800} height={800} loading="lazy" decoding="async" className="aspect-square w-full rounded-sm object-cover" />
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">The Weekly Drop</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-primary md:text-6xl">O pâine nouă. În fiecare săptămână.</h2>
          <p className="mt-5 leading-relaxed text-foreground/75">În fiecare săptămână pregătim o rețetă nouă, disponibilă în cantități limitate.</p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-2"><dt className="font-semibold">Ingrediente:</dt><dd>{p.ingredients}</dd></div>
            <div className="flex gap-2"><dt className="font-semibold">Preț:</dt><dd>{formatLei(p.price)}</dd></div>
            <div className="flex gap-2"><dt className="font-semibold">Precomenzi:</dt><dd>după anunțul de luni, cât timp mai sunt locuri în lot</dd></div>
          </dl>
          <span className="mt-6 inline-block rounded-full border border-accent px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-primary uppercase">Lot limitat</span>
          <div className="mt-8">
            <Link to="/produs/$slug" params={{ slug: p.slug }} onClick={() => track("weekly_drop_click", p.slug)} className={btnPrimary}>
              Descoperă ediția acestei săptămâni
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setMsg("Introdu o adresă de email validă.");
    if (!consent) return setMsg("Bifează acordul pentru a primi noutăți.");
    setMsg("");
    setState("sending");
    const { error } = await supabase.from("orders").insert({
      customer_name: "Newsletter",
      phone: "-",
      email: email.trim().slice(0, 255),
      delivery_method: "newsletter",
      items: [],
      total: 0,
      order_number: "NL-" + Date.now().toString(36).toUpperCase().slice(-6),
      note: "Acord marketing: da",
    });
    if (error) {
      setState("error");
      return setMsg("Nu am putut salva adresa. Încearcă din nou.");
    }
    track("newsletter_signup");
    setState("done");
  }

  return (
    <section className="border-y border-border bg-card py-20 md:py-24">
      <div className="container-x max-w-2xl text-center">
        <h2 className="font-display text-3xl text-primary md:text-5xl">Vrei să afli primul ce scoatem din cuptor?</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">Îți trimitem noutățile, Weekly Drop-ul și disponibilitatea pâinii.</p>
        {state === "done" ? (
          <p className="mt-8 text-sm font-semibold text-olive">Mulțumim! Te anunțăm când avem ceva bun.</p>
        ) : (
          <form onSubmit={submit} noValidate className="mx-auto mt-8 grid max-w-md gap-3 text-left">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Adresa de email</label>
              <input id="nl-email" type="email" maxLength={160} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adresa@email.ro" className="min-h-12 w-full rounded-full border border-border bg-background px-6 text-sm focus:border-primary focus:outline-none" />
              <button type="submit" disabled={state === "sending"} className={`${btnPrimary} shrink-0 disabled:opacity-60`}>Vreau să știu</button>
            </div>
            <ConsentCheckbox checked={consent} onChange={setConsent} label="Sunt de acord să primesc emailuri cu noutăți de la Gluten Morgen. Mă pot dezabona oricând." />
            {msg && <p role="alert" className="text-sm text-destructive">{msg}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
