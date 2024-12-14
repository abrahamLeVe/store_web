import { fetchDataFromApi } from "@/libs/api";
import { Products } from "@/models/product.model";

import qs from "qs";

export const getProducts = async (): Promise<Products> => {
  const queryString = qs.stringify(
    {
      populate: "*",
      sort: ["createdAt:desc"],
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchDataFromApi(`/api/products?${queryString}`);
  return res;
};
