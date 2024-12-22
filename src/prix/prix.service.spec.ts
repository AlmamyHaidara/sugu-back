import { Test, TestingModule } from '@nestjs/testing';
import { PrixService } from './prix.service';

describe('PrixService', () => {
  let service: PrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrixService],
    }).compile();

    service = module.get<PrixService>(PrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
