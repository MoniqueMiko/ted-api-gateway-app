import { ClientProxyService } from '../../service/client-proxy.service';
import { HttpException } from '../../exceptions/http-exception';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtOptionalGuard } from '../../config/jwt-optional.guard';
import { JwtGuard } from '../../config/jwt-guard.guard';

@Controller('url-shortener')
export class UrlShortenerController {
    constructor(
        private readonly _clientProxyService: ClientProxyService,
        private _httException: HttpException,
    ) { }

    @Post('store')
    @UseGuards(JwtOptionalGuard)
    async store(@Body() body, @Res() res, @Req() req) {
        const response = await this._clientProxyService.client.send('url-shortener/store', { body, user: req?.user }).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Get('index')
    @UseGuards(JwtOptionalGuard)
    async login(@Res() res, @Req() req) {
        const response = await this._clientProxyService.client.send('url-shortener/index', { user: req?.user }).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Get('redirect')
    async redirect(@Query('url') url: string, @Res() res) {
        const response = await this._clientProxyService.client.send('url-shortener/redirect', { url },).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Put('update/:id')
    @UseGuards(JwtGuard)
    async update(@Body() body, @Param('id') id, @Res() res, @Req() req) {
        const response = await this._clientProxyService.client.send('url-shortener/update', { id, body, user: req?.user }).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Delete('delete/:id')
    @UseGuards(JwtGuard)
    async delete(@Param('id') id, @Res() res, @Req() req) {
        const response = await this._clientProxyService.client.send('url-shortener/delete', { id, user: req?.user }).toPromise();

        return await this._httException.responseHelper(response, res);
    }
}