import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { cart, openState, useCart, useCartOpen, whatsappOrderUrl } from "@/lib/cart";
import { track } from "@/lib/track";

export function QtyStepper({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border" role="group" aria-label={`Cantitate ${label}`}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label="Scade" className="h-9 w-9 text-lg text-primary">−</button>
      <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Crește" className="h-9 w-9 text-lg text-primary">+</button>
    </div>
  );
}

export function CartButton({ className = "" }: { className?: string }) {
  const { count } = useCart();
  return (
    <button
      type="button"
      onClick={() => openState.set(true)}
      aria-label={`Coșul tău, ${count} produse`}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center text-primary ${className}`}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const open = useCartOpen();
  const { items, subtotal } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && openState.set(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => openState.set(false)}
        className={`absolute inset-0 bg-foreground/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Coșul tău"
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-background shadow-[var(--shadow-lift)] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-3xl text-primary">Coșul tău</h2>
          <button onClick={() => openState.set(false)} aria-label="Închide coșul" className="h-10 w-10 text-2xl text-primary">×</button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-muted-foreground">Coșul este gol.</p>
            <button onClick={() => openState.set(false)} className="rounded-full border border-border px-6 py-3 text-sm font-bold text-primary">
              Continuă cumpărăturile
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((i) => (
                <li key={i.slug} className="flex gap-4 py-4">
                  <img src={i.image} alt={i.name} className="h-16 w-16 shrink-0 rounded-sm object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg leading-tight text-primary">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.weight} · {i.price} lei</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QtyStepper value={i.qty} label={i.name} onChange={(n) => cart.setQty(i.slug, n)} />
                      <button
                        onClick={() => { cart.remove(i.slug); track("remove_from_cart", i.slug); }}
                        className="text-xs text-muted-foreground underline hover:text-destructive"
                      >
                        Elimină
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">{i.price * i.qty} lei</p>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-border p-5">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>{subtotal} lei</span></div>
              <div className="flex justify-between text-sm text-muted-foreground"><span>Ridicare / Livrare</span><span>se alege la pasul următor</span></div>
              <div className="flex justify-between font-display text-2xl text-primary"><span>Total</span><span>{subtotal} lei</span></div>
              <Link
                to="/comanda"
                onClick={() => { openState.set(false); track("checkout_started"); }}
                className="block rounded-full bg-primary py-4 text-center text-sm font-bold tracking-wide text-primary-foreground uppercase"
              >
                Continuă comanda
              </Link>
              <a
                href={whatsappOrderUrl(items)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click")}
                className="block rounded-full border border-border py-3 text-center text-sm font-bold text-primary"
              >
                Comandă prin WhatsApp
              </a>
              <button onClick={() => openState.set(false)} className="w-full text-center text-sm text-muted-foreground underline">
                Continuă cumpărăturile
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
