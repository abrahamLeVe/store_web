import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type CartItem = {
  id: string; // Product ID
  name: string;
  img: string;
  slug: string;
  models: {
    modelId: string;
    name: string;
    prices: {
      priceId: string;
      value: number;
      quantity: number;
      colors?: {
        colorId: string;
        colorKey: string;
        colorTitle: string;
        colorHex: string;
        quantity: number;
      }[];
    }[];
  }[];
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
    modelId: string,
    priceId: string,
    colorKey?: string,
    quantity?: number
  ) => void;
  updateItemPrices: (
    itemId: string,
    modelId: string,
    prices: CartItem["models"][0]["prices"]
  ) => void;
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
              const updatedModels = existingItem.models.map((existingModel) => {
                const matchingNewModel = item.models.find(
                  (newModel) => newModel.modelId === existingModel.modelId
                );

                if (matchingNewModel) {
                  const updatedPrices = existingModel.prices.map(
                    (existingPrice) => {
                      const matchingNewPrice = matchingNewModel.prices.find(
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
                            const matchingNewColor =
                              matchingNewPrice.colors?.find(
                                (newColor) =>
                                  newColor.colorKey === existingColor.colorKey
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
                                existingColor.colorKey === newColor.colorKey
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
                    }
                  );

                  matchingNewModel.prices.forEach((newPrice) => {
                    if (
                      !existingModel.prices.some(
                        (existingPrice) =>
                          existingPrice.priceId === newPrice.priceId
                      )
                    ) {
                      updatedPrices.push(newPrice);
                    }
                  });

                  return {
                    ...existingModel,
                    prices: updatedPrices,
                  };
                }

                return existingModel;
              });

              item.models.forEach((newModel) => {
                if (
                  !existingItem.models.some(
                    (existingModel) =>
                      existingModel.modelId === newModel.modelId
                  )
                ) {
                  updatedModels.push(newModel);
                }
              });

              return {
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, models: updatedModels } : i
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
        updateItemQuantity: (id, modelId, priceId, colorKey, quantity) =>
          set((state) => ({
            items: state.items
              .map((item) => {
                if (item.id === id) {
                  const updatedModels = item.models.map((model) => {
                    if (model.modelId === modelId) {
                      const updatedPrices = model.prices
                        .map((price) => {
                          if (price.priceId === priceId) {
                            let updatedColors = price.colors?.map((color) => {
                              if (color.colorKey === colorKey) {
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
                              quantity: colorKey
                                ? price.quantity
                                : quantity ?? price.quantity,
                              colors: updatedColors ?? price.colors,
                            };
                          }
                          return price;
                        })
                        .filter(
                          (price) =>
                            (price.colors?.length ?? 0) > 0 ||
                            price.quantity > 0
                        );

                      return {
                        ...model,
                        prices: updatedPrices,
                      };
                    }
                    return model;
                  });

                  return {
                    ...item,
                    models: updatedModels,
                  };
                }
                return item;
              })
              .filter((item) =>
                item.models.some((model) => model.prices.length > 0)
              ),
          })),
        updateItemPrices: (itemId, modelId, prices) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    models: item.models.map((model) =>
                      model.modelId === modelId ? { ...model, prices } : model
                    ),
                  }
                : item
            ),
          })),
      }),
      { name: "cart-storage" }
    )
  );
