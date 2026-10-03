import { createFileRoute, Link } from "@tanstack/react-router";
import { RequestForm } from "@/components/bakery/RequestForm";
import { products } from "@/components/bakery/data";

export const Route = createFileRoute("/abonamente")({
  head: () => ({
    meta: [
      { title: "Abonamente de pâine cu maia — Gluten Morgen Deva" },
      { name: "description", content: "Pâine proaspătă cu maia naturală în fiecare săptămână, pregătită pentru tine în Deva. Alege planul săptămânal sau bisăptămânal." },
      { property: "og:title", content: "Abonamente de pâine — Gluten Morgen" },
      { property: "og:description", content: "Pâine cu maia, rezervată pentru tine în fiecare săptămână." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const plans = [
  { name: "Săptămânal", text: "O pâine la alegere, în fiecare săptămână, în ziua preferată." },
  { name: "De două ori pe săptămână", text: "Două livrări sau ridicări pe săptămână — pentru familii." },
  { name: "Familie", text: "Pâine + chifle artizanale, pentru mic dejunul de weekend." },
];

function Page() {
  return (
    <main className="min-h-screen bg-background pb-28">
      <div className="container-x py-6"><Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Gluten Morgen</Link></div>
      <section className="container-x max-w-4xl">
        <p className="eyebrow">Abonamente</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Pâinea ta, rezervată în fiecare săptămână</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Nu mai riști să găsești raftul gol. Alegi planul, sortimentul și ziua, iar noi îți păstrăm pâinea proaspătă. Prețul se confirmă telefonic.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className="rounded-sm border border-border bg-card p-6">
              <h2 className="font-display text-2xl">{p.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-14 mb-6 font-display text-3xl">Cere un abonament</h2>
        <RequestForm
          kind="abonament"
          submitLabel="Trimite cererea de abonament"
          fields={[
            { name: "plan", label: "Plan", options: plans.map((p) => p.name) },
            { name: "produs", label: "Sortiment", options: products.map((p) => p.name) },
            { name: "zi", label: "Ziua preferată", options: ["Luni", "Marți", "Miercuri", "Joi", "Vineri"] },
            { name: "metoda", label: "Ridicare sau livrare", options: ["Ridicare din Deva", "Livrare"] },
          ]}
        />
      </section>
    </main>
  );
}
