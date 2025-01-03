import { Breadcrumbs } from "@/components/pager/breadcrumbs";
import ProductDetails from "@/components/product/product-details";
import ProductNotFound from "@/components/product/product-not-found";
import { getProduct, getProducts } from "@/services/product.service";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.data.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { data: product } = await getProduct(slug);

  if (product.length === 0) {
    return (
      <ProductNotFound
        title="Producto no encontrado"
        message="El producto que estás buscando no existe o ha sido eliminado."
      />
    );
  }

  return (
    <>
      {product[0].prices?.length > 0 ? (
        <>
          <Breadcrumbs
            segments={[
              { title: "Home", href: "/" },
              { title: "Producto", href: "" },
              { title: product[0].title, href: "" },
            ]}
          />
          <ProductDetails product={product[0]} />
        </>
      ) : (
        <ProductNotFound
          title="Producto agotado"
          message="No hay precios disponibles para este producto."
        />
      )}
    </>
  );
}
