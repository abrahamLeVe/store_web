import { fetchDataFromApi } from "@/lib/api";
import { SubCategory } from "@/models/sub-category-products.model";
import qs from "qs";

export const getSubCategories = async (
  title?: string
): Promise<SubCategory> => {
  const filter = {
    title: {
      $eq: title,
    },
  };
  const queryString = qs.stringify(
    {
      populate: {
        products: {
          populate: {
            models: {
              populate: {
                prices: { populate: "*" },
                image: { populate: "*" },
              },
            },
            category: {
              fields: ["*"],
            },
            brand: {
              fields: ["*"],
            },
          },
        },
      },
      filters: filter,
      sort: ["createdAt:desc"],
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchDataFromApi(`/api/sub-categories?${queryString}`);
  return res;
};
