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
  type CarouselApi,
} from "@/components/ui/carousel";
import { Banners } from "@/models/banner.model";

export function CarouselBanner({ data, meta }: Banners) {
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
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

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
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {data.map((banner) => {
            const { url, provider_metadata } = banner.image[0];
            const isVideo = provider_metadata.resource_type === "video";

            return (
              <CarouselItem key={banner.documentId}>
                <div className="p-1">
                  <Card>
                    <CardContent className="p-6 max-h-[550px] overflow-hidden">
                      {isVideo ? (
                        <video
                          src={url}
                          autoPlay
                          loop
                          muted
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={url}
                          alt={banner.title}
                          className="w-full h-full object-cover"
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
      <div className="py-2 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-primary" : "bg-muted"
            } transition-colors duration-200`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {current + 1} de {count}
      </div>
    </div>
  );
}
