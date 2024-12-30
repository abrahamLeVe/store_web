"use client";

import { Product } from "@/models/product.model";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Card, CardContent, CardFooter } from "../ui/card";
import ProductCardDetail from "./product-card-detail";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-0">
        <ImageGalleryIndex product={product} />
      </CardContent>
      <CardFooter>
        <ProductCardDetail product={product} />
      </CardFooter>
    </Card>
  );
}

export function ImageGalleryIndex({ product }: { product: Product }) {
  const imageGalleryOptions = {
    showBullets: true,
    lazyLoad: true,
  };

  const images = product.image?.map((item) => ({
    original: item.url,
    originalAlt: item.name,
  })) || [{ original: "/no_img.webp" }];

  return <ImageGallery items={images} {...imageGalleryOptions} />;
}
