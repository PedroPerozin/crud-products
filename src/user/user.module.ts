import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUserByEmail } from './use-cases/get-user-by-email';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [GetUserByEmail],
  exports: [GetUserByEmail],
})
export class UserModule {}
