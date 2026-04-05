import type { CartReducer as CartReducerT } from "@/types/reducers";
import type { CartState } from "@/types/states";

import { getTotalAndAmount } from "@/helpers/getTotalAndAmount";

export const CartReducer = (state: CartState, action: CartReducerT): CartState => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "CLEAR_ITEM") {
    const arrCart = state.cart.filter((item) => item.id !== action.payload.id);
    return { ...state, cart: arrCart };
  }

  if (action.type === "INCREASE_ITEM") {
    const arrCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });

    return { ...state, cart: arrCart };
  }

  if (action.type === "DECREASE_ITEM") {
    const arrCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: arrCart };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state,
      cart: action.payload.cart,
      loading: false,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (action.type === "SET_TOTALS_AND_AMOUNT") {
    const { amount, total } = getTotalAndAmount(state.cart);

    return { ...state, amount: amount, total: total };
  }

  throw new Error("Error match");
};
