import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ClientProxyService } from '../../service/client-proxy.service';
import { HttpException } from '../../exceptions/http-exception.strategy';

describe('AuthController', () => {
  let authController: AuthController;
  let clientProxyService: ClientProxyService;
  let httpException: HttpException;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: ClientProxyService,
          useValue: {
            client: {
              send: jest.fn(),
            },
          },
        },
        {
          provide: HttpException,
          useValue: {
            responseHelper: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    clientProxyService = moduleRef.get<ClientProxyService>(ClientProxyService);
    httpException = moduleRef.get<HttpException>(HttpException);
  });

  describe('store', () => {
    it('should call clientProxyService and httpException and return response', async () => {
      const mockBody = { username: 'user', password: 'pass' };
      const mockResponse = { success: true };
      const mockRes = {};

      (clientProxyService.client.send as jest.Mock).mockReturnValue({
        toPromise: jest.fn().mockResolvedValue(mockResponse),
      });

      (httpException.responseHelper as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authController.store(mockBody, mockRes);

      expect(clientProxyService.client.send).toHaveBeenCalledWith('auth/store', mockBody);
      expect(httpException.responseHelper).toHaveBeenCalledWith(mockResponse, mockRes);
      expect(result).toBe(mockResponse);
    });
  });

  describe('login', () => {
    it('should call clientProxyService and httpException and return response', async () => {
      const mockBody = { username: 'user', password: 'pass' };
      const mockResponse = { token: 'abc123' };
      const mockRes = {};

      (clientProxyService.client.send as jest.Mock).mockReturnValue({
        toPromise: jest.fn().mockResolvedValue(mockResponse),
      });

      (httpException.responseHelper as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authController.login(mockBody, mockRes);

      expect(clientProxyService.client.send).toHaveBeenCalledWith('auth/login', mockBody);
      expect(httpException.responseHelper).toHaveBeenCalledWith(mockResponse, mockRes);
      expect(result).toBe(mockResponse);
    });
  });
});
