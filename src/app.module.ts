import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './config/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpException } from './exceptions/http-exception';
import { AuthController } from './controllers/auth/auth.controller';
import { ClientProxyService } from './service/client-proxy.service';
import { UrlShortenerController } from './controllers/url-shortener/url-shortener.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [
    AuthController,
    UrlShortenerController
  ],

  providers: [
    HttpException,
    JwtStrategy,
    ClientProxyService
  ],
})
export class AppModule { }