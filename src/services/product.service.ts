import { fetchDataFromApi } from "@/lib/api";
import { Product } from "@/models/product/product.model";
import { Products } from "@/models/product/products.model";
import qs from "qs";

export const getProducts = async (): Promise<Products> => {
  const queryString = qs.stringify(
    {
      populate: {
        prices: { populate: "*" },
        image: { populate: "*" },
      },
      sort: ["createdAt:desc"],
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchDataFromApi(`/api/products?${queryString}`);
  return res;
};

export const getProduct = async (slug: string): Promise<Products> => {
  const filter = {
    slug: {
      $eq: slug,
    },
  };

  const queryString = qs.stringify(
    {
      populate: {
        prices: { populate: "*" },
        image: { populate: "*" },
      },
      filters: filter,
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchDataFromApi(`/api/products?${queryString}`);
  return res;
};
