"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CustomTooltip } from "@/hooks/use-tooltip";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/providers/cart.storage.provider";
import { ShoppingCart, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { ProductDetailButton } from "../product/product-detail-button";
import { QuantityInput } from "../product/quantity-input";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Price } from "@/models/cart.model";

export function SheetCart() {
  const { updateItemQuantity, removeItem, items, updateItemPrices } =
    useCartStore((state) => state);

  const currentQuantity = items.length || 0;

  const handleDecrease = (
    id: string,
    modelId: string,
    priceId: string,
    colorKey: string | undefined,
    quantity: number
  ) => {
    if (quantity > 1) {
      updateItemQuantity(id, modelId, priceId, colorKey, quantity - 1);
    } else if (quantity === 1) {
      updateItemQuantity(id, modelId, priceId, colorKey, 0);
    }
  };

  const handleIncrease = (
    id: string,
    modelId: string,
    priceId: string,
    colorKey: string | undefined,
    quantity: number
  ) => {
    updateItemQuantity(id, modelId, priceId, colorKey, quantity + 1);
  };

  const handleRemovePrice = (
    itemId: string,
    modelId: string,
    priceId: string
  ) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      const model = item.models.find((model) => model.modelId === modelId);
      if (model) {
        // Filtrar los precios para eliminar el precio específico
        const updatedPrices = model.prices.filter(
          (price) => price.priceId !== priceId
        );

        if (updatedPrices.length > 0) {
          // Si quedan precios, actualizamos el modelo con los precios restantes
          const updatedModels = item.models.map((m) =>
            m.modelId === modelId ? { ...m, prices: updatedPrices } : m
          );
          updateItemPrices(itemId, modelId, updatedPrices);
        } else {
          // Si no quedan precios, eliminamos el modelo
          const updatedModels = item.models.filter(
            (m) => m.modelId !== modelId
          );

          if (updatedModels.length > 0) {
            // Si quedan modelos, actualizamos el producto con los modelos restantes
            const updatedItems = items.map((i) =>
              i.id === itemId ? { ...i, models: updatedModels } : i
            );
            // Actualiza el estado global con los productos restantes
            updateItemPrices(itemId, modelId, []);
          } else {
            // Si no quedan modelos, eliminamos el producto completo
            removeItem(itemId);
          }
        }
      }
    }
  };

  const calculateSubtotal = useCallback((price: Price): number => {
    if (price.colors && price.colors.length > 0) {
      return price.colors.reduce(
        (subtotal, color) => subtotal + color.quantity * price.value,
        0
      );
    }
    return price.quantity * price.value;
  }, []);

  const total = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.models.reduce(
            (modelTotal, model) =>
              modelTotal +
              model.prices.reduce(
                (priceTotal, price) => priceTotal + calculateSubtotal(price),
                0
              ),
            0
          ),
        0
      ),
    [items, calculateSubtotal]
  );

  const shippingCost = 10; // Ejemplo de costo de envío fijo
  const igv = total * 0.18; // Ejemplo de IGV (18%)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" disabled={currentQuantity === 0}>
          <ShoppingCart />
          <Badge>{currentQuantity}</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu carrito</SheetTitle>
          <SheetDescription>
            Revisa los productos en tu carrito.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full py-4 pr-4">
          {items.length > 0 ? (
            <>
              {items.map((item) =>
                item.models.map((model) =>
                  model.prices.map((price) => (
                    <div
                      key={`${item.id}-${model.modelId}-${price.priceId}`}
                      className="flex flex-col gap-2 py-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative group">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="absolute inset-0 transition-opacity opacity-50 group-hover:opacity-100">
                              <ProductDetailButton
                                slug={item.slug}
                                title={item.name}
                              />
                            </div>
                          </div>
                          <div>
                            <h3>{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              {model.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatCurrency(price.value)}
                            </p>
                          </div>
                        </div>
                        <CustomTooltip tooltipText="Retirar del carrito">
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              handleRemovePrice(
                                item.id,
                                model.modelId,
                                price.priceId
                              )
                            }
                            size="icon"
                          >
                            <TrashIcon className="text-red-500" />
                          </Button>
                        </CustomTooltip>
                      </div>
                      {price.colors && price.colors.length > 0 ? (
                        price.colors.map((color) => (
                          <div
                            key={color.colorKey}
                            className="flex items-center justify-end gap-4"
                          >
                            <div className="flex items-center justify-start gap-2 w-full">
                              <div
                                className="w-6 h-6 border rounded-full"
                                style={{ backgroundColor: color.colorHex }}
                                title={color.colorTitle}
                              ></div>
                              <span className="text-sm">
                                {color.colorTitle}
                              </span>
                            </div>
                            <QuantityInput
                              id={`quantity-${item.id}-${model.modelId}-${price.priceId}-${color.colorKey}`}
                              value={color.quantity}
                              onChange={(value) =>
                                updateItemQuantity(
                                  item.id,
                                  model.modelId,
                                  price.priceId,
                                  color.colorKey,
                                  value
                                )
                              }
                            />
                            <Button
                              variant={"outline"}
                              onClick={() =>
                                handleDecrease(
                                  item.id,
                                  model.modelId,
                                  price.priceId,
                                  color.colorKey,
                                  color.quantity
                                )
                              }
                            >
                              -
                            </Button>
                            <Button
                              variant={"outline"}
                              onClick={() =>
                                handleIncrease(
                                  item.id,
                                  model.modelId,
                                  price.priceId,
                                  color.colorKey,
                                  color.quantity
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-end gap-4">
                          <QuantityInput
                            id={`quantity-${item.id}-${model.modelId}-${price.priceId}-default`}
                            value={price.quantity}
                            onChange={(value) =>
                              updateItemQuantity(
                                item.id,
                                model.modelId,
                                price.priceId,
                                undefined,
                                value
                              )
                            }
                          />
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              handleDecrease(
                                item.id,
                                model.modelId,
                                price.priceId,
                                undefined,
                                price.quantity
                              )
                            }
                          >
                            -
                          </Button>
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              handleIncrease(
                                item.id,
                                model.modelId,
                                price.priceId,
                                undefined,
                                price.quantity
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      )}
                      <div className="flex justify-end">
                        <p className="text-sm font-semibold">
                          Subtotal: {formatCurrency(calculateSubtotal(price))}
                        </p>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))
                )
              )}
            </>
          ) : (
            <p className="py-5 text-center text-gray-500">
              Tu carrito está vacío.
            </p>
          )}
          <SheetFooter className="sticky bottom-5">
            {items.length > 0 ? (
              <Card className="backdrop-blur-2xl bg-inherit w-full">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                  <CardDescription>Productos en el carrito.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Costo de Envío:</span>
                    <span>{formatCurrency(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IGV (18%):</span>
                    <span>{formatCurrency(igv)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(total + shippingCost + igv)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <SheetClose asChild>
                    <div className="flex flex-wrap justify-end gap-4 w-full">
                      <Button className="relative" type="button">
                        <Link className="absolute inset-0" href={"/cart"} />
                        Ver carrito
                      </Button>
                      <Button className="relative" type="button">
                        <Link className="absolute inset-0" href={"/payment"} />
                        Pagar
                      </Button>
                    </div>
                  </SheetClose>
                </CardFooter>
              </Card>
            ) : (
              <SheetClose asChild>
                <Button className="relative m-auto" type="button">
                  <Link className="absolute inset-0" href={"/products"} />
                  Ver ofertas
                </Button>
              </SheetClose>
            )}
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
