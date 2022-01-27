import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './controllers/create-user';
import { CreateUser } from './use-cases';
import { GetUserByParam } from './use-cases/get-user-by-param';
import { HashPassword } from './use-cases/hash-password';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [GetUserByParam, HashPassword, CreateUser],
  exports: [GetUserByParam, CreateUser],
  controllers: [CreateUserController],
})
export class UserModule {}
