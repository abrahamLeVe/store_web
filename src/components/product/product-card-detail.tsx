"use client";

import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/models/products.model";
import { useCartStore } from "@/providers/cart.storage.provider";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { CustomTooltip } from "@/hooks/use-tooltip";
import { QuantityInput } from "./quantity-input";

export default function ProductCardDetail({
  product,
  isPage = false,
}: {
  product: Product;
  isPage?: boolean;
}) {
  const { toast } = useToast();
  const { updateItemQuantity, removeItem, addItem, items } = useCartStore(
    (state) => state
  );

  const [selectedModelId, setSelectedModelId] = useState(
    product.models[0].documentId
  );
  const [selectedPriceId, setSelectedPriceId] = useState(
    product.models[0].prices[0].documentId
  );

  useEffect(() => {
    const selectedModel = product.models.find(
      (model) => model.documentId === selectedModelId
    );
    if (selectedModel) {
      setSelectedPriceId(selectedModel.prices[0]?.documentId || "");
    }
  }, [selectedModelId, product.models]);

  const [selectedColors, setSelectedColors] = useState(
    product.models[0].prices[0].colors || []
  );

  const [colorQuantities, setColorQuantities] = useState<
    Record<string, number>
  >({});

  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    const selectedModel = product.models.find(
      (model) => model.documentId === selectedModelId
    );
    const selectedPrice = selectedModel?.prices.find(
      (price) => price.documentId === selectedPriceId
    );
    setSelectedColors(selectedPrice?.colors || []);

    const initialQuantities: Record<string, number> = {};
    selectedPrice?.colors.forEach((color) => {
      const colorKey = `${color.documentId + selectedModelId}`;
      const cartItem = items.find(
        (item) =>
          item.id === product.documentId &&
          item.models.some((model) =>
            model.prices.some((price) =>
              price.colors?.some((cartColor) => cartColor.colorKey === colorKey)
            )
          )
      );

      const cartColor = cartItem?.models
        .flatMap((model) => model.prices)
        .flatMap((price) => price.colors)
        .find((cartColor) => cartColor?.colorKey === colorKey);

      initialQuantities[colorKey] = cartColor?.quantity || 0;
    });

    setColorQuantities(initialQuantities);

    const cartItem = items.find((item) => item.id === product.documentId);
    const cartModel = cartItem?.models.find(
      (model) => model.modelId === selectedModelId
    );
    const cartPrice = cartModel?.prices.find(
      (price) => price.priceId === selectedPriceId
    );
    setProductQuantity(cartPrice?.quantity || 0);
  }, [selectedPriceId, items, product.documentId, selectedModelId]);

  const handleColorQuantityChange = (colorKey: string, quantity: number) => {
    setColorQuantities((prev) => ({
      ...prev,
      [colorKey]: quantity, // Solo actualiza la cantidad del color específico
    }));
  };

  const handleProductQuantityChange = (quantity: number) => {
    setProductQuantity(quantity);
  };

  const handleRemoveColor = (colorKey: string) => {
    // Actualiza el estado local eliminando el color
    setColorQuantities((prev) => {
      const { [colorKey]: _, ...rest } = prev; // Elimina la clave específica
      return rest;
    });

    // Actualiza el carrito eliminando el color
    updateItemQuantity(
      product.documentId,
      selectedModelId,
      selectedPriceId,
      colorKey, // Pasa el colorKey correctamente
      0 // Cantidad 0 para eliminar
    );

    // Actualiza los colores seleccionados sin reiniciar el estado
    const updatedColors = selectedColors.filter(
      (color) => color.documentId + selectedModelId !== colorKey
    );
    setSelectedColors(updatedColors);

    // Muestra un mensaje si todos los colores han sido eliminados
    if (updatedColors.length === 0) {
      toast({
        variant: "default",
        description: "Todos los colores han sido eliminados.",
      });
    }
  };

  const handleRemoveProduct = () => {
    removeItem(product.documentId);
  };

  const handleAddToCart = () => {
    const selectedModel = product.models.find(
      (model) => model.documentId === selectedModelId
    );
    const selectedPrice = selectedModel?.prices.find(
      (price) => price.documentId === selectedPriceId
    );

    if (selectedPrice) {
      const colorsWithQuantities = selectedColors
        .filter((color) => {
          const colorKey = `${color.documentId + selectedModelId}`;
          return colorQuantities[colorKey] > 0;
        })
        .map((color) => {
          const colorKey = `${color.documentId + selectedModelId}`;
          return {
            colorId: color.documentId,
            colorKey, // Nuevo identificador único
            colorTitle: color.title,
            colorHex: color.hexadecimal,
            quantity: colorQuantities[colorKey],
          };
        });

      if (selectedColors.length > 0 && colorsWithQuantities.length === 0) {
        toast({
          variant: "destructive",
          description:
            "Debe seleccionar al menos un color con cantidad mayor a 0.",
        });
        return;
      }

      if (selectedColors.length === 0 && productQuantity <= 0) {
        toast({
          variant: "destructive",
          description: "La cantidad del producto debe ser mayor a 0.",
        });
        return;
      }

      addItem({
        id: product.documentId,
        name: product.title,
        img:
          selectedModel?.image?.[0]?.formats?.thumbnail?.url || "/no_img.webp",
        slug: product.slug,
        models: [
          {
            modelId: selectedModel?.documentId || "",
            name: selectedModel?.name || "",
            prices: [
              {
                priceId: selectedPrice.documentId,
                value: selectedPrice.value,
                quantity: selectedColors.length > 0 ? 0 : productQuantity,
                colors: colorsWithQuantities,
              },
            ],
          },
        ],
      });

      toast({
        variant: "default",
        description: "Producto agregado al carrito.",
      });
    }
  };

  return (
    <div className="pt-4 w-full">
      <h2>{product.title}</h2>

      <div
        className={`flex flex-col gap-4 mt-4  items-start ${
          isPage ? " md:flex-row" : ""
        }`}
      >
        <div
          className={`flex flex-col gap-2 w-full ${isPage ? " md:w-1/2" : ""}`}
        >
          <Select
            value={selectedModelId}
            onValueChange={(value) => setSelectedModelId(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione Modelo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Modelos</SelectLabel>
                {product.models.map((model) => (
                  <SelectItem key={model.documentId} value={model.documentId}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedPriceId}
            onValueChange={(value) => setSelectedPriceId(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Precios</SelectLabel>
                {product.models
                  .find((model) => model.documentId === selectedModelId)
                  ?.prices.map((price) => (
                    <SelectItem key={price.documentId} value={price.documentId}>
                      {formatCurrency(price.value)}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div
          className={`flex flex-col gap-2 w-full items-end ${
            isPage ? " md:w-1/2" : ""
          }`}
        >
          {selectedColors.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span>Colores</span>
                  <div className="flex flex-1 gap-2 ml-5">
                    {selectedColors.map((color) => (
                      <div
                        key={color.documentId + selectedModelId}
                        className="w-4 h-4 border rounded-full"
                        style={{ backgroundColor: color.hexadecimal }}
                        title={color.title}
                      ></div>
                    ))}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {selectedColors.map((color) => (
                      <div
                        key={color.documentId + selectedModelId}
                        className="flex items-center gap-2"
                      >
                        <Label
                          className="flex items-center gap-2 max-w-24 w-full"
                          htmlFor={color.documentId + selectedModelId}
                        >
                          <div
                            className="w-6 h-6 border rounded-full"
                            style={{ backgroundColor: color.hexadecimal }}
                            title={color.title}
                          ></div>
                          {color.title}
                        </Label>

                        <QuantityInput
                          id={color.documentId + selectedModelId}
                          value={
                            colorQuantities[
                              color.documentId + selectedModelId
                            ] || 0
                          }
                          onChange={(value) =>
                            handleColorQuantityChange(
                              color.documentId + selectedModelId,
                              value
                            )
                          }
                        />
                        {colorQuantities[color.documentId + selectedModelId] >
                          0 && (
                          <CustomTooltip tooltipText="Retirar del carrito">
                            <Button
                              variant={"outline"}
                              onClick={() =>
                                handleRemoveColor(
                                  color.documentId + selectedModelId
                                )
                              }
                              size="icon"
                            >
                              <TrashIcon className="text-red-500" />
                            </Button>
                          </CustomTooltip>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div
              className={`flex items-center justify-end gap-2 w-full ${
                isPage ? "md:w-1/2" : ""
              }`}
            >
              <Label htmlFor={`productQuantity-${product.documentId}`}>
                Cantidad:
              </Label>

              <QuantityInput
                id={`productQuantity-${product.documentId}`}
                value={productQuantity}
                onChange={handleProductQuantityChange}
              />
              {productQuantity > 0 && (
                <CustomTooltip tooltipText="Retirar del carrito">
                  <Button
                    variant={"outline"}
                    onClick={handleRemoveProduct}
                    size="icon"
                  >
                    <TrashIcon className="text-red-500" />
                  </Button>
                </CustomTooltip>
              )}
            </div>
          )}

          <Button onClick={handleAddToCart}>Agregar al carrito</Button>
        </div>
      </div>
    </div>
  );
}
