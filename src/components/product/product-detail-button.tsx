import { LucideEye } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { CustomTooltip } from "./product-card-detail";

interface ProductDetailButtonProps {
  slug: string;
  title: string;
}

export function ProductDetailButton({ slug, title }: ProductDetailButtonProps) {
  return (
    <CustomTooltip tooltipText={`Ver más detalles de ${title}`}>
      <Button className="absolute top-0 right-0" variant="default">
        <LucideEye />
        <Link href={`/product/${slug}`} className="absolute inset-0"></Link>
      </Button>
    </CustomTooltip>
  );
}
