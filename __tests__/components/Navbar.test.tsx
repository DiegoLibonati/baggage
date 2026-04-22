import { render, screen } from "@testing-library/react";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";
import type { CartContext as CartContextT } from "@/types/contexts";

import Navbar from "@/components/Navbar/Navbar";

import { CartContext } from "@/contexts/CartContext/CartContext";
import { CartProvider } from "@/contexts/CartContext/CartProvider";

const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <CartProvider>{children}</CartProvider>
);

const renderComponent = (): RenderResult => render(<Navbar />, { wrapper });

const renderWithAmount = (amount: number): RenderResult => {
  const contextValue: CartContextT = {
    state: { loading: false, cart: [], total: 0, amount },
    dispatch: jest.fn(),
  };
  return render(
    <CartContext.Provider value={contextValue}>
      <Navbar />
    </CartContext.Provider>
  );
};

describe("Navbar", () => {
  describe("rendering", () => {
    it("should render the navbar title", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "UseReducer" })).toBeInTheDocument();
    });

    it("should render the cart status with initial amount 0", () => {
      renderComponent();
      expect(screen.getByRole("status", { name: "Shopping cart, 0 items" })).toBeInTheDocument();
    });

    it("should display the amount number in the cart", () => {
      renderComponent();
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("when amount is 1", () => {
    it("should display singular item label", () => {
      renderWithAmount(1);
      expect(screen.getByRole("status", { name: "Shopping cart, 1 item" })).toBeInTheDocument();
    });
  });

  describe("when amount is greater than 1", () => {
    it("should display plural items label", () => {
      renderWithAmount(3);
      expect(screen.getByRole("status", { name: "Shopping cart, 3 items" })).toBeInTheDocument();
    });

    it("should display the correct amount number", () => {
      renderWithAmount(5);
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
