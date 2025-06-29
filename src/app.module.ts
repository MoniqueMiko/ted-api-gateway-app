import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { HttpException } from './exceptions/http-exception.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { ClientProxyService } from './service/client-proxy.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [HttpException, ClientProxyService],
})
export class AppModule { }