const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchAPI<T>(url: string): Promise<T> {
  console.log("Fetching API:", BASE_URL);
  const res = await fetch(`${BASE_URL}${url}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}