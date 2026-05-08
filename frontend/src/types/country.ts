export interface Country {
  name: string;
  capital: string;
  region: string;
  population: number;
  flag: string;
}

export type SortOption = 'name_asc' | 'name_desc' | 'pop_asc' | 'pop_desc' | '';

export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
