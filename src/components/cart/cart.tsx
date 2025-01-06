"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/providers/cart.storage.provider";
import { Label } from "@radix-ui/react-label";
import { TrashIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { QuantityInput } from "../product/quantity-input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ProductDetailButton } from "../product/product-detail-button";
import { CustomTooltip } from "@/hooks/use-tooltip";

export default function Cart() {
  const { items, updateItemQuantity, removeItem, clearCart } = useCartStore(
    (state) => state
  );

  const handleQuantityChange = (
    itemId: string,
    priceId: string,
    colorId: string | undefined,
    quantity: number
  ) => {
    updateItemQuantity(itemId, priceId, colorId, quantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleRemoveColor = (
    itemId: string,
    priceId: string,
    colorId: string
  ) => {
    updateItemQuantity(itemId, priceId, colorId, 0);
  };

  const handleClearCart = () => {
    clearCart();
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
    <div className="flex flex-col w-full gap-4">
      <h2 className="mb-4">Carrito de Compras</h2>
      {items.length === 0 ? (
        <p className="text-center">El carrito está vacío.</p>
      ) : (
        <div className="flex flex-col w-full lg:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <Table>
              <TableCaption>Lista de productos en tu carrito.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Acciones</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) =>
                  item.prices.map((price) => (
                    <TableRow key={`${item.id}-${price.priceId}`}>
                      <TableCell>
                        <div className="flex items-center gap-4 min-w-40">
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
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(price.value)}
                        </p>
                      </TableCell>
                      <TableCell>
                        {price.colors && price.colors.length > 0 ? (
                          price.colors.map((color) => (
                            <div
                              key={color.colorId}
                              className="flex justify-between gap-2"
                            >
                              <Label
                                className="flex items-center gap-2"
                                htmlFor={`quantity-${item.id}-${price.priceId}-${color.colorId}`}
                              >
                                <div
                                  className="w-6 h-6 border rounded-full"
                                  style={{ backgroundColor: color.colorHex }}
                                  title={color.colorTitle}
                                ></div>
                                <span className="text-sm">
                                  {color.colorTitle}
                                </span>
                              </Label>
                              <div className="py-1">
                                <QuantityInput
                                  id={`quantity-${item.id}-${price.priceId}-${color.colorId}`}
                                  value={color.quantity}
                                  onChange={(value) =>
                                    handleQuantityChange(
                                      item.id,
                                      price.priceId,
                                      color.colorId,
                                      value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex justify-end">
                            <QuantityInput
                              id={`quantity-${item.id}-${price.priceId}`}
                              value={price.quantity}
                              onChange={(value) =>
                                handleQuantityChange(
                                  item.id,
                                  price.priceId,
                                  undefined,
                                  value
                                )
                              }
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {price.colors && price.colors.length > 0 ? (
                          price.colors.map((color) => (
                            <div key={color.colorId} className="py-1">
                              <CustomTooltip tooltipText="Retirar del carrito">
                                <Button
                                  variant={"outline"}
                                  onClick={() =>
                                    handleRemoveColor(
                                      item.id,
                                      price.priceId,
                                      color.colorId
                                    )
                                  }
                                  size="icon"
                                >
                                  <TrashIcon className="text-red-500" />
                                </Button>
                              </CustomTooltip>
                            </div>
                          ))
                        ) : (
                          <CustomTooltip tooltipText="Retirar del carrito">
                            <Button
                              variant={"outline"}
                              onClick={() => handleRemoveItem(item.id)}
                              size="icon"
                            >
                              <TrashIcon className="text-red-500" />
                            </Button>
                          </CustomTooltip>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-semibold text-right">
                          {formatCurrency(calculateSubtotal(price))}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="text-right" colSpan={4}>
                    Total
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(total)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <Card className="lg:w-1/3 h-fit sticky top-28">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
              <CardDescription>Productos en el carrito.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
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
              <Button
                variant={"outline"}
                onClick={handleClearCart}
                className="w-full"
              >
                Vaciar Carrito
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
