import { render, screen } from "@testing-library/react";
import { useEffect } from "react";

import type { Phone } from "@/types/app";

import Navbar from "@/components/Navbar/Navbar";

import { CartProvider } from "@/contexts/CartContext/CartProvider";

import { useCartContext } from "@/hooks/useCartContext";

import { mockPhone, mockPhones } from "@tests/__mocks__/phones.mock";

type RenderComponent = {
  container: HTMLElement;
};

const NavbarWithCart = ({ phones }: { phones: Phone[] }) => {
  const { dispatch } = useCartContext();

  useEffect(() => {
    dispatch({ type: "DISPLAY_ITEMS", payload: { cart: phones } });
    dispatch({ type: "SET_TOTALS_AND_AMOUNT" });
  }, []);

  return <Navbar />;
};

const renderComponent = (phones: Phone[] = []): RenderComponent => {
  const { container } = render(
    <CartProvider>
      <NavbarWithCart phones={phones} />
    </CartProvider>
  );

  return { container };
};

describe("Navbar", () => {
  it("should render the header landmark", () => {
    renderComponent();

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the navigation landmark", () => {
    renderComponent();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should display the app title", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("UseReducer");
  });

  it("should show 0 items in the cart status by default", () => {
    renderComponent();

    expect(screen.getByRole("status")).toHaveAccessibleName("Shopping cart, 0 items");
  });

  it("should use plural 'items' when amount is greater than 1", async () => {
    renderComponent(mockPhones);

    expect(await screen.findByRole("status")).toHaveAccessibleName("Shopping cart, 4 items");
  });

  it("should use singular 'item' when amount is exactly 1", async () => {
    renderComponent([mockPhone]);

    expect(await screen.findByRole("status")).toHaveAccessibleName("Shopping cart, 1 item");
  });
});
