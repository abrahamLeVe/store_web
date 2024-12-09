"use client";

import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Products } from "@/models/product.model";
import ProductCard from "../product/product-card";
import { CarouselDots } from "./carousel-dot";

export function CarouselProduct({ data }: Products) {
  /*renderiza 3 veces*/
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  ).current;

  const handleDotClick = (index: number) => {
    if (api) {
      setCurrent(index);
      api.scrollTo(index);
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-2xl">
      <Carousel
        setApi={setApi}
        plugins={[plugin]}
        onMouseEnter={plugin.stop}
        onMouseLeave={plugin.reset}
      >
        <CarouselContent>
          {data.map((product) => {
            return (
              <CarouselItem
                key={product.documentId}
                className=" md:basis-1/2 lg:basis-1/3"
              >
                <ProductCard product={product} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      <CarouselDots
        count={count}
        current={current}
        onDotClick={handleDotClick}
      />
    </div>
  );
}
