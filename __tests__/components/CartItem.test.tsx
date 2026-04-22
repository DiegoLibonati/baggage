import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { CartContext as CartContextT } from "@/types/contexts";
import type { CartState } from "@/types/states";

import CartItem from "@/components/CartItem/CartItem";

import { CartContext } from "@/contexts/CartContext/CartContext";

import { mockPhone, mockPhones } from "@tests/__mocks__/phones.mock";

const mockDispatch = jest.fn();

const defaultState: CartState = {
  loading: false,
  cart: mockPhones,
  total: 0,
  amount: 0,
};

const renderComponent = (
  id: number = mockPhone.id,
  state: CartState = defaultState
): RenderResult => {
  const contextValue: CartContextT = {
    state,
    dispatch: mockDispatch,
  };
  return render(
    <CartContext.Provider value={contextValue}>
      <CartItem id={id} />
    </CartContext.Provider>
  );
};

describe("CartItem", () => {
  describe("rendering", () => {
    it("should render the item title", () => {
      renderComponent();
      expect(screen.getByText(mockPhone.title)).toBeInTheDocument();
    });

    it("should render the item price", () => {
      renderComponent();
      expect(screen.getByText(`$${mockPhone.price}`)).toBeInTheDocument();
    });

    it("should render the item image with the title as alt text", () => {
      renderComponent();
      expect(screen.getByRole("img", { name: mockPhone.title })).toBeInTheDocument();
    });

    it("should render the item amount with the correct aria-label", () => {
      renderComponent();
      expect(screen.getByLabelText(`Quantity: ${mockPhone.amount}`)).toBeInTheDocument();
    });

    it("should render the remove button", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: `Remove ${mockPhone.title} from cart` })
      ).toBeInTheDocument();
    });

    it("should render the increase quantity button", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: `Increase quantity of ${mockPhone.title}` })
      ).toBeInTheDocument();
    });

    it("should render the decrease quantity button", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: `Decrease quantity of ${mockPhone.title}` })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should dispatch CLEAR_ITEM when the remove button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: `Remove ${mockPhone.title} from cart` }));
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "CLEAR_ITEM",
        payload: { id: mockPhone.id },
      });
    });

    it("should dispatch INCREASE_ITEM when the increase button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(
        screen.getByRole("button", { name: `Increase quantity of ${mockPhone.title}` })
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "INCREASE_ITEM",
        payload: { id: mockPhone.id },
      });
    });

    it("should dispatch DECREASE_ITEM when the decrease button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(
        screen.getByRole("button", { name: `Decrease quantity of ${mockPhone.title}` })
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "DECREASE_ITEM",
        payload: { id: mockPhone.id },
      });
    });
  });
});
