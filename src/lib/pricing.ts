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