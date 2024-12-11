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
    Autoplay({ delay: 2000, stopOnInteraction: true })
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
            <div className="p-1">
              <Card>
                <CardContent className="w-full h-full xl:aspect-video p-6 max-h-[550px]">
                  {banner.image[0].provider_metadata.resource_type ===
                  "video" ? (
                    <video
                      src={banner.image[0].url}
                      autoPlay
                      loop
                      muted
                      className="w-full object-cover"
                    />
                  ) : (
                    <img
                      src={banner.image[0].url}
                      alt={banner.title}
                      className="w-full object-cover"
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
