const BASE_URL = "https://api-jxvm46idy.brevlab.com";

export async function fetchAPI<T>(url: string): Promise<T> {
  console.log("Fetching API:", BASE_URL);
  const res = await fetch(`${BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}