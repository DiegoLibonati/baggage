import type { Phone } from "@/types/app";

export interface CartState {
  loading: boolean;
  cart: Phone[];
  total: number;
  amount: number;
}
