export const ROLL_SLUG = "chifle-artizanale";
export const ROLL_PACK_SIZE = 4;
export const ROLL_PACK_PRICE = 17;

/** Pack pricing applies to each complete group of four rolls; extras retain the unit price. */
export function lineTotal(slug: string, unitPrice: number, qty: number): number {
  if (slug !== ROLL_SLUG) return unitPrice * qty;
  return Math.floor(qty / ROLL_PACK_SIZE) * ROLL_PACK_PRICE + (qty % ROLL_PACK_SIZE) * unitPrice;
}

export const subscriptionPlans = [
  { name: "Săptămânal", discount: 10, text: "O pâine la alegere, în fiecare săptămână, în ziua preferată." },
  { name: "De două ori pe săptămână", discount: 15, text: "Două livrări sau ridicări pe săptămână — pentru familii." },
  { name: "Familie", discount: 20, text: "Pâine + chifle artizanale, pentru mic dejunul de weekend." },
] as const;

export function subscriptionUnitPrice(price: number, discount: number): number {
  return Math.round(price * (100 - discount)) / 100;
}

export function formatLei(value: number): string {
  return `${new Intl.NumberFormat("ro-RO", { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(value)} lei`;
}
/* Starter Box: client picks distinct products from the catalog. */
export const BOX_PREFIX = "starter-box:";
export const BOX_MAX = 3;
/** 2 products → 10%, 3 products → 15%. */
export function boxDiscount(count: number): number {
  return count >= 3 ? 15 : count === 2 ? 10 : 0;
}
export function boxPrice(prices: number[]): number {
  const sum = prices.reduce((s, p) => s + p, 0);
  return Math.round(sum * (100 - boxDiscount(prices.length))) / 100;
}

/** Loyalty: first order −10%, and every 3rd order (3rd, 6th, …) −10%. */
export function loyaltyDiscount(previousOrders: number): { percent: number; reason: string } {
  if (previousOrders <= 0) return { percent: 10, reason: "Prima comandă" };
  if ((previousOrders + 1) % 3 === 0) return { percent: 10, reason: `Comanda nr. ${previousOrders + 1}` };
  return { percent: 0, reason: "" };
}
export function applyPercent(total: number, percent: number): number {
  return Math.round(total * (100 - percent)) / 100;
}
