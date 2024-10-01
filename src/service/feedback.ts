export async function submitFeedback(feedback: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: feedback }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(`${json.code}: ${json.message}`);
    }

    return json;
  } catch (error) {
    throw new Error(error as string);
  }
}
