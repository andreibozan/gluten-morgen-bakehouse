import { createFileRoute, Link } from "@tanstack/react-router";
import { ConsentCheckbox } from "@/components/bakery/LegalLinks";
import { useEffect, useMemo, useState } from "react";
import { contact } from "@/components/bakery/data";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/track";
import { cart, openState, useCart, whatsappOrderUrl } from "@/lib/cart";
import { QtyStepper } from "@/components/bakery/CartDrawer";
import { deliveryConfig } from "@/components/bakery/config";
import { lineTotal, ROLL_SLUG } from "@/lib/pricing";

export const Route = createFileRoute("/comanda")({
  component: OrderPage,
  validateSearch: (search: Record<string, unknown>) => ({
    produs: typeof search["produs"] === "string" ? (search["produs"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Comandă pâine cu maia — Gluten Morgen Deva" },
      { name: "description", content: "Finalizează comanda de pâine cu maia: ridicare din Deva sau livrare în județul Hunedoara, cu 24h înainte, luni–vineri." },
      { property: "og:title", content: "Comandă pâine cu maia — Gluten Morgen Deva" },
      { property: "og:description", content: "Ridicare din Deva sau livrare în județul Hunedoara. Comandă cu 24h înainte, luni–vineri." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const fmt = (d: Date) => d.toLocaleDateString("ro-RO", { weekday: "long", day: "numeric", month: "long" });
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function availableDates() {
  const out: Date[] = [];
  const min = new Date(Date.now() + deliveryConfig.leadHours * 3_600_000);
  const d = new Date(min);
  d.setHours(0, 0, 0, 0);
  if (d < min) d.setDate(d.getDate() + 1);
  while (out.length < 10) {
    if (deliveryConfig.days.includes(d.getDay())) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function OrderPage() {
  const { produs } = Route.useSearch();
  const { items, subtotal } = useCart();
  const [method, setMethod] = useState<"ridicare" | "livrare">("ridicare");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({ customer_name: "", phone: "", email: "", address: "", note: "" });
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<null | { number: string; items: typeof items; total: number; date: string; slot: string; method: string }>(null);
  const [error, setError] = useState<string | null>(null);
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    track("page_view");
    track("checkout_started");
    setDates(availableDates());
    if (produs) cart.add(produs, 1), openState.set(false);
  }, [produs]);

  const dateLabel = useMemo(() => {
    const d = dates.find((x) => iso(x) === date);
    return d ? fmt(d) : "";
  }, [date, dates]);
  const total = subtotal;
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (items.length === 0) return setError("Coșul este gol.");
    if (!consent) return setError("Bifează acordul cu termenii și prelucrarea datelor.");
    if (!date) return setError("Alege data.");
    if (!slot) return setError("Alege intervalul orar.");
    if (form.customer_name.trim().length < 2) return setError("Introdu numele tău.");
    if (!/^[0-9 +().-]{9,20}$/.test(form.phone.trim())) return setError("Introdu un număr de telefon valid.");
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Email invalid.");
    if (method === "livrare" && form.address.trim().length < 5) return setError("Introdu adresa de livrare.");

    const number = "GM-" + Date.now().toString(36).toUpperCase().slice(-6);
    setSending(true);
    const { error: err } = await supabase.from("orders").insert({
      customer_name: form.customer_name.trim().slice(0, 100),
      phone: form.phone.trim().slice(0, 20),
      email: form.email.trim().slice(0, 255) || null,
      delivery_method: method,
      address: method === "livrare" ? form.address.trim().slice(0, 300) : null,
      note: form.note.trim().slice(0, 500) || null,
      items: items.map(({ slug, name, price, qty }) => ({ slug, name, price, qty, line_total: lineTotal(slug, price, qty) })),
      total,
      order_date: date,
      time_slot: slot,
      order_number: number,
    });
    setSending(false);
    if (err) return setError("Comanda nu a putut fi trimisă. Sună-ne la " + contact.phone + ".");
    track("order_submitted");
    setDone({ number, items, total, date: dateLabel, slot, method });
    cart.clear();
    window.scrollTo({ top: 0 });
  }

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20">
        <p className="eyebrow text-center">Mulțumim</p>
        <h1 className="text-center font-display text-4xl text-primary">Comanda ta a fost înregistrată! 🍞</h1>
        <div className="mt-8 space-y-3 rounded-sm border border-border bg-card p-6 text-sm">
          <Row k="Număr comandă" v={done.number} />
          <Row k="Data" v={done.date} />
          <Row k="Interval" v={done.slot} />
          <Row k="Preluare" v={done.method === "livrare" ? `Livrare la ${form.address}` : `Ridicare din ${contact.addressFull}`} />
          <ul className="border-t border-border pt-3">
            {done.items.map((i) => (
              <li key={i.slug} className="flex justify-between py-1"><span>{i.qty} × {i.name}</span><span>{lineTotal(i.slug, i.price, i.qty)} lei</span></li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-border pt-3 font-display text-2xl text-primary"><span>Total</span><span>{done.total} lei</span></div>
          {done.method === "livrare" && <p className="text-xs text-muted-foreground">Taxa de livrare se confirmă telefonic.</p>}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">Te sunăm la {form.phone} pentru confirmare.</p>
        <Link to="/" className="mt-8 block rounded-full bg-primary py-4 text-center text-sm font-bold text-primary-foreground">Înapoi la pagina principală</Link>
      </main>
    );
  }

  const choice = (active: boolean) =>
    `rounded-sm border px-4 py-3 text-left text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`;

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-accent">← Înapoi la produse</Link>
      <p className="eyebrow mt-6">Comandă</p>
      <h1 className="font-display text-4xl text-primary sm:text-5xl">Finalizează comanda</h1>
      <p className="mt-3 text-muted-foreground">Comenzile se fac cu cel puțin 24h înainte, de luni până vineri.</p>

      <form onSubmit={submit} className="mt-10 space-y-8" noValidate>
        <section className="rounded-sm border border-border bg-card p-5">
          <h2 className="font-display text-2xl text-primary">Coșul tău</h2>
          {items.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Coșul este gol. <Link to="/" hash="produse" className="underline">Alege produse</Link></p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {items.map((i) => (
                <li key={i.slug} className="flex items-center gap-3 py-3">
                  <img src={i.image} alt={i.name} className="h-12 w-12 shrink-0 rounded-sm object-cover" />
                  <p className="min-w-0 flex-1 truncate text-sm font-medium">{i.name}</p>
                  <QtyStepper value={i.qty} label={i.name} onChange={(n) => cart.setQty(i.slug, n)} />
                  <span className="w-16 shrink-0 text-right text-sm">{lineTotal(i.slug, i.price, i.qty)} lei</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-muted-foreground">Chifle: 5 lei/buc. sau 17 lei la fiecare 4 bucăți.</p>
        </section>

        <Step n={1} title="Ridicare sau livrare">
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className={choice(method === "ridicare")} onClick={() => setMethod("ridicare")}>
              <strong className="block">Ridicare personală</strong>
              <span className="opacity-80">{contact.addressFull}</span>
            </button>
            <button type="button" className={choice(method === "livrare")} onClick={() => setMethod("livrare")}>
              <strong className="block">Livrare</strong>
              <span className="opacity-80">{deliveryConfig.area} · taxa se confirmă telefonic</span>
            </button>
          </div>
        </Step>

        <Step n={2} title="Alege data">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {dates.map((d) => (
              <button key={iso(d)} type="button" onClick={() => setDate(iso(d))} className={`${choice(date === iso(d))} shrink-0 capitalize`}>
                {fmt(d)}
              </button>
            ))}
          </div>
        </Step>

        <Step n={3} title="Alege intervalul orar">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {deliveryConfig.slots.map((s) => (
              <button key={s} type="button" onClick={() => setSlot(s)} className={choice(slot === s)}>{s}</button>
            ))}
          </div>
        </Step>

        <Step n={4} title="Datele tale">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nume" value={form.customer_name} onChange={(v) => set("customer_name", v)} max={100} autoComplete="name" />
            <Field label="Telefon" type="tel" value={form.phone} onChange={(v) => set("phone", v)} max={20} autoComplete="tel" />
            <Field label="Email (opțional)" type="email" value={form.email} onChange={(v) => set("email", v)} max={255} autoComplete="email" />
            {method === "livrare" && <Field label="Adresă de livrare" value={form.address} onChange={(v) => set("address", v)} max={300} autoComplete="street-address" />}
            <label className="text-sm sm:col-span-2">
              Observații comandă
              <textarea maxLength={500} rows={3} value={form.note} onChange={(e) => set("note", e.target.value)} className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2" />
            </label>
          </div>
        </Step>

        <Step n={5} title="Sumar">
          <div className="space-y-2 text-sm">
            <Row k="Preluare" v={method === "livrare" ? "Livrare" : "Ridicare personală"} />
            <Row k="Data" v={dateLabel || "—"} />
            <Row k="Interval" v={slot || "—"} />
            <Row k="Subtotal" v={`${subtotal} lei`} />
            {method === "livrare" && <Row k="Livrare" v="se confirmă telefonic" />}
            <div className="flex justify-between border-t border-border pt-3 font-display text-2xl text-primary"><span>Total</span><span>{total} lei</span></div>
          </div>
        </Step>

        <ConsentCheckbox checked={consent} onChange={setConsent} />
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

        <button type="submit" disabled={sending} className="w-full rounded-full bg-primary py-4 text-sm font-bold tracking-wide text-primary-foreground uppercase disabled:opacity-60">
          {sending ? "Se trimite..." : "Plasează comanda"}
        </button>
        <a
          href={whatsappOrderUrl(items, { date: dateLabel, slot, name: form.customer_name, method: method === "livrare" ? "Livrare" : "Ridicare" })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click")}
          className="block rounded-full border border-border py-4 text-center text-sm font-bold text-primary"
        >
          Comandă prin WhatsApp
        </a>
      </form>
    </main>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-sm border border-border bg-card p-5">
      <h2 className="mb-4 flex items-baseline gap-3 font-display text-2xl text-primary">
        <span className="text-sm font-sans font-bold text-accent">0{n}</span>{title}
      </h2>
      {children}
    </section>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between gap-4"><span className="text-muted-foreground">{k}</span><span className="text-right">{v}</span></div>;
}
function Field({ label, value, onChange, type = "text", max, autoComplete }: { label: string; value: string; onChange: (v: string) => void; type?: string; max: number; autoComplete?: string }) {
  return (
    <label className="text-sm">
      {label}
      <input type={type} maxLength={max} value={value} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2.5" />
    </label>
  );
}
