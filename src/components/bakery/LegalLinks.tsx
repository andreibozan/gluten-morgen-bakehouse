import { Link } from "@tanstack/react-router";

// Company identifiers — fill in with real trade register data. Empty values are hidden from visitors.
export const company = {
  name: "",
  cui: "",
  regCom: "",
};

export function companyLine() {
  return [company.name, company.cui && `CUI ${company.cui}`, company.regCom && `Reg. Com. ${company.regCom}`]
    .filter(Boolean)
    .join(", ");
}

export function LegalLinks() {
  const line = companyLine();
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
      <span>© {new Date().getFullYear()} Gluten Morgen{line && ` · ${line}`}</span>
      <Link to="/termeni" className="hover:text-accent">Termeni și condiții</Link>
      <Link to="/confidentialitate" className="hover:text-accent">Politica de confidențialitate</Link>
      <Link to="/cookies" className="hover:text-accent">Politica de cookies</Link>
      <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="rounded border border-current px-2 py-1 font-semibold hover:text-accent">ANPC – SAL</a>
      <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="rounded border border-current px-2 py-1 font-semibold hover:text-accent">SOL</a>
    </div>
  );
}

export function ConsentCheckbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex items-start gap-2 text-xs text-muted-foreground md:col-span-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        {label ?? (
          <>
            Sunt de acord cu <Link to="/termeni" className="underline">Termenii</Link> și cu prelucrarea datelor conform{" "}
            <Link to="/confidentialitate" className="underline">Politicii de confidențialitate</Link>. *
          </>
        )}
      </span>
    </label>
  );
}
