import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { LoginController } from './controllers/login';
import { JwtStrategy } from './jwt.strategy';
import {
  GenerateSignInCredentials,
  GenerateToken,
  Login,
  ValidatePassword,
} from './use-cases';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
      },
    }),
    UserModule,
  ],
  controllers: [LoginController],
  providers: [
    Login,
    JwtStrategy,
    ValidatePassword,
    GenerateToken,
    GenerateSignInCredentials,
  ],
})
export class AuthModule {}
