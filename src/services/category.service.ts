import { fetchDataFromApi } from "@/libs/api";
import { Categories } from "@/models/category.model";

import qs from "qs";

export const getCategories = async (): Promise<Categories> => {
  const queryString = qs.stringify(
    {
      populate: "*",
      sort: ["createdAt:desc"],
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchDataFromApi(`/api/categories?${queryString}`);
  return res;
};
