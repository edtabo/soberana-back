import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseByUserController } from './warehouse-by-user.controller';
import { WarehouseByUserService } from './warehouse-by-user.service';

describe('WarehouseByUserController', () => {
  let controller: WarehouseByUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseByUserController],
      providers: [WarehouseByUserService],
    }).compile();

    controller = module.get<WarehouseByUserController>(WarehouseByUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
