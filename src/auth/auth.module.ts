import { Module } from '@nestjs/common';
import { Login } from './use-cases/login';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/login';
import { UserModule } from 'src/user/user.module';
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
  providers: [Login],
})
export class AuthModule {}
