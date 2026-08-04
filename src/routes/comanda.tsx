import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { products, contact } from "@/components/bakery/data";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/track";

export const Route = createFileRoute("/comanda")({
  component: OrderPage,
  head: () => ({
    meta: [
      { title: "Comandă pâine cu maia — Gluten Morgen Deva" },
      {
        name: "description",
        content:
          "Trimite comanda ta de pâine cu maia: alege produsele, ridicare din brutărie sau livrare în Deva. Confirmăm telefonic în aceeași zi.",
      },
      { property: "og:title", content: "Comandă pâine cu maia — Gluten Morgen Deva" },
      {
        property: "og:description",
        content: "Alege produsele, ridicare din brutărie sau livrare în Deva. Confirmare telefonică în aceeași zi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function OrderPage() {
  const navigate = useNavigate();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    delivery_method: "ridicare",
    address: "",
    note: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    track("page_view");
    const slug = new URLSearchParams(window.location.search).get("produs");
    if (slug && products.some((p) => p.slug === slug)) setQty({ [slug]: 1 });
  }, []);

  const items = useMemo(
    () =>
      products
        .filter((p) => (qty[p.slug] ?? 0) > 0)
        .map((p) => ({ slug: p.slug, name: p.name, price: p.price, qty: qty[p.slug]! })),
    [qty],
  );
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (items.length === 0) return setError("Alege cel puțin un produs.");
    if (form.customer_name.trim().length < 2) return setError("Introdu numele tău.");
    if (!/^[0-9 +().-]{9,20}$/.test(form.phone.trim())) return setError("Introdu un număr de telefon valid.");
    if (form.delivery_method === "livrare" && form.address.trim().length < 5)
      return setError("Introdu adresa de livrare.");

    setSending(true);
    const { error: err } = await supabase.from("orders").insert({
      customer_name: form.customer_name.trim().slice(0, 100),
      phone: form.phone.trim().slice(0, 20),
      email: form.email.trim().slice(0, 255) || null,
      delivery_method: form.delivery_method,
      address: form.address.trim().slice(0, 300) || null,
      note: form.note.trim().slice(0, 500) || null,
      items,
      total,
    });
    setSending(false);
    if (err) return setError("Comanda nu a putut fi trimisă. Sună-ne la " + contact.phone + ".");
    track("order_submitted");
    setDone(true);
  }

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <p className="eyebrow">Mulțumim</p>
        <h1 className="font-display text-4xl text-primary">Comanda ta a fost trimisă</h1>
        <p className="mt-4 text-muted-foreground">
          Te sunăm în cel mai scurt timp la {form.phone} pentru confirmare. Total estimat: {total} lei.
        </p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-8 rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          Înapoi la pagina principală
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-accent">
        ← Înapoi
      </Link>
      <p className="eyebrow mt-6">Comandă</p>
      <h1 className="font-display text-4xl text-primary sm:text-5xl">Comandă pâinea ta</h1>
      <p className="mt-3 text-muted-foreground">
        Comenzile plasate până la ora 18:00 sunt pregătite pentru dimineața următoare. Ridicare din {contact.addressFull} sau
        livrare locală.
      </p>

      <form onSubmit={submit} className="mt-10 space-y-8">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-2xl text-primary">Produse</h2>
          <ul className="mt-4 divide-y divide-border">
            {products.map((p) => (
              <li key={p.slug} className="flex items-center gap-4 py-3">
                <img src={p.image} alt={p.name} className="h-14 w-14 rounded-md object-cover" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {p.price} lei · {p.weight}
                    {p.stock === 0 ? " · stoc epuizat azi" : ""}
                  </p>
                </div>
                <input
                  type="number"
                  min={0}
                  max={20}
                  inputMode="numeric"
                  aria-label={`Cantitate ${p.name}`}
                  value={qty[p.slug] ?? 0}
                  onChange={(e) => setQty((q) => ({ ...q, [p.slug]: Math.max(0, Math.min(20, Number(e.target.value))) }))}
                  className="w-16 rounded-md border border-border bg-background px-2 py-2 text-center"
                />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right font-display text-2xl text-primary">Total: {total} lei</p>
        </section>

        <section className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
          <h2 className="font-display text-2xl text-primary sm:col-span-2">Datele tale</h2>
          <label className="text-sm">
            Nume și prenume
            <input
              required
              maxLength={100}
              value={form.customer_name}
              onChange={(e) => set("customer_name", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Telefon
            <input
              required
              type="tel"
              maxLength={20}
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Email (opțional)
            <input
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Mod de preluare
            <select
              value={form.delivery_method}
              onChange={(e) => set("delivery_method", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
            >
              <option value="ridicare">Ridicare din brutărie</option>
              <option value="livrare">Livrare în Deva</option>
            </select>
          </label>
          {form.delivery_method === "livrare" && (
            <label className="text-sm sm:col-span-2">
              Adresa de livrare
              <input
                maxLength={300}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              />
            </label>
          )}
          <label className="text-sm sm:col-span-2">
            Mențiuni (opțional)
            <textarea
              maxLength={500}
              rows={3}
              value={form.note}
              onChange={(e) => set("note", e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
            />
          </label>
        </section>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-primary px-6 py-4 text-primary-foreground disabled:opacity-60"
        >
          {sending ? "Se trimite..." : "Trimite comanda"}
        </button>
      </form>
    </main>
  );
}
