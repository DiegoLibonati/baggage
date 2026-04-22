import type { JSX } from "react";

import Navbar from "@/components/Navbar/Navbar";

import BaggagePage from "@/pages/BaggagePage/BaggagePage";

import { CartProvider } from "@/contexts/CartContext/CartProvider";

import "@/App.css";

function App(): JSX.Element {
  return (
    <CartProvider>
      <Navbar></Navbar>
      <BaggagePage></BaggagePage>
    </CartProvider>
  );
}

export default App;
