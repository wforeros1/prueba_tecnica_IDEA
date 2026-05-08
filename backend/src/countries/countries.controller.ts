import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Country } from './interfaces/country.interface';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getCountries(
    @Query('region') region?: string,
    @Query('sort') sort?: string,
  ): Promise<Country[]> {
    return this.countriesService.getAllCountries(region, sort);
  }
}
