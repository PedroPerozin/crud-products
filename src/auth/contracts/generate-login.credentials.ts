import { UserEntity } from '../../user/entities/user.entity';

export interface IGenerateSignInCredentials {
  exec: (
    params: IGenerateSignInCredentials.Params,
  ) => IGenerateSignInCredentials.Response;
}

export namespace IGenerateSignInCredentials {
  export type Params = {
    user: UserEntity;
  };
  export type Response = { accessToken: string };
}
