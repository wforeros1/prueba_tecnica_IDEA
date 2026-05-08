import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Country } from './interfaces/country.interface';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAllCountries(region?: string, sort?: string): Promise<Country[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://restcountries.com/v3.1/all')
      );
      
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
      throw new HttpException('Error fetching countries', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
