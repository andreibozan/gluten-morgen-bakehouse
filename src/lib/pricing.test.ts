import { describe, it, expect } from "vitest";
import { boxDiscount, loyaltyDiscount } from "./pricing";
describe("reduceri", () => {
  it("2 produse 10%, 3 produse 15%", () => { expect(boxDiscount(2)).toBe(10); expect(boxDiscount(3)).toBe(15); });
  it("prima comandă 10%", () => expect(loyaltyDiscount(0).percent).toBe(10));
  it("a 3-a și a 6-a comandă 10%, a 2-a nu", () => {
    expect(loyaltyDiscount(2).percent).toBe(10); expect(loyaltyDiscount(5).percent).toBe(10); expect(loyaltyDiscount(1).percent).toBe(0);
  });
});
