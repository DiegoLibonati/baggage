import type { Phone } from "@/types/app";

const phoneService = {
  getAll: async (): Promise<Phone[]> => {
    const response = await fetch("/react-useReducer-cart-project", {
      method: "GET",
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const phones: Phone[] = (await response.json()) as Phone[];

    return phones;
  },
};

export default phoneService;
