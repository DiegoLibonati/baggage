import { useEffect } from "react";

import type { JSX } from "react";

import CartContainer from "@/components/CartContainer/CartContainer";
import Loading from "@/components/Loading/Loading";

import { useCartContext } from "@/hooks/useCartContext";

import phoneService from "@/services/phoneService";

import "@/pages/CartPage/CartPage.css";

const CartPage = (): JSX.Element => {
  const { state, dispatch } = useCartContext();

  const fetchCart = async (): Promise<void> => {
    dispatch({ type: "LOADING" });

    const phones = await phoneService.getAll();

    dispatch({ type: "DISPLAY_ITEMS", payload: { cart: phones } });
  };

  useEffect(() => {
    void fetchCart();
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_TOTALS_AND_AMOUNT" });
  }, [state.cart]);

  if (state.loading) return <Loading></Loading>;

  return (
    <main className="cart-page main-app">
      <CartContainer></CartContainer>
    </main>
  );
};

export default CartPage;
