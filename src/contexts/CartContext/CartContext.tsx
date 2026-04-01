import { createContext } from "react";

import { CartContext as CartContextT } from "@/types/contexts";

export const CartContext = createContext<CartContextT | null>(null);
