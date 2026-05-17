import { http, HttpResponse } from "msw";

import phoneService from "@/services/phoneService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockPhones } from "@tests/__mocks__/phones.mock";

describe("phoneService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds", () => {
      it("should return an array of phones", async () => {
        const result = await phoneService.getAll();

        expect(result).toEqual(mockPhones);
      });

      it("should call the correct endpoint with GET method", async () => {
        const requestSpy = jest.fn();
        mockMswServer.use(
          http.get("/react-useReducer-cart-project", ({ request }) => {
            requestSpy(request.method, new URL(request.url).pathname);
            return HttpResponse.json(mockPhones);
          })
        );

        await phoneService.getAll();

        expect(requestSpy).toHaveBeenCalledWith("GET", "/react-useReducer-cart-project");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with HTTP 500 status", async () => {
        mockMswServer.use(
          http.get("/react-useReducer-cart-project", () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(phoneService.getAll()).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error with HTTP 404 status", async () => {
        mockMswServer.use(
          http.get("/react-useReducer-cart-project", () => {
            return new HttpResponse(null, { status: 404 });
          })
        );

        await expect(phoneService.getAll()).rejects.toThrow("HTTP error! status: 404");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockMswServer.use(
          http.get("/react-useReducer-cart-project", () => {
            return HttpResponse.error();
          })
        );

        await expect(phoneService.getAll()).rejects.toThrow();
      });
    });
  });
});
