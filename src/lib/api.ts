import { API_TOKEN, API_URL } from "./urls";

export async function fetchDataFromApi(endpoint: string): Promise<any> {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (API_TOKEN || ""),
      },
    };

    const res = await fetch(`${API_URL}${endpoint}`, options);

    return res.json();
  } catch (error) {
    console.log("Error of fetchDataFromApi", error);
  }
}
