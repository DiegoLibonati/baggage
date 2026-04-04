import { render, screen } from "@testing-library/react";

import CartPage from "@/pages/CartPage/CartPage";

import { CartProvider } from "@/contexts/CartContext/CartProvider";

import phoneService from "@/services/phoneService";

import { mockPhones } from "@tests/__mocks__/phones.mock";

type RenderPage = {
  container: HTMLElement;
};

const mockPhoneService = phoneService as jest.Mocked<typeof phoneService>;

jest.mock("@/services/phoneService");

const renderPage = (): RenderPage => {
  const { container } = render(
    <CartProvider>
      <CartPage />
    </CartProvider>
  );

  return { container };
};

describe("CartPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show the loading state while fetching phones", () => {
    mockPhoneService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Loading...");
  });

  it("should render the main element after the fetch completes", async () => {
    mockPhoneService.getAll.mockResolvedValueOnce(mockPhones);

    const { container } = renderPage();

    await screen.findByRole("main");
    expect(container.querySelector<HTMLElement>("main.cart-page")).toBeInTheDocument();
  });

  it("should hide the loading state after the fetch completes", async () => {
    mockPhoneService.getAll.mockResolvedValueOnce(mockPhones);

    renderPage();

    await screen.findByRole("main");
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should display one image per phone after a successful fetch", async () => {
    mockPhoneService.getAll.mockResolvedValueOnce(mockPhones);

    renderPage();

    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(mockPhones.length);
  });

  it("should show the empty cart state when the service returns no phones", async () => {
    mockPhoneService.getAll.mockResolvedValueOnce([]);

    renderPage();

    expect(await screen.findByText("Is currently empty")).toBeInTheDocument();
  });

  it("should call phoneService.getAll exactly once on mount", async () => {
    mockPhoneService.getAll.mockResolvedValueOnce(mockPhones);

    renderPage();

    await screen.findByRole("main");
    expect(mockPhoneService.getAll).toHaveBeenCalledTimes(1);
  });
});
