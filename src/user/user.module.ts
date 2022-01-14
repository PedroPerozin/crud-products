import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './controllers/create-user';
import { CreateUser } from './use-cases/create-user';
import { GetUserByEmail } from './use-cases/get-user-by-email';
import { HashPassword } from './use-cases/hash-password';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [GetUserByEmail, HashPassword, CreateUser],
  exports: [GetUserByEmail, CreateUser],
  controllers: [CreateUserController],
})
export class UserModule {}
