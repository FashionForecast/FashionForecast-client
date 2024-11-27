export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, options);
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}`);
    }

    return json.data as T;
  } catch (error) {
    throw new Error(String(error));
  }
}
