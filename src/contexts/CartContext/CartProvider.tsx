import { useReducer } from "react";

import type { JSX } from "react";
import type { CartProviderProps } from "@/types/props";

import { CartContext } from "@/contexts/CartContext/CartContext";
import { CartReducer } from "@/contexts/CartContext/CartReducer";

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(CartReducer, {
    loading: false,
    cart: [],
    total: 0,
    amount: 0,
  });

  return (
    <CartContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
