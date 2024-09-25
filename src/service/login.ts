import { guestLoginResponse } from '@/types/login';

export async function guestLogin(): Promise<guestLoginResponse> {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/guest/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid: null }),
      }
    );

    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json;
  } catch (error) {
    throw new Error(error as string);
  }
}
