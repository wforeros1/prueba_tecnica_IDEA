import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from './interfaces/country.interface';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getCountries(): Promise<Country[]> {
    return this.countriesService.getAllCountries();
  }
}
