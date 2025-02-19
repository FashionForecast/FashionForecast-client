import { fetchAPI } from '@/shared/lib';

export async function submitFeedback(feedback: string) {
  await fetchAPI('/board', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: feedback }),
  });
}
