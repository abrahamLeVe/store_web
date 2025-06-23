import { fetchDataFromApi } from "@/lib/api";
import { Categories } from "@/models/category.model";
import { CategoriesBySub } from "@/models/sub-categories.model";

import qs from "qs";

export const getCategories = async (): Promise<Categories> => {
  const queryString = qs.stringify(
    {
      populate: "*",
      sort: ["title:asc"],
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchDataFromApi(`/api/categories?${queryString}`);
  return res;
};

export const getSubCategories = async (
  categorySlug: string
): Promise<CategoriesBySub> => {
  const filter = {
    slug: {
      $eq: categorySlug,
    },
  };

  const queryString = qs.stringify(
    {
      populate: {
        sub_categories: {
          populate: {
            image: {
              fields: "*",
            },
            products: {
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

  const res = await fetchDataFromApi(`/api/categories?${queryString}`);
  return res;
};
