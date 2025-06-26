import { Test, TestingModule } from '@nestjs/testing';
import { PublicityController } from './publicity.controller';
import { PublicityService } from './publicity.service';

describe('PublicityController', () => {
  let controller: PublicityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicityController],
      providers: [PublicityService],
    }).compile();

    controller = module.get<PublicityController>(PublicityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
