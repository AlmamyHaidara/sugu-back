import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { Public } from 'src/auth/constants';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Public()
  @Get()
  async findAll() {
    return this.countryService.findAll();
  }
}
