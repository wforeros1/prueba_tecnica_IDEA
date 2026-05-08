"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let CountriesService = class CountriesService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getAllCountries(region, sort) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags').pipe((0, operators_1.timeout)(10000)));
            const data = response.data;
            if (!Array.isArray(data)) {
                throw new Error('Invalid response format from REST Countries API');
            }
            let countries = data.map((country) => ({
                name: country.name?.common || 'Unknown',
                capital: country.capital?.[0] || 'Unknown',
                region: country.region || 'Unknown',
                population: country.population || 0,
                flag: country.flags?.svg || country.flags?.png || ''
            }));
            if (region) {
                countries = countries.filter(c => c.region.toLowerCase() === region.toLowerCase());
            }
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
        }
        catch (error) {
            console.error('Error fetching countries:', error);
            throw new common_1.HttpException('Error fetching countries: ' + (error instanceof Error ? error.message : 'Unknown error'), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CountriesService);
//# sourceMappingURL=countries.service.js.map