import CartPage from "@/components/cart/cart";
import { ModeToggle } from "@/components/mode-toggle";
import MobileMenu from "@/components/nav-bar/mobile-menu";
import { NavMenu } from "@/components/nav-bar/nav-menu";
import Link from "next/link";

export default async function Cart() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen font-[family-name:var(--font-nunito-sans)]">
      <header className="w-full backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <nav className="flex flex-row items-center justify-between h-24 max-w-screen-2xl m-auto gap-1 px-4">
          <div className="flex gap-4">
            <div className="relative aspect-square max-w-20">
              <img
                src="/logo.webp"
                alt="Store Web"
                className="w-full object-cover rounded-sm"
                loading="eager"
              />
              <Link className="absolute inset-0" href={"/"} />
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
      <main className="max-w-screen-2xl w-full">
        <CartPage />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
