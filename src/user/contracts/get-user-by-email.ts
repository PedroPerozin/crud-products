import { UserEntity } from '../entities/user.entity';

export interface IGetUserByEmail {
  exec: (params: IGetUserByEmail.Params) => IGetUserByEmail.Response;
}

export namespace IGetUserByEmail {
  export type Params = { email: string };
  export type Response = Promise<UserEntity>;
}
