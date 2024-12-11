import { fetchDataFromApi } from "@/lib/api";
import { Banners } from "@/models/banner.model";
import qs from "qs";

export const getBanners = async (): Promise<Banners> => {
  const queryString = qs.stringify(
    {
      populate: "*",
      sort: ["createdAt:desc"],
    },
    { encodeValuesOnly: true }
  );

  const res = await fetchDataFromApi(`/api/banners?${queryString}`);
  return res;
};
