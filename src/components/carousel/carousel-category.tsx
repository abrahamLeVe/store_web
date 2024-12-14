"use client";

import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Categories } from "@/models/category.model";
import CategoryCard from "../category/category-card";

export function CarouselCategory({ data }: Categories) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-screen-2xl px-1"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((category) => {
          return (
            <CarouselItem
              key={category.documentId}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <CategoryCard category={category} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
