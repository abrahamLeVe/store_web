import { formatCurrency } from "@/lib/utils";
import { Product } from "@/models/product.model";

export default function ProductCardDetail({ product }: { product: Product }) {
  const paymentAmount = formatCurrency(product.price);

  return (
    <div>
      <h2 className="text-lg">{product.title}</h2>
      <h3 className="text-base">{paymentAmount}</h3>
    </div>
  );
}
