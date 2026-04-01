import { useContext } from "react";

import { UseCartContext } from "@/types/hooks";

import { CartContext } from "@/contexts/CartContext/CartContext";

export const useCartContext = (): UseCartContext => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
};
