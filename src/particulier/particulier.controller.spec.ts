import { Test, TestingModule } from '@nestjs/testing';
import { ParticulierController } from './particulier.controller';
import { ParticulierService } from './particulier.service';

describe('ParticulierController', () => {
  let controller: ParticulierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticulierController],
      providers: [ParticulierService],
    }).compile();

    controller = module.get<ParticulierController>(ParticulierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
