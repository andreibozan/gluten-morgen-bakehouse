import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/components/bakery/data";
import { claimAdmin } from "@/lib/admin.functions";

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  email: string | null;
  delivery_method: string;
  address: string | null;
  note: string | null;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: string;
  order_date: string | null;
  time_slot: string | null;
  order_number: string | null;
};

type EventRow = {
  id: string;
  created_at: string;
  type: string;
  path: string | null;
  product_slug: string | null;
  session_id: string | null;
};

const EVENT_LABELS: Record<string, string> = {
  page_view: "Vizite pagină",
  product_view: "Vizualizări produs",
  order_click: "Click Comandă",
  whatsapp_click: "Click WhatsApp",
  phone_click: "Click telefon",
  instagram_click: "Click Instagram",
  newsletter_signup: "Abonări newsletter",
  google_maps_click: "Click Google Maps",
  weekly_drop_click: "Click Weekly Drop",
  subscription_interest: "Interes abonament",
  b2b_lead: "Lead B2B",
  order_submitted: "Comenzi trimise",
  add_to_cart: "Adăugări în coș",
  remove_from_cart: "Eliminări din coș",
  checkout_started: "Checkout început",
};

const STATUSES = ["nou", "confirmat", "pregătit", "finalizat", "anulat"];

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Panou administrare — Gluten Morgen" },
      { name: "description", content: "Comenzi, conversii și trafic pentru brutăria Gluten Morgen." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AdminPage() {
  const navigate = useNavigate();
  const [days, setDays] = useState(7);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return;

      let { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      if (!roles?.some((r) => r.role === "admin")) {
        try {
          const res = await claimAdmin();
          if (res.granted) roles = [{ role: "admin" as const }];
        } catch {
          /* ignoră: rămâne fără drepturi */
        }
      }
      const admin = !!roles?.some((r) => r.role === "admin");
      if (!active) return;
      setIsAdmin(admin);

      if (admin) {
        const since = new Date(Date.now() - days * 86400000).toISOString();
        const [o, e] = await Promise.all([
          supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(200),
          supabase.from("events").select("*").gte("created_at", since).order("created_at", { ascending: false }).limit(5000),
        ]);
        if (!active) return;
        setOrders((o.data as unknown as Order[]) ?? []);
        setEvents((e.data as EventRow[]) ?? []);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [days]);

  const stats = useMemo(() => {
    const byType: Record<string, number> = {};
    const byProduct: Record<string, number> = {};
    const byDay: Record<string, number> = {};
    const sessions = new Set<string>();
    for (const ev of events) {
      byType[ev.type] = (byType[ev.type] ?? 0) + 1;
      if (ev.session_id) sessions.add(ev.session_id);
      if (ev.type === "product_view" && ev.product_slug)
        byProduct[ev.product_slug] = (byProduct[ev.product_slug] ?? 0) + 1;
      const d = ev.created_at.slice(0, 10);
      if (ev.type === "page_view") byDay[d] = (byDay[d] ?? 0) + 1;
    }
    const views = byType["page_view"] ?? 0;
    const conversions =
      (byType["order_submitted"] ?? 0) + (byType["whatsapp_click"] ?? 0) + (byType["phone_click"] ?? 0);
    return {
      byType,
      sessions: sessions.size,
      topProducts: Object.entries(byProduct).sort((a, b) => b[1] - a[1]).slice(0, 6),
      byDay: Object.entries(byDay).sort((a, b) => a[0].localeCompare(b[0])),
      rate: views ? ((conversions / views) * 100).toFixed(1) : "0.0",
    };
  }, [events]);

  const revenue = orders.filter((o) => o.status !== "anulat").reduce((s, o) => s + Number(o.total), 0);

  async function setStatus(id: string, status: string) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await supabase.from("orders").update({ status }).eq("id", id);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (loading) return <main className="p-10 text-muted-foreground">Se încarcă panoul...</main>;

  if (isAdmin === false)
    return (
      <main className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-3xl text-primary">Acces restricționat</h1>
        <p className="mt-3 text-muted-foreground">Contul tău nu are drepturi de administrator.</p>
        <button onClick={signOut} className="mt-6 rounded-full border border-border px-5 py-2">
          Ieși din cont
        </button>
      </main>
    );

  const maxDay = Math.max(1, ...stats.byDay.map(([, v]) => v));

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Administrare</p>
          <h1 className="font-display text-4xl text-primary">Panou Gluten Morgen</h1>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            aria-label="Perioadă"
          >
            <option value={7}>Ultimele 7 zile</option>
            <option value={30}>Ultimele 30 zile</option>
            <option value={90}>Ultimele 90 zile</option>
          </select>
          <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm">
            Site
          </Link>
          <button onClick={signOut} className="rounded-full border border-border px-4 py-2 text-sm">
            Ieșire
          </button>
        </div>
      </div>

      <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card label="Comenzi totale" value={String(orders.length)} />
        <Card label="Valoare comenzi" value={`${revenue.toFixed(0)} lei`} />
        <Card label="Vizitatori unici" value={String(stats.sessions)} />
        <Card label="Rată conversie" value={`${stats.rate}%`} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-2xl text-primary">Evenimente de conversie</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {Object.keys(EVENT_LABELS).map((k) => (
              <li key={k} className="flex items-center justify-between border-b border-border/60 pb-2">
                <span>{EVENT_LABELS[k]}</span>
                <span className="font-medium text-primary">{stats.byType[k] ?? 0}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-2xl text-primary">Vizite pe zi</h2>
          <div className="mt-6 flex h-40 items-end gap-1">
            {stats.byDay.length === 0 && <p className="text-sm text-muted-foreground">Încă nu există date.</p>}
            {stats.byDay.map(([d, v]) => (
              <div key={d} className="flex flex-1 flex-col items-center gap-1" title={`${d}: ${v}`}>
                <div className="w-full rounded-t bg-accent" style={{ height: `${(v / maxDay) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground">{d.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-2xl text-primary">Produse cele mai vizualizate</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {stats.topProducts.length === 0 && <li className="text-muted-foreground">Încă nu există date.</li>}
          {stats.topProducts.map(([slug, n]) => (
            <li key={slug} className="flex items-center justify-between border-b border-border/60 pb-2">
              <span>{slug}</span>
              <span className="font-medium text-primary">{n}</span>
            </li>
          ))}
        </ul>
      </section>

      <StockEditor />

      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-2xl text-primary">Comenzi</h2>
        {orders.length === 0 && <p className="mt-3 text-sm text-muted-foreground">Nu există comenzi încă.</p>}
        <div className="mt-4 space-y-4">
          {orders.map((o) => (
            <article key={o.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {o.customer_name} · <a href={`tel:${o.phone}`} className="text-accent">{o.phone}</a>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {o.order_number ? `${o.order_number} · ` : ""}
                    {o.order_date ? `Pentru ${new Date(o.order_date).toLocaleDateString("ro-RO")} ${o.time_slot ?? ""} · ` : ""}
                    plasată {new Date(o.created_at).toLocaleString("ro-RO")} · {o.delivery_method}
                    {o.address ? ` · ${o.address}` : ""}
                    {o.email ? ` · ${o.email}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl text-primary">{Number(o.total).toFixed(0)} lei</span>
                  <select
                    value={o.status}
                    onChange={(e) => setStatus(o.id, e.target.value)}
                    aria-label="Status comandă"
                    className="rounded-md border border-border bg-background px-2 py-1 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <ul className="mt-2 text-sm text-muted-foreground">
                {(o.items ?? []).map((it, i) => (
                  <li key={i}>
                    {it.qty} × {it.name} — {it.price * it.qty} lei
                  </li>
                ))}
              </ul>
              {o.note && <p className="mt-2 text-sm italic text-muted-foreground">„{o.note}”</p>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl text-primary">{value}</p>
    </div>
  );
}

function StockEditor() {
  const [stock, setStock] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState<string | null>(null);
  useEffect(() => {
    supabase.from("product_stock").select("slug, stock").then(({ data }) =>
      setStock(Object.fromEntries((data ?? []).map((r) => [r.slug, r.stock]))),
    );
  }, []);
  async function save(slug: string) {
    const { error } = await supabase
      .from("product_stock")
      .upsert({ slug, stock: Math.max(0, stock[slug] ?? 0), updated_at: new Date().toISOString() });
    setSaved(error ? "Eroare la salvare" : `Salvat: ${slug}`);
  }
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-5">
      <h2 className="font-display text-2xl text-primary">Disponibilitate azi</h2>
      <p className="text-sm text-muted-foreground">Numărul de bucăți afișat pe site. 0 = epuizat.</p>
      <ul className="mt-4 divide-y divide-border">
        {products.map((p) => (
          <li key={p.slug} className="flex items-center gap-3 py-2">
            <span className="min-w-0 flex-1 truncate text-sm">{p.name}</span>
            <input
              type="number"
              min={0}
              aria-label={`Stoc ${p.name}`}
              value={stock[p.slug] ?? 0}
              onChange={(e) => setStock((s) => ({ ...s, [p.slug]: Number(e.target.value) }))}
              className="w-20 rounded-md border border-border bg-background px-2 py-1 text-center"
            />
            <button onClick={() => save(p.slug)} className="rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground">
              Salvează
            </button>
          </li>
        ))}
      </ul>
      {saved && <p className="mt-2 text-xs text-olive">{saved}</p>}
    </section>
  );
}
