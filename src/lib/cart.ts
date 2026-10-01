import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { products, contact } from "@/components/bakery/data";
import { supabase } from "@/integrations/supabase/client";

export type CartLine = { slug: string; qty: number };
const KEY = "gm_cart";
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;
const EMPTY: CartLine[] = [];

function read(): CartLine[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    cache = [];
  }
  return cache!;
}
function write(lines: CartLine[]) {
  cache = lines.filter((l) => l.qty > 0);
  localStorage.setItem(KEY, JSON.stringify(cache));
  listeners.forEach((l) => l());
}

export const cart = {
  add(slug: string, qty = 1) {
    const lines = [...read()];
    const ex = lines.find((l) => l.slug === slug);
    if (ex) ex.qty = Math.min(20, ex.qty + qty);
    else lines.push({ slug, qty });
    write(lines.map((l) => ({ ...l })));
    openState.set(true);
  },
  setQty(slug: string, qty: number) {
    write(read().map((l) => (l.slug === slug ? { ...l, qty: Math.max(0, Math.min(20, qty)) } : l)));
  },
  remove(slug: string) {
    write(read().filter((l) => l.slug !== slug));
  },
  clear() {
    write([]);
  },
};

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useCart() {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  const items = lines
    .map((l) => {
      const p = products.find((x) => x.slug === l.slug);
      return p ? { slug: p.slug, name: p.name, price: p.price, image: p.image, weight: p.weight, qty: l.qty } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { items, subtotal, count };
}

/* drawer open state */
const openListeners = new Set<() => void>();
let open = false;
export const openState = {
  set(v: boolean) {
    open = v;
    openListeners.forEach((l) => l());
  },
};
export function useCartOpen() {
  return useSyncExternalStore(
    (fn) => {
      openListeners.add(fn);
      return () => openListeners.delete(fn);
    },
    () => open,
    () => false,
  );
}

/* live stock from database (admin-editable) */
export function useStock() {
  return useQuery({
    queryKey: ["product_stock"],
    queryFn: async () => {
      const { data } = await supabase.from("product_stock").select("slug, stock");
      return Object.fromEntries((data ?? []).map((r) => [r.slug, r.stock])) as Record<string, number>;
    },
    staleTime: 60_000,
  });
}

export function whatsappOrderUrl(
  items: { name: string; qty: number; price: number }[],
  extra: { date?: string; slot?: string; name?: string; method?: string } = {},
) {
  const lines = items.length
    ? items.map((i) => `- ${i.qty} × ${i.name} (${i.price * i.qty} lei)`).join("\n")
    : "- ";
  const msg = `Salut! Vreau să comand:\n\n${lines}\n\nData: ${extra.date ?? ""}\nOra: ${extra.slot ?? ""}\nNume: ${extra.name ?? ""}\nLivrare/Ridicare: ${extra.method ?? ""}\n\nMulțumesc!`;
  return `${contact.whatsapp}?text=${encodeURIComponent(msg)}`;
}
