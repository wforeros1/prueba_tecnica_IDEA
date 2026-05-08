import { HttpService } from '@nestjs/axios';
import { Country } from './interfaces/country.interface';
export declare class CountriesService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getAllCountries(): Promise<Country[]>;
}
