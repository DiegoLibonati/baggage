import { BsFillCartFill } from "react-icons/bs";

import type { JSX } from "react";

import { useCartContext } from "@/hooks/useCartContext";

import "@/components/Navbar/Navbar.css";

const Navbar = (): JSX.Element => {
  const { state } = useCartContext();

  return (
    <header className="header-wrapper">
      <nav className="navbar">
        <h3 className="navbar__title">UseReducer</h3>

        <div
          className="navbar__shop"
          aria-label={`Shopping cart, ${state.amount} item${state.amount !== 1 ? "s" : ""}`}
          role="status"
        >
          <BsFillCartFill
            id="cart"
            className="navbar__shop-icon"
            aria-hidden="true"
          ></BsFillCartFill>
          <div className="navbar__shop-amount" aria-hidden="true">
            <p className="navbar__shop-amount-text">{state.amount}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
