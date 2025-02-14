import { Guest } from '@/types/auth';
import { fetchAPI } from '@/shared/lib';

export async function guestLogin() {
  return fetchAPI<Guest>('/guest/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uuid: null }),
  });
}
