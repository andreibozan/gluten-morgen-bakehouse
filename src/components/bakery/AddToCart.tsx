import { useState } from "react";
import { cart, useStock } from "@/lib/cart";
import { track } from "@/lib/track";
import { QtyStepper } from "./CartDrawer";

export function Availability({ slug }: { slug: string }) {
  const { data } = useStock();
  if (!data) return null;
  const n = data[slug] ?? 0;
  return n > 0 ? (
    <p className="text-xs font-semibold text-olive">● {n} disponibile azi</p>
  ) : (
    <p className="text-xs font-semibold text-destructive">● Epuizat azi — poți precomanda</p>
  );
}

export function AddToCart({ slug, name, compact = false }: { slug: string; name: string; compact?: boolean }) {
  const [qty, setQty] = useState(1);
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "flex-wrap"}`}>
      <QtyStepper value={qty} label={name} onChange={(n) => setQty(Math.max(1, Math.min(20, n)))} />
      <button
        type="button"
        onClick={() => { cart.add(slug, qty); track("add_to_cart", slug); setQty(1); }}
        className="flex-1 rounded-full bg-primary px-5 py-3 text-xs font-bold tracking-wide whitespace-nowrap text-primary-foreground uppercase transition-all hover:bg-primary/90"
      >
        Adaugă în coș
      </button>
    </div>
  );
}
