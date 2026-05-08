import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Country } from './interfaces/country.interface';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAllCountries(region?: string, sort?: string): Promise<Country[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags').pipe(
          timeout(10000)
        )
      );
      
      const data = response.data;
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format from REST Countries API');
      }
      
      let countries: Country[] = data.map((country: any) => ({
        name: country.name?.common || 'Unknown',
        capital: country.capital?.[0] || 'Unknown',
        region: country.region || 'Unknown',
        population: country.population || 0,
        flag: country.flags?.svg || country.flags?.png || ''
      }));

      // Filtering by region
      if (region) {
        countries = countries.filter(c => c.region.toLowerCase() === region.toLowerCase());
      }

      // Sorting
      if (sort) {
        switch (sort) {
          case 'name_asc':
            countries.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name_desc':
            countries.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'pop_asc':
            countries.sort((a, b) => a.population - b.population);
            break;
          case 'pop_desc':
            countries.sort((a, b) => b.population - a.population);
            break;
        }
      }

      return countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw new HttpException(
        'Error fetching countries: ' + (error instanceof Error ? error.message : 'Unknown error'),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
