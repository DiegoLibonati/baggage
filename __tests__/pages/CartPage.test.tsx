import { render, screen } from "@testing-library/react";

import CartPage from "@/pages/CartPage/CartPage";

import { CartProvider } from "@/contexts/CartContext/CartProvider";

import { phonesService } from "@/services/phonesService";

import { mockPhones } from "@tests/__mocks__/phones.mock";

type RenderPage = {
  container: HTMLElement;
};

const mockedPhonesService = phonesService as jest.Mocked<typeof phonesService>;

jest.mock("@/services/phonesService");

const renderPage = (): RenderPage => {
  const { container } = render(
    <CartProvider>
      <CartPage />
    </CartProvider>
  );

  return { container };
};

describe("CartPage", () => {
  it("should show the loading state while fetching phones", () => {
    mockedPhonesService.getAll.mockReturnValueOnce(new Promise(() => undefined));

    renderPage();

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Loading...");
  });

  it("should render the main element after the fetch completes", async () => {
    mockedPhonesService.getAll.mockResolvedValueOnce(mockPhones);

    const { container } = renderPage();

    await screen.findByRole("main");
    expect(container.querySelector<HTMLElement>("main.cart-page")).toBeInTheDocument();
  });

  it("should hide the loading state after the fetch completes", async () => {
    mockedPhonesService.getAll.mockResolvedValueOnce(mockPhones);

    renderPage();

    await screen.findByRole("main");
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("should display one image per phone after a successful fetch", async () => {
    mockedPhonesService.getAll.mockResolvedValueOnce(mockPhones);

    renderPage();

    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(mockPhones.length);
  });

  it("should show the empty cart state when the service returns no phones", async () => {
    mockedPhonesService.getAll.mockResolvedValueOnce([]);

    renderPage();

    expect(await screen.findByText("Is currently empty")).toBeInTheDocument();
  });

  it("should call phonesService.getAll exactly once on mount", async () => {
    mockedPhonesService.getAll.mockResolvedValueOnce(mockPhones);

    renderPage();

    await screen.findByRole("main");
    expect(mockedPhonesService.getAll).toHaveBeenCalledTimes(1);
  });
});
