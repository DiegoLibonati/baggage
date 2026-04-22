import phoneService from "@/services/phoneService";

import { mockPhones } from "@tests/__mocks__/phones.mock";

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => data,
  } as Response);
};

const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  } as Response);
};

const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};

describe("phoneService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds", () => {
      it("should return an array of phones", async () => {
        mockFetchSuccess(mockPhones);
        const result = await phoneService.getAll();
        expect(result).toEqual(mockPhones);
      });

      it("should call fetch with the correct endpoint and method", async () => {
        mockFetchSuccess(mockPhones);
        await phoneService.getAll();
        expect(global.fetch).toHaveBeenCalledWith("/react-useReducer-cart-project", {
          method: "GET",
        });
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with HTTP 500 status", async () => {
        mockFetchError(500);
        await expect(phoneService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error with HTTP 404 status", async () => {
        mockFetchError(404);
        await expect(phoneService.getAll()).rejects.toThrow("HTTP error! status: 404");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockFetchNetworkError("Failed to fetch");
        await expect(phoneService.getAll()).rejects.toThrow("Failed to fetch");
      });
    });
  });
});
