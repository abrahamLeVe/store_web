import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type CartItem = {
  id: string;
  prices: {
    priceId: string;
    value: number;
    quantity: number;
    colors?: {
      colorId: string;
      colorTitle: string;
      colorHex: string;
      quantity: number;
    }[];
  }[];
  name: string;
  img: string;
  slug: string;
};

export type CartState = {
  items: CartItem[];
};

export type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateItemQuantity: (
    id: string,
    priceId: string,
    colorId?: string,
    quantity?: number
  ) => void;
  updateItemPrices: (itemId: string, prices: CartItem["prices"]) => void;
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
              const updatedPrices = existingItem.prices.map((existingPrice) => {
                const matchingNewPrice = item.prices.find(
                  (newPrice) => newPrice.priceId === existingPrice.priceId
                );

                if (matchingNewPrice) {
                  if (
                    !matchingNewPrice.colors ||
                    matchingNewPrice.colors.length === 0
                  ) {
                    return {
                      ...existingPrice,
                      quantity: matchingNewPrice.quantity,
                    };
                  }

                  const updatedColors =
                    existingPrice.colors?.map((existingColor) => {
                      const matchingNewColor = matchingNewPrice.colors?.find(
                        (newColor) => newColor.colorId === existingColor.colorId
                      );

                      return matchingNewColor
                        ? {
                            ...existingColor,
                            quantity: matchingNewColor.quantity,
                          }
                        : existingColor;
                    }) ?? [];

                  matchingNewPrice.colors?.forEach((newColor) => {
                    if (
                      !updatedColors.some(
                        (existingColor) =>
                          existingColor.colorId === newColor.colorId
                      )
                    ) {
                      updatedColors.push(newColor);
                    }
                  });

                  return {
                    ...existingPrice,
                    colors: updatedColors,
                  };
                }

                return existingPrice;
              });

              item.prices.forEach((newPrice) => {
                if (
                  !existingItem.prices.some(
                    (existingPrice) =>
                      existingPrice.priceId === newPrice.priceId
                  )
                ) {
                  updatedPrices.push(newPrice);
                }
              });

              return {
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, prices: updatedPrices } : i
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
        updateItemQuantity: (id, priceId, colorId, quantity) =>
          set((state) => ({
            items: state.items
              .map((item) => {
                if (item.id === id) {
                  const updatedPrices = item.prices
                    .map((price) => {
                      if (price.priceId === priceId) {
                        let updatedColors = price.colors?.map((color) => {
                          if (color.colorId === colorId) {
                            return {
                              ...color,
                              quantity: quantity ?? color.quantity,
                            };
                          }
                          return color;
                        });

                        // Remove colors with quantity 0
                        if (updatedColors) {
                          updatedColors = updatedColors.filter(
                            (color) => color.quantity > 0
                          );
                        }

                        return {
                          ...price,
                          quantity: colorId
                            ? price.quantity
                            : quantity ?? price.quantity,
                          colors: updatedColors ?? price.colors,
                        };
                      }
                      return price;
                    })
                    .filter(
                      (price) =>
                        (price.colors?.length ?? 0) > 0 || price.quantity > 0
                    );

                  return {
                    ...item,
                    prices: updatedPrices,
                  };
                }
                return item;
              })
              .filter((item) => item.prices.length > 0),
          })),
        updateItemPrices: (itemId, prices) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, prices } : item
            ),
          })),
      }),
      { name: "cart-storage" }
    )
  );
