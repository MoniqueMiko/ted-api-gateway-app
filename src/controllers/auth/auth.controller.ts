import { ClientProxyService } from '../../service/client-proxy.service';
import { HttpException } from '../../exceptions/http-exception';
import { Body, Controller, Post, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _clientProxyService: ClientProxyService,
        private _httException: HttpException,
    ) { }

    @Post('store')
    async store(@Body() body, @Res() res) {
        const response = await this._clientProxyService.client.send('auth/store', body).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Post('login')
    async login(@Body() body, @Res() res) {
        const response = await this._clientProxyService.client.send('auth/login', body).toPromise();

        return await this._httException.responseHelper(response, res);
    }
}
