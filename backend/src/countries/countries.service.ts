import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Country } from './interfaces/country.interface';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAllCountries(): Promise<Country[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get('https://restcountries.com/v3.1/all')
      );
      
      return data.map((country: any) => ({
        name: country.name?.common || 'Unknown',
        capital: country.capital?.[0] || 'Unknown',
        region: country.region || 'Unknown',
        population: country.population || 0,
        flag: country.flags?.svg || country.flags?.png || ''
      }));
    } catch (error) {
      throw new HttpException('Error fetching countries', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
