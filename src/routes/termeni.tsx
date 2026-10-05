import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/bakery/LegalPage";
import { company } from "@/components/bakery/LegalLinks";
import { contact } from "@/components/bakery/data";

export const Route = createFileRoute("/termeni")({
  head: () => ({
    meta: [
      { title: "Termeni și condiții — Gluten Morgen" },
      { name: "description", content: "Termenii și condițiile comenzilor online la brutăria Gluten Morgen din Deva." },
      { property: "og:title", content: "Termeni și condiții — Gluten Morgen" },
      { property: "og:description", content: "Condițiile de comandă, livrare și plată la Gluten Morgen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Termeni și condiții">
      <p>Site operat de {company.name}, CUI {company.cui}, Reg. Com. {company.regCom}, {contact.addressFull}. Contact: {contact.phone}, {contact.email}.</p>
      <h2>Comenzi</h2>
      <p>Comenzile se plasează cu cel puțin 24 de ore înainte. Comanda devine fermă după confirmarea telefonică din partea noastră.</p>
      <h2>Prețuri și plată</h2>
      <p>Prețurile sunt exprimate în lei și includ TVA. Plata se face la ridicare sau la livrare (numerar sau card). Taxa de livrare se comunică la confirmare.</p>
      <h2>Livrare și ridicare</h2>
      <p>Ridicare din brutărie ({contact.addressFull}) sau livrare în județul Hunedoara, în intervalul orar ales.</p>
      <h2>Dreptul de retragere</h2>
      <p>Conform OUG 34/2014, art. 16 lit. d) și e), dreptul de retragere nu se aplică produselor alimentare perisabile. Dacă un produs nu corespunde, te rugăm să ne contactezi în aceeași zi.</p>
      <h2>Alergeni</h2>
      <p>Toate produsele conțin gluten. Lista completă de ingrediente și alergeni este afișată pe pagina fiecărui produs.</p>
      <h2>Litigii</h2>
      <p>Pentru reclamații: ANPC (anpc.ro) sau platforma SOL a Comisiei Europene (ec.europa.eu/consumers/odr).</p>
    </LegalPage>
  ),
});
