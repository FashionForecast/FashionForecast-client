import { GUEST_UUID } from '@/constants/localStorage/key';
import { RecentSearchData, ResponseBase } from '@/types/search';
import { guestLogin } from './login';

export async function getRecentSearch(): Promise<RecentSearchData> {
  try {
    const uuid = localStorage.getItem(GUEST_UUID);

    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/search/${uuid}`
    );
    const json: ResponseBase<RecentSearchData> = await res.json();

    if (!res.ok) {
      // 유효하지 않은 uuid인 경우, 새로운 uuid 발급
      if (json.code === 'S002') {
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
