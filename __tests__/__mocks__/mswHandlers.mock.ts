import { http, HttpResponse } from "msw";

import { mockPhones } from "@tests/__mocks__/phones.mock";

export const mockMswHandlers = [
  http.get("/react-useReducer-cart-project", () => {
    return HttpResponse.json(mockPhones);
  }),
];
