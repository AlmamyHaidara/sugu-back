import { Test, TestingModule } from '@nestjs/testing';
import { ParticulierService } from './particulier.service';

describe('ParticulierService', () => {
  let service: ParticulierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticulierService],
    }).compile();

    service = module.get<ParticulierService>(ParticulierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
