import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerController } from './url-shortener.controller';
import { ClientProxyService } from '../../service/client-proxy.service';
import { HttpException } from '../../exceptions/http-exception';
import { of } from 'rxjs';

describe('UrlShortenerController', () => {
    let controller: UrlShortenerController;
    let clientProxyService: ClientProxyService;
    let httpException: HttpException;

    const mockClient = {
        send: jest.fn(),
    };

    const mockClientProxyService = {
        client: mockClient,
    };

    const mockHttpException = {
        responseHelper: jest.fn(),
    };

    const mockRes = {};
    const mockReq = { user: { id: '123' } };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UrlShortenerController],
            providers: [
                { provide: ClientProxyService, useValue: mockClientProxyService },
                { provide: HttpException, useValue: mockHttpException },
            ],
        }).compile();

        controller = module.get<UrlShortenerController>(UrlShortenerController);
        clientProxyService = module.get<ClientProxyService>(ClientProxyService);
        httpException = module.get<HttpException>(HttpException);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call store and return response', async () => {
        const mockBody = { url: 'https://site.com' };
        const mockResponse = { success: true };

        mockClient.send.mockReturnValueOnce(of(mockResponse));
        mockHttpException.responseHelper.mockResolvedValueOnce('store-response');

        const result = await controller.store(mockBody, mockRes, mockReq);

        expect(mockClient.send).toHaveBeenCalledWith('url-shortener/store', {
            body: mockBody,
            user: mockReq.user,
        });
        expect(mockHttpException.responseHelper).toHaveBeenCalledWith(mockResponse, mockRes);
        expect(result).toBe('store-response');
    });

    it('should call index and return response', async () => {
        const mockResponse = { data: [] };

        mockClient.send.mockReturnValueOnce(of(mockResponse));
        mockHttpException.responseHelper.mockResolvedValueOnce('index-response');

        const result = await controller.login(mockRes, mockReq);

        expect(mockClient.send).toHaveBeenCalledWith('url-shortener/index', { user: mockReq.user });
        expect(mockHttpException.responseHelper).toHaveBeenCalledWith(mockResponse, mockRes);
        expect(result).toBe('index-response');
    });

    it('should call redirect and return response', async () => {
        const url = 'abc123';
        const mockResponse = { redirectTo: 'https://site.com' };

        mockClient.send.mockReturnValueOnce(of(mockResponse));
        mockHttpException.responseHelper.mockResolvedValueOnce('redirect-response');

        const result = await controller.redirect(url, mockRes);

        expect(mockClient.send).toHaveBeenCalledWith('url-shortener/redirect', { url });
        expect(mockHttpException.responseHelper).toHaveBeenCalledWith(mockResponse, mockRes);
        expect(result).toBe('redirect-response');
    });

    it('should call update and return response', async () => {
        const id = '1';
        const body = { url: 'https://new.com' };
        const mockResponse = { updated: true };

        mockClient.send.mockReturnValueOnce(of(mockResponse));
        mockHttpException.responseHelper.mockResolvedValueOnce('update-response');

        const result = await controller.update(body, id, mockRes, mockReq);

        expect(mockClient.send).toHaveBeenCalledWith('url-shortener/update', {
            id,
            body,
            user: mockReq.user,
        });
        expect(mockHttpException.responseHelper).toHaveBeenCalledWith(mockResponse, mockRes);
        expect(result).toBe('update-response');
    });

    it('should call delete and return response', async () => {
        const id = '1';
        const mockResponse = { deleted: true };

        mockClient.send.mockReturnValueOnce(of(mockResponse));
        mockHttpException.responseHelper.mockResolvedValueOnce('delete-response');

        const result = await controller.delete(id, mockRes, mockReq);

        expect(mockClient.send).toHaveBeenCalledWith('url-shortener/delete', {
            id,
            user: mockReq.user,
        });
        expect(mockHttpException.responseHelper).toHaveBeenCalledWith(mockResponse, mockRes);
        expect(result).toBe('delete-response');
    });
});