import { UserEntity } from '../entities/user.entity';

export interface IGetUserByParam {
  exec: (params: IGetUserByParam.Params) => IGetUserByParam.Response;
}

export namespace IGetUserByParam {
  export type Params = {
    param: string;
    value: string;
  };
  export type Response = Promise<UserEntity>;
}
