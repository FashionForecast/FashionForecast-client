import { GUEST_UUID } from '@/constants/localStorage/key';
import { RecentSearchData, ResponseBase } from '@/types/search';
import { guestLogin } from './login';
import { RegionName } from '@/pages/Search/components/RecentSearchList';

export async function getRecentSearch(
  memberId?: string,
  accessToken?: string | null
): Promise<RecentSearchData> {
  try {
    const uuid =
      memberId && accessToken ? memberId : localStorage.getItem(GUEST_UUID);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/search/${uuid}`
    );
    const json: ResponseBase<RecentSearchData> = await res.json();

    if (!res.ok) {
      // 유효하지 않은 비회원 uuid인 경우, 새로운 uuid 발급
      if (json.code === 'S002' && !memberId && !accessToken) {
        const data = await guestLogin();
        if (data.data.uuid) {
          localStorage.setItem(GUEST_UUID, data.data.uuid);
        }
      }

      throw new Error(`${json.code}: ${json.message}`);
    }

    return json.data;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function registerSearchWord(
  region: string,
  memberId?: string,
  accessToken?: string | null
) {
  try {
    const uuid =
      memberId && accessToken ? memberId : localStorage.getItem(GUEST_UUID);
    const [city, district1, district2] = region.split(' ');
    const district = district2 ? `${district1} ${district2}` : district1;

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/search/${uuid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, district }),
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

export async function deleteSearchWord(
  { city, district }: RegionName,
  memberId?: string,
  accessToken?: string | null
) {
  try {
    const uuid =
      memberId && accessToken ? memberId : localStorage.getItem(GUEST_UUID);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/search/${uuid}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, district }),
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
