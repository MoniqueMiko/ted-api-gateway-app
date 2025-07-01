import { ClientProxyService } from '../../service/client-proxy.service';
import { HttpException } from '../../exceptions/http-exception';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../../dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _clientProxyService: ClientProxyService,
        private _httException: HttpException,
    ) { }

    @Post('store')
    @ApiOperation({ description: 'Save a new user to the database with the provided data.', summary: 'Create a new user.' })
    @ApiCreatedResponse({ description: 'Created: The request has been fulfilled and resulted in a new resource being created.' })
    @ApiBadRequestResponse({ description: 'Bad Request: This response means that the server could not understand the request due to invalid syntax or field.' })
    @ApiConflictResponse({ description: 'Conflict: The request could not be completed due to a conflict with the current state of the resource.' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error: A generic error message, given when no more specific message is suitable.' })
    @ApiBody({ type: CreateUserDto, description: 'These fields are mandatory for registration: fullName, email and password.' })
    async store(@Body() body, @Res() res) {
        const response = await this._clientProxyService.client.send('auth/store', body).toPromise();

        return await this._httException.responseHelper(response, res);
    }

    @Post('login')
    @ApiOperation({ description: 'Authenticate the user with email and password, and return a JWT token upon successful login.', summary: 'User login.' })
    @ApiCreatedResponse({ description: 'Created: The request has been fulfilled and resulted in a new resource being created.' })
    @ApiBadRequestResponse({ description: 'Bad Request: This response means that the server could not understand the request due to invalid syntax or field.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized: Authentication is needed to get the requested response' })
    @ApiNotFoundResponse({ description: 'Not Found: The requested resource could not be found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error: A generic error message, given when no more specific message is suitable.' })
    @ApiBody({ type: LoginUserDto, description: 'These fields are mandatory for registration: email and password.' })
    async login(@Body() body, @Res() res) {
        const response = await this._clientProxyService.client.send('auth/login', body).toPromise();

        return await this._httException.responseHelper(response, res);
    }
}
