import { CarouselBanner } from "@/components/carousel/carousel-banner";
import { NavigationBar } from "@/components/nav-bar/nav-bar-home";
import { getBanners } from "@/services/banner.service";

export default async function Home() {
  const { data } = await getBanners();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen pb-20 gap-16 sm:p-0 font-[family-name:var(--font-geist-sans)] max-w-screen-2xl m-auto">
      <header className="flex justify-center w-full h-20 backdrop-blur-md sticky top-0 z-10">
        <NavigationBar />
      </header>
      <main className="flex flex-col gap-8 items-center  w-full">
        <CarouselBanner data={data} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
