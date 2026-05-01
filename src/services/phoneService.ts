import type { Phone } from "@/types/app";
import type { ResponseDirect } from "@/types/responses";

const phoneService = {
  getAll: async (): Promise<ResponseDirect<Phone[]>> => {
    const response = await fetch("/react-useReducer-cart-project", {
      method: "GET",
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<Phone[]>;
  },
};

export default phoneService;
