import { ClientProxyService } from '../../service/client-proxy.service';
import { HttpException } from '../../exceptions/http-exception';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtOptionalGuard } from '../../config/jwt-optional.guard';
import { JwtGuard } from '../../config/jwt-guard.guard';
import { UrlDto } from '../../dto/url-sortener.dto';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('url-shortener')
export class UrlShortenerController {
    constructor(
        private readonly _clientProxyService: ClientProxyService,
        private _httException: HttpException,
    ) { }

    @Post('store')
    @UseGuards(JwtOptionalGuard)
    @ApiOperation({ description: 'Save a new original URL to the database to generate its shortened version.', summary: 'Create a new shortened URL.' })
    @ApiCreatedResponse({ description: 'Created: The request has been fulfilled and resulted in a new resource being created.' })
    @ApiBadRequestResponse({ description: 'Bad Request: This response means that the server could not understand the request due to invalid syntax or field.' })
    @ApiConflictResponse({ description: 'Conflict: The request could not be completed due to a conflict with the current state of the resource.' })
    @ApiNotFoundResponse({ description: 'Not Found: The requested resource could not be found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error: A generic error message, given when no more specific message is suitable.' })
    @ApiBody({ type: UrlDto, description: 'These fields are mandatory for registration: url.' })
    async store(@Body() body, @Res() res, @Req() req) {
        const response = await this._clientProxyService.client.send('url-shortener/store', { body, user: req?.user }).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Get('index')
    @UseGuards(JwtOptionalGuard)
    @ApiOperation({ description: 'Retrieve all URLs stored in the database. If authenticated with a valid token, returns only the URLs belonging to the authenticated user.', summary: 'List URLs.' })
    @ApiBadRequestResponse({ description: 'Bad Request: This response means that the server could not understand the request due to invalid syntax or field.' })
    @ApiNotFoundResponse({ description: 'Not Found: The requested resource could not be found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error: A generic error message, given when no more specific message is suitable.' })
    async login(@Res() res, @Req() req) {
        const response = await this._clientProxyService.client.send('url-shortener/index', { user: req?.user }).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Get('redirect')
    @ApiOperation({ summary: 'Redirect to original URL', description: 'Redirects to the original URL based on the shortened version passed as a query parameter.', })
    @ApiBadRequestResponse({ description: 'Bad Request: This response means that the server could not understand the request due to invalid syntax or field.' })
    @ApiNotFoundResponse({ description: 'Not Found: The requested resource could not be found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error: Something went wrong during the redirect process.' })
    @ApiQuery({ name: 'url', type: String, required: true, description: 'The original URL to be redirected from the shortened version.', })
    async redirect(@Query('url') url: string, @Res() res) {
        const response = await this._clientProxyService.client.send('url-shortener/redirect', { url },).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Put('update/:id')
    @UseGuards(JwtGuard)
    @ApiOperation({ description: 'Update an existing shortened URL by ID. Authentication is required.', summary: 'Update a shortened URL.' })
    @ApiCreatedResponse({ description: 'Created: The request has been fulfilled and resulted in a new resource being created.' })
    @ApiBadRequestResponse({ description: 'Bad Request: This response means that the server could not understand the request due to invalid syntax or field.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized: Authentication is needed to get the requested response' })
    @ApiConflictResponse({ description: 'Conflict: The request could not be completed due to a conflict with the current state of the resource.' })
    @ApiNotFoundResponse({ description: 'Not Found: The requested resource could not be found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error: A generic error message, given when no more specific message is suitable.' })
    @ApiBody({ type: UrlDto, description: 'These fields are mandatory for registration: id and url.' })
    async update(@Body() body, @Param('id') id, @Res() res, @Req() req) {
        const response = await this._clientProxyService.client.send('url-shortener/update', { id, body, user: req?.user }).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Delete('delete/:id')
    @UseGuards(JwtGuard)
    @ApiOperation({ description: 'Logically deletes the shortened URL by marking it as inactive. The record is no longer visible or editable.', summary: 'Deactivate shortened URL.' })
    @ApiCreatedResponse({ description: 'Created: The request has been fulfilled and resulted in a new resource being created.' })
    @ApiBadRequestResponse({ description: 'Bad Request: This response means that the server could not understand the request due to invalid syntax or field.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized: Authentication is needed to get the requested response' })
    @ApiNotFoundResponse({ description: 'Not Found: The requested resource could not be found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error: A generic error message, given when no more specific message is suitable.' })
    @ApiBody({ description: 'These fields are mandatory for registration: id.' })
    async delete(@Param('id') id, @Res() res, @Req() req) {
        const response = await this._clientProxyService.client.send('url-shortener/delete', { id, user: req?.user }).toPromise();

        return await this._httException.responseHelper(response, res);
    }
}