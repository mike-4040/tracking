import { Test, TestingModule } from '@nestjs/testing';
import { OrgsController } from './orgs.controller';
import { OrgsService } from './orgs.service';

describe('OrgsController', () => {
  let controller: OrgsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgsController],
      providers: [OrgsService],
    }).compile();

    controller = module.get<OrgsController>(OrgsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
