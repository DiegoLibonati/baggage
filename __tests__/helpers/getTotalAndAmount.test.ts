import type { Phone } from "@/types/app";

import { getTotalAndAmount } from "@/helpers/getTotalAndAmount";

const mockPhone: Phone = {
  id: 1,
  title: "Samsung Galaxy S8",
  price: 399.99,
  img: "https://example.com/phone-1.png",
  amount: 1,
};

const mockPhones: Phone[] = [
  { id: 1, title: "Samsung Galaxy S8", price: 399.99, img: "", amount: 1 },
  { id: 2, title: "google pixel", price: 499.99, img: "", amount: 3 },
];

describe("getTotalAndAmount", () => {
  describe("when the array has multiple items", () => {
    it("should return the correct total multiplying price by amount for each item", () => {
      const result = getTotalAndAmount(mockPhones);
      expect(result.total).toBeCloseTo(1899.96);
    });

    it("should return the correct amount summing all item amounts", () => {
      const result = getTotalAndAmount(mockPhones);
      expect(result.amount).toBe(4);
    });
  });

  describe("when the array has a single item with amount 1", () => {
    it("should return the item price as total", () => {
      const result = getTotalAndAmount([mockPhone]);
      expect(result.total).toBeCloseTo(399.99);
    });

    it("should return 1 as amount", () => {
      const result = getTotalAndAmount([mockPhone]);
      expect(result.amount).toBe(1);
    });
  });

  describe("when an item has amount greater than 1", () => {
    it("should multiply price by amount", () => {
      const phone: Phone = { id: 1, title: "Test", price: 100, img: "", amount: 5 };
      const result = getTotalAndAmount([phone]);
      expect(result.total).toBeCloseTo(500);
      expect(result.amount).toBe(5);
    });
  });

  describe("when the array is empty", () => {
    it("should return 0 as total", () => {
      const result = getTotalAndAmount([]);
      expect(result.total).toBe(0);
    });

    it("should return 0 as amount", () => {
      const result = getTotalAndAmount([]);
      expect(result.amount).toBe(0);
    });
  });
});
