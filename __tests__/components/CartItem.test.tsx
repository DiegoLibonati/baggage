import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";

import type { Phone } from "@/types/app";

import CartItem from "@/components/CartItem/CartItem";

import { CartProvider } from "@/contexts/CartContext/CartProvider";

import { useCartContext } from "@/hooks/useCartContext";

import { mockPhone } from "@tests/__mocks__/phones.mock";

type RenderComponent = {
  container: HTMLElement;
};

const CartItemWrapper = ({ phones, id }: { phones: Phone[]; id: number }) => {
  const { dispatch } = useCartContext();

  useEffect(() => {
    dispatch({ type: "DISPLAY_ITEMS", payload: { cart: phones } });
  }, []);

  return <CartItem id={id} />;
};

const renderComponent = (overrides?: { phones?: Phone[]; id?: number }): RenderComponent => {
  const phones = overrides?.phones ?? [mockPhone];
  const id = overrides?.id ?? mockPhone.id;

  const { container } = render(
    <CartProvider>
      <CartItemWrapper phones={phones} id={id} />
    </CartProvider>
  );

  return { container };
};

describe("CartItem", () => {
  it("should render the item container", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>("div.item")).toBeInTheDocument();
  });

  it("should render the product image with the correct alt text", async () => {
    renderComponent();

    const img = await screen.findByRole("img", { name: mockPhone.title });
    expect(img).toHaveAttribute("src", mockPhone.img);
  });

  it("should display the product title", async () => {
    renderComponent();

    expect(
      await screen.findByRole("heading", { level: 3, name: mockPhone.title })
    ).toBeInTheDocument();
  });

  it("should display the product price", async () => {
    renderComponent();

    expect(await screen.findByText(`$${mockPhone.price}`)).toBeInTheDocument();
  });

  it("should display the item quantity", async () => {
    renderComponent();

    expect(await screen.findByLabelText(`Quantity: ${mockPhone.amount}`)).toBeInTheDocument();
  });

  it("should render the remove button with a descriptive aria-label", async () => {
    renderComponent();

    expect(
      await screen.findByRole("button", { name: `Remove ${mockPhone.title} from cart` })
    ).toBeInTheDocument();
  });

  it("should render the increase button with a descriptive aria-label", async () => {
    renderComponent();

    expect(
      await screen.findByRole("button", { name: `Increase quantity of ${mockPhone.title}` })
    ).toBeInTheDocument();
  });

  it("should render the decrease button with a descriptive aria-label", async () => {
    renderComponent();

    expect(
      await screen.findByRole("button", { name: `Decrease quantity of ${mockPhone.title}` })
    ).toBeInTheDocument();
  });

  it("should increase the quantity when the increase button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const increaseBtn = await screen.findByRole("button", {
      name: `Increase quantity of ${mockPhone.title}`,
    });
    await user.click(increaseBtn);

    expect(screen.getByLabelText(`Quantity: ${mockPhone.amount + 1}`)).toBeInTheDocument();
  });

  it("should decrease the quantity when the decrease button is clicked", async () => {
    const user = userEvent.setup();
    const phoneWithAmount2 = { ...mockPhone, amount: 2 };
    renderComponent({ phones: [phoneWithAmount2] });

    const decreaseBtn = await screen.findByRole("button", {
      name: `Decrease quantity of ${mockPhone.title}`,
    });
    await user.click(decreaseBtn);

    expect(screen.getByLabelText("Quantity: 1")).toBeInTheDocument();
  });

  it("should remove the item title from the DOM when the remove button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const removeBtn = await screen.findByRole("button", {
      name: `Remove ${mockPhone.title} from cart`,
    });
    await user.click(removeBtn);

    expect(screen.queryByText(mockPhone.title)).not.toBeInTheDocument();
  });
});
