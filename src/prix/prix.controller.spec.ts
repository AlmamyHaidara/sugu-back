import { Test, TestingModule } from '@nestjs/testing';
import { PrixController } from './prix.controller';
import { PrixService } from './prix.service';

describe('PrixController', () => {
  let controller: PrixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrixController],
      providers: [PrixService],
    }).compile();

    controller = module.get<PrixController>(PrixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
