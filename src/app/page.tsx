import { CarouselBanner } from "@/components/carousel/carousel-banner";
import { CarouselProduct } from "@/components/carousel/carousel-product";
import { ModeToggle } from "@/components/mode-toggle";
import { NavMenu } from "@/components/nav-bar/nav-menu";
import { getBanners } from "@/services/banner.service";
import { getProducts } from "@/services/product.service";

export default async function Home() {
  const { data: banners } = await getBanners();
  const { data: products } = await getProducts();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="w-full">
        <nav className="flex flex-row items-center justify-center h-20 max-w-screen-2xl m-auto gap-1">
          <NavMenu />
          <ModeToggle />
        </nav>
      </header>
      <main className="flex flex-col gap-8 items-center">
        <CarouselBanner data={banners} />
        <CarouselProduct data={products} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
