const BASE_URL = process.env.NEXT_PUBLIC_TMDB_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const res = await fetch(url, config);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.message || 'API Error');
    error.status = res.status;
    throw error;
  }

  return res.json();
}
