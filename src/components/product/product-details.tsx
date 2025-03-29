"use client";
import { Product } from "@/models/products.model";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProductCardDetail from "./product-card-detail";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col h-full w-full lg:flex-row gap-10">
      <div className="h-full lg:w-[50%] lg:sticky top-28 lg:p-3">
        <ProductCardImage product={product} />
      </div>
      <div className="flex flex-col lg:w-[50%] gap-4 lg:p-3">
        <ProductCardDetail product={product} />
        <Card>
          <CardHeader>
            <CardTitle>Descripción de {product.title}</CardTitle>
            <CardDescription>Características principales.</CardDescription>
          </CardHeader>
          <CardContent>
            <article className="prose prose-invert max-w-none text-inherit">
              <Markdown remarkPlugins={[remarkGfm]}>
                {product.description}
              </Markdown>
            </article>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProductCardImage({ product }: { product: Product }) {
  const imageGalleryOptions = {
    showBullets: true,
    showIndex: true,
    lazyLoad: true,
  };

  const images = product.models[0].image?.map((item) => ({
    original: item.url,
    originalAlt: item.name,
    thumbnail: item.formats.small.url,
  })) || [{ original: "/no_img.webp", thumbnail: "/no_img.webp" }];

  return (
    <ImageGallery
      items={images}
      {...imageGalleryOptions}
      thumbnailPosition="left"
    />
  );
}
