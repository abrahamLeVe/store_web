import { api_token, api_url } from "./urls";

export async function fetchDataFromApi(endpoint: string): Promise<any> {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (api_token || ""),
      },
    };

    const res = await fetch(`${api_url}${endpoint}`, options);

    return res.json();
  } catch (error) {
    console.log("Error of fetchDataFromApi", error);
  }
}
