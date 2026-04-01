import { Phone } from "@/types/app";

export type CartState = {
  loading: boolean;
  cart: Phone[];
  total: number;
  amount: number;
};
