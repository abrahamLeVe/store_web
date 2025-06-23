import SubCategoryCard from "@/components/category/sub-category-card";
import { Breadcrumbs } from "@/components/pager/breadcrumbs";
import ProductNotFound from "@/components/product/product-not-found";
import { getSubCategories } from "@/services/category.service";
import { getProducts } from "@/services/product.service";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.data.map((product) => ({
    slug: product.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { data: categories } = await getSubCategories(slug);
  if (categories.length === 0) {
    return (
      <ProductNotFound
        title="Categoría no encontrada"
        message="La categoría que estás buscando no existe o ha sido eliminado."
      />
    );
  }

  return (
    <>
      {categories[0].sub_categories?.length > 0 ? (
        <>
          <Breadcrumbs
            segments={[
              { title: "Home", href: "/" },
              { title: "Categoría", href: "" },
              { title: categories[0].title, href: "" },
            ]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  mx-auto mt-8">
            {categories[0].sub_categories.map((category) => (
              <SubCategoryCard
                key={category.documentId}
                title={category.title}
                href={`/category/${slug}/${category.title}`}
                category={category}
              />
            ))}
          </div>
        </>
      ) : (
        <ProductNotFound
          title="Categoría agotada"
          message="No hay productos disponibles para esta categoría."
        />
      )}
    </>
  );
}
