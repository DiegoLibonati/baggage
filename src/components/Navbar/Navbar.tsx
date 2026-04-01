import { BsFillCartFill } from "react-icons/bs";

import { useCartContext } from "@/hooks/useCartContext";

import "@/components/Navbar/Navbar.css";

const Navbar = () => {
  const { state } = useCartContext();

  return (
    <header className="header-wrapper">
      <nav className="navbar">
        <h3 className="navbar__title">UseReducer</h3>

        <div className="navbar__shop">
          <BsFillCartFill id="cart" className="navbar__shop-icon"></BsFillCartFill>
          <div className="navbar__shop-amount">
            <p className="navbar__shop-amount-text">{state.amount}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
