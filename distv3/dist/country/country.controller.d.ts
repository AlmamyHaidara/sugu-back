import { CountryService } from './country.service';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    findAll(): Promise<{
        id: number;
        name: string;
        isoCode: string;
    }[]>;
}
