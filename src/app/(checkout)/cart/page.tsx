import CartPage from "@/components/cart/cart";
import HeaderMain from "@/components/nav-bar/header-main";
import { Breadcrumbs } from "@/components/pager/breadcrumbs";
import { getCategories } from "@/services/category.service";

export default async function Cart() {
  const { data: categories } = await getCategories();

  return (
    <div className="flex flex-col items-center min-h-screen font-[family-name:var(--font-nunito-sans)]">
      <HeaderMain data={{ data: categories }} isCart />

      <main className="flex flex-col gap-5 max-w-screen-2xl items-center w-full p-1 md:p-2">
        <Breadcrumbs
          segments={[
            { title: "Home", href: "/" },
            { title: "Carrito de compras", href: "" },
          ]}
        />
        <CartPage />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
