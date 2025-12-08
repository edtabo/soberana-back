import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository';
import { comparePassword, generateToken } from '../utils/utils';

// Mock dependencies
jest.mock('../utils/utils', () => ({
  comparePassword: jest.fn(),
  generateToken: jest.fn(),
}));

class MockAuthRepository {
  auth = jest.fn();
}

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: MockAuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useClass: MockAuthRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get<MockAuthRepository>(AuthRepository as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('auth', () => {
    it('debería autenticar un usuario exitosamente', async () => {
      // Datos de prueba
      const authDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword123',
      };

      const mockToken = 'test-jwt-token';

      // Configurar mocks
      authRepository.auth.mockResolvedValue(mockUser);
      (comparePassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockResolvedValue(mockToken);

      // Ejecutar
      const result = await service.auth(authDto);

      // Verificar
      expect(authRepository.auth).toHaveBeenCalledWith(authDto.email);
      expect(comparePassword).toHaveBeenCalledWith(authDto.password, mockUser.password);
      expect(result).toEqual({
        success: true,
        data: mockToken,
      });
    });
  });
});