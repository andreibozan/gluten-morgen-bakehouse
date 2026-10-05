import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/bakery/LegalPage";
import { company } from "@/components/bakery/LegalLinks";
import { contact } from "@/components/bakery/data";

export const Route = createFileRoute("/confidentialitate")({
  head: () => ({
    meta: [
      { title: "Politica de confidențialitate (GDPR) — Gluten Morgen" },
      { name: "description", content: "Cum colectăm și protejăm datele personale ale clienților Gluten Morgen." },
      { property: "og:title", content: "Politica de confidențialitate — Gluten Morgen" },
      { property: "og:description", content: "Prelucrarea datelor personale conform GDPR la Gluten Morgen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Politica de confidențialitate">
      <p>Operator de date: {company.name}, CUI {company.cui}, {contact.addressFull}, {contact.email}.</p>
      <h2>Ce date colectăm</h2>
      <p>Nume, telefon, email și adresa de livrare, doar când plasezi o comandă, o cerere sau te abonezi la newsletter.</p>
      <h2>De ce</h2>
      <p>Pentru a procesa și livra comanda (executarea contractului), pentru a-ți trimite noutăți (doar cu acordul tău) și pentru statistici anonime de utilizare a site-ului.</p>
      <h2>Cât timp</h2>
      <p>Datele comenzilor se păstrează conform obligațiilor fiscale; datele de newsletter până la dezabonare.</p>
      <h2>Drepturile tale</h2>
      <p>Acces, rectificare, ștergere, restricționare, portabilitate și opoziție. Scrie-ne la {contact.email}. Poți depune plângere la ANSPDCP (dataprotection.ro).</p>
      <h2>Partajare</h2>
      <p>Nu vindem datele. Le folosim doar cu furnizori necesari funcționării site-ului (găzduire, bază de date).</p>
    </LegalPage>
  ),
});
