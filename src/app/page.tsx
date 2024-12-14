import { CarouselBanner } from "@/components/carousel/carousel-banner";
import { CarouselCategory } from "@/components/carousel/carousel-category";
import { CarouselProduct } from "@/components/carousel/carousel-product";
import { Cart } from "@/components/cart/cart";
import { ModeToggle } from "@/components/mode-toggle";
import MobileMenu from "@/components/nav-bar/mobile-menu";
import { NavMenu } from "@/components/nav-bar/nav-menu";
import { Separator } from "@/components/ui/separator";
import { getBanners } from "@/services/banner.service";
import { getCategories } from "@/services/category.service";
import { getProducts } from "@/services/product.service";

export default async function Home() {
  const { data: banners } = await getBanners();
  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen font-[family-name:var(--font-nunito-sans)]">
      <header className="w-full backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <nav className="flex flex-row items-center justify-between h-24 max-w-screen-2xl m-auto gap-1 px-4">
          <div className="flex gap-4">
            <div className="aspect-square max-w-20">
              <img
                src="/logo.webp"
                alt="Store Web"
                className="w-full object-cover rounded-sm"
                loading="eager"
              />
            </div>
            <div className="hidden lg:flex">
              <NavMenu />
            </div>
          </div>
          <div className="flex gap-4">
            <ModeToggle />
            <div className="flex lg:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-col gap-8 items-center">
        <CarouselBanner data={banners} />
        <Separator className="my-4" />
        <h2 className="font-semibold text-xl">Recien llegados</h2>
        <CarouselProduct data={products} />
        <Separator className="my-4" />
        <h2 className="font-semibold text-xl">Categorías destacadas</h2>
        <CarouselCategory data={categories} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
