import type { Phone } from "@/types/app";
import type { GetTotalAndAmount } from "@/types/helpers";

export const getTotalAndAmount = (arr: Phone[]): GetTotalAndAmount => {
  return arr.reduce(
    (acc, phone) => {
      acc.total += parseFloat(String(phone.price * phone.amount));
      acc.amount += phone.amount;
      return acc;
    },
    {
      total: 0,
      amount: 0,
    }
  );
};
