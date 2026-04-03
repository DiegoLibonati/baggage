import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";

import CartContainer from "@/components/CartContainer/CartContainer";

import { CartProvider } from "@/contexts/CartContext/CartProvider";

import { useCartContext } from "@/hooks/useCartContext";

import type { Phone } from "@/types/app";

import { mockPhone, mockPhones } from "@tests/__mocks__/phones.mock";

type RenderComponent = {
  container: HTMLElement;
};

const CartContainerWithCart = ({ phones }: { phones: Phone[] }) => {
  const { dispatch } = useCartContext();

  useEffect(() => {
    dispatch({ type: "DISPLAY_ITEMS", payload: { cart: phones } });
    dispatch({ type: "SET_TOTALS_AND_AMOUNT" });
  }, []);

  return <CartContainer />;
};

const renderComponent = (phones: Phone[] = []): RenderComponent => {
  const { container } = render(
    <CartProvider>
      <CartContainerWithCart phones={phones} />
    </CartProvider>
  );

  return { container };
};

describe("CartContainer", () => {
  it("should render the cart section", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLElement>("section.cart")).toBeInTheDocument();
  });

  it("should render the 'Your bag' heading", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Your bag");
  });

  it("should show empty state message when cart is empty", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Is currently empty");
  });

  it("should not show the clear cart button when cart is empty", () => {
    renderComponent();

    expect(
      screen.queryByRole("button", { name: "Clear all items from cart" })
    ).not.toBeInTheDocument();
  });

  it("should render an image per item when cart has items", async () => {
    renderComponent(mockPhones);

    expect(await screen.findAllByRole("img")).toHaveLength(mockPhones.length);
  });

  it("should display the total price when cart has items", async () => {
    renderComponent([mockPhone]);

    expect(await screen.findByText("$ 399.99")).toBeInTheDocument();
  });

  it("should render the clear cart button when cart has items", async () => {
    renderComponent(mockPhones);

    expect(
      await screen.findByRole("button", { name: "Clear all items from cart" })
    ).toBeInTheDocument();
  });

  it("should show empty state after clicking clear cart", async () => {
    const user = userEvent.setup();
    renderComponent(mockPhones);

    const clearButton = await screen.findByRole("button", { name: "Clear all items from cart" });
    await user.click(clearButton);

    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Is currently empty");
  });
});
