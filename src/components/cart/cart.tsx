"use client";

import { useCartStore } from "@/providers/cart.storage.provider";

export const Cart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => clearCart()}>Vaciar Carrito</button>
      <button
        onClick={() =>
          addItem({ id: "1", name: "Producto Ejemplo", price: 10, quantity: 1 })
        }
      >
        Agregar Producto Ejemplo
      </button>
    </div>
  );
};
