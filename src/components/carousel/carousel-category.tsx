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
import { Card, CardContent } from "../ui/card";

export function CarouselCategory({ data }: Categories) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="mx-auto w-full max-w-screen-2xl">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-screen-2xl"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {data.map((category) => {
            return (
              <CarouselItem
                key={category.documentId}
                className=" md:basis-1/2 lg:basis-1/3"
              >
                <div className="lg:p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="w-full h-full p-0 lg:p-6 ">
                      {category.image?.provider_metadata.resource_type ===
                      "video" ? (
                        <video
                          src={category.image?.url}
                          loop
                          muted
                          controls
                          className="w-full object-cover aspect-square"
                        />
                      ) : (
                        <img
                          src={category.image?.url}
                          alt={category.title}
                          className="w-full object-cover aspect-square"
                          loading="lazy"
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
