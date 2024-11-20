import { SelectedTime } from '@/pages/Home/HomePage';
import { TempCondition } from '@/pages/Home/ClothesSection/ClothesSection';
import { TimeSetOption } from '@/pages/User/TabSection/SettingList/TimeSetMenu/TimeSetMenu';

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

export async function logout(accessToken: string | null) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.');

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/member/logout`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function withdrawlAccount(accessToken: string | null) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.');

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/login/account`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }
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

export async function setUserTime(
  select: SelectedTime,
  option: TimeSetOption,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.');

    const data = {
      startTime: option === 'DEFAULT' ? option : select.start,
      endTime: option === 'DEFAULT' ? option : select.end,
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/member/outingTime`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function setUserRegion(
  region: string,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.');

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/member/region`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region: region }),
      }
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function setUserTempCondition(
  option: TempCondition,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.');

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/member/temp-condition`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tempCondition: option }),
      }
    );
    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
