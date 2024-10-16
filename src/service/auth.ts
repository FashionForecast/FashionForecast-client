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

export async function getUser(token: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/member`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function setUserGender(gender: string, accessToken: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/member/gender`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender }),
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
