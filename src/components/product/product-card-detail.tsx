"use client";
import { formatCurrency } from "@/libs/utils";
import { Product } from "@/models/product.model";
import { useCartStore } from "@/providers/cart.storage.provider";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductCardDetail({ product }: { product: Product }) {
  const paymentAmount = formatCurrency(product.price);
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const cartItem = items.find((item) => item.id === product.documentId);
  const currentQuantity = cartItem?.quantity || 0;

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      addItem({
        id: product.documentId,
        quantity: -1,
      });
    } else if (currentQuantity === 1) {
      removeItem(product.documentId);
    }
  };

  const handleIncrease = () => {
    addItem({
      id: product.documentId,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col gap-2 pt-2 w-full">
      <h2 className="text-lg font-bold">{product.title}</h2>
      <h3 className="text-base">{paymentAmount}</h3>
      <div className="flex items-center justify-end gap-2">
        <Button disabled={currentQuantity === 0} onClick={handleDecrease}>
          -
        </Button>

        <div className="flex gap-1 px-4 py-2 border rounded-md">
          <ShoppingCart width={20} />
          <span className="">{currentQuantity}</span>
        </div>

        <Button onClick={handleIncrease}>+</Button>
      </div>
    </div>
  );
}
