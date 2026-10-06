import { createFileRoute, Link } from "@tanstack/react-router";
import { RequestForm } from "@/components/bakery/RequestForm";

export const Route = createFileRoute("/evenimente")({
  head: () => ({
    meta: [
      { title: "Pâine pentru evenimente și firme — Gluten Morgen Deva" },
      { name: "description", content: "Pâine cu maia și chifle artizanale pentru nunți, botezuri, petreceri, restaurante și evenimente corporate în Deva și județul Hunedoara." },
      { property: "og:title", content: "Comenzi pentru evenimente — Gluten Morgen" },
      { property: "og:description", content: "Pâine artizanală pentru nunți, botezuri, firme și restaurante." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const types = ["Nuntă", "Botez", "Petrecere privată", "Eveniment corporate", "Restaurant / cafenea", "Altceva"];

function Page() {
  return (
    <main className="min-h-screen bg-background pb-28">
      <div className="container-x py-6"><Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Gluten Morgen</Link></div>
      <section className="container-x max-w-4xl">
        <p className="eyebrow">Evenimente & firme</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Pâine artizanală pentru zilele importante</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Coacem pentru nunți, botezuri, petreceri, birouri și restaurante: pâini întregi, baghete, chifle de 110 g sau platouri feliate. Spune-ne data și numărul de invitați — revenim cu o ofertă. Recomandăm comanda cu cel puțin 5 zile înainte.</p>
        <p className="mt-6 inline-block rounded-sm border border-accent bg-card px-4 py-3 text-sm"><strong>Pachet eveniment:</strong> ofertă în funcție de cerere — prețul depinde de cantitate și sortimente.</p>
        <h2 className="mt-12 mb-6 font-display text-3xl">Cere o ofertă</h2>
        <RequestForm
          kind="eveniment"
          submitLabel="Trimite cererea de ofertă"
          fields={[
            { name: "tip", label: "Tip eveniment", options: types },
            { name: "data", label: "Data evenimentului", type: "date" },
            { name: "invitati", label: "Număr de persoane", type: "number" },
            { name: "loc", label: "Localitate" },
          ]}
        />
      </section>
    </main>
  );
}
