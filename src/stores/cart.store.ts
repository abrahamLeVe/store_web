import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name?: string;
  price?: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
};

export type CartStore = CartState & CartActions;

const defaultState: CartState = {
  items: [],
};

export const createCartStore = () =>
  createStore<CartStore>()(
    persist(
      (set) => ({
        ...defaultState,
        addItem: (item) =>
          set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
              return {
                items: state.items.map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                ),
              };
            }
            return { items: [...state.items, item] };
          }),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          })),
        clearCart: () => set({ items: [] }),
        updateItemQuantity: (id, quantity) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          })),
      }),
      {
        name: "cart-storage", // Nombre de la clave en localStorage
      }
    )
  );
