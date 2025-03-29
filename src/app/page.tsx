import { CarouselBanner } from "@/components/carousel/carousel-banner";
import { CarouselCategory } from "@/components/carousel/carousel-category";
import { CarouselProduct } from "@/components/carousel/carousel-product";
import HeaderMain from "@/components/nav-bar/header-main";
import { Separator } from "@/components/ui/separator";
import { getBanners } from "@/services/banner.service";
import { getCategories } from "@/services/category.service";
import { getProducts } from "@/services/product.service";

export const revalidate = 60;

export default async function Home() {
  const { data: banners } = await getBanners();
  const { data: products } = await getProducts();
  const { data: categories } = await getCategories();

  return (
    <div className="flex flex-col items-center min-h-screen font-[family-name:var(--font-nunito-sans)]">
      <HeaderMain data={{ data: categories }} />
      <main className="flex flex-col gap-5 max-w-screen-2xl items-center w-full p-1 md:p-2">
        <CarouselBanner data={banners} />
        <Separator className="my-4" />
        <h2>Recien llegados</h2>
        <CarouselProduct data={products} />
        <Separator className="my-4" />
        <h2>Categorías destacadas</h2>
        <CarouselCategory data={categories} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
