export async function getAccessToken() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/login/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json.data.accessToken;
  } catch (error) {
    throw new Error(error as string);
  }
}
