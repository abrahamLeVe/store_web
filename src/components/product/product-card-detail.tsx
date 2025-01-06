"use client";

import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/models/product/products.model";
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

export default function ProductCardDetail({ product }: { product: Product }) {
  const { toast } = useToast();
  const { updateItemQuantity, removeItem, addItem, items } = useCartStore(
    (state) => state
  );

  const [selectedPriceId, setSelectedPriceId] = useState(
    product.prices[0].documentId
  );
  const [selectedColors, setSelectedColors] = useState(
    product.prices[0].colors
  );

  const [colorQuantities, setColorQuantities] = useState<
    Record<string, number>
  >({});

  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    const selectedPrice = product.prices.find(
      (price) => price.documentId === selectedPriceId
    );
    setSelectedColors(selectedPrice?.colors || []);

    const initialQuantities: Record<string, number> = {};
    selectedPrice?.colors.forEach((color) => {
      const cartItem = items.find(
        (item) =>
          item.id === product.documentId &&
          item.prices.some((price) =>
            price.colors?.some(
              (cartColor) => cartColor.colorId === color.documentId
            )
          )
      );

      const cartColor = cartItem?.prices
        .flatMap((price) => price.colors)
        .find((cartColor) => cartColor?.colorId === color.documentId);

      initialQuantities[color.documentId] = cartColor?.quantity || 0;
    });

    setColorQuantities(initialQuantities);

    const cartItem = items.find((item) => item.id === product.documentId);
    const cartPrice = cartItem?.prices.find(
      (price) => price.priceId === selectedPriceId
    );
    setProductQuantity(cartPrice?.quantity || 0);
  }, [selectedPriceId, product.prices, items, product.documentId]);

  const handleColorQuantityChange = (colorId: string, quantity: number) => {
    setColorQuantities((prev) => ({
      ...prev,
      [colorId]: quantity,
    }));
  };

  const handleProductQuantityChange = (quantity: number) => {
    setProductQuantity(quantity);
  };

  const handleRemoveColor = (colorId: string) => {
    setColorQuantities((prev) => ({
      ...prev,
      [colorId]: 0,
    }));
    updateItemQuantity(product.documentId, selectedPriceId, colorId, 0);

    const updatedColors = selectedColors.filter(
      (color) => color.documentId !== colorId
    );
    setSelectedColors(updatedColors);

    if (updatedColors.length === 0) {
      updateItemQuantity(product.documentId, selectedPriceId, undefined, 0);
    }
  };

  const handleRemoveProduct = () => {
    removeItem(product.documentId);
  };

  const handleAddToCart = () => {
    const selectedPrice = product.prices.find(
      (price) => price.documentId === selectedPriceId
    );

    if (selectedPrice) {
      const colorsWithQuantities = selectedColors
        .filter((color) => colorQuantities[color.documentId] > 0)
        .map((color) => ({
          colorId: color.documentId,
          colorTitle: color.title,
          colorHex: color.hexadecimal,
          quantity: colorQuantities[color.documentId],
        }));

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
        img: product.image?.[0]?.formats?.thumbnail?.url || "/no_img.webp",
        slug: product.slug,
        prices: [
          {
            priceId: selectedPrice.documentId,
            value: selectedPrice.value,
            quantity: selectedColors.length > 0 ? 0 : productQuantity,
            colors: colorsWithQuantities,
          },
        ],
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-4 w-full">
      <h2>{product.title}</h2>

      <Select
        value={selectedPriceId}
        onValueChange={(value) => setSelectedPriceId(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccione" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Precios</SelectLabel>
            {product.prices.map((price) => (
              <SelectItem key={price.documentId} value={price.documentId}>
                {formatCurrency(price.value)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedColors.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span>Colores</span>
              <div className="flex flex-1 gap-2 ml-5">
                {selectedColors.map((color) => (
                  <div
                    key={color.documentId}
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
                    key={color.documentId}
                    className="flex items-center gap-2"
                  >
                    <Label
                      className="flex items-center gap-2 max-w-24 w-full"
                      htmlFor={color.documentId + product.title}
                    >
                      <div
                        className="w-6 h-6 border rounded-full"
                        style={{ backgroundColor: color.hexadecimal }}
                        title={color.title}
                      ></div>
                      {color.title}
                    </Label>

                    <QuantityInput
                      id={color.documentId + product.title}
                      value={colorQuantities[color.documentId] || 0}
                      onChange={(value) =>
                        handleColorQuantityChange(color.documentId, value)
                      }
                    />
                    {colorQuantities[color.documentId] > 0 && (
                      <CustomTooltip tooltipText="Retirar del carrito">
                        <Button
                          variant={"outline"}
                          onClick={() => handleRemoveColor(color.documentId)}
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
        <div className="flex items-center gap-2 py-2">
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
  );
}
