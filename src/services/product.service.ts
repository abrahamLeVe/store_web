import { fetchDataFromApi } from "@/lib/api";
import { Products } from "@/models/product.model";
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
