import type { JSX } from "react";

import Navbar from "@/components/Navbar/Navbar";

import CartPage from "@/pages/CartPage/CartPage";

import { CartProvider } from "@/contexts/CartContext/CartProvider";

import "@/App.css";

function App(): JSX.Element {
  return (
    <CartProvider>
      <Navbar></Navbar>
      <CartPage></CartPage>
    </CartProvider>
  );
}

export default App;
