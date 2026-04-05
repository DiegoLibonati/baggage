import { createContext } from "react";

import type { CartContext as CartContextT } from "@/types/contexts";

export const CartContext = createContext<CartContextT | null>(null);
