import { Breadcrumbs } from "@/components/pager/breadcrumbs";
import ProductCard from "@/components/product/product-card";
import ProductNotFound from "@/components/product/product-not-found";
import { getSubCategories } from "@/services/sub-categories.service";

// export async function generateStaticParams() {
//   const products = await getProducts();
//   return products.data.map((product) => ({
//     slug: product.slug,
//   }));
// }

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ subslug: string }>;
}) {
  const slug = (await params).subslug;
  const { data } = await getSubCategories(slug);

  if (!data || data.length === 0) {
    return (
      <ProductNotFound
        title="Categoría no encontrada"
        message="La categoría que estás buscando no existe o ha sido eliminado."
      />
    );
  }

  const products = data[0]?.products ?? [];

  return (
    <>
      <Breadcrumbs
        segments={[
          { title: "Home", href: "/" },
          { title: "Categoría", href: "" },
          { title: data[0].title, href: "" },
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto w-full mt-8">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.documentId} product={product} />
          ))
        ) : (
          <div className="col-span-full">
            <ProductNotFound
              title="Sin productos"
              message="No hay productos disponibles en esta subcategoría."
            />
          </div>
        )}
      </div>
    </>
  );
}
