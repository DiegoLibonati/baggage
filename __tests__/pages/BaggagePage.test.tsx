import { render, screen, waitFor } from "@testing-library/react";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import BaggagePage from "@/pages/BaggagePage/BaggagePage";

import { CartProvider } from "@/contexts/CartContext/CartProvider";

import phoneService from "@/services/phoneService";

import { mockPhones } from "@tests/__mocks__/phones.mock";

const mockedPhoneService = jest.mocked(phoneService);

jest.mock("@/services/phoneService", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
  },
}));

const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <CartProvider>{children}</CartProvider>
);

const renderPage = (): RenderResult => render(<BaggagePage />, { wrapper });

describe("BaggagePage", () => {
  describe("loading state", () => {
    it("should show the loading indicator immediately after mount", async () => {
      mockedPhoneService.getAll.mockResolvedValue(mockPhones);

      renderPage();

      expect(screen.getByRole("heading", { name: "Loading..." })).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByRole("heading", { name: "Loading..." })).not.toBeInTheDocument();
      });
    });
  });

  describe("when fetch succeeds with phones", () => {
    it("should display the bag heading after loading", async () => {
      mockedPhoneService.getAll.mockResolvedValue(mockPhones);

      renderPage();

      await waitFor(() => {
        expect(screen.queryByRole("heading", { name: "Loading..." })).not.toBeInTheDocument();
      });
      expect(screen.getByRole("heading", { name: "Your bag" })).toBeInTheDocument();
    });

    it("should display all phone titles after loading", async () => {
      mockedPhoneService.getAll.mockResolvedValue(mockPhones);

      renderPage();

      expect(await screen.findByText("Samsung Galaxy S8")).toBeInTheDocument();
      expect(screen.getByText("google pixel")).toBeInTheDocument();
    });

    it("should call phoneService.getAll once on mount", async () => {
      mockedPhoneService.getAll.mockResolvedValue(mockPhones);

      renderPage();

      await screen.findByText("Samsung Galaxy S8");
      expect(mockedPhoneService.getAll).toHaveBeenCalledTimes(1);
    });

    it("should display the computed total after loading", async () => {
      mockedPhoneService.getAll.mockResolvedValue(mockPhones);

      renderPage();

      expect(await screen.findByText("$ 1899.96")).toBeInTheDocument();
    });
  });

  describe("when fetch succeeds with an empty array", () => {
    it("should display the empty cart message after loading", async () => {
      mockedPhoneService.getAll.mockResolvedValue([]);

      renderPage();

      await waitFor(() => {
        expect(screen.queryByRole("heading", { name: "Loading..." })).not.toBeInTheDocument();
      });
      expect(screen.getByRole("heading", { name: "Is currently empty" })).toBeInTheDocument();
    });

    it("should display the bag heading after loading", async () => {
      mockedPhoneService.getAll.mockResolvedValue([]);

      renderPage();

      await waitFor(() => {
        expect(screen.queryByRole("heading", { name: "Loading..." })).not.toBeInTheDocument();
      });
      expect(screen.getByRole("heading", { name: "Your bag" })).toBeInTheDocument();
    });
  });
});
