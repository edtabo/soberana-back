import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

// Mock AuthService
class MockAuthService {
  auth = jest.fn();
}

describe('AuthController', () => {
  let controller: AuthController;
  let authService: MockAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<MockAuthService>(AuthService as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('auth', () => {
    it('debería llamar al servicio con los datos correctos', async () => {
      // Datos de prueba
      const authDto: CreateAuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockResponse = {
        access_token: 'test-token',
        user: { id: 1, email: 'test@example.com' },
      };

      // Configurar el mock
      authService.auth.mockResolvedValue(mockResponse);

      // Ejecutar
      const result = await controller.auth(authDto);

      // Verificar
      expect(authService.auth).toHaveBeenCalledWith(authDto);
      expect(result).toEqual(mockResponse);
    });
  });
});