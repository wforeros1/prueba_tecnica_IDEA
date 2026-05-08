import { CountriesService } from './countries.service';
import { Country } from './interfaces/country.interface';
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    getCountries(): Promise<Country[]>;
}
