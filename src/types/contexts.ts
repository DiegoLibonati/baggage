import { CartState } from "@/types/states";
import { CartReducer } from "@/types/reducers";

export type CartContext = {
  state: CartState;
  dispatch: React.Dispatch<CartReducer>;
};
