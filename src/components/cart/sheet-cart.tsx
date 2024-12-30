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
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/providers/cart.storage.provider";
import { ShoppingCart, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function SheetCart() {
  const { updateItemQuantity, removeItem, items, updateItemPrices } =
    useCartStore((state) => state);

  const currentQuantity = items.length || 0;

  const handleDecrease = (
    id: string,
    priceId: string,
    colorId: string | undefined,
    quantity: number
  ) => {
    if (quantity > 1) {
      updateItemQuantity(id, priceId, colorId, quantity - 1);
    } else if (quantity === 1) {
      updateItemQuantity(id, priceId, colorId, 0);
    }
  };

  const handleIncrease = (
    id: string,
    priceId: string,
    colorId: string | undefined,
    quantity: number
  ) => {
    updateItemQuantity(id, priceId, colorId, quantity + 1);
  };

  const handleRemovePrice = (itemId: string, priceId: string) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      const updatedPrices = item.prices.filter(
        (price) => price.priceId !== priceId
      );
      if (updatedPrices.length > 0) {
        updateItemPrices(itemId, updatedPrices);
      } else {
        removeItem(itemId);
      }
    }
  };

  interface Color {
    colorId: string;
    colorHex: string;
    colorTitle: string;
    quantity: number;
  }

  interface Price {
    priceId: string;
    value: number;
    quantity: number;
    colors?: Color[];
  }

  const calculateSubtotal = (price: Price): number => {
    if (price.colors && price.colors.length > 0) {
      return price.colors.reduce(
        (subtotal, color) => subtotal + color.quantity * price.value,
        0
      );
    }
    return price.quantity * price.value;
  };

  const total = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.prices.reduce(
            (itemTotal, price) => itemTotal + calculateSubtotal(price),
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
          <ShoppingCart width={20} />
          <Badge>{currentQuantity}</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu carrito</SheetTitle>
          <SheetDescription>
            Revisa los productos en tu carrito. Ajusta las cantidades o quita
            productos si es necesario.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full max-h-[calc(100vh-400px)] pr-3">
          {items.length > 0 ? (
            items.map((item) =>
              item.prices.map((price) => (
                <div
                  key={`${item.id}-${price.priceId}`}
                  className="flex flex-col gap-2 py-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3>{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(price.value)}
                        </p>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"outline"}
                          onClick={() =>
                            handleRemovePrice(item.id, price.priceId)
                          }
                        >
                          <TrashIcon className="w-5 h-5 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Retirar</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {price.colors && price.colors.length > 0 ? (
                    price.colors.map((color) => (
                      <div
                        key={color.colorId}
                        className="flex items-center justify-end gap-4"
                      >
                        <div className="flex items-center justify-start gap-2 w-full">
                          <div
                            className="w-6 h-6 border rounded-full"
                            style={{ backgroundColor: color.colorHex }}
                            title={color.colorTitle}
                          ></div>
                          <span className="text-sm">{color.colorTitle}</span>
                        </div>
                        <QuantityInput
                          id={`quantity-${item.id}-${price.priceId}-${color.colorId}`}
                          value={color.quantity}
                          onChange={(value) =>
                            updateItemQuantity(
                              item.id,
                              price.priceId,
                              color.colorId,
                              value
                            )
                          }
                        />
                        <Button
                          variant={"outline"}
                          onClick={() =>
                            handleDecrease(
                              item.id,
                              price.priceId,
                              color.colorId,
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
                              price.priceId,
                              color.colorId,
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
                        id={`quantity-${item.id}-${price.priceId}`}
                        value={price.quantity}
                        onChange={(value) =>
                          updateItemQuantity(
                            item.id,
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
          ) : (
            <p className="text-center text-gray-500">Tu carrito está vacío.</p>
          )}
        </ScrollArea>
        <SheetFooter>
          {items.length > 0 ? (
            <Card className="mt-4 w-full">
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
                  <div className="flex flex-wrap gap-4">
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
              <Button className="relative" type="button">
                <Link className="absolute inset-0" href={"/products"} />
                Ver ofertas
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
