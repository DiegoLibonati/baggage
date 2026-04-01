import { getTotalAndAmount } from "@/helpers/getTotalAndAmount";

import { mockPhone, mockPhones } from "@tests/__mocks__/phones.mock";

describe("getTotalAndAmount", () => {
  it("should return total 0 and amount 0 for an empty array", () => {
    expect(getTotalAndAmount([])).toEqual({ total: 0, amount: 0 });
  });

  it("should calculate total and amount for a single item", () => {
    const result = getTotalAndAmount([mockPhone]);

    expect(result.total).toBe(mockPhone.price * mockPhone.amount);
    expect(result.amount).toBe(mockPhone.amount);
  });

  it("should accumulate total and amount across multiple items", () => {
    const result = getTotalAndAmount(mockPhones);

    const expectedTotal = mockPhones.reduce((sum, p) => sum + p.price * p.amount, 0);
    const expectedAmount = mockPhones.reduce((sum, p) => sum + p.amount, 0);

    expect(result.total).toBeCloseTo(expectedTotal, 2);
    expect(result.amount).toBe(expectedAmount);
  });

  it("should multiply price by amount for each item", () => {
    const item = { ...mockPhone, price: 100, amount: 3 };

    const result = getTotalAndAmount([item]);

    expect(result.total).toBe(300);
    expect(result.amount).toBe(3);
  });
});
