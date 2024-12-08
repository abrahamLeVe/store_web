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
import { Banners } from "@/models/banner.model";
import { BannerCard } from "../banner/banner-card";
import { CarouselDots } from "./carousel-dot";

export function CarouselBanner({ data }: Banners) {
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
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ).current;

  const handleDotClick = (index: number) => {
    if (api) {
      setCurrent(index);
      api.scrollTo(index);
    }
  };

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin]}
      onMouseEnter={plugin.stop}
      onMouseLeave={plugin.reset}
      className="mx-auto w-full max-w-screen-2xl"
    >
      <CarouselContent>
        {data.map((banner) => {
          const { url, provider_metadata } = banner.image[0];
          const { title, documentId } = banner;
          const isVideo = provider_metadata.resource_type === "video";

          return (
            <CarouselItem key={documentId}>
              <BannerCard url={url} title={title} isVideo={isVideo} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
      <CarouselDots
        count={count}
        current={current}
        onDotClick={handleDotClick}
        isCount
      />
    </Carousel>
  );
}
