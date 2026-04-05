import type { CartState } from "@/types/states";
import type { CartReducer } from "@/types/reducers";

export interface CartContext {
  state: CartState;
  dispatch: React.Dispatch<CartReducer>;
}
