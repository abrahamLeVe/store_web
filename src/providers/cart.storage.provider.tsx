"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { createCartStore, type CartStore } from "@/stores/cart.store";

export type CartStoreApi = ReturnType<typeof createCartStore>;

const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

export const CartStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<CartStoreApi | null>(null); // Inicializamos con null
  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (state: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);
  if (!cartStoreContext) {
    throw new Error("useCartStore debe usarse dentro de CartStoreProvider");
  }
  return useStore(cartStoreContext, selector);
};
