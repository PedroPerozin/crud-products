import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';

export interface ICreateUser {
  exec: (params: ICreateUser.Params) => ICreateUser.Response;
}

export namespace ICreateUser {
  export type Params = CreateUserDto;
  export type Response = Promise<UserEntity | ConflictException>;
}
