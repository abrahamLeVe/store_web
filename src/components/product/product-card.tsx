"use client";

import { Product } from "@/models/product.model";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Card, CardContent, CardFooter } from "../ui/card";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="p-1">
      <Card className="h-full overflow-hidden">
        <CardContent className="aspect-1 p-0 cursor-none">
          <ImageGalleryIndex product={product} />
        </CardContent>
        <CardFooter className="pt-2">
          {/* <ProductDetail product={product} /> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export function ImageGalleryIndex({ product }: { product: Product }) {
  const imageGalleryOptions = {
    showBullets: true,
    lazyLoad: true,
    loading: "lazy",
  };

  const images = product.image?.map((item) => ({
    original: item.url,
    originalAlt: item.name,
    originalHeight: item.height!,
    originalWidth: item.width!,
  })) || [{ original: "/no_img.webp" }];

  return <ImageGallery items={images} {...imageGalleryOptions} />;
}
