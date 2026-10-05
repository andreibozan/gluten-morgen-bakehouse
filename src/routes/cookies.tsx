import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/bakery/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Politica de cookies — Gluten Morgen" },
      { name: "description", content: "Ce cookie-uri și stocare locală folosește site-ul Gluten Morgen." },
      { property: "og:title", content: "Politica de cookies — Gluten Morgen" },
      { property: "og:description", content: "Informații despre cookie-uri pe site-ul Gluten Morgen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Politica de cookies">
      <h2>Strict necesare</h2>
      <p>Coșul de cumpărături și alegerea ta privind cookie-urile sunt salvate local în browser. Fără ele, comanda nu funcționează.</p>
      <h2>Statistici</h2>
      <p>Cu acordul tău, înregistrăm anonim vizitele și click-urile ca să îmbunătățim site-ul. Nu folosim cookie-uri de publicitate.</p>
      <h2>Cum îți schimbi alegerea</h2>
      <p>Șterge datele site-ului din browser și bannerul va apărea din nou.</p>
    </LegalPage>
  ),
});
