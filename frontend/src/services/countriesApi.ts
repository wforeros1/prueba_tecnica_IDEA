import type { Country } from '../types/country';

const BASE_URL = 'http://localhost:3000/countries';

export async function fetchCountries(region?: string, sort?: string): Promise<Country[]> {
  const params = new URLSearchParams();
  if (region) params.append('region', region);
  if (sort) params.append('sort', sort);

  const url = params.toString() ? `${BASE_URL}?${params.toString()}` : BASE_URL;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching countries: ${response.statusText}`);
  }

  return response.json();
}
