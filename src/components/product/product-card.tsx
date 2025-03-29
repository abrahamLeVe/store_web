"use client";

import { Product } from "@/models/products.model";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Card, CardContent, CardFooter } from "../ui/card";
import ProductCardDetail from "./product-card-detail";
import { ProductDetailButton } from "./product-detail-button";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden h-full relative">
      <CardContent className="p-0">
        <ProductCardImage product={product} />
        <ProductDetailButton slug={product.slug} title={product.title} />
      </CardContent>
      <CardFooter>
        <ProductCardDetail product={product} />
      </CardFooter>
    </Card>
  );
}

function ProductCardImage({ product }: { product: Product }) {
  const imageGalleryOptions = {
    showBullets: true,
    lazyLoad: true,
  };

  const images = product.models[0].image?.map((item) => ({
    original: item.url,
    originalAlt: item.name,
  })) || [{ original: "/no_img.webp" }];

  return <ImageGallery items={images} {...imageGalleryOptions} />;
}
