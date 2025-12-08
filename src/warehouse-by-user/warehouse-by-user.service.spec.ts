import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseByUserService } from './warehouse-by-user.service';

describe('WarehouseByUserService', () => {
  let service: WarehouseByUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehouseByUserService],
    }).compile();

    service = module.get<WarehouseByUserService>(WarehouseByUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
