import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/track";

type Field = { name: string; label: string; type?: string; options?: string[] };

export function RequestForm({
  kind,
  fields,
  submitLabel,
}: {
  kind: "abonament" | "eveniment";
  fields: Field[];
  submitLabel: string;
}) {
  const [v, setV] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState("");
  const set = (k: string, val: string) => setV((p) => ({ ...p, [k]: val }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = (v.name ?? "").trim();
    const phone = (v.phone ?? "").trim();
    if (name.length < 2) return setError("Completează numele.");
    if (!/^[0-9+ ]{10,15}$/.test(phone)) return setError("Telefon invalid.");
    setError("");
    setSending(true);
    const number = "GM-" + Date.now().toString(36).toUpperCase().slice(-6);
    const details = fields
      .filter((f) => v[f.name])
      .map((f) => `${f.label}: ${v[f.name]}`)
      .join(" · ")
      .slice(0, 500);
    const { error: err } = await supabase.from("orders").insert({
      customer_name: name.slice(0, 100),
      phone: phone.slice(0, 20),
      email: (v.email ?? "").trim().slice(0, 255) || null,
      delivery_method: kind,
      note: [details, (v.note ?? "").trim()].filter(Boolean).join(" — ").slice(0, 500) || null,
      items: [],
      total: 0,
      order_number: number,
    });
    setSending(false);
    if (err) return setError("Nu am putut trimite cererea. Încearcă din nou sau sună-ne.");
    track("order_submit", kind);
    setDone(number);
  }

  if (done)
    return (
      <div className="rounded-sm border border-border bg-card p-8 text-center">
        <p className="eyebrow">Cerere trimisă</p>
        <h3 className="mt-2 font-display text-3xl">Mulțumim!</h3>
        <p className="mt-3 text-muted-foreground">
          Numărul cererii: <strong>{done}</strong>. Te sunăm în cel mai scurt timp pentru confirmare.
        </p>
      </div>
    );

  const input = "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none";
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-sm border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      <label className="grid gap-1 text-sm">Nume *<input className={input} maxLength={100} onChange={(e) => set("name", e.target.value)} /></label>
      <label className="grid gap-1 text-sm">Telefon *<input className={input} type="tel" maxLength={15} onChange={(e) => set("phone", e.target.value)} /></label>
      <label className="grid gap-1 text-sm md:col-span-2">Email<input className={input} type="email" maxLength={255} onChange={(e) => set("email", e.target.value)} /></label>
      {fields.map((f) => (
        <label key={f.name} className="grid gap-1 text-sm">
          {f.label}
          {f.options ? (
            <select className={input} defaultValue="" onChange={(e) => set(f.name, e.target.value)}>
              <option value="" disabled>Alege…</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input className={input} type={f.type ?? "text"} maxLength={100} onChange={(e) => set(f.name, e.target.value)} />
          )}
        </label>
      ))}
      <label className="grid gap-1 text-sm md:col-span-2">Detalii
        <textarea className={input} rows={3} maxLength={400} onChange={(e) => set("note", e.target.value)} />
      </label>
      {error && <p className="text-sm text-destructive md:col-span-2">{error}</p>}
      <button disabled={sending} className="rounded-full bg-primary px-6 py-4 text-xs font-bold tracking-wide text-primary-foreground uppercase hover:bg-primary/90 disabled:opacity-60 md:col-span-2">
        {sending ? "Se trimite…" : submitLabel}
      </button>
    </form>
  );
}
