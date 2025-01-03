import { SheetCart } from "../cart/sheet-cart";
import { ModeToggle } from "../mode-toggle";
import MobileMenu from "./mobile-menu";
import { NavMenu } from "./nav-menu";

export default function HeaderMain({ isCart = false }) {
  return (
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
          {!isCart && <SheetCart />}
          <div className="flex lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
