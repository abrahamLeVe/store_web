"use client";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Banners } from "@/models/banner.model";

export function CarouselBanner({ data }: Banners) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-screen-2xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((banner) => (
          <CarouselItem key={banner.documentId}>
            <div className="lg:p-1">
              <Card className="overflow-hidden">
                <CardContent className="w-full h-full p-0 lg:p-6 ">
                  {banner.image.provider_metadata.resource_type === "video" ? (
                    <video
                      src={banner.image.url}
                      autoPlay
                      loop
                      muted
                      controls
                      className="w-full object-cover aspect-[16/5]"
                    />
                  ) : (
                    <img
                      src={banner.image.url}
                      alt={banner.title}
                      className="w-full object-cover aspect-[16/5]"
                      loading="lazy"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
