import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

import { LoginController } from './controllers/login';
import { JwtStrategy } from './jwt.strategy';
import { Login } from './use-cases/login';
import { ValidatePassword } from './use-cases/validate-password';

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
  providers: [Login, JwtStrategy, ValidatePassword],
})
export class AuthModule {}
