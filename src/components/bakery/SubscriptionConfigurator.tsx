import { useState } from "react";
import { products } from "./data";
import { subscriptionPlans, subscriptionUnitPrice, formatLei } from "@/lib/pricing";

const DAYS = ["Luni", "Marți", "Miercuri", "Joi", "Vineri"];
const WEEKS_PER_MONTH = 4.33;

/** Lets visitors pick days + bread and see the monthly saving instantly. */
export function SubscriptionConfigurator() {
  const breads = products.filter((p) => !p.preorderOnly);
  const [days, setDays] = useState<string[]>(["Marți", "Vineri"]);
  const [slug, setSlug] = useState(breads[0]!.slug);
  const [qty, setQty] = useState(1);
  const bread = breads.find((b) => b.slug === slug)!;
  const perWeek = days.length * qty;
  const discount = days.length >= 2 ? (qty >= 2 ? 20 : 15) : 10;
  const plan = subscriptionPlans.find((p) => p.discount === discount);
  const full = bread.price * perWeek * WEEKS_PER_MONTH;
  const paid = subscriptionUnitPrice(bread.price, discount) * perWeek * WEEKS_PER_MONTH;
  const toggle = (d: string) => setDays((x) => (x.includes(d) ? x.filter((y) => y !== d) : [...x, d]));
  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary"}`;

  return (
    <div className="mt-10 rounded-sm border border-border bg-card p-6 md:p-8">
      <h2 className="font-display text-3xl">Configurează-ți abonamentul</h2>
      <p className="mt-2 text-sm text-muted-foreground">Alege zilele și pâinea — vezi imediat cât economisești.</p>
      <p className="mt-6 text-xs tracking-[0.16em] text-muted-foreground uppercase">Zile</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {DAYS.map((d) => <button key={d} type="button" className={chip(days.includes(d))} onClick={() => toggle(d)}>{d}</button>)}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">Sortiment
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className="rounded-sm border border-border bg-background px-3 py-2.5">
            {breads.map((b) => <option key={b.slug} value={b.slug}>{b.name} — {b.price} lei</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">Bucăți pe zi
          <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="rounded-sm border border-border bg-background px-3 py-2.5">
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
      {days.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Alege cel puțin o zi.</p>
      ) : (
        <div className="mt-6 grid gap-2 border-t border-border pt-5 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Plan</span><span>{plan?.name} (−{discount}%)</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Preț pe bucată</span><span>{formatLei(subscriptionUnitPrice(bread.price, discount))}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Pe lună (aprox.)</span><span>{formatLei(paid)}</span></div>
          <div className="flex justify-between font-display text-2xl text-primary"><span>Economisești</span><span>{formatLei(full - paid)} / lună</span></div>
          <p className="text-xs text-muted-foreground">Completează formularul de mai jos cu aceste alegeri și te sunăm pentru confirmare.</p>
        </div>
      )}
    </div>
  );
}
