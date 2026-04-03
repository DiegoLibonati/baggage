import { phonesService } from "@/services/phonesService";

import { mockPhones } from "@tests/__mocks__/phones.mock";

describe("phonesService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetch with the correct URL and method", async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await phonesService.getAll();

    expect(globalThis.fetch).toHaveBeenCalledWith("/react-useReducer-cart-project", {
      method: "GET",
    });
  });

  it("should return the parsed phones on a successful response", async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhones,
    });

    const result = await phonesService.getAll();

    expect(result).toEqual(mockPhones);
  });

  it("should throw an error when the response is not ok", async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(phonesService.getAll()).rejects.toThrow("HTTP error! status: 500");
  });
});
