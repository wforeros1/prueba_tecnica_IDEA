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
let CountriesService = class CountriesService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getAllCountries() {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://restcountries.com/v3.1/all'));
            return data.map((country) => ({
                name: country.name?.common || 'Unknown',
                capital: country.capital?.[0] || 'Unknown',
                region: country.region || 'Unknown',
                population: country.population || 0,
                flag: country.flags?.svg || country.flags?.png || ''
            }));
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching countries', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CountriesService);
//# sourceMappingURL=countries.service.js.map