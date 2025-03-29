import { fetchDataFromApi } from "@/lib/api";
import { Products } from "@/models/products.model";
import qs from "qs";

export const getProducts = async (): Promise<Products> => {
  const queryString = qs.stringify(
    {
      populate: {
        models: {
          populate: {
            prices: {
              populate: "*",
            },
            image: {
              fields: ["*"],
            },
          },
        },
        category: {
          fields: ["*"],
        },
        brand: {
          fields: ["*"],
        },
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
        models: {
          populate: {
            prices: {
              populate: "*",
            },
            image: {
              fields: ["*"],
            },
          },
        },
        category: {
          fields: ["*"],
        },
        brand: {
          fields: ["*"],
        },
      },
      filters: filter,
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchDataFromApi(`/api/products?${queryString}`);
  return res;
};
