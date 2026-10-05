import { Link } from "@tanstack/react-router";

// Company identifiers — replace with real data from the trade register.
export const company = {
  name: "[Denumire firmă SRL]",
  cui: "[CUI]",
  regCom: "[J20/____/____]",
};

export function LegalLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
      <span>© {new Date().getFullYear()} Gluten Morgen · {company.name} · CUI {company.cui}</span>
      <Link to="/termeni" className="hover:text-accent">Termeni și condiții</Link>
      <Link to="/confidentialitate" className="hover:text-accent">Confidențialitate (GDPR)</Link>
      <Link to="/cookies" className="hover:text-accent">Cookies</Link>
      <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="rounded border border-current px-2 py-1 font-semibold hover:text-accent">ANPC – SAL</a>
      <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="rounded border border-current px-2 py-1 font-semibold hover:text-accent">SOL – Soluționare online</a>
    </div>
  );
}

export function ConsentCheckbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-2 text-xs text-muted-foreground md:col-span-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5" />
      <span>
        Sunt de acord cu <Link to="/termeni" className="underline">Termenii</Link> și cu prelucrarea datelor conform{" "}
        <Link to="/confidentialitate" className="underline">Politicii de confidențialitate</Link>. *
      </span>
    </label>
  );
}
