import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseByUserService } from './warehouse-by-user.service';
import { WarehouseByUserRepository } from './repository';

// Mocks
const mockLogger = {
  logger: jest.fn(),
};

const mockLocalizations = {
  errors: {
    tryAgain: 'Error, por favor intente de nuevo',
  },
};

const mockCommonStrings = {
  USER_PROPERTY: 'user',
};

const mockRequest = {
  user: {
    id: 1,
    warehouses: [
      { warehouse_id: 1, name: 'Almacén 1' },
      { warehouse_id: 2, name: 'Almacén 2' },
    ],
  },
};

describe('WarehouseByUserService', () => {
  let service: WarehouseByUserService;
  let repository: jest.Mocked<WarehouseByUserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseByUserService,
        {
          provide: WarehouseByUserRepository,
          useValue: {
            findAll: jest.fn(),
            getCounts: jest.fn(),
          },
        },
        {
          provide: 'LOGGER',
          useValue: mockLogger,
        },
        {
          provide: 'LOCALIZATIONS',
          useValue: mockLocalizations,
        },
        {
          provide: 'COMMON_STRINGS',
          useValue: mockCommonStrings,
        },
      ],
    }).compile();

    service = module.get<WarehouseByUserService>(WarehouseByUserService);
    repository = module.get(WarehouseByUserRepository);
  });

  describe('findAll', () => {
    it('debería devolver los almacenes del usuario', async () => {
      // Mock de datos
      const mockWarehouses = [{
        warehouse_id: 1,
        warehouse: { name: 'Almacén 1', code: 'ALM-1' }
      }];

      const mockCounts = [{
        warehouse: 1,
        canCountToday: true,
        nextCountNumber: 2
      }];

      // Configurar mocks
      repository.findAll.mockResolvedValue(mockWarehouses as any);
      repository.getCounts.mockResolvedValue(mockCounts as any);

      // Ejecutar
      const result = await service.findAll(mockRequest as any);

      // Verificaciones básicas
      expect(result.success).toBe(true);
      if (!result.data) throw new Error('Data no debería ser undefined');
      
      expect(result.data[0]).toMatchObject({
        id: 1,
        name: 'Almacén 1',
        code: 'ALM-1'
      });
    });
  });
});