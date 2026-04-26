const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTMDB<T>(endpoint: string): Promise<T> {
  const token = import.meta.env.VITE_TMDB_BEARER_TOKEN;
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
