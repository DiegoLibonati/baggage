import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { CartContext as CartContextT } from "@/types/contexts";
import type { CartState } from "@/types/states";

import CartContainer from "@/components/CartContainer/CartContainer";

import { CartContext } from "@/contexts/CartContext/CartContext";

import { mockPhones } from "@tests/__mocks__/phones.mock";

const mockDispatch = jest.fn();

const emptyCartState: CartState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const populatedCartState: CartState = {
  loading: false,
  cart: mockPhones,
  total: 1899.96,
  amount: 4,
};

const renderWithState = (state: CartState): RenderResult => {
  const contextValue: CartContextT = {
    state,
    dispatch: mockDispatch,
  };
  return render(
    <CartContext.Provider value={contextValue}>
      <CartContainer />
    </CartContext.Provider>
  );
};

describe("CartContainer", () => {
  describe("when the cart is empty", () => {
    it("should render the bag title", () => {
      renderWithState(emptyCartState);
      expect(screen.getByRole("heading", { name: "Your bag" })).toBeInTheDocument();
    });

    it("should render the empty cart message", () => {
      renderWithState(emptyCartState);
      expect(screen.getByRole("heading", { name: "Is currently empty" })).toBeInTheDocument();
    });

    it("should not render the clear cart button", () => {
      renderWithState(emptyCartState);
      expect(
        screen.queryByRole("button", { name: "Clear all items from cart" })
      ).not.toBeInTheDocument();
    });
  });

  describe("when the cart has items", () => {
    it("should render the bag title", () => {
      renderWithState(populatedCartState);
      expect(screen.getByRole("heading", { name: "Your bag" })).toBeInTheDocument();
    });

    it("should not render the empty cart message", () => {
      renderWithState(populatedCartState);
      expect(screen.queryByText("Is currently empty")).not.toBeInTheDocument();
    });

    it("should render a cart item for each phone in the cart", () => {
      renderWithState(populatedCartState);
      expect(screen.getByText("Samsung Galaxy S8")).toBeInTheDocument();
      expect(screen.getByText("google pixel")).toBeInTheDocument();
    });

    it("should render the total price", () => {
      renderWithState(populatedCartState);
      expect(screen.getByText("$ 1899.96")).toBeInTheDocument();
    });

    it("should render the clear cart button", () => {
      renderWithState(populatedCartState);
      expect(screen.getByRole("button", { name: "Clear all items from cart" })).toBeInTheDocument();
    });

    it("should dispatch CLEAR_CART when the clear cart button is clicked", async () => {
      const user = userEvent.setup();
      renderWithState(populatedCartState);
      await user.click(screen.getByRole("button", { name: "Clear all items from cart" }));
      expect(mockDispatch).toHaveBeenCalledWith({ type: "CLEAR_CART" });
    });
  });
});
